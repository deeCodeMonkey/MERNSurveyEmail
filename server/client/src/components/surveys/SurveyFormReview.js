import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
//helper to push down react-router features to redux actions through props (in this case, passing down 'history' object)
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

import formFields from './formFields';
import { submitSurvey } from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
            );
    });

    return (
        <div>
            <h5>Please confirm your entries.</h5>
            {reviewFields}

            <button className="yellow darken-3 btn-flat" onClick={onCancel}>Back</button>

            <button className="green btn-flat right" onClick={() => submitSurvey(formValues, history)}>Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    //get access to redux-form values
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));