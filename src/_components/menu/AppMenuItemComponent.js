import React from 'react';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    border: '1px solid #fff', // Add border to the button
    color: '#fff', // Set text color
    '&:hover': {
      border: '1px solid #ccc', // Change border color on hover
    },
  },
  activeButton: {
    backgroundColor: '#3f51b5', // Highlight color for the active button
    border: '1px solid #3f51b5', // Match border color with background
    color: '#fff', // Ensure text color is readable
  },
}));

const AppMenuItemComponent = (props) => {
  const { className, onClick, link, children } = props;
  const classes = useStyles();

  // If link is not set, return an ordinary Button
  if (!link || typeof link !== 'string') {
    return (
      <Button
        className={`${classes.button} ${className}`}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }

  // Return a Button with a link component
  return (
    <Button
      className={`${classes.button} ${className}`}
      component={React.forwardRef((props, ref) => (
        <NavLink
          exact
          {...props}
          innerRef={ref}
          activeClassName={classes.activeButton}
        />
      ))}
      to={link}
    >
      {children}
    </Button>
  );
};

export default AppMenuItemComponent;