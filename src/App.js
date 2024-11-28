import { Fragment } from 'react';
   import { useNavigate, useLocation } from 'react-router-dom';
   import React from 'react';
   import RouteList from './routes/RouteList';
   import { history } from '_utils';
   import { useFontSize } from '_components/font/FontSizeProvider';
   import FontSizeSelector from '_components/font/FontSizeSelector';

   const Apps = () => {
     history.navigate = useNavigate();
     history.location = useLocation();
     const { fontSize } = useFontSize();

     return (
       <div className={`font-${fontSize}`}>
         <FontSizeSelector />
         <React.StrictMode>
           <Fragment>
             <RouteList />
           </Fragment>
         </React.StrictMode>
       </div>
     );
   };

   export default Apps;