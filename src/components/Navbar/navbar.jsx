import React from 'react';
import Home from '../Home/Home';
import TextToSpeech from '../../views/TextToSpeech';
import SimpleAccordion from '../Questions/questions';

import Mapsv2 from '../Mapsv2/Mapsv2';
import Contact from '../Contact/Contact';
import alphaB from './alphaB.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
// import { ClassSharp } from '@material-ui/icons';
const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    color: 'white',
  },
  titleName: {
    color: 'white',
    textDecoration: 'none',
  },
  logo: {
    width: 50,
    height: 50,
    margin: 'auto',
  },
}));
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  const classes = useStyles();
  return (
    <Router>
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <img src={alphaB} alt="" className={classes.logo} />
              </Typography>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" className={classes.titleName}>
                  Home
                </Link>
              </Typography>
              <Typography variant="h6" className={classes.title}>
                <Link to="/aide" className={classes.titleName}>
                  Aide
                </Link>
              </Typography>

              <Typography variant="h6" className={classes.title}>
                <Link to="/mapsv2" className={classes.titleName}>
                  MAPS
                </Link>
              </Typography>
              <Typography variant="h6" className={classes.title}>
                <Link to="/contact" className={classes.titleName}>
                  Contact
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
      </React.Fragment>
      <Switch>
        <Route path="/aide">
          <SimpleAccordion />
          <TextToSpeech />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/mapsv2">
          <Mapsv2 />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
