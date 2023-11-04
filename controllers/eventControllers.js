//ABOUT CODES
// The codes below shows the controller functions for handling various operations related to events in the application.
// It includes functions for displaying the add page, processing form submissions, 
//retrieving and displaying events, showing individual events, editing events, updating events,
// deleting events, displaying user-specific events, and searching events by their title. 
//These functions interact with the MongoDB database through the Mongoose ORM and handle rendering 
//appropriate views or error pages based on the outcome of the operations.

// Import the Event model
const Event = require('../models/Event');

// Show add page for events
const showAddPage = (req, res) => {
  res.render("events/add");
};

// Process the form for adding a new event
const processAddForm = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Event.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};

// Retrieve and show all public events
const showAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    res.render("events/index", {
      events,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};

// Show a single event
const showSingleEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id).populate("user").lean();

    if (!event) {
      return res.render("error/404");
    }

    // Check if the user has access to view the private event
    if (event.user._id != req.user.id && event.status == "private") {
      res.render("error/404");
    } else {
      res.render("events/show", {
        event,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("error/404");
  }
};

// Show the edit page for an event
const showEditPage = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
    }).lean();

    if (!event) {
      return res.render("error/404");
    }

    // Check if the current user is the creator of the event
    if (event.user != req.user.id) {
      res.redirect("/events");
    } else {
      res.render("events/edit", {
        event,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id).lean();

    if (!event) {
      return res.render("error/404");
    }

    // Check if the current user is the creator of the event
    if (event.user != req.user.id) {
      res.redirect("/events");
    } else {
      event = await Event.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });

      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id).lean();

    if (!event) {
      return res.render("error/404");
    }

    // Check if the current user is the creator of the event
    if (event.user != req.user.id) {
      res.redirect("/events");
    } else {
      await Event.deleteOne({ _id: req.params.id });
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
};

// Show events for a specific user
const showUserEvents = async (req, res) => {
  try {
    const events = await Event.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean();

    res.render("events/index", {
      events,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};

// Search events by their title
const searchEventsByTitle = async (req, res) => {
  try {
    const events = await Event.find({
      title: new RegExp(req.query.query, "i"),
      status: "public",
    })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("events/index", { events });
  } catch (err) {
    console.log(err);
    res.render("error/404");
  }
};

// Export all the event controller functions
module.exports = {
  showAddPage,
  processAddForm,
  showAllEvents,
  showSingleEvent,
  showEditPage,
  updateEvent,
  deleteEvent,
  showUserEvents,
  searchEventsByTitle,
};
