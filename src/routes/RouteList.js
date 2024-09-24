import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '_components/Alert';
import Nav from '_components/Nav';
import Home from 'container/home/Home';
import LoginLayout from 'container/layout/LoginLayout';
import UsersLayout from 'container/layout/UsersLayout';
import PrivateRoute from './PrivateRoute';
import SessionTimeout from '_utils/SessionTimeout';
import { authActions } from '_store';
import { usePromiseTracker } from 'react-promise-tracker';
import LoadingOverlay from '_components/LoadingOverlay';

const RouteList = () => {
    const promiseTracker = usePromiseTracker();
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    const auth = useSelector(x => x.auth.value);

    return (
        <div>
            <Nav />
            <Alert />
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