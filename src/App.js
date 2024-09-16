import { Fragment } from 'react';
import React from 'react';
import RouteList from './routes/RouteList';



export default function App() {
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
