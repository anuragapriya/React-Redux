import { createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { authActions } from '_store';
import { fetchWrapper } from '_utils/fetch-wrapper';
//import { userDetails } from '_utils/constant';

// create slice

const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        list: [],
        item: null,
        file: null
    }
}

function createExtraActions() {
   //const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
      const baseUrl = `${process.env.REACT_APP_API_URL}/api/Account`;

    return {
        getAll: getAll(),
        getById: getById(),
        update: update(),
        delete: _delete(),
        upload: upload()
    };

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await trackPromise(fetchWrapper.get(baseUrl))
        );
    }

    function getById() {
        return createAsyncThunk(
            `${name}/getById`,
            async (id) => await trackPromise(fetchWrapper.get(`${baseUrl}/${id}`))
        );
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async function ({ id, data, portalName }, { getState, dispatch }) {
                await trackPromise(fetchWrapper.put(`${baseUrl}/${id}`, { data, portalName }));

                // // update stored user if the logged in user updated their own record
                // const auth = getState().auth.value;
                // if (id === auth?.id.toString()) {
                //     // update local storage
                //     const user = { ...auth, ...data };
                //     localStorage.setItem('auth', JSON.stringify(user));

                //     // update auth user in redux state
                //     dispatch(authActions.setAuth(user));
                // }
            }
        );
    }

    // prefixed with underscore because delete is a reserved word in javascript
    function upload() {
        return createAsyncThunk(
            `${name}/upload`,
            async function (file, { getState, dispatch }) {
                console.log(file);
                const uploadedFile = await trackPromise(fetchWrapper.upload(`${baseUrl}/${file}`));
                console.log(uploadedFile);
                // auto logout if the logged in user deleted their own record

                localStorage.setItem("uploadedFile", uploadedFile);

            }
        );
    }

    function _delete() {
        return createAsyncThunk(
            `${name}/delete`,
            async function (id, { getState, dispatch }) {
                await trackPromise(fetchWrapper.delete(`${baseUrl}/${id}`));

                // auto logout if the logged in user deleted their own record
                if (id === getState().auth.value?.id) {
                    dispatch(authActions.logout());
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
        state.item = null;
    }
}

function createExtraReducers() {
    return (builder) => {
        getAll();
        getById();
        _delete();
        upload();

        function getAll() {
            var { pending, fulfilled, rejected } = extraActions.getAll;
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.list = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error };
                });
        }

        function getById() {
            var { pending, fulfilled, rejected } = extraActions.getById;
            builder
                .addCase(pending, (state) => {
                    state.item = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.item = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.item = { error: action.error };
                });
        }

        function _delete() {
            var { pending, fulfilled, rejected } = extraActions.delete;
            builder
                .addCase(pending, (state, action) => {
                    const user = state.list.value.find(x => x.id === action.meta.arg);
                    if (user) user.isDeleting = true;
                })
                .addCase(fulfilled, (state, action) => {
                    state.list.value = state.list.value.filter(x => x.id !== action.meta.arg);
                })
                .addCase(rejected, (state, action) => {
                    const user = state.list.value.find(x => x.id === action.meta.arg);
                    if (user) user.isDeleting = false;
                });
        }

        function upload() {
            var { pending, fulfilled, rejected } = extraActions.upload;
            builder
                .addCase(pending, (state) => {
                    state.file = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.file = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.file = { error: action.error };
                });
        }
    };
}

