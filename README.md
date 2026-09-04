# IVS Security Website

Phase 1 marketing website and lead management dashboard for IVS Security — a manpower-based security services company serving residential buildings, commercial facilities, and events.

## Features

- Marketing pages: Home, About, Services (Residential / Commercial / Events), Contact
- Dynamic quote form with service-specific fields
- Contact form with shared lead pipeline
- Admin dashboard with login, lead list, filters, and status workflow
- Mobile sticky Call + WhatsApp buttons
- SEO: metadata, sitemap, robots.txt

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Prisma + SQLite (local dev)
- NextAuth.js v5 (admin authentication)
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
- `DATABASE_URL` — SQLite path (default: `file:./dev.db`)
- `AUTH_SECRET` — random secret for sessions
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — initial admin login
- `NEXT_PUBLIC_*` — phone, WhatsApp, email, address, city

### 3. Set up database

```bash
npx prisma db push
npm run db:seed
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)

Default credentials (from `.env`):
- Email: `admin@ivssecurity.com`
- Password: `admin123`

## Project Structure

```
src/
├── app/              # Pages and API routes
├── components/       # UI, layout, forms, admin
├── lib/              # DB, auth helpers, validations
└── auth.ts           # NextAuth configuration
prisma/
├── schema.prisma     # Lead + AdminUser models
└── seed.ts           # Creates admin user
```

## Lead Status Workflow

`NEW` → `CONTACTED` → `QUOTED` → `WON` / `LOST`

## Future Phases

- **Phase 3:** Security personnel profiles, site assignments, transfers
- **Phase 4:** Guard check-in/check-out, live status, attendance reports

## Deployment

1. Create a [Supabase](https://supabase.com) project and copy the database connection strings
2. Set `DATABASE_URL` to the **Transaction pooler** URL (port `6543`, with `?pgbouncer=true`) and `DIRECT_URL` to the **Session/direct** URL (port `5432`)
3. Deploy to Vercel and set all environment variables from `.env.example`
4. Run `npx prisma db push` against the production DB and `npm run db:seed` for the admin user

## Customization

Update these before going live:
- Company phone, WhatsApp, email, address in `.env`
- Hero stats, testimonials, and copy in page components
- Logo and brand colors in `globals.css`
