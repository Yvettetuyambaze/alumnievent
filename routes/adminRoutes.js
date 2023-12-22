const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../middleware/authMiddleware");
const adminControllers = require("../controllers/adminControllers");

// Route to manage users (GET /admin/users)
router.get("/users", ensureAdmin, adminControllers.getUsers);

// Route to view user profile (GET /admin/user/:id)
router.get("/user/:id",ensureAdmin, adminControllers.getUserProfile);

// Route to update user role (POST /admin/update-role)
router.post("/update-role",ensureAdmin, adminControllers.updateUserRole);

module.exports = router;
