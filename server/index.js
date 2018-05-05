//execute to assigned const
const keys = require('./config/keys');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
//for put/post/patch req, parse then assign to req.body property
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);
require('./models/User');

//set up cookie for authentication
const cookieSession = require('cookie-session');
const passport = require('passport');
//middlewware used for all routes
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
require('./routes/billingRoutes')(app);


//heroku production setting
if (process.env.NODE_ENV === 'production') {
    //Express to serve up production assets like main.js or main.css file in the React build folder
    //if cannot find route, look in client-build (a React-Router page)
    app.use(express.static('client/build'));
    //Express will serve up index.html if it doesn't recognize the route (default to index.html)
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);
