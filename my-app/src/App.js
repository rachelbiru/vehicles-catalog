import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import GetVehicles from './components/GetVehicles/GetVehicles';
import Register from './components/user/Register'
import Login from './components/user/login';
import HomePage from './components/HomePage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';


/**
* @author
* @function App
**/

const App = (props) => {

  return (
    <MuiThemeProvider>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/cars-catalog' component={GetVehicles} />
        </Switch>
      </Router>
    </MuiThemeProvider>


  )

}

export default App;

