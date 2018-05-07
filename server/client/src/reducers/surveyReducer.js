import { FETCH_SURVEYS } from '../actions/types';

//return action payload (accessible by mapStateToProps in react components)
export default function (state = [], action) {
    //console.log('surveyreducer: ', action);
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload || false;
        default:
            return state;
    }
}