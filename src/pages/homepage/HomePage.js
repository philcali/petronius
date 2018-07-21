import React, { Component } from 'react';
import logo from '../../logo.svg';
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div>
        <TopBar/>
        <Content/>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div className="pusher">
        <MastHead />
      </div>
    );
  }
}

class TopBar extends Component {
  render() {
    return (
      <div className="ui large top fixed menu">
        <div className="ui container">
          <div className="left menu">
            <div className="item">
              <img className="ui mini spaced image" alt="Logo" src={logo}/>
            </div>
          </div>
          <div className="right menu">
            <div className="item">
              <Link to="/login" className="ui primary button">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class MastHead extends Component {
  render() {
    return (
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted header">
            Petronius
          </h1>
          <h2>Get informed your way.</h2>
          <div className="ui huge primary button">Get Started <i className="right arrow icon"></i></div>
        </div>
      </div>
    );
  }
}

export default HomePage;
