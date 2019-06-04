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
                for(var i = 0; i < result.length; i++)
                    arr.push(result[i]);
                titlesArr = arr.map(link => link.title);
                console.log(arr)
                console.log(titlesArr)
                this.setState({
                listOfLinks: arr,
                linkTitles: titlesArr,
                ClicksPerLinkData: {
                   labels: titlesArr,
                   datasets:[{
                        data:[793, 1847,200],
                        backgroundColor:[
                             'rgba(54, 162, 235, 0.6)',
                             'rgba(255, 206, 86, 0.6)',
                             'rgba(115, 183, 252, 0.6)',
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
                       labels: ['California', 'New York', 'Arizona', 'Oregon', 'Florida', 'Texas', 'Washington', 'Hawaii', 'Alabama', 'Georgia', 'New Jersey', 'Virginia',
                       'Colorado', 'Illinois', 'Ohio','Other Countries'],
                       datasets:[
                           {label:'Vlogs',
                            data:[1881, 542, 1341, 3349, 1499, 1619, 776, 2560, 1789, 1965, 343, 2501, 562, 1781, 2042, 745],
                            backgroundColor:['rgba(255, 99, 132, 0.3)']
                           },
                           {label:'Etsy Shop',
                            data:[2628, 772, 1159, 441, 1015, 2555, 1150, 1029, 2975, 2725, 2704, 2411, 1308, 1074, 2958, 2761],
                            backgroundColor:['rgba(54, 162, 235, 0.3)']
                           },
                           {label:'Favorites at HomeDepot',
                            data:[1523, 3182, 329, 1027, 1998, 3162, 1973, 3417, 3480, 3161, 2016, 1257, 2652, 2025, 210, 1410],
                            backgroundColor:['rgba(255, 206, 86, 0.6)']
                           },
                           {label:'Workout Videos',
                            data:[240, 275, 3305, 1483, 882, 2214, 533, 1868, 2449, 3227, 1496, 447, 1061, 953, 1977, 1943],
                            backgroundColor:['rgba(75, 192, 192, 0.6)']
                           },
                           {label:'My Cooking Channel',
                            data:[3019, 467, 2828, 1193, 967, 216, 291, 725, 2651, 2680, 1599, 3223, 3456, 1472, 1658, 2628],
                            backgroundColor:['rgba(153 , 102, 255, 0.6)']
                           }
                       ]
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
                    <h3>First Title: {this.state.linkTitles[0]} </h3>
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