//execute to assigned const
const PORT = process.env.PORT || 5000;
const keys = require('./config/keys');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);
require('./models/User');

//set up cookie for authentication
const cookieSession = require('cookie-session');
const passport = require('passport');
//get express to use cookies
app.use(
    cookieSession({
        //lifespan of a cookie in miliseconds (30 days)
        maxAge: 30 * 24 * 60 * 60 * 1000,
        //key to encrypt the cookie. Allows multiple keys as add'l security, will pick one
        keys: [keys.cookieKey1, keys.cookieKey2] 
    })
);
//get passport to use cookies
app.use(passport.initialize());
app.use(passport.session());


//run file
require('./services/passport');
//require statement returns module.export function, which is immediately called with app argument. Thus, the route is hooked up with index
require('./routes/authRoutes')(app);





app.listen(PORT);
