import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import moment from 'moment'
class LineChart extends React.Component {
 constructor(props) {
   super(props)
 
   this.state = {
   dataLine:[]
   }
 }
 
 
 



  render() {
    let dataLine={},lebels=[],viewData=[],clickData=[],lebelsView=[],tranData=[];
    const Chart=this.props.Chart;
    const tranDetails=this.props.tranDetails;
    const graphViewDetails=this.props.graphViewDetails;
    if(Chart!==null && Chart.length > 0)
    {
      for (let i = 0; i < Chart.length; i++)
      {
        if(parseInt(this.props.graphType)===7)
        {
          var newFormat=moment(Chart[i].Create_Date).format('D MMM  YY');
          lebels.push(Chart[i].Lebels+" "+ newFormat );  
        }
        else if(parseInt(this.props.graphType)===1)
        {
          lebels.push(Chart[i].Lebels+" "+ Chart[i].AM_PM );  
        }
        else
        {
          lebels.push(Chart[i].Lebels); 
        }
        clickData.push(Chart[i].TotClicks); 
      }
    }
    if(graphViewDetails!==null && graphViewDetails.length > 0 )
    {
      for (let i = 0; i < graphViewDetails.length; i++)
      {
         //lebels.push(graphViewDetails[i].Lebels);    
         viewData.push(graphViewDetails[i].TotalViews);    
       
      }
    }
  //tranDetails
    if(tranDetails!==null && tranDetails.length > 0 )
    {
      for (let i = 0; i < tranDetails.length; i++)
      {
        // lebels.push(tranDetails[i].Lebels);    
         tranData.push(tranDetails[i].TotTran);    
       
      }
    }
    ////console.log(Chart)
    //console.log(lebels)
    //console.log(this.props.graphType)

    let max=1000,stepSize=200;
    if(parseInt(this.props.graphType)===365)
    { max=1000;stepSize=200 }
    if(parseInt(this.props.graphType)===30)
     { max=500;stepSize=50 }
    if(parseInt(this.props.graphType)===7)
     { max=100;stepSize=20 }
    if(parseInt(this.props.graphType)===1)
     { max=100;stepSize=20 }
    dataLine={
      labels: lebels,
      datasets: [
        {
          label: "Views",
          fill: true,
          lineTension: 0.3,
          backgroundImage: "linear-gradient(to left bottom, #fe9e76, #ff856e, #ff696e, #ff4975, #fa1981);",
          borderColor: "#ff696e",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundImage: "linear-gradient(to left bottom, #fe9e76, #ff856e, #ff696e, #ff4975, #fa1981);",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data:viewData
        },
        {
          label: "Clicks",
          fill: true,
          lineTension: 0.3,
          backgroundImage: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
          borderColor: "#7004fa",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: clickData
        },

        {
          label: "Transactions",
          fill: true,
          lineTension: 0.3,
          backgroundImage: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
          borderColor: "#44ab31",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: tranData
        }
      ]
    }

    const legend = {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#323130",
        fontSize: 20
      }
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
        text: '',//this.props.statType,
       fullSize:true
      },
      scales: {
        yAxes: [
          
          {
            gridThickness: 2,
            ticks: {
              max:max,
               min: 0,
              stepSize: stepSize
            }
          }
        ]
      }
    };
    
    return (
      <MDBContainer>
        <h3 className="mt-5"></h3>
        <Line data={dataLine} height={'100%'} legend={legend} options={options} style={{height:'400px'}} />
      </MDBContainer>
    );
  }
}

export default LineChart;