const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// creates cookie storing user info
passport.serializeUser((user, done) => {
    // user.id here is NOT googleId or facebookId,
    // it is the database ID for this user record
    done(null, user.id);
});
// returns user from stored cookie info
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            // proxy true makes http in redirect stay as https
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            const user = await User.findOne({ googleId: profile.id });

            if (user) return done(null, user);

            user = await new User({
                googleId: profile.id,
                username: profile.displayName
            }).save();
            done(null, user);
        }
    )
);
