import express from 'express';
import { createPassword, getPasswords, updatePassword, deletePassword } from '../controllers/passwordController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//All password routes require authentication
router.use(protect);

// Create a new password
router.post('/', createPassword);

//Get all passwords
router.get('/', getPasswords);

//Update a password
router.put('/:id', updatePassword);

//Delete a password
router.delete('/:id', deletePassword);

export default router;

