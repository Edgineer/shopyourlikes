import React, { Component } from 'react';
import axios from "axios/index";

class InstagramLogin extends Component {
	constructor(props) {
    super(props);
    this.state = {
         //Load the hash string from the url, chop off the first 13 characters, which are useless
         token: this.props.location.hash.slice(14)
        }

        //Get the Instagram username and reroute to links
        this.getUsername();
    }

    async getUsername() {

    axios.get('/instaMatch/' + this.state.token).then(res => {

      if(res.data === ''){
        alert("Instagram username does not match any of our usernames!");
        this.props.history.push({pathname: "/"});
        }
      else{
        //Store the token
        const token = JSON.stringify(res.data);
        localStorage.setItem('token', token);

        //This is some bad code to parse the token returned
        //The token is still a dummy token!
        const returns = res.data.split("#");
        this.props.history.push({pathname: "/linktree", state: {userVal: returns[1]}});

        } 
    }); 
}

    //Ideally we'd get rid of this! but I get an error
    render() {return (<p></p>);}
}

export default InstagramLogin;