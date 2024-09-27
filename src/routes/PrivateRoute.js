import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {history} from '_utils';

const PrivateRoute =()=> {
    const isAuthentidated = useSelector(x => x.auth.value);

    if (!isAuthentidated) {
      // not logged in so redirect to login page with the return url
      return <Navigate to="/" state={{ from: history.location }} />
  }

    // authorized so return outlet for child routes
    return <Outlet />;
}

export default PrivateRoute;