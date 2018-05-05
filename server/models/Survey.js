const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    //subdocument collection of recipients
    recipients: [RecipientSchema],
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    //reference to a user- relationship (underscore indicates a relationship field)
    //when document is created, a _user id will be saved which is a foriegn key for ObjectID in 'User' collection
    _user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    dateSent: Date,
    lastResponded: Date

});

mongoose.model('surveys', surveySchema);

