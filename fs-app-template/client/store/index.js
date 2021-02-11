import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'
import homepageitems from './homePageItems'
import cart from './cart'
import { reducer as formReducer } from 'redux-form'


const reducer = combineReducers({ auth, homepageitems, cart, form: formReducer })
const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './homePageItems'
export * from './cart'

