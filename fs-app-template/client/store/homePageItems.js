import axios from 'axios'


/**
 * ACTION TYPES
 */
const LOAD_PRODUCTS = 'LOAD_PRODUCTS'


/**
 * ACTION CREATORS
 */
const setProducts = products => ({type: LOAD_PRODUCTS, products})


/**
 * THUNK CREATORS
 */
export const fetchProducts = (products) => {
    return async(dispatch)=>{
        const products = (await axios.get('/api/products')).data
        dispatch(setProducts(products))
    }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products
    default:
      return state
  }
}
