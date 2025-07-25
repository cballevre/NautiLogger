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

create policy "Enable owners to manage interventions onto their own boat only"
on public.interventions
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

create policy "Users can manage interventions for their boats"
on public.interventions
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
