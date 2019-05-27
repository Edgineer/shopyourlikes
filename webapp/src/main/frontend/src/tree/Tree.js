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

        this.userImage = "http://res.cloudinary.com/dqm1bxfif/image/upload/" + this.username + ".jpg"

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

    getTheme(index) {
        //let index 0 be the background
        var theme = ['#0', '#0', '#0', '#0', '#0'];

        switch(index){
            //light colors
            case 1:
                theme[0] = '#E8D7FF'
                theme[1] = '#FFD3E8'
                theme[2] = '#FFD7D5'
                theme[3] = '#F3FFE1'
                theme[4] = '#DFFFD6'
                break;
            //bunch of greens
            case 2:
                theme[0] = "#5BBA6F"
                theme[1] = "#3FA34D"
                theme[2] = "#2A9134"
                theme[3] = "#137547"
                theme[4] = "#054A29"
                break;
            //bunch of reds
            case 3:
                theme[0] = "#C52233"
                theme[1] = "#A51C30"
                theme[2] = "#A7333F"
                theme[3] = "#74121D"
                theme[4] = "#580C1F"
                break;
            //monochrome and orange
            case 4:
                theme[0] = "#EFFFFA"
                theme[1] = "#515052"
                theme[2] = "#000103"
                theme[3] = "#333138"
                theme[4] = "#FF312E"
                break;
            //autumn
            case 5: 
                theme[0] = "#A6A57A"
                theme[1] = "#27213C"
                theme[2] = "#5A352A"
                theme[3] = "#A33B20"
                theme[4] = "#A47963"
                break;
            default:
                theme[0] = "#5BD9E7"
                theme[1] = "#FFFFFF"
                theme[2] = "#FFFFFF"
                theme[3] = "#FFFFFF"
                theme[4] = "#FFFFFF"
        }

        return theme
    }

    render() {
        const {match: {params}} = this.props;

        //get the theme
        var themeColors = this.getTheme(1)
        var themeIndex = 0
        function getColor() {
            themeIndex++
            console.log(themeColors[themeIndex%4 + 1])
            return themeColors[themeIndex%4 + 1]
        }

        //background image
        var backgroundStyle = {
            backgroundImage: 'url(' + this.userImage + ')',
            overflow:'hidden',
            backgroundColor: themeColors[0]

        };

        return (
            <div  style={backgroundStyle} id="Background">
                <br/>
                <h3 id="Username"> @{this.username}</h3>
                {this.state.listOfLinks.map(function(name, index){
                    let linkStyle = {
                        backgroundColor: getColor(),
                    }
                    return (
                        <a href={name.url}><div style={linkStyle} className="Link-box" key={index}>{name.title}</div></a>
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