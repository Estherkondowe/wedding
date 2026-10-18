import { Router } from 'express';
import validateRSVP          from '../middleware/validateRSVP.js';
import { createRSVP, getAllRSVPs } from '../controllers/rsvpController.js';

const router = Router();

router.post('/',  validateRSVP, createRSVP);
router.get('/',   getAllRSVPs);

export default router;
