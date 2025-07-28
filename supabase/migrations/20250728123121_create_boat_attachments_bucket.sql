insert into storage.buckets
  (id, name, public)
values
  ('boat_attachments', 'boat_attachments', false);

create policy "Give users access to boat folder which has access"
on "storage"."objects"
as permissive
for all
to authenticated
using (((bucket_id = 'boat_attachments'::text) AND ((storage.foldername(name))[1] IN ( SELECT (accesses.boat_id)::text AS boat_id
   FROM accesses
  WHERE (accesses.user_id = ( SELECT auth.uid() AS uid))))))
with check (((bucket_id = 'boat_attachments'::text) AND ((storage.foldername(name))[1] IN ( SELECT (accesses.boat_id)::text AS boat_id
   FROM accesses
  WHERE (accesses.user_id = ( SELECT auth.uid() AS uid))))));
