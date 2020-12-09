import axios from "../helpers.js/axios";
import { categoryConstansts } from "./constants";
export const addFilm = form => {
    return async dispatch => {
        const res = await axios.post(`product/create`, form);
        console.log(res);
    }
}

export const getAllFilm = () => {
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