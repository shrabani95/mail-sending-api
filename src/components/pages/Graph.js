import React, { Component } from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts';
class Graph extends Component {    
 
  render () {
 
      var dataPoints=[];
      dataPoints= [
        { x: new Date(2017, 0), y: 25060 },
        { x: new Date(2017, 1), y: 27980 },
        { x: new Date(2017, 2), y: 42800 },
        { x: new Date(2017, 3), y: 32400 },
        { x: new Date(2017, 4), y: 35260 },
        { x: new Date(2017, 5), y: 33900 },
        { x: new Date(2017, 6), y: 40000 },
        { x: new Date(2017, 7), y: 52500 },
        { x: new Date(2017, 8), y: 32300 },
        { x: new Date(2017, 9), y: 42000 },
        { x: new Date(2017, 10), y: 37160 },
        { x: new Date(2017, 11), y: 38400 }
    ]
      const options = {
        theme: "light2",
        title: {
            text: "ANALYTICS"
        },
        axisY: {
            title: "Price in $",
            prefix: "$"
        },
        data: [{
            type: "line",
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "$#,##0.00",
            dataPoints: dataPoints
        }]
    }
    return (
        <>
     
      <CanvasJSChart options={options}/>
      </>
    )
  }
}

export default Graph;
