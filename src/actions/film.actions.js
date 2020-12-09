import axios from "../helpers.js/axios";
import { categoryConstansts, productConstants } from "./constants";
export const addFilm = form => {
    return async dispatch => {
        const res = await axios.post(`product/create`, form);
        console.log(res);
    }
}

export const getAllFilm = () => {
    return async (dispatch) => {
        dispatch({
            type: productConstants.GET_ALL_PRODUCTS_REQUEST,
        })
        const res = await axios.get(`/product/getproduct`)
        console.log(res)
        const { products } = res.data
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { productList: products }
            })
        } else {
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                payload: {error: res.data.error}
            })
        }
    }
}