const User = require('../models/user.model'); // Import the User model
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

//Signup logic
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body; // Destructure user input

  try {
    const userExists = await User.findOne({ email }); // Check if user already exists
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds = 10
    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword }); // Save new user

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Create JWT
    res.status(201).json({ token }); // Send token to client
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message }); // Handle server error
  }
};

//Login Logic
exports.login = async (req, res) => {
  const { email, password } = req.body; // Destructure login data

  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password); // Compare password with hashed
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Create token
    res.status(200).json({ token }); // Return token
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message }); // Handle error
  }
};

