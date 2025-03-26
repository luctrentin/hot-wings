import express from 'express';
import { register, login, getCurrentUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Register route
router.post('/register', register as express.RequestHandler);

// Login route
router.post('/login', login as express.RequestHandler);

// Get current user route
router.get('/me', protect, getCurrentUser as express.RequestHandler);

export default router; 