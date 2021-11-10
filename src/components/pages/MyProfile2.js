import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import FooterClass from '../header_footer/FooterClass';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import ShareIcon from '@material-ui/icons/Share';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfileNav from './ProfileNav';
import ProfileHeader from '../header_footer/ProfileHeader';
import Collapse from 'react-bootstrap/Collapse';
import EditLinks from './EditLinks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ToastAlert from './ToastAlert';
import { withRouter } from "react-router";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import VideocamIcon from '@material-ui/icons/Videocam';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as queryString from 'query-string';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import EditSocialWidget from './EditSocialWidget';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import OpenWithSharpIcon from '@material-ui/icons/OpenWithSharp';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import { ProgressBar } from 'react-bootstrap';
import EditLinks2 from './EditLinks2';
import { MDBIcon } from 'mdbreact';
import LivePreview2 from './LivePreview2';
import AddNewLink2 from './AddNewLink2';
import cryptoRandomString from 'crypto-random-string';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import StackedLink2 from './StackedLink2';
import EditStackedLink2 from './EditStackedLink2';
import SocialWidget2 from './SocialWidget2';
import EditSocialWidget2 from './EditSocialWidget2';
import EmbedContent2 from './EmbedContent2';
import EditEmbedContent2 from './EditEmbedContent2';
import EditPremiumFeature2 from './EditPremiumFeature2';
import EditUnlockContent2 from '../premium/EditUnlockContent2';
import EditPopGift2 from '../premium/EditPopGift2';
import EditSupportMe2 from '../premium/EditSupportMe2';

import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import { Helmet } from "react-helmet";
import EventIcon from '@material-ui/icons/Event';

import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
//social sharing 
//import ShareBtn from 'react-share-button';
//import "react-share-button/dist/ShareBtn"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  RedditShareButton,
  EmailShareButton,
} from 'react-share';

import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  EmailIcon,
} from 'react-share';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ExplicitIcon from '@material-ui/icons/Explicit';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import API from '../services/API';
import EditDigitalEcommerce from '../premium/EditDigitalEcommerce';
import EditContestGiveAway from '../premium/EditContestGiveAway';
import ContestReport from '../premium/ContestReport';
import LockOpenIcon from '@material-ui/icons/LockOpen';


class MyProfile extends Component 
{
  url = '';
  constructor(props) {
    super(props)
    this.state = {
      JM_Email: localStorage.getItem('JM_Email'),
      JM_ID: parseInt(localStorage.getItem('JM_ID')),
      linkMaster: [],
      userDetailsAll: [],
      directAccess: [],
      productList: [],
      category_master: [],
      socialWidget: [],
      category_links: [],
      embed_content: [],
      gifts: [],
      isLoggedIn: false,
      JM_Name: '',
      JM_Url: '',
      JM_Profile_Pic: '',
      JM_User_Profile_Url: localStorage.getItem('JM_User_Profile_Url'),
      base_url: process.env.REACT_APP_API_URL,
      root_url: process.env.REACT_APP_ROOT_URL,
      ProfilePath: 'Profile/',
      linkPath: '',
      ProfileimagePath: '',
      open: false,
      isChecked: false,
      value: '',
      copied: false,
      checkedBoxes: [],
      colapseBoxes: [],
      checkedBoxesFolder: [],
      title: '',
      msg: '',
      logo: '',
      show: false,//for toast
      confirm: false,
      selectedFile: null,
      openEditURLModal: false,
      Validation: true,
      openDynamic: false,
      isLoading: false,
      openMoveLinkModel: false,
      radio: 0,
      LM_ID_Move: 0,
      JM_ID_Move: 0,
      CM_ID_Move: 0,
      uploadPercentage: 0,
      avatar: '',
      isBlocked: 0,
      inProgess: true,

      src: null,
      crop: {
        unit: "px",
        width: 100,
        aspect: 1 / 1
      },
      croppedImageUrl: null,
      openCropModal: false,
      openSocialModal: false,
      referralCode: [],
      old_url: '',
      //MS2
      activeNameBio_color: '#000000',
      isCompletedUrlProcessing: false,
      btnRequest: 'Change',

      JM_NewsLetter_Active: 0,
      JM_NewsLetter_Title: '',
      showNewsModal: false,
      //walk thrrough
      JM_Steps: 1,
      openRefModal: false,
      isValidRefCode: false,
      JM_Referral_Code: '',
      leftIcon: '<',
      rightIcon: '>',
      JM_Gift_Title:'Send me a gift',
      JM_Gift_Active:0,
      openSocialTitleModal:false,
      JM_Checkout_My_Social:'Check out my socials',
      authorization:window.token,
    }
    //console.log(this.props.location.search)

  }
  componentDidMount() {
    //$('#JM_Description').on('input', function() {
    // $('#res').html(this.value.replace(/\r?\n/g, '<br>'));
    //})
    //API.isActive();
    this.validateSession();
    this.Get_User_Details();
  }

  
  //===starting of crop image

  handleFile = e => {
    const fileReader = new FileReader()
    if (e.target.files !== null && e.target.files.length > 0) {
      fileReader.onloadend = () => {
        this.setState({ src: fileReader.result })
      }
      fileReader.readAsDataURL(e.target.files[0])
      this.setState({ openCropModal: true })
    }
  }

  onImageLoaded = image => {
    this.imageRef = image
  }

  onCropChange = (crop) => {
    this.setState({ crop });
  }

