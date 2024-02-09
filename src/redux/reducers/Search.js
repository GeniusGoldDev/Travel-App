import {GET_ALL_CITY, GET_PLACES, GET_SEARCH_RESULT} from '../actions/actionTypes';

const initial_state = {
    places: [],
    city:[]
};

export default (state = initial_state, action) => {
    switch (action.type) {
        case GET_SEARCH_RESULT:
            return {...state, places: action.payload};
        case GET_ALL_CITY:
            return {...state, city: action.payload};
        default:
            return state;
    }
}
