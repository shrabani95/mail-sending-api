import React,{Component} from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import AccessPopUp from './AccessPopup';
import FooterClass from '../header_footer/FooterClass';
import ProfileHeader from '../header_footer/ProfileHeader';

class DirectAccess extends Component {
  constructor(props) {
    super(props)
    if(!this.props.location.state)
    {
      window.location.href = '/';
    }
    this.state = {
       directAccess:this.props.location.state.directAccess,
       JM_ID:this.props.location.state.JM_ID,
       JM_User_Profile_Url:this.props.location.state.JM_User_Profile_Url,
    }
  }
  componentDidMount() {
    this.validateSession();    
  }
  validateSession()
  {
    if(!this.state.directAccess)
    {
      window.location.href = '/';
    }
  }

  render()
  {
        let card;
        card=this.state.directAccess.map((link,i) =>{
          return (
                  <div className="col-md-3">
                    <div className="item">
                      <div className="icon">
                        <PlayCircleOutlineIcon style={{fontSize: '50px'}}/>
                      </div>
                      <div className="text">
                        <h4>{link.DA_Title}</h4>
                        <p>{link.DA_Description}</p>
                        <AccessPopUp data={this.state.directAccess[i]} JM_ID={this.state.JM_ID} JM_User_Profile_Url={this.state.JM_User_Profile_Url}/>
                      </div>
                    </div>
                </div>
              ) 
        })

  return (
    <>
    <ProfileHeader/>
      <div>   
        	<div className="direct-access">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="heading">
                    <h3>Sell direct access to your followers</h3>
                    <p>Pick from our reccomended items or create your own, connect with people on a deeper level and earn money.</p>
                  </div>
                </div>
                  {card}
                </div>
            </div>
          </div>
        </div>
    <FooterClass/>
    </>
  )
}
}
export default DirectAccess



