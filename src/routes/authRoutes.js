import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { registerValidation, loginValidation } from '../validators/authValidators.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

//Validation => error check => controller

//POST /api/v1/register
router.post('/register',authRateLimiter, registerValidation, validate, registerUser);

//POST /api/v1/login
router.post('/login', authRateLimiter, loginValidation, validate, loginUser);

//POST /api/v1/logout
router.post('/logout', logoutUser);

//GET /api/v1/protected
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    message: 'Access granted',
    user: req.user, // This will contain the user ID set by the protect middleware
  });
});

export default router;
