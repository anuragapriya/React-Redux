import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { Button, Menu, MenuItem, Grid } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AppMenuItemComponent from './AppMenuItemComponent';

// React runtime PropTypes
export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
};

// Improve child items declaration
export const AppMenuItem = (props) => {
  const { name, Icon, items = [], link } = props;
  const classes = useStyles();
  const isExpandable = items && items.length > 0;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if (isExpandable) {
      setAnchorEl(event.currentTarget);
    } else if (link) {
      // Handle navigation if link is provided
      window.location.href = link;
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const MenuItemRoot = (
    <AppMenuItemComponent className={classes.menuItem} link={link} onClick={handleClick} >
        {/* Display an icon if any */}
        {!!Icon && (
          <span className="menuItemIcon">
            <Icon />
          </span>
        )}
        {name}
        {/* Display the expand menu if the item has children */}
        {isExpandable && (anchorEl ? <ExpandLess /> : <ExpandMore />)}
      </AppMenuItemComponent>
  );

  const MenuItemChildren = 
  isExpandable && (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
       anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
       transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      {items.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </Menu>
  )
  
  return (
    <>
       {MenuItemRoot}
       {MenuItemChildren}
      {/* {isExpandable && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
         // onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {items.map((subItem, index) => (
            <MenuItem key={index} onClick={() => window.location.href = subItem.link}>
              {subItem.name}
            </MenuItem>
          ))}
        </Menu>
      )} */}
    </>
  );
};

const useStyles = makeStyles(theme =>
  createStyles({
    menuItem: {
  
      '&.active': {
        background: '#DFEDFF',
    
      },
      
    },

  }),
);

export default AppMenuItem;
