
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../services/at-sce-api.service');

passport.use(new LocalStrategy({
    usernameField: 'email',
    usernameField: 'password'
}, async (email, password, done) => {
    const data = {email:email, password:password};
    const user = await User.getUsersById({data});
    if(!user){
        console.log('Not user found');
        return done(null, false, { message: 'Not user found' });
    } else {
        console.log('User found');
        return done(null, user, {message: 'User found'});
        if(!password){
            return done(null, false, { message: "Incorrect Password." });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});