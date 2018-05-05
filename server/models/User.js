const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: {
        type: Number,
        default: 0
    }

});

//create "users" collection if not already exist
mongoose.model('users', userSchema);

