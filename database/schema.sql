-- =========================================================
-- WEDDING DATABASE SCHEMA — Mirriam & Elias
-- Run this once against your Neon PostgreSQL instance.
-- =========================================================

CREATE TABLE IF NOT EXISTS rsvp_submissions (
  id          SERIAL        PRIMARY KEY,
  full_name   VARCHAR(150)  NOT NULL,
  guest_count SMALLINT      NOT NULL DEFAULT 1
              CHECK (guest_count >= 1 AND guest_count <= 10),
  message     TEXT,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
