import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

//action creator
//export const fetchUser = () => {
//    //use redux-thunk allows async with promise
//    //wait for api response before dispatching action
//    return function (dispatch) {
//        axios.get('/api/current_user')
//            .then(res => dispatch({ type: FETCH_USER, payload: res }));
//    };
//};

//refactored
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

//also uses FETCH_USER for data return
export const handleToken = (token) => async dispatch => {
    //post token to backend server
    const res = await axios.post('/api/stripe', token);
    //return updated user model
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });

};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};