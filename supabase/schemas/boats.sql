create table public.boats (
  id uuid default gen_random_uuid() not null,
  owner_id uuid not null,
  name character varying,
  created_at timestamp with time zone default now() not null,
  constraint boats_pkey primary key (id),
  constraint boats_owner_id_fkey foreign key (owner_id) references auth.users(id)
);

alter table boats enable row level security;

create policy "Users can create boats"
on public.boats
to authenticated
with check (
  true
);

create policy "Users can manage their own boat"
on public.boats
to authenticated
using (
  ((select auth.uid() as uid) = owner_id)
) with check (
  ((select auth.uid() as uid) = owner_id)
);

create or replace function is_boat_owner(check_boat_id uuid)
returns boolean
language sql
security DEFINER
set search_path = ''
as $$
  select exists (
    select 1
    from public.boats
    where id = check_boat_id
    and owner_id = auth.uid()
  );
$$;
