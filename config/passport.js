//ABOUT THE CODES
//This code snippet defines a passport configuration that utilizes the Google OAuth 2.0 strategy 
//for user authentication. It handles user creation and retrieval in the MongoDB database based on the 
//Google profile data. Additionally, it serializes and deserializes the user object to and from the session.


// Importing the required modules and models
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const Usergoogle = require('../models/Usergoogle')
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const Useremail = require("../models/Useremail");

// Exporting a function that takes the passport object as an argument
module.exports = function (passport) {
  // Using the GoogleStrategy from passport to authenticate users via Google OAuth 2.0
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // Google OAuth 2.0 client ID
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth 2.0 client secret
        callbackURL: '/auth/google/callback', // The URL where Google will redirect the user after authentication
      },
      async (accessToken, refreshToken, profile, done) => {
        // Creating a new user object based on the Google profile data
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value, // The user's profile picture
        }

        try {
          // Checking if the user already exists in the database
          let user = await Usergoogle.findOne({ googleId: profile.id })

          if (user) {
            // If the user exists, pass the user object to the 'done' callback function
            done(null, user)
          } else {
            // If the user doesn't exist, create a new user and pass the user object to the 'done' callback function
            user = await Usergoogle.create(newUser)
            done(null, user)
          }
        } catch (err) {
          // Handling any errors that occur during the process
          console.error(err)
        }
      }
    )
  )

  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      Useremail.findOne({
        email: email,
      }).then((user) => {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }
  
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );
  

  // Serializing the user ID to the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // Deserializing the user ID from the session to retrieve the user object
passport.deserializeUser((id, done) => {
  Useremail.findById(id, (err, user) => {
    if (user) {
      done(err, user);
    } else {
      // If the user is not found in the Useremail model, try finding in the Usergoogle model
      Usergoogle.findById(id, (err, user) => done(err, user));
    }
  });
});

}
