// Importing necessary modules and models
const User = require('../models/User');
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');

// Controller to handle GET request for managing users
const getUsers = async (req, res, next) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();
    
    // Render the 'manage-users' view with the list of users
    res.render('manage-users', { users });
  } catch (e) {
    // Pass any errors to the error-handling middleware
    next(e);
  }
};

// Controller to handle GET request for viewing user profile
const getUserProfile = async (req, res, next) => {
  try {
    // Extract the user ID from the request parameters
    const { id } = req.params;

    // Check if the ID is a valid mongoose objectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // Redirect to the manage users page if the ID is invalid
      res.redirect('/admin/users');
      return;
    }

    // Retrieve user information based on the ID
    const person = await User.findById(id);

    // Render the 'profile' view with the user's information
    res.render('profile', { person });
  } catch (e) {
    // Pass any errors to the error-handling middleware
    next(e);
  }
};

// Controller to handle POST request for updating user role
const updateUserRole = async (req, res, next) => {
  try {
    // Extract the user ID and role from the request body
    const { id, role } = req.body;

    // Check for the presence of ID and role in the request body
    if (!id || !role) {
      return res.redirect('back');
    }

    // Check if the ID is a valid mongoose objectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect('back');
    }

    // Check if the role is a valid role from the defined roles
    const rolesArray = Object.values(roles);
    if (!rolesArray.includes(role)) {
      return res.redirect('back');
    }

    // Admin cannot remove itself as an admin
    if (req.user.id === id) {
      return res.redirect('back');
    }

    // Update the user's role in the database
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    // Redirect back to the previous page
    res.redirect('back');
  } catch (e) {
    // Pass any errors to the error-handling middleware
    next(e);
  }
};

// Export the controllers for use in the corresponding router
module.exports = {
  getUsers,
  getUserProfile,
  updateUserRole,
};
