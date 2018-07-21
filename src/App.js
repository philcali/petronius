import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import HomePage from './pages/homepage/HomePage';
import LoginForm from './pages/login/LoginForm';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/login' component={LoginForm}/>
      </Switch>
    );
  }
}

export default App;
