import { filmErrorConstansts } from "../actions/constants";

const initialState = {
    filmErrorList: [],
    total:0
};

export default (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case filmErrorConstansts.GET_ALL_FILMERROR_SUCCESS:
            state = {
                total:action.payload.total,
                filmErrorList: action.payload.filmErrorList
            }
            break;
    }

    return state;
}