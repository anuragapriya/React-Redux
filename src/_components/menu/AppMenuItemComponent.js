import React from 'react';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';



const AppMenuItemComponent = (props) => {
  const { className, onClick, link, children } = props;

  // If link is not set, return an ordinary Button
  if (!link || typeof link !== 'string') {
    return (
      <Button
        className={className}
        style={{ border: '1px solid #0dcaf0' }}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }

  // Return a Button with a link component
  return (
    <Button
      style={{ border: '1px solid #0dcaf0',margin:10 }}
      className={className}
      component={React.forwardRef((props, ref) => <NavLink exact {...props} innerRef={ref} />)}
      to={link}
    >
      {children}
    </Button>
  );
};

export default AppMenuItemComponent;