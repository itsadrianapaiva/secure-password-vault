import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //1. Basic input validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    //2.Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    //3.Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //4.Create and save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    //5.Respond with success
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
