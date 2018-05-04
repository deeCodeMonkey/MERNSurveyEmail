import { FETCH_USER } from '../actions/types';

//return action payload
export default function (state = null, action) {
    //console.log('authreducer: ', action);
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}