import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ClearIcon from '@material-ui/icons/Clear';
import $ from 'jquery'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';

import MenuIcon from '@material-ui/icons/Menu';
import { Modal } from 'react-bootstrap';
import CropFreeIcon from '@material-ui/icons/CropFree';
import PageviewIcon from '@material-ui/icons/Pageview';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import API from '../services/API';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import HeaderUpdation from './Header_Updation';
import ForumIcon from '@material-ui/icons/Forum';
class ProfileHeader extends Component 
{
    constructor(props) {
      super(props)
    
      this.state = {
        allRequest:[],
        newRequest:0,
        Ref_Code:'',
        userDetails:[],
        openModel:false,
        show:false,
        referralCode:[],
        JM_User_Profile_Url: localStorage.getItem('JM_User_Profile_Url'),  
        reminderDetails:[]  ,
        reminderCount:0,
        noOfContest:0
      }
      //console.log(this.props.JM_Profile_Pic)
    }

    componentDidMount()
    {
        let keepLogin=localStorage.getItem('keepLogin');      
        let ToNewTime=localStorage.getItem('ToNewTime');
        if(typeof keepLogin ==='undefined' || keepLogin===null )
        {
          localStorage.clear();
          localStorage.setItem('JM_Email', "");
          localStorage.setItem('JM_ID', 0);
          localStorage.setItem('keepLogin', 0);
          window.location.href = '/signin';
        }
         

         if(keepLogin==="0")
          {
            let currentTime=new Date();
            let dt=new Date(ToNewTime);
            if(currentTime > dt)
              {               
                localStorage.clear();
                localStorage.setItem('JM_Email', "");
                localStorage.setItem('JM_ID', 0);
                localStorage.setItem('keepLogin', 0);
                window.location.href = '/signin';
              }
          }

          //validation for active users
          API.isActive();
          setInterval( () => {
              API.isActive();
          },1800000)
        this.Get_AllRequests();
        $(document).ready(function() 
        {

            //$('#collapsibleNavbar').hide();

            $('#sidebar-btn').on('click', function() {
              $('#sidebar').addClass('visible');
            });
             $('#cls').on('click', function() {
              $('#sidebar').removeClass('visible');
            });

            $('#sidemenu').on('click', function() {              
               $('#sidebar-btn').click();
            });


          });
    }
    async  Get_AllRequests()
        {
            var id = parseInt(localStorage.getItem('JM_ID'));  
            var JSONdata = {
              JM_ID: id
            };   
            const API_url = process.env.REACT_APP_API_URL+ "admin/GetAllRequest";
            const response=await fetch(API_url,{
                  method: 'post',
                  headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId(),'ext':"header"},
                  body: JSON.stringify(JSONdata)
                });
            const data1=await response.json();
            if(data1.status===1)
            {
              const data=await API.decryptJson(data1.flag);
              this.setState({
                allRequest:data.allRequest, 
                referralCode:data.referralCode, 
                userDetails:data.userDetails,
                reminderDetails:data.reminderDetails,  
                reminderCount:data.reminderDetails.length,
                noOfContest:data.contest.noOfContest,
               });
               if(data.newRequest!==null && data.newRequest.length > 0)
                this.setState({
                    newRequest:data.newRequest[0].pendingRequest,    
                });      
         
                if(data.userDetails && data.userDetails.length > 0)
                {
                    this.setState({
                      Ref_Code:data.userDetails[0].JM_User_Profile_Url+"-"+data.userDetails[0].JM_ID,
                      JM_User_Profile_Url:data.userDetails[0].JM_User_Profile_Url

                  });
                  localStorage.setItem('JM_Profile_Pic',data.userDetails[0].JM_Profile_Pic);
                
                }
               
            }
            else
            {
              this.setState({newRequest:0})       
            }
               //console.log(data)
        }
        Update_ReferralCode=(original_code)=>
        {
             var id = parseInt(localStorage.getItem('JM_ID'));  
             
            var JSONdata = {
              JM_ID: id,
              Code:this.state.Ref_Code
            };   
           const API_url = process.env.REACT_APP_API_URL+ "admin/Update_ReferralCode";           
            fetch(API_url,
              {
                  method: 'post',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(JSONdata)
              })
              .then((response) => response.json())
              .then(data => {                    
                     //console.log(data)
              });
          
        }
        updateNotify(val){
            this.setState({newRequest:val})    
        }

    doLogout=()=>{
        var arr=[]   
        let keepLogin=localStorage.getItem('keepLogin');
        localStorage.clear();
        localStorage.setItem('keepLogin', keepLogin);   
        localStorage.setItem('JM_ID', 0);
        localStorage.setItem('JM_Email', '');
        localStorage.setItem('userDetails', arr); 
        localStorage.setItem('directAccess', arr);    
        localStorage.setItem('auth', '');    
        localStorage.setItem('JM_Profile_Pic', '');      
        window.location.href='/';
    }




