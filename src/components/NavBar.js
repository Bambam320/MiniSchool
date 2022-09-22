//functional imports
import React from 'react';
import { Outlet } from 'react-router-dom';

//component imports
import NavBarLinks from './NavBarLinks';
import LoggedIn from "./LoggedIn";

//material imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function NavBar() {

  function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>
          <Toolbar style={{color: '#659DBD'}}>
            <Typography variant="h6" component="div">
              <NavBarLinks />
              <LoggedIn />
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Outlet />
    </React.Fragment>
  );
}

export default NavBar;


