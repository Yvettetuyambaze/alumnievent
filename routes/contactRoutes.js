// routes/contactRoutes.js

// Import necessary modules and controllers
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactControllers');

// Define a route for submitting the contact form
// HTTP POST request to the '/contact' endpoint triggers the submitContactForm function from the contactController
router.post('/', contactController.submitContactForm);

// Export the router to make it available for use in other files
module.exports = router;
