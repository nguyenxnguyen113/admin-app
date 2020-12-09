import { countryConstansts } from "../actions/constants";

const initState = {
    countryList: [],
    loading: false,
    error: null
}

const buildNewCategories = (parentId,categories, category) => {
    let myCountries = []

    for(let cat of categories) {
        const newCategory = {
            _id: category._id,
            name: category.name,
            slug: category.slug,
        };
        myCountries.push({
            ...cat,

        });
    }
    return myCountries
}

export default (state = initState, action) => {

    console.log(action);

    switch (action.type) {
        case countryConstansts.GET_ALL_COUNTRY_SUCCESS:
            state = {
                ...state,
                countryList: action.payload.countryList
            }
            break;
        case countryConstansts.ADD_NEW_COUNTRY_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case countryConstansts.ADD_NEW_COUNTRY_SUCCESS:
            const country = action.payload.country
            const updatedCountries = buildNewCategories(country._id,state.countryList, country)
            console.log('updated category', updatedCountries)
            state = {
                ...state,
                countryList: updatedCountries,
                loading: false
            }  
            break;
        case countryConstansts.ADD_NEW_COUNTRY_FAILURE:
            state = {
                initState
            }
            break;
    }
    return state;
}