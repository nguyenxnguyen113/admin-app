import { categoryConstansts } from "../actions/constants";

const initState = {
    categoryList: [],
    totalPages: 0,
    loading: false,
    error: null,
    category: [],
    categoryAmount: []
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = []

    for (let cat of categories) {
        const newCategory = {
            _id: category._id,
            name: category.name,
            slug: category.slug,
        };
        myCategories.push({
            ...cat,

        });
    }
    return myCategories
}

export default (state = initState, action) => {

    console.log(action);

    switch (action.type) {
        case categoryConstansts.GET_AMOUNT_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categoryAmount: action.payload.categoryAmount,
            }
            break;
        case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categoryList: action.payload.categoryList,
                totalPages: action.payload.totalPages
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category
            const updatedCategories = buildNewCategories(category._id, state.categoryList, category)
            console.log('updated category', updatedCategories)
            state = {
                ...state,
                categories: updatedCategories,
                loading: false
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
            state = {
                initState
            }
            break;
        case categoryConstansts.GET_CATEGORY_SUCCESS:
            state = {
                ...state,
                category: action.payload.category
            }
            break;
    }
    return state;
}