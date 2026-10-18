export default function validateRSVP(req, res, next) {
  const { full_name, guest_count, message } = req.body;

  if (!full_name || typeof full_name !== 'string' || full_name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'full_name is required and must be at least 2 characters.',
    });
  }

  if (full_name.trim().length > 150) {
    return res.status(400).json({
      success: false,
      error: 'full_name must not exceed 150 characters.',
    });
  }

  const count = Number(guest_count);
  if (!Number.isInteger(count) || count < 1 || count > 10) {
    return res.status(400).json({
      success: false,
      error: 'guest_count must be a whole number between 1 and 10.',
    });
  }

  if (message && typeof message === 'string' && message.length > 500) {
    return res.status(400).json({
      success: false,
      error: 'message must not exceed 500 characters.',
    });
  }

  /* Attach sanitised values so controller doesn't repeat this work */
  req.validatedRSVP = {
    full_name:   full_name.trim(),
    guest_count: count,
    message:     message?.trim() || null,
  };

  next();
}
