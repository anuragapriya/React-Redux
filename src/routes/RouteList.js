import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usePromiseTracker } from 'react-promise-tracker';
import { authActions } from '_store';
import PrivateRoute from './PrivateRoute';
import useRefreshToken from '_utils/useRefreshToken'
import Nav from '_components/Nav';
import LoadingOverlay from '_components/LoadingOverlay';
import Notification from '_components/Notification';
import SessionTimeout from '_components/SessionTimeout';
import LoginLayout from 'container/layout/LoginLayout';
import UsersLayout from 'container/layout/UsersLayout';
import Home from 'container/home/Home';

const RouteList = () => {
    const promiseTracker = usePromiseTracker();
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    const auth = useSelector(x => x.auth.value);
    useRefreshToken();   
    return (
        <div>
            <Nav />
            {/* <Alert /> */}
            <Notification/>
            <LoadingOverlay loading={promiseTracker.promiseInProgress}></LoadingOverlay>
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