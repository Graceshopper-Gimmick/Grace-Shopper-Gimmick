import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'

/**
 * ACTION CREATORS
 */
export const setProducts = (products) => ({ type: LOAD_PRODUCTS, products })

/**
 * THUNK CREATORS
 */
export const fetchProducts = (products) => {
    return async (dispatch) => {
        const products = (await axios.get('/api/products')).data
        dispatch(setProducts(products))
    }
}

export const addNewProduct = () => {
    return (dispatch, getState) => {
        const form = getState().form;
        const product = {
            name: form.product.name.value,
            price: form.product.price.value
        }
        dispatch({
            type: ADD_PRODUCT,
            product
        })
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
