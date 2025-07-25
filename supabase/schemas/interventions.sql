CREATE TABLE public.interventions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  boat_id uuid NOT NULL,
  description text,
  title text NOT NULL,
  date timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  constraint interventions_pkey primary key (id),
  constraint interventions_boat_id_fkey foreign key (boat_id) references public.boats(id)
);

alter table public.interventions enable row level security;

create policy "Allow user manage interventions for their boats"
on public.interventions
to authenticated
using (
  has_boat_access(boat_id)
) with check (
  has_boat_access(boat_id)
);
