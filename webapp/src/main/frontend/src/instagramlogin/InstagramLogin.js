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
        try {
            var response =  await axios.get("https://api.instagram.com/v1/users/self/?access_token=" + this.state.token);

            //Reroute us to the link page, passing the username
            this.props.history.push({pathname: "/linktree", state: {userVal: response.data.data.username}});

        } catch (error) {
            this.setState({error: "Error!"});
    } 
}

    //Ideally we'd get rid of this! but I get an error
    render() {return (<p></p>);}
}

export default InstagramLogin;