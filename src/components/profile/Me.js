

import React, { Component } from 'react'
import { Link } from 'react-router-dom'




import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Accordion from 'react-bootstrap/Accordion';

import Embed2 from 'react-embed';
import Embed from 'react-music-embed'
import Buy from '../premium/Buy';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';

// import {Custom} from '../../Custom';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Profile_Gift from './Profile_Gift';
import ImageIcon from '@material-ui/icons/Image';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
// import { Helmet } from 'react-helmet';
import { MDBIcon } from 'mdbreact';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Modal from 'react-bootstrap/Modal'
import Tipping from '../premium/Tipping';


// import { positions, Provider } from "react-alert";
// import {AlertTemplate} from "react-alert-template-basic";
import ShareIcon from '@material-ui/icons/Share';


//MS2 =============================================
//carousel

import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

import Popover from 'react-bootstrap/Popover'

import FourZeroFour from './FourZeroFour';
import ReactGA from 'react-ga';
import VideocamIcon from '@material-ui/icons/Videocam';
import API from '../services/API';
import BuyContestGiveAways from '../premium/BuyContestGiveAways'



import SweetAlert from 'sweetalert-react';
import {filterXSS}  from "xss"







class Me extends Component {
  constructor(props) {
    super(props)
    this.state = {
      JM_Email: localStorage.getItem('JM_Email'),
      JM_ID: parseInt(localStorage.getItem('JM_ID')),
      linkMaster: [],
      userDetails: [],
      themeMasterUser: [],
      socialWidget: [],
      category_master: [],
      category_links: [],
      embed_content: [],
      productList: [],
      gifts: [],
      isLoggedIn: false,
      JM_Name: '',
      JM_Email: '',
      JM_Url: '',
      JM_Profile_Pic: '',
      JM_User_Profile_Url: '',
      base_url: process.env.REACT_APP_API_URL,
      root_url: process.env.REACT_APP_ROOT_URL,
      ProfilePath: 'Profile/',
      linkPath: '',
      ProfileimagePath: '',
      open: false,
      isChecked: false,
      logo: "",
      bgColor: '',
      bgImage: "",
      showPage: false,
      showGiftPage: false,
      DonarAmt:0,
      DonarName:'',
      DonarMsg:'',
      ShowSweetAlert:false,
      sweetTitle:'',
      sweetMsg:'',
      showFourZeroFour:false

    }
    //console.log(this.props.Url);
  }

  doSomethingBeforeUnload = async (url) => {

    var JSONdata = {
      JM_Profile_Url: this.props.match.params.Url
    };

    const response = await fetch(url, {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(JSONdata)
    });
    const data = await response.json();

  }
  // Setup the `beforeunload` event listener
  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      const API_url = process.env.REACT_APP_API_URL + "admin/updateCurrentStatus";
      return this.doSomethingBeforeUnload(API_url);
    });
  };
  componentDidMount() {
    ReactGA.initialize('G-ZRSP9HVQ30');
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.Get_User_Details();
    // var JM_Name=localStorage.getItem('JM_User_Profile_Url');
    // document.title = JM_Name +" | Expy";

    // var content="Everything about "+JM_Name+" in one place. Follow and Connect with " +JM_Name;
    // document.querySelector('meta[name="description"]').setAttribute("content", content);


   
  }

  async Get_User_Details() {

    let pathname = window.location.pathname;
    var user_url = this.props.match.params.Url;
    //var user_url = pathname.replace(/\//g, "");  
    var flagData = {
      JM_User_Profile_Url: user_url,
      livePreview: 0
    };

    const flag=API.encryptData(flagData);
      let  JSONdata = {
          flag: flag
        };

    const API_url = this.state.base_url + "admin/isExistUrl_Profile";
    const response = await fetch(API_url, {
      method: 'post',
      headers: { "Content-Type": "application/json","authorization": API.getAuth(),"id":API.getId()},
      body: JSON.stringify(JSONdata)
    });
    const data1 = await response.json();
    if (data1.status === 1) 
    {
      const data=API.decryptJson(data1.flag);
    
      this.setState({    
      
        userDetailsAll: data.data,
        userDetails:data.userDetails,
        themeMasterUser:data.themeMasterUser,
        socialWidget:data.socialWidget,
        gifts:data.gifts, 
        category_master:data.category_master,
        JM_Name: data.userDetails[0].JM_Name,
      });

      var url = window.location.href;
      let url_gift = "/" + user_url + "/gift";
      let slash_url = "/" + user_url;
      if (slash_url !== pathname || slash_url !== url_gift)
      {
        this.setState({ showPage: true, showGiftPage: false });
        if (url_gift === pathname) 
        {
          this.setState({ showPage: false, showGiftPage: true });      // window.location.reload(true);
        }
      }
      else if (url_gift === pathname) 
      {
        this.setState({ showPage: false, showGiftPage: true });
      }
      else if (url_gift !== pathname)
      {
        //console.log(url)
        url = url.replace(pathname, "/" + user_url);
        window.history.pushState('', '', url);
        this.setState({ showPage: true, showGiftPage: false });     

      }     

    }
    else 
    {
     // this.setState({ showPage: false })
      this.setState({ showFourZeroFour: true, showPage: false,showGiftPage: false });     
    }


    //console.log(data)
  }

  Router = (url) => {
    window.history.pushState('', '', url);


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
  onChangeHandle=(e)=>{
      this.setState({[e.target.name]:e.target.value});     
  }

//MS 2=========================================


//newslatter
submitNewsLatter=(e)=>{
    e.preventDefault();
    var JSONdata = {
      NL_Name: this.state.NL_Name,
      NL_Email: this.state.NL_Email,
      JM_ID: this.state.userDetails[0].JM_ID
    };
    if(this.state.NL_Name.length ===0)
    {
      document.getElementById("msg_newsletter").innerHTML='Enter Name';
      return false;
    }
    if(this.state.NL_Email.length ===0)
    {
      document.getElementById("msg_newsletter").innerHTML='Enter Email';
      return false;
    }
    if(this.state.NL_Email.includes('.')===false && this.state.NL_Email.includes('@')===false )
    {
      document.getElementById("msg_newsletter").innerHTML='Invalid Email-ID';
      return false;
    }
    const API_url = this.state.base_url + "admin/newsLatterCreators";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => 
      {
        if(data.status==1)
        {
          document.getElementById("msg_newsletter").innerHTML='Thanks for subscribing';
          this.setState({
            NL_Name: '',
            NL_Email: '',
          })
        }
        else
        {
            document.getElementById("msg_newsletter").innerHTML='internal error, try again later..';
            return false;
        }
        //console.log(data);
      });
}


