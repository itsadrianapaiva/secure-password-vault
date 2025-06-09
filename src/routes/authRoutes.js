import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//POST /api/v1/register
router.post('/register', registerUser);

//POST /api/v1/login
router.post('/login', loginUser);

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
