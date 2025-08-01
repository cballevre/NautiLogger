create table public.equipment_attachments (
  id uuid not null default gen_random_uuid(),
  equipment_id uuid not null,
  file_path text not null,
  file_name text not null,
  file_type text,
  type text not null check (type in ('photo', 'document')) default 'document',
  description text,
  uploaded_at timestamp with time zone not null default now(),
  constraint equipment_attachments_pkey primary key (id),
  constraint equipment_attachments_equipment_id_fkey foreign key (equipment_id) references public.equipments(id) on delete cascade
);

alter table public.equipment_attachments enable row level security;

CREATE OR REPLACE FUNCTION check_equipment_access(equipment_id uuid)
returns boolean
language sql
set search_path = ''
as $$
  SELECT EXISTS (
    SELECT 1
    FROM public.equipments e
    JOIN public.accesses a ON e.boat_id = a.boat_id
    WHERE e.id = equipment_id
      AND a.user_id = (SELECT auth.uid())
  );
$$;

create policy "Users can manage attachments of equipments to which they have access"
on public.equipment_attachments
to authenticated
using (
  check_equipment_access(equipment_id)
) with check (
  check_equipment_access(equipment_id)
);

create index if not exists idx_equipment_attachments_equipment_id on public.equipment_attachments(equipment_id);
