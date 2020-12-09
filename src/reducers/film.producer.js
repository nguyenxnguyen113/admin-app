import { productConstants } from "../actions/constants";

const initialState = {
    productList: []
};

export default (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                productList: action.payload.productList
            }
            break;
    }

    return state;
}