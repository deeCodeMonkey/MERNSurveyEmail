const keys = require('../config/keys');

const mongoose = require('mongoose');
//one arg to fetch collection, two args to modify collection
const User = mongoose.model('users');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//place unique user id into cookie (encrypt)
//turn mongoose id to cookie id
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//get unique user id (de-encrypt) from cookie
//turn cookie id to mongoose id
//becomes a user model instance added to req object as 'req.user'
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then( user => {
            done(null, user);
        });
});


//register Google for authentication
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        //console.log(accessToken, 'access token');
        //console.log(refreshToken, 'refresh token');
        //console.log(profile, 'profile');

        //find if user already exists
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    //"Done" lets passport know auth is completed, with "null" means no error and user record as "existingUser"
                    done(null, existingUser);
                } else {
                    //create new user
                    new User({ googleId: profile.id })
                        .save()
                        .then((user) => done(null, user));
                }
            });
    })
);