// jquery code


ModalClose=()=>{
  this.setState({openModel:false,show:false});
}
ModalOpen=()=>{

  if(this.state.referralCode && this.state.referralCode.length===0)
  { 
    this.Update_ReferralCode(this.state.Ref_Code);
  }
  this.setState({openModel:true,show:true});
}
doCopied = (e) => {
    document.getElementById("copy_icon_ref").style.color = 'black';
  }


  updateSteps=id=>e=>{

  }
  updateStepsClose=id=>e=>{  
    document.getElementById(id).style.display = 'none';
  }

  GotoViewNotify=(e)=>
  {   
    //API.updateSeen();
    window.location.href='/view-notification'
  }
        render()
        {     
            let JM_Profile_Pic=localStorage.getItem('JM_Profile_Pic');

            

        return (
            <>
            <div id="sidebar">
                           <span id="cls"><ClearIcon/></span>
                           <br/>
                           <p>
                                 {/* <span className="setCursor" style={{marginLeft:'4%'}} onClick={this.doLogout}><ExitToAppIcon/> {JM_Name}</span> */}
                               <NavLink to="/me" > 
                                 <span>                                    
                                   <img src={JM_Profile_Pic==='null' || JM_Profile_Pic===null ? process.env.REACT_APP_UPLOAD_URL+'profile_demo.png': process.env.REACT_APP_UPLOAD_URL + JM_Profile_Pic} alt="Avatar" className="avatar"/>  
                                   {/* <img src={JM_Profile_Pic==='null' ? process.env.REACT_APP_UPLOAD_URL+'profile_demo.png': process.env.REACT_APP_UPLOAD_URL + JM_Profile_Pic} />  */}
                                 </span>
                               
                            </NavLink>
                            </p>
                            <br/>
                      <ul style={{overflow: "scroll", height: "500px"}}>           

                           <li>  
                                <a href={"/"+this.state.JM_User_Profile_Url} target="_blank" rel="noreferrer">
                                  <PageviewIcon/>  View My Page                             
                                </a>
                            {/* <a className="set-btn" style={{padding:'9px 24px',marginTop:'5px'}} href={root_url + JM_User_Profile_Url}>
                               View My Page
                            </a> */}
                          </li>   
                          <li>  
       
                                <NavLink 
                                    to="/me">
                                  <DashboardIcon/> Dashboard
                                </NavLink>
                          </li>     
                          <li>
                           {/* <NavLink  to={{pathname: '/notify',state: {allRequest : this.state.allRequest}}} className="btun">                          
                           <NotificationsIcon/> Requests</NavLink> */}

                              <a  className="btun" href="/notify?type=Purchased"><NotificationsIcon/> Requests</a>   
                                 {/* walk-through-bio */}

                                <div className="tooltips" style={{display:'block',textAlign: 'left',top: '-7px',left: '-17px'}}>  
                                                                    <div className="tooltip-left" id="tool_notify_top" style={{textAlign: 'left',display:'none'}} >
                                                                    <h6>Transactions and requests</h6>
                                                                    <p> View your latest sales, premium requests, gifts and donations here.</p>
                                                                    <i></i>
                                                                    <span className="cls" onClick={()=> API.updateStepsClose('tool_notify_top')}>x</span>
                                                                    <span className="step">Step 8 out of 9</span>
                                                                    <button className="nxtbtun"  onClick={()=> API.updateToolStep(9)}>Next</button>
                                                                </div>
                                                        </div>
                          </li>    

                          <li style={{display:'block'}}>
                               <NavLink  to={{pathname: '/payout'}} className="btun"> 
   
                              <AccountBalanceWalletIcon/> Wallet </NavLink>
                          </li>
                          <li style={{display:'block'}}>
                               <NavLink  to={{pathname: '/view-calendar'}} className="btun"> 
                         
                              <EventAvailableIcon/> Calendar </NavLink>
                          </li>
                          <li style={{display:'block'}}>
                               <NavLink  to={{pathname: '/newsletter'}} className="btun">   
                              <MailOutlineOutlinedIcon/> Newsletter </NavLink>
                          </li>
                          {
                             this.state.noOfContest > 0 ?
                             <li>  
                                <NavLink 
                                    to={{ pathname: "/contest",state: {noOfContest:this.state.noOfContest} }} >
                              
                                 <ForumIcon/> Contest
                               </NavLink>
                           </li>
                           :
                           null
                           }

                          
                          <li>
                           <NavLink to="#" onClick={this.ModalOpen}><CropFreeIcon/> Invite a Creator</NavLink>                          
                          </li>
                          <li>  
                              <a 
                                    href="https://www.youtube.com/playlist?list=PLIsPVSTJtbnsatcCe_qd3Wp9YtVuvT8sH "  target="_blank" rel="noreferrer">
                                  <LiveHelpIcon/> Video Guides
                              </a>
                          </li>
                       
                          <li>  
                                <NavLink 
                                    to={{ pathname: "/settings", userDetails: this.state.userDetails }} >
                                 <SettingsIcon/> Settings
                            </NavLink>
                          </li>
                          
                     
                         
                            
                          <li>  
                                <NavLink onClick={this.doLogout}
                                    to={"#"} >
                                    <ExitToAppIcon/> Logout
                                 </NavLink>
                          </li>
                     
                      </ul>
            </div>
            <div className="main-header navbar-expand-sm">
                    <HeaderUpdation/>
                    <div className="container">
                      
                        <div className="row">
                                <div className="col-md-4">
                                    <button className="navbar-toggler toggle-bar" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" id="sidemenu">
                                        <MenuIcon/>
                                    </button>       
                                    <div className="logo">
                                        <NavLink to="/"><img src="/Logo.png" alt="logo"></img></NavLink>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    {/* <div className="header-button collapse navbar-collapse" id="collapsibleNavbar"> */}
                                    <div className="header-button mobileTopbar">
                                        <NavLink to="#" className="btun mobile-icon" id="sidebar-btn"><MenuIcon/></NavLink>                                       
                                        {/* <NavLink  to={{pathname: '/notify',state: {allRequest : this.state.allRequest}}} ><NotificationsOutlinedIcon/>{this.state.newRequest > 0 ? <span className=""> {this.state.newRequest}</span> : null}</NavLink>    */}
                                       {
                                         this.state.reminderCount > 0 && this.state.newRequest > 0 ?
                                         <button  className="btun Mobile-notification" onClick={this.GotoViewNotify} ><NotificationsOutlinedIcon /><span className="" id="bell"> { (this.state.newRequest + this.state.reminderCount)  }</span></button>   
                                          :
                                          this.state.reminderCount > 0 && this.state.newRequest===0 ?
                                          <button  className="btun Mobile-notification" onClick={this.GotoViewNotify} ><NotificationsOutlinedIcon /> <span className="" id="bell"> { this.state.reminderCount  }</span></button>   
                                         :
                                          this.state.reminderCount === 0 && this.state.newRequest > 0 ?
                                          <button  className="btun Mobile-notification" onClick={this.GotoViewNotify} ><NotificationsOutlinedIcon /><span className="" id="bell"> { this.state.newRequest  }</span> </button>   
                                          :
                                          <button  className="btun Mobile-notification" onClick={this.GotoViewNotify} ><NotificationsOutlinedIcon /></button>   
                                        }
                                       
                                   {/* walk-through-bio */}    
                                                            
                                        <div className="tooltips" style={{display:'inline-block',textAlign: 'left',top: '22px',right: '35px'}}>  
                                                    <div className="tooltip-bottom" id="tool_notify" style={{textAlign: 'left',display:'none'}} >
                                                      <h6>Transactions and requests</h6>
                                                      <p> View your latest sales, premium requests, gifts and donations here.</p>
                                                      <i></i>
                                                      <span className="cls" onClick={()=> API.updateStepsClose('tool_notify')}>x</span>
                                                      <span className="step">Step 8 out of 9</span>
                                                      <button className="nxtbtun"  onClick={()=> API.updateToolStep(9)}>Next</button>
                                                  </div>
                                        </div>
                                       
                                        <NavLink to="#" className="btun d-md-none d-lg-none mobile-icon" onClick={this.doLogout}><ExitToAppIcon/></NavLink>
                                            <div className="profile mobile-icon">                                       
                                                <div className="icon">
                                                    <NavLink to="/me" > <img src={JM_Profile_Pic==='null' ? process.env.REACT_APP_UPLOAD_URL+'profile_demo.png': process.env.REACT_APP_UPLOAD_URL + JM_Profile_Pic} alt=""/>     </NavLink>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>

                 

                  <Modal show={this.state.show}
                    onHide={this.ModalClose}
                    backdrop="static"
                    keyboard={false}
                    centered

                    >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <p className="addnew-title">Referral Code</p>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <div className="addnew-box">    
                      <div class="row">
                    
                          <div class="col-md-10">
                              <input type="text" disabled className="form-control" 
                              name="Ref_Code" value={this.state.Ref_Code}/>
                          </div>
                          <div class="col-md-2">
                            <CopyToClipboard text={this.state.Ref_Code}>
                                <button  className="copybtn" > 
                                  <FileCopyIcon onClick={this.doCopied} id="copy_icon_ref"/>
                                </button>     
                            </CopyToClipboard>
                          </div>
                        
                      </div>
                          

                         
                                                
                    
                        </div>

                    </Modal.Body>

                    </Modal>
                
            </>
        )
    }

}


export default ProfileHeader


