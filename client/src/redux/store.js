import {createStore, applyMiddleware, compose} from "redux"
import thunkMiddleware from "redux-thunk"
import reducer from "./reducer"

const composeEnhanser= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose

const store= createStore (
    reducer,
    composeEnhanser(applyMiddleware(thunkMiddleware))

)

export default store