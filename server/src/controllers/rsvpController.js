import pool from '../config/db.js';

/* POST /api/rsvp — Save a new RSVP submission */
export async function createRSVP(req, res, next) {
  const { full_name, guest_count, message } = req.validatedRSVP;

  try {
    const result = await pool.query(
      `INSERT INTO rsvp_submissions (full_name, guest_count, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [full_name, guest_count, message]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
}

/* GET /api/rsvp — Retrieve all RSVP submissions */
export async function getAllRSVPs(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT * FROM rsvp_submissions ORDER BY created_at DESC`
    );

    res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (err) {
    next(err);
  }
}
