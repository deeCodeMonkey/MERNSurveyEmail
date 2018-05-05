import axios from 'axios';
import { FETCH_USER } from './types';

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

export const handleToken = (token) => async dispatch => {
    //post token to backend server
    const res = await axios.post('/api/stripe', token);
    //return updated user model
    dispatch({ type: FETCH_USER, payload: res.data });
}