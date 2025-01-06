import * as React from 'react';
import Link from "@material-ui/core/Link";
import { logo } from '../images';
import { labels } from "_utils/labels";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '_store';
import { MyProfile, Support ,Notifications } from 'container/headers';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import Tooltip from '@mui/material/Tooltip';
import { Box } from "@mui/material";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//const Nav = ({ isAuthenticated }) => {
   // if (!isAuthenticated) return null;

//     return (
//         <>
//             {/* <nav className="navbar navbar-expand  nav-bar-container">
//                 <div className='container'>
//                     <div className="navbar-nav">
//                         <Link href="/home" variant="logo" className="wgllogo">
//                             <img src={logo} alt="logo"></img>
//                             {labels.eServicePortal}
//                         </Link>
//                         <div className='nav-linksbuttons'>
//                             <Support></Support>
//                             <Box className="iconcolor">
//                             <Tooltip title="Settings">
//                             <SettingsOutlinedIcon/>
//                             </Tooltip>
//                             </Box>
//                             <Box className="iconcolor" >
//                             <Tooltip title="BarChar">
//                             <BarChartOutlinedIcon/>
//                             </Tooltip>
//                             </Box>
//                             <Box className="iconcolor">
//                             <Tooltip title="List">
//                             <ListAltOutlinedIcon/>
//                             </Tooltip>
//                             </Box>
//                             <Notifications></Notifications>
//                             <MyProfile></MyProfile>
//                         </div>
//                     </div>
//                 </div>
//             </nav> */}
            
//             {/* <Outlet /> */}
//         </>
//     );
// }
const drawerWidth = 240;


function Nav(props , isAuthenticated) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const logout = () => dispatch(authActions.logout());
  if (!isAuthenticated) return null;
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      <Link href="/home" variant="logo" className="wgllogo">
                     <img src={logo} alt="logo"></img>
                      {labels.eServicePortal}
                  </Link>
      </Typography>
      <Divider />
      <List>
       
      <div className='nav-linksbuttons'>
                            <Support></Support>
                            <Box className="iconcolor">
                            <Tooltip title="Settings">
                            <SettingsOutlinedIcon/>
                            </Tooltip>
                            </Box>
                            <Box className="iconcolor" >
                                                             <Tooltip title="BarChar">
                             <BarChartOutlinedIcon/>
                            </Tooltip>
                             </Box>
                             <Box className="iconcolor">
                            <Tooltip title="List">
                            <ListAltOutlinedIcon/>
                             </Tooltip>
                            </Box>
                             <Notifications></Notifications>
                            <MyProfile></MyProfile>
                         </div>
                 
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }} className="navcontainer">
      <CssBaseline />
      <AppBar component="nav" className='navbarbackground'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          <Link href="/home" variant="logo" className="wgllogo">
                    <img src={logo} alt="logo"></img>
                     {labels.eServicePortal}
                  </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
           
          <div className='nav-linksbuttons'>
                            <Support></Support>
                           <Box className="iconcolor">
                            <Tooltip title="Settings">
                            <SettingsOutlinedIcon/>
                            </Tooltip>
                            </Box>
                            <Box className="iconcolor" >
                            <Tooltip title="BarChar">
                            <BarChartOutlinedIcon/>
                            </Tooltip>
                            </Box>
                            <Box className="iconcolor">
                            <Tooltip title="List">
                            <ListAltOutlinedIcon/>
                            </Tooltip>
                            </Box>
                            <Notifications></Notifications>
                             <MyProfile></MyProfile>
                         </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
     
    </Box>
  );
}

Nav.propTypes = {

  window: PropTypes.func,
};

export default Nav;