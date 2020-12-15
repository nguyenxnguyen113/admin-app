// import category from "../../../movie-backend/src/models/category";
import axios from "../helpers.js/axios";
import { countryConstansts } from "./constants";

export const getAllCountry = () => {
    return async (dispatch) => {
        dispatch({
            type: countryConstansts.GET_ALL_COUNTRY_REQUEST,
        })
        const res = await axios.get(`country/getcountry`)
        console.log(res)
        const { countries } = res.data
        if (res.status === 200) {
            dispatch({
                type: countryConstansts.GET_ALL_COUNTRY_SUCCESS,
                payload: { countryList: countries }
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