import {
    START_OVERLAY_LOADING,
    STOP_OVERLAY_LOADING,
    GET_ALL_CITY,
    GET_SEARCH_RESULT
} from "./actionTypes";
import { city, searchResult } from "../../service/search";
export const getAllCity = () => {
    return async (dispatch) => {
        dispatch({type : START_OVERLAY_LOADING })
        const result = await city();
        dispatch({ type: STOP_OVERLAY_LOADING });
        if (result.message.Output == 0) {
            dispatch({type:GET_ALL_CITY,payload:result.data})
        }
    }
}

export const getSearchData = (data) => {
    return async (dispatch) => {
        dispatch({type : START_OVERLAY_LOADING })
        const result = await searchResult(data);
        dispatch({ type: STOP_OVERLAY_LOADING });
        if (result.message.Output == 0) {
            dispatch({type:GET_SEARCH_RESULT, payload:result.data})
        }else{
            dispatch({type:GET_SEARCH_RESULT, payload:[]})
        }
    }
}
