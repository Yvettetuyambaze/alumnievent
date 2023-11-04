// routes/authRoutes.js

// Import necessary modules and controllers
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Define routes for Google authentication and logout
router.get('/google', authController.authGoogle); // Route for initiating Google authentication
router.get('/google/callback', authController.authGoogleCallback); // Route for Google callback after authentication
router.get('/logout', authController.logout); // Route for logging out the user

// Export the router to make it available for use in other files
module.exports = router;
