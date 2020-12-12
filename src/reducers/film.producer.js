import { productConstants } from "../actions/constants";

const initialState = {
    productList: [],
    product:[]
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
        case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
            state = {
                ...state,
                product: action.payload.product
            }
            break;
    }

    return state;
}