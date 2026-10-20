import { Router } from 'express';
import validateRSVP          from '../middleware/validateRSVP.js';
import requireAdmin          from '../middleware/requireAdmin.js';
import { createRSVP, getAllRSVPs } from '../controllers/rsvpController.js';

const router = Router();

router.post('/',  validateRSVP, createRSVP);
router.get('/',   requireAdmin, getAllRSVPs);

export default router;
