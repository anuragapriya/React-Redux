import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { fetchWrapper } from '_utils/fetch-wrapper';

// create slice

const name = 'master';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const masterActions = { ...slice.actions, ...extraActions };
export const masterReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        portalData: [],
    }
}

function createExtraActions() { 
    const baseUrl = `${process.env.REACT_APP_API_URL}/master`;
   // const baseUrl = `${process.env.REACT_APP_API_URL}/api/Master`;

    return {
        getPortalData: getPortalData(),
    };

    function getPortalData() {
        return createAsyncThunk(
            `${name}/getPortalData`,
            async () => await trackPromise(fetchWrapper.get(`${baseUrl}/GetPortalDetails`))
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
                    const result= action.payload;
                    state.portalData = result?.Data;
                })
                .addCase(rejected, (state, action) => {
                    state.portalData = { error: action.error };
                });
        };
    };
}