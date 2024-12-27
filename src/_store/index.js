import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { portalAccessReducer } from './configuration.slice';
import { registrationReducer } from './registration.slice';
import { mapCenterReducer } from './mapcenter.slice';
import { masterReducer } from './master.slice';
import  { supplyDiversityReducer } from './supplydiversity.slice';

export * from './alert.slice';
export * from './auth.slice';
export * from './users.slice';
export * from './configuration.slice';
export * from './registration.slice';
export * from './mapcenter.slice';
export * from './master.slice';
export * from './supplydiversity.slice'


export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer,
        configs:portalAccessReducer,
        registration:registrationReducer,
        mapcenter:mapCenterReducer,
        master:masterReducer,
        supplydiversity:supplyDiversityReducer
    },
});