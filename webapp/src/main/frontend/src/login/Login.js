import React, { Component } from 'react';
import logo from './../logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Linklist from ".././linklist/Linklist"
import logoColor from ".././img/logoColor.svg"
import branchLogo from ".././img/branchly_shopyourlikes.svg"
import instagram_logo from "./instagram_logo.svg"
import './../App.css';
import './Login.css';

import axios from "axios/index";


const INSTA_LOGIN = "https://api.instagram.com/oauth/authorize/?" +
                "client_id=0730e096783745e7a0da8eed3152b8f6" + "&" + 
                "redirect_uri=http://localhost:3000/insta_login" + "&" +
                "response_type=token";
const INSTA_SIGNUP = "https://api.instagram.com/oauth/authorize/?" +
                "client_id=0730e096783745e7a0da8eed3152b8f6" + "&" + 
                "redirect_uri=http://localhost:3000/insta_signup" + "&" +
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



  render() {

    if (this.state.signIn === true)
    {
      return (
        <div className="Login-title">
          <ul className="Login-box">
            <img clas="resize" id="Login-logo" src={branchLogo} alt="ShopYourLikes"/>
            <hr width="87%" align="left"/>

            <div display="inline-block">
              {/* <div className="instagram-text">Login with Instagram</div> */}
              <a href={INSTA_LOGIN}> <img src={instagram_logo} width="70" alt="Login with Instagram"/></a>
            </div>

            <p clear="both">-or-</p>

            <form onSubmit={this.handleLogin.bind(this)}>
              <input type="text" placeholder="Username" name="username" onChange={this.handleChangeUsername} required="required" className="username-field"></input>
              <br/><br/>
              <input type="password" placeholder="Password" ref="password" required="required" className="password-field"></input>

              {/* Hidden button, so the button below can link to it*/}
              <input type="submit" id="submit-login"  class="Hidden-button"/>
            </form>

            <br/>
            {/*<Link to={{pathname: '/linktree', state: {userVal: this.state.username}}} ><p id="Login-button">Log In</p></Link>*/}
            <label for="submit-login"><p id="Login-button">Log In</p></label>
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
          <ul className="Signup-box">
            <img id="Login-logo" src={branchLogo} alt="ShopYourLikes"/>
            <hr width="87%" align="left"/>
            <div display="inline-block">
              {/* <div className="instagram-text">Login with Instagram</div> */}
              <a postition="relative" text-align="center" href={INSTA_SIGNUP}> <img src={instagram_logo} width="70" alt="Login with Instagram"/></a>
            </div>
            Before creating your account,
            <br/>
            please log in to Instagram
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