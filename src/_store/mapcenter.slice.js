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
    const baseUrl = `${process.env.REACT_APP_API_URL}/mapcenter`;
    //  const baseUrl = `${process.env.REACT_APP_API_URL}/api/Account`;

    return {
        get:get(),
        update:update()
    };

    function get() {
        return createAsyncThunk(
            `${name}/getUserData`,
            async ({ id, portal }) => {
                const url = `${baseUrl}/${id}?portal=${portal}`;
                return await trackPromise(fetchWrapper.get(url));
            }
        );
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async function ({ id, Data }) {
                await trackPromise(fetchWrapper.post(`${baseUrl}/${id}`, { Data }));
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
                    state.userData=data.Data;
                    console.log(data.Data);
                })
                .addCase(rejected, (state, action) => {
                    state.userData = { error: action.error };
                });
        }

        // function update() {
        //     var { pending, fulfilled, rejected } = extraActions.update;
        //     builder
        //         .addCase(pending, (state) => {
        //             state.userData = { loading: true };
        //         })
        //         .addCase(fulfilled, (state, action) => {
        //             state.userData = action.payload;
        //         })
        //         .addCase(rejected, (state, action) => {
        //             state.userData = { error: action.error };
        //         });
        // }
    };
}