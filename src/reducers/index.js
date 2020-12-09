import authReducer from './auth.reducers'
import userReducer from './user.reucers'
import filmReducer from './film.producer'
import categoryReducer from './category.reducer'
import {combineReducers} from 'redux'
import countryReducers from './country.reducers'
import actorReducers from './actor.reducers'
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    film: filmReducer,
    country: countryReducers,
    actor: actorReducers,
})
export default rootReducer