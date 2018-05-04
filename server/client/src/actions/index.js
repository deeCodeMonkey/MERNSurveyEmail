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

