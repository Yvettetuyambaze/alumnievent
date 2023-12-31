// Importing the required modules and models
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Exporting a function that takes the passport object as an argument
module.exports = function (passport) {
  // Using the GoogleStrategy from passport to authenticate users via Google OAuth 2.0
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // Google OAuth 2.0 client ID
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth 2.0 client secret
        callbackURL: "/auth/google/callback", // The URL where Google will redirect the user after authentication
      },
      async (accessToken, refreshToken, profile, done) => {
        // Creating a new user object based on the Google profile data
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value, // The user's profile picture
        };

        try {
          // Checking if the user already exists in the database
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // If the user exists, pass the user object to the 'done' callback function
            done(null, user);
          } else {
            // If the user doesn't exist, create a new user and pass the user object to the 'done' callback function
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          // Handling any errors that occur during the process
          console.error(err);
        }
      }
    )
  );

  // Using the LocalStrategy from passport to authenticate users via email and password
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email,
      }).then((user) => {
        if (!user) {
          return done(null, false, { msg: "That email is not registered" });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { msg: "Password incorrect" });
          }
        });
      });
    })
  );

  // Serializing the user ID to the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserializing the user ID from the session to retrieve the user object
  passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
  });
};
