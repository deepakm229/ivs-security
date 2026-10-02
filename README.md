# IVS Security Website

Phase 1 marketing website and lead management dashboard for IVS Security — a manpower-based security services company serving residential buildings, commercial facilities, and events.

## Features

- Marketing pages: Home, About, Services (Residential / Commercial / Events), Contact
- Dynamic quote form with service-specific fields
- Contact form with shared lead pipeline
- Admin dashboard with Supabase Auth, RBAC, lead list, filters, and status workflow
- Header **Login** modal for admins; public site unchanged for visitors
- Mobile sticky Call + WhatsApp buttons
- SEO: metadata, sitemap, robots.txt

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Prisma + Supabase Postgres
- Supabase Auth + Postgres RBAC (roles / permissions / RLS)
- React Hook Form + Zod

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Key variables:

- `DATABASE_URL` / `DIRECT_URL` — Supabase Postgres (pooler + direct)
- `SUPABASE_URL` / `SUPABASE_ANON_KEY` — Supabase API
- `SUPABASE_SERVICE_ROLE_KEY` — server-only (admin provisioning script)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — first admin (for `npm run create-admin`)
- `RESEND_*` — quote/contact notification emails
- `NEXT_PUBLIC_*` — phone, WhatsApp, site URL

### 3. Supabase project setup

1. Create a [Supabase](https://supabase.com) project.
2. **Authentication → Providers:** enable Email.
3. **Authentication → Settings:** disable public sign-up (invite-only admins).
4. **Authentication → URL configuration:** add site URL `http://localhost:3000` and redirect URLs as needed.
5. Apply RBAC schema:
   - **Option A:** `supabase link` then `supabase db push`
   - **Option B:** run [`supabase/migrations/20250320000000_auth_rbac.sql`](supabase/migrations/20250320000000_auth_rbac.sql) in the SQL Editor (after `Lead` table exists from Prisma).

### 4. Database (Prisma)

```bash
npx prisma db push
npm run db:seed
```

`db:seed` upserts roles and permissions. It does **not** create login passwords.

### 5. Create the first admin user

```bash
npm run create-admin
```

This uses the Supabase service role to create the auth user, profile, and `admin` role assignment.

### 6. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

- **Public site:** same as before for anonymous visitors.
- **Admin:** click **Login** in the header or go to [http://localhost:3000/admin](http://localhost:3000/admin).

## Auth and authorization module

```
src/lib/supabase/     # Browser + server Supabase clients, session middleware
src/lib/auth/         # Permissions, session, guards (API + pages)
supabase/migrations/  # Roles, permissions, profiles, RLS
```

**Permissions (extensible):** `leads:read`, `leads:write`. Add roles in `roles`, map via `role_permissions`, assign with `user_roles`.

**No access:** users signed in without a role see [`/admin/forbidden`](src/app/admin/forbidden/page.tsx).

## Project Structure

```
src/
├── app/              # Pages and API routes
├── components/       # UI, layout, forms, admin, auth
├── lib/              # DB, Supabase, auth, validations
prisma/
├── schema.prisma     # Lead + RBAC models
└── seed.ts           # Roles and permissions
scripts/
└── create-admin.ts   # Provision Supabase admin user
```

## Lead Status Workflow

`NEW` → `CONTACTED` → `QUOTED` → `WON` / `LOST`

## Deployment

1. Set all environment variables from `.env.example` on Vercel.
2. Run Supabase migration SQL on production Postgres if not already applied.
3. `npx prisma db push` and `npm run db:seed` against production.
4. `npm run create-admin` once per environment (or add users in Supabase Dashboard and assign roles in SQL).

## Customization

Update these before going live:

- Company phone, WhatsApp, email, address in `.env` / `site-contact.ts`
- Hero stats, testimonials, and copy in page components
- Logo and brand colors in `globals.css`
