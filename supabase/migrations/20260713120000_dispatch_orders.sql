-- Module 2: Extend dispatch_orders and dispatch_items with status tracking
-- Foundation already created the tables; this migration adds missing columns.

do $$
begin
  -- Add status enum (idempotent)
  if not exists (select 1 from pg_type where typname = 'dispatch_order_status') then
    create type public.dispatch_order_status as enum (
      'draft', 'submitted', 'delivered', 'partial', 'returned', 'cancelled'
    );
  end if;
end$$;

-- Add status column to dispatch_orders
alter table public.dispatch_orders
  add column if not exists status public.dispatch_order_status not null default 'draft';

-- Add order_date column (separate from created_at so backdating is possible)
alter table public.dispatch_orders
  add column if not exists order_date date not null default current_date;

-- Add return quantity tracking to dispatch_items
alter table public.dispatch_items
  add column if not exists qty_returned integer not null default 0 check (qty_returned >= 0);

-- Update create_dispatch function to keep status='draft' (submitted separately)
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

  insert into dispatch_orders (salesman_id, notes, created_by, status, order_date)
  values (
    p_salesman_id,
    nullif(trim(coalesce(p_notes, '')), ''),
    auth.uid(),
    'draft',
    current_date
  )
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

  return v_order_id;
end;
$$;
