import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { alertActions } from '_store';
import { history, fetchWrapper } from '_utils';

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
    // const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
    const baseUrl = `${process.env.REACT_APP_API_URL}/api/Account`;

    return {
        login: login(),
        logout: logout(),
        refreshToken: refreshToken(),
        forgotPasswordRequest: forgotPasswordRequest(),
        resetPasswordRequest:resetPasswordRequest(),
        generateOtp:generateOtp(),
        validateOtp:validateOtp()
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`, async ({ Email, Password }, { dispatch }) => {
                dispatch(alertActions.clear());
                try {
                    const user = await trackPromise(fetchWrapper.post(`${baseUrl}/Authenticate`, { Email, Password }));
                    // set auth user in redux state
                    dispatch(authActions.setAuth(user));
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('auth', JSON.stringify(user));
                } catch (error) {
                    dispatch(alertActions.error({ message: error, header: "Login Failed" }));
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
                const response = await fetchWrapper.post(`${baseUrl}/refreshToken`, { accessToken });
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
                dispatch(alertActions.error({ message: error, header: "Login Issue" }));
            }

        });
    }

    function forgotPasswordRequest() {
        return createAsyncThunk(
            `${name}/forgotPasswordRequest`,
            async ({ email }, { rejectWithValue }) => {
                try {
                    const url = new URL(`${baseUrl}/forgot-password/${email}`);
                    url.searchParams.append('EmailAddress', email);
                    return await trackPromise(fetchWrapper.post(url.toString()));
                } catch (error) {
                    return rejectWithValue(error);
                }
            }
        );
    }

    function resetPasswordRequest() {
        return createAsyncThunk(
            `${name}/resetPasswordRequest`,
            async ({ userId, newPassword }, { rejectWithValue }) => {
                try {
                    return await trackPromise(fetchWrapper.post(`${baseUrl}/reset-password`, { UserId: userId, Password: newPassword }));
                } catch (error) {
                    return rejectWithValue(error);
                }
            }
        );
    }

    function generateOtp() {
        return createAsyncThunk( 
            `${name}/generateOtp`,
            async ({ email }, { rejectWithValue }) => {
                try {
                    // const url = new URL(`${baseUrl}/GenerateOtp/${email}`);
                    // url.searchParams.append('EmailAddress', email);
                    return await trackPromise(fetchWrapper.post(`${baseUrl}/GenerateOtp/${email}`));
                } catch (error) {
                    return rejectWithValue(error);
                }
            }
        );
    }

    function validateOtp() {
        return createAsyncThunk( 
            `${name}/validateOtp`,
            async ({ email, otp }, { rejectWithValue }) => {
                try {
                    return await trackPromise(fetchWrapper.post(`${baseUrl}/ValidateOtp`, { EmailAddress: email, OTP: otp }));
                } catch (error) {
                    return rejectWithValue(error);
                }
            }
        );
    }
}
