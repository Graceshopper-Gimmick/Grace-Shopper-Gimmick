import axios from 'axios'
import { setProducts } from './homePageItems'


/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'


/**
 * ACTION CREATORS
 */
const _addProduct = (product) => ({ type: ADD_PRODUCT_TO_CART, product })
const _getCartItems = (cartItems) => ({ type: GET_CART_ITEMS, cartItems })
const _deleteCartItem = (cartItemId) => ({ type: DELETE_CART_ITEM, cartItemId })


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
        const cartItems = (await axios.get(`/api/cart/${userId}`)).data
        dispatch(_getCartItems(cartItems))
    }
}

export const deleteCartItem = (cartId, cartItemId) => {
    console.log(cartId)
    console.log(cartItemId)
    return async (dispatch) => {
        await axios.delete(`/api/cart/${cartId}/${cartItemId}`)

        // dispatch(_getCartItems(cartItems))
        //why dispatch not working?
        dispatch(_deleteCartItem(cartItemId))
    }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
    switch (action.type) {
        case GET_CART_ITEMS:
            return action.cartItems

        case DELETE_CART_ITEM: {
            //updates state for cart items where cart only cart item id that dont match the item deleted
            return [...state].filter(
                (cartItem) => cartItem.id !== action.cartItem.id * 1
            )
        }
        default:
            return state
    }
}