  onCropComplete = crop => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop)
      this.setState({ croppedImageUrl })
    }
  }

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const reader = new FileReader()
    canvas.toBlob(blob => {

      let r = cryptoRandomString({ length: 30 });
      //console.log("random", r);
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, r + '.jpg')
      }
    })
  }
  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage: croppedImage })
  }
  //===end of crop image


  validateSession() {

    const urlParams = queryString.parse(window.location.search);
    const code = urlParams.code;  
    localStorage.setItem('token', code);
    var JM_ID = parseInt(localStorage.getItem('JM_ID'));

    API.autoLogout();

    if (isNaN(JM_ID) || JM_ID === 0 || JM_ID === null) {
      // if (typeof code === "undefined") 
      // {
      localStorage.setItem('JM_Email', "");
      localStorage.setItem('JM_ID', 0);
      window.location.href = '/';
      // }
      // else 
      // {
      // let token = this.getAccessTokenFromCode(code);
      //this.getFacebookUserData(token);

      // }


    }
    //else  if (code !== 'undefined') 
    //{
    //     axios.post('https://api.instagram.com/oauth/access_token', queryString.stringify({
    //     client_id: '480886739775031',
    //     client_secret: '8208035d75f168409c41a05a1d81fe77',
    //     grant_type: 'authorization_code',
    //     redirect_uri: process.env.REACT_APP_API_URL+'me',
    //     code: code
    //     }))
    //     .then(response => {
    //         //console.log(response.data) 
    //         var token=response.data.access_token;
    //         var user_id=response.data.user_id;
    //         var url="https://graph.instagram.com/"+user_id+"?fields=id,username&access_token="+token;

    //               axios.get(url)
    //               .then(function (response) {                 
    //                 //console.log(response);
    //               })
    //               .catch(function (error) {        
    //                 //console.log(error);
    //               })
    //               .then(function () {               
    //               });
    //       })
    //     .catch(error => {
    //         //console.log(error)
    //     })
    // }



  }

  async getAccessTokenFromCode(code) {

    const { data } = await axios({
      url: 'https://graph.facebook.com/v4.0/oauth/access_token',
      method: 'get',
      params: {
        client_id: process.env.REACT_APP_FACEBOOK_APP_ID,
        client_secret: process.env.REACT_APP_Secret_Key,
        redirect_uri: process.env.REACT_APP_API_URL + 'me',
        code,
      },
    });
    //console.log(data); // { access_token, token_type, expires_in }
    //return data.access_token;
    this.getFacebookUserData(data.access_token);
  }
  async getFacebookUserData(access_token) {
    //console.log(access_token);

    const { data } = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        fields: ['id', 'email', 'first_name', 'last_name'].join(','),
        access_token: access_token,
      },
    });
    //console.log(data.email); // { id, email, first_name, last_name }


    if (data != null && data.email.length > 0 && data.id.length > 0) {
      let API_url = process.env.REACT_APP_API_URL + "admin/socialLogin";
      // var JSONdata  = {           
      //     JM_Email:this.state.JM_Email,
      //     JM_Password:this.state.JM_Password              
      //   };	
      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(data)
      }).then(function (response) {
        return response.json();
      }).then(result => {
        if (result.status === 1) {
          //console.log(data.msg);
          localStorage.setItem('JM_ID', result.JM_ID);
          localStorage.setItem('JM_Email', data.email);
          this.Get_User_Details();
        }
        else {
          //console.log("failed to insert or fetch")
          localStorage.setItem('JM_Email', "");
          localStorage.setItem('JM_ID', 0);
          window.location.href = '/';
        }
      });

    }

    // return data;
  };

  async Get_User_Details() {
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
        userDetails: data.userDetails,
        themeMasterUser: data.themeMasterUser,
        socialWidget: data.socialWidget,
        gifts: data.gifts,
        category_master: data.category_master,
        JM_Name: data.userDetails[0].JM_Name,
        JM_Description: data.userDetails[0].JM_Description,
        isBlocked: data.userDetails[0].isBlocked,
        Ref_Code: data.userDetails[0].JM_User_Profile_Url + "-" + data.userDetails[0].JM_ID,
        old_url: data.userDetails[0].JM_User_Profile_Url,
        TM_Bio_Color: data.themeMasterUser[0].TM_Bio_Color,
        TM_Name_Color: data.themeMasterUser[0].TM_Name_Color,
        TM_Footer_Color: data.themeMasterUser[0].TM_Footer_Color,
        activeNameBio_color: data.themeMasterUser[0].TM_Bio_Color,
        JM_NewsLetter_Title: data.userDetails[0].JM_NewsLetter_Title,
        JM_NewsLetter_Active: data.userDetails[0].JM_NewsLetter_Active,
        JM_Gift_Active:data.userDetails[0].JM_Gift_Active,
        JM_Steps: data.userDetails[0].JM_Steps,
        JM_Gift_Title:data.userDetails[0].JM_Gift_Title,
        JM_Checkout_My_Social:data.userDetails[0].JM_Checkout_My_Social,
      });

      this.Update_ReferralCode(this.state.Ref_Code);

      if(this.state.JM_Steps===0)
         this.setState({ open: true })
      //console.log("myprofile2")
      //console.log(data)

    }

    if (this.state.isBlocked === 1) 
    {
      window.location.href = process.env.REACT_APP_ROOT_URL;
    }
    this.setCheckBoxes();
    //console.log(data);

  }
  //MS2
  Update_ReferralCode = (original_code) => {
    var id = parseInt(localStorage.getItem('JM_ID'));

    var JSONdata = {
      JM_ID: id,
      Code: this.state.Ref_Code
    };
    const API_url = process.env.REACT_APP_API_URL + "admin/Update_ReferralCode";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        //console.log(data)
      });

  }
  openModal = () => {
    !this.state.open ?
      this.setState({ open: true })
      :
      this.setState({ open: false })

  }

  doDeleteLink = e => {
    // var id=document.getElementById('hidden').value;
    const LM_ID = e.currentTarget.dataset.remove;
    var JSONdata = {
      LM_ID: LM_ID
    };
    const API_url = this.state.base_url + "admin/deleteLink";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.refreshMobileView();
        }
        else
          alert('not fetch');
      });
  }
  //doDeleteLinkSocial
  doDeleteLinkSocial = e => {
    // var id=document.getElementById('hidden').value;
    const SWM_ID = e.currentTarget.dataset.remove;
    var JSONdata = {
      SWM_ID: SWM_ID
    };
    const API_url = this.state.base_url + "admin/deleteLinkSocial";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.refreshMobileView();
        }
        else
          alert('not fetch');
      });
  }

  doDeleteCategory = e => {
    // var id=document.getElementById('hidden').value;
    const CM_ID = e.currentTarget.dataset.remove;
    var JSONdata = {
      CM_ID: CM_ID,
      JM_ID: this.state.JM_ID
    };
    const API_url = this.state.base_url + "admin/deleteCategory";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json","authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.refreshMobileView();
        }
        else
          alert('not fetch');
      });
  }
  doDeleteEmbed = e => {
    const EC_ID = e.currentTarget.dataset.remove;
    var JSONdata = {
      EC_ID: EC_ID
    };
    const API_url = this.state.base_url + "admin/deleteEmbed";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.refreshMobileView();
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'profile is updated',
            // isLoading:true   
          });
        }
        else
          alert('not fetch');
      });
  }

  setStateAfterInsert = (currentState) => {
    this.setState({
      userDetailsAll: currentState.userDetailsAll,
      themeMasterUser: currentState.themeMasterUser,
      userDetails: currentState.userDetails,
      socialWidget: currentState.socialWidget,
      gifts: currentState.gifts,
      category_master: currentState.category_master,
      show: true,
      title: currentState.title,
      msg: currentState.msg,
    });
    this.refreshMobileView();
    this.setCheckBoxes();
  }
  setCheckBoxes = () => {
    var checkedBoxes = [];
    if (this.state.userDetailsAll != null && this.state.userDetailsAll.length > 0) {
      let len = this.state.userDetailsAll.length;
      for (var j = 0; j < len; j++) {
        if (this.state.userDetailsAll[j].ItemType === 'customlink') {
          if (this.state.userDetailsAll[j].activeInactive === 1) {
            checkedBoxes.push(this.state.userDetailsAll[j]);
          }
          else {
            // const index = checkedBoxes.findIndex((ch) => (ch.tableId === this.state.userDetailsAll[j].tableId && ch.ItemType= === 'customlink');     
            const index = checkedBoxes.findIndex(element => element.tableId === this.state.userDetailsAll[j].tableId && element.ItemType === 'customlink');
            // document.getElementById('lnk_item_' + this.state.userDetailsAll[j].tableId +"_"+ this.state.userDetailsAll[j].ItemType).style.opacity = '0.5';
          }
        }
        if (this.state.userDetailsAll[j].ItemType === 'category') {
          if (this.state.userDetailsAll[j].activeInactive === 1) {
            checkedBoxes.push(this.state.userDetailsAll[j]);
          }
          else {
            // const index = checkedBoxes.findIndex((ch) => (ch.tableId === this.state.userDetailsAll[j].tableId && ch.ItemType= === 'customlink');     
            const index = checkedBoxes.findIndex(element => element.tableId === this.state.userDetailsAll[j].tableId && element.ItemType === 'category');
            // document.getElementById('lnk_item_' + this.state.userDetailsAll[j].tableId +"_"+ this.state.userDetailsAll[j].ItemType).style.opacity = '0.5';
          }
        }
        if (this.state.userDetailsAll[j].ItemType === 'embedcontent') {
          if (this.state.userDetailsAll[j].activeInactive === 1) {
            checkedBoxes.push(this.state.userDetailsAll[j]);
          }
          else {
            // const index = checkedBoxes.findIndex((ch) => (ch.tableId === this.state.userDetailsAll[j].tableId && ch.ItemType= === 'customlink');     
            const index = checkedBoxes.findIndex(element => element.tableId === this.state.userDetailsAll[j].tableId && element.ItemType === 'embedcontent');
            // document.getElementById('lnk_item_' + this.state.userDetailsAll[j].tableId +"_"+ this.state.userDetailsAll[j].ItemType).style.opacity = '0.5';
          }
        }
        if (this.state.userDetailsAll[j].ItemType === 'premium' || this.state.userDetailsAll[j].ItemType === 'carousel') {
          if (this.state.userDetailsAll[j].activeInactive === 1) {
            checkedBoxes.push(this.state.userDetailsAll[j]);
          }
          else {
            const index = checkedBoxes.findIndex(element => element.tableId === this.state.userDetailsAll[j].tableId && element.ItemType === 'premium');
          }
        }
        if (this.state.userDetailsAll[j].ItemType === 'socialBar') {
          if (this.state.userDetailsAll[j].activeInactive === 1) {
            checkedBoxes.push(this.state.userDetailsAll[j]);
          }
          else {
            const index = checkedBoxes.findIndex(element => element.tableId === this.state.userDetailsAll[j].tableId && element.ItemType === 'socialBar');
          }
        }
      }
    }
    if (this.state.socialWidget != null && this.state.socialWidget.length > 0) {
      let len = this.state.socialWidget.length;
      for (var k = 0; k < len; k++) {
        if (this.state.socialWidget[k].SWM_Active === 1 && this.state.socialWidget[k].SWM_Style_Type === 'W') {
          checkedBoxes.push(this.state.socialWidget[k]);

        }
        else {
          const index = checkedBoxes.findIndex((ch) => ch.SWM_ID === this.state.socialWidget[k].SWM_ID);
          //document.getElementById('lnk_item_' + this.state.socialWidget[k].SWM_ID).style.opacity = '0.5';
        }

      }
    }


    if (this.state.JM_NewsLetter_Active === 1) 
    {
      checkedBoxes.push({ creatorId: this.state.JM_ID, JM_NewsLetter_Title: this.state.JM_NewsLetter_Title,JM_NewsLetter_Active:this.state.JM_NewsLetter_Active });
    }
    // else 
    // {
    //   const index = checkedBoxes.findIndex((ch) => ch.creatorId === this.state.JM_ID);
    // }
    if (this.state.JM_Gift_Active === 1) 
    {
      checkedBoxes.push({ creatorId: this.state.JM_ID, JM_Gift_Title: this.state.JM_Gift_Title ,JM_Gift_Active:this.state.JM_Gift_Active});
    }
    // else 
    // {
    //   const index = checkedBoxes.findIndex((ch) => ch.creatorId === this.state.JM_ID);
    // }


    this.setState({
      checkedBoxes
    });

    //console.log(this.state.checkedBoxes)
  }

  doCopy = () => {
    /* Get the text field */
    var copyText = document.getElementById("copy_text").innerText;
    alert("Copied the text: " + copyText);
  }
  doOut = () => {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
  }
  doActive = item => e => {

    const checkedBoxes = [...this.state.checkedBoxes];
    let LM_Active = 0;
    if (e.target.checked) {
      checkedBoxes.push(item);
      LM_Active = 1;
      // document.getElementById('lnk_item_' + item.tableId+"_"+item.ItemType).style.opacity = '1';
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.tableId === item.tableId);
      checkedBoxes.splice(index, 1);
      //document.getElementById('lnk_item_' + item.tableId+"_"+item.ItemType).style.opacity = '0.5';
    }
    this.setState({ checkedBoxes });

    var JSONdata = {
      LM_ID: item.tableId,
      LM_Active: LM_Active
    };

    const API_url = this.state.base_url + "admin/updateActiveLink";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            // isLoading:true   
          });
          this.refreshMobileView();


        }
        else {
          this.setState({
            show: true,
            title: 'error!!!',
            msg: 'Profile is not updated',
            // isLoading:true   
          });
        }
      });


  }
  doActiveCategoryMaster = item => e => {

    const checkedBoxes = [...this.state.checkedBoxes];
    let CM_Active_Status = 0;
    if (e.target.checked) {
      checkedBoxes.push(item);
      CM_Active_Status = 1;
      // document.getElementById('lnk_item_' + item.tableId+"_"+item.ItemType).style.opacity = '1';
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.tableId === item.tableId);
      checkedBoxes.splice(index, 1);
      //  document.getElementById('lnk_item_' + item.tableId+"_"+item.ItemType).style.opacity = '0.5';
    }
    this.setState({ checkedBoxes });

    var JSONdata = {
      CM_ID: item.tableId,
      CM_Active_Status: CM_Active_Status
    };

    const API_url = this.state.base_url + "admin/updateActiveCategory";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            // isLoading:true   
          });
          this.refreshMobileView();


        }
        else {
          this.setState({
            show: true,
            title: 'error!!!',
            msg: 'Profile is not updated',
            // isLoading:true   
          });
        }
      });


  }
  doActiveEmbed = item => e => {

    const checkedBoxes = [...this.state.checkedBoxes];
    let LM_Active = 0;
    if (e.target.checked) {
      checkedBoxes.push(item);
      LM_Active = 1;
      // document.getElementById('lnk_item_' + item.tableId).style.opacity = '1';
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.tableId === item.tableId);
      checkedBoxes.splice(index, 1);
      //document.getElementById('lnk_item_' + item.tableId).style.opacity = '0.5';
    }
    this.setState({ checkedBoxes });

    var JSONdata = {
      EC_ID: item.tableId,
      LM_Active: LM_Active
    };

    const API_url = this.state.base_url + "admin/updateActiveEmbed";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            // isLoading:true   
          });
          this.refreshMobileView();


        }
        else {
          this.setState({
            show: true,
            title: 'error!!!',
            msg: 'Profile is not updated',
            // isLoading:true   
          });
        }
      });


  }
  doActiveSocialWidget = item => e => {
    this.setState({
      // isLoading:true   
    });
    const checkedBoxes = [...this.state.checkedBoxes];
    let SWM_Active = 0;
    if (e.target.checked) {
      checkedBoxes.push(item);
      SWM_Active = 1;
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.SWM_ID === item.SWM_ID);
      checkedBoxes.splice(index, 1);
    }
    this.setState({ checkedBoxes });

    var JSONdata = {
      SWM_ID: item.SWM_ID,
      SWM_Active: SWM_Active
    };

    const API_url = this.state.base_url + "admin/updateActiveLinkSocial";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {

          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            // isLoading:true   
          });
          this.refreshMobileView();

          //this.reload();
          // alert(data.msg);
          this.setState({
            // isLoading:false   
          });
        }
        else {
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Failed to Update'
          });

        }
      });
  }

  //MS2
  doActiveSocialBar = item => e => {

    const checkedBoxes = [...this.state.checkedBoxes];
    let SWM_Active = 0;
    if (e.target.checked) {
      checkedBoxes.push(item);
      SWM_Active = 1;
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.tableId === item.tableId);
      checkedBoxes.splice(index, 1);
    }
    this.setState({ checkedBoxes });

    var JSONdata = {
      SWM_ID: item.tableId,
      SWM_Active: SWM_Active
    };

    const API_url = this.state.base_url + "admin/updateActiveLinkSocial";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {

          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            // isLoading:true   
          });
          this.refreshMobileView();

          //this.reload();
          // alert(data.msg);
          this.setState({
            // isLoading:false   
          });
        }
        else {
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Failed to Update'
          });

        }
      });
  }
  //newsletter
  doActiveNewsLetter = id => e => {
    const checkedBoxes = [...this.state.checkedBoxes];
    let JM_NewsLetter_Active = 0;
    if (e.target.checked) {
      checkedBoxes.push({ JM_ID: id, JM_NewsLetter_Active: 1 });
      JM_NewsLetter_Active = 1;
    }
    else {
      const index = checkedBoxes.findIndex((ch) => ch.JM_ID === id);
      checkedBoxes.splice(index, 1);
    }
    this.setState({ checkedBoxes });
    var JSONdata = {
      JM_ID: id,
      JM_NewsLetter_Active: JM_NewsLetter_Active,
      JM_NewsLetter_Title: '',
      type: 'active'
    };

    const API_url = this.state.base_url + "admin/updateActiveNewsLetter";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {

          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
          });
          this.refreshMobileView();
        }
        else {
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Failed to Update'
          });

        }
      });

  }
//13-jul-2021
doActiveVartualGift = id => e => {
  const checkedBoxes = [...this.state.checkedBoxes];
  let JM_Gift_Active = 0;
  if (e.target.checked) {
    checkedBoxes.push({ JM_ID: id, JM_Gift_Active: 1 });
    JM_Gift_Active = 1;
  }
  else {
    const index = checkedBoxes.findIndex((ch) => ch.JM_ID === id && ch.JM_Gift_Active===1);
    checkedBoxes.splice(index, 1);
  }
  this.setState({ checkedBoxes });
  var JSONdata = {
    JM_ID: id,
    JM_Gift_Active: JM_Gift_Active,
    JM_Gift_Title: '',
    type: 'active'
  };

  const API_url = this.state.base_url + "admin/updateActiveVartualGift";
  fetch(API_url,
    {
      method: 'post',
      headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
      body: JSON.stringify(JSONdata)
    })
    .then((response) => response.json())
    .then(data => {
      if (data.status === 1) {

        this.setState({
          show: true,
          title: 'Success!!!',
          msg: 'Profile is updated',
        });
        this.refreshMobileView();
      }
      else {
        this.setState({
          show: true,
          title: 'Success!!!',
          msg: 'Failed to Update'
        });

      }
    });

}
EditGiftTitle=e=>{
  this.setState({
    showTitleModal:true
  })
 }
updateGiftTitle=id=>async e=>{
 

  document.getElementById('msg_title').innerHTML=''; document.getElementById('msg_title').style.color='red';
  if(this.state.JM_Gift_Title.length===0)
  {
    document.getElementById('msg_title').innerHTML='Empty Title';
    return false;
  }
  var data=await API.updateJoiningMaster(this.state.JM_Gift_Title,'JM_Gift_Title',this.state.JM_ID)  
  if (data.status === 1) 
  {
    document.getElementById('msg_title').style.color='green';
    document.getElementById('msg_title').innerHTML='Title is updated';
    //this.Get_User_Details();
    this.refreshMobileView();
  }
  else
  {
    document.getElementById('msg_title').style.color='red';
    document.getElementById('msg_title').innerHTML='Internal error, try again later'
  }
}
updateCheckoutSocialTitle=id=>async e=>{ 

  document.getElementById('msg_social').innerHTML='';document.getElementById('msg_social').style.color='red';
  if(this.state.JM_Checkout_My_Social.length===0)
  {
    document.getElementById('msg_social').innerHTML='Empty Title';
    return false;
  }
  var data=await API.updateJoiningMaster(this.state.JM_Checkout_My_Social,'JM_Checkout_My_Social',this.state.JM_ID)  
  if (data.status === 1)
  {
    document.getElementById('msg_social').style.color='green';
    document.getElementById('msg_social').innerHTML='Title is updated';
    this.Get_User_Details();
    this.refreshMobileView();
    
  }
  else
  {
    document.getElementById('msg_social').style.color='red';
    document.getElementById('msg_social').innerHTML='Internal error, try again later';
  }
}

