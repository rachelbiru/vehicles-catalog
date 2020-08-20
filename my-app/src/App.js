import React,{useState} from 'react';
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
  const [token, setToken]  = useState('')

  const getToken = (token) =>{
       setToken(token)
  }

  return (
    <MuiThemeProvider>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/register' component={Register} />
          {/* <Route exact path='/login' component={Login} /> */}
          <Route exact path='/login' render={() => <Login getToken={getToken}/>} />
          <Route exact path='/cars-catalog' render={() => <GetVehicles token={token}/>} />
          {/* <Route exact path='/cars-catalog' component={GetVehicles} /> */}
        </Switch>
      </Router>
    </MuiThemeProvider>


  )

}

export default App;

