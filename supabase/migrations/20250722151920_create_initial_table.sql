create table "public"."accesses" (
    "id" uuid not null default gen_random_uuid(),
    "boat_id" uuid not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."accesses" enable row level security;

create table "public"."boats" (
    "id" uuid not null default gen_random_uuid(),
    "owner_id" uuid not null,
    "name" character varying,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."boats" enable row level security;

create table "public"."equipments" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "purchase_value" real,
    "purchase_date" timestamp with time zone,
    "created_at" timestamp with time zone not null default now(),
    "boat_id" uuid not null,
    "system_key" text not null
);


alter table "public"."equipments" enable row level security;

create table "public"."interventions" (
    "id" uuid not null default gen_random_uuid(),
    "boat_id" uuid not null,
    "description" text,
    "title" text not null,
    "date" timestamp with time zone not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."interventions" enable row level security;

CREATE UNIQUE INDEX accesses_pkey ON public.accesses USING btree (id);

CREATE UNIQUE INDEX boats_pkey ON public.boats USING btree (id);

CREATE UNIQUE INDEX equipments_pkey ON public.equipments USING btree (id);

CREATE UNIQUE INDEX interventions_pkey ON public.interventions USING btree (id);

alter table "public"."accesses" add constraint "accesses_pkey" PRIMARY KEY using index "accesses_pkey";

alter table "public"."boats" add constraint "boats_pkey" PRIMARY KEY using index "boats_pkey";

alter table "public"."equipments" add constraint "equipments_pkey" PRIMARY KEY using index "equipments_pkey";

alter table "public"."interventions" add constraint "interventions_pkey" PRIMARY KEY using index "interventions_pkey";

alter table "public"."accesses" add constraint "accesses_boat_id_fkey" FOREIGN KEY (boat_id) REFERENCES boats(id) not valid;

alter table "public"."accesses" validate constraint "accesses_boat_id_fkey";

alter table "public"."accesses" add constraint "accesses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."accesses" validate constraint "accesses_user_id_fkey";

alter table "public"."boats" add constraint "boats_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) not valid;

alter table "public"."boats" validate constraint "boats_owner_id_fkey";

alter table "public"."equipments" add constraint "equipments_boat_id_fkey" FOREIGN KEY (boat_id) REFERENCES boats(id) not valid;

alter table "public"."equipments" validate constraint "equipments_boat_id_fkey";

alter table "public"."interventions" add constraint "interventions_boat_id_fkey" FOREIGN KEY (boat_id) REFERENCES boats(id) not valid;

alter table "public"."interventions" validate constraint "interventions_boat_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_boat_owner(check_boat_id uuid)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select exists (
    select 1
    from public.boats
    where id = check_boat_id
    and owner_id = auth.uid()
  );
$function$
;

grant delete on table "public"."accesses" to "anon";

grant insert on table "public"."accesses" to "anon";

grant references on table "public"."accesses" to "anon";

grant select on table "public"."accesses" to "anon";

grant trigger on table "public"."accesses" to "anon";

grant truncate on table "public"."accesses" to "anon";

grant update on table "public"."accesses" to "anon";

grant delete on table "public"."accesses" to "authenticated";

grant insert on table "public"."accesses" to "authenticated";

grant references on table "public"."accesses" to "authenticated";

grant select on table "public"."accesses" to "authenticated";

grant trigger on table "public"."accesses" to "authenticated";

grant truncate on table "public"."accesses" to "authenticated";

grant update on table "public"."accesses" to "authenticated";

grant delete on table "public"."accesses" to "service_role";

grant insert on table "public"."accesses" to "service_role";

grant references on table "public"."accesses" to "service_role";

grant select on table "public"."accesses" to "service_role";

grant trigger on table "public"."accesses" to "service_role";

grant truncate on table "public"."accesses" to "service_role";

grant update on table "public"."accesses" to "service_role";

grant delete on table "public"."boats" to "anon";

grant insert on table "public"."boats" to "anon";

grant references on table "public"."boats" to "anon";

grant select on table "public"."boats" to "anon";

grant trigger on table "public"."boats" to "anon";

grant truncate on table "public"."boats" to "anon";

grant update on table "public"."boats" to "anon";

grant delete on table "public"."boats" to "authenticated";

grant insert on table "public"."boats" to "authenticated";

grant references on table "public"."boats" to "authenticated";

grant select on table "public"."boats" to "authenticated";

grant trigger on table "public"."boats" to "authenticated";

grant truncate on table "public"."boats" to "authenticated";

grant update on table "public"."boats" to "authenticated";

grant delete on table "public"."boats" to "service_role";

grant insert on table "public"."boats" to "service_role";

grant references on table "public"."boats" to "service_role";

grant select on table "public"."boats" to "service_role";

grant trigger on table "public"."boats" to "service_role";

grant truncate on table "public"."boats" to "service_role";

grant update on table "public"."boats" to "service_role";

grant delete on table "public"."equipments" to "anon";

grant insert on table "public"."equipments" to "anon";

grant references on table "public"."equipments" to "anon";

grant select on table "public"."equipments" to "anon";

grant trigger on table "public"."equipments" to "anon";

grant truncate on table "public"."equipments" to "anon";

grant update on table "public"."equipments" to "anon";

grant delete on table "public"."equipments" to "authenticated";

grant insert on table "public"."equipments" to "authenticated";

grant references on table "public"."equipments" to "authenticated";

grant select on table "public"."equipments" to "authenticated";

grant trigger on table "public"."equipments" to "authenticated";

grant truncate on table "public"."equipments" to "authenticated";

grant update on table "public"."equipments" to "authenticated";

grant delete on table "public"."equipments" to "service_role";

grant insert on table "public"."equipments" to "service_role";

grant references on table "public"."equipments" to "service_role";

grant select on table "public"."equipments" to "service_role";

grant trigger on table "public"."equipments" to "service_role";

grant truncate on table "public"."equipments" to "service_role";

grant update on table "public"."equipments" to "service_role";

grant delete on table "public"."interventions" to "anon";

grant insert on table "public"."interventions" to "anon";

grant references on table "public"."interventions" to "anon";

grant select on table "public"."interventions" to "anon";

grant trigger on table "public"."interventions" to "anon";

grant truncate on table "public"."interventions" to "anon";

grant update on table "public"."interventions" to "anon";

grant delete on table "public"."interventions" to "authenticated";

grant insert on table "public"."interventions" to "authenticated";

grant references on table "public"."interventions" to "authenticated";

grant select on table "public"."interventions" to "authenticated";

grant trigger on table "public"."interventions" to "authenticated";

grant truncate on table "public"."interventions" to "authenticated";

grant update on table "public"."interventions" to "authenticated";

grant delete on table "public"."interventions" to "service_role";

grant insert on table "public"."interventions" to "service_role";

grant references on table "public"."interventions" to "service_role";

grant select on table "public"."interventions" to "service_role";

grant trigger on table "public"."interventions" to "service_role";

grant truncate on table "public"."interventions" to "service_role";

grant update on table "public"."interventions" to "service_role";

create policy "Enable users to view their own data only"
on "public"."accesses"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Owners can manage access to their own boat"
on "public"."accesses"
as permissive
for all
to authenticated
using (is_boat_owner(boat_id))
with check (is_boat_owner(boat_id));


create policy "Users can create boats"
on "public"."boats"
as permissive
for all
to authenticated
with check (true);


create policy "Users can manage their own boat"
on "public"."boats"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = owner_id))
with check ((( SELECT auth.uid() AS uid) = owner_id));


