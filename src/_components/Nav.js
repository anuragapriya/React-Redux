import * as React from 'react';
import Link from "@material-ui/core/Link";
import { logo } from '../images';
import { labels } from "_utils/labels";
import { MyProfile, Support, Notifications } from 'container/headers';
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
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const Nav = ({ isAuthenticated, window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (!isAuthenticated) return null;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/home" variant="logo" className="wgllogo">
          <img src={logo} alt="logo" />
          {labels.eServicePortal}
        </Link>
      </Typography>
      <Divider />
      <List>
        <div className='nav-linksbuttons'>
          <Support />
          {/* <Box className="iconcolor">
            <Tooltip title="Settings">
              <SettingsOutlinedIcon />
            </Tooltip>
          </Box> */}
          <Box className="iconcolor">
            <Tooltip title="BarChart">
              <BarChartOutlinedIcon />
            </Tooltip>
          </Box>
          {/* <Box className="iconcolor">
            <Tooltip title="List">
              <ListAltOutlinedIcon />
            </Tooltip>
          </Box> */}
          <Notifications />
          <MyProfile />
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
            <MenuIcon  className='none-moblie' />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link href="/home" variant="logo" className="wgllogo">
              <img src={logo} alt="logo" />
              <span className='none-moblie'>{labels.eServicePortal}</span>
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <div className='nav-linksbuttons'>
              <Support />
              {/* <Box className="iconcolor">
                <Tooltip title="Settings">
                  <SettingsOutlinedIcon />
                </Tooltip>
              </Box> */}
              <Box className="iconcolor">
                <Tooltip title="BarChart">
                  <BarChartOutlinedIcon />
                </Tooltip>
              </Box>
              {/* <Box className="iconcolor">
                <Tooltip title="List">
                  <ListAltOutlinedIcon />
                </Tooltip>
              </Box> */}
              <Notifications />
              <MyProfile />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
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
};

Nav.propTypes = {
  window: PropTypes.func,
};

export default Nav;