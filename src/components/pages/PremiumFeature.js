import React, { Component} from 'react';
import VideocamIcon from '@material-ui/icons/Videocam';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FooterClass from '../header_footer/FooterClass';
import ProfileHeader from '../header_footer/ProfileHeader';
import VideoAudioMessage from '../premium/VideoAudioMessage';
import ToastAlert from './ToastAlert';
import UnlockContent from '../premium/UnlockContent';
import DonationAndGift from '../premium/DonationAndGift';
import $ from 'jquery'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DigitalEcommerce from '../premium/DigitalEcommerce';
import ContestGiveAway from '../premium/ContestGiveAway';
// import ReactPlayer from 'react-player'
class PremiumFeature extends Component
{
  constructor(props) {
    super(props)
    if(!this.props.location.state)
    {
      window.location.href = '/me';
    }
    this.state = {
       directAccess:this.props.location.state.directAccess,
       JM_ID:this.props.location.state.JM_ID,
       JM_User_Profile_Url:this.props.location.state.JM_User_Profile_Url,
       showAlert:false,   
       title:'',
       msg:'',
       base_url: process.env.REACT_APP_API_URL,
       root_url: process.env.REACT_APP_ROOT_URL,
    }
  }
  componentDidMount() {
    this.validateSession();  
      $(document).ready(function() {               
        $('#hiddenText').focus();
    });  
    window.scrollTo(500, 0);
  }
  validateSession()
  {
    if(!this.state.directAccess)
    {
      window.location.href = '/';
    }
  }
  hideToast=()=>{
    this.setState({showAlert:false})
  }
  showToast =(title,msg) =>{
    this.setState({showAlert:true})
    this.setState({      
      show:true,   
      title:title,
      msg:msg,
    // isLoading:true   
    });  
  }

OpenLiveVideo=()=>
{
  this.props.history.push("/live-video-session");
  this.props.history.push({
    state: {
      directAccess: this.state.directAccess,
      JM_ID: this.state.JM_ID,
      JM_User_Profile_Url: this.state.JM_User_Profile_Url,
    }
  })
}

  render(){
    
  return (
    <>
      <ProfileHeader/>
      <div>   
        	<div className="direct-access">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="heading">
                    {/* <h3>Add Premium Features to your Profile</h3> */}
                    <h3>Choose any of the premium or personalized features below to offer more to your followers and earn money.</h3>
                    <a href="/me" className="btnCropSave" style={{marginTop:'10px'}}> 
             
                    <ArrowBackIcon/>
                     Back to profile
                    </a>
                    <input type="hidden" id="hiddenText"/>
                  </div>
                </div>
                {/* cards ->  Personalized video or audio message*/}
                   <VideoAudioMessage  JM_ID={this.state.JM_ID} JM_User_Profile_Url={this.state.JM_User_Profile_Url} showToast={this.showToast}/>
                {/* ends */}
                {/* cards ->  unloack content/ paywall*/}
                <UnlockContent  JM_ID={this.state.JM_ID} JM_User_Profile_Url={this.state.JM_User_Profile_Url} showToast={this.showToast}/>
                {/* ends */}
                {/* cards -> donation and gift*/}
                <DonationAndGift  state={this.state} data-id={this.state.JM_ID}  JM_ID={this.state.JM_ID} JM_User_Profile_Url={this.state.JM_User_Profile_Url}/>
                {/* ends */}
                <DigitalEcommerce JM_ID={this.state.JM_ID} JM_User_Profile_Url={this.state.JM_User_Profile_Url} showToast={this.showToast}/>
               

                <ContestGiveAway  JM_ID={this.state.JM_ID} JM_User_Profile_Url={this.state.JM_User_Profile_Url} showToast={this.showToast}/>
             
                {/* <LiveVideoSession JM_ID={this.state.JM_ID} JM_User_Profile_Url={this.state.JM_User_Profile_Url} showToast={this.showToast}/> */}

                <div className="col-md-3" style={{display:'block'}}>
                        <div className="item">
                          <div className="icon">
                            <VideocamIcon style={{fontSize: '50px'}}/>
                          </div>
                          <div className="text">
                            <h4>Live Video Session</h4>                           
                            <button class="btun"  onClick={this.OpenLiveVideo}><AddCircleOutlineIcon/> Add This</button>                           
                          </div>
                        </div>
                    </div>
                </div>
                
            </div>
          </div>
        </div>
    <FooterClass/>
    <ToastAlert title={this.state.title} hideToast={this.hideToast} 
      msg={this.state.msg} show={this.state.showAlert} 
      image={this.state.logo} showToast={this.showToast}/>
      
    </>
  );
}

}

export default PremiumFeature;