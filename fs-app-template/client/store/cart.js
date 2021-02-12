import axios from 'axios'
import { setProducts } from './homePageItems'



/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const GET_CART_ITEMS = 'GET_CART_ITEMS'
//const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * ACTION CREATORS
 */
const _addProduct = (product) => ({ type: ADD_PRODUCT_TO_CART, product })
//const _removeProduct = (product) => ({ type: REMOVE_PRODUCT })
const _getCartItems = (cartItems) => ({type: GET_CART_ITEMS, cartItems})

/**
 * THUNK CREATORS
 */
export const addProduct = (productId, userId, quantity) => {
    return async (dispatch) => {
        // console.log(productId)
        // console.log(userId)
        // console.log(quantity)
        await axios.post('/api/order', {
            productId,
            userId,
            quantity,
        })

        // console.log(product)

        // dispatch(_addProducts(product))
    }
}

//THIS THUNK STRICTLY FOR USER WHO IS AN ADMIN!!!!
export const removeProduct = (productId) => {
    return async (dispatch) => {
        console.log('PRODUCT ID FROM', productId)
        await axios.delete(`/api/products/${productId}`)

        const products = (await axios.get('/api/products')).data
        dispatch(setProducts(products))
    }
}

export const getCartItems = () => {
    return async (dispatch) => {
        const token = window.localStorage.getItem('token')
        console.log('TOKEN',token)
        let userId = 0
        if (token) {
            const res = (await axios.get('/auth/me', {
            headers: {
              authorization: token
            }
          })).data
          console.log('RES',res)
          userId = res.id
        }
        const cartItems = (await axios.get(`/api/cart/${userId}`)).data
        dispatch(_getCartItems(cartItems))
    }
}


/**
 * REDUCER
 */
export default function (state = {}, action) {
    switch (action.type) {
        case GET_CART_ITEMS:
            return action.cartItems
        default:
            return state
    }
}
