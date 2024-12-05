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
        portalData: []
    }
}

function createExtraActions() {
   const baseUrl = `${process.env.REACT_APP_API_URL}/registration`;
    //const baseUrl = `${process.env.REACT_APP_API_URL}/api/UserPortalRoleMapping`;

    return {
        getPortalData: getPortalData()
    };


    function getPortalData() {
        return createAsyncThunk(
            `${name}/getPortalData`,
            async () =>  await trackPromise(fetchWrapper.get(`${baseUrl}`))            
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        getPortalData();

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
    };
}