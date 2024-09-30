import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../loginPage/Login';
import Register from '../loginPage/Register';
import MainLayout from './mainLayout';

const LoginLayout = () => {
    const auth = useSelector(x => x.auth.value);

    // redirect to home if already logged in
    if (auth) {
        return <Navigate to="/home" />;
    }

    return (
        <div className=" p-0">
            <div className="row m-0">
                <div className="col-sm-12 login-container p-0">
                    <Routes>
                    <Route element={<MainLayout />}>
                        <Route index  element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default LoginLayout;