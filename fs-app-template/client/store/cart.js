import axios from 'axios'


/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const GET_CART_ITEMS = 'GET_CART_ITEMS'

/**
 * ACTION CREATORS
 */
const _addProduct = (product) => ({ type: ADD_PRODUCT_TO_CART, product })
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
