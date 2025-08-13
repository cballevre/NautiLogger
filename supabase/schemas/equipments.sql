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
  quantity integer not null default 1,
  created_at timestamp with time zone not null default now(),
  boat_id uuid not null,
  system_key text not null,
  constraint equipments_pkey primary key (id),
  constraint equipments_boat_id_fkey foreign key (boat_id) references public.boats(id)
);

alter table public.equipments enable row level security;

create policy "Allow user manage equipments for their boats"
on public.equipments
to authenticated
using (
  has_boat_access(boat_id)
) with check (
  has_boat_access(boat_id)
);

