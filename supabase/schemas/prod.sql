


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."is_boat_owner"("check_boat_id" "uuid") RETURNS boolean
    LANGUAGE "sql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
SELECT EXISTS (
  SELECT 1
  FROM public.boats
  WHERE id = check_boat_id
  AND owner_id = auth.uid()
);
$$;


ALTER FUNCTION "public"."is_boat_owner"("check_boat_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."accesses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "boat_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."accesses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."boats" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "owner_id" "uuid" NOT NULL,
    "name" character varying,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."boats" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."equipments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "purchase_value" real,
    "purchase_date" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "boat_id" "uuid" NOT NULL,
    "system_key" "text" NOT NULL
);


ALTER TABLE "public"."equipments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."interventions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "boat_id" "uuid" NOT NULL,
    "description" "text",
    "title" "text" NOT NULL,
    "date" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."interventions" OWNER TO "postgres";


ALTER TABLE ONLY "public"."accesses"
    ADD CONSTRAINT "accesses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."boats"
    ADD CONSTRAINT "boats_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."equipments"
    ADD CONSTRAINT "equipments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."interventions"
    ADD CONSTRAINT "interventions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."accesses"
    ADD CONSTRAINT "accesses_boat_id_fkey" FOREIGN KEY ("boat_id") REFERENCES "public"."boats"("id");



ALTER TABLE ONLY "public"."accesses"
    ADD CONSTRAINT "accesses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."boats"
    ADD CONSTRAINT "boats_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."equipments"
    ADD CONSTRAINT "equipments_boat_id_fkey" FOREIGN KEY ("boat_id") REFERENCES "public"."boats"("id");



ALTER TABLE ONLY "public"."interventions"
    ADD CONSTRAINT "interventions_boat_id_fkey" FOREIGN KEY ("boat_id") REFERENCES "public"."boats"("id");



CREATE POLICY "Enable owners to manage interventions onto their own boat only" ON "public"."interventions" TO "authenticated" USING (("boat_id" IN ( SELECT "boats"."id"
   FROM "public"."boats"
  WHERE (( SELECT "auth"."uid"() AS "uid") = "boats"."owner_id")))) WITH CHECK (("boat_id" IN ( SELECT "boats"."id"
   FROM "public"."boats"
  WHERE (( SELECT "auth"."uid"() AS "uid") = "boats"."owner_id"))));



CREATE POLICY "Enable users to view their own data only" ON "public"."accesses" TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Owners can manage access to their own boat" ON "public"."accesses" TO "authenticated" USING ("public"."is_boat_owner"("boat_id")) WITH CHECK ("public"."is_boat_owner"("boat_id"));



CREATE POLICY "Owners can manage equipments of their boats" ON "public"."equipments" TO "authenticated" USING (("boat_id" IN ( SELECT "boats"."id"
   FROM "public"."boats"
  WHERE (( SELECT "auth"."uid"() AS "uid") = "boats"."owner_id")))) WITH CHECK (("boat_id" IN ( SELECT "boats"."id"
   FROM "public"."boats"
  WHERE (( SELECT "auth"."uid"() AS "uid") = "boats"."owner_id"))));



CREATE POLICY "Users can create boats" ON "public"."boats" TO "authenticated" WITH CHECK (true);



CREATE POLICY "Users can manage interventions for their boats" ON "public"."interventions" TO "authenticated" USING (("boat_id" IN ( SELECT "accesses"."boat_id"
   FROM "public"."accesses"
  WHERE ("accesses"."user_id" = "auth"."uid"())))) WITH CHECK (("boat_id" IN ( SELECT "accesses"."boat_id"
   FROM "public"."accesses"
  WHERE ("accesses"."user_id" = "auth"."uid"()))));



CREATE POLICY "Users can manage the equipments of their boats to which they ha" ON "public"."equipments" TO "authenticated" USING (("boat_id" IN ( SELECT "accesses"."boat_id"
   FROM "public"."accesses"
  WHERE ("accesses"."user_id" = "auth"."uid"())))) WITH CHECK (("boat_id" IN ( SELECT "accesses"."boat_id"
   FROM "public"."accesses"
  WHERE ("accesses"."user_id" = "auth"."uid"()))));



CREATE POLICY "Users can manage their own boat" ON "public"."boats" TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "owner_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "owner_id"));



CREATE POLICY "Users can view boats they have access to" ON "public"."boats" TO "authenticated" USING (("id" IN ( SELECT "accesses"."boat_id"
   FROM "public"."accesses"
  WHERE ("accesses"."user_id" = ( SELECT "auth"."uid"() AS "uid")))));



ALTER TABLE "public"."accesses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."boats" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."equipments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."interventions" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."is_boat_owner"("check_boat_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_boat_owner"("check_boat_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_boat_owner"("check_boat_id" "uuid") TO "service_role";


















GRANT ALL ON TABLE "public"."accesses" TO "anon";
GRANT ALL ON TABLE "public"."accesses" TO "authenticated";
GRANT ALL ON TABLE "public"."accesses" TO "service_role";



GRANT ALL ON TABLE "public"."boats" TO "anon";
GRANT ALL ON TABLE "public"."boats" TO "authenticated";
GRANT ALL ON TABLE "public"."boats" TO "service_role";



GRANT ALL ON TABLE "public"."equipments" TO "anon";
GRANT ALL ON TABLE "public"."equipments" TO "authenticated";
GRANT ALL ON TABLE "public"."equipments" TO "service_role";



GRANT ALL ON TABLE "public"."interventions" TO "anon";
GRANT ALL ON TABLE "public"."interventions" TO "authenticated";
GRANT ALL ON TABLE "public"."interventions" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
