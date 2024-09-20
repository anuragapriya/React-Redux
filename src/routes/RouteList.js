import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useRef, useEffect } from 'react';
import Alert from '_components/Alert';
import Nav from '_components/Nav';
import Home from 'container/home/Home';
import LoginLayout from 'container/layout/LoginLayout';
import UsersLayout from 'container/layout/UsersLayout';
import PrivateRoute from './PrivateRoute';
import SessionTimeout from '_utils/SessionTimeout';
import { authActions } from '_store';

const RouteList = () => {
    const intervalRef = useRef();
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    const auth = useSelector(x => x.auth.value);
    const getToken = useCallback(async () => {
        // Get new token if and only if existing token is available
        if (auth) {
            await dispatch(authActions.refreshToken());
        }
    }, []);
    // Trigger API to get a new token before token gets expired.
    useEffect(() => {
        const interval = setInterval(() => getToken(), 1000 * 60 * 6); // 6 minutes interval as our token will expire after 7 minutes.
        intervalRef.current = interval;
        return () => clearInterval(interval);
    }, [getToken]);

    return (
        <div>
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
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