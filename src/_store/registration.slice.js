import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { fetchWrapper } from '_utils/fetch-wrapper';

// create slice

const name = 'registration';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState,  extraReducers });

// exports

export const registrationActions = { ...slice.actions, ...extraActions };
export const registrationReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        portalData: [],
        verifiedUserData:null
    }
}

function createExtraActions() {
   const baseUrl = `${process.env.REACT_APP_API_URL}/registration`;
    //const baseUrl = `${process.env.REACT_APP_API_URL}/api/UserPortalRoleMapping`;

    return {
        getPortalData: getPortalData(),
        getVerifiedUserData:getVerifiedUserData()
    };


    function getPortalData() {
        return createAsyncThunk(
            `${name}/getPortalData`,
            async () =>  await trackPromise(fetchWrapper.get(`${baseUrl}`))            
        );
    }

    function getVerifiedUserData() {
        return createAsyncThunk(
            `${name}/getVerifiedUserData`,
            async ({id, portalId }) =>  await trackPromise(fetchWrapper.get(`${baseUrl}/verified/${id}/${portalId}`))            
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        getPortalData();
        getVerifiedUserData();

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
                    console.log(action.payload);
                    state.verifiedUserData = action.payload;
                })
                .addCase(rejected, (state, action) => {
                    state.verifiedUserData = { error: action.error };
                });
        } 
    };
}