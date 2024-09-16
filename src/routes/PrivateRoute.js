import { Navigate, Outlet ,useNavigate, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '../routes';


export default function PrivateRoute() {
    const auth = useSelector(x => x.auth.value);
    const location = useLocation();
   

    if (!auth) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/loginPage/login" state={{ from: location }} />
    }

    // authorized so return outlet for child routes
    return <Outlet />;
}

