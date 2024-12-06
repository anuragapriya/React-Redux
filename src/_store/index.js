import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { portalAccessReducer } from './configuration.slice';

import { registrationReducer } from './registration.slice';


export * from './alert.slice';
export * from './auth.slice';
export * from './users.slice';
export * from './configuration.slice';

export * from './registration.slice';


export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer,
        configs:portalAccessReducer,

        registration:registrationReducer

    },
});