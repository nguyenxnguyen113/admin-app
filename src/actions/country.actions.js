// import category from "../../../movie-backend/src/models/category";
import axios from "../helpers.js/axios";
import { countryConstansts } from "./constants";

export const getAllCountry = (pageNumber) => {
    return async (dispatch) => {
        dispatch({
            type: countryConstansts.GET_ALL_COUNTRY_REQUEST,
        })
        const res = await axios.get(`country/getcountry?page=${pageNumber}`)
        console.log(res)
        const { countries, totalPages } = res.data
        if (res.status === 200) {
            dispatch({
                type: countryConstansts.GET_ALL_COUNTRY_SUCCESS,
                payload: { countryList: countries, totalPages:  totalPages}
            })
        } else {
            dispatch({
                type: countryConstansts.GET_ALL_COUNTRY_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const addCountry = (form) => {
    return async dispatch => {
        dispatch({ type: countryConstansts.ADD_NEW_COUNTRY_REQUEST });
        try {
            const res = await axios.post(`/country/create`, form);
            if (res.status === 200) {
                dispatch({
                    type: countryConstansts.ADD_NEW_COUNTRY_SUCCESS,
                    payload: { country: res.data.country }
                });
                dispatch(getAllCountry())
            } else {
                dispatch({
                    type: countryConstansts.ADD_NEW_COUNTRY_FAILURE,
                    payload: res.data.error
                });
            }
        } catch (error) {
            console.log(error.response);
        }

    }
}

export const deleteCountryById = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/country/deleteCountryById`, {
                data: { payload },
            });
            dispatch({ type: countryConstansts.DELETE_COUNTRY_REQUEST });
            if (res.status === 202) {
                dispatch({ type: countryConstansts.DELETE_COUNTRY_SUCCESS });
                dispatch(getAllCountry());
            } else {
                const { error } = res.data;
                dispatch({
                    type: countryConstansts.DELETE_COUNTRY_FAILURE,
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

export const editCountryById = (payload, id) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/country/editCountryById/${id}`, payload);
            dispatch({ type: countryConstansts.EDIT_COUNTRY_REQUEST });
            if (res.status !== 400) {
                dispatch({ type: countryConstansts.EDIT_COUNTRY_SUCCESS });
                dispatch(getAllCountry());
            } else {
                const { error } = res.data;
                dispatch({
                    type: countryConstansts.EDIT_COUNTRY_SUCCESS,
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

export const getCountryById = (id) => {
    return async (dispatch) => {
        dispatch({
            type: countryConstansts.GET_COUNTRY_REQUEST,
        })
        const res = await axios.get(`/country/getCountryById/${id}`)
        console.log(res)
        const { country } = res.data
        console.log(res.data)
        if (res.status !== 400) {
            dispatch({
                type: countryConstansts.GET_COUNTRY_SUCCESS,
                payload: { country: res.data }
            })
        } else {
            dispatch({
                type: countryConstansts.GET_COUNTRY_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}