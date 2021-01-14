import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

import RegisterForm from './RegisterForm';
import SignIn from './SignIn';
import HomePage from './HomePage';
import { Link, Switch, BrowserRouter, Route } from 'react-router-dom';
let CONFIG = require('./apikeys.json');


function App() {


  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/RegisterForm" component={RegisterForm} />
          <Route path='/SignIn' component={SignIn} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div >
  );

}
//<SignIn />
export default App;