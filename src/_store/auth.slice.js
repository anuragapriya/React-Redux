import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { alertActions } from '_store';
import {history, fetchWrapper } from '_helpers';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        value: JSON.parse(localStorage.getItem('auth'))
    }
}

function createReducers() {
    return {
        setAuth
    };

    function setAuth(state, action) {
        state.value = action.payload;
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    return {
        login: login(),
        logout: logout(),
        refreshToken: refreshToken()
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`, async ({ username, password }, { dispatch }) => {
                dispatch(alertActions.clear());
                try {
                    const user = await trackPromise(fetchWrapper.post(`${baseUrl}/authenticate`, { username, password }));

                    // set auth user in redux state
                    dispatch(authActions.setAuth(user));

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('auth', JSON.stringify(user));

                    // get return url from location state or default to home page
                    
                    history.navigate('/home');
                } catch (error) {
                    dispatch(alertActions.error(error));
                }
            }
        );
    }

    function logout() {
        return createAsyncThunk(
            `${name}/logout`, (arg, { dispatch }) => {
                dispatch(authActions.setAuth(null));
                localStorage.removeItem('auth');
                history.navigate('/');
            }
        );
    }

    function refreshToken() {
        return createAsyncThunk(`${name}/refreshToken`, async (_, { getState, dispatch }) => {
            try {
                const accessToken = getState().auth.value?.token;
                const response = await trackPromise(fetchWrapper.post(`${baseUrl}/refreshToken`, { accessToken }));
                console.log("refreshtoken");
                // set auth user in redux state
                const res = {
                    ...getState().auth.value,
                    token: response.token,
                    tokenExpiry: response.tokenExpiry
                };
                dispatch(authActions.setAuth(res));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('auth', JSON.stringify(res));
            } catch (error) {
                dispatch(alertActions.error(error));
            }
     
        });
    }
}





