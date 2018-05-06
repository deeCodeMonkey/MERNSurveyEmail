import _ from 'lodash';
import React, { Component } from 'react';
//reduxForm is a helper function, allows to communicate with redux store. 
//Field allows html inputs
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label: 'Survey Title', name: 'title', noValueError: 'You must provide a title.'},
    { label: 'Subject Line', name: 'subject', noValueError: 'You must provide a subject.'},
    { label: 'Email Body', name: 'body', noValueError: 'You must provide email content.'},
    { label: 'Recipient List', name: 'emails', noValueError: 'You must provide recipient email(s).'}
];

class SurveyForm extends Component {

    renderFields() {
        {/*
            return (
            <div>
                <Field label="Survey Title" type="text" name="title" component={SurveyField} />
                <Field label="Subject Line" type="text" name="subject" component={SurveyField} />
                <Field label="Email Body" type="text" name="body" component={SurveyField} />
                <Field label="Recipient List" type="text" name="emails" component={SurveyField} />
            </div>
        );
        */}
        //refactored
        return _.map(FIELDS, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        });
    }

    render() {
        return (
            <div>
                {/*props.handleSubmit is passed from reduxForm*/}
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
};

//values object has name and value of each input field
function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || '');

    _.each(FIELDS, ({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });
   
    //if nothing is returned in errors, reduxForm will assume inputs are fine
    return errors;
}

//validate function will run every time submit form 
export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);