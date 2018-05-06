import React, { Component } from 'react';

//meta has error and touched keys
export default ({ input, label, meta: { error, touched } }) => {
    //console.log('reduxForm props',input);
    return (
        <div>
            <label>{label}</label>
            {/*wire up all the props.input functions into input*/}
            <input {...input} style={{ marginBottom: '5px' }}/>

            <div className="red-text" style={{ marginBottom: '20px' }}>
                {/*when user clicks in and then out wihtout entering a value, error message will show*/}
                {touched && error}
            </div>
        </div>
    );
}

