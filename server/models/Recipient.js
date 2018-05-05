const mongoose = require('mongoose');
const { Schema } = mongoose;

//subdocument of Survey model
const recipientSchema = new Schema({
    email: String,
    responded: {
        type: Boolean,
        default: false
    }

});

//export schema
module.exports = recipientSchema;