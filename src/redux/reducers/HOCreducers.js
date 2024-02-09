import {
    LOADER_SET,

} from '../actions/actionTypes';

export const loader = (state = false, action) => {
    switch (action.type) {
        case LOADER_SET:
            return action.state;

        default:
            return state;
    }
};
