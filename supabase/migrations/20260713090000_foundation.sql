-- ============================================================================
-- Migration 0001: Foundation — Internal Dispatch & Ledger App
-- Schema, RBAC, RLS (delete disabled globally), audit triggers, core RPCs
-- ============================================================================

create extension if not exists btree_gist;

-- ----------------------------------------------------------------------------
-- 1. PROFILES (linked to Supabase Auth)
-- ----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null,
  is_master_admin boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 2. PERMISSIONS — granular per-module matrix (no generic roles)
-- ----------------------------------------------------------------------------
create table public.permissions (
  user_id uuid not null references public.profiles (id) on delete cascade,
  module text not null check (module in ('users','salesmen','products','pricing','dispatch','payments','reports')),
  can_view boolean not null default false,
  can_read boolean not null default false,
  can_create boolean not null default false,
  can_edit boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, module)
);

-- ----------------------------------------------------------------------------
-- 3. SALESMEN
-- ----------------------------------------------------------------------------
create table public.salesmen (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  name text not null,
  phone text,
  area text,
  active boolean not null default true,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 4. PRODUCTS (70+ bakery items; barcode for HID scanner)
-- ----------------------------------------------------------------------------
create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  barcode text unique,
  name text not null,
  unit text not null default 'pcs',
  active boolean not null default true,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 5. SALESMAN-SPECIFIC PRICING with validity windows
--    Overlapping windows for the same salesman+product are impossible (EXCLUDE)
-- ----------------------------------------------------------------------------
create table public.salesman_prices (
  id uuid primary key default gen_random_uuid(),
  salesman_id uuid not null references public.salesmen (id),
  product_id uuid not null references public.products (id),
  price numeric(12,2) not null check (price > 0),
  valid_from date not null default current_date,
  valid_to date check (valid_to is null or valid_to >= valid_from),
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint no_overlapping_price_windows exclude using gist (
    salesman_id with =,
    product_id with =,
    daterange(valid_from, valid_to, '[]') with &&
  )
);

create index idx_salesman_prices_lookup on public.salesman_prices (salesman_id, product_id, valid_from);

-- ----------------------------------------------------------------------------
-- 6. DISPATCH ORDERS + ITEMS (unit_price is an immutable snapshot)
-- ----------------------------------------------------------------------------
create sequence public.dispatch_order_seq;

create table public.dispatch_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('DO-' || lpad(nextval('public.dispatch_order_seq')::text, 6, '0')),
  salesman_id uuid not null references public.salesmen (id),
  total numeric(14,2) not null default 0 check (total >= 0),
  notes text,
  created_by uuid not null references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_dispatch_orders_salesman on public.dispatch_orders (salesman_id, created_at desc);

create table public.dispatch_items (
  id uuid primary key default gen_random_uuid(),
  dispatch_order_id uuid not null references public.dispatch_orders (id),
  product_id uuid not null references public.products (id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price > 0),
  line_total numeric(14,2) generated always as ((quantity)::numeric * unit_price) stored,
  created_at timestamptz not null default now()
);

create index idx_dispatch_items_order on public.dispatch_items (dispatch_order_id);
create index idx_dispatch_items_product on public.dispatch_items (product_id);

-- ----------------------------------------------------------------------------
-- 7. LEDGER — append-only double-entry (dispatch = debit, payment = credit)
-- ----------------------------------------------------------------------------
create table public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  salesman_id uuid not null references public.salesmen (id),
  entry_type text not null check (entry_type in ('debit','credit')),
  amount numeric(14,2) not null check (amount > 0),
  method text,
  dispatch_order_id uuid references public.dispatch_orders (id),
  reference text,
  note text,
  created_by uuid not null references public.profiles (id),
  created_at timestamptz not null default now()
);

create index idx_ledger_salesman on public.ledger_entries (salesman_id, created_at desc);

-- Live outstanding balance per salesman (security_invoker: RLS still applies)
create view public.salesman_balances
with (security_invoker = on) as
select
  s.id as salesman_id,
  s.name,
  s.active,
  coalesce(sum(le.amount) filter (where le.entry_type = 'debit'), 0)::numeric(14,2) as total_debits,
  coalesce(sum(le.amount) filter (where le.entry_type = 'credit'), 0)::numeric(14,2) as total_credits,
  (coalesce(sum(le.amount) filter (where le.entry_type = 'debit'), 0)
   - coalesce(sum(le.amount) filter (where le.entry_type = 'credit'), 0))::numeric(14,2) as balance
