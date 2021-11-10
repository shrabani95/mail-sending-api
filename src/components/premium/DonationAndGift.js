import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import RedeemIcon from '@material-ui/icons/Redeem';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


class DonationAndGift extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        
     }
     //console.log(this.props)
   }
   
  GotoGift=()=>{
      //console.log(this.props)
    this.props.history.push("/gifts");
    
    let JM_ID=0;let JM_User_Profile_Url="";
    if(this.state.userDetails!=null && this.state.userDetails.length > 0)
    {
      JM_ID=this.state.userDetails[0].JM_ID;
      JM_User_Profile_Url=this.state.userDetails[0].JM_User_Profile_Url;
    }
  
  this.props.history.push({
    state: { 
      directAccess: this.state.directAccess,
      JM_ID: JM_ID,
      JM_User_Profile_Url:JM_User_Profile_Url,
    }
  })
  
  //console.log(this.props);
}
    render() {
        return (
           
         <div className="col-md-3">
            <div className="item">
              <div className="icon">
                <RedeemIcon  style={{fontSize: '50px'}}/>
                </div>
                    <div className="text">
                        <h4>Donations And Gifts</h4>                           
                        <Link class="btun" to={{pathname:"/gifts",state:this.props}}>
                        <AddCircleOutlineIcon/> Add Gifts</Link>                
                    </div>
                </div>
            </div>
        );
    }
}

DonationAndGift.propTypes = {

};

export default DonationAndGift;
