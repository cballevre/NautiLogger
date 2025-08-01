create table public.intervention_attachments (
  id uuid not null default gen_random_uuid(),
  intervention_id uuid not null,
  file_path text not null,
  file_name text not null,
  file_type text,
  type text not null check (type in ('photo', 'document')) default 'document',
  description text,
  uploaded_at timestamp with time zone not null default now(),
  constraint intervention_attachments_pkey primary key (id),
  constraint intervention_attachments_intervention_id_fkey foreign key (intervention_id) references public.interventions(id) on delete cascade
);

alter table public.intervention_attachments enable row level security;

CREATE OR REPLACE FUNCTION check_intervention_access(intervention_id uuid)
returns boolean
language sql
set search_path = ''
as $$
  SELECT EXISTS (
    SELECT 1
    FROM public.interventions e
    JOIN public.accesses a ON e.boat_id = a.boat_id
    WHERE e.id = intervention_id
      AND a.user_id = (SELECT auth.uid())
  );
$$;

create policy "Users can manage attachments of interventions to which they have access"
on public.intervention_attachments
to authenticated
using (
  check_intervention_access(intervention_id)
) with check (
  check_intervention_access(intervention_id)
);

create index if not exists idx_intervention_attachments_intervention_id on public.intervention_attachments(intervention_id);
