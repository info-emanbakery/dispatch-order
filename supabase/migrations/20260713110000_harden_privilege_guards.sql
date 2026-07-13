-- ============================================================================
-- Hardening: mirror app-layer guardrails at the DB layer.
--
-- PostgREST is exposed to any authenticated user holding the anon key, and the
-- foundation RLS policies allow any `users.edit` holder to UPDATE any column of
-- any profile row and to write their own permission rows. That would permit,
-- from a browser console:
--   1. setting is_master_admin = true on their own profile
--   2. deactivating or editing the Master Admin's profile
--   3. granting themselves permissions (bypassing "cannot edit own permissions")
--
-- These triggers reject such writes for authenticated (JWT) sessions.
-- The service-role client used by server actions bypasses them because
-- auth.uid() is null under the service role.
-- ============================================================================

create or replace function public.guard_profiles_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Service role / owner connections carry no JWT: skip all guards.
  if auth.uid() is null then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.is_master_admin then
      raise exception 'New profiles cannot be created as Master Admin';
    end if;
    return new;
  end if;

  -- UPDATE guards
  if new.is_master_admin is distinct from old.is_master_admin then
    raise exception 'Master Admin status cannot be changed';
  end if;

  if old.is_master_admin then
    if new.active is distinct from old.active then
      raise exception 'The Master Admin account cannot be deactivated';
    end if;
    if auth.uid() <> old.id then
      raise exception 'Only the Master Admin can edit this profile';
    end if;
  end if;

  if auth.uid() = old.id and old.active and not new.active then
    raise exception 'You cannot deactivate your own account';
  end if;

  return new;
end;
$$;

revoke execute on function public.guard_profiles_write() from public, anon, authenticated;

drop trigger if exists trg_guard_profiles_write on public.profiles;
create trigger trg_guard_profiles_write
  before insert or update on public.profiles
  for each row execute function public.guard_profiles_write();

create or replace function public.guard_permissions_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and coalesce(new.user_id, old.user_id) = auth.uid() then
    raise exception 'You cannot modify your own permissions';
  end if;
  return new;
end;
$$;

revoke execute on function public.guard_permissions_write() from public, anon, authenticated;

drop trigger if exists trg_guard_permissions_write on public.permissions;
create trigger trg_guard_permissions_write
  before insert or update on public.permissions
  for each row execute function public.guard_permissions_write();
