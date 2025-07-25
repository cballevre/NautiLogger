create type "public"."access_role" as enum ('owner', 'operator', 'viewer');

drop policy "Owners can manage access to their own boat" on "public"."accesses";

drop policy "Users can create boats" on "public"."boats";

drop policy "Users can manage their own boat" on "public"."boats";

drop policy "Users can view boats they have access to" on "public"."boats";

drop policy "Owners can manage equipments of their boats" on "public"."equipments";

drop policy "Users can manage the equipments of their boats to which they ha" on "public"."equipments";

drop policy "Enable owners to manage interventions onto their own boat only" on "public"."interventions";

drop policy "Users can manage interventions for their boats" on "public"."interventions";

alter table "public"."boats" drop constraint "boats_owner_id_fkey";

alter table "public"."accesses" drop constraint "accesses_boat_id_fkey";

alter table "public"."accesses" drop constraint "accesses_user_id_fkey";

drop function if exists "public"."is_boat_owner"(check_boat_id uuid);

alter table "public"."accesses" add column "role" access_role not null default 'viewer'::access_role;

alter table "public"."boats" rename column "owner_id" to "created_by";

CREATE INDEX idx_equipment_attachments_equipment_id ON public.equipment_attachments USING btree (equipment_id);

alter table "public"."boats" add constraint "boats_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."boats" validate constraint "boats_created_by_fkey";

alter table "public"."accesses" add constraint "accesses_boat_id_fkey" FOREIGN KEY (boat_id) REFERENCES boats(id) ON DELETE CASCADE not valid;

alter table "public"."accesses" validate constraint "accesses_boat_id_fkey";

alter table "public"."accesses" add constraint "accesses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."accesses" validate constraint "accesses_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.grant_boat_access()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.accesses (boat_id, user_id, role)
  values (new.id, new.created_by, 'owner');
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.has_boat_access(boat uuid)
 RETURNS boolean
 LANGUAGE sql
 SET search_path TO ''
AS $function$
  select exists (
    select 1
    from public.accesses
    where accesses.boat_id = boat
      and accesses.user_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.check_equipment_access(equipment_id uuid)
 RETURNS boolean
 LANGUAGE sql
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

create policy "Allow users to delete boats they can access"
on "public"."boats"
as permissive
for delete
to authenticated
using (has_boat_access(id));


create policy "Allow users to insert boats"
on "public"."boats"
as permissive
for insert
to authenticated
with check (true);


create policy "Allow users to select boats they can access"
on "public"."boats"
as permissive
for select
to authenticated
using ((has_boat_access(id) OR (created_by = auth.uid())));


create policy "Allow users to update boats they can access"
on "public"."boats"
as permissive
for update
to authenticated
using (has_boat_access(id))
with check (has_boat_access(id));


create policy "Allow user manage equipments for their boats"
on "public"."equipments"
as permissive
for all
to authenticated
using (has_boat_access(boat_id))
with check (has_boat_access(boat_id));


create policy "Allow user manage interventions for their boats"
on "public"."interventions"
as permissive
for all
to authenticated
using (has_boat_access(boat_id))
with check (has_boat_access(boat_id));


CREATE TRIGGER boats_after_insert AFTER INSERT ON public.boats FOR EACH ROW EXECUTE FUNCTION grant_boat_access();
