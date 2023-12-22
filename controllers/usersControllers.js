const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

// Controllers for user authentication and profile

// Controller for rendering the login page
const getLoginWithEmail = (req, res) => {
  res.render("loginwithemail", {
    layout: "loginLayouts",
  });
};

// Controller for rendering the register page
const getRegister = (req, res) => {
  res.render("register", {
    layout: "loginLayouts",
  });
};

// Controller for handling user registration
const postRegister = (req, res) => {
  const { firstName, lastName, email, password, password2, role } = req.body;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  let errors = [];

  if (!firstName || !lastName || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (!passwordRegex.test(password)) {
    errors.push({
      msg: "Password must be at least 6 characters long and include at least one number, and both upper and lowercase letters."
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      firstName,
      lastName,
      email,
      password,
      password2,
      role,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          firstName,
          lastName,
          password,
          password2,
          role,
        });
      } else {
        const newUser = new User({
          firstName,
          lastName,
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
};

// Controller for handling user login
const postLoginWithEmail = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/loginwithemail",
    failureFlash: true,
  })(req, res, next);
};

// Controller for handling user logout
// Controller for handling user logout
const logout = (req, res) => {
    req.logout(() => {
      req.flash("success_msg", "You are logged out");
      res.redirect("/users/loginwithemail");
    });
  };

// Controller for rendering user profile
const getProfile = async (req, res, next) => {
  const person = req.user;
  res.render('profile', { person });
};

module.exports = {
  getLoginWithEmail,
  getRegister,
  postRegister,
  postLoginWithEmail,
  logout,
  getProfile,
};
