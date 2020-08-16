import React from 'react';
import './App.css';
import GetVehicles from './catalog/GetVehicles/GetVehicles';
import Login from './login/login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './login/register';


/**
* @author
* @function App
**/

const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/GetVehicles' component={GetVehicles} />
        </Switch>
      </BrowserRouter>
    </div>
  )

}

export default App;

