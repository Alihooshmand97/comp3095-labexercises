const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');  // Ensure the path is correct
const employeeRoutes = require('./routes/employeeRoutes');  // Add employee routes

const app = express();

// Middleware
app.use(express.json());  // Middleware to parse JSON

// Routes
app.use('/api/v1/user', userRoutes);  // User routes
app.use('/api/v1/emp', employeeRoutes);  // Employee routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comp3123_assignment1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
