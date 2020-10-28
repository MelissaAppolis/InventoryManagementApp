import axios from 'axios';
import { AUTH_LOGIN, AUTH_SIGN_OUT, AUTH_ERROR, SET_ADMIN_PRIVILEGES } from './types.action'

// Action creator for Google login.
// Using axios to add a users' credentials
export const oauthGoogle = data => {
    return async dispatch => {
        const res = await axios.post('http://localhost:3001/users/oauth/google', {
            access_token: data
        })
        dispatch({
            type: AUTH_LOGIN,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
    };
}

// Action creator for Facebook login
// Using axios to add a users' credentials
export const oauthFacebook = data => {
    return async dispatch => {
        const res = await axios.post('http://localhost:3001/users/oauth/facebook', {
            access_token: data
        })
        dispatch({
            type: AUTH_LOGIN,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);

    };
}


// Action Creator for local login
export const login = data => {
    // Use the form data to make HTTP request to the backend and send it along.    
    // Take the backend response and get jwtToken.    
    // Dispatch 'user just signed up' (with jwtToken).
    // Save the jwtToken into our localStorage.
    return async dispatch  => {
        try {
            const res = await axios.post('http://localhost:3001/users/login', data)

            dispatch({
                type: AUTH_LOGIN,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);

            // If user is authenticated ad admin dispatch action where admin is true.
            if(res.data.role === 'Admin') {
                dispatch({ type: SET_ADMIN_PRIVILEGES });
                localStorage.setItem('Admin', true)
            };
        } catch(err) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            });
        }
    };
}

// Action creator to log a user out by removing jwt token and admin key.
export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        localStorage.removeItem('Admin');

        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        })
    };
}