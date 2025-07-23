create table public.equipments (
  id uuid not null default gen_random_uuid(),
  name text not null,
  description text,
  brand text,
  model text,
  serial_number text,
  warranty_end_date timestamp with time zone,
  purchase_value real,
  purchase_date timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  boat_id uuid not null,
  system_key text not null,
  constraint equipments_pkey primary key (id),
  constraint equipments_boat_id_fkey foreign key (boat_id) references public.boats(id)
);

alter table public.equipments enable row level security;

create policy "Owners can manage equipments of their boats"
on public.equipments
to authenticated
using (
  (boat_id in (select boats.id
  from boats
  where ((select auth.uid() as uid) = boats.owner_id)))
) with check (
  (boat_id in (select boats.id
  from boats
  where ((select auth.uid() as uid) = boats.owner_id)))
);

create policy "Users can manage the equipments of their boats to which they have access"
on public.equipments
to authenticated
using (
  (boat_id in (select accesses.boat_id
  from accesses
  where (accesses.user_id = auth.uid())))
) with check (
  (boat_id in (select accesses.boat_id
  from accesses
  where (accesses.user_id = auth.uid())))
);
