import axios from 'axios'
import { setProducts } from './homePageItems'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const SUBMIT_CART = 'SUBMIT_CART'
const CREATE_NEW_CART = 'CREATE_NEW_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

/**
 * ACTION CREATORS
 */
const _addProduct = (product) => ({ type: ADD_PRODUCT_TO_CART, product })
const _getCartItems = (cartItems) => ({ type: GET_CART_ITEMS, cartItems })
const _deleteCartItem = (cartItems) => ({ type: DELETE_CART_ITEM, cartItems })
// const _changeQuantity = (productId, cartId, quantity) => ({type: CHANGE_QUANTITY, })

const _submitCart = (cartId) => ({
    type: SUBMIT_CART,
    cartId,
})

const _createNewCart = (userId) => ({ type: CREATE_NEW_CART, userId })

/**
 * THUNK CREATORS
 */
export const addProduct = (productId, userId, quantity) => {
    return async (dispatch) => {
        const guestId = window.localStorage.getItem('guestId') * 1
        if (guestId) {
            userId = guestId
        }
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
        console.log('TOKEN', token)
        let userId = 0
        if (token) {
            const res = (
                await axios.get('/auth/me', {
                    headers: {
                        authorization: token,
                    },
                })
            ).data
            console.log('RES', res)
            userId = res.id
        }
        const guestId = window.localStorage.getItem('guestId') * 1
        if (guestId) {
            userId = guestId
        }
        const cartItems = (await axios.get(`/api/cart/${userId}`)).data
        dispatch(_getCartItems(cartItems))
    }
}

export const deleteCartItem = (cartId, cartItemId, userId) => {
    console.log('USERID', userId)
    console.log(cartId)
    console.log('CARTITEM', cartItemId)
    return async (dispatch) => {
        await axios.delete(`/api/cart/${cartId}/${cartItemId}`)

        const cartItems = (await axios.get(`/api/cart/${userId}`)).data
        // console.log('CARTITEMS', cartItems)
        dispatch(_getCartItems(cartItems))
        // dispatch(_deleteCartItem(cartItemId))
    }
}

export const submitCart = (cartId) => {
    return async (dispatch) => {
        const updatedCart = (await axios.put(`/api/cart/${cartId}`)).data
        console.log(updatedCart)
        dispatch(_submitCart(updatedCart))
    }
}

// export const createNewCart = (userId) => {
//     return async (dispatch) => {
//         const newCart = (await axios.post(`/api/cart${userId}`)).data
//         console.log(newCart)
//         dispatch(_createNewCart(newCart))
//     }
// }

/**
 * REDUCER
 */
export default function (state = {}, action) {
    switch (action.type) {
        case GET_CART_ITEMS:
            return action.cartItems

        case DELETE_CART_ITEM:
            //TO DO: Refactor to make state as an array
            //updates state for cart items where cart only cart item id that dont match the item deleted
            // return [...state].filter(
            //     (cartItem) => cartItem.orders.id !== action.cartItemId * 1
            // )
            return action.cartItems

        case SUBMIT_CART:
            return action.cartId

        case CREATE_NEW_CART:
            return action.userId
        default:
            return state
    }
}
