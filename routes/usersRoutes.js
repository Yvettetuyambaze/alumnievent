//usersRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const Useremail = require("../models/Useremail");
const { forwardAuthenticated } = require("../middleware/auth");

// Login Page
router.get("/loginwithemail", forwardAuthenticated, (req, res) =>
  res.render("loginwithemail", {
    layout: "loginLayouts",
  })
);

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register", {
    layout: "loginLayouts",
  })
);

// Register
router.post("/register", (req, res) => {
  const { name, email, password, password2, role } = req.body;
     // Validate password complexity
     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }
// Validate password complexity e.g: AbcdefMm1234 / folow the regex
   if (!passwordRegex.test(password)) {
    errors.push({
       msg: "Password must be at least 6 characters long and include at least one number, and both upper and lowercase letters."
     });
   }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
      role,
    });
  } else {
    Useremail.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
          role,
        });
      } else {
        const newUser = new Useremail({
          name,
          email,
          password,
          role,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/loginwithemail");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post("/loginwithemail", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/loginwithemail",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/loginwithemail");
});

//profile
router.get('/profile', async(req, res, next) => {
  const person = req.user;
  res.render('profile', { person })
})

module.exports = router;
