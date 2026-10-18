import express from 'express';
import cors    from 'cors';
import rsvpRoutes  from './routes/rsvpRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

/* --- Middleware --- */
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));

app.use(express.json());

/* --- Routes --- */
app.use('/api/rsvp', rsvpRoutes);

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
