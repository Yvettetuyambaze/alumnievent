// Import required modules
const path = require('path'); // Module for handling file paths
const express = require('express'); // Module for creating the web server
const mongoose = require('mongoose'); // Module for MongoDB interactions
const dotenv = require('dotenv'); // Module for handling environment variables
const morgan = require('morgan'); // Module for logging HTTP requests
const exphbs = require('express-handlebars'); // Module for rendering views
const methodOverride = require('method-override'); // Module for using HTTP verbs such as PUT or DELETE
const passport = require('passport'); // Module for user authentication
const session = require('express-session'); // Module for managing user sessions
const MongoStore = require('connect-mongo'); // Module for storing session data in MongoDB
const connectDB = require('./config/db'); // Module for connecting to MongoDB

// Load config
dotenv.config({ path: './config/config.env' }); // Load environment variables

// Passport config
require('./config/passport')(passport); // Initialize passport with the passport configuration file

connectDB(); // Connect to the MongoDB database

const app = express(); // Create an express application

// Body parser
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Method override
// Custom logic for method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Log HTTP requests in the development environment
}

// Handlebars Helpers
// Import necessary helpers from the handlebars file
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs');

// Handlebars
// Configure the express handlebars engine
app.engine(
  '.hbs',
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'mainLayouts', // Specify the default layout
    extname: '.hbs', // Set the file extension for templates
  })
);
app.set('view engine', '.hbs'); // Set the view engine for rendering templates

// Sessions
const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI, // Specify the MongoDB connection URI
  // Additional options here
});

app.use(
  session({
    secret: 'keyboard cat', // Secret used to sign the session ID cookie
    resave: false, // Do not save the session for every request
    saveUninitialized: false, // Do not create a session until a user is logged in
    store: mongoStore, // Use MongoDB to store sessions
  })
);

// Passport middleware
// Initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());

// Set global var
// Set a global variable for the user in the response locals
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Static folder
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory

// Routes
// Define routes for different parts of the application
app.use('/', require('./routes/indexRoutes')); // Main application routes
app.use('/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/events', require('./routes/eventRoutes')); // Event-related routes
app.use('/contact', require('./routes/contactRoutes')); // Added the contactRoutes file

const PORT = process.env.PORT || 3000; // Define the port number

// Start the server
app.listen(
  PORT,
  console.log(`The Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`) // Log server start information
);
