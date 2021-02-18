import axios from 'axios'

// ACTION TYPES
const GET_HISTORY = "GET_HISTORY";

// ACTION CREATORS
const setHistory = (history) => ({ type: GET_HISTORY, history })

// THUNK CREATORS
export const fetchHistory = (id) => {
    return async (dispatch) => {
        const history = (await axios.get(`/api/cart/history/${id}`)).data
        dispatch(setHistory(history))
    }
}

// REDUCER
export default function userHistory(state = {}, action) {
    switch (action.type) {
        case GET_HISTORY:
            return action.history
        default:
            return state
    }
}