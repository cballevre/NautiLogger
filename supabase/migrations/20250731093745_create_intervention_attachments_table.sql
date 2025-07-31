alter table "public"."equipment_attachments" drop constraint "attachments_equipment_id_fkey";

alter table "public"."equipment_attachments" drop constraint "attachments_pkey";

drop index if exists "public"."attachments_pkey";

create table "public"."intervention_attachments" (
    "id" uuid not null default gen_random_uuid(),
    "intervention_id" uuid not null,
    "file_path" text not null,
    "file_name" text not null,
    "file_type" text,
    "description" text,
    "uploaded_at" timestamp with time zone not null default now()
);


alter table "public"."intervention_attachments" enable row level security;

CREATE UNIQUE INDEX equipment_attachments_pkey ON public.equipment_attachments USING btree (id);

CREATE INDEX idx_intervention_attachments_intervention_id ON public.intervention_attachments USING btree (intervention_id);

CREATE UNIQUE INDEX intervention_attachments_pkey ON public.intervention_attachments USING btree (id);

alter table "public"."equipment_attachments" add constraint "equipment_attachments_pkey" PRIMARY KEY using index "equipment_attachments_pkey";

alter table "public"."intervention_attachments" add constraint "intervention_attachments_pkey" PRIMARY KEY using index "intervention_attachments_pkey";

alter table "public"."equipment_attachments" add constraint "equipment_attachments_equipment_id_fkey" FOREIGN KEY (equipment_id) REFERENCES equipments(id) ON DELETE CASCADE not valid;

alter table "public"."equipment_attachments" validate constraint "equipment_attachments_equipment_id_fkey";

alter table "public"."intervention_attachments" add constraint "intervention_attachments_intervention_id_fkey" FOREIGN KEY (intervention_id) REFERENCES interventions(id) ON DELETE CASCADE not valid;

alter table "public"."intervention_attachments" validate constraint "intervention_attachments_intervention_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_intervention_access(intervention_id uuid)
 RETURNS boolean
 LANGUAGE sql
 SET search_path TO ''
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.interventions e
    JOIN public.accesses a ON e.boat_id = a.boat_id
    WHERE e.id = intervention_id
      AND a.user_id = (SELECT auth.uid())
  );
$function$
;

grant delete on table "public"."intervention_attachments" to "anon";

grant insert on table "public"."intervention_attachments" to "anon";

grant references on table "public"."intervention_attachments" to "anon";

grant select on table "public"."intervention_attachments" to "anon";

grant trigger on table "public"."intervention_attachments" to "anon";

grant truncate on table "public"."intervention_attachments" to "anon";

grant update on table "public"."intervention_attachments" to "anon";

grant delete on table "public"."intervention_attachments" to "authenticated";

grant insert on table "public"."intervention_attachments" to "authenticated";

grant references on table "public"."intervention_attachments" to "authenticated";

grant select on table "public"."intervention_attachments" to "authenticated";

grant trigger on table "public"."intervention_attachments" to "authenticated";

grant truncate on table "public"."intervention_attachments" to "authenticated";

grant update on table "public"."intervention_attachments" to "authenticated";

grant delete on table "public"."intervention_attachments" to "service_role";

grant insert on table "public"."intervention_attachments" to "service_role";

grant references on table "public"."intervention_attachments" to "service_role";

grant select on table "public"."intervention_attachments" to "service_role";

grant trigger on table "public"."intervention_attachments" to "service_role";

grant truncate on table "public"."intervention_attachments" to "service_role";

grant update on table "public"."intervention_attachments" to "service_role";

create policy "Users can manage attachments of interventions to which they hav"
on "public"."intervention_attachments"
as permissive
for all
to authenticated
using (check_intervention_access(intervention_id))
with check (check_intervention_access(intervention_id));



