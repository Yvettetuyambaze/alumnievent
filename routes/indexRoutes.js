// Import necessary modules, middleware, and the Event model
const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');
const Event = require("../models/Event");

// Define various routes for different pages and functionalities
// These routes are associated with specific HTTP request methods and rendering the corresponding views
// For the home, about, contact, thankyou, login, and dashboard pages


router.get("/", (req, res) => {
  res.render("home", {
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
  });
});

router.get("/thankyou", (req, res) => {
  res.render("thankyou", {
  });
});

router.get("/login", ensureGuest, forwardAuthenticated, (req, res) => {
  res.render("login", {
    layout: "loginLayouts",
  });
});

router.get("/dashboard", ensureAuth,  ensureAuthenticated, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      name2: req.user.name,
      events,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// Export the router to make it available for use in other files
module.exports = router;
