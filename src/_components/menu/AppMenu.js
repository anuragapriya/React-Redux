import React from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import { makeStyles, createStyles } from '@material-ui/core/styles'
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
    const classes = useStyles()
    const auth = useSelector(x => x.auth.value);
    // only show nav when logged in
    if (!auth) return null;
        
    return (
      <List component="nav" className={classes.appMenu} disablePadding>
        {/* <AppMenuItem {...appMenuItems[0]} /> */}
        {appMenuItems.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))}
      </List>
    )
};

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export default AppMenu;