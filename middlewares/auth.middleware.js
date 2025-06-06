const jwt = require('jsonwebtoken'); // Import JWT

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Read the Authorization header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1]; // Extract the actual token from 'Bearer TOKEN_HERE'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode and verify token
    req.user = decoded; // Store user info (e.g., id) in req.user
    next(); // Proceed to next middleware or route
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware; // Export the middleware
