import axios from 'axios'


// ACTION TYPES
const LOAD_PRODUCT = 'LOAD_PRODUCT'


// ACTION CREATORS
const setProduct = (product) => ({ type: LOAD_PRODUCT, product })


// THUNK CREATORS
export const fetchProduct = (id) => {
    return async (dispatch) => {
        const product = (await axios.get(`/api/products/${id}`)).data
        dispatch(setProduct(product))
    }
}

// REDUCER
export default function (state = {}, action) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return action.products
        case LOAD_PRODUCT:
            return action.product
        default:
            return state
    }
}
