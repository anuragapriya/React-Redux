import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login } from 'container/loginPage';
import { Register } from 'container/registration';
import { MainLayout } from 'container/layout';

const LoginLayout = () => {
    const auth = useSelector(x => x.auth.value);

    // redirect to home if already logged in
    if (auth) {
        return <Navigate to="/home" />;
    }

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
}

export default LoginLayout;