import { createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { fetchWrapper } from '_utils/fetch-wrapper';

// create slice

const name = 'mapcenter';
const initialState = createInitialState();
const extraActions = createExtraActions();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const mapCenterAction = { ...slice.actions, ...extraActions };
export const mapCenterReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        userData: null
    }
}

function createExtraActions() {

    const baseUrl = `${process.env.REACT_APP_API_URL}/api/Account`;

    return {
        get: get(),
        insert:insert(),
        update: update()
    };

    function get() { 
        return createAsyncThunk(
            `${name}/getUserData`,
            async ({ id, portal }, { rejectWithValue }) => {
                try {
                    const url = new URL(`${baseUrl}/GetRegisterMapCentreAsync/${id}`);
                   // url.searchParams.append('UserId', id);

                    const response = await trackPromise(fetchWrapper.get(url.toString()));
                    return response;
                } catch (error) {
                    console.log(error.message);
                    return rejectWithValue(error);
                }
            }
        );
    }

    function insert() {
        return createAsyncThunk(
            `${name}/insert`,
            async ({ id, transformedData }, { rejectWithValue }) => {
                try {
                    return await trackPromise(fetchWrapper.post(`${baseUrl}/Register-MC`, { Data: transformedData }));
                } catch (error) {
                    return rejectWithValue(error);
                }
            }
        );
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async ({ id, transformedData }, { rejectWithValue }) => {
                try {
                    return await trackPromise(fetchWrapper.post(`${baseUrl}/Register-MC`, { Data: transformedData }));
                } catch (error) {
                    return rejectWithValue(error);
                }
            }
        );
    }

    
}

function createReducers() {
    return {
        clear
    };

    function clear(state) {
        state.userData = null;
    }
}

function createExtraReducers() {
    return (builder) => {
        get();

        function get() {
            var { pending, fulfilled, rejected } = extraActions.get;
            builder
                .addCase(pending, (state) => {
                    state.userData = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    const data = action.payload;
                    state.userData = data.Data;
                    console.log(data.Data);
                })
                .addCase(rejected, (state, action) => {
                    state.userData = { error: action.error };
                });
        }       
    };
}