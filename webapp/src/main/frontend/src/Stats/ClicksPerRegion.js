import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';


//bar chart and sample data must be used for
//clicks per Region instead
//this is just for test
class ClicksPerRegion extends Component {
    constructor(props){
        super(props);
        this.state = {
            ClicksPerRegionData:props.ClicksPerRegionData
        }
    }


    //pass in these default properties when you call this class in Stats.js
    //in format <ClicksPerRegion legendPosition="right"/>
    //use this for personalization in the future
    static defaultProps = {
        displayTitle:true,
        displayLegend:false,
        legendPosition:'bottom',
        fontSize:20
    }


    render() {
    return(
        <div className = "ClicksPerRegion">
            <Line
                data = {this.state.ClicksPerRegionData}
                options = {{
                    fill:true,
                    title:{
                        display:true,
                        text:'Clicks in each region:',
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


export default ClicksPerRegion;