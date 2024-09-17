import { Routes, Route, Navigate } from 'react-router-dom';
import  Alert from '_components/Alert';
import  Nav  from '_components/Nav';
import  Home  from 'container/home/Home';
import  LoginLayout  from '../container/layout/LoginLayout';
import  UsersLayout  from '../container/layout/UsersLayout';
import PrivateRoute from './PrivateRoute';



export default function RouteList() { 

    return (
        <div>
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Routes >
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="users/*" element={<UsersLayout />} />
                    </Route>
                    {/* public */}
                    <Route path="/*" element={<LoginLayout />} exact />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}

