const passport = require('passport');

module.exports = app => {

    //route for google auth - passport to use strategy called google to create new user
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/current_user', (req, res) => {
        //route handler to test and see if user is present
        res.send(req.user);
    });

};