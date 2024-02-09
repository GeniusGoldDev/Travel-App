import {GET_ALL_CITY, GET_PLACES} from '../actions/actionTypes';

const initial_state = {
    places: [],
    city:[]
};

export default (state = initial_state, action) => {
    switch (action.type) {
        case GET_PLACES:
            return {...state, places: action.payload};
        case GET_ALL_CITY:
            return {...state, city: action.payload};
        default:
            return state;
    }
}