//07-aug-2021
showSwtAlert=(sweetTitle,sweetMsg)=>e=>{
  this.state({
      ShowSweetAlert:true,
      sweetTitle,
      sweetMsg
    })
}
onCloseAlert=(e)=>{
  this.state({
    ShowSweetAlert:true   
  })
}
  render() {

 
    var timeInterval=API.GetSlidingInterval();
    let imagePath = "";
    let base_url = this.state.base_url;
    let linkPath = ""; let JM_User_Profile_Url = "";
    let JM_User_Profile_Url_plus_JM_ID = "";
    let JM_Name, JM_Email, JM_Description = ''; let JM_Social_Widget_Position = "", JM_Verified = 0;
    //MS 2
    let JM_Gift_Title='',JM_Gift_Active=0;
    let JM_NewsLetter_Active=0,JM_NewsLetter_Title='';
    let JM_Payout_Details=0;let JM_Checkout_My_Social='';
    if (this.state.userDetails != null && this.state.userDetails.length > 0) {
      let len = this.state.userDetails.length;
      for (var i = 0; i < len; i++) {

        imagePath = process.env.REACT_APP_UPLOAD_URL + this.state.userDetails[i].JM_Profile_Pic;
        linkPath = process.env.REACT_APP_UPLOAD_URL + "Profile/" + this.state.userDetails[i].JM_User_Profile_Url + "_" + this.state.userDetails[i].JM_ID + "/";
        JM_User_Profile_Url_plus_JM_ID = this.state.userDetails[i].JM_User_Profile_Url + "_" + this.state.userDetails[i].JM_ID;
        JM_Name = this.state.userDetails[i].JM_Name;
        JM_Email = this.state.userDetails[i].JM_Email;
        JM_Description = this.state.userDetails[i].JM_Description;
        JM_Social_Widget_Position = this.state.userDetails[i].JM_Social_Widget_Position;
        JM_Verified = this.state.userDetails[i].JM_Verified;
        JM_User_Profile_Url = this.state.userDetails[i].JM_User_Profile_Url;
        JM_NewsLetter_Title=this.state.userDetails[i].JM_NewsLetter_Title;
        JM_NewsLetter_Active=this.state.userDetails[i].JM_NewsLetter_Active;
        JM_Gift_Title=this.state.userDetails[i].JM_Gift_Title;
        JM_Gift_Active=parseInt(this.state.userDetails[i].JM_Gift_Active);
        JM_Payout_Details=parseInt(this.state.userDetails[i].JM_Payout_Details);
        JM_Checkout_My_Social=this.state.userDetails[i].JM_Checkout_My_Social;
        break;
      }
    }
    var bgImage = "",bgImageVideo="", fontColor = "", back_color = "";
    var font_family = "", cssClass = "", highlightColor = "", item_color = "", item_style = "",item_border_color="",TM_Bio_Color='',TM_Name_Color='',TM_Footer_Color='';;
    var TM_Item_Effect='',TM_Name_Size='',TM_Bio_Size='';

    var TM_Thumbnail_Icon_Color='',TM_SocialWidget_Icon_Color='';
    if (this.state.themeMasterUser != null && this.state.themeMasterUser.length > 0) {
      let len = this.state.themeMasterUser.length;
      for (var j = 0; j < len; j++) {
        bgImage = this.state.themeMasterUser[j].TM_Back_Image==='' ? '': 'url(' + process.env.REACT_APP_UPLOAD_URL + this.state.themeMasterUser[j].TM_Back_Image + ')';
        bgImageVideo =  process.env.REACT_APP_UPLOAD_URL + this.state.themeMasterUser[j].TM_Back_Image;
        fontColor = this.state.themeMasterUser[j].TM_Font_Color
        back_color = this.state.themeMasterUser[j].TM_Back_Color;
        font_family = this.state.themeMasterUser[j].TM_Font;
        highlightColor = this.state.themeMasterUser[j].TM_Highlight_Color;
        cssClass = this.state.themeMasterUser[j].TM_Class_Name + " " + font_family;
        item_color = this.state.themeMasterUser[j].TM_Item_Color;
        item_style = this.state.themeMasterUser[j].TM_Item_Style;
        item_border_color=this.state.themeMasterUser[j].TM_Border_Color;
        TM_Name_Color=this.state.themeMasterUser[j].TM_Name_Color;
        TM_Bio_Color=this.state.themeMasterUser[j].TM_Bio_Color;
        TM_Footer_Color=this.state.themeMasterUser[j].TM_Footer_Color;
        TM_Item_Effect=this.state.themeMasterUser[j].TM_Item_Effect;
        TM_Name_Size=this.state.themeMasterUser[j].TM_Name_Size;
        TM_Bio_Size=this.state.themeMasterUser[j].TM_Bio_Size;
        TM_Thumbnail_Icon_Color=this.state.themeMasterUser[j].TM_Thumbnail_Icon_Color;
        TM_SocialWidget_Icon_Color=this.state.themeMasterUser[j].TM_SocialWidget_Icon_Color;
        break;
      }
    }
   // TM_Footer_Color='white';
    var h=window.screen.height;
    var w=window.screen.width;
   
    if(w <= 480) //mobile
    {
     // TM_Footer_Color='white';
     
    }
    else
    {
      //TM_Footer_Color=''
    }
    let footer_logo=process.env.REACT_APP_UPLOAD_URL+"footer_logo.png";
    if(
      bgImage.endsWith('profile_back_7.jpg') || bgImageVideo.endsWith('profile_back_7.jpg') ||
      bgImage.endsWith('profile_back_8.jpg') || bgImageVideo.endsWith('profile_back_8.jpg') 
      || bgImage.endsWith('profile_back_9.jpg') || bgImageVideo.endsWith('profile_back_9.jpg')
      || bgImage.endsWith('profile_back_11.jpg') || bgImageVideo.endsWith('profile_back_11.jpg')
      || bgImage.endsWith('profile_back_12.jpg') || bgImageVideo.endsWith('profile_back_12.jpg')
      || bgImage.endsWith('profile_back_13.jpg') || bgImageVideo.endsWith('profile_back_13.jpg')
      || bgImage.endsWith('profile_back_14.jpg') || bgImageVideo.endsWith('profile_back_14.jpg')
      || bgImage.endsWith('profile_back_15.jpg') || bgImageVideo.endsWith('profile_back_15.jpg')
      || bgImage.endsWith('profile_back_16.jpg') || bgImageVideo.endsWith('profile_back_16.jpg')
      || bgImage.endsWith('profile_back_17.jpg') || bgImageVideo.endsWith('profile_back_17.jpg')
      || bgImage.endsWith('profile_back_18.jpg') || bgImageVideo.endsWith('profile_back_18.jpg')
      || bgImage.endsWith('profile_back_20.jpg') || bgImageVideo.endsWith('profile_back_20.jpg')
      || bgImage.endsWith('profile_back_21.jpg') || bgImageVideo.endsWith('profile_back_21.jpg')
      || bgImage.endsWith('profile_back_23.jpg') || bgImageVideo.endsWith('profile_back_23.jpg')
      || bgImage.endsWith('profile_back_24.jpg') || bgImageVideo.endsWith('profile_back_24.jpg')
      || bgImage.endsWith('profile_back_25.jpg') || bgImageVideo.endsWith('profile_back_25.jpg')
      || bgImage.endsWith('profile_back_27.jpg') || bgImageVideo.endsWith('profile_back_27.jpg')
      || bgImage.endsWith('profile_back_28.jpg') || bgImageVideo.endsWith('profile_back_28.jpg')
      || bgImage.endsWith('profile_back_30.jpg') || bgImageVideo.endsWith('profile_back_30.jpg')
      
      || back_color.includes('linear-gradient(180deg,  #9c14fc 0%, #7604f9 100%)') // gradient 1
      || back_color.includes('linear-gradient(180deg,  #f66a08 0%, #f50f2c 100%)') // gradient 3
      || back_color.includes('linear-gradient(180deg,  #19c4f2 0%, #7008fb 100%)') // gradient 4
      || back_color.includes('linear-gradient(180deg,  #7c15fa 0%, #f21890 100%)') // gradient 5 
      || back_color.includes('linear-gradient(180deg,  #27a2e4 0%, #0a2437 100%)') // gradient 9

      || bgImage.endsWith('profile_back_31.jpg') || bgImageVideo.endsWith('profile_back_31.jpg')      
      || bgImage.endsWith('profile_back_32.jpg') || bgImageVideo.endsWith('profile_back_32.jpg')
      || bgImage.endsWith('profile_back_33.jpg') || bgImageVideo.endsWith('profile_back_33.jpg')
      || bgImage.endsWith('profile_back_35.jpg') || bgImageVideo.endsWith('profile_back_35.jpg')
      || bgImage.endsWith('profile_back_36.jpg') || bgImageVideo.endsWith('profile_back_36.jpg')
      || bgImage.endsWith('profile_back_39.jpg') || bgImageVideo.endsWith('profile_back_39.jpg')
      || bgImage.endsWith('profile_back_40.jpg') || bgImageVideo.endsWith('profile_back_40.jpg')
      || bgImage.endsWith('profile_back_41.jpg') || bgImageVideo.endsWith('profile_back_41.jpg')
      || bgImage.endsWith('profile_back_42.jpg') || bgImageVideo.endsWith('profile_back_42.jpg')
      || bgImage.endsWith('profile_back_43.jpg') || bgImageVideo.endsWith('profile_back_43.jpg')
      || bgImage.endsWith('profile_back_44.jpg') || bgImageVideo.endsWith('profile_back_44.jpg')
      || bgImage.endsWith('profile_back_45.jpg') || bgImageVideo.endsWith('profile_back_45.jpg')
      )
    {
      footer_logo=process.env.REACT_APP_UPLOAD_URL+'footer_logo_white.png';
    }
    else if(
      bgImage.endsWith('profile_back_10.jpg') || bgImageVideo.endsWith('profile_back_10.jpg')
      || bgImage.endsWith('profile_back_19.jpg') || bgImageVideo.endsWith('profile_back_19.jpg')
      || bgImage.endsWith('profile_back_22.jpg') || bgImageVideo.endsWith('profile_back_22.jpg')
      || bgImage.endsWith('profile_back_26.jpg') || bgImageVideo.endsWith('profile_back_26.jpg')
      || bgImage.endsWith('profile_back_29.jpg') || bgImageVideo.endsWith('profile_back_29.jpg')
  
      || back_color.includes('linear-gradient(180deg,  #2293d7 0%, #1ed2ed 100%)') // gradient 2 
      || back_color.includes('linear-gradient(180deg,  #fb754f 0%, #f39911 100%)') // gradient 6
      || back_color.includes('linear-gradient(180deg,  #fb6ca2 0%, #fd8877 100%)') // gradient 7
      || back_color.includes('linear-gradient(180deg,  #ffff00 0%, #54a000 100%)') // gradient 8

      || bgImage.endsWith('profile_back_34.jpg') || bgImageVideo.endsWith('profile_back_34.jpg')
      || bgImage.endsWith('profile_back_37.jpg') || bgImageVideo.endsWith('profile_back_37.jpg')
      || bgImage.endsWith('profile_back_38.jpg') || bgImageVideo.endsWith('profile_back_38.jpg')
      || bgImage.endsWith('profile_back_46.jpg') || bgImageVideo.endsWith('profile_back_46.jpg')
    )
    {
      footer_logo=process.env.REACT_APP_UPLOAD_URL+'footer_logo_black.png';
    }

    let isMobileView='';
    if(w >= 480) //web
    {    
      isMobileView='';
    }
    else
     {
       if(bgImageVideo.includes('theme/profile_back_'))
           isMobileView='';//last-footer
       else
       {
           isMobileView='';        
       }
     }

    const mystyle = {
      color: fontColor,
      // fontFamily: font_family,  
      background: item_color,
      border: item_border_color==='' ? '': '1px solid '+ item_border_color
    };
    const mystyleSocialWidget = {
      color: TM_SocialWidget_Icon_Color, 
    };

    const nameStyle = {
      color: TM_Name_Color,
      fontSize:TM_Name_Size,
      marginBottom:'5px'  
    };

    const bioStyle = {
      color: TM_Bio_Color,
      fontSize:TM_Bio_Size 
    };

    const FolderSubStyle = {
      color: fontColor,
      fontSize: '12px'
    };
    const FolderTitleStyle = {
      color: fontColor, 
    };
    const mystyleForHightight = {
     color: TM_Thumbnail_Icon_Color, 
      backgroundColor: highlightColor
    };
    const thumbIconStyle={
      color: TM_Thumbnail_Icon_Color, 
      backgroundColor:highlightColor,
  }

  const newsletterHeading={
    color: fontColor, 
  
  }
  







    //themeMasterUser
    let SocialWidget;
    var activeWidget=0;
    if(this.state.socialWidget !=null && this.state.socialWidget.length > 0)
    {
      for (let index = 0; index < this.state.socialWidget.length; index++) 
      {
        if(this.state.socialWidget[index].SWM_Active===1 && this.state.socialWidget[index].SWM_Style_Type==='W')
        activeWidget++;          
      }
    }
    if (this.state.socialWidget != null && this.state.socialWidget.length > 0) {
      SocialWidget = this.state.socialWidget.map((link, i) => {
        return (        
          link.SWM_Active === 1 &&  link.SWM_Url!=='' &&  link.SWM_Style_Type==='W'?   
          <>
       
            <li>
                {
                          
                          link.SWM_Title==='Email' ?
                          <a  key={link.SWM_ID} href={"mailto:"+ link.SWM_Url} target="_blank" style={TM_SocialWidget_Icon_Color==='unset'? '': mystyleSocialWidget}>
                               <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} 
                               onClick={this.doClick('S', link.SWM_ID)}/>
                          </a>
                          :
                          link.SWM_Url.startsWith("http://") || link.SWM_Url.startsWith("https://") ?
                          <a  key={link.SWM_ID} href={link.SWM_Url} data-id={link.SWM_ID} target="_blank" style={mystyleSocialWidget}>
                             {
                                link.SWM_Icon==='faHandPaper'?
                                <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} className="rotateCls"
                                onClick={this.doClick('S', link.SWM_ID)}/>
                                :
                                <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} 
                                onClick={this.doClick('S', link.SWM_ID)}/>

                             } 
                          </a>   
                          :
                            <a  key={link.SWM_ID}  href={`https://${link.SWM_Url}`} data-id={link.SWM_ID} target="_blank" style={mystyleSocialWidget}>
                            {/* <img src={process.env.REACT_APP_UPLOAD_URL + link.SWM_Icon}  /> */}
                              {
                                link.SWM_Icon==='faHandPaper'?
                                <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} className="rotateCls" 
                                onClick={this.doClick('S', link.SWM_ID)}/>
                                :
                                <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} onClick={this.doClick('S', link.SWM_ID)} />
                              } 
                           </a>  
                          
                }

            
            </li>
            </>
            :
            null
        
        )
      })
    }

    let category_master;
    category_master = this.state.category_master.map((link, i) => {
      return (
        <Accordion data={link.CM_ID} onClick={this.doClick('C', link.CM_ID)}>
          {
           link.CM_Active_Status === 1 ?
            <>
              <div className="btun-box" >

                <Accordion.Toggle style={mystyle} variant="link" eventKey={link.CM_ID} className={"big-btun folder-shadow " + item_style  +" "+TM_Item_Effect}>
                  <span style={FolderTitleStyle} className={font_family}><b><u>{link.CM_Folder_Title}</u></b></span>
                  <p style={FolderSubStyle} className={font_family}>{link.CM_Folder_Sub_Title}  </p>
                </Accordion.Toggle>
                < div className="icon folderCollapse" style={mystyleForHightight}>
                  {
                    (link.CM_Folder_Back_Image === null || link.CM_Folder_Back_Image === '') && (link.CM_Icon === '' || link.CM_Icon === null) ?
                      <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                      : (link.CM_Folder_Back_Image !== null || link.CM_Folder_Back_Image !== '') && link.CM_Icon === '' ?
                        <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.CM_Folder_Back_Image} />
                        : (link.CM_Icon !== '' || link.CM_Icon !== null) ?
                          <MDBIcon icon={link.CM_Icon} />
                          :
                          <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                  }

                </div>
                <Accordion.Collapse eventKey={link.CM_ID} id="payout">
                  <>
                    <div className={"folder " + item_style +" "+TM_Item_Effect } >
                      {


                        this.state.linkMaster && this.state.linkMaster.map((lnk, i) => (
                          lnk.LM_Url !== "" && lnk.LM_Folder_ID > 0 && lnk.LM_Folder_ID === link.CM_ID && lnk.LM_Active === 1 ?
                            <div className="btun-box" onClick={this.doClick('L', lnk.LM_ID)}>
                              <a className={"big-btun " + item_style +" "+TM_Item_Effect + " " + font_family} href={lnk.LM_Url} target="_blank" style={mystyle}>{lnk.LM_Title}</a>
                              <div className="icon" style={mystyleForHightight}>
                                {
                                  lnk.LM_Image === '' && (lnk.LM_Icon === '' || lnk.LM_Icon === null) ?
                                    <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                    : lnk.LM_Image !== '' && lnk.LM_Icon === '' ?
                                      <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + lnk.LM_Image} />
                                      : lnk.LM_Icon !== '' && lnk.LM_Image === '' ?
                                        <MDBIcon icon={lnk.LM_Icon} />
                                        :
                                        <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                }

                              </div>
                            </div>
                            :
                            null
                        ))

                      }
                    </div>
                  </>
                </Accordion.Collapse>

              </div>
            </>
            :
            null
          }
        </Accordion>
      )
    })

    let embed_content;
    embed_content = this.state.embed_content && this.state.embed_content.map((link, i) => {
      return (

        link.LM_Url !== "" && link.LM_Folder_ID === 0 && link.LM_Active === 1 ?
          //  <ReactPlayer url={link.LM_Url} />

          <div className="btun-box" onClick={this.doClick('E', link.EC_ID)}>
            {/* <a className={"big-btun "+item_style+ " "+font_family} href={link.LM_Url} target="_blank" style={mystyle}>Follow Me on {link.LM_Title}</a> */}
            <div className={"product-box " + item_style +" "+TM_Item_Effect + font_family}>
              <Embed url={link.LM_Url} />
            </div>
          </div>
          :
          null
      )
    })
 
    let premium=this.state.userDetailsAll;
    let productListItems=[];
    if (premium != null && premium.length > 0)
    {
      for (let i = 0; i < premium.length; i++) 
      {  
        let products={};
          products.DA_ID=premium[i].tableId;
          products.Archive = premium[i].archive;
          products.Create_Date=premium[i].Create_Date;
          products.DA_Active=premium[i].activeInactive;
          products.DA_Collection=premium[i].collection;

          products.DA_Cover=premium[i].cover;
          products.DA_DA_ID=premium[i].prodId;

          products.DA_Description=premium[i].description;
        
          
          products.DA_INR_Doller=premium[i].DA_INR_Doller;
          products.DA_OrderBy=premium[i].Order_By_All;
          products.DA_Payout=0;
          products.DA_Price=premium[i].price;
          products.DA_Status="P";
          products.DA_Support=0;
          products.DA_Title=premium[i].title;
          products.DA_Type=premium[i].prodType;
          products.JM_ID=premium[i].JM_ID;
          products.Order_By_All=premium[i].Order_By_All;
          products.mailText=premium[i].mailText;
          products.duration=premium[i].duration;
          products.planDays=premium[i].planDays;
          products.JM_Name=JM_Name;
          products.Q1=premium[i].Q1;
          products.Q2=premium[i].Q2;
          products.Q3=premium[i].Q3;
          products.Q4=premium[i].Q4;
          products.File_Upload=premium[i].File_Upload;

          products.DA_Allow_Cust_Pay=premium[i].DA_Allow_Cust_Pay;
          products.DA_Min_Amount=premium[i].DA_Min_Amount;
          products.DA_Suggested_Amont=premium[i].DA_Suggested_Amont;
          products.File_upload_text=premium[i].File_upload_text;
          productListItems.push(products)
      }
  
    }
    //console.log(productListItems)
    let gifts;
    if (this.state.gifts !== null && this.state.gifts.length > 0) 
    {
      if(JM_Gift_Active===1 && JM_Payout_Details===1)
      gifts = <div className="btun-box">
        <button className={"big-btun " + item_style +" "+TM_Item_Effect + " " + font_family} style={mystyle}>{JM_Gift_Title}</button>
        <div className="icon" style={thumbIconStyle}>
          <CardGiftcardIcon />
        </div>
        <a className={"buy "+  font_family} style={{ backgroundColor: highlightColor, color: TM_Thumbnail_Icon_Color }} userDetails={this.state.userDetails} gifts={this.state.gifts} href={"/" + JM_User_Profile_Url + "/gift"}>View</a>
      </div>
      else 
      gifts = null
    }
    let products={};

    //document.title = JM_Name +" | Expy"; 
    //document.getElementById("main_meta").content="Everything about "+JM_Name+"  in one place. Follow and Connect with "+JM_Name;

      let style_noImage={      
        backgroundColor:back_color
      }
      let style_withImage={      
        backgroundImage:bgImage
      }

      JM_Name = filterXSS(JM_Name);
      JM_Description = filterXSS(JM_Description);
    return (
      <>
        {/* <Helmet>
        <title>{ `${ JM_Name } | Expy` }</title>
            <meta name="description" content={"Everything about "+JM_Name+"  in one place. Follow and Connect with "+JM_Name}></meta>
        </Helmet> */}
       
        {
          this.state.showPage
            ? 
            
          <div className="per-prop" data={bgImage} style={{background:bgImage ==='' ? back_color : bgImage}}>
            {
              bgImageVideo.endsWith('.mp4') ||  bgImageVideo.endsWith('.mov') ? 
              <div className="back-vodeo">

                  <video preload="true" playsinline="true" autoplay="autoplay" loop muted>
                      <source src={bgImageVideo} type="video/mp4" />
                  </video>
              </div>
              :
              null
            }
           
            <div className={cssClass}>  
         
            <button className="share" style={{display:'none'}}><ShareIcon/></button>
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2"> 
                 <div className="heightFooter">
                    <div className="per-prop-body">
                          {/* <div className={"overlay "} style={mystyle}>
                          </div> */}
                      <div className="dtail-part">
                        <div className="prop-pic">
                      
                        <img src={imagePath} alt=""/>
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
                                
                                {/* <p className={font_family} style={nameStyle}>{JM_Description}</p> */}
                                <pre className={font_family} style={bioStyle}>
                                                        {JM_Description}
                                </pre>
                            </div>
                            <div className="per-prop-footer">
                              <ul className="Social-links">
                                                {
                                                  JM_Social_Widget_Position==='top' && activeWidget > 0?                                                 
                                                  <div className="socialCheckout" style={{color: TM_Name_Color }}>{JM_Checkout_My_Social}</div> 
                                                  : null                                                 
                                                  }
                                                  { JM_Social_Widget_Position==='top' && activeWidget > 0 ? SocialWidget : null}
                              </ul>
                            </div>
                          <div className="button-part">

                          {
                            this.state.userDetailsAll &&  this.state.userDetailsAll.map((link,i) =>(                           
                              link.ItemType==='customlink' && link.URL !== "" && link.folderId === 0 && link.activeInactive===1?
                                <div className="btun-box" onClick={this.doClick('L',link.tableId)} key={link.tableId}>
                                  <a className={"big-btun "+item_style +" "+TM_Item_Effect +" "+ font_family} href={link.URL} target="_blank" style={mystyle}>{link.title}</a>
                                    <div className="icon" style={thumbIconStyle}>
                                      {
                                        link.image === '' && (link.icon==='' || link.icon===null) ?
                                        <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                        : link.image !== '' && link.icon===''  ?
                                        <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.image} />
                                        : link.icon !== '' && link.image===''  ?
                                          <MDBIcon icon={link.icon}/>
                                        :
                                        <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                      }
                                    
                                    </div>
                                </div>
                              :
                              link.ItemType==='category' ?
                              <Accordion data={link.tableId} onClick={this.doClick('C', link.tableId)} key={link.tableId}>
                              {
                              link.activeInactive === 1 ?
                                <div style={{marginBottom:'20px'}} key={link.tableId}>
                                     <div className="btun-box" style={{marginBottom:'0px'}}>                  
                                        <Accordion.Toggle style={mystyle} variant="link" eventKey={link.tableId} className={"big-btun folder-shadow " + item_style +" "+TM_Item_Effect}>
                                          <span style={FolderTitleStyle} className={font_family}><b><u>{link.title}</u></b></span>
                                          <p style={FolderSubStyle} className={font_family}>{link.description}  </p>
                                        </Accordion.Toggle>
                                        <div className="icon" style={thumbIconStyle}>
                                        {
                                          (link.image === null || link.image === '') && (link.icon === '' || link.icon === null) ?
                                            <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                            : (link.image !== null || link.image !== '') && link.icon === '' ?
                                              <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.image} />
                                              : (link.icon !== '' || link.icon !== null) ?
                                                <MDBIcon icon={link.icon} />
                                                :
                                                <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                        }
                      
                                      </div>
                                    </div>
                                    <Accordion.Collapse eventKey={link.tableId} id="payout">
                                        <>
                                          <div className={"folder"} >
                                            {      
                                              this.state.userDetailsAll && this.state.userDetailsAll.map((lnk, i) => (
                                                lnk.ItemType==='customlink' && lnk.URL !== "" && lnk.folderId  === link.tableId && lnk.activeInactive === 1 ?
                                                  <div className="btun-box" onClick={this.doClick('L', lnk.tableId)}>
                                                    <a className={"big-btun " + item_style +" "+TM_Item_Effect + " " + font_family} href={lnk.URL} target="_blank" style={mystyle}>{lnk.title}</a>
                                                    <div className="icon" style={thumbIconStyle}>
                                                      {
                                                        lnk.image === '' && (lnk.icon === '' || lnk.icon === null) ?
                                                          <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                                          : lnk.image !== '' && lnk.icon === '' ?
                                                            <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + lnk.image} />
                                                            : lnk.icon !== '' && lnk.image === '' ?
                                                              <MDBIcon icon={lnk.icon} />
                                                              :
                                                              <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                                      }
                      
                                                    </div>
                                                  </div>
                                                  :
                                                  null
                                              ))
                      
                                            }
                                          </div>
                                        </>
                                      </Accordion.Collapse>
                                  </div>
                                  :
                                  null
                                }
                                
                              </Accordion>
                              :
                              link.ItemType==='embedcontent'   && link.folderId === 0 && link.activeInactive === 1 ?
                              <div className="btun-box" onClick={this.doClick('E', link.tableId)} key={link.tableId}>
                                  {/* <a className={"big-btun "+item_style +" "+TM_Item_Effect + " "+font_family} href={link.LM_Url} target="_blank" style={mystyle}>Follow Me on {link.LM_Title}</a> */}
                                  <div className={"product-box " + item_style +" "+TM_Item_Effect + font_family}>
                                  {
                                    link.URL.includes('apple.com')?
                                  <iframe src={link.URL} style={{left: 0, width: '100%', height: '450px', position: 'relative'}}
                                          allowfullscren allow="encrypted-media;">
                                    </iframe>
                                    :
                                    link.URL.includes('youtube.com')  ||    link.URL.includes('youtu.be') ?
                                    // <Embed2 url={link.URL} width={300}/>
                                        link.URL.includes('embed')===false ?
                                          <Embed2 url={link.URL} width={300}/>
                                        :
                                        <iframe src={link.URL} width="100%" height={315}  frameborder="0" allowtransparency="true" allow="encrypted-media">

                                        </iframe>
                                    :
                                    link.URL.includes('spotify.com')?
                                      // <Embed2 url={link.URL} width={300}/>
                                      <iframe src={link.URL} width="100%" height={'250px'} frameborder="0" allowtransparency="true" allow="encrypted-media">

                                      </iframe>
                                    :
                                    link.URL.includes('soundcloud.com')?
                                      <Embed2 url={link.URL} width="100%"/>
                                    :
                                    link.URL.includes('twitter.com')?
                                    <Embed2 url={link.URL} width="100%"/>
                                    :
                                    null
                                  }
                                
                                  
                                  </div>
                                </div>
                              :
                              link.ItemType==='premium' && link.activeInactive === 1 && JM_Payout_Details===1?                           
                              <div className="btun-box" key={link.tableId}>
                                <button className={"big-btun " + item_style +" "+TM_Item_Effect + " " + font_family} style={mystyle}>{link.title}
                                { 
                                 link.prodId!==6?
                                         (link.DA_Allow_Cust_Pay===0)?  
                                               (link.price > 0)?
                                               " Rs." + link.price
                                               :          
                                               null                       
                                             
                                          :
                                          (link.DA_Allow_Cust_Pay===1)?                                            
                                              (link.DA_Min_Amount > 0)?
                                              " Rs." + link.DA_Min_Amount
                                               :          
                                               null    
                                          :
                                          null
                                 
                                :
                                link.prodId===6?
                                  (link.DA_Allow_Cust_Pay===0)?  
                                        (link.price > 0)?
                                        " Rs." + link.price
                                        :          
                                        null                       
                                      
                                    :
                                      (link.DA_Allow_Cust_Pay===1)?                                            
                                        (link.DA_Min_Amount > 0)?
                                        " Rs." + link.DA_Min_Amount
                                        :          
                                        null    
                                    :
                                     null
                                  :
                                  null
                                }
                                  {
                                    // link.DA_INR_Doller==='INR' ?
                                    //       " (Rs." + link.DA_Price+")"
                                    // :
                                    //       " ($" + link.DA_Price+")"
                                  }
                  
                                </button>
                                <div className="icon " style={thumbIconStyle}>
                                  {
                                    link.prodType === 'video' ?
                                      <PlayCircleOutlineIcon />
                                      :
                                      null
                                  }
                                  {
                                    link.prodType === 'audio' ?
                                      <AudiotrackIcon />
                                      :
                                      null
                                  }
                                  {
                                    link.prodType === 'image' ?
                                      <ImageIcon />
                                      :
                                      null
                                  }
                                  {
                                    link.prodType === 'NA' ?
                                      <CameraAltOutlinedIcon />
                                      :
                                      null
                                  }
                                  {/* /DescriptionOutlinedIcon import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined'; */}
                                  {
                                    link.prodType === 'txt' ?
                  
                                      <DescriptionOutlinedIcon />
                                      :
                                      null
                                  }
                                  {
                                    link.prodType === 'pdf' ?
                  
                                      <PictureAsPdfOutlinedIcon />
                                      :
                                      null
                                  } 
                                  {
                                    link.prodType === 'videoCam' ?
                                   
                                      <VideocamIcon />
                                      :
                                      null
                                  }
    
                                </div>
                                {
                                  link.prodId===6?
                                  <BuyContestGiveAways font_family={font_family} productList={productListItems[i]} mystyleForHightight={mystyleForHightight} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} userDetails={this.state.userDetails} showSwtAlert={this.showSwtAlert} />
                                  :
                                  <Buy font_family={font_family} productList={productListItems[i]} mystyleForHightight={mystyleForHightight} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} userDetails={this.state.userDetails} />

                                }
                                
                              </div>
                              :
                              link.ItemType==='socialBar' && link.activeInactive === 1 ?    
                              <div className="btun-box" onClick={this.doClick('S',link.tableId)} key={link.tableId}>
                                
                                
                                {

                                    link.title==='Email' ?
                                    <a href={"mailto:"+ link.URL} className={"big-btun "+item_style +" "+TM_Item_Effect +" "+ font_family}  target="_blank" style={mystyle}
                                        onClick={this.doClick('S', link.tableId)}>
                                          {link.title} 
                                    </a>
                                  :
                                  link.URL.startsWith("http://") || link.URL.startsWith("https://") ?
                                      <a className={"big-btun "+item_style +" "+TM_Item_Effect +" "+ font_family} 
                                        href={link.URL} target="_blank" style={mystyle}
                                        onClick={this.doClick('S', link.tableId)}>
                                          {link.title}                                      
                                      </a>
                                      :
                                      <a className={"big-btun "+item_style +" "+TM_Item_Effect +" "+ font_family} 
                                      href={`https://${link.URL}`} target="_blank" style={mystyle}
                                        onClick={this.doClick('S', link.tableId)}>
                                          {link.title}                                      
                                      </a>
                                    
                                }
                              


                                  <div className="icon" style={thumbIconStyle}>
                                    {
                                        link.icon!=='' || link.icon===null ?
                                          // <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.icon} />                                                       
                                          
                                            link.icon==='faHandPaper'?
                                            <FontAwesomeIcon icon={API.SocialIcons(link.icon)} className="rotateCls" />
                                            :
                                            <FontAwesomeIcon icon={API.SocialIcons(link.icon)} />
                                          
                                        :
                                          <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                      }      
                                  
                                  </div>
                              </div>   
                              :  link.ItemType === 'carousel' && link.prodId === 4 && link.activeInactive===1 ?                                     
                                  <div className="Carousel-box" style={{display:'block'}} key={link.tableId}>
                                    
                                    <Carousel interval={timeInterval} keyboard={false}>
                                                            { 
                                                              link.carousel_1 !== 'NA' ?
                                                                  <Carousel.Item>                                                                    
                                                                              <div className={"item"} style={mystyle}>
                                                                                    {
                                                                                      link.carousel_1 !== 'NA' ?
                                                                                        <img
                                                                                          src={process.env.REACT_APP_UPLOAD_URL + link.carousel_1} alt="image1"
                                                                                        />
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                   <div className={"overlay "+font_family}>
                                                                                      <span>
                                                                                      {
                                                                                       link.carousel_title_1!=='NA' ?
                                                                                       link.carousel_title_1.replace('<>', "'")
                                                                                       :
                                                                                       "No title"
                                                                                      
                                                                                      }
                                                                                     </span>
                                                                                     </div>
                                                                                  </div> 
                                                                      
                                                                </Carousel.Item>
                                                                :
                                                                null
                                                            }
                                                              

                                                            { 
                                                              link.carousel_2 !== 'NA' ?
                                                                  <Carousel.Item>
                                                                         
                                                                                  <div className={"item"} style={mystyle}>
                                                                                    {
                                                                                      link.carousel_2 !== 'NA' ?
                                                                                        <img
                                                                                          src={process.env.REACT_APP_UPLOAD_URL + link.carousel_2} alt="image2"
                                                                                        />
                                                                                        :
                                                                                        "No title"
                                                                                    }
                                                                                       <div className={"overlay "+font_family}>
                                                                                          <span>
                                                                                            {
                                                                                               link.carousel_title_2!=='NA' ?
                                                                                               link.carousel_title_2.replace('<>', "'")
                                                                                               :
                                                                                               "No title"
                                                                                            
                                                                                            }

                                                                                          </span>
                                                                                          </div>
                                                                                  </div> 
                                                                   
                                                                  </Carousel.Item>
                                                                :
                                                                null
                                                            }

                                                            { 
                                                              link.carousel_3 !== 'NA' ?
                                                                  <Carousel.Item>
                                                                                  <div className={"item"} style={mystyle}>
                                                                                    {
                                                                                      link.carousel_3!=='NA'?
                                                                                      <img
                                                                                      src={process.env.REACT_APP_UPLOAD_URL+link.carousel_3} alt="image3"
                                                                                        />
                                                                                      :
                                                                                    null                                                                                  
                                                                                    }
                                                                                       <div className={"overlay "+font_family}>
                                                                                          <span>
                                                                                          {
                                                                                              link.carousel_title_3!=='NA' ?
                                                                                              link.carousel_title_3.replace('<>', "'")
                                                                                              :
                                                                                              "No title"
                                                                                         
                                                                                          
                                                                                          }
                                                                                            </span></div>
                                                                                  </div> 
                                                                  </Carousel.Item>
                                                                :
                                                                null
                                                            }

                                                          </Carousel>
                                                        
                                  </div>
                              :
                              null
                              : 
                              null
                            ))
                          }
                  
                          {gifts}         
                          {/* news letter */}
                          {
                            JM_NewsLetter_Active===1 ?
                            <div className={"reg-box "+ item_style +" "+TM_Item_Effect}   style={mystyle}>
                                <div className="heading" >
                                    <p className={font_family} style={newsletterHeading}>{JM_NewsLetter_Title}</p>
                                </div>
                                    <input type="text" className={"form-control " + font_family} style={mystyle} placeholder="Enter your name" 
                                    name="NL_Name" value={this.state.NL_Name} style={mystyle} onChange={this.onChangeHandle}/>
                                    <input type="text" className={"form-control " + font_family} style={mystyle} placeholder="Enter your e-mail address" 
                                    name="NL_Email" value={this.state.NL_Email} onChange={this.onChangeHandle}/>
  
                                    <button className={"next-btun "+ item_style +" "+TM_Item_Effect +" "+ font_family} style={mystyleForHightight} onClick={this.submitNewsLatter}>Submit</button>
                                    <p style={{color:'red'}} id="msg_newsletter"></p>
                                
                            </div> 
                            :
                            null
                          }
                          {/* news letter end */}
                        </div>

                      </div>
                    </div>
                    <div className="per-prop-footer">
                      <ul className={"Social-links"}>
                      {
                                                  JM_Social_Widget_Position==='bottom' && activeWidget > 0?                                                 
                                                  <div className="socialCheckout" style={{color: TM_Name_Color }}>{JM_Checkout_My_Social}</div> 
                                                  : null                                                 
                                                  }
                                                  { JM_Social_Widget_Position==='bottom' && activeWidget > 0 ? SocialWidget : null}
                      </ul>
                    </div>  
                  </div>                               
                </div>
              </div>

              
           
              <div className={"row " + isMobileView} style={{padding:'10px 0'}}>
                <div className="col-4 col-md-4 offset-md-2">
                  <div className="page-footer-logo">
                      <a href="/">
                      <img src={footer_logo} />
                      </a>
                  </div>
                </div>

                <div className="col-8 col-md-4">
                  <ul className="page-footer-link " style={{color: TM_Footer_Color}} >
                      <li><Link to="/" className={font_family} style={{color: TM_Footer_Color,fontSize:'14px'}}>Explore</Link></li> |&nbsp; 
                      <li><Link to="/join" className={font_family} style={{color: TM_Footer_Color,fontSize:'14px'}} >Create Page</Link></li>
                    </ul>
                </div>
              </div>  
            </div>


            <SweetAlert
              show={this.state.ShowSweetAlert}
              title={this.state.sweetTitle}
              text={this.state.sweetMsg}
              onConfirm={() => this.setState({ ShowSweetAlert: false })}
            />
          </div>

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
                    <input type="number" className="form-control" placeholder="Enter Tip Amount"
                      name="DonarAmt" min="0" value={this.state.DonarAmt} onChange={this.onChangeHandle}/>

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
                {/* <Provider template={AlertTemplate} {...options}>
                      
                </Provider> */}
               

        </div> 
             :
              this.state.showGiftPage
              ?
              <Profile_Gift state={this.state} doClick={this.doClick} />
              :   
              this.state.showFourZeroFour===true?
              <FourZeroFour/>
              :null    
           
        }
        

     
      
        
      </>
    )
  }
}

export default Me;
// spotify example
{/* <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */ }


// import SpotifyPlayer from 'react-spotify-player';

// size may also be a plain string using the presets 'large' or 'compact'
// const size = {
//   width: '100%',
//   height: 300,
// };
// const view = 'list'; // or 'coverart'
// const theme = 'black'; // or 'white'

// <SpotifyPlayer
//   uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
//   size={size}
//   view={view}
//   theme={theme}
// />

//error in iphone browser

///TypeError: undefined is not an object (evaluating 'navigator.serviceWorker.register')(anonymous function) @ main.e836af31.chunk.js:1u @ VM297 sundar:1t @ VM297 sundar:1r @ VM297 sundar:1global code @ main.e836af31.chunk.js:1