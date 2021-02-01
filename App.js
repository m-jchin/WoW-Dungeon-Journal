import React from 'react';
import './App.css';

import RegisterForm from './RegisterForm';
import HomePage from './HomePage';
import SignIn from './SignIn';
import { Link, Switch, BrowserRouter, Route } from 'react-router-dom';
let CONFIG = require('./apikeys.json');


function App() {


  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/RegisterForm" component={RegisterForm} />
          <Route path='/SignIn' component={SignIn} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div >
  );

}
//<SignIn />
export default App;