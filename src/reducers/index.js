import authReducer from './auth.reducers'
import userReducer from './user.reucers'
import filmReducer from './film.producer'
import categoryReducer from './category.reducer'
import {combineReducers} from 'redux'
import countryReducers from './country.reducers'
import actorReducers from './actor.reducers'
import filmErrorReducers from './filmError.reducers'
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: filmReducer,
    country: countryReducers,
    actor: actorReducers,
    filmError: filmErrorReducers,
})
export default rootReducer