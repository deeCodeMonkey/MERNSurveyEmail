const keys = require('../../config/keys');

module.exports = survey => {

    //Sendgrid identifies the recipients and their activity from emails (by hacking the href attribute). Webhooks from Sendgrid give us updates on the recipients
    return `

        <html>
            <body>
                <div style="text-align: center;"> 
                    <h3>I'd like your input!</h3>
                    <p>Please enter the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes<a/>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No<a/>
                    </div>
                </div>
            </body>
        </html>

    `;

};