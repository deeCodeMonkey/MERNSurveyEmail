const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//mongo access setup conducive for testing, instead of direct link to Survey model file
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

module.exports = app => {
    //create new survey and send out email to recipients
    //ensure user is logged in and has enough credits to create survey
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {

        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            //assign to subdocument collection. Map will create an object key of email, enclose with () so processor knows it is an obj.
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            //assume creation date is also sent date
            dateSent: Date.now()
        });

        //create sengrid mailer and send email
        const mailer = new Mailer(survey, surveyTemplate(survey));


    });
};