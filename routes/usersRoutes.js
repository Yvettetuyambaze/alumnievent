const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");
const {
  forwardAuthenticated,
  ensureAuth,
} = require("../middleware/authMiddleware");

// Login Page
router.get(
  "/loginwithemail",
  forwardAuthenticated,
  usersControllers.getLoginWithEmail
);

// Register Page
router.get("/register", forwardAuthenticated, usersControllers.getRegister);

// Register
router.post("/register", usersControllers.postRegister);

// Login
router.post("/loginwithemail", usersControllers.postLoginWithEmail);

// Logout
router.get("/logout", usersControllers.logout);

// Profile
router.get("/profile", ensureAuth, usersControllers.getProfile);

module.exports = router;
