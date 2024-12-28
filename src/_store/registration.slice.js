import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { fetchWrapper } from '_utils/fetch-wrapper';

// create slice

const name = 'registration';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const registrationActions = { ...slice.actions, ...extraActions };
export const registrationReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        portalData: [],
        registerData: null,
        verifiedUserData: null,
        status: null
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/registration`;
   // const baseUrl = `${process.env.REACT_APP_API_URL}/api/Account`;

    return {
        register: register(),
        getPortalData: getPortalData(),
        getVerifiedUserData: getVerifiedUserData(),
        resendVerificationLink:resendVerificationLink()
    };

    function register() {
        return createAsyncThunk(
            `${name}/register`,
            async (user) => {
                user={...user, LastName:'',FirstName:user.FullName};
                const response = await trackPromise(fetchWrapper.post(`${baseUrl}/Register`, user));
                return response;
            }
        );
    }

    function getPortalData() {
        return createAsyncThunk(
            `${name}/getPortalData`,
            async () => await trackPromise(fetchWrapper.get(`${baseUrl}`))
        );
    }

    function getVerifiedUserData() { 
        return createAsyncThunk(
            `${name}/getVerifiedUserData`,
            async (verifyId) => {
                // Fetch the data from the constructed URL
                const response = await trackPromise(fetchWrapper.post(`${baseUrl}/VerifiedEmailByUser`,{UserId:verifyId}));
                return response; // Return the response data
            }
        );
    }

    function resendVerificationLink() { 
        return createAsyncThunk(
            `${name}/resendVerificationLink`,
            async (id) => {
                const url = new URL(`${baseUrl}/ResendEmailVerification`);
                 url.searchParams.append('userId', id);
                // Fetch the data from the constructed URL
                const response = await trackPromise(fetchWrapper.post(url.toString()));
                return response; // Return the response data
            }
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        getPortalData();
        getVerifiedUserData();
        register();

        function getPortalData() {
            var { pending, fulfilled, rejected } = extraActions.getPortalData;
            builder
                .addCase(pending, (state) => {
                    state.portalData = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    console.log(action.payload);
                    state.portalData = action.payload;
                })
                .addCase(rejected, (state, action) => {
                    state.portalData = { error: action.error };
                });
        }

        function getVerifiedUserData() {
            var { pending, fulfilled, rejected } = extraActions.getVerifiedUserData;
            builder
                .addCase(pending, (state) => {
                    state.verifiedUserData = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.verifiedUserData = action.payload;
                })
                .addCase(rejected, (state, action) => {
                    state.verifiedUserData = { error: action.error };
                });
        };

        function register() {
            var { pending, fulfilled, rejected } = extraActions.register;
            builder
                .addCase(pending, (state) => {
                    state.status = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.status = action.payload;
                })
                .addCase(rejected, (state, action) => {
                    state.status = { error: action.error };
                });
        };
    };
}