//

  doActivePremium = item => e => {

    const checkedBoxes = [...this.state.checkedBoxes];
    let DA_Active = 0;
    if (e.target.checked) {
      checkedBoxes.push(item);
      DA_Active = 1;
      //document.getElementById('lnk_item_' + item.tableId).style.opacity = '1';
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.tableId === item.tableId);
      checkedBoxes.splice(index, 1);
      //document.getElementById('lnk_item_' + item.tableId).style.opacity = '0.5';
    }
    this.setState({ checkedBoxes });

    var JSONdata = {
      DA_ID: item.tableId,
      DA_Active: DA_Active
    };

    const API_url = this.state.base_url + "admin/updateActivePremium";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            // isLoading:true   
          });
          this.refreshMobileView();


        }
        else {
          this.setState({
            show: true,
            title: 'error!!!',
            msg: 'Profile is not updated',
            // isLoading:true   
          });
        }
      });

  }

  showToast = () => {
    this.setState({ show: true })
  }
  hideToast = () => {
    this.setState({ show: false })
  }

  DirectAccess = () => {

    let JM_ID = 0; let JM_User_Profile_Url = ""; let JM_Referral = "NA";
    if (this.state.userDetails != null && this.state.userDetails.length > 0) {
      JM_ID = this.state.userDetails[0].JM_ID;
      JM_User_Profile_Url = this.state.userDetails[0].JM_User_Profile_Url;
      JM_Referral = this.state.userDetails[0].JM_Referral;
    }
    // if(JM_Referral==='NA')
    // {
    //   this.setState({
    //     openRefModal:true
    //   })
    //   return false;
    // }
    //if(JM_Referral!=='NA')
    // {
    this.props.history.push("/premium-feature");
    this.props.history.push({
      state: {
        directAccess: this.state.directAccess,
        JM_ID: JM_ID,
        JM_User_Profile_Url: JM_User_Profile_Url,
      }
    })
    //}

    //console.log(this.props);
  }
  //23-jun-2021
  ImageCarousel = (e) => {
    let JM_ID = 0; let JM_User_Profile_Url = ""; let JM_Referral = "NA";
    if (this.state.userDetails != null && this.state.userDetails.length > 0) {
      JM_ID = this.state.userDetails[0].JM_ID;
      JM_User_Profile_Url = this.state.userDetails[0].JM_User_Profile_Url;
      JM_Referral = this.state.userDetails[0].JM_Referral;
    }
    this.props.history.push("/create-carousel");
    this.props.history.push({
      state: {
        directAccess: this.state.directAccess,
        JM_ID: JM_ID,
        JM_User_Profile_Url: JM_User_Profile_Url,
      }
    })
  }


  EmbedContent = () => {

  }
  doCopied = (e) => {
    //  document.getElementById("copy_icon").compareDocumentPosition
    //e.target.innerHTML = 'Copied';
    //  e.target.style.background = 'black';
    document.getElementById("copy_icon").style.color = 'black';

  }

  deleteGift = (e) => {
    const DA_ID = e.currentTarget.dataset.remove;
    const type = e.currentTarget.dataset.type;
    let ProfileUrl = e.currentTarget.dataset.profileurl;
    var JSONdata;
    var fileName = e.currentTarget.dataset.filename;

    JSONdata = {
      DA_ID: DA_ID,
      profileName: ProfileUrl,
      fileName: fileName
    };
    const API_url = this.state.base_url + "admin/deleteProduct";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.refreshMobileView();
        }
        else
          alert('not fetch');
      });
  }
  deleteProduct = (e) => {
    //DA_Type
    let fileNameArr = JSON.parse(e.currentTarget.dataset.filename);
    let fileName = "";
    const DA_ID = e.currentTarget.dataset.remove;
    const type = e.currentTarget.dataset.type;
    let ProfileUrl = e.currentTarget.dataset.profileurl;

    var JSONdata;
    if (type === "video") 
    {
      if (fileNameArr !== null && fileNameArr.length > 0)
        fileName = fileNameArr[0]
        JSONdata = {
          DA_ID: DA_ID,
          profileName: ProfileUrl,
          fileName: fileName
        };
    }
    if (type === "audio") 
    {
      if (fileNameArr !== null && fileNameArr.length > 0)
        fileName = fileNameArr[0]
      JSONdata = {
        DA_ID: DA_ID,
        profileName: ProfileUrl,
        fileName: fileName
      };
    }
    if (type === "image") 
    {
      if (fileNameArr !== null && fileNameArr.length > 0)
        fileName = fileNameArr[0]
      JSONdata = {
        DA_ID: DA_ID,
        profileName: ProfileUrl,
        fileName: fileName
      };
    }
    if (type === "NA" || type === "contest" ) 
    {
      JSONdata = {
        DA_ID: DA_ID,
        profileName: ProfileUrl,
        fileName: ""
      };
    }
    if (type === "album") {
      if (fileNameArr !== null && fileNameArr.length > 0)
        fileName = fileNameArr
      JSONdata = {
        DA_ID: DA_ID,
        profileName: ProfileUrl,
        fileName: fileName
      };
    }
    if (type === "carousel") {
      if (fileNameArr !== null && fileNameArr.length > 0)
          fileName = fileNameArr
      JSONdata = {
        DA_ID: DA_ID,
        profileName: ProfileUrl,
        fileName: fileName
      };
    }
    const API_url = this.state.base_url + "admin/deleteProduct";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) 
        {
          this.setState({
            title: 'info !!!',
            msg: 'Item is deleted successfully',
            show: true
          })
          this.Get_User_Details();
          this.refreshMobileView();
        }
        else {
          //alert('not fetch');
          this.setState({
            title: 'info !!!',
            msg: data.msg,
            show: true
          })
        }
      });


  }

  //27-jul-2021 video session delete
  deleteVideoSession=async (e)=>{  
      const DA_ID = e.currentTarget.dataset.remove;
        var  JSONdata = {
          DA_ID: DA_ID,
          JM_ID:this.state.JM_ID       
      }
        const data = await API.postData(JSONdata,'deleteVideoSession');     
          if (data.status === 1) 
          {
            this.setState({
              title: 'info !!!',
              msg: 'Item is deleted successfully',
              show: true
            })
            this.Get_User_Details();
            this.refreshMobileView();
          }
          else 
          {
            //alert('not fetch');
            this.setState({
              title: 'info !!!',
              msg: data.msg,
              show: true
            })
          }
     
  }

  //05-aug-2021
  deleteContest=async (e)=>{

    const DA_ID = e.currentTarget.dataset.remove;
        var  JSONdata = {
          DA_ID: DA_ID,
          JM_ID:this.state.JM_ID       
      }
         const data = await API.postData(JSONdata,'deleteContest');     
          if (data.status === 1) 
          {
            this.setState({
              title: 'info !!!',
              msg: 'Item is deleted successfully',
              show: true
            })
            this.Get_User_Details();
            this.refreshMobileView();
          }
          else 
          {
            //alert('not fetch');
            this.setState({
              title: 'info !!!',
              msg: data.msg,
              show: true
            })
          }

  }



  isConfirm = () => {

    if(this.state.JM_User_Profile_Url.length ===0)
    {
      document.getElementById("msg").innerHTML = '* Enter url';
      return false;
    }
    if (this.state.old_url === this.state.JM_User_Profile_Url) 
    {
      document.getElementById("msg").innerHTML = 'Nothing to change';    
      return false;
    }


    confirmAlert({
      title: 'Confirm Change',
      message: 'Are you sure you want to change your username? You will be able to change it again upon page refresh.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.doEditUrl()
        },
        {
          label: 'No',
          onClick: () => console.log("cancel is clicked")
        }
      ],
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  };

  uploadProfilePic = (e) => {

    const file = e.target.files[0];
    this.setState({ selectedFile: e.target.files[0] });
    this.setState({
      selectedFile: file
    }, () => {
      //console.log(this.state.selectedFile);
      this.uploadPic();

    });
    this.setState({
      JM_Profile_Pic: URL.createObjectURL(file)
    });

  }
  uploadPic = (e) => {
    e.preventDefault();

    let JM_User_Profile_Url = "";
    if (this.state.userDetails != null && this.state.userDetails.length > 0) {
      JM_User_Profile_Url = this.state.userDetails[0].JM_User_Profile_Url;
    }
    const formData = new FormData();

    let Api_url = this.state.base_url + 'admin/profileImageFromProfile';
    formData.append('sampleFile', this.state.croppedImage)
    formData.append('JM_ID', this.state.JM_ID)
    formData.append('JM_User_Profile_Url', JM_User_Profile_Url)

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total)
        //console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          this.setState({ uploadPercentage: percent })
        }
      },
        headers: {
          "authorization": API.getAuth(),"id":API.getId()
        },
    }

    axios.post(Api_url, formData, options).then(res => {
      if (res.data.status === 1) 
      {
        const data=API.decryptJson(res.data.flag);

        var userDetails = data.userDetails;
        if (userDetails != null && userDetails.length > 0) {
          this.setState({ avatar: res.data.url, uploadPercentage: 100 }, () => {
            setTimeout(() => {
              this.setState({ uploadPercentage: 0 })
            }, 1000);
          })


          this.setState({ userDetails });
          this.Get_User_Details();
          this.setState({
            openCropModal: false
          })
          this.refreshMobileView();

        }
      }
      else {
        alert("internal error occered");
      }
      //console.log(res.data)

    })
  }

  doEditUrl = (e) => {




    //e.preventDefault();
    if (this.state.Validation) 
    {
      //console.log(this.state.Validation)
    }
    else 
    {

      const formData = new FormData();
      let Api_url = this.state.base_url + 'admin/changeUrlByAdmin';
      let old_url = this.state.old_url;
      formData.append('old_url', old_url)
      formData.append('JM_ID', this.state.JM_ID)
      formData.append('new_url', this.state.JM_User_Profile_Url)

      this.setState({
        isCompletedUrlProcessing: true,
        btnRequest: "Processing...don't refresh the page!!!"
      });
      fetch(Api_url, {
        method: 'POST',
        headers: {"authorization": API.getAuth(),"id":API.getId()},
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data.status === 1) {
            document.getElementById("req_msg").style.color = 'green';
            document.getElementById("req_msg").innerHTML = "Your requested username has been applied!!";
            localStorage.setItem('JM_User_Profile_Url', this.state.JM_User_Profile_Url);
            setTimeout(function () {
              window.location.reload(true);
            }, 2000);
            //this.Get_User_Details();
          }
          else {
            this.setState({
              isCompletedUrlProcessing: false,
              btnRequest: "Change"
            });
            document.getElementById("req_msg").innerHTML = 'internal error, try again later';
          }
        })
        .catch(error => {
          this.setState({
            isCompletedUrlProcessing: false,
            btnRequest: "Change"
          });
          document.getElementById("req_msg").innerHTML = 'internal error, try again later';
          //console.error(error)
        })

    }
  }
  onEditChangeUrl = (e) => {
    //this.setState({[e.target.name]:e.target.value});  

    let Url = e.target.value.replace(/[^a-z0-9\-\_]/gi, "");
    this.setState({ [e.target.name]: Url });
    this.setState({ Validation: true });

    if (this.state.old_url === Url) 
    {
      document.getElementById("msg").innerHTML = '';
      this.setState({ Validation: true });
      return false;
    }

    if (Url.length > 0) 
    {
      this.setState({ Validation: false });
      let API_url = this.state.base_url + "admin/ValidateURL_Profile";
      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify({ JM_User_Profile_Url: Url, JM_ID: this.state.JM_ID })
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 1 || data.status === 2) 
          {
            //console.log(data.msg);
            document.getElementById("msg").innerHTML = data.msg;
            this.setState({ Validation: true });
          }
          else {
            document.getElementById("msg").innerHTML = '';
            this.setState({ Validation: false });
          }

        });

    }
    else 
    {
      document.getElementById("msg").innerHTML = '* Enter url';
      this.setState({ Validation: true });
      return false;
    }
  }

  openModalDynamic = id => e => {
    // !this.state.openDynamic ?
    //   this.setState({ openDynamic: true })
    //   :
    //   this.setState({ openDynamic: false })
    //console.log(e)
  }
  reload = (e) => {
    document.getElementById('iframeid').src += '';
    //console.log("ok")
  }

  onDragEndSocialWidget = (result) => {
    //console.log(result)
    const { destination, source, reason } = result;
    if (!destination || reason === 'CANCEL') {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const socialWidget = Object.assign([], this.state.socialWidget);
    const droppedUser = this.state.socialWidget[source.index];
    socialWidget.splice(source.index, 1);
    socialWidget.splice(destination.index, 0, droppedUser);

    this.setState({ socialWidget })
    //console.log(socialWidget)
    this.UpdateOrderBySocialWidget(socialWidget);
  }
  UpdateOrderBySocialWidget = (socialWidget) => {

      let flagData = {
      socialWidget: socialWidget
    };

  const flag=API.encryptData(flagData);

    let JSONdata = {
      flag: flag
    };
    const API_url = this.state.base_url + "admin/updateOrderBySocialWidget";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            // isLoading:true   
          });
          this.refreshMobileView();
        }
        else {
          this.setState({
            show: false,
            title: 'Failed!!!',
            msg: 'Failed to updated',
            // isLoading:true   
          });
        }
      });
  }


  onDragEndCustomLink = (result) => {
    //console.log(result)
    const { destination, source, reason } = result;
    if (!destination || reason === 'CANCEL') {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const linkMaster = Object.assign([], this.state.linkMaster);
    const droppedUser = this.state.linkMaster[source.index];
    linkMaster.splice(source.index, 1);
    linkMaster.splice(destination.index, 0, droppedUser);

    this.setState({ linkMaster })
    this.updateOrderByCustomLink(linkMaster);
  }

  updateOrderByCustomLink = (customLink) => {


    let flagData = {
      customLink: customLink
    };

    const flag=API.encryptData(flagData);

    let JSONdata = {
      flag: flag
    };


    const API_url = this.state.base_url + "admin/updateOrderByCustomLink";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json","authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            // isLoading:true   
          });
          this.refreshMobileView();
        }
        else {
          this.setState({
            show: false,
            title: 'Failed!!!',
            msg: 'Failed to updated',
            // isLoading:true   
          });
        }
      });
  }

  onDragProductList = (result) => {
    //console.log(result)
    const { destination, source, reason } = result;
    if (!destination || reason === 'CANCEL') {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const productList = Object.assign([], this.state.productList);
    const droppedUser = this.state.productList[source.index];
    productList.splice(source.index, 1);
    productList.splice(destination.index, 0, droppedUser);

    this.setState({ productList })
    //console.log(productList)
    this.UpdateOrderProductList(productList);
  }

  UpdateOrderProductList = (productList) => {
    let JSONdata = {
      productList: productList
    };
    const API_url = this.state.base_url + "admin/updateOrderByProductList";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            // isLoading:true   
          });
          this.refreshMobileView();
        }
        else {
          this.setState({
            show: false,
            title: 'Failed!!!',
            msg: 'Failed to updated',
            // isLoading:true   
          });
        }
      });
  }










  refreshMobileView = () => {
    this.refs.livepreview2.UpdateMobileView();
  }

  updateUserName = (e) => {
    document.getElementById('userName').value = e.target.value;
    //console.log(e.target.value)
  }
  onChangeNameDesc = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'JM_Name') {
      var JM_Name = e.target.value.replace(/'/g, "\\'");
      this.updateProfile('JM_Name', JM_Name);

    }
    else {

      var JM_Description = e.target.value.replace(/'/g, "\\'");
      this.updateProfile('JM_Description', JM_Description);
    }

  }
  updateProfile = (name, value) => {
    const API_url = process.env.REACT_APP_API_URL + "admin/updateProfileNameDescription";
    var JSONdata = {};
    if (name === 'JM_Name')
      JSONdata = {
        name: name,
        JM_Name: value,
        JM_ID: this.state.JM_ID
      };
    else
      JSONdata = {
        name: name,
        JM_Description: value,
        JM_ID: this.state.JM_ID
      };

    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          // this.setState({
          //   show: true,
          //   title: 'Success!!!',
          //   msg: 'Profile is updated',        
          // });
          this.refreshMobileView();
        }
        else {
          // this.setState({
          //   show: false,
          //   title: 'Failed!!!',
          //   msg: 'Failed to updated',          
          // });
        }
      });
  }

  collapseHandleClick = id => e => {
    const colapseBoxes = [...this.state.colapseBoxes];
    if (colapseBoxes != null) {

      if (colapseBoxes.filter(item => item.tableId === id).length === 0) {
        colapseBoxes.push({ id: id, isOpen: true });
      }
      colapseBoxes.map((item, i) => {
        (item.tableId !== id) ? item.isOpen = false : item.isOpen = true;
      });
    }

    //console.log(colapseBoxes);
    this.setState({ colapseBoxes });
    let element = document.getElementById("Collapse_" + id);
    var className = element.classList.value;
    //console.log(element.classList.value)
    if (className.includes('show')) {
      element.classList.remove("show");
      document.getElementById("hide_show_text_" + id).innerText = 'Show';
      document.getElementById("plus_icon_" + id).style.display = 'inline-block';
      document.getElementById("minus_icon_" + id).style.display = 'none';
    }
    else {
      element.classList.add("show");
      document.getElementById("hide_show_text_" + id).innerText = 'Hide';
      document.getElementById("plus_icon_" + id).style.display = 'none';
      document.getElementById("minus_icon_" + id).style.display = 'inline-block';
    }
    //element.classList.add("myNewClass") 
    //Collapse_7
    this.createCategoryLinks(id);
  }
  onChangeRadio = (event) => {
    //setSelectedValue(event.target.value);
    this.setState({ radio: event.target.value });
    //console.log(event.target.value)
  };
  moveCustomLinks = () => {
    //console.log(this.state.radio)
    //console.log(this.state.LM_ID_Move)
    //console.log(this.state.JM_ID_Move)
    //if(this.state.radio > 0)
    //{
    let folderId = this.state.radio;
    let type = 'customLink';
    this.MoveLinkToFolder(folderId, this.state.JM_ID_Move, this.state.LM_ID_Move, type);
    // }

  }
  MoveLinkToFolder = (folderId, JM_ID, LinkId, type) => {
    let JSONdata = [];
    if (type === 'customLink') 
    {


    let flagData = {
         type: type,
        CM_ID: folderId,
        JM_ID: JM_ID,
        LM_ID: LinkId
    };
    const flag=API.encryptData(flagData);
     JSONdata = {
      flag: flag
    };

   
    }
    const API_url = process.env.REACT_APP_API_URL + "admin/moveLinkToFolder";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Link is Moved Successfully',
            // isLoading:true   
          });
          this.refreshMobileView();
        }
        else {
          this.setState({
            show: false,
            title: 'Failed!!!',
            msg: 'Failed to Move',
            // isLoading:true   
          });
        }
      });

  }
  createCategoryLinks = id => e => {
    let category_links;
    category_links = this.state.userDetailsAll.map((link, i) => {
      return (
        link.folderId > 0 && id === link.folderId ?
          <div className="item" id={'lnk_item_' + link.tableId}>
            <p style={{ fontWeight: 'bold', color: '#ff6f6e' }}>Custom Link</p>
            <div className="move"><MoreVertIcon /></div>
            <div className="top-part">
              {
                link.image === '' ?
                  <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                  :
                  <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.image} /></div>
              }

              <h4> {link.title}</h4>
            </div>
            <div className="bottom-part">
              <div className="row">
                <div className="col-lg-2">
                  <label className="switch" for={'lnk_' + link.tableId}>
                    <input type="checkbox" id={'lnk_' + link.tableId} name={'lnk_' + link.tableId}
                      checked={this.state.checkedBoxes.find((ch) => ch.tableId === link.tableId)}
                      onClick={this.doActive(link)}
                    />
                    <div className="slider round" ></div>
                  </label>
                </div>
                <div className="col-lg-10 text-right">
                  {/* <button><ShareIcon /></button> */}
                  <button data-remove={link.folderId} onClick={() => { this.setState({ openMoveLinkModel: true, LM_ID_Move: link.tableId, JM_ID_Move: link.JM_ID, CM_ID_Move: link.folderId }) }}><OpenWithSharpIcon /></button>
                  <EditLinks data={this.state.userDetailsAll[i]} setStateAfterInsert={this.setStateAfterInsert} />
                  <input type="hidden" name="hidden" value={link.tableId}></input>
                  <button data-remove={link.tableId} onClick={this.doDeleteLink}><DeleteForeverIcon /></button>
                </div>
              </div>
            </div>
          </div>
          :
          null
      )

    })
    return category_links;
  }

  doRequestVerify = (e) => {
    var JSONdata = {
      JM_ID: this.state.JM_ID
    };
    const API_url = process.env.REACT_APP_API_URL + "admin/doRequestVerify";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Request is Sent',
            // isLoading:true   
          });
          document.getElementById("btn_Request").style.background = '#228e52';
          document.getElementById("btn_Request").innerHTML = 'Request sent';
          this.refreshMobileView();

        }
        else {
          this.setState({
            show: false,
            title: 'Failed!!!',
            msg: 'Failed to Send Request, wait sometimes and  try again',
            // isLoading:true   
          });
        }
      });

  }

  onDragEnd = (result) => {
    //console.log("drag and drop")
    //console.log(result)
    const { destination, source, reason } = result;
    if (!destination || reason === 'CANCEL') {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const userDetailsAll = Object.assign([], this.state.userDetailsAll);
    const droppedUser = this.state.userDetailsAll[source.index];
    userDetailsAll.splice(source.index, 1);
    userDetailsAll.splice(destination.index, 0, droppedUser);

    this.setState({ userDetailsAll })
    //console.log(userDetailsAll)
    this.updateOrderByForEachTable(userDetailsAll);
  }
  updateOrderByForEachTable = (userDetailsAll) => {


    
    let flagData = {
      userDetailsAll: userDetailsAll
    };
    const flag=API.encryptData(flagData);
    let JSONdata = {
      flag: flag
    };
 
    const API_url = this.state.base_url + "admin/updateOrderByForEachTable";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json", "authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.Get_User_Details();
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            // isLoading:true   
          });
          this.refreshMobileView();
        }
        else {
          this.setState({
            show: false,
            title: 'Failed!!!',
            msg: 'Failed to updated',
            // isLoading:true   
          });
        }
      });

  }
  //MS2 =========================================
  ModalSocialOpen = () => {

    if (this.state.referralCode && this.state.referralCode.length === 0) {
      this.Update_ReferralCode(this.state.Ref_Code);
    }
    this.setState({ openModel: true, show: true });
  }

  updateColor = (e) => {
    let color = e.target.value;
    //console.log(color)
    let JSONdata = {};

    this.setState({ activeNameBio_color: '#000000' });
    JSONdata = {
      TM_Bio_Color: 'TM_Bio_Color',
      JM_ID: this.state.JM_ID,
      TM_Bio_Color: color,
    }
    this.updateNameBioColor(JSONdata);
  }

  updateNameBioColor = (JSONdata) => {

    const API_url = process.env.REACT_APP_API_URL + "admin/updateNameBioColor";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: "Name, Bio, Footer's, Static  text color has been changed successfully",
            themeMasterUser: data.themeMasterUser,
            TM_Bio_Color: data.themeMasterUser[0].TM_Bio_Color,
            TM_Name_Color: data.themeMasterUser[0].TM_Name_Color,
            TM_Footer_Color: data.themeMasterUser[0].TM_Footer_Color,
            activeNameBio_color: data.themeMasterUser[0].TM_Footer_Color
          });

          // this.getApper();
          this.refreshMobileView();

        }
        else {
          this.setState({
            show: true,
            title: 'error!!!',
            msg: 'Profile is not updated',
            // isLoading:true   
          });
        }
      });

  }
  //
  closeEditUrlModal = (e) => {
    if (this.state.isCompletedUrlProcessing === false)
      this.setState({ openEditURLModal: false })
    else
      return false;
  }

  //news letter modal
  openNewsModal = () => {
    this.setState({ showNewsModal: true })
  }
  updateNewsLetterTitle = (e) => {

    if (this.state.JM_NewsLetter_Title.length === 0) {
      document.getElementById("msg_news").innerHTML = 'Enter Title';
      return false;
    }
    var JSONdata = {
      JM_ID: this.state.JM_ID,
      JM_NewsLetter_Active: this.state.JM_NewsLetter_Active,
      JM_NewsLetter_Title: this.state.JM_NewsLetter_Title,
      type: 'title'
    };

    const API_url = this.state.base_url + "admin/updateActiveNewsLetter";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {

          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Profile is updated',
            showNewsModal: false
          });
          this.Get_User_Details();
          this.refreshMobileView();
        }
        else {
          this.setState({
            show: true,
            title: 'Success!!!',
            msg: 'Failed to Update'
          });

        }
      });


  }

  //MS 2
  updateSteps = id => e => {
    API.updateToolStep(id);
  }
  updateStepsClose = id => e => {
    API.updateStepsClose(id);
  }
  onRefCodeChange = (e) => {

  }

  openCheckoutSocial=(e)=>{
    this.setState({
      openSocialTitleModal:true
    })
  }

