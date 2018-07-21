import React, { Component } from 'react';
import logo from '../../logo.svg';

class LoginForm extends Component {
  render() {
    return (
    <div className="LoginForm">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui teal image header">
            <img src={logo} alt="Logo" className="image"/>
            <div className="content">
              Sign in
            </div>
          </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <a href="/oauth/google" className="ui fluid large teal submit button"><i className="google icon"></i>Sign in with Google</a>
            </div>

            <div className="ui error message"></div>

          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default LoginForm;
