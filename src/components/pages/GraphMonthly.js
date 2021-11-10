import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
class GraphMonthly extends Component {
    constructor(props) {
        super(props);

    }

   
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        let dataLine={},lebels=[],dataValue=[];
        if(this.props.graphMonthy!==null && this.props.graphMonthy.length > 0 )
        {
          for (let i = 0; i < this.props.graphMonthy.length; i++)
          {
             
             if(this.props.id===3)
             {
              lebels.push(this.props.graphMonthyView[i].Lebels);  
               let totalClick=parseInt(this.props.graphMonthyClick[i].dataValue);
               let totalViews=parseInt(this.props.graphMonthyView[i].dataValue);
               const CTR = (totalClick > 0 && totalViews > 0) ? parseFloat(totalClick / totalViews * 100).toFixed(2) : 0;
               dataValue.push(CTR); 
             }
             else
             {
              lebels.push(this.props.graphMonthy[i].Lebels);    
              dataValue.push(this.props.graphMonthy[i].dataValue);   
             }
          }
        }

      
        dataLine={
            labels: lebels ,
            datasets: [            
              {
                label: this.props.id===7? 
                      this.props.graphTitle +" (in INR) #"+ this.props.which_year
                      : this.props.id===3?
                      this.props.graphTitle +" (in %) #" + this.props.which_year
                      : this.props.graphTitle +" #"+ this.props.which_year,
                fill: true,
                lineTension: 0.3,
                backgroundImage: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
                borderColor: this.props.id===1? '#7004fa'
                : this.props.id===2 ?
                '#fc347f'
                : this.props.id===3 ?
                '#1482cc'
                : this.props.id===4 ?
                '#4eb232'
                : this.props.id===5 ?
                '#e60dc4'
                : this.props.id===6 ?
                '#73300d'
                : this.props.id===7 ?
                '#fca542'
                :
                '#7004fa'
                ,           
                data:dataValue
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

          let max=0,stepSize=0;
          if(this.props.id===3)
          {
            max=200;
            stepSize=20
           
          }
          else if(this.props.id===4)
          {
            max=100;
            stepSize=10
          }
          else if(this.props.id===5)
          {
            max=100;
            stepSize=10
          }
          else if(this.props.id===6)
          {
            max=200;
            stepSize=20
          }
          else
          {
            max=1000;
            stepSize=100
          }
        
          const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max:max,
                    stepSize:stepSize,
                  },
                  gridLines: {
                    drawBorder: false,
                  },
                },
              ],
            },
          };
          
        return (
            <div>
                 {/* <MDBContainer> */}
                       {/* <h3 className="mt-5">{this.props.id===4 ? 
                       <a href={process.env.REACT_APP_API_URL+"notify"} style={{textDecoration:'none'}}>View Report </a>
                       : ''}</h3>     */}
                       <Line data={dataLine} height={100}  legend={legend} options={options} />
             

                {/* </MDBContainer> */}
            </div>
        );
    }
}

GraphMonthly.propTypes = {

};

export default GraphMonthly;