import express from 'express';
import cors    from 'cors';
import helmet  from 'helmet';
import { rateLimit } from 'express-rate-limit';
import rsvpRoutes  from './routes/rsvpRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

/* --- Middleware --- */
app.use(helmet());



const allowedOrigins = [
  'http://localhost:3000',
  'https://eliawedsmirriam.vercel.app',
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-key'],
}));



app.use(express.json({ limit: '16kb' }));

/* --- Rate limiting --- */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again later.' },
});

const rsvpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, error: 'Too many RSVP submissions. Please try again in a few minutes.' },
});

app.use('/api', apiLimiter);

/* --- Routes --- */
app.use('/api/rsvp', rsvpLimiter, rsvpRoutes);

/* --- Health check --- */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* --- 404 handler --- */
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

/* --- Global error handler (must be last) --- */
app.use(errorHandler);

export default app;
