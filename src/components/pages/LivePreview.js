import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import 'font-awesome/css/font-awesome.min.css';
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
 class LivePreview extends Component {
    constructor(props) {
      super(props)
      this.state = {
        JM_Email: localStorage.getItem('JM_Email'),
        JM_ID: parseInt(localStorage.getItem('JM_ID')),  
        linkMaster:[],
        userDetails:[],
        themeMasterUser:[],
        category_master:[],
        socialWidget:[],
        category_links:[],
        embed_content:[],   
          productList:[],
          gifts:[],
        isLoggedIn: false,
        JM_Name: '',
        JM_Email: '',
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
        showPage:false
  
      }
  console.log(this.props.Url);
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
     var user_url = this.state.JM_User_Profile_Url;  
      var JSONdata = {
        JM_User_Profile_Url: user_url,
        livePreview:1
      };   
      const API_url = this.state.base_url + "admin/isExistUrl";
      const response=await fetch(API_url,{
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(JSONdata)
          });
      const data=await response.json();
      if(data.status===1)
        this.setState({
          userDetails:data.userDetails,
          linkMaster:data.linkMaster,
          themeMasterUser:data.themeMasterUser,
          socialWidget:data.socialWidget,
          category_master:data.category_master,
          category_links:data.category_links,
          embed_content:data.embed_content,
          productList:data.productList,
          gifts:data.gifts,
          showPage:true
        });
      else
         this.setState({showPage:false})

         console.log(data)
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

  render() 
  {
    let imagePath="";
    let base_url=this.state.base_url;
    let linkPath="";
    let JM_User_Profile_Url_plus_JM_ID ="";
    let JM_Name,JM_Email,JM_Description='';let  JM_Social_Widget_Position="",JM_Verified=0;

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
        JM_Description=this.state.userDetails[i].JM_Description;
        JM_Social_Widget_Position=this.state.userDetails[i].JM_Social_Widget_Position;
        JM_Verified=this.state.userDetails[i].JM_Verified;
        break;
      }
    }
    var bgImage="",fontColor="",back_color="";
    var font_family="",cssClass="",highlightColor="",item_color="",  item_style="",item_border_color='';
    if(this.state.themeMasterUser !=null && this.state.themeMasterUser.length > 0)
    {
      let len=this.state.themeMasterUser.length;
      for(var j=0;j < len ;j++)
      {
        bgImage='url('+process.env.REACT_APP_UPLOAD_URL+this.state.themeMasterUser[j].TM_Back_Image+')';
        fontColor=this.state.themeMasterUser[j].TM_Font_Color
        back_color= this.state.themeMasterUser[j].TM_Back_Color;
        font_family =this.state.themeMasterUser[j].TM_Font;
        highlightColor =this.state.themeMasterUser[j].TM_Highlight_Color;
        cssClass=this.state.themeMasterUser[j].TM_Class_Name+" "+font_family;
        item_color= this.state.themeMasterUser[j].TM_Item_Color;
        item_style=this.state.themeMasterUser[j].TM_Item_Style;
        item_border_color=this.state.themeMasterUser[j].TM_Border_Color;
        break;
      }
    }
    const mystyle = {
      color: fontColor,          
      backgroundColor:item_color,
      border:'1px solid '+ item_border_color
    };
    const mystyleForCustomLink = {
      color: fontColor,          
      backgroundColor:item_color ,
      padding:'20px 35px',
      border:'1px solid '+ item_border_color
    };

    const nameStyle = {
      color: fontColor 
    };
    const FolderSubStyle = {
      color: fontColor ,
      fontSize:'10px',
    };
    const mystyleForHightight = {
      color: fontColor,     
     // fontFamily: font_family,
      backgroundColor:highlightColor,

    };
   const mystyleForHightightFolder={
    color: fontColor,     
     // fontFamily: font_family,
      backgroundColor:highlightColor,
      top:'30px'
    }
      //themeMasterUser
      let SocialWidget;
    
      if(this.state.socialWidget !=null && this.state.socialWidget.length > 0)
      {
          SocialWidget=this.state.socialWidget.map((link,i) =>{
              return (
                      link.SWM_Active===1?
                        <li>
                          {
                          
                            link.SWM_Title==='Email' ?
                            <a href={"mailto:"+ link.SWM_Url}>
                               <img src={process.env.REACT_APP_UPLOAD_URL+link.SWM_Icon}/>
                            </a>
                            :
                            <Link to={link.SWM_Url} data-id={link.SWM_ID}>                      
                              <img src={process.env.REACT_APP_UPLOAD_URL+link.SWM_Icon}/>
                            </Link>     
                          }
                                       
                          </li> 
                        :
                        null
                    ) 
            })
        }

       
        let productList;
        if(this.state.productList !=null && this.state.productList.length > 0)
        {
          productList=this.state.productList.map((link,i) =>{
                return (
                        link.DA_Active===1?
                         <div className="btun-box">  
                            <button className={"big-btun mobile "+item_style+ " "+font_family} style={mystyle}>{link.DA_Title}
                            
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
            gifts=<div className="btun-box">
                    <button className={"big-btun mobile "+item_style+ " "+font_family} style={mystyle}>Send Me a Gift</button>
                    <div className="icon mobile" style={mystyleForHightight}>
                        <CardGiftcardIcon/>
                    </div>
                    <button className={"buy mobile " + font_family} style={{backgroundColor:highlightColor,color:fontColor}}>View</button>
                </div>
          }      
          






        let category_master;
        category_master=this.state.category_master.map((link,i) =>{
        return (
                <Accordion>
                      {link.CM_Active_Status===1 ?   
                        <>                            
                            <div className="btun-box">                        
                                      <Accordion.Toggle style={mystyle} variant="link" eventKey={link.CM_ID} className={"big-btun folder-shadow mobile "+item_style} >
                                         <span style={nameStyle} className={font_family}><b><u>{link.CM_Folder_Title}</u></b></span>
                                            <p style={FolderSubStyle} className={font_family}>{link.CM_Folder_Sub_Title}  </p>
                                    </Accordion.Toggle> 
                                         <div className="icon mobile" style={{top:'30px'}} style={mystyleForHightightFolder}>
                                                                                 
                                                     {
                                                            (link.CM_Folder_Back_Image === null || link.CM_Folder_Back_Image === '') && (link.CM_Icon==='' || link.CM_Icon===null)?
                                                           <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                                            : (link.CM_Folder_Back_Image !== null || link.CM_Folder_Back_Image !== '') && link.CM_Icon===''?
                                                            <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.CM_Folder_Back_Image} />
                                                            : (link.CM_Icon!=='' || link.CM_Icon!==null) ?
                                                            <MDBIcon icon={link.CM_Icon}/>
                                                            :
                                                            <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                                      }
                                        </div>
                                    <Accordion.Collapse eventKey={link.CM_ID} id="payout"> 
                                        <>
                                        <div  className={"folder "+item_style}>
                                          {
                                                                                             
                                                this.state.linkMaster &&  this.state.linkMaster.map((lnk,i) =>(
                                                  lnk.LM_Url !== "" && lnk.LM_Folder_ID > 0 && lnk.LM_Folder_ID===link.CM_ID && lnk.LM_Active===1?
                                                  <div className="btun-box" >
                                                  <a className={"big-btun mobile "+item_style +" "+ font_family} href={lnk.LM_Url} target="_blank" style={mystyle}>{lnk.LM_Title}</a>
                                                  <div className="icon mobile" style={mystyleForHightight}>
                                                      {
                                                          lnk.LM_Image === '' && (lnk.LM_Icon==='' || lnk.LM_Icon===null) ?
                                                         <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                                          : lnk.LM_Image !== '' && lnk.LM_Icon===''  ?
                                                          <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + lnk.LM_Image} />
                                                          : lnk.LM_Icon !== '' && lnk.LM_Image===''  ?
                                                           <MDBIcon icon={link.LM_Icon}/>
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
       embed_content= this.state.embed_content &&  this.state.embed_content.map((link,i) =>{
         return (

                    link.LM_Url !== "" && link.LM_Folder_ID === 0 && link.LM_Active===1 ?  
                      <div className="btun-box mobile" >
                         <div className={"product-box "+item_style +" "+ font_family}>
                                 <Embed width={'100%'} url={link.LM_Url} />
                               
                    
                         </div>   
                   
                    </div>
                     :                            
                     null
         )
      })
    

    return (
           <>
         <div className="col-md-4">
                <div className="preview" id="previewbox">
                <div className="previewBtn" id="previewBtn"><span ><i className="fa fa-caret-up" id="previewUp" aria-hidden="true"></i></span> Preview</div>
                  <h4>Check out the live preview of your page below.</h4>
                  <div className="preview-mobile">
                        {this.state.showPage ?
                        <div className={"per-prop live"} data={bgImage} style={{backgroundImage:bgImage,backgroundColor:back_color}}>
                        <div className={cssClass}>  
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                    {/* <div className="per-prop-header">
                                            <button className="btun">Follow</button>
                                            <button className="btun_2"><ChatOutlinedIcon style={{ fontSize: 35 }}/></button>
                                    </div> */}
                                    <div className="per-prop-body mobile">
                                        {/* <div className={"overlay "} style={mystyle}>

                                        </div> */}
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
                                                  <p className={font_family} style={nameStyle}>{JM_Description}</p>
                                                 </div>
                                            
                                            <div className="per-prop-footer">
                                                <ul className="Social-links">
                                                    { JM_Social_Widget_Position==='top' ? SocialWidget : null}
                                                </ul>
                                            </div>
                                        <div className="button-part">

                                            {
                                                this.state.linkMaster &&  this.state.linkMaster.map((link,i) =>(
                                                  link.LM_Url !== "" && link.LM_Folder_ID === 0 && link.LM_Active===1?
                                                  <div className="btun-box" >
                                                    <a className={"big-btun mobile "+item_style+ " "+font_family} href={link.LM_Url} target="_blank" style={mystyleForCustomLink}>{link.LM_Title}</a>
                                                    <div className="icon mobile" style={mystyleForHightight}>
                                                        {
                                                            link.LM_Image === '' && (link.LM_Icon==='' || link.LM_Icon===null) ?
                                                              <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                                            : link.LM_Image !== '' && link.LM_Icon===''  ?
                                                                <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.LM_Image} />
                                                            : link.LM_Icon !== '' && link.LM_Image===''  ?
                                                               <MDBIcon icon={link.LM_Icon}/>
                                                            :
                                                               <img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} />
                                                        }
                                                    
                                                    </div>
                                                  </div>
                                                  :
                                                  null
                                              ))
                                            }
                                          {embed_content}
                                           
                                            {/* premium content */}
                                            {productList}
                                            {/* <div className="btun-box">
                                              <button className="big-btun mobile">I'll send you a video message</button>
                                              <div className="icon mobile"><PlayCircleOutlineIcon style={{ fontSize: 35 }}/></div>
                                              <button className="buy mobile">Buy</button>
                                            </div> */}

                                  {/* folder */}
                                  {category_master}
                                
                                  {gifts}  

                                            {/* <div className={"reg-box mobile "+ item_style}   style={mystyle}>
                                                <div className="heading mobile">
                                                    <p style={mystyle} className={font_family}>Get updates about me</p>
                                                </div>
                                                    <input type="text" className={"form-control mobile "+ item_style} placeholder="Your Name..."/>
                                                <div className="frm-btun">
                                                    <button className={"next-btun mobile "+ item_style +" "+ font_family} style={mystyleForHightight}>Next</button>
                                                    <a className={"log-btun mobile  "+ font_family}  style={mystyle}>Log in now</a>
                                                </div>
                                            </div> */}
                                        </div>
                                        </div>
                                    </div>
                                    <div className="per-prop-footer">
                                        <ul className="Social-links">
                                            { JM_Social_Widget_Position==='bottom' ? SocialWidget : null}
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="page-footer-logo mobile ">
                                        <img src={"images/Logo.png"} />
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                  <ul className="page-footer-link text-center" style={{color: fontColor }} >
                                      <li><a href="/" className={font_family} style={{color: fontColor }}  >Explore</a></li> |&nbsp; 
                                      <li><a href="/join" className={font_family} style={{color: fontColor }}>Create Page</a></li>
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
        </div>
      </>
    )
  }

}

export default LivePreview;