import React, { useEffect, useRef, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usePromiseTracker } from 'react-promise-tracker';
import { store, authActions } from '_store';
import PrivateRoute from './PrivateRoute';
//import useRefreshToken from '_utils/useRefreshToken'
import Nav from '_components/Nav';
import LoadingOverlay from '_components/LoadingOverlay';
import Notification from '_components/Notification';
import SessionTimeout from '_components/SessionTimeout';
import LoginLayout from 'container/layout/LoginLayout';
import UsersLayout from 'container/layout/UsersLayout';
import Home from 'container/home/Home';

const RouteList = () => {

    const promiseTracker = usePromiseTracker();
    const intervalRef = useRef();
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    const auth = useSelector(x => x.auth.value);
    const tokenExpiryDateTime = new Date(auth?.tokenExpiry);
    const startDate = new Date();
    const difference = tokenExpiryDateTime - startDate;
    const differenceMin = Math.round((difference / 1000) / 60);
    const intervalTime = differenceMin - 2; // 2 minutes before token expiry
    const isValidExpiryDateTime = !isNaN(intervalTime);

    const getToken = useCallback(async () => {
        // Get new token if and only if existing token is available
        const auth = store.getState().auth.value;
        if (auth) {
            await dispatch(authActions.refreshToken());
        }
    }, []);
    // Trigger API to get a new token before token gets expired.
    useEffect(() => {
        if (isValidExpiryDateTime) {
            const interval = setInterval(() => getToken(), 1000 * 60 * intervalTime); 
            intervalRef.current = interval;
            return () => clearInterval(interval);
        }
    }, [getToken, isValidExpiryDateTime]);
  
    return (
        <div>
            <Nav />
            {/* <Alert /> */}
            <Notification />
            {/* <LoadingOverlay loading={promiseTracker.promiseInProgress}></LoadingOverlay> */}
            <div className="  p-0">
                <Routes >
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="home" element={<Home />} />
                        <Route path="users/*" element={<UsersLayout />} />
                    </Route>
                    {/* public */}
                    <Route path="/*" element={<LoginLayout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <SessionTimeout onLogout={logout} isAuthenticated={auth} />
            </div>
        </div>
    );
}

export default RouteList;