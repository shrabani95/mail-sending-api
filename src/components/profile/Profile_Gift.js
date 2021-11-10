import React, { Component } from 'react'
import {Link,Route,BrowserRouter as Router,Switch} from 'react-router-dom'
import {Nav,Navbar,Button} from 'react-bootstrap';
import JoinModal from '../JoinModal';
import SignInModal from '../SignInModal';
import DoneIcon from '@material-ui/icons/Done';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import 'font-awesome/css/font-awesome.min.css';
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Modal from 'react-bootstrap/Modal'
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import Buy from '../premium/Buy';
import SendGift from '../premium/SendGift';
import ContactUs from '../pages/ContactUs';
import Tipping from '../premium/Tipping';
import SendSupport from '../premium/SendSupport';
import {Helmet} from 'react-helmet';
import API from '../services/API'
class Profile_Gift extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
         data:{"name":"sam"},
         logo:"Logo.png",
         bgColor:'#333',
         bgImage:"url('../images/profile_back_4.jpg')"

      }
//      console.log(this.props.state.userDetails)
    }
    openSupportModal=(e)=>{
      this.setState({
        showSupport:true
      })
    }
    closeSupportModal=(e)=>{
      this.setState({
        showSupport:false,
        DonarName:'',
        DonarMsg:'',
        DonarAmt:0
      })
    }

    doClick = (type, id) => e => {
      //console.log(type + id)
      var JSONdata = {
        Stat_Type: type,
        Stat_ID: id,
        JM_ID: this.state.userDetails[0].JM_ID
  
      };
      const API_url = this.state.base_url + "admin/updateClick";
      fetch(API_url,
        {
          method: 'post',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(JSONdata)
        })
        .then((response) => response.json())
        .then(data => {
          //console.log(data);
        });
    }
  render() {

    let imagePath="";
    let base_url=this.state.base_url;
    let linkPath="";
    let JM_User_Profile_Url_plus_JM_ID ="";
    let JM_Name,JM_Email,JM_Description='';
    let JM_User_Profile_Url="";
    let  JM_Social_Widget_Position="",JM_Verified=0;
    let JM_Gift_Title='',JM_Gift_Active=0,JM_Payout_Details=0;
    if(this.props.state.userDetails !=null && this.props.state.userDetails.length > 0)
    {
      let len=this.props.state.userDetails.length;
      for(var i=0;i < len ;i++)
      {
        
        imagePath=process.env.REACT_APP_UPLOAD_URL+this.props.state.userDetails[i].JM_Profile_Pic;
        linkPath=process.env.REACT_APP_UPLOAD_URL+"Profile/"+this.props.state.userDetails[i].JM_User_Profile_Url+"_"+this.props.state.userDetails[i].JM_ID+"/";
        JM_User_Profile_Url_plus_JM_ID = this.props.state.userDetails[i].JM_User_Profile_Url+"_"+this.props.state.userDetails[i].JM_ID;
        JM_User_Profile_Url=this.props.state.userDetails[i].JM_User_Profile_Url;
        JM_Name=this.props.state.userDetails[i].JM_Name;
        JM_Email=this.props.state.userDetails[i].JM_Email;
        JM_Description=this.props.state.userDetails[i].JM_Description;
        JM_Social_Widget_Position=this.props.state.userDetails[i].JM_Social_Widget_Position;
        JM_Verified=this.props.state.userDetails[i].JM_Verified;
        JM_Gift_Title=this.props.state.userDetails[i].JM_Gift_Title;
        JM_Gift_Active=parseInt(this.props.state.userDetails[i].JM_Gift_Active);
          JM_Payout_Details=parseInt(this.props.state.userDetails[i].JM_Payout_Details);
        break;
      }
    }
    var bgImage="",bgImageVideo="",fontColor="",back_color="";
    var font_family="",cssClass="",highlightColor="",item_color="",  item_style="",TM_Bio_Color='',TM_Name_Color='',TM_Footer_Color='';
    var item_border_color='';
    
    var TM_Thumbnail_Icon_Color='',TM_SocialWidget_Icon_Color='';
    if(this.props.state.themeMasterUser !=null && this.props.state.themeMasterUser.length > 0)
    {
      let len=this.props.state.themeMasterUser.length;
      for(var j=0;j < len ;j++)
      {
        bgImage = this.props.state.themeMasterUser[j].TM_Back_Image==='' ? '': 'url(' + process.env.REACT_APP_UPLOAD_URL + this.props.state.themeMasterUser[j].TM_Back_Image + ')';
        bgImageVideo = process.env.REACT_APP_UPLOAD_URL + this.props.state.themeMasterUser[j].TM_Back_Image;
        fontColor=this.props.state.themeMasterUser[j].TM_Font_Color;
        back_color= this.props.state.themeMasterUser[j].TM_Back_Color;
        font_family =this.props.state.themeMasterUser[j].TM_Font;
        highlightColor =this.props.state.themeMasterUser[j].TM_Highlight_Color;
        cssClass=this.props.state.themeMasterUser[j].TM_Class_Name+" "+font_family;
        item_color= this.props.state.themeMasterUser[j].TM_Item_Color;
        item_style=this.props.state.themeMasterUser[j].TM_Item_Style;
         TM_Name_Color=this.props.state.themeMasterUser[j].TM_Name_Color;
         TM_Bio_Color=this.props.state.themeMasterUser[j].TM_Bio_Color;
         TM_Footer_Color=this.props.state.themeMasterUser[j].TM_Footer_Color;
         item_border_color=this.props.state.themeMasterUser[j].TM_Border_Color;
         TM_SocialWidget_Icon_Color=this.props.state.themeMasterUser[j].TM_SocialWidget_Icon_Color;
         TM_Thumbnail_Icon_Color=this.props.state.themeMasterUser[j].TM_Thumbnail_Icon_Color;
        break;
      }
    }

   // TM_Footer_Color='white';
   var h=window.screen.height;
   var w=window.screen.width;
   if(w <= 480) 
   {
     TM_Footer_Color='white'
   }
   else
   {
     TM_Footer_Color=''
   }

    let isMobileView='';
    if(w >= 480) //web
    {
    
      isMobileView='';
    }
    else // mobile
    {      
      if(back_color!=='')
      {
         isMobileView='';        
     }
     else
     {
       if(bgImageVideo.includes('theme/profile_back_'))
           isMobileView='last-footer';//last-footer
       else
       {
         isMobileView='';        
       }
     }
   
    }

    const mystyle = {
      color: fontColor,     
     // fontFamily: font_family,  
      backgroundColor:item_color  
    };
    const nameStyle = {
      color: TM_Name_Color,     
     // fontFamily: font_family
     
    };
    const mystyleSocialWidget = {
      color: TM_SocialWidget_Icon_Color, 
    };
    const mystyleGift = {
      color: fontColor,     
    };
      const mystyleForHightight = {
      color: fontColor,       
      backgroundColor:item_color,
    };

    let SocialWidget;
    
    if(this.props.state.socialWidget !=null && this.props.state.socialWidget.length > 0)
    {
        SocialWidget=this.props.state.socialWidget.map((link,i) =>{
            return (
                       link.SWM_Active === 1 &&  link.SWM_Url!=='' &&  link.SWM_Style_Type==='W'?   
                      <li >
                        {
                           
                           link.SWM_Title==='Email' ?
                           <a href={"mailto:"+ link.SWM_Url} target="_blank" style={mystyleSocialWidget}>
                                <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} 
                                onClick={this.props.doClick('S', link.SWM_ID)}/>
                                
                           </a>
                           :
                           link.SWM_Url.startsWith("http://") || link.SWM_Url.startsWith("https://") ?
                           <a href={link.SWM_Url} data-id={link.SWM_ID} target="_blank" style={mystyleSocialWidget}>
                              {
                                 link.SWM_Icon==='faHandPaper'?
                                 <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} className="rotateCls"
                                 onClick={this.props.doClick('S', link.SWM_ID)}/>
                                 :
                                 <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} 
                                 onClick={this.props.doClick('S', link.SWM_ID)}/>
 
                              } 
                           </a>   
                           :
                             <a href={`https://${link.SWM_Url}`} data-id={link.SWM_ID} target="_blank" style={mystyleSocialWidget}>
                             {/* <img src={process.env.REACT_APP_UPLOAD_URL + link.SWM_Icon}  /> */}
                               {
                                 link.SWM_Icon==='faHandPaper'?
                                 <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} className="rotateCls" 
                                 onClick={this.props.doClick('S', link.SWM_ID)}/>
                                 :
                                 <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} onClick={this.props.doClick('S', link.SWM_ID)} />
                               } 
                            </a>  
                        }                  
                      </li> 
                      :
                      null
                   ) 
          })
      }
      let gifts;
      gifts=this.props.state.gifts.map((link,i) =>{
          return (          
          JM_Gift_Active===1 && JM_Payout_Details===1?
            <div className="col-md-4" style={{marginTop:'5px'}}>
              <div className={"gift " + font_family}>
         
                 <img src={process.env.REACT_APP_UPLOAD_URL+link.DA_Collection} />                     
                 <p style={mystyleGift}>{link.DA_Title}</p>
                 {
                   link.DA_DA_ID===999 ?
                  // <button className="buy" mystyleForHightight={mystyleForHightight} onClick={this.openSupportModal} >Go</button>
                   <SendSupport className={"buy "+ font_family} JM_Name={JM_Name} productList={this.props.state.gifts[i]} mystyleForHightight={mystyleForHightight} src={process.env.REACT_APP_UPLOAD_URL+link.DA_Collection} userDetails={this.props.state.userDetails}/>
                   :
                   <SendGift className={"buy "+ font_family} JM_Name={JM_Name} productList={this.props.state.gifts[i]} mystyleForHightight={mystyleForHightight} src={process.env.REACT_APP_UPLOAD_URL+link.DA_Collection} userDetails={this.props.state.userDetails}/>
                 }
               
                                     
              </div>
          </div>
          :
          null
          )
      })
    

      document
      .getElementsByTagName('meta')
      .namedItem('description')
      .setAttribute('content',"Everything about "+JM_Name+"  in one place. Follow and Connect!")

      document
      .getElementById('og-title')     
      .setAttribute('content',JM_Name+" - Gifts | Expy")

      document
      .getElementsByTagName('meta')
      .namedItem('image')
      .setAttribute('content',imagePath)
    return (
      <>
        <Helmet>
        <title>{ `${ JM_Name }- Gifts | Expy` }</title>
           
        </Helmet>
          <div className="contact-us-modal">
              <div className="backbtn">
                <i className="fa fa-back" aria-hidden="true"></i>
                <a href={process.env.REACT_APP_API_URL+JM_User_Profile_Url} style={{color:'#fff'}}><ArrowBackIcon/>Back To Profile</a>
            </div>
          </div>
        <div className="per-prop" style={{background:bgImage ==='' ? back_color : bgImage}}>
         
           {
              bgImageVideo.endsWith('.mp4') ||  bgImageVideo.endsWith('.mov') ? 
              <div className="back-vodeo">
                  {/* <video src={bgImageVideo} autoPlay loop muted playsinline/> */}
                  <video preload="true" playsinline="true" autoplay="autoplay" loop muted>
                      <source src={bgImageVideo} type="video/mp4" />
                  </video>
              </div>
              :
              null
            }
          <div className={cssClass}>  
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <div className="per-prop-body">
                    {/* <div className="overlay"  style={mystyle}>
                    </div> */}
                    <div className="dtail-part">
                      <div className="prop-pic">
                        <img src={imagePath} />
                      </div>
                      <div className="name" >
                         
                              <h3 className={font_family} style={nameStyle}>{JM_Name}
                               {
                                                JM_Verified===1 ?
                                                <span className="verify-tick"><img  src="/images/verifyIcon.png"/></span>
                                                :
                                                null
                                }
                              </h3> 
                              <p className={font_family} style={nameStyle}>{JM_Description}</p>
                          </div>
                           <div className="per-prop-footer">
                            <ul className="Social-links">
                                { JM_Social_Widget_Position==='top' ? SocialWidget : null}
                            </ul>
                          </div>
                      <div className="gift-part">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="gift-text">
                              <p>Support your favorite Creator by sending a digital gift and include a message for them to read!</p>
                            </div>
                          </div>
                          {gifts}
                        </div>
                      </div>

                              {/* support me */}
               <Modal
                show={this.state.showSupport}
                onHide={this.closeSupportModal}
                backdrop="static"
                keyboard={false}
                centered
                className={font_family}         
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <p className="addnew-title">Send tips to @{JM_User_Profile_Url}</p>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
          
                  <div className="addnew-box">
                   <label>How much do you want to send?</label>
                    <input type="text" className="form-control" placeholder="Enter Tip Amount"
                      name="DonarAmt"  value={this.state.DonarAmt} 
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={this.onChangeHandle}/>

                    <input type="text" className="form-control" placeholder="Enter Your Name (optional)"
                      name="DonarName" value={this.state.DonarName} onChange={this.onChangeHandle}/>

                    <input type="text" className="form-control" placeholder="Tip Messsage (optional)"
                      name="DonarMsg" value={this.state.DonarMsg} onChange={this.onChangeHandle} />


                      <div className="btun-box">
                      {
                        this.state.DonarAmt > 0 ?
                          <Tipping ref="checkout" BM_Type={'D'}  DA_INR_Doller={'INR'} DA_Price={this.state.DonarAmt} 
                            DonarName={this.state.DonarName} JM_Name={JM_User_Profile_Url} message={this.state.DonarMsg} DA_ID={0}  state={this.state} userDetails={this.state.userDetails[0]}/>
                        :
                        null
                      }
                          
                        <button className="btun" onClick={this.closeSupportModal}>Cancel</button>
                        </div>
                        <p style={{color:this.state.errColor}}>{this.state.errMsg}</p>

                    </div>   
        
                </Modal.Body>

              </Modal>


                    </div>
                  </div>
                  <div className="per-prop-footer">
                     <ul className="Social-links">
                         { JM_Social_Widget_Position==='bottom' ? SocialWidget : null}
                    </ul>
                  </div>
                </div>
              </div>


              <div className={"row " + isMobileView} style={{padding:'10px 0'}}>          
                <div className="col-md-4 col-4 offset-md-2">
                  <div className="page-footer-logo">                   
                    <a href="/"> <img src={process.env.REACT_APP_API_URL+"adm/uploads/footer_logo.png"} /></a>
                  </div>
                </div>
                <div className="col-8 col-md-4">
                     <ul className="page-footer-link " style={nameStyle} >
                      <li><a href="/" className={font_family } style={nameStyle}  >Explore</a></li> |&nbsp; 
                      <li><a href="/join" className={font_family} style={nameStyle}>Create Page</a></li>
                    </ul>
                
                </div>
              </div>  
            </div>
          </div>
        </div> 
      
      </>
    )
  }
}
export default  Profile_Gift