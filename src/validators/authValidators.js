import { body } from 'express-validator';

export const registerValidation = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password too short'),
]

export const loginValidation = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
]