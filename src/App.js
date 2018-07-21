import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import HomePage from './HomePage';
import LoginForm from './LoginForm';

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
