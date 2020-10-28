import { AUTH_LOGIN, AUTH_SIGN_OUT, AUTH_ERROR, SET_ADMIN_PRIVILEGES } from '../actions/types.action';

// Setting default state.
const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    errorMessage: '',
    isAdmin: false
}

// setting type actions
export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case AUTH_LOGIN:
           return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
        case AUTH_SIGN_OUT:
            return { ...state, token: action.payload, isAuthenticated: false, errorMessage: '' }
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload }
        case SET_ADMIN_PRIVILEGES:
            return {...state, isAdmin: true }
        default:
            return state
        
    }
}