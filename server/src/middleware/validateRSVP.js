const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function validateRSVP(req, res, next) {
  const { full_name, attending, guest_count, email, message, website } = req.body;

  /* Honeypot — bots fill hidden fields. Fake success, store nothing. */
  if (typeof website === 'string' && website.trim() !== '') {
    req.validatedRSVP = { _honeypot: true };
    return next();
  }

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

  if (typeof attending !== 'boolean') {
    return res.status(400).json({
      success: false,
      error: 'attending must be true or false.',
    });
  }

  const count = Number(guest_count);
  if (!Number.isInteger(count) || count < 1 || count > 10) {
    return res.status(400).json({
      success: false,
      error: 'guest_count must be a whole number between 1 and 10.',
    });
  }

  if (email !== undefined && email !== null && email !== '') {
    if (typeof email !== 'string' || email.length > 254 || !EMAIL_RE.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'email must be a valid email address.',
      });
    }
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
    attending,
    guest_count: attending ? count : 0,
    email:       email?.trim() || null,
    message:     message?.trim() || null,
  };

  next();
}
