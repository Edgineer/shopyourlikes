import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      username: "",
    }
    }

   render() {
    return(
        <div className="Login-title">
            <div className="App-header">
                <h3>Click Statistics</h3>
            </div>
            <PieChart data={[["Blueberry", 44], ["Strawberry", 23]]} />
        </div>
        );
    }
  }

export default Stats;