import axios from "../helpers.js/axios";
import { productConstants } from "./constants";
export const addFilm = form => {
  return async dispatch => {
    const res = await axios.post(`product/create`, form);
    dispatch(getAllFilm())
  }
}

export const getFilmById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: productConstants.GET_PRODUCT_BY_ID_REQUEST,
    })
    const res = await axios.get(`/product/getProductById/${id}`)
    console.log(res)
    const { product } = res.data
    console.log(res.data)
    if (res.status !== 400) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_ID_SUCCESS,
        payload: {product: res.data}
      })
    } else {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_ID_FAILURE,
        payload: { error: res.data.error }
      })
    }
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
        payload: { error: res.data.error }
      })
    }
  }
}

export const deleteProductById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`product/deleteProductById`, {
        data: { payload },
      });
      dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
        dispatch(getAllFilm());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
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

export const editProductById = (payload,id) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/product/editProductById/${id}`, payload);
      dispatch({ type: productConstants.EDIT_PRODUCT_REQUEST });
      if (res.status !== 400) {
        dispatch({ type: productConstants.EDIT_PRODUCT_SUCCESS });
        dispatch(getAllFilm());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.EDIT_PRODUCT_FAILURE,
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
