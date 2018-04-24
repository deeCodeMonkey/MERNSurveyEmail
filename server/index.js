//execute to assigned const
const express = require("express");
const PORT = process.env.PORT || 5000;
//run file
require('./services/passport');
//require statement returns module.export function, which is immediately called with app argument. Thus, the route is hooked up with index
require('./routes/authRoutes')(app);

const app = express();





app.listen(PORT);
