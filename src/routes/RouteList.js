import React, { useEffect, useRef, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usePromiseTracker } from 'react-promise-tracker';
import { store, authActions } from '_store';
import PrivateRoute from './PrivateRoute';
import {Nav,LoadingOverlay,Notification,SessionTimeout} from '_components';
import {LoginLayout,AdminLayout,AccountInquiryLayout,EnergyAssistanceLayout, ForgotPasswordLayout} from 'container/layout';
import {Home} from 'container/dashboard';
import DocumentViewer from '_components/DocumentViewer';
import RegistrationLayout from 'container/layout/RegistrationLayout';

const RouteList = () => {

    const promiseTracker = usePromiseTracker();
    const intervalRef = useRef();
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    const auth = useSelector(x => x.auth.value);
    const thresholdMinsToRefreshTokenBeforeExpiry = 2; // 5 mins
    const isAuthenticated = auth?.Succeeded;
    const getToken = useCallback(() => {
        // Get new token if and only if existing token is available
        const auth = store.getState().auth.value;
        if (auth?.Data) {
            const tokenExpiry= auth?.Data?.UserDetails?.tokenExpiry;
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            const tokenExpiryDateTime = new Date(tokenExpiry);
            tokenExpiryDateTime.setMinutes(tokenExpiryDateTime.getMinutes() - thresholdMinsToRefreshTokenBeforeExpiry);
            const targetHours = tokenExpiryDateTime.getHours();
            const targetMinutes = tokenExpiryDateTime.getMinutes();
            const targetSeconds = tokenExpiryDateTime.getSeconds();
            if (hours === targetHours && minutes === targetMinutes && seconds === targetSeconds) {
                dispatch(authActions.refreshToken());
            }
        }
    }, []);

    // Trigger API to get a new token before token gets expired.
    useEffect(() => {
        const interval = setInterval(() => getToken(),  1000); // runs for every second an check if current time is same as time fore calling refresh token
        intervalRef.current = interval;
        return () => clearInterval(interval);
    }, [getToken]);
  
    return (
        <div>
            <Nav isAuthenticated={isAuthenticated} /> 
            <Notification />
            <LoadingOverlay loading={promiseTracker.promiseInProgress}></LoadingOverlay> 
            <div className="container inputtags">
                <Routes >
                    {/* private */}
                    <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="home" element={<Home />} />
                        <Route path="admin/*" element={<AdminLayout />} />
                        <Route path="accountInquiry/*" element={<AccountInquiryLayout />} />
                        <Route path="energyAssistance/*" element={<EnergyAssistanceLayout />} />
                        <Route path="/document" element={<DocumentViewer />} />
                    </Route>
                    {/* public */}
                    <Route path="/*" element={<LoginLayout isAuthenticated={isAuthenticated} />} />

                    <Route path="registration/*" element={<RegistrationLayout/>}/>
                    <Route path="forgotpassword/*" element={<ForgotPasswordLayout/>}/>

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <SessionTimeout onLogout={logout} isAuthenticated={isAuthenticated} />
            </div>
        </div>
    );
}

export default RouteList;