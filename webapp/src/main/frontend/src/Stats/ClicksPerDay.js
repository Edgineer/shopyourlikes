import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';


//bar chart and sample data must be used for
//clicks per Day instead
//this is just for test
class ClicksPerDay extends Component {
    constructor(props){
        super(props);
        this.state = {
            ClicksPerDayData:props.ClicksPerDayData
        }
    }


    //pass in these default properties when you call this class in Stats.js
    //in format <ClicksPerDay legendPosition="right"/>
    //use this for personalization in the future
    static defaultProps = {
        displayTitle:true,
        displayLegend:false,
        legendPosition:'bottom',
        fontSize:20
    }


    render() {
    return(
        <div className = "ClicksPerDay">
            <Bar
                data = {this.state.ClicksPerDayData}
                options = {{
                    title:{
                        display:true,
                        text:'Total clicks per month during the past year:', //per Day
                        fontSize:this.props.fontSize
                    },
                    legend:{
                        display:this.props.displayLegend,
                        position:this.props.legendPosition
                    }
                    }}
             />
        </div>
    );
    }
}


export default ClicksPerDay;