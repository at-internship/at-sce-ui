/**
 * AT SCE UI - AT Auth Passport.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for passport.
 *
 * @author @at-internship
 * @version 1.0
 *
 */
// Constants
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// MICROSERVICE - HEROKU - AT SCE API
const sceServiceAPI = require("../services/at-sce-api.service");

// Helpers
const { encrypt } = require("../helpers/auth.helper");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // Match Email's User
      const request = {
        email: email,
        password: (await encrypt(password)).content,
      };
      console.debug(request);
      try {
        // Validate user
        const userAuth = await sceServiceAPI.login(request);
        
        console.debug(userAuth);
        if (!userAuth && !userAuth.data.id) {
          console.error("Not User found: ", email);
          return done(null, false, { message: "Not User found." });
        } else {
          // Get User details
          const user = await sceServiceAPI.getUserById(userAuth.data.id); 
          console.debug(user);
          return done(null, user);
        }
      } catch (err) {
        console.error(err.message);
        return done(null, false, { message: "Not User found." });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.data.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await sceServiceAPI.getUserById(id);
  done(null, user);
});
