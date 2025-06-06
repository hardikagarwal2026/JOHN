const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose to interact with MongoDB
const dotenv = require('dotenv'); // Load environment variables from .env file
const authRoutes = require('./routes/auth.routes'); // Import our auth route handler
const cors = require('cors'); // Allow cross-origin requests (for frontend communication)
const userRoutes = require('./routes/user.routes');

dotenv.config(); // Load .env config into process.env
const app = express(); // Initialize the Express app

app.use(cors()); // Enable CORS
app.use(express.json()); // Allow Express to parse JSON bodies
app.use('/api/auth', authRoutes); // Register the auth routes at /api/auth
app.use('/api/user', userRoutes); // All /api/user/* routes go to userRoutes


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MongoDB connected"); // Log if DB connection is successful
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
.catch(err => console.error(err)); // Catch DB connection error
