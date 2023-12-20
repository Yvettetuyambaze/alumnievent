//These middleware functions help protect specific routes from unauthorized access. 
//ensureAuth ensures that only authenticated users can access certain routes, redirecting 
//unauthenticated users to the home page. ensureGuest ensures that guests have limited access, r
//edirecting authenticated users to the dashboard.
//

module.exports = {
  // Middleware to ensure that the user is authenticated before accessing protected routes
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) { // Check if the user is authenticated
      return next(); // Allow access to the next middleware or route handler
    } else {
      res.redirect('/'); // Redirect to the home page if the user is not authenticated
    }
  },
  // Middleware to ensure that guests have limited access to routes reserved for authenticated users
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) { // Check if the user is not authenticated
      return next(); // Allow access to the next middleware or route handler
    } else {
      res.redirect('/dashboard'); // Redirect to the dashboard if the user is already authenticated
    }
  },
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  },
  ensureAdmin: function(req, res, next) {
    if (req.user.role === 'ADMIN') {
      next();
    } else {
      res.redirect("/profile");
    }
  }
};
