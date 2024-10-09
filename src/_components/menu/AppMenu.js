import React from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import { Dashboard,ShoppingCart,People,BarChart,LibraryBooks } from '@mui/icons-material';
import AppMenuItem from './AppMenuItem';

// const appMenuItems = [
//   {
//     name: 'Dashboard',
//     link: '/',
//     Icon: Dashboard,
//   },
//   {
//     name: 'Orders',
//     link: '/orders',
//     Icon: ShoppingCart,
//   },
//   {
//     name: 'Customers',
//     link: '/customers',
//     Icon: People,
//   },
//   {
//     name: 'Reports',
//     link: '/reports',
//     Icon: BarChart,
//   },
//   {
//     name: 'Nested Pages',
//     Icon: LibraryBooks,
//     items: [
//       {
//         name: 'Level 2',
//       },
//       {
//         name: 'Level 2',
//         items: [
//           {
//             name: 'Level 3',
//           },
//           {
//             name: 'Level 3',
//           },
//         ],
//       },
//     ],
//   },
// ];

const AppMenu = ({appMenuItems}) => {
    const auth = useSelector(x => x.auth.value);
    // only show nav when logged in
    if (!auth) return null;
    
  return (
    <List component="nav" className="appMenu" disablePadding>
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  );
};

export default AppMenu;

