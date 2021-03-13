const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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
      console.log(request);

      try {
        const userAuth = await sceServiceAPI.login(request);
        //console.log(userAuth);

        if (!userAuth && !userAuth.data.id) {
          return done(null, false, { message: "Not User found." });
        } else {
          const user = await sceServiceAPI.getUserById(userAuth.data.id);
          //console.log(user);
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
