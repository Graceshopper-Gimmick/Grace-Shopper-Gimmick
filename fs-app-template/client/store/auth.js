import axios from 'axios'
import history from '../history'

const storage = () => window.localStorage
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'


/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})


/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = storage().getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    const cartId = window.localStorage.getItem('cartId')*1
    const guestId = window.localStorage.getItem('guestId')*1
    if(cartId){
      await axios.put(`/api/users/claimcart/${res.data.id}`,{cartId,guestId})
      window.localStorage.removeItem('guestId')
      window.localStorage.removeItem('cartId')
    }
    return dispatch(setAuth(res.data))
  }
  if(window.localStorage.getItem('user')==='guest'){
    console.log('HERE !')
    const {guest,cart} = (await axios.post('/api/users/createguest',{})).data
    window.localStorage.setItem('guestId',guest.id.toString())
    window.localStorage.setItem('cartId',cart.id.toString())
    window.localStorage.removeItem('user')
  }
}

export const authenticate = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
    storage().setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  storage().removeItem(TOKEN)
  history.push('/guest')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
