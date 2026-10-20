# Elia & Mirriam — Wedding Website

**PERN Stack** · PostgreSQL · Express · React · Node.js

---

## Quick Start

### 1. Database — Neon PostgreSQL

Create a free database at [neon.tech](https://neon.tech), then run:

```sql
-- Paste the contents of database/schema.sql into the Neon SQL editor
```

### 2. Backend

```bash
cd server
cp .env.example .env
# Fill in DATABASE_URL, CLIENT_ORIGIN, ADMIN_KEY in .env
# Generate an admin key: node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

npm install
npm run dev        # Starts on port 5000
```

### 3. Frontend

```bash
cd client
npm install
npm run dev        # Starts on port 3000 — proxies /api to :5000
```

---

## Project Structure

```
wedding/
├── client/          # React + Vite
│   └── src/
│       ├── components/layout/   # Navbar, Footer, Layout
│       ├── components/ui/       # SectionHeading, Divider, Photo, MapEmbed
│       ├── data/wedding.js      # ★ All wedding details (date, venues, schedule…)
│       ├── hooks/               # useCountdown, useRSVP, usePageTitle
│       ├── pages/               # Home, Story, WeddingDetails, RSVP, Admin, NotFound
│       ├── services/api.js      # Fetch wrapper
│       └── styles/              # tokens.css, globals.css
│
├── server/          # Node.js + Express
│   └── src/
│       ├── config/db.js
│       ├── controllers/rsvpController.js
│       ├── middleware/          # validateRSVP, requireAdmin, errorHandler
│       └── routes/rsvpRoutes.js
│
└── database/
    └── schema.sql
```

---

## Customisation

| What to change | Where |
|---|---|
| Colors, fonts, spacing | `client/src/styles/tokens.css` |
| **All wedding details** (date, venues, schedule, contacts, photos) | `client/src/data/wedding.js` |
| Story text | `client/src/pages/Story.jsx` |
| Real photos | Replace files in `client/public/photos/` (see names in `src/data/wedding.js`) |

> The wedding date in `wedding.js` must keep the `+02:00` offset so guests in
> any timezone see the correct countdown.

---

## Admin (viewing RSVPs)

RSVP submissions are **not** publicly readable. To view them:

1. Set `ADMIN_KEY` in `server/.env` (same value deployed to Render).
2. Open `/admin` on the site, enter the key.
3. You can view totals, filter by eye, and export CSV.

`GET /api/rsvp` requires the `x-admin-key` header and returns **401** without it.

---

## Deployment

| Layer | Platform | Config |
|---|---|---|
| Frontend | [Vercel](https://vercel.com) | Root: `client/` · Build: `npm run build` · Output: `dist` |
| Backend | [Render](https://render.com) | Root: `server/` · Start: `node server.js` · Add env vars |
| Database | [Neon](https://neon.tech) | Copy connection string → `DATABASE_URL` in Render |

Set these in Render: `DATABASE_URL`, `CLIENT_ORIGIN`, `ADMIN_KEY`, `NODE_ENV=production`.

Set `VITE_API_BASE_URL` in Vercel to your Render backend URL.

**After deploying**, replace `/og-image.jpg` with the absolute URL
(`https://YOUR-DOMAIN/og-image.jpg`) in `client/index.html` so WhatsApp/Facebook
previews show the image.
