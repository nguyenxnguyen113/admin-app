import axios from "../helpers.js/axios";
import { filmErrorConstansts } from "./constants";

export const getFilmError = (params)=>{
    console.log(params);
    return async (dispatch)=>{
        const res =  await axios.get(`/filmError/getFilmError`,{
            params:params
        })
        console.log(res);
        const  errorfilms  = res.data
        if (res.status !== 400) {
            dispatch({
              type: filmErrorConstansts.GET_ALL_FILMERROR_SUCCESS,
              payload: {
                  filmErrorList: errorfilms.data,
                  total: errorfilms.total
              }
            })
          }
    }
}

export const deleteFilmError = (id)=>{
    console.log(id);
    return async (dispatch) => {
        try {
          const res = await axios.post(`filmError/delete`,{
              id:id
          });
          if (res.status === 202) {
            dispatch(getFilmError());
          } else {
            const { error } = res.data;
            alert(error)
          }
        } catch (error) {
          console.log(error);
        }
      };
}