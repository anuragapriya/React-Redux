import React from "react";
import { AppMenu } from "_components";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

const DashboardLayout = ({ appMenuItems }) => {
  const classes = useStyles();

  return (
    <div className={clsx('App', classes.root)}>
      <CssBaseline />
      <AppMenu appMenuItems={appMenuItems} />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column', // Ensure the layout is columnar
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default DashboardLayout;