-- =========================================================
-- WEDDING DATABASE SCHEMA — Elia & Mirriam
-- Run this once against your Neon PostgreSQL instance.
-- =========================================================

CREATE TABLE IF NOT EXISTS rsvp_submissions (
  id          SERIAL        PRIMARY KEY,
  full_name   VARCHAR(150)  NOT NULL,
  attending   BOOLEAN       NOT NULL DEFAULT TRUE,
  guest_count SMALLINT      NOT NULL DEFAULT 1
              CHECK (guest_count >= 0 AND guest_count <= 10),
  email       VARCHAR(254),
  message     TEXT,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── Upgrade path (skip if you created the table fresh) ──
ALTER TABLE rsvp_submissions ADD COLUMN IF NOT EXISTS attending BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE rsvp_submissions ADD COLUMN IF NOT EXISTS email VARCHAR(254);
ALTER TABLE rsvp_submissions ALTER COLUMN guest_count SET DEFAULT 1;
ALTER TABLE rsvp_submissions DROP CONSTRAINT IF EXISTS rsvp_submissions_guest_count_check;
ALTER TABLE rsvp_submissions ADD CONSTRAINT rsvp_submissions_guest_count_check
  CHECK (guest_count >= 0 AND guest_count <= 10);
