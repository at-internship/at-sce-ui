const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const sceServiceAPI = require("../services/at-sce-api.service");
 
passport.use(
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        },
        async(email, password, done) => {
            // Match Email's User
            const request = {
                email : email,
                password : password
            };
            const userAuth = await sceServiceAPI.login(request);
            if (!userAuth) {
                return done(null, false, { message: "Not User found." });
            } else {
                return done(null, userAuth.data);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async(id, done) => {
    const user = await sceServiceAPI.getUsersById(id);
    done(null, user);
});