CREATE TABLE public.accesses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  boat_id uuid NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT accesses_pkey PRIMARY KEY (id),
  CONSTRAINT accesses_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT accesses_boat_id_fkey FOREIGN KEY (boat_id) REFERENCES public.boats(id)
);

CREATE TABLE public.boats (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  name character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT boats_pkey PRIMARY KEY (id),
  CONSTRAINT boats_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users(id)
);

CREATE TABLE public.equipments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  purchase_value real,
  purchase_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  boat_id uuid NOT NULL,
  CONSTRAINT equipments_pkey PRIMARY KEY (id),
  CONSTRAINT equipments_boat_id_fkey FOREIGN KEY (boat_id) REFERENCES public.boats(id)
);

CREATE TABLE public.interventions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  boat_id uuid NOT NULL,
  description text,
  title text NOT NULL,
  date timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT interventions_pkey PRIMARY KEY (id),
  CONSTRAINT interventions_boat_id_fkey FOREIGN KEY (boat_id) REFERENCES public.boats(id)
);

CREATE OR REPLACE FUNCTION is_boat_owner(check_boat_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
SELECT EXISTS (
  SELECT 1
  FROM public.boats
  WHERE id = check_boat_id
  AND owner_id = auth.uid()
);
$$;

create policy "Users can create boats"
on "public"."boats"
to authenticated
with check (
  true
);

create policy "Users can manage their own boat"
on "public"."boats"
to authenticated
using (
  (( SELECT auth.uid() AS uid) = owner_id)
) with check (
  (( SELECT auth.uid() AS uid) = owner_id)
);

create policy "Users can view boats they have access to"
on "public"."boats"
to authenticated
using (
  (id IN ( SELECT accesses.boat_id
   FROM accesses
  WHERE (accesses.user_id = ( SELECT auth.uid() AS uid))))
);

create policy "Enable users to view their own data only"
on "public"."accesses"
to authenticated
using (
  (( SELECT auth.uid() AS uid) = user_id)
);

create policy "Owners can manage access to their own boat"
on "public"."accesses"
to authenticated
using (
  is_boat_owner(boat_id)
) with check (
  is_boat_owner(boat_id)
);

create policy "Enable owners to manage interventions onto their own boat only"
on "public"."interventions"
to authenticated
using (
  (boat_id IN ( SELECT boats.id
   FROM boats
  WHERE (( SELECT auth.uid() AS uid) = boats.owner_id)))
) with check (
  (boat_id IN ( SELECT boats.id
   FROM boats
  WHERE (( SELECT auth.uid() AS uid) = boats.owner_id)))
);

create policy "Users can manage interventions for their boats"
on "public"."interventions"
to authenticated
using (
  (boat_id IN ( SELECT accesses.boat_id
   FROM accesses
  WHERE (accesses.user_id = auth.uid())))
) with check (
  (boat_id IN ( SELECT accesses.boat_id
   FROM accesses
  WHERE (accesses.user_id = auth.uid())))
);


