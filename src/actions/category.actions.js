// import category from "../../../movie-backend/src/models/category";
import axios from "../helpers.js/axios";
import { categoryConstansts } from "./constants";

export const getAllCategory = (pageNumber) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST,
        })
        const res = await axios.get(`category/getcategory?page=${pageNumber}`)
        console.log(pageNumber)
        console.log(res)
        const { categories, totalPages } = res.data
        if (res.status === 200) {
            
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categoryList: categories, totalPages:  totalPages}
            })
        } else {
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}
export const getAmountCategory = (pageNumber) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstansts.GET_AMOUNT_CATEGORIES_REQUEST,
        })
        const res = await axios.get(`category/getAllCategory`)
        console.log(pageNumber)
        console.log(res)
        const { categories } = res.data
        if (res.status === 200) {
            
            dispatch({
                type: categoryConstansts.GET_AMOUNT_CATEGORIES_SUCCESS,
                payload: { categoryAmount: categories }
            })
        } else {
            dispatch({
                type: categoryConstansts.GET_AMOUNT_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
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
                dispatch(getAllCategory());
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

export const deleteCategoryById = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/category/deleteCategory`, {
                data: { payload },
            });
            dispatch({ type: categoryConstansts.DELETE_CATEGORIES_REQUEST });
            if (res.status === 202) {
                dispatch({ type: categoryConstansts.DELETE_CATEGORIES_SUCCESS });
                dispatch(getAllCategory());
            } else {
                const { error } = res.data;
                dispatch({
                    type: categoryConstansts.DELETE_CATEGORIES_FAILURE,
                    payload: {
                        error,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const editCategoryById = (payload, id) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/category/updateCategoryById/${id}`, payload);
            dispatch({ type: categoryConstansts.EDIT_COUNTRY_REQUEST });
            if (res.status !== 400) {
                dispatch({ type: categoryConstansts.EDIT_COUNTRY_SUCCESS });
                dispatch(getAllCategory());
            } else {
                const { error } = res.data;
                dispatch({
                    type: categoryConstansts.EDIT_COUNTRY_SUCCESS,
                    payload: {
                        error,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getCategoryById = (id) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstansts.GET_CATEGORY_REQUEST,
        })
        const res = await axios.get(`/category/getCategoryById/${id}`)
        console.log(res)
        const { dategory } = res.data
        console.log(res.data)
        if (res.status !== 400) {
            dispatch({
                type: categoryConstansts.GET_CATEGORY_SUCCESS,
                payload: { category: res.data }
            })
        } else {
            dispatch({
                type: categoryConstansts.GET_CATEGORY_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}