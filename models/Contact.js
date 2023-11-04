// //ABOUT CODES
// //These codes define the schema for the "Contact" collection in the MongoDB database. 
// It specifies the required fields "name," "email," and "message," along with an optional 
// "date" field that defaults to the current date and time. This schema is used to create a model 
// named "Contact" that represents the collection, allowing it to be used in other parts of the application.


const mongoose = require('mongoose');

// Define the structure of the Contact schema for the MongoDB collection
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Field must be provided
  },
  email: {
    type: String,
    required: true // Field must be provided
  },
  message: {
    type: String,
    required: true // Field must be provided
  },
  date: {
    type: Date,
    default: Date.now // Default value for the date is the current date and time
  }
});

// Create a Contact model based on the ContactSchema
const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact; // Export the Contact model for use in other files
