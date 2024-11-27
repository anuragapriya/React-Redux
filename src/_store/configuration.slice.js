import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { fetchWrapper } from '_utils/fetch-wrapper';

// create slice

const name = 'configs';
const initialState = createInitialState();
const extraActions = createExtraActions();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const portalAccessActions = { ...slice.actions, ...extraActions };
export const portalAccessReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        portalAccessGetData: [],
        portalAccessPostData: []
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
    //  const baseUrl = `${process.env.REACT_APP_API_URL}/api/Account`;

    return {
        getAccess: getAccess(),
        postAccess: postAccess(),
    };


    function getAccess() {
        return createAsyncThunk(
            `${name}/getAccessData`,
            async () => await trackPromise(fetchWrapper.get(`${baseUrl}/getAccessData`))                                    
        );
    }

    function postAccess() {
        return createAsyncThunk(
            `${name}/postAccessData`,
            async(data) => await trackPromise(fetchWrapper.post(`${baseUrl}/postAccessData`, data))    
        );
    }
}

function createReducers() {
    return {
        clear
    };

    function clear(state) {
        state.portalAccessPostData = [];
    }
}

function createExtraReducers() {
    return (builder) => {
        getAccess();

        function getAccess() {
            var { pending, fulfilled, rejected } = extraActions.getAccess;
            builder
                .addCase(pending, (state) => {
                    state.portalAccessGetData = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.portalAccessGetData =  action.payload ;
                })
                .addCase(rejected, (state, action) => {
                    state.portalAccessGetData = { error: action.error };
                });
        }

        // function postAccess() {
        //     var { pending, fulfilled, rejected } = extraActions.postAccess;
        //     builder
        //         .addCase(pending, (state) => {
        //             state.item = { loading: true };
        //         })
        //         .addCase(fulfilled, (state, action) => {
        //             state.item = { value: action.payload };
        //         })
        //         .addCase(rejected, (state, action) => {
        //             state.item = { error: action.error };
        //         });
        // }        
    };
}

