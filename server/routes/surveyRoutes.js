const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//mongo access setup conducive for testing, instead of direct link to Survey model file
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thank you for your feedback!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        const event = _.chain(req.body)
            .map(({ email, url }) => {
                //extract path from URL (in this case, /api/surveys/......)
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            //exclude undefined
            .compact()
            .uniqBy('email', 'surveyId')
            //update survey data metrics in Mongo
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email, responded: false }
                    }
                }, {    //choice = yes/no
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date()
                       //execute query
                    }).exec();
            })
            .value();
        //console.log('============', event);
        res.send({});
    });

    //create new survey and send out email to recipients
    //ensure user is logged in and has enough credits to create survey
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

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

        try {
            //create sengrid mailer and send email
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }

    });
};