const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//validatd emails inputted in input field
export default (emails) => {
    const invalidEmailsArray = emails
        .split(',')
        .map(email => email.trim())
        //filter out invalid emails
        //emailregex.com
        .filter(email => !emailRegEx.test(email));
    if (invalidEmailsArray.length) {
        return `These emails are invalid: ${invalidEmailsArray}`
    }
    return;
};