import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
import './Stats.css';
import ClicksPerDay from './ClicksPerDay.js';



class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ClicksPerDayData:{},
      username: ""
    }
    }


    componentWillMount(){
        this.getClicksPerDayData();
    }


    //fill this state with data received from ShopYourLikes DB
    //about clicks and link usage
    getClicksPerDayData(){
        this.setState({
            ClicksPerDayData:{
                       labels: ['PetSmart', 'Petco', 'Lowes', 'Vlogs', 'Camping Trip'],
                       datasets:[
                           {label:'Clicks',
                            data:[1200, 900, 2900, 1000, 3200],
                            backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
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

   render() {
    return(
        <div className="Login-title">
            <div className="App-header">
                <h3>Click Statistics</h3>
            </div>
            <div className="ClicksPerDay-box">
            <ClicksPerDay ClicksPerDayData={this.state.ClicksPerDayData} />
            </div>
        </div>
        );
    }
  }

export default Stats;