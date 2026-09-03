# Tiberias View Website

Production-ready Next.js website for:

- Arabic name: متنزه واستراحة بحيرة طبريا - صما
- Brand: Tiberias View
- Location: Tiberias View Park, Samma, Jordan

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- next-intl (ar, en, de)
- Supabase (reservations + admin auth)
- Zod + React Hook Form
- Lucide icons

## Routes

- `/` redirects to `/ar`
- Localized pages:
- `/ar`, `/en`, `/de`
- `/ar/booking`, `/en/booking`, `/de/booking`
- `/ar/admin`, `/en/admin`, `/de/admin`

Arabic is the default locale and uses RTL.

## Images

Place real images in `public/images/`:

- `hero-sunset.jpg`
- `heart-view.jpg`
- `fountain-terrace.jpg`

Do not use Facebook screenshots or stock photos.

## Environment Variables

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

No credentials are hardcoded in the app.

## Supabase Setup

1. Run SQL from `supabase/schema.sql` in your Supabase SQL editor.
2. Create at least one admin user in Supabase Authentication.
3. Use that admin account to log in on `/ar/admin` (or another locale).

## Reservation Logic

The booking form creates a reservation request only.

- Initial status is always `pending`
- Admin can change status to:
- `confirmed`
- `rejected`
- `cancelled`

This avoids accidental double-booking while capacity/time slot rules are still evolving.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3001`.

## Build and Lint

```bash
npm run lint
npm run build
```
