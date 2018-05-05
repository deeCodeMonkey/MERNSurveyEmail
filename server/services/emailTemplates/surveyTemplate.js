module.exports = (survey) => {

    //Sendgrid identifies the recipients and their activity from emails. Webhooks from Sendgrid give us updates on the recipients
    return `

        <html>
            <body>
                <div style="text-align: center;"> 
                    <h3>I'd like your input!</h3>
                    <p>Please enter the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="http://localhost:3000">Yes<a/>
                    </div>
                    <div>
                        <a href="http://localhost:3000">No<a/>
                    </div>
                </div>
            </body>
        </html>

    `;

};