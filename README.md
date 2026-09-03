# Tiberias View Website

Production-ready Next.js website for:

- Arabic name: متنزه واستراحة بحيرة طبريا - صما
- Brand: Tiberias View
- Location: Tiberias View Park, Samma, Jordan

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- next-intl (ar, en, de)
- Zod + React Hook Form
- Lucide icons

## Routes

- `/` redirects to `/ar`
- Localized pages:
- `/ar`, `/en`, `/de`
- `/ar/booking`, `/en/booking`, `/de/booking`

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
NEXT_PUBLIC_SITE_URL=...
```

No credentials are hardcoded in the app.

## Reservation Logic (v1: WhatsApp only)

There is no database or admin dashboard yet. The booking form (`/booking`) validates the
request client-side, then builds a formatted WhatsApp message and opens
`https://wa.me/962772256108` with that message pre-filled. Nothing is sent until the visitor
presses send inside WhatsApp, and the UI clearly states this is a reservation **request**, not
a confirmed booking — Tiberias View confirms availability directly over WhatsApp.

The form schema (`lib/validation/reservation.ts`) and the message builder in
`components/booking/booking-form.tsx` are kept separate on purpose, so a future version can add
a backend (e.g. persist requests to a database and add an admin dashboard to manage/confirm
them) without rewriting the booking UI — the new step would just run before or alongside the
WhatsApp handoff in `onSubmit`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build and Lint

```bash
npm run lint
npm run build
```
