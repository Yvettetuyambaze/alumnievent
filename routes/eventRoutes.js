// routes/eventRoutes.js

// Import necessary modules, middleware, and controllers
const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/authMiddleware");
const eventController = require("../controllers/eventControllers");

// Define various routes for different functionalities related to events
// These routes are associated with specific HTTP request methods and corresponding controller functions
router.get("/add", ensureAuth, eventController.showAddPage);
router.post("/", ensureAuth, eventController.processAddForm);
router.get("/", eventController.showAllEvents);
router.get("/:id", eventController.showSingleEvent);
router.get("/edit/:id", ensureAuth, eventController.showEditPage);
router.put("/:id", ensureAuth, eventController.updateEvent);
router.delete("/:id", ensureAuth, eventController.deleteEvent);
router.get("/user/:userId", eventController.showUserEvents);
router.get("/search/:query", eventController.searchEventsByTitle);

// Export the router to make it available for use in other files
module.exports = router;
