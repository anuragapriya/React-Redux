import  React from "react";
import { AppMenu } from "_components";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

const DashboardLayout = ({appMenuItems}) => {
    const classes = useStyles()
    
    return (
        <div className={clsx('App', classes.root)}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <AppMenu appMenuItems={appMenuItems}></AppMenu>
            </Drawer>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                <Outlet />
                </Container>
            </main>
        </div>
    );
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#535454',
    color: '#fff',
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
}))

export default DashboardLayout;
