// import category from "../../../movie-backend/src/models/category";
import axios from "../helpers.js/axios";
import { actorConstants } from "./constants";

export const getAllActor = () => {
    return async (dispatch) => {
        dispatch({
            type: actorConstants.GET_ALL_ACTORS_REQUEST,
        })
        const res = await axios.get(`/actor/getActor`)
        console.log(res)
        const { actors } = res.data
        if (res.status === 200) {
            dispatch({
                type: actorConstants.GET_ALL_ACTORS_SUCCESS,
                payload: { actorList: actors }
            })
        } else {
            dispatch({
                type: actorConstants.GET_ALL_ACTORS_FAILURE,
                payload: {error: res.data.error}
            })
        }
    }
}

export const addActor = (form) => {
    return async dispatch => {
        dispatch({ type: actorConstants.ADD_NEW_ACTORS_REQUEST });
        try {
            const res = await axios.post(`/actor/create`, form);
            if (res.status === 200) {
                dispatch({
                    type: actorConstants.ADD_NEW_ACTORS_SUCCESS,
                    payload: { actorConstants: res.data.country }
                });
            } else {
                dispatch({
                    type: actorConstants.ADD_NEW_ACTORS_FAILURE,
                    payload: res.data.error
                });
            }
        } catch (error) {   
            console.log(error.response);
        }

    }
}