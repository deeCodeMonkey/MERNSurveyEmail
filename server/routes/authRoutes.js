const passport = require("passport");

module.exports = (app) => {

    //route for google auth - passport to use strategy called google
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));


    app.get('/auth/google/callback', passport.authenticate('google'));

}