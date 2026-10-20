export default function requireAdmin(req, res, next) {
  const ADMIN_KEY = process.env.ADMIN_KEY;
  if (!ADMIN_KEY) {
    return res.status(503).json({
      success: false,
      error: 'Admin access is not configured on this server.',
    });
  }

  const provided =
    req.get('x-admin-key') ||
    (req.get('authorization')?.replace(/^Bearer\s+/i, '') ?? '');

  if (provided !== ADMIN_KEY) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized.',
    });
  }

  next();
}
