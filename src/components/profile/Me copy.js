import React, { Component } from 'react'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Nav, Navbar, Button, Spinner } from 'react-bootstrap';
import JoinModal from '../JoinModal';
import SignInModal from '../SignInModal';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Loader from '../pages/Loader';
import Embed from 'react-embed';
import Buy from '../premium/Buy';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import DoneIcon from '@material-ui/icons/Done';
// import {Custom} from '../../Custom';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Profile_Gift from './Profile_Gift';
import ImageIcon from '@material-ui/icons/Image';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import { Helmet } from 'react-helmet';
import { MDBIcon } from 'mdbreact';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Modal from 'react-bootstrap/Modal'
import Tipping from '../premium/Tipping';
import MetaTags from 'react-meta-tags';
import { render } from "react-dom";
// import { positions, Provider } from "react-alert";
// import {AlertTemplate} from "react-alert-template-basic";

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

    }
    console.log(this.props.Url);
  }

  doSomethingBeforeUnload = async (url) => {
    //alert('working');


    var JSONdata = {
      JM_Profile_Url: this.props.match.params.Url
    };

    const response = await fetch(url, {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(JSONdata)
    });
    const data = await response.json();
    console.log(data)
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
    var JSONdata = {
      JM_User_Profile_Url: user_url,
      livePreview: 0
    };
    const API_url = this.state.base_url + "admin/isExistUrl";
    const response = await fetch(API_url, {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(JSONdata)
    });
    const data = await response.json();
    if (data.status === 1) {
      this.setState({
        userDetails: data.userDetails,
        JM_Name: data.userDetails[0].JM_Name,
        linkMaster: data.linkMaster,
        themeMasterUser: data.themeMasterUser,
        socialWidget: data.socialWidget,
        category_master: data.category_master,
        category_links: data.category_links,
        embed_content: data.embed_content,
        productList: data.productList,
        gifts: data.gifts,
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
        console.log(url)
        url = url.replace(pathname, "/" + user_url);
        window.history.pushState('', '', url);
        this.setState({ showPage: true, showGiftPage: false });     

      }

    }
    else {
      this.setState({ showPage: false })
    }


    console.log(data)
  }

  Router = (url) => {
    window.history.pushState('', '', url);


  }


  doClick = (type, id) => e => {
    console.log(type + id)
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
        console.log(data);
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
  render() {

    // const options = {
    //   timeout: 5000,
    //   position: positions.BOTTOM_CENTER
    // };
    let imagePath = "";
    let base_url = this.state.base_url;
    let linkPath = ""; let JM_User_Profile_Url = "";
    let JM_User_Profile_Url_plus_JM_ID = "";
    let JM_Name, JM_Email, JM_Description = ''; let JM_Social_Widget_Position = "", JM_Verified = 0;

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
        break;
      }
    }
    var bgImage = "", fontColor = "", back_color = "";
    var font_family = "", cssClass = "", highlightColor = "", item_color = "", item_style = "",item_border_color="";
    if (this.state.themeMasterUser != null && this.state.themeMasterUser.length > 0) {
      let len = this.state.themeMasterUser.length;
      for (var j = 0; j < len; j++) {
        bgImage = 'url(' + process.env.REACT_APP_UPLOAD_URL + this.state.themeMasterUser[j].TM_Back_Image + ')';
        fontColor = this.state.themeMasterUser[j].TM_Font_Color
        back_color = this.state.themeMasterUser[j].TM_Back_Color;
        font_family = this.state.themeMasterUser[j].TM_Font;
        highlightColor = this.state.themeMasterUser[j].TM_Highlight_Color;
        cssClass = this.state.themeMasterUser[j].TM_Class_Name + " " + font_family;
        item_color = this.state.themeMasterUser[j].TM_Item_Color;
        item_style = this.state.themeMasterUser[j].TM_Item_Style;
        item_border_color=this.state.themeMasterUser[j].TM_Border_Color;
        break;
      }
    }
    const mystyle = {
      color: fontColor,
      // fontFamily: font_family,  
      backgroundColor: item_color,
      border:'1px solid '+ item_border_color
    };
    const nameStyle = {
      color: fontColor,
      // fontFamily: font_family

    };
    const FolderSubStyle = {
      color: fontColor,
      fontSize: '12px'
    };
    const FolderTitleStyle = {
      color: fontColor,
      fontSize: '16px'
    };
    const mystyleForHightight = {
      color: fontColor,
      backgroundColor: highlightColor
    };


    let tipping = <> <div className="btun-box" onClick={this.openSupportModal}>
      <button className={"big-btun " + item_style + " " + font_family} style={mystyle}>{"Support Me"}
      </button>
      <div className="icon ">
        <AttachMoneyIcon />
      </div>
    </div>
    </>







    //themeMasterUser
    let SocialWidget;

    if (this.state.socialWidget != null && this.state.socialWidget.length > 0) {
      SocialWidget = this.state.socialWidget.map((link, i) => {
        return (
          link.SWM_Active === 1 ?
            <li >
                 {
                          
                          link.SWM_Title==='Email' ?
                          <a href={"mailto:"+ link.SWM_Url} target="_blank">
                             <img src={process.env.REACT_APP_UPLOAD_URL+link.SWM_Icon}/>
                          </a>
                          :
                          <a href={link.SWM_Url} data-id={link.SWM_ID} target="_blank">
                            <img src={process.env.REACT_APP_UPLOAD_URL + link.SWM_Icon} onClick={this.doClick('S', link.SWM_ID)} />
                          </a>   
                        }

            
            </li>
            :
            null
        )
      })
    }

    let category_master;
    category_master = this.state.category_master.map((link, i) => {
      return (
        <Accordion data={link.CM_ID} onClick={this.doClick('C', link.CM_ID)}>
          {link.CM_Active_Status === 1 ?
            <>
              <div className="btun-box" >

                <Accordion.Toggle style={mystyle} variant="link" eventKey={link.CM_ID} className={"big-btun folder-shadow " + item_style}>
                  <span style={nameStyle} className={font_family}><b><u>{link.CM_Folder_Title}</u></b></span>
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
                    <div className={"folder " + item_style} >
                      {


                        this.state.linkMaster && this.state.linkMaster.map((lnk, i) => (
                          lnk.LM_Url !== "" && lnk.LM_Folder_ID > 0 && lnk.LM_Folder_ID === link.CM_ID && lnk.LM_Active === 1 ?
                            <div className="btun-box" onClick={this.doClick('L', lnk.LM_ID)}>
                              <a className={"big-btun " + item_style + " " + font_family} href={lnk.LM_Url} target="_blank" style={mystyle}>{lnk.LM_Title}</a>
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
          <div className="btun-box" onClick={this.doClick('E', link.EC_ID)}>
            {/* <a className={"big-btun "+item_style+ " "+font_family} href={link.LM_Url} target="_blank" style={mystyle}>Follow Me on {link.LM_Title}</a> */}
            <div className={"product-box " + item_style + font_family}>
              <Embed url={link.LM_Url} />
            </div>
          </div>
          :
          null
      )
    })
    let productList;
    if (this.state.productList != null && this.state.productList.length > 0) {
      productList = this.state.productList.map((link, i) => {
        return (
          link.DA_Active === 1 ?
            <div className="btun-box" >
              <button className={"big-btun " + item_style + " " + font_family} style={mystyle}>{link.DA_Title}
                {
                  // link.DA_INR_Doller==='INR' ?
                  //       " (Rs." + link.DA_Price+")"
                  // :
                  //       " ($" + link.DA_Price+")"
                }

              </button>
              <div className="icon " style={mystyleForHightight}>
                {
                  link.DA_Type === 'video' ?
                    <PlayCircleOutlineIcon />
                    :
                    null
                }
                {
                  link.DA_Type === 'audio' ?
                    <AudiotrackIcon />
                    :
                    null
                }
                {
                  link.DA_Type === 'image' ?
                    <ImageIcon />
                    :
                    null
                }
                {
                  link.DA_Type === 'NA' ?
                    <CameraAltOutlinedIcon />
                    :
                    null
                }
                {/* /DescriptionOutlinedIcon import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined'; */}
                {
                  link.DA_Type === 'txt' ?

                    <DescriptionOutlinedIcon />
                    :
                    null
                }
                {
                  link.DA_Type === 'pdf' ?

                    <PictureAsPdfOutlinedIcon />
                    :
                    null
                }

              </div>
              <Buy font_family={font_family} productList={this.state.productList[i]} mystyleForHightight={mystyleForHightight} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} userDetails={this.state.userDetails} />
              
            </div>
            :
            null
        )
      })
    }
    let gifts;
    if (this.state.gifts !== null && this.state.gifts.length > 0) 
    {
      gifts = <div class="btun-box">
        <button className={"big-btun " + item_style + " " + font_family} style={mystyle}>Send Me a Gift</button>
        <div class="icon" style={mystyleForHightight}>
          <CardGiftcardIcon />
        </div>
        <a className={"buy "+  font_family} style={{ backgroundColor: highlightColor, color: fontColor }} gifts={this.state.gifts} href={"/" + JM_User_Profile_Url + "/gift"}>View</a>
      </div>
    }


    return (
      <>
{
   this.state.showPage ?
    <Helmet>
         <title>{JM_Name + ' | Expy'}</title>  
         <meta name="description" content={"Everything about "+JM_Name+" in one place. Follow and Connect with " +JM_Name}/>
        {/* <meta property="og:image:type" content="image/jpeg"/>
        <meta property="og:image:width" content="200"/>
        <meta property="og:image:height" content="200"/>
        <meta property="og:title" content={JM_Name + ' | Expy'}/>           */}
        {/* <meta id="og-image" property="og:image" content={imagePath} />
        <meta name="description" content={"Everything about "+JM_Name+" in one place. Follow and Connect with " +JM_Name}/>
        <meta name="keywords" content= {"expy"} />
        <meta property="og:description" content={"Everything about "+JM_Name+" in one place. Follow and Connect with " +JM_Name}/> */}
         {/* <meta property="og:url" content={process.env.REACT_APP_API_URL+JM_User_Profile_Url}/> */}
        
     </Helmet> 

     :
     this.state.showGiftPage ?
     <Helmet>
     <title>{JM_Name + '- Gift | Expy'}</title>
        <meta id="meta-description" name="description" content={"All Gifts and Donation  in one place. Follow and Connect with " +JM_Name} />
            
            {/* <meta property="og:image:type" content="image/jpeg"/>
            <meta property="og:image:width" content="200"/>
            <meta property="og:image:height" content="200"/>
            <meta property="og:title" content={JM_Name + '- Gift  | Expy'}/>           */}
            {/* <meta id="og-image" property="og:image" content={imagePath} />
            <meta property="og:description" content={"All Gifts and Donation in one place. Follow and Connect with " +JM_Name}/> */}
            {/* <meta property="og:url" content={process.env.REACT_APP_API_URL+JM_User_Profile_Url+"/gift"}/> */}
     </Helmet>
     :
     null
    //  <center><h1>Profile Not Found</h1></center>
}
       
        {
          this.state.showPage
            ? 
            
          <div className="per-prop" data={bgImage} style={{backgroundImage:bgImage,backgroundColor:back_color}}>
            <div className={cssClass}>  
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2">                
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
                              
                              <p className={font_family} style={nameStyle}>{JM_Description}</p>
                          </div>
                           <div className="per-prop-footer">
                            <ul className="Social-links">
                                { JM_Social_Widget_Position==='top' ? SocialWidget : null}
                            </ul>
                          </div>
                        <div className="button-part">

                        {/* {
                        
                        tipping
                        }         */}

                        {
                           this.state.linkMaster &&  this.state.linkMaster.map((link,i) =>(
                            link.LM_Url !== "" && link.LM_Folder_ID === 0 && link.LM_Active===1?
                              <div className="btun-box" onClick={this.doClick('L',link.LM_ID)}>
                              <a className={"big-btun "+item_style +" "+ font_family} href={link.LM_Url} target="_blank" style={mystyle}>{link.LM_Title}</a>
                              <div className="icon" style={mystyleForHightight}>
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
                        {productList}                             
                        {category_master}  

                        {gifts}         

                        {/* <div className={"reg-box "+ item_style}   style={mystyle}>
                              <div className="heading" >
                                  <p style={mystyle} className={font_family}>Get updates about me</p>
                              </div>
                                  <input type="text" className={"form-control "+ item_style + font_family} placeholder="Enter your e-mail address"/>
                              
                                  <button className={"next-btun "+ item_style +" "+ font_family} style={mystyleForHightight}>Submit</button>
                                  <a className={"log-btun  "+ font_family}  style={mystyle}>Log in now</a>
                              
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
                <div className="col-md-4 offset-md-2">
                  <div className="page-footer-logo">
                      <a href="/"><img src="Logo.png"></img></a>
                  </div>
                </div>
                <div className="col-md-4">
                  <ul className="page-footer-link " style={{color: fontColor }} >
                      <li><Link to="/" className={font_family} style={{color: fontColor }}  >Explore</Link></li> |&nbsp; 
                      <li><Link to="/join" className={font_family} style={{color: fontColor }}>Create Page</Link></li>
                    </ul>
                </div>
              </div>  
            </div>
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
              <Spinner />
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