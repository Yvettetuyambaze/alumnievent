const router = require('express').Router();
const Useremail = require("../models/Useremail");
const Usergoogle = require("../models/Usergoogle");
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');
const { ensureAdmin } = require("../middleware/auth");


router.get("/users", ensureAdmin, async (req, res, next) => {
  try {
    const usersEmail = await Useremail.find();
    const usersGoogle = await Usergoogle.find();
    const users = [...usersEmail, ...usersGoogle]; // Merge users from both models
    res.render('manage-users', { users });
    console.log(users);
  } catch (e) {
    next(e);
  }
});


router.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.redirect('/admin/users');
      return;
    }
    let person = await Useremail.findById(id);
    if (!person) {
      person = await Usergoogle.findById(id);
    }
    res.render('profile', { person });
  } catch (e) {
    next(e);
  }
});

router.post("/update-role", async (req, res, next) => {
  try {
    const { id, role } = req.body;

    // Checking for id and roles in req.body
    if (!id || !role) {
      return res.redirect('back');
    }

    // Check for valid mongoose objectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect('back');
    }

    // Check for Valid role
    const rolesArray = Object.values(roles);
    if (!rolesArray.includes(role)) {
      return res.redirect('back');
    }

    // Admin cannot remove itself as an admin
    if (req.user.id === id) {
      return res.redirect('back');
    }

    // Update the user role based on the model
    const user = await Useremail.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ) || await Usergoogle.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    res.redirect('back');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
