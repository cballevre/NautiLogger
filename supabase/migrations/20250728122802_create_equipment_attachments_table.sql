create table "public"."equipment_attachments" (
    "id" uuid not null default gen_random_uuid(),
    "equipment_id" uuid not null,
    "file_path" text not null,
    "file_name" text not null,
    "file_type" text,
    "description" text,
    "uploaded_at" timestamp with time zone not null default now()
);


alter table "public"."equipment_attachments" enable row level security;

CREATE UNIQUE INDEX attachments_pkey ON public.equipment_attachments USING btree (id);

alter table "public"."equipment_attachments" add constraint "attachments_pkey" PRIMARY KEY using index "attachments_pkey";

alter table "public"."equipment_attachments" add constraint "attachments_equipment_id_fkey" FOREIGN KEY (equipment_id) REFERENCES equipments(id) ON DELETE CASCADE not valid;

alter table "public"."equipment_attachments" validate constraint "attachments_equipment_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_equipment_access(equipment_id uuid)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.equipments e
    JOIN public.accesses a ON e.boat_id = a.boat_id
    WHERE e.id = equipment_id
      AND a.user_id = (SELECT auth.uid())
  );
$function$
;

grant delete on table "public"."equipment_attachments" to "anon";

grant insert on table "public"."equipment_attachments" to "anon";

grant references on table "public"."equipment_attachments" to "anon";

grant select on table "public"."equipment_attachments" to "anon";

grant trigger on table "public"."equipment_attachments" to "anon";

grant truncate on table "public"."equipment_attachments" to "anon";

grant update on table "public"."equipment_attachments" to "anon";

grant delete on table "public"."equipment_attachments" to "authenticated";

grant insert on table "public"."equipment_attachments" to "authenticated";

grant references on table "public"."equipment_attachments" to "authenticated";

grant select on table "public"."equipment_attachments" to "authenticated";

grant trigger on table "public"."equipment_attachments" to "authenticated";

grant truncate on table "public"."equipment_attachments" to "authenticated";

grant update on table "public"."equipment_attachments" to "authenticated";

grant delete on table "public"."equipment_attachments" to "service_role";

grant insert on table "public"."equipment_attachments" to "service_role";

grant references on table "public"."equipment_attachments" to "service_role";

grant select on table "public"."equipment_attachments" to "service_role";

grant trigger on table "public"."equipment_attachments" to "service_role";

grant truncate on table "public"."equipment_attachments" to "service_role";

grant update on table "public"."equipment_attachments" to "service_role";

create policy "Users can manage attachments of equipments to which they have a"
on "public"."equipment_attachments"
as permissive
for all
to authenticated
using (check_equipment_access(equipment_id))
with check (check_equipment_access(equipment_id));
