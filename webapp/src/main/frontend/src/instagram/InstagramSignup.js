import React, { Component } from 'react';
import axios from "axios/index";

class InstagramSignup extends Component {
	constructor(props) {
    super(props);
    this.state = {
         //Load the hash string from the url, chop off the first 13 characters, which are useless
         instaToken: this.props.location.hash.slice(14)
        }
    }

  handleRedirect() {
    this.props.history.push({pathname: '/'});
  }

  handleSubmit(event) {
    //Prevent page from reloading
    event.preventDefault();

    //Ask the backend if the username already exists
    axios.get('/users/checkUsername/' + this.refs.newUsername.value).then(res => {
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
        axios.post('/users/' + this.state.instaToken, userInfo).then(res => {
            
            if(res.data === ''){
                alert("The username you gave does not match your Instagram username. Usernames are case-sensitive");
            }
            else{
                alert("Your account was created! Please Login.");
                this.handleRedirect();
            }
        });
      } 
    })
  }

    render() {
        return (
        <div className="Login-title">
          <h1>ShopYourLikes</h1> 
          <h2 id="Login-subtext">Enter your new account info</h2>
          <ul className="Login-box">
            

            <form onSubmit={this.handleSubmit.bind(this)}>
              <br/>
              Instagram login succeeded!
              <br/>
              Please enter your new user info.
              <br/>
              <br/>
              First Name
              <br/>
              <input type="text" placeholder="First name" ref="newFirst" required="required"></input>
              <br />
              Last Name
              <br/>
              <input type="text" placeholder="Last name" ref="newLast" required="required"></input>
              <br />
              Email
              <br/>
              <input type="text" placeholder="Email" ref="newEmail" required="required"></input>
              <br />
              Instagram Username
              <br/>
              <input type="text" placeholder="Instagram Username" ref="newUsername" required="required"></input>
              <br />
              Password
              <br/>
              <input type="password" placeholder="Password" ref="newPassword" required="required"></input>
              <br />
              Re-enter Password
              <br/>
              <input type="password" placeholder="Re-enter password" ref="newPasswordRepeat" required="required"></input>
              {/* Hidden button, so the button below can link to it*/}
              <input type="submit" id="submit-new-info"  class="Hidden-button"/>
            </form>

            <br/>
            <p id="Login-button"><label for="submit-new-info">Create New Account</label></p>
            <br/>
          </ul>

          <br/>
          <button onClick={() => this.handleRedirect()} id="New-account-link">Have an account?</button>
        </div>
      );
    }
}

export default InstagramSignup;