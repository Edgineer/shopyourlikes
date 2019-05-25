import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';


//bar chart and sample data must be used for
//clicks per link instead
//this is just for test
class ClicksPerLink extends Component {
    constructor(props){
        super(props);
        this.state = {
            ClicksPerLinkData:props.ClicksPerLinkData
        }
    }


    //pass in these default properties when you call this class in Stats.js
    //in format <ClicksPerLink legendPosition="right"/>
    //use this for personalization in the future
    static defaultProps = {
        displayTitle:true,
        displayLegend:true,
        legendPosition:'bottom',
        fontSize:20
    }


    render() {
    return(
        <div className = "ClicksPerLink">
            <Pie
                data = {this.state.ClicksPerLinkData}
                options = {{
                    title:{
                        display:true,
                        text:'Today\'s clicks:',
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


export default ClicksPerLink;