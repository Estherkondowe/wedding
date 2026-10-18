# Mirriam & Elias — Wedding Website

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
# Fill in DATABASE_URL, PORT, CLIENT_ORIGIN in .env

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
│       ├── components/ui/       # SectionHeading, Divider, ImagePlaceholder
│       ├── hooks/               # useCountdown, useRSVP
│       ├── pages/               # Home, Story, WeddingDetails, RSVP
│       ├── services/api.js      # Fetch wrapper
│       └── styles/              # tokens.css, globals.css
│
├── server/          # Node.js + Express
│   └── src/
│       ├── config/db.js
│       ├── controllers/rsvpController.js
│       ├── middleware/validateRSVP.js + errorHandler.js
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
| Add real photos | Pass `src` prop to `<ImagePlaceholder>` in Story.jsx |
| Wedding details (venue, time) | `client/src/pages/WeddingDetails.jsx` |
| Story text | `client/src/pages/Story.jsx` |
| RSVP deadline | `client/src/pages/RSVP.jsx` |
| Google Maps embeds | Pass `mapSrc` prop to `<EventCard>` in WeddingDetails.jsx |

---

## Deployment

| Layer | Platform | Config |
|---|---|---|
| Frontend | [Vercel](https://vercel.com) | Root: `client/` · Build: `npm run build` · Output: `dist` |
| Backend | [Render](https://render.com) | Root: `server/` · Start: `node server.js` · Add env vars |
| Database | [Neon](https://neon.tech) | Copy connection string → `DATABASE_URL` in Render |

Set `VITE_API_BASE_URL` in Vercel to your Render backend URL.
Set `CLIENT_ORIGIN` in Render to your Vercel frontend URL.
