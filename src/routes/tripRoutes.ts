import { Router } from 'express';
import { createTrip } from '../controllers/tripController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// POST /api/trips/
router.post('/', createTrip);

export default router;