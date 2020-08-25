import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import GetVehicles from './components/GetVehicles/GetVehicles';
import Register from './components/user/Register'
import Login from './components/user/login'
import HomePage from './components/HomePage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';


/**
* @author
* @function App
**/

const App = (props) => {
  const [token, setToken] = useState('')

  const getToken = (token) => {
    setToken(token)
  }



  return (
    <MuiThemeProvider>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/register' render={() => <Register getToken={getToken} />} />
          <Route exact path='/login' render={() => <Login getToken={getToken} />} />
          {token ? <Route exact path='/cars-catalog' render={() => <GetVehicles token={token} />} /> : <Redirect to="/" />}
          {localStorage.token ? <Route exact path='/cars-catalog' render={() => <GetVehicles token={localStorage.token} />} /> : <Redirect to="/" />}

        </Switch>
      </Router>
    </MuiThemeProvider>


  )

}

export default App;

