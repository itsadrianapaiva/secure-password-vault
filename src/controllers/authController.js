import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //1. Basic input validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    //2.Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    //3.Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //4.Create and save new user
    const user = await User.create({ name, email, password: hashedPassword });

    //5.Respond with success and generate token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //1. Check if user exists & password matches
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    //2. Respond with token and user info
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: 'Login successful',
    });
  } catch (error) {
    next(error);
  }
};
