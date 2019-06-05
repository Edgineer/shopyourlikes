import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
import './Stats.css';
import ClicksPerDay from './ClicksPerDay.js';
import ClicksPerLink from './ClicksPerLink.js';
import ClicksPerRegion from './ClicksPerRegion.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios/index";
import './../App.css';
import logoColor from ".././img/logoColor.svg"

const MESSAGE_URL = "/links";

class Stats extends Component {
  constructor(props) {
    super(props);
    //get the passed in username and set it to a variable
    const {match: {params }} = this.props;
    this.username = params.user;
    this.state = {
      username: "",
      listOfLinks: [],
      linkTitles: [],
      loading: true,
      ClicksPerDayData:{},
      ClicksPerLinkData:{},
      ClicksPerRegionData:{}
    }
  }


  componentDidMount(){
      fetch("/links/" + this.username)
        .then(res => res.json())
        .then(
            (result) => {
                var arr = [];
                var titlesArr = [];
                var clicksArr = [];
                for(var i = 0; i < result.length; i++)
                    arr.push(result[i]);
                titlesArr = arr.map(link => link.title);
                clicksArr = arr.map(link => link.clicks);
                console.log(arr)
                console.log(titlesArr)
                console.log(clicksArr)
                this.setState({
                listOfLinks: arr,
                linkTitles: titlesArr,
                ClicksPerLinkData: {
                   labels: titlesArr,
                   datasets:[{
                        data: clicksArr,
                        backgroundColor:[
                             'rgba(149, 125, 173, 1)',
                             'rgba(255, 221, 221, 1)',
                             'rgba(255, 255, 207, 1)',
                             'rgba(217, 255, 223, 1)',
                             'rgba(217, 255, 255, 1)',
                             'rgba(255, 206, 86, 1)',
                             'rgba(224, 254, 254, 1)',
                             'rgba(199, 206, 234, 1)',
                             'rgba(255, 218, 193, 1)',
                             'rgba(255, 154, 162, 1)',
                             'rgba(255, 255, 216, 1)',
                             'rgba(181 , 234, 215, 1)',
                             'rgba(193, 231, 227, 1)',
                             'rgba(220, 255, 251, 1)']
                       }]
                },
                loading: false
                });
            },
            (error) => {
                console.log("error in DidMount")
                this.setState({
                error
                });
            }
        )
      this.getData();
  }


    getData(){
        this.getClicksPerDayData();
        this.getClicksPerRegionData();
    }



    //fill this state with data received from DB about clicks and link usage
    getClicksPerDayData(){
        this.setState({
            ClicksPerDayData:{
                labels:['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
                datasets:[
                    {data:[120000, 150000, 170000, 163000, 180000, 200000, 190000, 210000, 220000, 200000, 255000, 280000],
                    backgroundColor:[
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(115, 183, 252, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153 , 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(115, 183, 252, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153 , 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 99, 132, 0.6)']
                    }
                ]
            }
        });
    }



    getClicksPerRegionData(){
        this.setState({
            ClicksPerRegionData:{
                       labels: ['Oregon', 'Florida', 'California', 'Arizona', 'New York', 'Other Countries'],
                       datasets:[
                           {data: [280, 123, 3500, 457, 1395, 876],
                           backgroundColor: ['rgba(149, 125, 173, 1)']
                       }]
                   }
        });
    }


   render() {
    console.log(this.state.loading)
    let data;
    if (this.state.loading) {
        data = <img data-src={ require('./../logo.svg') } />
    }
    else {
        data =
            <div className="Login-title">
                <div className="App-header">
                    <h3>Click Statistics for {this.username} </h3>
                </div>
                <div className="ClicksPerDay-box">
                <ClicksPerLink ClicksPerLinkData={this.state.ClicksPerLinkData} />
                </div>
                <br></br>
                <div className="ClicksPerDay-box">
                <ClicksPerDay ClicksPerDayData={this.state.ClicksPerDayData} />
                </div>
                <br></br>
                <div className="ClicksPerDay-box">
                <ClicksPerRegion ClicksPerRegionData={this.state.ClicksPerRegionData}/>
                </div>
            </div>
    }
    return(
        <div>
            {data}
        </div>
    );
    }

  }

export default Stats;