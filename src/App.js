import { Fragment } from 'react';
import React from 'react';
import RouteList from './routes/RouteList';

const Apps=()=> {
    return (
        <div>
        <React.StrictMode>
          <Fragment>
            <RouteList />
          </Fragment>
        </React.StrictMode>
      </div>
    );
}

export default Apps;