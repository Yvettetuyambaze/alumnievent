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
const connectDB = require('./config/database'); // Module for connecting to MongoDB
const flash = require('connect-flash'); // Module for flash messages
const expressListEndpoints = require('express-list-endpoints');//module for listing all routes
 


// Load config
dotenv.config({ path: './config/config.env' }); // Load environment variables

// Passport config
require('./config/passport')(passport); // Initialize passport with the passport configuration file

connectDB(); // Connect to the MongoDB database

const app = express(); // Create an express application


// Serve static files from the "public" directory
app.use(express.static('images'));

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
const { formatDate, stripTags, truncate, editIcon, select, displayImage } = require('./helpers/help');

// Handlebars configuration
app.engine('.hbs', exphbs.engine({
  helpers: {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
    displayImage,
    json: function (context) {
      return JSON.stringify(context);
    },
    eq: function (a, b) {
      return a === b;
    },
  },
  defaultLayout: 'mainLayouts',
  extname: '.hbs',
  partialsDir: [path.join(__dirname, 'views/partials')],
}));
app.set('view engine', '.hbs'); // Set the view engine for rendering templates

// Sessions
const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI, // Specify the MongoDB connection URI
});

app.use(
  session({
    secret: 'keyboard cat', // Secret used to sign the session ID cookie
    resave: true, // Save the session for every request
    saveUninitialized: true, // Create a session until a user is logged in
    store: mongoStore, // Use MongoDB to store sessions
  })
);

// Passport middleware
// Initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Set global var
// Set a global variable for the user in the response locals
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
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
app.use('/users', require('./routes/usersRoutes')); // Added the usersRoutes file
app.use('/admin', require('./routes/adminRoutes')); // Added the adminRoutes file


//list all routes

console.log(expressListEndpoints(app));


const PORT = process.env.PORT || 3000; // Define the port number

// Start the server
app.listen(
  PORT,
  console.log(`The Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`) // Log server start information
);
