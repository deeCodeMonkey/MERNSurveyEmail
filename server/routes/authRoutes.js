﻿const passport = require('passport');

module.exports = app => {

    //route for google auth - passport to use strategy called google to create new user
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    //passport is middleware
    app.get('/auth/google/callback', passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        //passport also provides/attaches req.logout
        req.logout();
        //should be blank
        //res.send('user: ' + req.user);
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        //session extracts data from cookie and assigns to req.session with passport key-value pair. Passport then takes info from req.session (cookie => session => passport)
        //res.send(req.session)

        //route handler to test and see if user is present
        //passport assigns the user model to the request. req.user = user model
        res.send(req.user);
    });

};