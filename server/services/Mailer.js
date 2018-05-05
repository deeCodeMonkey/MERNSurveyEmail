//this file exports a class 
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//access Mail class from sengrid library
class Mailer extends helper.Mail {

    constructor({ subject, recipients }, emailContent) {
        //inherit constructor from Mail class
        super();

        this.sgApi = sendgrid(keys.sendgridKey);
        //assign and format data 
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', emailContent);
        //create a helper function to extract email addresses
        this.recipients = this.formatAddresses(recipients); 

        //register the body after formatting. addContent() is part of Mail base class
        this.addContent(this.body);
        //enable click-tracking in emails
        this.addClickTracking();
        this.addRecipients();
    }

    //return array of helper objects of email addresses
    formatAddresses(recipients) {
        //obtain email value from each email key
        return recipients.map(({ email }) => {
            //format the email value to sendgrid's email format
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        //ugly code required by Sengrid 
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        //more code required by Sengrid
        const personalize = new helper.Personalization();
        //by reference for recipient and personalize variables
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient)
        });
        this.addPersonalization(personalize);
    }

    //api requests are always asynchronous
    async send() {
        //get all data, convert to JSON, then send to Sendgrid per Sengrid code
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        const response = this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;