import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios/index";
import './Tree.css';
import logo from './../img/logo dark.svg';

const MESSAGE_URL = "/links";

class Tree extends Component {
    constructor(props) {
        super(props);

        //get the passed in username and set it to a variable
        const {match: {params }} = this.props;
        this.username = params.user;

        //get image if it exists
        try {
            this.userImage = "http://res.cloudinary.com/dqm1bxfif/image/upload/" + this.username + ".jpg"
        }
        catch (e){
            this.hasUserImage = false
        }

        //save the user's info
        this.state = {
            listOfLinks: [],
            error: null,
            username: "",
            title: "", 
            url: "",
            priority: 0,
            deleteTitle: ""
        };
    }

    async componentDidMount() {
        this.getUserInfo()
    }

    async getUserInfo() {
        try {
            //response.data contains an array of JavaScript objects
              const response = await axios.get(MESSAGE_URL + "/" + this.username);
              this.setState({listOfLinks: response.data});
          } catch (error) {
              this.setState({error: "Error!"});
          } 
    }

    render() {
        const {match: {params}} = this.props;

        //background image
        let backgroundStyle = {
            backgroundImage: 'url(' + this.userImage + ')',
            overflow:'hidden',
        };

        return (
            <div  style={backgroundStyle} id="Background">
                <br/>
                <h3 id="Username"> @{this.username} </h3>
                {this.state.listOfLinks.map(function(name, index){
                return (
                        <a href={name.url}><div className="Link-box" key={index}>{name.title}</div></a>
                        );
                })}
                <br/>
                <hr color="white"/>
                <div id="Logo">
                    <img src={logo} alt="ShopYourLikes"/>
                </div>
            </div>
        );
    }
}

export default Tree;