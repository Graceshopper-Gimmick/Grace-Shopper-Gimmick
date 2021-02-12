import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'
import homepageitems from './homePageItems'
import ConnectedProductList from './homePageItems'
import singleProduct from './singleProduct'
import cart from './cart'


const reducer = combineReducers({ auth, homepageitems, cart, singleProduct })
const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './homePageItems'
export * from './cart'

