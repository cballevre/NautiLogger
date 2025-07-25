create table public.boats (
  id uuid default gen_random_uuid() not null,
  name character varying,
  created_at timestamp with time zone default now() not null,
  created_by uuid not null,
  constraint boats_pkey primary key (id),
  constraint boats_created_by_fkey foreign key (created_by) references auth.users(id)
);

alter table boats enable row level security;

create or replace function public.grant_boat_access()
returns trigger
set search_path = ''
as $$
begin
  insert into public.accesses (boat_id, user_id, role)
  values (new.id, new.created_by, 'owner');
  return new;
end;
$$ language plpgsql security definer;

create trigger boats_after_insert
after insert on public.boats
for each row
execute function public.grant_boat_access();