from public.salesmen s
left join public.ledger_entries le on le.salesman_id = s.id
group by s.id, s.name, s.active;

-- ----------------------------------------------------------------------------
-- 8. AUDIT LOG — immutable trail of every mutation
-- ----------------------------------------------------------------------------
create table public.audit_log (
  id bigint generated always as identity primary key,
  table_name text not null,
  record_id text,
  action text not null,
  actor uuid,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index idx_audit_log_table_record on public.audit_log (table_name, record_id);
create index idx_audit_log_created on public.audit_log (created_at desc);

-- ----------------------------------------------------------------------------
-- 9. HELPER FUNCTIONS
-- ----------------------------------------------------------------------------

-- Central RBAC check used by all RLS policies (SECURITY DEFINER: bypasses RLS
-- on profiles/permissions to avoid recursion; master admin short-circuits).
create or replace function public.has_permission(p_module text, p_action text)
returns boolean
language sql stable security definer
set search_path = public, pg_temp
as $$
  select coalesce(
    (select true from profiles where id = auth.uid() and is_master_admin and active),
    (select case p_action
       when 'view'   then p.can_view
       when 'read'   then p.can_read
       when 'create' then p.can_create
       when 'edit'   then p.can_edit
       else false end
     from permissions p
     join profiles pr on pr.id = p.user_id
     where p.user_id = auth.uid() and p.module = p_module and pr.active),
    false
  );
$$;

create or replace function public.is_master_admin()
returns boolean
language sql stable security definer
set search_path = public, pg_temp
as $$
  select coalesce(
    (select true from profiles where id = auth.uid() and is_master_admin and active),
    false
  );
$$;

-- updated_at maintenance
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Generic audit trigger (SECURITY DEFINER so RLS on audit_log never blocks it)
create or replace function public.audit_trigger()
returns trigger
language plpgsql security definer
set search_path = public, pg_temp
as $$
declare
  v_record_id text;
begin
  v_record_id := coalesce(
    (to_jsonb(coalesce(new, old)) ->> 'id'),
    (to_jsonb(coalesce(new, old)) ->> 'user_id')
  );
  insert into audit_log (table_name, record_id, action, actor, old_data, new_data)
  values (tg_table_name, v_record_id, tg_op, auth.uid(), to_jsonb(old), to_jsonb(new));
  return coalesce(new, old);
end;
$$;

-- ----------------------------------------------------------------------------
-- 10. CORE RPCs
-- ----------------------------------------------------------------------------

-- Price lock: current valid prices for a salesman (used by dispatch page)
create or replace function public.get_salesman_prices(p_salesman_id uuid)
returns table (product_id uuid, price numeric)
language sql stable security definer
set search_path = public, pg_temp
as $$
  select sp.product_id, sp.price
  from salesman_prices sp
  where sp.salesman_id = p_salesman_id
    and sp.valid_from <= current_date
    and (sp.valid_to is null or sp.valid_to >= current_date)
    and (
      has_permission('dispatch', 'create')
      or has_permission('dispatch', 'view')
      or has_permission('pricing', 'view')
    );
$$;

-- Atomic dispatch creation: order + items (price snapshot) + ledger debit
-- in ONE transaction. p_items: [{"product_id": "...", "quantity": 5}, ...]
create or replace function public.create_dispatch(
  p_salesman_id uuid,
  p_items jsonb,
  p_notes text default null
)
returns uuid
language plpgsql security definer
set search_path = public, pg_temp
as $$
declare
  v_order_id uuid;
  v_item jsonb;
  v_product_id uuid;
  v_quantity integer;
  v_price numeric(12,2);
  v_total numeric(14,2) := 0;
  v_product_name text;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  if not has_permission('dispatch', 'create') then
    raise exception 'Permission denied: dispatch.create required';
  end if;
  if not exists (select 1 from salesmen where id = p_salesman_id and active) then
    raise exception 'Salesman not found or inactive';
  end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'At least one item is required';
  end if;

  insert into dispatch_orders (salesman_id, notes, created_by)
  values (p_salesman_id, nullif(trim(coalesce(p_notes, '')), ''), auth.uid())
  returning id into v_order_id;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_product_id := (v_item ->> 'product_id')::uuid;
    v_quantity := (v_item ->> 'quantity')::integer;

    if v_quantity is null or v_quantity <= 0 then
      raise exception 'Invalid quantity for product %', v_product_id;
    end if;

    select name into v_product_name from products where id = v_product_id and active;
    if v_product_name is null then
      raise exception 'Product not found or inactive: %', v_product_id;
    end if;

    select sp.price into v_price
    from salesman_prices sp
    where sp.salesman_id = p_salesman_id
      and sp.product_id = v_product_id
      and sp.valid_from <= current_date
      and (sp.valid_to is null or sp.valid_to >= current_date)
    limit 1;

    if v_price is null then
      raise exception 'No price configured for "%" for this salesman', v_product_name;
    end if;

    insert into dispatch_items (dispatch_order_id, product_id, quantity, unit_price)
    values (v_order_id, v_product_id, v_quantity, v_price);

    v_total := v_total + (v_quantity::numeric * v_price);
  end loop;

  update dispatch_orders set total = v_total where id = v_order_id;

  insert into ledger_entries (salesman_id, entry_type, amount, dispatch_order_id, note, created_by)
  values (p_salesman_id, 'debit', v_total, v_order_id, 'Dispatch order', auth.uid());

  return v_order_id;
end;
$$;

-- Payment entry (credit against salesman)
create or replace function public.record_payment(
  p_salesman_id uuid,
  p_amount numeric,
  p_method text default 'cash',
  p_reference text default null,
  p_note text default null
)
returns uuid
language plpgsql security definer
set search_path = public, pg_temp
as $$
declare
  v_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  if not has_permission('payments', 'create') then
    raise exception 'Permission denied: payments.create required';
  end if;
  if p_amount is null or p_amount <= 0 then
    raise exception 'Payment amount must be greater than zero';
  end if;
  if not exists (select 1 from salesmen where id = p_salesman_id) then
    raise exception 'Salesman not found';
  end if;

  insert into ledger_entries (salesman_id, entry_type, amount, method, reference, note, created_by)
  values (p_salesman_id, 'credit', round(p_amount, 2), coalesce(p_method, 'cash'), p_reference, p_note, auth.uid())
  returning id into v_id;

  return v_id;
end;
$$;

-- ----------------------------------------------------------------------------
-- 11. TRIGGERS
-- ----------------------------------------------------------------------------
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger trg_permissions_updated before update on public.permissions
  for each row execute function public.set_updated_at();
create trigger trg_salesmen_updated before update on public.salesmen
  for each row execute function public.set_updated_at();
create trigger trg_products_updated before update on public.products
  for each row execute function public.set_updated_at();
create trigger trg_salesman_prices_updated before update on public.salesman_prices
  for each row execute function public.set_updated_at();
create trigger trg_dispatch_orders_updated before update on public.dispatch_orders
  for each row execute function public.set_updated_at();

create trigger trg_audit_profiles after insert or update on public.profiles
  for each row execute function public.audit_trigger();
create trigger trg_audit_permissions after insert or update on public.permissions
  for each row execute function public.audit_trigger();
create trigger trg_audit_salesmen after insert or update on public.salesmen
  for each row execute function public.audit_trigger();
create trigger trg_audit_products after insert or update on public.products
  for each row execute function public.audit_trigger();
create trigger trg_audit_salesman_prices after insert or update on public.salesman_prices
  for each row execute function public.audit_trigger();
create trigger trg_audit_dispatch_orders after insert or update on public.dispatch_orders
  for each row execute function public.audit_trigger();
create trigger trg_audit_dispatch_items after insert or update on public.dispatch_items
  for each row execute function public.audit_trigger();
create trigger trg_audit_ledger_entries after insert or update on public.ledger_entries
  for each row execute function public.audit_trigger();

-- ----------------------------------------------------------------------------
-- 12. ROW LEVEL SECURITY — deny-by-default; NO delete policy anywhere
-- ----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.permissions enable row level security;
alter table public.salesmen enable row level security;
alter table public.products enable row level security;
alter table public.salesman_prices enable row level security;
alter table public.dispatch_orders enable row level security;
alter table public.dispatch_items enable row level security;
alter table public.ledger_entries enable row level security;
alter table public.audit_log enable row level security;

-- profiles: users see their own; users.view sees all
create policy profiles_select on public.profiles for select to authenticated
  using (id = auth.uid() or public.has_permission('users', 'view'));
create policy profiles_insert on public.profiles for insert to authenticated
  with check (public.has_permission('users', 'create'));
create policy profiles_update on public.profiles for update to authenticated
  using (public.has_permission('users', 'edit'))
  with check (public.has_permission('users', 'edit'));

-- permissions: own rows readable; managed with users.*
create policy permissions_select on public.permissions for select to authenticated
  using (user_id = auth.uid() or public.has_permission('users', 'view'));
create policy permissions_insert on public.permissions for insert to authenticated
  with check (public.has_permission('users', 'create') or public.has_permission('users', 'edit'));
create policy permissions_update on public.permissions for update to authenticated
  using (public.has_permission('users', 'edit'))
  with check (public.has_permission('users', 'edit'));

-- salesmen
create policy salesmen_select on public.salesmen for select to authenticated
  using (
    public.has_permission('salesmen', 'view')
    or public.has_permission('dispatch', 'view')
    or public.has_permission('dispatch', 'create')
    or public.has_permission('payments', 'view')
    or public.has_permission('pricing', 'view')
    or public.has_permission('reports', 'view')
  );
create policy salesmen_insert on public.salesmen for insert to authenticated
  with check (public.has_permission('salesmen', 'create'));
create policy salesmen_update on public.salesmen for update to authenticated
  using (public.has_permission('salesmen', 'edit'))
  with check (public.has_permission('salesmen', 'edit'));

-- products
create policy products_select on public.products for select to authenticated
  using (
    public.has_permission('products', 'view')
    or public.has_permission('dispatch', 'view')
    or public.has_permission('dispatch', 'create')
    or public.has_permission('pricing', 'view')
    or public.has_permission('reports', 'view')
  );
create policy products_insert on public.products for insert to authenticated
  with check (public.has_permission('products', 'create'));
create policy products_update on public.products for update to authenticated
  using (public.has_permission('products', 'edit'))
  with check (public.has_permission('products', 'edit'));

-- salesman_prices (dispatch page reads prices via SECURITY DEFINER RPC)
create policy salesman_prices_select on public.salesman_prices for select to authenticated
  using (public.has_permission('pricing', 'view'));
create policy salesman_prices_insert on public.salesman_prices for insert to authenticated
  with check (public.has_permission('pricing', 'create'));
create policy salesman_prices_update on public.salesman_prices for update to authenticated
  using (public.has_permission('pricing', 'edit'))
  with check (public.has_permission('pricing', 'edit'));

-- dispatch orders/items: inserts happen ONLY via create_dispatch RPC (definer)
create policy dispatch_orders_select on public.dispatch_orders for select to authenticated
  using (public.has_permission('dispatch', 'view') or public.has_permission('reports', 'view'));
create policy dispatch_items_select on public.dispatch_items for select to authenticated
  using (public.has_permission('dispatch', 'view') or public.has_permission('reports', 'view'));

-- ledger: inserts ONLY via RPCs; append-only (no update policy)
create policy ledger_select on public.ledger_entries for select to authenticated
  using (
    public.has_permission('payments', 'view')
    or public.has_permission('reports', 'view')
    or public.has_permission('dispatch', 'view')
  );

-- audit log: read-only for users.view or reports.view; writes via definer trigger
create policy audit_select on public.audit_log for select to authenticated
  using (public.has_permission('users', 'view') or public.has_permission('reports', 'view'));

-- ----------------------------------------------------------------------------
-- 13. HARD PRIVILEGE REVOKES — Delete disabled at the database level
-- ----------------------------------------------------------------------------
revoke delete, truncate on all tables in schema public from anon, authenticated;
-- Ledger and audit log are strictly append-only, even privilege-wise
revoke update on public.ledger_entries, public.audit_log from anon, authenticated;
-- Dispatch data is written exclusively through the create_dispatch RPC
revoke insert, update on public.dispatch_orders, public.dispatch_items from anon, authenticated;
revoke insert on public.ledger_entries from anon, authenticated;
revoke insert, update on public.audit_log from anon, authenticated;
-- Anonymous role gets nothing at all
revoke all on all tables in schema public from anon;

-- Lock down function execution
revoke execute on all functions in schema public from anon, public;
grant execute on function public.has_permission(text, text) to authenticated;
grant execute on function public.is_master_admin() to authenticated;
grant execute on function public.get_salesman_prices(uuid) to authenticated;
grant execute on function public.create_dispatch(uuid, jsonb, text) to authenticated;
grant execute on function public.record_payment(uuid, numeric, text, text, text) to authenticated;
