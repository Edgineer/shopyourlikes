import React, { Component } from 'react';
import logo from './../logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Linklist from ".././linklist/Linklist"
import logoColor from ".././img/logoColor.svg"
import './../App.css';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      username: ""
    }
  }

  handleChangeUsername = event => {
    this.setState({ username: event.target.value });
  }

  handleNewAccount() {
    this.setState({
      signIn: !this.state.signIn
    });
  }

  render() {
    if (this.state.signIn === true)
    {
      return (
        <div className="Login-title">
          <ul className="Login-box">
            <img id="Login-logo" src={logoColor} alt="ShopYourLikes"/>
            {/* <h2 id="Login-subtext">Login to continue</h2> */}
            <hr width="87%" align="left"/>
            <p>Login with instagram</p>
            <hr width="87%" align="left" color="#a5a5b2"/>


            <form>
              <input type="text" placeholder="Username" name="username" onChange={this.handleChangeUsername} ></input>
              <br />
              <input type="text" placeholder="Password"></input>
            </form>

            <br/>
            <p id="Login-button"><Link to={{pathname: '/linktree', state: {userVal: this.state.username}}} >Log In</Link></p>
            
            <br/>
          </ul>

          <br/>
          <button onClick={() => this.handleNewAccount()} id="New-account-link">Don't have an account?</button>
        </div>
      );
    }
    else {
      return (
        <div className="Login-title">
          <h1>ShopYourLikes</h1> 
          <h2 id="Login-subtext">Enter your user information</h2>
          <ul className="Login-box">
            <p>Login with instagram</p>
            <hr width="87%" align="left"/>

            <form>
              <input type="text" placeholder="Email" ></input>
              <br />
              <input type="text" placeholder="Username" ></input>
              <br />
              <input type="text" placeholder="Password"></input>
              <br />
              <input type="test" placeholder="Repeat password"></input>
            </form>

            <br/>
            <p id="Login-button"><Link to="/">Create Account</Link></p>
            <br/>
          </ul>

          <br/>
          <button onClick={() => this.handleNewAccount()} id="New-account-link">Have an account?</button>
        </div>
      );
    }
  }
}

export default Login;