import React, { Component } from 'react';
import logo from './../logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Linklist from ".././linklist/Linklist"
import logoColor from ".././img/logoColor.svg"
import instagram_logo from "./instagram_logo.svg"
import './../App.css';
import './Login.css';

import axios from "axios/index";


const INSTA_API = "https://api.instagram.com/oauth/authorize/?" +
                "client_id=0730e096783745e7a0da8eed3152b8f6" + "&" + 
                "redirect_uri=http://localhost:3000/insta_auth" + "&" +
                "response_type=token";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      username: "",
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

  handleLogin(event) {
    //Prevent page from reloading
    event.preventDefault();

    axios.get('/match/' + this.state.username + '/' + this.refs.password.value).then(res => {

      if(res.data === '') //If empty string
        alert("Username and Password are not correct.");
      else{
        //Store the token
        const serializedState = JSON.stringify(res.data);
        localStorage.setItem('token', serializedState);

        //Redirect to user's profile
        this.props.history.push({pathname: '/linktree', state: {userVal: this.state.username}});
      }
    })
    
  }

  handleSubmit(event) {
    //Prevent page from reloading
    event.preventDefault();

    //Ask the backend if the username already exists
    axios.get('/checkUsername/' + this.refs.newUsername.value).then(res => {
      //res is the response we got from the backend, a JSON containing a boolean
      if(res.data)
        alert("Username already exists!"); 
      else if( this.refs.newPassword.value != this.refs.newPasswordRepeat.value)
        alert("Passwords don't match!");
      //The data is validated, so we post the new account info
      else {
        //Pack the new account info
        const userInfo = {
        "firstname": this.refs.newFirst.value, 
        "lastname": this.refs.newLast.value, 
        "username": this.refs.newUsername.value, 
        "email": this.refs.newEmail.value, 
        "hash": this.refs.newPassword.value};

        //Make the post request
        axios.post('/', userInfo).then(res => {
          alert("Your account was created! Please Login.");
          this.handleNewAccount();
        });
      } 
    })
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
            <a href={INSTA_API}> <img src={instagram_logo} width="70" alt="Login with Instagram"/></a>
            <hr width="87%" align="left" color="#a5a5b2"/>


            <form onSubmit={this.handleLogin.bind(this)}>
              <input type="text" placeholder="Username" name="username" onChange={this.handleChangeUsername} required="required"></input>
              <br />
              <input type="password" placeholder="Password" ref="password" required="required"></input>

              {/* Hidden button, so the button below can link to it*/}
              <input type="submit" id="submit-login"  class="Hidden-button"/>
            </form>

            <br/>
            {/*<Link to={{pathname: '/linktree', state: {userVal: this.state.username}}} ><p id="Login-button">Log In</p></Link>*/}
            <p id="Login-button"><label for="submit-login">Log In</label></p>
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

            <form onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" placeholder="First name" ref="newFirst" required="required"></input>
              <br />
              <input type="text" placeholder="Last name" ref="newLast" required="required"></input>
              <br />
              <input type="text" placeholder="Email" ref="newEmail" required="required"></input>
              <br />
              <input type="text" placeholder="Username" ref="newUsername" required="required"></input>
              <br />
              <input type="password" placeholder="Password" ref="newPassword" required="required"></input>
              <br />
              <input type="password" placeholder="Re-enter password" ref="newPasswordRepeat" required="required"></input>

              {/* Hidden button, so the button below can link to it*/}
              <input type="submit" id="submit-new-info"  class="Hidden-button"/>
            </form>

            <br/>
            <p id="Login-button"><label for="submit-new-info">Create New Account</label></p>
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