OpenLiveVideo=(data)=>e=>
{
  this.props.history.push("/live-video-session-edit");
  this.props.history.push({
    state: {
      data: data,
      JM_ID: this.state.JM_ID,
      JM_User_Profile_Url: this.state.JM_User_Profile_Url,
    }
  })
}
handleKeyPress = async (event) => {
  if(event.key === 'Enter')
  {  
    console.log("here");
    document.getElementById('msg_social').innerHTML='';document.getElementById('msg_social').style.color='red';
      if(this.state.JM_Checkout_My_Social.length===0)
      {
        document.getElementById('msg_social').innerHTML='Empty Title';
        return false;
      }
      var data=await API.updateJoiningMaster(this.state.JM_Checkout_My_Social,'JM_Checkout_My_Social',this.state.JM_ID)  
      if (data.status === 1)
      {
        document.getElementById('msg_social').style.color='green';
        document.getElementById('msg_social').innerHTML='Title is updated';
        this.Get_User_Details();
        this.refreshMobileView();
        
      }
      else
      {
        document.getElementById('msg_social').style.color='red';
        document.getElementById('msg_social').innerHTML='Internal error, try again later';
      }
  }
}

  render() {
    const { uploadPercentage } = this.state;
    const { crop, profile_pic, src } = this.state
    let timeInterval=API.GetSlidingInterval();
    //const urlParams = queryString.parse(window.location.search);

    ////console.log(`The code is: ${urlParams.code}`);
    //console.log(this.state.userDetails)

    let imagePath = this.state.base_url + this.state.ProfilePath;
    let base_url = this.state.base_url;
    let linkPath = "";
    let JM_User_Profile_Url_plus_JM_ID = "", JM_ID = 0;
    let JM_Profile_Pic = ""; let JM_User_Profile_Url = "", JM_Payout_Details = 0, JM_Verified = 0, isRequested = 1, isRequestForChangeUrl = 0;
    let JM_NewsLetter_Active = 0, JM_NewsLetter_Title = '',JM_Gift_Active=0,JM_Checkout_My_Social='';
    let JM_Steps = 0;let JM_Social_Widget_Position = "";
    if (this.state.userDetails != null && this.state.userDetails.length > 0) {
      let len = this.state.userDetails.length;
      for (var i = 0; i < len; i++) {
        linkPath = base_url + "Profile/" + this.state.userDetails[i].JM_User_Profile_Url + "_" + this.state.userDetails[i].JM_ID + "/";
        JM_User_Profile_Url_plus_JM_ID = this.state.userDetails[i].JM_User_Profile_Url + "_" + this.state.userDetails[i].JM_ID;
        JM_Profile_Pic = this.state.userDetails[i].JM_Profile_Pic;
        JM_User_Profile_Url = this.state.userDetails[i].JM_User_Profile_Url;
        JM_Payout_Details = this.state.userDetails[i].JM_Payout_Details;
        JM_Verified = this.state.userDetails[i].JM_Verified;
        isRequested = this.state.userDetails[i].isRequested;
        isRequestForChangeUrl = this.state.userDetails[i].isRequestForChangeUrl;
        JM_ID = this.state.userDetails[i].JM_ID;
        JM_NewsLetter_Title = this.state.userDetails[i].JM_NewsLetter_Title;
        JM_NewsLetter_Active = this.state.userDetails[i].JM_NewsLetter_Active;
        JM_Gift_Active=this.state.userDetails[i].JM_Gift_Active;
        JM_Steps = this.state.userDetails[i].JM_Steps;
        JM_Checkout_My_Social=this.state.userDetails[i].JM_Checkout_My_Social;
        JM_Social_Widget_Position = this.state.userDetails[i].JM_Social_Widget_Position;
        //console.log("JM_Steps")
        //console.log(JM_Steps)
        break;
      }

      localStorage.setItem('JM_Profile_Pic', JM_Profile_Pic);
      if (JM_Steps === 0) {

        localStorage.setItem('tool_bio', 'block');
        localStorage.setItem('tool_new_item', 'none');
        localStorage.setItem('tool_drag_part', 'none');
        localStorage.setItem('tool_preview', 'none');
        localStorage.setItem('tool_design', 'none');
        localStorage.setItem('tool_stat', 'none');
        localStorage.setItem('tool_setting', 'none');
        localStorage.setItem('tool_notify', 'none');
        localStorage.setItem('tool_page_link', 'none');
      }
      else {
        localStorage.setItem('tool_bio', 'none');
        localStorage.setItem('tool_new_item', 'none');
        localStorage.setItem('tool_drag_part', 'none');
        localStorage.setItem('tool_preview', 'none');
        localStorage.setItem('tool_design', 'none');
        localStorage.setItem('tool_stat', 'none');
        localStorage.setItem('tool_setting', 'none');
        localStorage.setItem('tool_notify', 'none');
        localStorage.setItem('tool_page_link', 'none');
      }
      var root_url = this.state.root_url;
    }


    const messageBar = {
      backgroundColor: "#fff",
      paddingTop: "10px",
      paddingBottom: " 0",
      borderBottom: " 1px solid rgba(0,0,0,.1)",
      zIndex: "9999",
      textAlign: "center",
      width: "100%",
    }
    const ColorNameBio = {
      color: '#000000' //this.state.TM_Bio_Color
    }

    let socialWidget;
    socialWidget = this.state.socialWidget && this.state.socialWidget.map((link, i) => (
      link.SWM_Url !== "" && link.SWM_Style_Type === 'W' ?
        <Draggable key={i} draggableId={i + " "} index={i}>
          {(provided) => (
            <div className="item" id={'lnk_item_' + link.SWM_ID} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}>
              {/* <p style={{fontWeight:'bold',color:'#ff6f6e'}}>Social widgets</p> */}
              <div className="move"><MoreVertIcon /></div>
              <div className="top-part">
                <div className="row">
                  <div className="col-md-4">
                    <h4>Social widgets</h4>
                  </div>
                  <div className="col-md-8">
                    <label className="switch" for={'lnk_' + link.SWM_ID}>
                      <input type="checkbox" id={'lnk_' + link.SWM_ID} name={'lnk_' + link.SWM_ID}
                        checked={this.state.checkedBoxes.find((ch) => ch.SWM_ID === link.SWM_ID)}
                        onClick={this.doActiveSocialWidget(link)}

                      />
                      <div className="slider round" ></div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bottom-part">
                <div className="row">
                  <div className="col-md-2">
                    <div className="icon" data-id={link.SWM_Icon} style={{fontSize: '25px'}}>
                      {/* <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.SWM_Icon} /> */}
                      
                              {
                               link.SWM_Icon==='faHandPaper'?
                               <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} className="rotateCls" />
                               :
                               <FontAwesomeIcon icon={API.SocialIcons(link.SWM_Icon)} />
                              }
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="text">
                      <h4>{link.SWM_Title}</h4>
                    </div>
                  </div>
                  <div className="col-md-4 text-right">
                    {/* <button><ShareIcon /></button> */}
                    <EditSocialWidget2 socialWidget={this.state.socialWidget[i]} setStateAfterInsert={this.setStateAfterInsert} />
                    <input type="hidden" name="hidden" value={link.SWM_ID}></input>
                    <button data-remove={link.SWM_ID} onClick={this.doDeleteLinkSocial}><DeleteForeverIcon /></button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
        :
        null
    ))

    let gifts;
    gifts = this.state.gifts.map((link, i) => {
      return (
        <div className="gift-item">
          <img src={link.DA_Collection} />
          {
            link.DA_Price > 0 ?
              <p>{"Rs. " + link.DA_Price}</p>
              :
              <p style={{color:'#fff'}}>{'Rs. '}</p>
          }
          <div className="row">
              {
                    link.DA_DA_ID===0?
                    <EditPopGift2 src={link.DA_Collection} gift={this.state.gifts[i]} setStateAfterInsert={this.setStateAfterInsert} />
                    :
                    <EditSupportMe2 src={link.DA_Collection} gift={this.state.gifts[i]} setStateAfterInsert={this.setStateAfterInsert} />

              } 
                
            <input type="hidden" name="hidden" value={link.DA_ID}></input>
            <button data-remove={link.DA_ID} data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID}
              data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID} data-fileName={link.DA_Collection}
              data-type={link.DA_Type}
              onClick={this.deleteGift}>
              <DeleteForeverIcon />
            </button>
          </div>
        </div>
      )
    })




    // MS2
    let newsLetter;
    newsLetter = (
      <div className="item">
        {/* <div className="move"><MoreVertIcon />
        </div> */}
        <div className="top-part">
          <div className="row">
            <div className="col-md-12">
              <label className="switch" for={'news_' + JM_ID}>
                <input type="checkbox" id={'news_' + JM_ID} name={'news_' + JM_ID}
                  checked={this.state.checkedBoxes.find((ch) => ch.creatorId === JM_ID && ch.JM_NewsLetter_Active===1)}
                  onClick={this.doActiveNewsLetter(JM_ID)}
                />
                <div className="slider round" ></div>
              </label>
            </div>
          </div>
        </div>
        <div className="bottom-part">
          <div className="row">
            <div className="col-md-2">
              <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
            </div>
            <div className="col-md-6">
              <div className="text">
                <h4> {JM_NewsLetter_Title}</h4>
              </div>
            </div>
            <div className="col-md-4 text-right">
              <button onClick={this.openNewsModal}><CreateIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    );

        //19-jul-2021
       let checkOutSocial;
        checkOutSocial = (
          <div className="item">
            {/* <div className="move"><MoreVertIcon />
            </div> */}
            <div className="top-part">      
            Set your social widget title       
            </div>
            <div className="bottom-part">
              <div className="row">
                <div className="col-md-2">
                  <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                </div>
                <div className="col-md-6">
                  <div className="text">
                    <h4> {JM_Checkout_My_Social}</h4>
                  </div>
                </div>
                <div className="col-md-4 text-right">
                  <button onClick={this.openCheckoutSocial}><CreateIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    


    let LiveMobile = (
      <>
        <LivePreview2 state={this.state} ref="livepreview2" />
        <button onClick={this.refreshMobileView} style={{ display: 'none' }}>Click</button>
      </>
    )

    //23-jun-2021
    let carousel;
    carousel = this.state.gifts.map((link, i) => {
      return (
        <div className="gift-item">
          <img src={link.DA_Collection} />
          {
            link.DA_Price > 0 ?
              <p>{"Rs. " + link.DA_Price}</p>
              :
              <p>{"Support"}</p>
          }
          <div className="row">
            <EditPopGift2 src={link.DA_Collection} gift={this.state.gifts[i]} setStateAfterInsert={this.setStateAfterInsert} />
            <input type="hidden" name="hidden" value={link.DA_ID}></input>
            <button data-remove={link.DA_ID} data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID}
              data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID} data-fileName={link.DA_Collection}
              data-type={link.DA_Type}
              onClick={this.deleteGift}>
              <DeleteForeverIcon />
            </button>
          </div>
        </div>
      )
    })

    return (
      <>
        <Helmet>
          <title>Profile | Expy </title>
          <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta>
        </Helmet>
        <ProfileHeader JM_Profile_Pic={this.state.JM_Profile_Pic} JM_User_Profile_Url={this.state.JM_User_Profile_Url} />

        <div className="profile-tab">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <ProfileNav userDetails={this.state.userDetails} JM_User_Profile_Url={JM_User_Profile_Url} />
              </div>
            </div>
          </div>
        </div>
        <div className="myprofile">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-12">
                <div className="profilePart" id="profilePart">
                  {/* {              
                          this.state.userDetails &&  this.state.userDetails.map((user,i) =>(                     */}

                  <div className="prop-box">
                    <div className="prop-part">

                      <div className="row">
                        <div className="col-md-3">
                          <div className="prop-pic">
                            {
                              JM_Verified === 1 ?
                                <span className="verify-tick"><img src="/images/verifyIcon.png" /></span>
                                :
                                null
                            }

                            <label htmlFor="prop_up" className="up_pic">Click to Upload</label>
                            <img src={process.env.REACT_APP_UPLOAD_URL + JM_Profile_Pic} />

                            <input type="file" id="prop_up" style={{ display: "none" }} accept="image/png, image/jpeg,image/gif" onChange={this.handleFile} />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="name">
                            <input type="text" className="form-control" id="userName" name="JM_Name" style={ColorNameBio} value={this.state.JM_Name} onChange={this.onChangeNameDesc} />
                            <textarea type="text" className="form-control" id="tagLine" name="JM_Description" style={ColorNameBio} value={this.state.JM_Description === 'NA' || this.state.JM_Description === 'Write your tagline' ? '' : this.state.JM_Description} onChange={this.onChangeNameDesc} placeholder="Your Bio" />

                            {/* walk-through-bio */}
                            {

                              this.state.JM_Steps === 0 ?
                                <div className="tooltips" style={{ width: '100%' }} >
                                  <div className="tooltip-bottom" id="tool_bio" style={{ display: localStorage.getItem('tool_bio') }}>
                                    <h6>Bio description</h6>
                                    <p> Add your Bio here. Short, sweet, easy to read. You can also choose the color of your name + bio.</p>
                                    <i></i>
                                    <span className="cls" onClick={this.updateStepsClose('tool_bio')}>x</span>
                                    <span className="step">Step 1 out of 9</span>
                                    <button className="nxtbtun" onClick={this.updateSteps(2)}>Next</button>
                                  </div>
                                </div>
                                :
                                null
                            }

                          </div>


                          <input id="input-color" style={{ visibility: 'hidden', position: 'absolute' }} type="color" value={this.state.activeNameBio_color} onChange={this.updateColor} />
                          <label for="input-color" className="colorPickerBioName"> <ColorLensOutlinedIcon /> Choose color for Name and Bio </label>


                        </div>

                        <div className="col-md-3">
                          <NavLink className="set-btn"
                            to={{ pathname: "/settings", userDetails: this.state.userDetails }} >
                            <SettingsOutlinedIcon /> Settings
                          </NavLink>
                          {
                            this.state.JM_Steps === 0 ?
                              <div className="tooltips" style={{ margin: 'auto' }} >

                                <div className="tooltip-left" id="tool_setting" style={{ display: localStorage.getItem('tool_setting') }}>
                                  <h6>Settings</h6>
                                  <p>Update your account settings here.</p>
                                  <i></i>
                                  <span className="cls" onClick={this.updateStepsClose('tool_setting')}>x</span>
                                  <span className="step">Step 7 out of 9</span>
                                  <button className="nxtbtun" onClick={this.updateSteps(8)}>Next</button>
                                </div>
                              </div>
                              : null
                          }
                        </div>

                      </div>






                    </div>
                    <div className="prop-link">
                      <div className="row">
                        <div className="col-md-3">
                          <p> Your expy.bio link: </p>
                        </div>
                        <div className="col-md-6">
                          <span id="copy_text" className="copy-text">{root_url + JM_User_Profile_Url}</span>
                          {/* TOOL TIP */}
                          {
                            this.state.JM_Steps === 0 ?
                              <div className="tooltips" >
                                <div className="tooltip-bottom" id="tool_page_link" style={{ top: '45px', display: localStorage.getItem('tool_page_link') }} >
                                  <h6> Expy page link</h6>
                                  <p style={{ color: 'white' }}> You're all set! Copy this link and share it with the world.</p>
                                  <i></i>
                                  <span className="cls" onClick={this.updateStepsClose('tool_page_link')}>x</span>
                                  <span className="step">Step 9 out of 9</span>
                                  {/* <button className="nxtbtun" onClick="">Next</button> */}
                                </div>
                              </div>
                              : null
                          }
                          <input type="hidden" id="url" value={JM_User_Profile_Url} />
                        </div>

                        <div className="col-md-3">
                          {/* <button onClick={()=> this.setState({openSocialModal:true}) } className="copybtn"><ShareIcon/></button> */}
                          <button onClick={() => this.setState({openSocialModal:true})} className="copybtn"><ShareIcon /></button>
                          <CopyToClipboard text={root_url + JM_User_Profile_Url}>
                            <button className="copybtn" >  <FileCopyIcon onClick={this.doCopied} id="copy_icon" /></button>

                          </CopyToClipboard>
                          <span className="copybtn">
                            <EditIcon onClick={() => this.setState({ openEditURLModal: true, JM_User_Profile_Url: JM_User_Profile_Url,Validation:true })} />
                          </span>
                        </div>
                      </div>

                      <br />

                      {
                        isRequested === 0 ?
                          <button onClick={this.doRequestVerify} id="btn_Request" className="Requestbtn" style={{ float: 'none', margin: 'auto', display: 'table' }}><i className="fa fa-check-circle" aria-hidden="true"></i> Request verification</button>
                          : null
                      }


                    </div>
                  </div>
                  {/* ))
                        } */}
                  {/* add items */}
                  <div className="prop-body">
                    <div className="addItemcard">
                      <Button onClick={this.openModal} className="btun"
                        aria-controls="example-collapse-text"
                        aria-expanded={this.state.open}
                      >
                        <AddCircleOutlineOutlinedIcon />Add New Item

                      </Button>
                      {
                        this.state.JM_Steps === 0 ?
                          <div className="tooltips" style={{ width: '100%' }}>
                            <div className="tooltip-bottom" id="tool_new_item" style={{ display: localStorage.getItem('tool_new_item') }}>
                              <h6>Add new items to page</h6>
                              <p> Add items for your page from here. A newsletter sign up item is automatically added for you, which you can activate at the bottom of the page.</p>
                              <i></i>
                              <span className="cls" onClick={this.updateStepsClose('tool_new_item')}>x</span>
                              <span className="step">Step 2 out of 9</span>
                              <button className="nxtbtun" onClick={this.updateSteps(3)}>Next</button>
                            </div>
                          </div>
                          : null
                      }
                      <Collapse in={this.state.open} style={{ padding: '20px' }}>

                        <div id="example-collapse-text">
                          <div className="row justify-content-center" >
                            <div className="col-md-4">
                              <SocialWidget2 showToast={this.showToast}
                                JM_ID={this.state.JM_ID}
                                JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} Get_User_Details={this.Get_User_Details} setStateAfterInsert={this.setStateAfterInsert} userDetails={this.state.userDetails} />

                            </div>
                            <div className="col-md-4">
                              <AddNewLink2 showToast={this.showToast}
                                JM_ID={this.state.JM_ID}
                                JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} Get_User_Details={this.Get_User_Details} setStateAfterInsert={this.setStateAfterInsert} />

                            </div>
                            <div className="col-md-4">
                              <StackedLink2 JM_ID={this.state.JM_ID}
                                JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} />

                            </div>
                            <div className="col-md-4">
                              <EmbedContent2 showToast={this.showToast}
                                JM_ID={this.state.JM_ID}
                                JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} Get_User_Details={this.Get_User_Details} setStateAfterInsert={this.setStateAfterInsert} />

                            </div>
                            <div className="col-md-4">
                              <div className="card-btun" onClick={this.DirectAccess}>
                                <AddCircleOutlineOutlinedIcon />
                                <h4>Monetization Features</h4>
                                <p>Sell & earn</p>
                              </div>
                            </div>
                            {/* caresoul */}
                            <div className="col-md-4">
                              <div className="card-btun" onClick={this.ImageCarousel}>
                                <AddCircleOutlineOutlinedIcon />
                                <h4>Image Carousel</h4>
                                <p>Add sliding images</p>
                              </div>
                            </div>
                        
                          </div>
                        </div>
                      </Collapse>
                    </div>

                    {
                      JM_Social_Widget_Position==='top'?
                      checkOutSocial
                      : null
                    }


                    <DragDropContext onDragEnd={this.onDragEndSocialWidget}>
                      <Droppable droppableId="dp1" >
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {socialWidget}
                          </div>

                        )}

                      </Droppable>
                    </DragDropContext>















                    {
                      this.state.JM_Steps === 0 ?
                        <div className="tooltips">
                          <div className="tooltip-top" id="tool_drag_part" style={{ display: localStorage.getItem('tool_drag_part') }}>
                            <h6>Click and drag widgets to move around</h6>
                            <p> Organize your links and widgets by simply dragging and dropping items.</p>
                            <i></i>
                            <span className="cls" onClick={this.updateStepsClose('tool_drag_part')}>x</span>
                            <span className="step">Step 3 out of 9</span>
                            <button className="nxtbtun" onClick={this.updateSteps(4)}>Next</button>
                          </div>
                        </div>
                        : null
                    }


                    {/* main design drag and drop */}


                    <DragDropContext onDragEnd={this.onDragEnd}>
                      <Droppable droppableId="main_dp" >
                        {(provided) => (
                          <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {
                              this.state.userDetailsAll.map((link, i) => {

                                return (
                                  <Draggable key={i} draggableId={i + " "} index={i}>
                                    {(provided) => (

                                      <div id={'lnk_' + link.tableId} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}>
                                        {
                                          link.ItemType === 'customlink' && link.folderId === 0 ?
                                            // custom links
                                            <div className="item" id={'lnk_item_' + link.tableId + "_" + link.ItemType}>
                                              <div className="move"><MoreVertIcon /></div>
                                              <div className="top-part">

                                                <div className="row">
                                                  <div className="col-md-4">
                                                    <h4>Custom Link</h4>
                                                  </div>
                                                  <div className="col-md-8">
                                                    <label className="switch" for={'link_' + link.tableId}>
                                                      <input type="checkbox" id={'link_' + link.tableId} name={'link_' + link.tableId}
                                                        checked={this.state.checkedBoxes.find((ch) => ch.tableId === link.tableId)}
                                                        onClick={this.doActive(link)}
                                                      />
                                                      <div className="slider round" ></div>
                                                    </label>
                                                  </div>
                                                </div>

                                              </div>
                                              <div className="bottom-part">
                                                <div className="row">
                                                  <div className="col-lg-2">
                                                    {
                                                        // for icon <img src={'https://'+(link.URL.split('//')[1]).split('/')[0]+'/'+'favicon.ico'} alt="no icon"/>
                                                         link.image === '' && (link.icon === '' || link.icon === null) ?
                                                        <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                                        : link.image !== '' && link.icon === '' ?
                                                          <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.image} /></div>
                                                          : link.icon !== '' && link.image === '' ?
                                                            <div className="icon"> <MDBIcon icon={link.icon} size="2x" /></div>
                                                            :
                                                            <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                                    }
                                                  </div>
                                                  <div className="col-md-6">
                                                    <div className="text">
                                                      <h4>{link.title}</h4>
                                                    </div>
                                                  </div>
                                                  <div className="col-md-4 text-right">
                                                    <button onClick={() => { this.setState({ openMoveLinkModel: true, LM_ID_Move: link.tableId, JM_ID_Move: link.JM_ID }) }}><OpenWithSharpIcon /></button>
                                                    <EditLinks2 data={this.state.userDetailsAll[i]} userDetails={this.state.userDetails[0]} setStateAfterInsert={this.setStateAfterInsert} />
                                                    <input type="hidden" name="hidden" value={link.tableId}></input>
                                                    <button data-remove={link.tableId} onClick={this.doDeleteLink}><DeleteForeverIcon /></button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            :
                                            link.ItemType === 'category' ?
                                              // folder
                                              <div className="item" id={'lnk_item_' + link.tableId + "_" + link.ItemType} >
                                               <div className="move"><MoreVertIcon />     </div>
                                                <div className="top-part">
                                                  <div className="row">
                                                    <div className="col-md-4">
                                                      <h4>{link.title}</h4>
                                                    </div>
                                                    <div className="col-md-8">
                                                      <label className="switch" for={'link_' + link.tableId}>
                                                        <input type="checkbox" id={'link_' + link.tableId} name={'lnk_' + link.tableId}
                                                          checked={this.state.checkedBoxes.find((ch) => ch.tableId === link.tableId)}
                                                          onClick={this.doActiveCategoryMaster(link)}
                                                        />
                                                        <div className="slider round" ></div>
                                                      </label>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="bottom-part">
                                                  <div className="row">
                                                    <div className="col-lg-2">
                                                      {
                                                        (link.image === null || link.image === '') && (link.icon === '' || link.icon === null) ?
                                                          <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                                          : (link.image !== null || link.image !== '') && link.icon === '' ?
                                                            <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.image} /></div>
                                                            : (link.icon !== '' || link.icon !== null) ?
                                                              <div className="icon"><MDBIcon icon={link.icon} size="2x" /></div>
                                                              :
                                                              <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                                      }
                                                    </div>
                                                    <div className="col-md-6">
                                                      <div className="text">
                                                        <h4>{link.description} </h4>
                                                      </div>
                                                    </div>

                                                    <div className="col-md-4 text-right">
                                                      <button onClick={this.collapseHandleClick(link.tableId)} style={{ display: 'none' }} id={"minus_icon_" + link.tableId}><IndeterminateCheckBoxOutlinedIcon /></button>
                                                      <button onClick={this.collapseHandleClick(link.tableId)} id={"plus_icon_" + link.tableId} style={{ display: 'inline-block' }} ><AddCircleOutlineOutlinedIcon /></button>
                                                      <EditStackedLink2 category_master={this.state.userDetailsAll[i]} CM_ID={link.tableId}
                                                        JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} />
                                                      <input type="hidden" name="hidden" value={link.tableId}></input>
                                                      <button data-remove={link.tableId} onClick={this.doDeleteCategory}><DeleteForeverIcon /></button>
                                                    </div>
                                                  </div>
                                                  <span id={"hide_show_text_" + link.tableId} style={{ display: 'none' }}> Show</span>

                                                </div>
                                                <div className="move"><MoreVertIcon />
                                                </div>
                                                <Collapse in={this.state.colapseBoxes.find(x => x.id === link.tableId)?.isOpen}
                                                  id={'Collapse_' + link.tableId}>
                                                  {
                                                    this.state.userDetailsAll !== null && this.state.userDetailsAll.length > 0 ?
                                                      <div id={"example-collapse-text"}>
                                                        {

                                                          this.state.userDetailsAll.map((lnk, i) => {
                                                            return (
                                                              lnk.folderId > 0 && lnk.folderId === link.tableId ?
                                                                <div className="item" id={'lnk_item_' + lnk.tableId}>
                                                                  {/* <p style={{ fontWeight: 'bold', color: '#ff6f6e' }}>Custom Link</p> */}
                                                                  <div className="move"><MoreVertIcon /></div>
                                                                  <div className="top-part">
                                                                    <div className="row">
                                                                      <div className="col-md-4">
                                                                        <h4>Custom Link</h4>
                                                                      </div>
                                                                      <div className="col-md-8">
                                                                        <label className="switch" for={'link_' + lnk.tableId}>
                                                                          <input type="checkbox" id={'link_' + lnk.tableId} name={'link_' + lnk.tableId}
                                                                            checked={this.state.checkedBoxes.find((ch) => ch.tableId === lnk.tableId)}
                                                                            onClick={this.doActive(lnk)}
                                                                          />
                                                                          <div className="slider round" ></div>
                                                                        </label>
                                                                      </div>
                                                                    </div>

                                                                  </div>
                                                                  <div className="bottom-part">
                                                                    <div className="row">
                                                                      <div className="col-md-2">
                                                                        {
                                                                          lnk.image === '' && (lnk.icon === '' || lnk.icon === null) ?
                                                                            <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                                                            : lnk.image !== '' && lnk.icon === '' ?
                                                                              <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + lnk.image} /></div>
                                                                              : lnk.icon !== '' && lnk.image === '' ?
                                                                                <div className="icon"> <MDBIcon icon={lnk.icon} size="2x" /></div>
                                                                                :
                                                                                <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                                                        }
                                                                      </div>
                                                                      <div className="col-md-6">
                                                                        <div className="text">
                                                                          <h4> {lnk.title}</h4>
                                                                        </div>
                                                                      </div>
                                                                      <div className="col-md-4 text-right">
                                                                        {/* <button><ShareIcon /></button> */}
                                                                        <button onClick={() => { this.setState({ openMoveLinkModel: true, LM_ID_Move: lnk.tableId, JM_ID_Move: lnk.JM_ID }) }}><OpenWithSharpIcon /></button>
                                                                        <EditLinks2 userDetails={this.state.userDetails[0]} data={this.state.userDetailsAll[i]} setStateAfterInsert={this.setStateAfterInsert} />
                                                                        <input type="hidden" name="hidden" value={lnk.tableId}></input>
                                                                        <button data-remove={lnk.tableId} onClick={this.doDeleteLink}><DeleteForeverIcon /></button>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                :
                                                                null
                                                            )

                                                          })

                                                        }
                                                      </div>
                                                      :
                                                      <h3>Empty Folder</h3>
                                                  }
                                                </Collapse>

                                              </div>
                                              :
                                              link.ItemType === 'embedcontent' ?
                                                <div className="item" id={'lnk_item_' + link.tableId + "_" + link.ItemType}>
                                                  <div className="move"><MoreVertIcon /></div>
                                                  <div className="top-part">

                                                    <div className="row">
                                                      <div className="col-md-4">
                                                        <h4>Embed Link</h4>
                                                      </div>
                                                      <div className="col-md-8">
                                                        <label className="switch" for={'link_' + link.tableId}>
                                                          <input type="checkbox" id={'link_' + link.tableId} name={'link_' + link.tableId}
                                                            checked={this.state.checkedBoxes.find((ch) => ch.tableId === link.tableId)}
                                                            onClick={this.doActiveEmbed(link)}
                                                          />
                                                          <div className="slider round" ></div>
                                                        </label>
                                                      </div>
                                                    </div>

                                                  </div>
                                                  <div className="bottom-part">
                                                    <div className="row">
                                                      <div className="col-lg-2">
                                                        {
                                                          link.image === '' ?
                                                            <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                                            :
                                                            <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.image} /></div>
                                                        }
                                                      </div>
                                                      <div className="col-md-6">
                                                        <div className="text">
                                                          <h4>{link.title}</h4>
                                                        </div>
                                                      </div>
                                                      <div className="col-md-4 text-right">
                                                        {/* <button><ShareIcon /></button> */}
                                                        {/* <button onClick={()=>{this.setState({openMoveLinkModel:true,LM_ID_Move:lnk.LM_ID,JM_ID_Move:lnk.JM_ID})}}><OpenWithSharpIcon/></button> */}
                                                        <EditEmbedContent2 data={this.state.userDetailsAll[i]} setStateAfterInsert={this.setStateAfterInsert} JM_User_Profile_Url={this.state.JM_User_Profile_Url} />
                                                        <input type="hidden" name="hidden" value={link.tableId}></input>
                                                        <button data-remove={link.tableId} onClick={this.doDeleteEmbed}><DeleteForeverIcon /></button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                :
                                                link.ItemType === 'premium' && link.prodId !== 4 ?
                                                  <div className="item" id={'lnk_item_' + link.tableId}>
                                                    {/* <p style={{ fontWeight: 'bold', color: '#ff6f6e' }}>Premium Content</p> */}
                                                    <div className="move"><MoreVertIcon /></div>
                                                    <div className="top-part">                                            
                                                      <div className="row">
                                                        <div className="col-md-4">
                                                          {/* <h4>{link.DA_DA_ID===1 ? 'Personalized Video or Audio Message' : link.DA_DA_ID===2 ? 'Unlock Content' : 'Premium Features'}</h4> */}
                                                          <h4>{link.prodId === 1 ? 'Personalized Message' : link.prodId === 2 ? 'Unlock Content' : link.prodId === 3 ? 'Digital E-Commerce Selling' : link.prodId === 5 ? 'Live Video' : link.prodId === 6 ? 'Giveaway' : 'Premium Features'}</h4>
                                                        </div>
                                                        <div className="col-md-8">
                                                          {
                                                            JM_Payout_Details === 1 && link.prodType !== 'gifts' ?
                                                              <label className="switch" for={'link_' + link.tableId}>
                                                                <input type="checkbox" id={'link_' + link.tableId} name={'link_' + link.tableId}
                                                                  checked={this.state.checkedBoxes.find((ch) => ch.tableId === link.tableId)}
                                                                  onClick={this.doActivePremium(link)}
                                                                />
                                                                <div className="slider round" ></div>
                                                              </label>
                                                              : null
                                                          }

                                                        </div>
                                                        <div className="col-md-12">
                                                          {
                                                            JM_Payout_Details === 0 ?
                                                              <div style={messageBar}>
                                                                <div style={messageBar}>
                                                                  <p style={{ color: " #e28b23", fontSize: "13px" }}>
                                                                    This item will be hidden from your profile until you add payout details.
                                                                    <Link to={{ pathname: "/settings", userDetails: this.state.userDetails, state: { openTabNo: 1 } }} > Go to Settings</Link>
                                                                  </p>
                                                                </div>

                                                              </div>
                                                              : null
                                                          }
                                                        </div>

                                                      </div>

                                                    </div>
                                                    <div className="bottom-part">
                                                      <div className="row">
                                                        <div className="col-md-2">
                                                          <div className="icon" style={{ marginTop: "0%" }}>

                                                          {
                                                    
                                                           link.prodId === 1 ? 
                                                            <PlayCircleOutlineIcon style={{ fontSize: "50px", color: "#7504f8" }} /> : 
                                                             link.prodId === 2 ? 
                                                             <LockOpenIcon  style={{ fontSize: "50px", color: "#7504f8" }}/> : 
                                                            link.prodId === 3 ? 
                                                            <ExplicitIcon  style={{fontSize: '50px',  color: "#7504f8"}}/>:
                                                            link.prodId === 5 ? 
                                                             <VideocamIcon style={{ fontSize: "50px",  color: "#7504f8" }}/> :
                                                            link.prodId === 6 ?
                                                            <EmojiEventsIcon style={{fontSize: '50px',  color: "#7504f8"}}/>
                                                            :  
                                                            <EventIcon style={{ fontSize: "50px", color: "#7504f8"}} />                                                   
                                                            }
                                                            {/* {
                                                              link.prodType === "video" ?
                                                                <PlayCircleOutlineIcon style={{ fontSize: "50px", color: "#7504f8" }} />
                                                                : null
                                                            }
                                                            {
                                                              link.prodType === "image" ?
                                                                <PhotoAlbumIcon style={{ fontSize: "50px", color: "#7504f8"}} />
                                                                : null
                                                            }
                                                            {
                                                              link.prodType === "audio" ?
                                                                <AudiotrackIcon style={{ fontSize: "50px",  color: "#7504f8"}} />
                                                                : null
                                                            }
                                                            {
                                                              link.prodType === "album" ?
                                                                <PhotoAlbumIcon style={{ fontSize: "50px", color: "#7504f8" }} />
                                                                : null
                                                            }
                                                            {
                                                              link.prodType === "NA" ?
                                                                <CameraAltOutlinedIcon style={{ fontSize: "50px",   color: "#7504f8"}} />
                                                                : null
                                                            }
                                                            {
                                                              link.prodType === 'txt' ?

                                                                <DescriptionOutlinedIcon style={{ fontSize: "50px", color: "#7504f8"}}/>
                                                                :
                                                                null
                                                            }
                                                            {
                                                              link.prodType === 'pdf' ?

                                                                <PictureAsPdfOutlinedIcon style={{ fontSize: "50px",  color: "#7504f8" }}/>
                                                                :
                                                                null
                                                            }
                                                            {
                                                              link.prodType === 'videoCam' ?
                                                             
                                                                <VideocamIcon style={{ fontSize: "50px",  color: "#7504f8" }}/>
                                                                :
                                                                null
                                                            }
                                                            {
                                                              link.prodType === 'contest' ?
                                                             
                                                                <EventIcon style={{ fontSize: "50px", color: "#7504f8"}} />
                                                                :
                                                                null
                                                            } */}
                                                          </div>


                                                        </div>
                                                        <div className="col-md-6">
                                                          <div className="text">
                                                         
                                                          <h4>{link.title}     
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
                                                              </h4>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-4 text-right">
                                                              {
                                                                   link.prodId === 6 ?
                                                                 <ContestReport from={'P'} data={this.state.userDetailsAll[i]} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} />
                                                                  :
                                                                  null
                                                              }
                                                 
                                         
                                                       
                                                          {
                                                            (link.prodType === 'video' || link.prodType === 'image' || link.prodType === 'NA') && link.prodId === 1 ?
                                                              <EditPremiumFeature2 data={this.state.userDetailsAll[i]} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} />
                                                              :
                                                              link.prodId === 2 ?
                                                                <EditUnlockContent2 data={this.state.userDetailsAll[i]} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} />
                                                                :
                                                                link.prodId === 3 ?
                                                                  <EditDigitalEcommerce data={this.state.userDetailsAll[i]} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} />
                                                                  :
                                                                  link.prodId === 5 ?
                                                                  <button onClick={this.OpenLiveVideo(this.state.userDetailsAll[i])}><CreateIcon />  </button>
                                                                  // <EditLiveVideoSessionPage data={this.state.userDetailsAll[i]} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} />
                                                                  :
                                                                  link.prodId === 6 ?                                                                 
                                                                   <EditContestGiveAway data={this.state.userDetailsAll[i]} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} showToast={this.showToast}/>                                                                  :
                                                                  null
                                                          }

                                                          <input type="hidden" name="hidden" value={link.tableId}></input>
                                                          {
                                                              link.prodId === 5 ?
                                                                <button data-remove={link.tableId} data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID}
                                                              data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID} data-fileName={link.collection}
                                                              data-type={link.prodType}
                                                              onClick={this.deleteVideoSession}><DeleteForeverIcon /></button>
                                                              :
                                                              link.prodId === 6 ?
                                                                <button data-remove={link.tableId} data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID}
                                                                data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID} data-fileName={link.collection}
                                                                data-type={link.prodType}
                                                                onClick={this.deleteContest}><DeleteForeverIcon /></button>
                                                              :
                                                                  <button data-remove={link.tableId} data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID}
                                                                data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID} data-fileName={link.collection}
                                                                data-type={link.prodType}
                                                                onClick={this.deleteProduct}><DeleteForeverIcon /></button>
                                                          }
                                                          
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  :
                                                  link.ItemType === 'socialBar' ?
                                                    <div className="item" id={'lnk_item_' + link.tableId}>
                                                      <div className="move"><MoreVertIcon /></div>
                                                      <div className="top-part">
                                                        <div className="row">
                                                          <div className="col-md-4">
                                                            <h4>Social Bar</h4>
                                                          </div>
                                                          <div className="col-md-8">
                                                            <label className="switch" for={'link_' + link.tableId}>
                                                              <input type="checkbox" id={'link_' + link.tableId} name={'link_' + link.tableId}
                                                                checked={this.state.checkedBoxes.find((ch) => ch.tableId === link.tableId)}
                                                                onClick={this.doActiveSocialBar(link)}
                                                              />
                                                              <div className="slider round" ></div>
                                                            </label>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="bottom-part">
                                                        <div className="row">
                                                          <div className="col-md-2">
                                                            <div className="icon" style={{fontSize: '25px'}}>
                                                              {/* <img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.icon} /> */}
                                                              {
                                                                link.icon==='faHandPaper'?
                                                                <FontAwesomeIcon icon={API.SocialIcons(link.icon)} className="rotateCls" />
                                                                :
                                                                <FontAwesomeIcon icon={API.SocialIcons(link.icon)} />
                                                              }
                                                            </div>
                                                          </div>
                                                          <div className="col-md-6">
                                                            <div className="text">
                                                              <h4>{link.title}</h4>
                                                            </div>
                                                          </div>
                                                          <div className="col-md-4 text-right">
                                                            <EditSocialWidget socialWidget={this.state.userDetailsAll[i]} setStateAfterInsert={this.setStateAfterInsert} />
                                                            <input type="hidden" name="hidden" value={link.tableId}></input>
                                                            <button data-remove={link.tableId} onClick={this.doDeleteLinkSocial}><DeleteForeverIcon /></button>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    :
                                                    link.ItemType === 'carousel' && link.prodId === 4 ?
                                                      <div className="item" id={'lnk_item_' + link.tableId}>
                                                        <div className="move"><MoreVertIcon />
                                                        </div>
                                                        <div className="top-part">
                                                          <h4>Image Carousel</h4>
                                                          <div className="row">
                                                            <div className="col-md-12">
                                                              <label className="switch" for={'link_' + link.tableId}>
                                                                <input type="checkbox" id={'link_' + link.tableId} name={'link_' + link.tableId}
                                                                  checked={this.state.checkedBoxes.find((ch) => ch.tableId === link.tableId)}
                                                                  onClick={this.doActivePremium(link)}
                                                                />
                                                                <div className="slider round" ></div>
                                                              </label>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="bottom-part d-block">
                                                          <div className="row">
                                                            <div className="col-md-6">
                                                              {/* carousel */}
                                                              <div className="Carousel-box" style={{ display: 'block' }}>
                                                                        <Carousel interval={timeInterval} keyboard={false}>
                                                                      { 
                                                                        link.carousel_1 !== 'NA' ?
                                                                            <Carousel.Item>
                                                                                    <div className="carousel_image">
                                                                                              {
                                                                                                link.carousel_1 !== 'NA' ?
                                                                                                  <img
                                                                                                    src={process.env.REACT_APP_UPLOAD_URL + link.carousel_1} alt="image1"
                                                                                                  />
                                                                                                  :
                                                                                                  null
                                                                                              }
                                                                                            </div> 
                                                                          </Carousel.Item>
                                                                          :
                                                                          null
                                                                      }
                                                                        

                                                                      { 
                                                                        link.carousel_2 !== 'NA' ?
                                                                            <Carousel.Item>
                                                                                          <div className="carousel_image">
                                                                                              {
                                                                                                link.carousel_2 !== 'NA' ?
                                                                                                  <img
                                                                                                    src={process.env.REACT_APP_UPLOAD_URL + link.carousel_2} alt="image2"
                                                                                                  />
                                                                                                  :
                                                                                                  null
                                                                                              }
                                                                                            </div> 
                                                                            </Carousel.Item>
                                                                          :
                                                                          null
                                                                      }

                                                                      { 
                                                                        link.carousel_3 !== 'NA' ?
                                                                            <Carousel.Item>
                                                                                          <div className="carousel_image">
                                                                                              {
                                                                                                link.carousel_3 !== 'NA' ?
                                                                                                  <img
                                                                                                    src={process.env.REACT_APP_UPLOAD_URL + link.carousel_3} alt="image3"
                                                                                                  />
                                                                                                  :
                                                                                                  null
                                                                                              }
                                                                                            </div> 
                                                                            </Carousel.Item>
                                                                          :
                                                                          null
                                                                      }

                                                                    </Carousel>
                                                              </div>
                                                          </div>
                                                            <div className="col-md-6 text-right">
                                                             
                                                              <input type="hidden" name="carousel" value={link.tableId}></input>
                                                              <button className="editCarousel"    data-type={link.prodType} data-remove={link.tableId} onClick={this.deleteProduct} data-fileName={link.collection}><DeleteForeverIcon /></button>
                                                              <Link className="editCarousel" to={{ pathname: "/create-carousel-edit", state: { productDetails: link } }}>
                                                                <CreateIcon />
                                                              </Link> 
                                                            </div>
                                                          </div>
                                                      </div>
                                                           
                                                      </div>
                                                      :
                                                      null
                                        }
                                      </div>

                                    )}
                                  </Draggable>
                                );

                              })
                            }
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </DragDropContext>

                    {/* main design drag and drop */}


                    <div className="item">
                      {/* <div className="move"><MoreVertIcon />
                      </div> */}
                      <div className="top-part">
                             <h4>Virtual Gifts</h4>
                             <div className="row">
                                <div className="col-md-12">
                                    { 
                                      JM_Payout_Details === 1 ?
                                        <label className="switch" for={'jm_' + JM_ID}>
                                          <input type="checkbox" id={'jm_' + JM_ID} name={'jm_' + JM_ID}
                                            checked={this.state.checkedBoxes.find((ch) => ch.creatorId === JM_ID && ch.JM_Gift_Active===1)}
                                            onClick={this.doActiveVartualGift(JM_ID)}
                                          />
                                          <div className="slider round" ></div>
                                        </label>
                                        :
                                        null
                                        }
                                  </div>
                                  <div className="col-md-12">
                                      <div class="text">
                                        <h4>{this.state.JM_Gift_Title}
                                          <input type="hidden" name="carousel" value={JM_ID}></input>                              
                                          <Link className="gift-edit" onClick={this.EditGiftTitle}>
                                            <CreateIcon />
                                          </Link> 
                                          </h4>
                                      </div>
                                       
                                  </div>
                             </div>
                             {
                                JM_Payout_Details === 1 ?
                                  <Link className="gift-add" to={{ pathname: "/gifts", state: { JM_ID: this.state.JM_ID } }}>
                                    <AddCircleOutlineOutlinedIcon />
                                  </Link>
                                  :
                                  <Link to={{ pathname: "/settings", userDetails: this.state.userDetails, state: { openTabNo: 1 } }} > Add Payout Details</Link>

                              }
                            
                      </div>
                      <div className="bottom-part d-table">                        
                        {gifts}
                      </div>
                    </div>
                    {newsLetter}
                    {
                      JM_Social_Widget_Position==='bottom'?
                      checkOutSocial
                      : null
                    }

               

                  </div>
                  <Modal
                    size="sm"
                    show={this.state.openEditURLModal}
                    onHide={this.closeEditUrlModal}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop="static"
                    keyboard={false}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
                        Change your profile username
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <input type="text" disabled={this.state.isCompletedUrlProcessing} className="form-control" placeholder="username" name="JM_User_Profile_Url" value={this.state.JM_User_Profile_Url} onChange={this.onEditChangeUrl} />
                    </Modal.Body>
                    <Modal.Footer>
                      <p id="msg" style={{ color: 'red' }}></p>
                      <div className="btun-box">
                  
                            <Button onClick={this.isConfirm} disabled={this.state.Validation} className="btun btun_1">{this.state.btnRequest}</Button>
                           
                        <p id='req_msg'></p>
                        {/* <p style={{color:' #ea9515',fontWweight: 'bold',fontSsize: '12px'}}>
                             Note: if you update this current username you will not able to see any data of earlier username. 
                         </p> */}
                      </div>
                    </Modal.Footer>
                  </Modal>



                  {/* Referral modal */}
                  <Modal
                    size="sm"
                    show={this.state.openRefModal}
                    onHide={() => this.setState({ openRefModal: false })}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop="static"
                    keyboard={false}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
                        Monetization code
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <input type="text" className="form-control" placeholder="Enter Monetization code" name="JM_Referral_Code" value={this.state.JM_Referral_Code} onChange={this.onChangeNameDesc} />
                    </Modal.Body>
                    <Modal.Footer>

                      <div className="btun-box">
                        <Button onClick={this.isConfirm} disabled={this.state.isValidRefCode} className="btun btun_1" id="Request">Request</Button>
                      </div>
                      <p id="msg" style={{ color: 'red' }}></p>
                    </Modal.Footer>
                  </Modal>


                </div>

              </div>
              {LiveMobile}
            </div>
          </div>
        </div>
        <ToastAlert title={this.state.title} hideToast={this.hideToast} msg={this.state.msg} show={this.state.show} image={this.state.logo} showToast={this.showToast} />

        <Modal
          size="sm"
          show={this.state.openMoveLinkModel}
          onHide={() => this.setState({ openMoveLinkModel: false })}
          aria-labelledby="example-modal-sizes-title-sm"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
              Move Custom Links
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12" onChange={this.onChangeRadio}>

                <input type="radio" className="radio-folder"
                  value={0} name="category" onChange={this.onChangeRadio} />
                <label>Keep in front</label>
              </div>

            </div>
            <h5 >Your Desired Folder(s)</h5>
            <br />
            <div className="row" style={{ marginTop: '-26px' }}>

              {
                this.state.category_master && this.state.category_master.map((option, i) => {
                  return (
                    <>
                      <div className="col-12" >
                        <input type="radio"
                          className="radio-folder" onChange={this.onChangeRadio} value={option.CM_ID} data-id={this.state.CM_ID_Move} name="category" />
                        <label> {option.CM_Folder_Title}</label>

                      </div>

                    </>
                  )
                })
              }

            </div>

          </Modal.Body>
          <Modal.Footer>
            <p id="msg" style={{ color: 'red' }}></p>
            <div className="btun-box">
              <Button onClick={this.moveCustomLinks} className="movebtun">Move <SendSharpIcon /></Button>
            </div>

          </Modal.Footer>
        </Modal>

        {/* image crop modal */}
        <Modal
          show={this.state.openCropModal}
          onHide={() => this.setState({ openCropModal: false })}
          aria-labelledby="example-modal-sizes-title-sm"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
              Crop and Save
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.uploadPic}>
              <div className="cropp-image">
                {src && (
                  <ReactCrop
                    src={src}
                    crop={crop}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                )}

              </div>

              <button className="btnCropSave">save</button>

            </form>
            {uploadPercentage > 0 && <ProgressBar animated variant="success" style={{ width: '100%' }} now={uploadPercentage} active label={`${uploadPercentage}%`} />}

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>

        {/* social share */}
        <Modal
          show={this.state.openSocialModal}
          onHide={() => this.setState({ openSocialModal: false })}
          aria-labelledby="example-modal-sizes-title-sm"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
              <h4>Share on Social Platform</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-3 text-center">
                <FacebookShareButton
                  url={root_url + JM_User_Profile_Url}
                  quote={"Hi Creator, " + this.state.JM_Name + " is Inviting you to create your own Expy Bio Link: Enter Code: " + this.state.Ref_Code + " or use " + root_url + "signin to sign up."}
                >
                  <FacebookIcon
                    size={62}
                    round />
                </FacebookShareButton>
                <p>Facebook</p>
              </div>
              <div className="col-md-3 text-center">
                <TwitterShareButton
                  url={root_url + JM_User_Profile_Url}
                  title={"Hi Creator, " + this.state.JM_Name + " is Inviting you to create your own Expy Bio Link: Enter Code: " + this.state.Ref_Code + " or use " + root_url + "signin to sign up."}
                >
                  <TwitterIcon
                    size={62}
                    round />
                </TwitterShareButton>
                <p>Twitter</p>
              </div>
              <div className="col-md-3 text-center">
                <WhatsappShareButton
                  url={root_url + JM_User_Profile_Url}
                  title={"Hi Creator, " + this.state.JM_Name + " is Inviting you to create your own Expy Bio Link: Enter Code: " + this.state.Ref_Code + " or use " + root_url + "signin to sign up."}
                >
                  <WhatsappIcon
                    size={62}
                    round />
                </WhatsappShareButton>
                <p>Whatsapp</p>
              </div>



              <div className="col-md-3 text-center">
                <LinkedinShareButton
                  url={root_url + JM_User_Profile_Url}
                  title={"Hi Creator,"}
                  title={"Hi Creator," + this.state.JM_Name + " is Inviting you to create your own Expy Bio Link: Enter Code: " + this.state.Ref_Code + " or use " + root_url + "signin to sign up."}
                >
                  <LinkedinIcon
                    size={62}
                    round />
                </LinkedinShareButton>
                <p>Linkedin</p>
              </div>

              <div className="col-md-3 text-center">
                <TelegramShareButton
                  url={root_url + JM_User_Profile_Url}
                  title={"Hi Creator, " + this.state.JM_Name + " is Inviting you to create your own Expy Bio Link: Enter Code: " + this.state.Ref_Code + " or use " + root_url + "signin to sign up."}
                >
                  <TelegramIcon
                    size={62}
                    round />
                </TelegramShareButton>
                <p>Telegram</p>
              </div>
              <div className="col-md-3 text-center">
                <RedditShareButton
                  url={root_url + JM_User_Profile_Url}
                  title={"Hi Creator, " + this.state.JM_Name + " is Inviting you to create your own Expy Bio Link: Enter Code: " + this.state.Ref_Code + " or use " + root_url + "signin to sign up."}
                >
                  <RedditIcon
                    size={62}
                    round />
                </RedditShareButton>
                <p>Reddit</p>
              </div>
              <div className="col-md-3 text-center">
                <PinterestShareButton
                  url={root_url + JM_User_Profile_Url}
                  media={JM_Profile_Pic}
                  description={"Hi Creator, " + this.state.JM_Name + " is Inviting you to create your own Expy Bio Link: Enter Code: " + this.state.Ref_Code + " or use " + root_url + "signin to sign up."}
                >
                  <PinterestIcon
                    size={62}
                    round />
                </PinterestShareButton>
                <p>Pinterest</p>
              </div>
              <div className="col-md-3 text-center">
                <EmailShareButton
                  url={root_url + JM_User_Profile_Url}
                  title={"Hi Creator, " + this.state.JM_Name + " is Inviting you to create your own Expy Bio Link: Enter Code: " + this.state.Ref_Code + " or use " + root_url + "signin to sign up."}
                >
                  <EmailIcon
                    size={62}
                    round />
                </EmailShareButton>
                <p>Email</p>
              </div>

            </div>


          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
        {/* ========================= */}
        {/* newsletter edit */}
        <Modal
          size="sm"
          show={this.state.showNewsModal}
          onHide={() => this.setState({ showNewsModal: false })}
          aria-labelledby="example-modal-sizes-title-sm"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
              Title
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" className="form-control" placeholder="Enter Title" name="JM_NewsLetter_Title" value={this.state.JM_NewsLetter_Title} onChange={(e) => this.setState({ JM_NewsLetter_Title: e.target.value })} />
          </Modal.Body>
          <Modal.Footer>
            <p id="msg" style={{ color: 'red' }}></p>
            <div className="btun-box">
              <Button className="btun btun_1" onClick={this.updateNewsLetterTitle}>Update</Button>
              <p id='req_news'></p>
            </div>
          </Modal.Footer>
        </Modal>

                  {/* checkout my social title */}
          

       <Modal
          size="sm"
          show={this.state.openSocialTitleModal}
          onHide={() => this.setState({ openSocialTitleModal: false })}
          aria-labelledby="example-modal-sizes-title-sm"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
             Set Social Widget Title
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" className="form-control" placeholder="Enter Title" name="JM_Checkout_My_Social" 
            value={this.state.JM_Checkout_My_Social}
             onChange={(e)=> this.setState({ [e.target.name]: e.target.value })}
             onKeyPress={this.handleKeyPress}
             />
          </Modal.Body>
          <Modal.Footer>
        
           <Button  className="btun" style={{cursor:'pointer'}} onClick={this.updateCheckoutSocialTitle(this.state.JM_ID)}>Save</Button>
        
            <p id="msg_social" style={{ color: 'red' }}></p>
          </Modal.Footer>
        </Modal>


          {/* edit send me a gift option */}
          <Modal
              size="sm"
              show={this.state.showTitleModal}
              onHide={() => this.setState({ showTitleModal: false })}
              aria-labelledby="example-modal-sizes-title-sm"
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
                 Title of Gift Option
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input type="text" className="form-control" placeholder="Enter Title" name="JM_Gift_Title" value={this.state.JM_Gift_Title} onChange={(e)=> this.setState({[e.target.name]:e.target.value })} />
              </Modal.Body>
              <Modal.Footer>               
                <div className="btun-box">  </div>
                <Button className="btun btun_1" onClick={this.updateGiftTitle(this.state.JM_ID)}>Save</Button> 
                  <p id="msg_title" style={{ color: 'red' }}></p>
              
              </Modal.Footer>
            </Modal>

        <FooterClass />
      </>
    )

  }
}
export default withRouter(MyProfile);

