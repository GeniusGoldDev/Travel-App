
import {
    START_OVERLAY_LOADING,
    STOP_OVERLAY_LOADING,
    GET_PLACES,
    GET_ALL_CITY,
    GET_SEARCH_RESULT
} from "./actionTypes";
import { home, city, searchResult } from "../../service/home";


export const getHomeData = () => {
    return async (dispatch) => {
        dispatch({type : STOP_OVERLAY_LOADING })
        const result = await home();
        dispatch({ type: STOP_OVERLAY_LOADING });
        if (result.message.Output == 0) {
            dispatch({type:GET_PLACES,payload:result.data})
        }
    }
}

