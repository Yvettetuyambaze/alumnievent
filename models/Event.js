// //ABOUT CODES
// //These codes define the schema for the "Event" collection in the MongoDB database. 
// It specifies various required fields, including "title," "body," "category," "date," "location," "host," and "status."
//  Additionally, it references the "User" model and sets a default value for the creation date.


const mongoose = require('mongoose');

// Define the structure of the Event schema for the MongoDB collection
const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Field must be provided
    trim: true, // Remove any trailing whitespace from the string
  },
  body: {
    type: String,
    required: true, // Field must be provided
  },
  category: {
    type: String,
    required: true, // Field must be provided
    enum: ['professional development', 'networking', 'campus events'], // Category should be one of the provided options
  },
  date: {
    type: Date,
    required: true, // Field must be provided
  },
  location: {
    type: String,
    required: true, // Field must be provided
  },
  host: {
    type: String,
    required: true, // Field must be provided
  },
  status: {
    type: String,
    default: 'public', // Default status is public
    enum: ['public', 'private'], // Status should be one of the provided options
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value for the creation date is the current date and time
  },
});

// Create a model named "Event" based on the EventSchema
module.exports = mongoose.model('Event', EventSchema);
