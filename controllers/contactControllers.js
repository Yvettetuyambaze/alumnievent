//ABOUT CODE
// this code is responsible for handling the submission of a contact form. It creates a new Contact object based on 
//the data provided in the request body and then saves it to the database. If an error occurs during this process,
// the code logs the error and renders an error page for the user.


//controllers/contactControllers.js

// Import the Contact model
const Contact = require('../models/Contact');

// Define an asynchronous function to handle the submission of the contact form
const submitContactForm = async (req, res) => {
  try {
    // Extract the name, email, and message from the request body
    const { name, email, message } = req.body;
    
    // Create a new Contact object with the extracted information
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save the new contact entry to the database
    await newContact.save();

    // Redirect to the specified 'thankyou' page upon successful submission
    res.redirect('/thankyou');
  } catch (err) {
    // Log any errors to the console
    console.error(err);
    
    // Render an error page if there is an issue
    res.render('error/500');
  }
};

// Export the defined function to make it accessible to other parts of the application
module.exports = { submitContactForm };
