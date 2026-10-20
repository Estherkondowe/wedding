import pool from '../config/db.js';

/* POST /api/rsvp — Save a new RSVP submission */
export async function createRSVP(req, res, next) {
  const rsvp = req.validatedRSVP;

  /* Honeypot tripped: pretend everything worked, store nothing. */
  if (rsvp._honeypot) {
    return res.status(201).json({
      success: true,
      data: { id: null, full_name: rsvp.full_name ?? '' },
    });
  }

  const { full_name, attending, guest_count, email, message } = rsvp;

  try {
    const result = await pool.query(
      `INSERT INTO rsvp_submissions (full_name, attending, guest_count, email, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, full_name, attending, guest_count, created_at`,
      [full_name, attending, guest_count, email, message]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
}

/* GET /api/rsvp — Retrieve all RSVP submissions (admin only) */
export async function getAllRSVPs(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT id, full_name, attending, guest_count, email, message, created_at
       FROM rsvp_submissions ORDER BY created_at DESC`
    );

    const totals = result.rows.reduce(
      (acc, r) => {
        if (r.attending) {
          acc.attending += 1;
          acc.guests += r.guest_count;
        } else {
          acc.declining += 1;
        }
        return acc;
      },
      { attending: 0, declining: 0, guests: 0 }
    );

    res.status(200).json({
      success: true,
      count: result.rowCount,
      totals,
      data: result.rows,
    });
  } catch (err) {
    next(err);
  }
}
