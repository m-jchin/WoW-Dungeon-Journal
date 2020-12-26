import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import DungeonForm from './DungeonForm';
import GenerateInfo from './GenerateInfo';
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
          <Route path="/" exact component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div >
  );

}
//<SignIn />
export default App;