create policy "Users can view boats they have access to"
on "public"."boats"
as permissive
for all
to authenticated
using ((id IN ( SELECT accesses.boat_id
   FROM accesses
  WHERE (accesses.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Owners can manage equipments of their boats"
on "public"."equipments"
as permissive
for all
to authenticated
using ((boat_id IN ( SELECT boats.id
   FROM boats
  WHERE (( SELECT auth.uid() AS uid) = boats.owner_id))))
with check ((boat_id IN ( SELECT boats.id
   FROM boats
  WHERE (( SELECT auth.uid() AS uid) = boats.owner_id))));


create policy "Users can manage the equipments of their boats to which they ha"
on "public"."equipments"
as permissive
for all
to authenticated
using ((boat_id IN ( SELECT accesses.boat_id
   FROM accesses
  WHERE (accesses.user_id = auth.uid()))))
with check ((boat_id IN ( SELECT accesses.boat_id
   FROM accesses
  WHERE (accesses.user_id = auth.uid()))));


create policy "Enable owners to manage interventions onto their own boat only"
on "public"."interventions"
as permissive
for all
to authenticated
using ((boat_id IN ( SELECT boats.id
   FROM boats
  WHERE (( SELECT auth.uid() AS uid) = boats.owner_id))))
with check ((boat_id IN ( SELECT boats.id
   FROM boats
  WHERE (( SELECT auth.uid() AS uid) = boats.owner_id))));


create policy "Users can manage interventions for their boats"
on "public"."interventions"
as permissive
for all
to authenticated
using ((boat_id IN ( SELECT accesses.boat_id
   FROM accesses
  WHERE (accesses.user_id = auth.uid()))))
with check ((boat_id IN ( SELECT accesses.boat_id
   FROM accesses
  WHERE (accesses.user_id = auth.uid()))));



