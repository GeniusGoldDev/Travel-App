import { START_OVERLAY_LOADING, STOP_OVERLAY_LOADING } from "../actions/actionTypes";



export default (state = false, action) => {
    switch (action.type) {
        case START_OVERLAY_LOADING:
            return true
        case STOP_OVERLAY_LOADING:
            return false;
        default:
            return state
    }
}