create type access_role as enum ('owner', 'operator', 'viewer');

create table public.accesses (
  id uuid not null default gen_random_uuid(),
  boat_id uuid not null,
  user_id uuid not null,
  role access_role not null default 'viewer',
  created_at timestamp with time zone not null default now(),
  constraint accesses_pkey primary key (id),
  constraint accesses_user_id_fkey foreign key (user_id) references auth.users(id) on delete cascade,
  constraint accesses_boat_id_fkey foreign key (boat_id) references public.boats(id) on delete cascade
);

alter table public.accesses enable row level security;

create policy "Enable users to view their own data only"
on public.accesses
to authenticated
using (
  (( SELECT auth.uid() AS uid) = user_id)
);

create or replace function public.has_boat_access(boat uuid)
returns boolean
language sql
set search_path = ''
as $$
  select exists (
    select 1
    from public.accesses
    where accesses.boat_id = boat
      and accesses.user_id = auth.uid()
  );
$$;

create policy "Allow users to select boats they can access"
on public.boats
for select
to authenticated
using (
  has_boat_access(id) or created_by = auth.uid()
);

create policy "Allow users to insert boats"
on public.boats
for insert
to authenticated
with check (true);

create policy "Allow users to update boats they can access"
on public.boats
for update
to authenticated
using (
  has_boat_access(id)
) with check (
  has_boat_access(id)
);

create policy "Allow users to delete boats they can access"
on public.boats
for delete
to authenticated
using (
  has_boat_access(id)
);
