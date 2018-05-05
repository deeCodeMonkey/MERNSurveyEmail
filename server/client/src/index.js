//startup - data layer control - Redux
//for webpack compilation of css
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//If want to use axios to test api instead of Postman. This method will account for user auth with cookies. Enter commands on browser console. 
import axios from 'axios';
window.axios = axios;

//(reducer, {relates to server side rendering})
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);


//console.log('stripe key', process.env.REACT_APP_STRIPE_KEY);
//console.log('environment is ', process.env.NODE_ENV);

