import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Admin from '../models/admin.js';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { userType, firstName, lastName, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await (userType === 'admin' ? Admin : User).findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with the same email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user or admin
    const userModel = userType === 'admin' ? Admin : User;
    const user = new userModel({ firstName, lastName, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user or admin exists with the given email
    const userModel = email.includes('admin') ? Admin : User;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // User or admin login successful
    const userType = email.includes('admin') ? 'admin' : 'user';
    res.status(200).json({ message: `${userType} login successful` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
