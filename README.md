# EstateFlow AI — functional MVP

A Next.js 15 + Supabase multi-tenant lead capture and rule-based qualification starter. Includes a marketing page, password login, protected dashboard, lead submission API, validation, and tenant-level row-level security.

## Setup
1. Create a Supabase project. Run `supabase/001_init.sql` in its SQL editor.
2. Copy `.env.example` to `.env.local` and set project URL and publishable/anon key. Never use the service role key in a `NEXT_PUBLIC_` variable.
3. Run `npm install && npm run dev`; visit `http://localhost:3000`.
4. In Supabase Authentication, create a user manually (or invite them). Verify email if required.
5. In SQL editor, provision an agency for that user, replacing the UUID with the user's Auth UUID:

```sql
with a as (insert into public.agencies(name) values ('Demo Realty') returning id)
insert into public.agency_members(agency_id,user_id,role)
select id,'REPLACE_WITH_AUTH_USER_UUID'::uuid,'owner' from a;
```
6. Sign in at `/login`. Add a lead in `/dashboard`.

## Safety and deployment notes
- The qualification algorithm is deterministic and illustrative, not AI-generated. Budgets are in INR; adjust thresholds for your market.
- No WhatsApp messaging, CRM sync, appointments, billing, automated onboarding, public lead intake, or OpenAI integration is implemented yet. Do not market these as live features.
- Only manually entered leads from authenticated agency members are accepted. Public forms need a separate abuse-protected intake flow and server-side agency identification.
- RLS enforces agency separation. Membership provisioning currently happens through Supabase admin/SQL, not through public signup.
- Consent is recorded as a boolean, but you should add consent text/version, timestamp, retention/deletion flows and a privacy policy before real customer use.
- Add rate limiting, audit trails, automated tests, monitoring, backups, authorization roles, and security review before production deployment.
- On Vercel, configure the two environment variables for each environment and deploy the Next.js repository. Set appropriate Supabase auth URLs.
