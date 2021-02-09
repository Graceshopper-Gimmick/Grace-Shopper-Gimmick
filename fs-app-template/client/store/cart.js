import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

/**
 * ACTION CREATORS
 */
const _addProduct = (product) => ({ type: ADD_PRODUCT_TO_CART, product })

/**
 * THUNK CREATORS
 */
export const addProduct = (productId, userId, quantity) => {
    return async (dispatch) => {
        console.log(productId)
        console.log(userId)
        console.log(quantity)
        await axios.post('/api/order', {
            productId,
            userId,
            quantity,
        })

        // console.log(product)

        // dispatch(_addProducts(product))
    }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return action.products
        default:
            return state
    }
}
