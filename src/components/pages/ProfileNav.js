import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import API from '../services/API';
class ProfileNav extends Component 
{
    constructor(props) {
        super(props);       
    }
    updateSteps=id=>e=>{

    }
    updateStepsClose=id=>e=>{
     
      var JSONdata={
        JM_ID:this.state.JM_ID
      }
      //let data=API.updateStepStatus(JSONdata);
     // e.target.css("display", "none");
      document.getElementById(id).style.display = 'none';
    }
    
    render() {
        return (
            <div>
                    <NavLink to="/me" className="btun"><PersonOutlineIcon/>Profile</NavLink>

                    
                         <div className="tooltips" style={{display:'inline'}}>                                          
                                 <NavLink to={{pathname:"/appear",userDetails:this.props.userDetails}} className="btun"><ColorLensIcon/>Design</NavLink>

                
                                          <div className="tooltip-bottom" id="tool_design" style={{display: 'none'}}>
                                            <h6>Page design</h6>
                                            <p> Change how your page looks here.</p>
                                            <i></i>
                                            <span className="cls" onClick={()=> API.updateStepsClose('tool_design')}>x</span>
                                            <span className="step">Step 5 out of 9</span>
                                            <button className="nxtbtun" onClick={()=> API.updateToolStep(6)}>Next</button>
                                        </div>
                              </div>   
                              

                              <div className="tooltips" style={{display:'inline'}}>                                          
                                        <NavLink to="/statis" className="btun"><TrendingUpIcon/>Stats</NavLink>
                                          <div className="tooltip-bottom" id="tool_stat" style={{display:'none'}}>
                                            <h6>Page stats</h6>
                                            <p> View rich statistics of your page from page views, visitors, to click-through-rate on links</p>
                                            <i></i>
                                            <span className="cls" onClick={()=>API.updateStepsClose('tool_stat')}>x</span>
                                            <span className="step">Step 6 out of 9</span>
                                            <button className="nxtbtun"  onClick={()=>API.updateToolStep(7)}>Next</button>
                                        </div>
                              </div>
                 
            </div>
        );
    }
}



export default ProfileNav;