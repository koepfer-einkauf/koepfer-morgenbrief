create schema if not exists private;

revoke all on schema private from public, anon, authenticated;

create table if not exists private.admin_login_rate_limits (
  bucket text primary key,
  window_started_at timestamptz not null default now(),
  failures integer not null default 0 check (failures >= 0),
  blocked_until timestamptz,
  updated_at timestamptz not null default now()
);

revoke all on private.admin_login_rate_limits from public, anon, authenticated;

create or replace function public.admin_rate_limit_check(p_bucket text)
returns table(allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = pg_catalog, private
as $$
declare
  current_limit private.admin_login_rate_limits%rowtype;
begin
  if p_bucket !~ '^[0-9a-f]{64}$' then
    return query select false, 900;
    return;
  end if;

  select *
    into current_limit
    from private.admin_login_rate_limits
   where bucket = p_bucket;

  if not found
     or current_limit.window_started_at < now() - interval '15 minutes' then
    return query select true, 0;
    return;
  end if;

  if current_limit.blocked_until is not null
     and current_limit.blocked_until > now() then
    return query
      select false,
             greatest(1, ceil(extract(epoch from (current_limit.blocked_until - now())))::integer);
    return;
  end if;

  return query select true, 0;
end;
$$;

create or replace function public.admin_rate_limit_record(
  p_bucket text,
  p_success boolean
)
returns table(blocked boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = pg_catalog, private
as $$
declare
  current_limit private.admin_login_rate_limits%rowtype;
  next_failures integer;
begin
  if p_bucket !~ '^[0-9a-f]{64}$' then
    return query select true, 900;
    return;
  end if;

  if p_success then
    delete from private.admin_login_rate_limits where bucket = p_bucket;
    return query select false, 0;
    return;
  end if;

  select *
    into current_limit
    from private.admin_login_rate_limits
   where bucket = p_bucket
   for update;

  if not found
     or current_limit.window_started_at < now() - interval '15 minutes' then
    insert into private.admin_login_rate_limits (
      bucket,
      window_started_at,
      failures,
      blocked_until,
      updated_at
    ) values (
      p_bucket,
      now(),
      1,
      null,
      now()
    )
    on conflict (bucket) do update set
      window_started_at = excluded.window_started_at,
      failures = excluded.failures,
      blocked_until = excluded.blocked_until,
      updated_at = excluded.updated_at
    returning * into current_limit;
  else
    next_failures := current_limit.failures + 1;
    update private.admin_login_rate_limits
       set failures = next_failures,
           blocked_until = case
             when next_failures >= 5 then now() + interval '30 minutes'
             else null
           end,
           updated_at = now()
     where bucket = p_bucket
     returning * into current_limit;
  end if;

  delete from private.admin_login_rate_limits
   where updated_at < now() - interval '2 days';

  if current_limit.blocked_until is not null
     and current_limit.blocked_until > now() then
    return query
      select true,
             greatest(1, ceil(extract(epoch from (current_limit.blocked_until - now())))::integer);
    return;
  end if;

  return query select false, 0;
end;
$$;

revoke all on function public.admin_rate_limit_check(text) from public, anon, authenticated;
revoke all on function public.admin_rate_limit_record(text, boolean) from public, anon, authenticated;
grant execute on function public.admin_rate_limit_check(text) to service_role;
grant execute on function public.admin_rate_limit_record(text, boolean) to service_role;
