// ABOUT CODES
// the code is responsible for handling authentication processes, including logging in with a Google 
// account and logging out of the application. The authGoogle function initiates the Google authentication process,
//  while the authGoogleCallback function handles the callback after a successful Google authentication. The logout 
//  function logs out the user and redirects them to the homepage.


// controllers/authControllers.js

// Import the passport module
const passport = require('passport');

// Create a Google authentication middleware using Passport with specified scope
const authGoogle = passport.authenticate('google', { scope: ['profile'] });

// Create a Google authentication callback middleware using Passport with redirect options
const authGoogleCallback = passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect: '/dashboard'
});

// Define a logout function that logs out the user and redirects to the homepage
const logout = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
};

// Export the defined functions to make them accessible to other parts of the application
module.exports = { authGoogle, authGoogleCallback, logout };
