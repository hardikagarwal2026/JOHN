const mongoose = require('mongoose'); // Import mongoose

const userSchema = new mongoose.Schema({
  firstName: String, // User's first name
  lastName: String,  // User's last name
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@srmist\.edu\.in$/, 'Only SRM emails allowed'], // Regex to allow only SRMIST emails
  },
  password: { type: String, required: true }, // Hashed password
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema); // Export User model
