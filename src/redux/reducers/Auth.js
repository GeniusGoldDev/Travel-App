import { AUTH_FAIL, AUTH_SUCCESS, LOGOUT } from "../actions/actionTypes";

const initial_state = {
    user: null,
    error : null
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, user: action.payload , error:null }
        case LOGOUT:
            return initial_state
        case AUTH_FAIL:
        default:
            return state;
    }
}