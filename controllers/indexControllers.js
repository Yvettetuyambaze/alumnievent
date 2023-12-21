const Event = require("../models/Event");

// Controllers for various routes

// Controller for the home route
const getHome = (req, res) => {
  res.render("home");
};

// Controller for the about route
const getAbout = (req, res) => {
  res.render("about");
};

// Controller for the opportunity route
const getOpportunity = (req, res) => {
  res.render("opportunity");
};

// Controller for the contact route
const getContact = (req, res) => {
  res.render("contact");
};

// Controller for the thankyou route
const getThankYou = (req, res) => {
  res.render("thankyou");
};

// Controller for the login route
const getLogin = (req, res) => {
  res.render("login", {
    layout: "loginLayouts",
  });
};

// Controller for the dashboard route
const getDashboard = async (req, res) => {
  try {
    // Retrieve events associated with the logged-in user
    const events = await Event.find({ user: req.user.id }).lean();
    
    // Render the dashboard with user's first name and events
    res.render("dashboard", {
      name: req.user.firstName,
      events,
    });
  } catch (err) {
    // Handle errors, log to console, and render a 500 error page
    console.error(err);
    res.render("error/500");
  }
};

module.exports = {
  getHome,
  getAbout,
  getOpportunity,
  getContact,
  getThankYou,
  getLogin,
  getDashboard,
};
