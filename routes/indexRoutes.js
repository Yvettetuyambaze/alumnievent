const express = require("express");
const router = express.Router();
const {
  ensureAuth,
  ensureGuest,
  forwardAuthenticated,
} = require("../middleware/authMiddleware");
const indexControllers = require("../controllers/indexControllers");

// Home route
router.get("/", indexControllers.getHome);

// About route
router.get("/about", indexControllers.getAbout);

// Opportunity route
router.get("/opportunity", indexControllers.getOpportunity);

// Contact route
router.get("/contact", indexControllers.getContact);

// Thankyou route
router.get("/thankyou", indexControllers.getThankYou);

// Login route
router.get(
  "/login",
  ensureGuest,
  forwardAuthenticated,
  indexControllers.getLogin
);

// Dashboard route
router.get("/dashboard", ensureAuth, indexControllers.getDashboard);

module.exports = router;
