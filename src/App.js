import { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import RouteList from './routes/RouteList';
import { history } from '_utils';
// import { useDispatch } from 'react-redux';
// import { authActions } from '_store';

const App = () => {
  // const dispatch=useDispatch()
  history.navigate = useNavigate();
  history.location = useLocation();
  //  const logout = () => dispatch(authActions.logout());

  //  useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     logout();
  //     // Optionally, show a confirmation dialog
  //     event.preventDefault();
  //     event.returnValue = '';
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  return (
    <div>
      <React.StrictMode>
        <Fragment>
          <RouteList />
        </Fragment>
      </React.StrictMode>
    </div>
  );
};

export default App;