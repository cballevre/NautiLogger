alter table "public"."equipment_attachments" add column "type" text not null default 'document';

alter table "public"."intervention_attachments" add column "type" text not null default 'document';

alter table "public"."equipment_attachments" add constraint "equipment_attachments_type_check" CHECK ((type = ANY (ARRAY['photo'::text, 'document'::text]))) not valid;

alter table "public"."equipment_attachments" validate constraint "equipment_attachments_type_check";

alter table "public"."intervention_attachments" add constraint "intervention_attachments_type_check" CHECK ((type = ANY (ARRAY['photo'::text, 'document'::text]))) not valid;

alter table "public"."intervention_attachments" validate constraint "intervention_attachments_type_check";


