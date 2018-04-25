const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String

});

//create "users" collection if not already exist
mongoose.model('users', userSchema);

