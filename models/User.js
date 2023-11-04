// //ABOUT CODES
// //These codes define the schema for the "User" collection in the MongoDB database.
//  It specifies various required fields, including "googleId," "displayName," "firstName," and "lastName." 
//  It also includes an optional "image" field for the user's profile picture. Additionally, it sets a default 
//  value for the creation date.

const mongoose = require('mongoose');

// Define the structure of the User schema for the MongoDB collection
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true, // Field must be provided
  },
  displayName: {
    type: String,
    required: true, // Field must be provided
  },
  firstName: {
    type: String,
    required: true, // Field must be provided
  },
  lastName: {
    type: String,
    required: true, // Field must be provided
  },
  image: {
    type: String, // Image path or URL
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value for the creation date is the current date and time
  },
});

// Create a model named "User" based on the UserSchema
module.exports = mongoose.model('User', UserSchema);
