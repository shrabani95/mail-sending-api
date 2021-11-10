import React, { Component } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from 'react-bootstrap/Accordion';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Embed from 'react-embed';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LoaderMobile from './LoaderMobile';
import ImageIcon from '@material-ui/icons/Image';
 import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
 import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
 import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
 import { MDBIcon } from 'mdbreact';
import $ from "jquery";
//MS2 =============================================
//carousel

import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import API from '../services/API';
import VideocamIcon from '@material-ui/icons/Videocam';

 class LivePreview2 extends Component {
    constructor(props) {
      super(props)
      this.state = {
        JM_Email: localStorage.getItem('JM_Email'),
        JM_ID: parseInt(localStorage.getItem('JM_ID')),  
        linkMaster:[],
        userDetails:[],
        userDetailsAll:[],
        themeMasterUser:[],
        category_master:[],
        socialWidget:[],
        category_links:[],
        embed_content:[],   
          productList:[],
          gifts:[],
        isLoggedIn: false,
        JM_Name: '',

        JM_Url: '',
        JM_Profile_Pic: '',
        JM_User_Profile_Url:  localStorage.getItem('JM_User_Profile_Url'),  
        base_url: process.env.REACT_APP_API_URL,
        root_url: process.env.REACT_APP_ROOT_URL,
        ProfilePath: 'Profile/',
        linkPath: '',
        ProfileimagePath: '',
        open: false,
        isChecked: false,       
        logo:"",
        bgColor:'',
        bgImage:"",
        showPage:false,
        JM_Gift_Title:'',
        JM_Checkout_My_Social:'',
      }
 // console.log(this.props.Url);
    }
    componentDidMount() { 
      this.Get_User_Details();
      $(document).ready(function() {
        $('#previewBtn').on('click', function() {
          $('#previewbox').toggleClass('view');
          $('#previewUp').toggleClass('rot');
        });
      })

    }
  async  Get_User_Details()
  {
      var id = parseInt(localStorage.getItem('JM_ID'));
      var JSONdata = {
        JM_ID: id
      }; 
       const API_url = this.state.base_url + "admin/userDetailsAll";
       const response = await fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json","authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      });
      const data1 = await response.json();
      if (data1 != null && data1.status > 0)
       {
        const data=API.decryptJson(data1.flag);
        this.setState({      
          userDetailsAll: data.data,
          userDetails:data.userDetails,
          themeMasterUser:data.themeMasterUser,
          socialWidget:data.socialWidget,
          gifts:data.gifts, 
          category_master:data.category_master,
          showPage:true
        
        });
      }      
      else
         this.setState({showPage:false})
   // console.log(data)
  }

  UpdateMobileView=()=> 
  {
    this.Get_User_Details();
  }
  openCollapse = CM_ID=> e => 
  {
      CM_ID > 0 ?
        this.setState({ CM_ID_Collapse: CM_ID })
      :
        this.setState({ CM_ID_Collapse : 0 })      
  }


  updateSteps=id=>e=>{

  }
  updateStepsClose=id=>e=>{    
    document.getElementById(id).style.display = 'none';
  }

  render() 
  {
    var timeInterval=API.GetSlidingInterval();
    let imagePath="";
    let linkPath="";
    let JM_User_Profile_Url_plus_JM_ID ="";
    let JM_Name,JM_Email,JM_Description='';let  JM_Social_Widget_Position="",JM_Verified=0;
    let JM_NewsLetter_Active=0,JM_NewsLetter_Title='',JM_Gift_Title='',JM_Gift_Active=0;
    let JM_Payout_Details=0; let JM_Checkout_My_Social='';
    if(this.state.userDetails !=null && this.state.userDetails.length > 0)
    {
      let len=this.state.userDetails.length;
      for(var i=0;i < len ;i++)
      {
        
        imagePath=process.env.REACT_APP_UPLOAD_URL+this.state.userDetails[i].JM_Profile_Pic;
        linkPath=process.env.REACT_APP_UPLOAD_URL+"Profile/"+this.state.userDetails[i].JM_User_Profile_Url+"_"+this.state.userDetails[i].JM_ID+"/";
        JM_User_Profile_Url_plus_JM_ID = this.state.userDetails[i].JM_User_Profile_Url+"_"+this.state.userDetails[i].JM_ID;
        JM_Name=this.state.userDetails[i].JM_Name;
        JM_Email=this.state.userDetails[i].JM_Email;
        JM_Description=this.state.userDetails[i].JM_Description; //this.value.replace(/\r?\n/g, '<br>')
        JM_Social_Widget_Position=this.state.userDetails[i].JM_Social_Widget_Position;
        JM_Verified=this.state.userDetails[i].JM_Verified;
        JM_NewsLetter_Title=this.state.userDetails[i].JM_NewsLetter_Title;
        JM_NewsLetter_Active=this.state.userDetails[i].JM_NewsLetter_Active;
        JM_Gift_Title=this.state.userDetails[i].JM_Gift_Title;
        JM_Gift_Active=parseInt(this.state.userDetails[i].JM_Gift_Active);
        JM_Payout_Details=parseInt(this.state.userDetails[i].JM_Payout_Details);
        JM_Checkout_My_Social=this.state.userDetails[i].JM_Checkout_My_Social;
        break;
      }
    }
    var bgImage="",bgImageVideo="",fontColor="",back_color="";
    var font_family="",cssClass="",highlightColor="",item_color="",  item_style="",item_border_color='',TM_Bio_Color='',TM_Name_Color='',TM_Footer_Color='';
    var TM_Item_Effect='',TM_Name_Size='',TM_Bio_Size='';
    var TM_Thumbnail_Icon_Color='',TM_SocialWidget_Icon_Color='';
    if(this.state.themeMasterUser !=null && this.state.themeMasterUser.length > 0)
    {
      let len=this.state.themeMasterUser.length;
      for(var j=0;j < len ;j++)
      {
        bgImage = this.state.themeMasterUser[j].TM_Back_Image==='' ? '': 'url(' + process.env.REACT_APP_UPLOAD_URL + this.state.themeMasterUser[j].TM_Back_Image + ')';
        bgImageVideo =  process.env.REACT_APP_UPLOAD_URL + this.state.themeMasterUser[j].TM_Back_Image;
        fontColor=this.state.themeMasterUser[j].TM_Font_Color
        back_color= this.state.themeMasterUser[j].TM_Back_Color;
        font_family =this.state.themeMasterUser[j].TM_Font;
        highlightColor =this.state.themeMasterUser[j].TM_Highlight_Color;
        cssClass=this.state.themeMasterUser[j].TM_Class_Name+" "+font_family;
        item_color= this.state.themeMasterUser[j].TM_Item_Color;
        item_style=this.state.themeMasterUser[j].TM_Item_Style;
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
    //TM_Footer_Color='white'; //for fixed footer font



    //21-jul-2021
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
   if(back_color!=='')
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
      background:item_color,
      border: item_border_color==='' ? '': '1px solid '+ item_border_color
    };
    const mystyleGift = {
      color: fontColor,
      border:item_border_color==='' ? '': '1px solid '+ item_border_color
    };
    const mystyleForCustomLink = {
      color: fontColor,          
      background:item_color,
      padding:'20px 35px',
      border: item_border_color==='' ? '': '1px solid '+ item_border_color
    };

    const nameStyle = {
      color: TM_Name_Color,
      fontSize:TM_Name_Size 
    };
    const bioStyle = {
      color: TM_Bio_Color,
      fontSize:TM_Bio_Size 
    };
    const FolderSubStyle = {
      color: fontColor ,
      fontSize:'10px',
    };
    const FolderTitleStyle = {
      color: fontColor, 
    };
    const mystyleForHightight = {
      color: TM_Thumbnail_Icon_Color,
      backgroundColor:highlightColor,

    };
    const thumbIconStyle={
        color: TM_Thumbnail_Icon_Color, 
        backgroundColor:highlightColor,
    }

   const mystyleForHightightFolder={
      color: TM_Thumbnail_Icon_Color, 
      backgroundColor:highlightColor    
    }
    const mystyleSocialWidget = {
      color: TM_SocialWidget_Icon_Color, 
    };

    const newsletterHeading={
      color: fontColor,     
    }


      //themeMasterUser
      let SocialWidget;var activeWidget=0;
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
                            <a href={"mailto:"+ link.SWM_Url} target="_blank" style={TM_SocialWidget_Icon_Color==='unset'? '': mystyleSocialWidget} rel="noreferrer">
                                 <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} 
                               />
                            </a>
                            :
                            link.SWM_Url.startsWith("http://") || link.SWM_Url.startsWith("https://") ?
                            <a href={link.SWM_Url} data-id={link.SWM_ID} target="_blank" style={mystyleSocialWidget} rel="noreferrer">
                               {
                                  link.SWM_Icon==='faHandPaper'?
                                  <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} className="rotateCls"
                                 />
                                  :
                                  <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} 
                                  />
  
                               } 
                            </a>   
                            :
                              <a href={`https://${link.SWM_Url}`} data-id={link.SWM_ID} target="_blank" style={mystyleSocialWidget} rel="noreferrer">
                              {/* <img src={process.env.REACT_APP_UPLOAD_URL + link.SWM_Icon}  /> */}
                                {
                                  link.SWM_Icon==='faHandPaper'?
                                  <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} className="rotateCls" 
                                 />
                                  :
                                  <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} />
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
        //console.log("activeWidget")
       //console.log(activeWidget)
        let productList;
        if(this.state.productList !=null && this.state.productList.length > 0)
        {
          productList=this.state.productList.map((link,i) =>{
                return (
                        link.DA_Active===1?
                         <div className="btun-box">  
                            <button className={"big-btun mobile "+item_style+" "+ TM_Item_Effect + " "+font_family} style={mystyle}>{link.DA_Title}
                            
                            {
                              link.DA_INR_Doller==='INR' ?
                                    " (Rs." + link.DA_Price+")"
                              :
                                    " ($" + link.DA_Price+")"
                           }
                             
                             </button>
                            <div className="icon mobile" style={mystyleForHightight}>

                             {
                                link.DA_Type==='video'?
                                <PlayCircleOutlineIcon/>
                                :
                                null
                              }
                              {
                                link.DA_Type==='audio'?
                                <AudiotrackIcon/>
                                :
                                null
                              }
                              {
                                link.DA_Type==='image'?
                                <ImageIcon/>
                                :
                                null
                              }
                              {
                                link.DA_Type==='NA'?
                                <CameraAltOutlinedIcon/>
                                :
                                null
                              }
                              {/* /DescriptionOutlinedIcon import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined'; */}
                              {
                                link.DA_Type==='txt'?
                               
                                <DescriptionOutlinedIcon style={{ fontSize: 35 }}/>
                                :
                                null
                              }
                               {
                                link.DA_Type==='pdf'?
                               
                                <PictureAsPdfOutlinedIcon style={{ fontSize: 35 }}/>
                                :
                                null
                              }
                              
                            </div>
                            <button className={"buy mobile " + font_family} data={this.state.productList[i]} style={mystyleForHightight}>Buy</button>
                          </div>
                          :
                          null
                      ) 
              })
          }
   
          let gifts;
          if(this.state.gifts!==null && this.state.gifts.length > 0)
          {
              
              if(JM_Gift_Active===1 && JM_Payout_Details===1)
                gifts=<div className="btun-box">
                        <button className={"big-btun mobile "+item_style+ " "+ TM_Item_Effect +" "+font_family} style={mystyle}>{JM_Gift_Title}</button>
                        <div className="icon mobile" style={thumbIconStyle}>
                            <CardGiftcardIcon/>
                        </div>
                        <button className={"buy mobile " + font_family} style={{backgroundColor:highlightColor,color:TM_Thumbnail_Icon_Color}}>View</button>
                    </div>
              else
               gifts=null;
          }      
          



    return (
           <>
         <div className="col-lg-4 col-md-6">
             <div className="tooltips">   
               <div className="preview" id="previewbox">
                  <div className="previewBtn" id="previewBtn"><span ><i className="fa fa-caret-up" id="previewUp" aria-hidden="true"></i></span> Preview</div>
                  <h4>Check out the live preview of your page below.</h4>
                  <div className="preview-mobile">
                        {this.state.showPage ?
                        <div className={"per-prop live"} data={bgImage} style={{background:bgImage ==='' ? back_color : bgImage}}>
                          <div className="back-vodeo live">

                           <video src={bgImageVideo} autoPlay loop muted playsInline/>
                              {/* <video playsinline="true" autoplay="autoplay" loop muted>
                                  <source src={bgImageVideo} type="video/mp4" />
                              </video> */}
                            </div>
                        
                        <div className={cssClass}>  

                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                    {/* <div className="per-prop-header">
                                            <button className="btun">Follow</button>
                                            <button className="btun_2"><ChatOutlinedIcon style={{ fontSize: 35 }}/></button>
                                    </div> */}
                                    <div className="per-prop-body mobile">                       
                                        <div className="dtail-part">
                                        <div className="prop-pic mobile">
                                        <img src={imagePath} alt=""/>
                                        </div>                      
                                            <div className={"name mobile "+font_family} >
                                             
                                               <h3 className={font_family} style={nameStyle}>{JM_Name}
                                               {
                                                JM_Verified===1 ?
                                                <span className="verify-tick"><img  src="/images/verifyIcon.png"/></span>
                                                :
                                                null
                                               }
                                               
                                                </h3>
                                                    {/* <p className={font_family} style={nameStyle}></p>  */}
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
                                                 //custom link
                                                  link.folderId===0 &&  link.activeInactive===1 && link.ItemType==='customlink'?  
                                                  <div className="btun-box" >
                                                    <a className={"big-btun mobile "+item_style+" "+ TM_Item_Effect+ " "+font_family} href={link.URL} target="_blank" style={mystyleForCustomLink} rel="noreferrer">{link.title}</a>
                                                    <div className="icon mobile" style={thumbIconStyle}>
                                                        {
                                                           link.image === '' && (link.icon==='' || link.icon===null) ?
                                                           <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} alt=""/>
                                                         : link.image !== '' && link.icon===''  ?
                                                             <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.image} alt=""/>
                                                         : link.icon !== '' && link.image===''  ?
                                                            <MDBIcon icon={link.icon}/>
                                                         :
                                                            <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} alt=""/>
                                                        }
                                                    
                                                    </div>
                                                  </div>
                                                  // category
                                                  :  link.ItemType==='category' && link.activeInactive===1 ?     
                                                  <Accordion>
                                                  {
                                                  link.activeInactive === 1 ?
                                                    <div style={{marginBottom:'20px'}}>
                                                         <div className="btun-box" style={{marginBottom:'0px'}}>                  
                                                            <Accordion.Toggle style={mystyle} variant="link" eventKey={link.tableId} className={"big-btun folder-shadow " + item_style +" "+TM_Item_Effect}>
                                                              <span style={FolderTitleStyle} className={font_family}><b><u>{link.title}</u></b></span>
                                                              <p style={FolderSubStyle} className={font_family}>{link.description}  </p>
                                                            </Accordion.Toggle>
                                                            <div className="icon mobile" style={mystyleForHightightFolder}>                                                           
                                                              {
                                                                      (link.image === null || link.image === '') && (link.icon==='' || link.icon===null)?
                                                                    <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                                                      : (link.image !== null || link.image !== '') && link.icon===''?
                                                                      <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.image} />
                                                                      : (link.icon!=='' || link.icon!==null) ?
                                                                      <MDBIcon icon={link.icon}/>
                                                                      :
                                                                      <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                                                }
                                                           </div>
                                                        </div>
                                                        <Accordion.Collapse eventKey={link.tableId} id="payout">
                                                            <>
                                                             <div  className={"folder "+item_style + " "+ TM_Item_Effect}>
                                                                {      
                                                                  this.state.userDetailsAll && this.state.userDetailsAll.map((lnk, i) => (
                                                                    lnk.ItemType==='customlink' && lnk.URL !== "" && lnk.folderId  === link.tableId && lnk.activeInactive === 1 ?
                                                                      <div className="btun-box">
                                                                       <a className={"big-btun mobile "+item_style +" "+ TM_Item_Effect+" "+ font_family} href={lnk.URL} target="_blank" style={mystyle}>{lnk.title}</a>
                                                                            <div className="icon mobile" style={thumbIconStyle}>
                                                                                {
                                                                                    lnk.image === '' && (lnk.icon==='' || lnk.icon===null) ?
                                                                                  <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                                                                    : lnk.image !== '' && lnk.icon===''  ?
                                                                                    <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + lnk.image} />
                                                                                    : lnk.icon !== '' && lnk.image===''  ?
                                                                                    <MDBIcon icon={lnk.icon}/>
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
                                                    
                                                    //embed content  
                                                  : link.ItemType==='embedcontent' && link.activeInactive===1 && link.folderId === 0?   
                                                      <div className="btun-box mobile" >
                                                          <div className={"product-box "+item_style +" "+ TM_Item_Effect+" "+ font_family}>
                                                          {
                                                              link.URL.includes('apple.com')?
                                                            <iframe src={link.URL} style={{left: 0, width: '100%', height: '450px', position: 'relative'}}
                                                                    allowfullscren allow="encrypted-media;">
                                                              </iframe>
                                                              :
                                                              link.URL.includes('youtube.com') ||    link.URL.includes('youtu.be') ?
                                                                // <Embed2 url={link.URL} width={300}/>
                                                                  link.URL.includes('embed')===false ?
                                                                  <Embed url={link.URL} width={300}/>
                                                                :
                                                                <iframe src={link.URL} width="100%"  frameborder="0" allowtransparency="true" allow="encrypted-media">

                                                                </iframe>
                                                       
                                                              :
                                                              link.URL.includes('spotify.com')?
                                                                // <Embed2 url={link.URL} width={300}/>
                                                                <iframe src={link.URL} width="100%" height={'250px'} style={{height:'200px'}} frameborder="0" allowtransparency="true" allow="encrypted-media">

                                                                </iframe>
                                                              :
                                                              link.URL.includes('soundcloud.com')?
                                                                <Embed url={link.URL} width="100%"/>
                                                              :
                                                              link.URL.includes('twitter.com')?
                                                              <Embed url={link.URL} width="100%"/>
                                                              :
                                                              null
                                                            }                                                   
                                                          </div>   
                                                      </div>
                                                  :   
                                                  //premium content
                                                   link.ItemType==='premium' && link.activeInactive===1 &&  link.prodId !== 4 && JM_Payout_Details===1?  
                                                   <div className="btun-box">  
                                                       <button className={"big-btun mobile "+item_style +" "+ TM_Item_Effect+ " "+font_family} style={mystyle}>{link.title}
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
                                                    //  link.DA_INR_Doller==='INR' ?
                                                    //        " (Rs." + link.DA_Price+")"
                                                    //  :
                                                    //        " ($" + link.DA_Price+")"
                                                  }
                                                    
                                                    </button>
                                                       <div className="icon mobile" style={thumbIconStyle}>
                       
                                                    {
                                                       link.prodType==='video'?
                                                       <PlayCircleOutlineIcon/>
                                                       :
                                                       null
                                                     }
                                                     {
                                                       link.prodType==='audio'?
                                                       <AudiotrackIcon/>
                                                       :
                                                       null
                                                     }
                                                     {
                                                       link.prodType==='image'?
                                                       <ImageIcon/>
                                                       :
                                                       null
                                                     }
                                                     {
                                                       link.prodType==='NA'?
                                                       <CameraAltOutlinedIcon/>
                                                       :
                                                       null
                                                     }
                                                     {/* /DescriptionOutlinedIcon import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined'; */}
                                                     {
                                                       link.prodType==='txt'?
                                                      
                                                       <DescriptionOutlinedIcon />
                                                       :
                                                       null
                                                     }
                                                      {
                                                       link.prodType==='pdf'?
                                                      
                                                       <PictureAsPdfOutlinedIcon/>
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
                                                   link.prodId===5?
                                                   <button className={"buy mobile " + font_family} data={this.state.userDetailsAll[i]} style={mystyleForHightight}>Book</button>
                                                   :
                                                   link.prodId===6?
                                                    <button className={"buy mobile " + font_family} data={this.state.userDetailsAll[i]} style={mystyleForHightight}>Join</button>
                                                    :
                                                    <button className={"buy mobile " + font_family} data={this.state.userDetailsAll[i]} style={mystyleForHightight}>Buy</button>
                                                 
                                                  }
                                                 </div>                                                  
                                                  :  link.ItemType==='socialBar' && link.activeInactive===1 ?   
                                                  <div className="btun-box" >
                                                      <a className={"big-btun mobile "+item_style+" "+ TM_Item_Effect+ " "+font_family} href={link.URL} target="_blank" style={mystyleForCustomLink}>{link.title}</a>
                                                      <div className="icon mobile" style={thumbIconStyle}>
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
                                                      <div className="Carousel-box mobile" style={{display:'block'}}>                                                        
                                                      
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
                                                                                       </span></div>
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
                                                                                      null
                                                                                  }
                                                                                     <div className={"overlay "+font_family}>
                                                                                        <span>
                                                                                        {
                                                                                               link.carousel_title_2!=='NA' ?
                                                                                               link.carousel_title_2.replace('<>', "'")
                                                                                               :
                                                                                               "No title"
                                                                                            
                                                                                            }
                                                                                          
                                                                                          </span></div>
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
                                              ))
                                            }
                                           {gifts}

                                            {/* news letter */}
                                            {
                                              JM_NewsLetter_Active===1 ?
                                                <div className={"reg-box mobile "+ item_style + " "+ TM_Item_Effect}   style={mystyle}>
                                                    <div className="heading" >
                                                        <p className={font_family} style={newsletterHeading}>{JM_NewsLetter_Title}</p>
                                                    </div>
                                                        <input type="text" className={"form-control " + font_family} style={mystyle} placeholder="Enter your name" 
                                                        name="NL_Name" value={this.state.NL_Name} style={mystyle} onChange={this.onChangeHandle}/>
                                                        <input type="text" className={"form-control " + font_family} placeholder="Enter your e-mail address" 
                                                        name="NL_Email" value={this.state.NL_Email} style={mystyle} onChange={this.onChangeHandle}/>
                      
                                                        <button className={"next-btun "+ item_style + " "+ TM_Item_Effect+" "+ font_family} style={mystyleForHightight} onClick={this.submitNewsLatter}>Submit</button>
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
                                        <ul className="Social-links">                                          
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
                                <div className={"row " + isMobileView} style={{padding:'10px 0'}}>
                                  <div className="col-4 col-md-4">
                                    <div className="page-footer-logo mobile " style={{width:'70px'}}>
                                        <img src={footer_logo} />
                                    </div>
                                  </div>
                                  <div className="col-8 col-md-8">
                                  <ul className="page-footer-link text-right mobile" style={{color: TM_Footer_Color }} >
                                      <li><a href="/" className={font_family} style={{color: TM_Footer_Color,fontSize:'13px'}}  >Explore</a></li> |&nbsp; 
                                      <li><a href="/join" className={font_family} style={{color: TM_Footer_Color,fontSize:'13px'}}>Create Page</a></li>
                                    </ul>
                                    
                                </div>
                                </div>  
                            </div>
                        </div>
                        </div> 
                        :
                        <>
                        {/* <h1>Page Not Found</h1> */}
                         <LoaderMobile/> 
                        </>
                        }
                 </div>
               </div>
                <div className="tooltip-top" id="tool_preview" style={{display:'none'}}>
                  <h6>Page preview</h6>
                  <p> See all the real-time changes on your page here.</p>
                  <i></i>
                  <span className="cls" onClick={()=>API.updateStepsClose('tool_preview')}>x</span>
                   <span className="step">Step 4 out of 9</span>
                   <button className="nxtbtun"  onClick={()=> API.updateToolStep(5)}>Next</button>
              </div>
        </div> 
               
        </div>
      </>
    )
  }

}

export default LivePreview2;