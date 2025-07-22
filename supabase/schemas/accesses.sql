create table public.accesses (
  id uuid not null default gen_random_uuid(),
  boat_id uuid not null,
  user_id uuid not null,
  created_at timestamp with time zone not null default now(),
  constraint accesses_pkey primary key (id),
  constraint accesses_user_id_fkey foreign key (user_id) references auth.users(id),
  constraint accesses_boat_id_fkey foreign key (boat_id) references public.boats(id)
);

alter table public.accesses enable row level security;

create policy "Enable users to view their own data only"
on public.accesses
to authenticated
using (
  (( SELECT auth.uid() AS uid) = user_id)
);

create policy "Owners can manage access to their own boat"
on public.accesses
to authenticated
using (
  is_boat_owner(boat_id)
) with check (
  is_boat_owner(boat_id)
);

create policy "Users can view boats they have access to"
on public.boats
to authenticated
using (
  (id in (select accesses.boat_id
   from accesses
  where (accesses.user_id = (select auth.uid() as uid))))
);
