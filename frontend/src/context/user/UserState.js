import React, {createContext, useReducer} from 'react';
import userReducer from "./userReducer";

import { GET_LOGIN_USER, LOGOUT_USER, VERIFY_USER, SET_LOADING} from "../types";


const initialState = {
    user: {},
    loading: false,
    token: null
}

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const getLoginUser = async (redirect_success, redirect_error) => {
        setLoading()
        const res = await fetch(`http://auth.smartcityproject.net:8080/external?redirect_success=${redirect_success}&redirect_error=${redirect_error}`)
        dispatch({
            type: GET_LOGIN_USER,
            payload: res.data
        });
    };

    const verifyUser = async token => {
        setLoading()

        const res = await fetch('http://auth.smartcityproject.net:8080/verify',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: token
            })
        dispatch({
            type: VERIFY_USER,
            payload: res.data
        });
    }

    const setLoading = () => dispatch({type: SET_LOADING});

return (
    <UserContext.Provider
        value={{
            user: state.user,
            loading: state.loading,
            getLoginUser,
            verifyUser
        }}
    >
        {children}
    </UserContext.Provider>
)}
