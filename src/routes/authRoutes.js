import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';

const router  = express.Router();

//POST /api/v1/register
router.post('/register', registerUser);

//POST /api/v1/login
router.post('/login', loginUser);

export default router;