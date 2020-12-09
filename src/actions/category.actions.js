// import category from "../../../movie-backend/src/models/category";
import axios from "../helpers.js/axios";
import { categoryConstansts } from "./constants";

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST,
        })
        const res = await axios.get(`category/getcategory`)
        console.log(res)
        const { categories } = res.data
        if (res.status === 200) {
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categoryList: categories }
            })
        } else {
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
                payload: {error: res.data.error}
            })
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST });
        try {
            const res = await axios.post(`/category/create`, form);
            if (res.status === 200) {
                dispatch({
                    type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: res.data.category }
                });
            } else {
                dispatch({
                    type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                });
            }
        } catch (error) {   
            console.log(error.response);
        }

    }
}