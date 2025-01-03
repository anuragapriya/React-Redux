import { createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { fetchWrapper } from '_utils/fetch-wrapper';

// create slice

const name = 'supplydiversity';
const initialState = createInitialState();
const extraActions = createExtraActions();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const supplyDiversityAction = { ...slice.actions, ...extraActions };
export const supplyDiversityReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        userData: null,
        document: null
    }
}

function createExtraActions() {
   // const baseUrl = `${process.env.REACT_APP_API_URL}/diversity`;
    const baseUrl = `${process.env.REACT_APP_API_URL}/api/Account`;
    return {
        get: get(),
        update: update()
    };

    function get() {
        return createAsyncThunk(
            `${name}/getUserData`,
            async ({ id, portal }, { rejectWithValue }) => {
                try {
                    const url = `${baseUrl}/${id}?portal=${portal}`;
                    const response = await trackPromise(fetchWrapper.get(url));
                    return response;
                } catch (error) {
                    console.log(error.message);
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
                    return await trackPromise(fetchWrapper.post(`${baseUrl}/Register-SD`, { Data: transformedData }));
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