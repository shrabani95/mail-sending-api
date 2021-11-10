import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';
import {  Button } from 'react-bootstrap';
import FooterClass from '../header_footer/FooterClass';

import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfileNav from './ProfileNav';
import ProfileHeader from '../header_footer/ProfileHeader';
import Collapse from 'react-bootstrap/Collapse';
import AddNewLink from './AddNewLink';
import EditLinks from './EditLinks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ToastAlert from './ToastAlert';
import { withRouter } from "react-router";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SocialWidget from './SocialWidget';
import * as queryString from 'query-string';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import EditSocialWidget from './EditSocialWidget';
import StackedLink from './StackedLink';
import LivePreview from './LivePreview';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import OpenWithSharpIcon from '@material-ui/icons/OpenWithSharp';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import EditStackedLink from './EditStackedLink';
import EmbedContent from './EmbedContent';
import EditEmbedContent from './EditEmbedContent';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import EditPremiumFeature from './EditPremiumFeature';
import { ProgressBar } from 'react-bootstrap';
import EditUnlockContent from '../premium/EditUnlockContent';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import EditPopGift from '../premium/EditPopGift';
import $ from 'jquery'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { MDBIcon } from 'mdbreact';
import cryptoRandomString from 'crypto-random-string';
import EditSupportMe from '../premium/EditSupportMe';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
// import { Helmet } from 'react-helmet';
class MyProfile extends Component {
  url = '';
  constructor(props) {
    super(props)
    this.state = {
      JM_Email: localStorage.getItem('JM_Email'),
      JM_ID: parseInt(localStorage.getItem('JM_ID')),
      linkMaster: [],
      userDetails: [],
      directAccess: [],
      productList: [],
      category_master: [],
      socialWidget: [],
      category_links: [],
      embed_content: [],
      gifts: [],
      isLoggedIn: false,
      JM_Name: '',
      JM_Email: '',
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
          unit: "%",
          width: 30,
          aspect: 1 / 1
      },
      croppedImageUrl: null,
      openCropModal:false,
    }
    this.livepreview = React.createRef();
    console.log(this.props.location.search)

  }
  //===starting of crop image

  handleFile = e => {
    const fileReader = new FileReader()
      if(e.target.files!==null && e.target.files.length > 0)
      {
        fileReader.onloadend = () => {
          this.setState({ src: fileReader.result })
        }
        fileReader.readAsDataURL(e.target.files[0])
        this.setState({openCropModal:true})
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
      
      let r =cryptoRandomString({length: 30});
      console.log("random", r);
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, r+'.jpg')
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





  componentDidMount() {
    this.validateSession();
    this.Get_User_Details();
    // var JM_Name=localStorage.getItem('JM_User_Profile_Url');
    // var content="Everything about "+JM_Name+" in one place. Follow and Connect with " +JM_Name;
    // document.querySelector('meta[name="description"]').setAttribute("content", content);
  }
  validateSession() 
  {

    const urlParams = queryString.parse(window.location.search);
    const code = urlParams.code;
    console.log(urlParams)
    console.log("insta token id")
    console.log(code)
    localStorage.setItem('token', code);
    var JM_ID = parseInt(localStorage.getItem('JM_ID'));
    if (isNaN(JM_ID) || JM_ID === 0 || JM_ID === null)
    {
        if (typeof code === "undefined") {
          localStorage.setItem('JM_Email', "");
          localStorage.setItem('JM_ID', 0);
          window.location.href = '/';
        }
        else 
        {

            //if(localStorage.getItem('FB_IG')==='IG')
                this.getAccessTokenFromCodeInstagram(code);
          // if(localStorage.getItem('FB_IG')==='FB')
            //   this.getAccessTokenFromCode(code);
        
        }


    }

  }




  instgramDetails = (url) => {
    axios.get(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
  }


  //instagram
  async getAccessTokenFromCodeInstagram(code) {
    const formData = new FormData(); 

    formData.append('client_id', 371501700778779)
    formData.append('client_secret','6c4ce57bdc481800375fec2eeba9f81c') 
    formData.append('grant_type', 'authorization_code') 
    formData.append('redirect_uri', process.env.REACT_APP_INSTA_REDIRECT_URI + 'me') 
    formData.append('code', code) 

    const { data } = await axios({
      url: 'https://api.instagram.com/oauth/access_token',
      method: 'post',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },      
    });
    console.log(data); // { access_token, token_type, expires_in }
    var token = data.access_token;
    var user_id = data.user_id;
    var url = "https://graph.instagram.com/" + user_id + "?fields=id,username&access_token=" + token;
    // this.instgramDetails(url);
    //return data.access_token;
    this.getInstagramUserData(token, user_id);
  }

  async getInstagramUserData(access_token, user_id) {
    console.log(access_token);

    const { data } = await axios.get('https://graph.instagram.com/' + user_id+'?fields=id,username&access_token='+access_token);
    console.log(data); // { id, email, first_name, last_name }

    if (data != null && data.username.length > 0 && data.id.length > 0) {
      var jsonData = {
        first_name: data.username.replace(/\s+/g, ''),
        email: data.username+"@gmail.com",
        id: data.id,
      };
      let API_url = process.env.REACT_APP_API_URL + "admin/socialLogin";

      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData)
      }).then(function (response) {
        return response.json();
      }).then(result => {
        if (result.status === 1) {
          var name = data.username.replace(/\s+/g, '');
          console.log(data.msg);
          localStorage.setItem('JM_ID', result.JM_ID);
          localStorage.setItem('JM_Email', data.email);
          localStorage.setItem('JM_User_Profile_Url', name);


          var minutes = 60;
          var dt = new Date();
          var FromNewTime = new Date();
          var ToNewTime = new Date(dt.getTime() + minutes * 60000);

          console.log(FromNewTime)
          console.log(ToNewTime)

          localStorage.setItem('FromNewTime', FromNewTime);
          localStorage.setItem('ToNewTime', ToNewTime);
          if (this.state.keepMeLogin === 1)
            localStorage.setItem('keepLogin', this.state.keepMeLogin);
          else
            localStorage.setItem('keepLogin', 0);

          window.location.href = '/me';
          //this.props.history.push("/me");
        }
        else {
          console.log("failed to insert or fetch")
          localStorage.setItem('JM_Email', "");
          localStorage.setItem('JM_ID', 0);
          window.location.href = '/';
        }
      });

    }
    else {
      console.log("failed to insert or fetch")
      localStorage.setItem('JM_Email', "");
      localStorage.setItem('JM_ID', 0);
      //window.location.href = '/';
    }
    // return data;
  };

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
    console.log(data); // { access_token, token_type, expires_in }
    //return data.access_token;
    this.getFacebookUserData(data.access_token);
  }
  async getFacebookUserData(access_token) {
    console.log(access_token);

    const { data } = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        fields: ['id', 'email', 'first_name', 'last_name'].join(','),
        access_token: access_token,
      },
    });
    console.log(data.email); // { id, email, first_name, last_name }


    if (data != null && data.email.length > 0 && data.id.length > 0) {
      let API_url = process.env.REACT_APP_API_URL + "admin/socialLogin";
      // var JSONdata  = {           
      //     JM_Email:this.state.JM_Email,
      //     JM_Password:this.state.JM_Password              
      //   };	
      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(function (response) {
        return response.json();
      }).then(result => {
        if (result.status === 1) {
          console.log(data.msg);
          localStorage.setItem('JM_ID', result.JM_ID);
          localStorage.setItem('JM_Email', data.email);
          this.Get_User_Details();
        }
        else {
          console.log("failed to insert or fetch")
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
    const API_url = this.state.base_url + "admin/userDetails";
    const response = await fetch(API_url, {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(JSONdata)
    });
    const data = await response.json();

    if (data.userDetails != null && data.userDetails.length > 0) 
    {
      this.setState({
        userDetails: data.userDetails,
        linkMaster: data.linkMaster,
        directAccess: data.directAccess,
        productList: data.productList,
        socialWidget: data.socialWidget,
        category_master: data.category_master,
        category_links: data.category_links,
        embed_content: data.embed_content,
        isBlocked: data.userDetails[0].isBlocked,
        JM_Name: data.userDetails[0].JM_Name,
        JM_Description: data.userDetails[0].JM_Description,
        gifts: data.gifts,
      });

    }
    else
    {
      localStorage.setItem('JM_Email', "");
      localStorage.setItem('JM_ID', 0);
      window.location.href = process.env.REACT_APP_ROOT_URL;

    }

    if (this.state.isBlocked === 1) {
      window.location.href = process.env.REACT_APP_ROOT_URL;
    }
    this.setCheckBoxes();
    console.log(data);

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
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
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
      userDetails: currentState.userDetails,
      linkMaster: currentState.linkMaster,
      show: true,
      title: currentState.title,
      msg: currentState.msg,
      socialWidget: currentState.socialWidget,
      category_links: currentState.category_links,
      category_master: currentState.category_master,
      embed_content: currentState.embed_content,
      productList: currentState.productList,
      gifts: currentState.gifts,
    });
    this.refreshMobileView();
    this.setCheckBoxes();
  }
  setCheckBoxes = () => {
    var checkedBoxes = [];
    if (this.state.linkMaster != null && this.state.linkMaster.length > 0) {
      let len = this.state.linkMaster.length;
      for (var j = 0; j < len; j++) {
        if (this.state.linkMaster[j].LM_Active === 1) {
          checkedBoxes.push(this.state.linkMaster[j]);
          //document.getElementById('lnk_icon_'+this.state.linkMaster[j].LM_ID).style.opacity='1';
        }
        else {
          const index = checkedBoxes.findIndex((ch) => ch.LM_ID === this.state.linkMaster[j].LM_ID);
          // checkedBoxes.splice(index, 1);    
          document.getElementById('lnk_item_' + this.state.linkMaster[j].LM_ID).style.opacity = '0.5';
        }

      }
    }
    if (this.state.socialWidget != null && this.state.socialWidget.length > 0) {
      let len = this.state.socialWidget.length;
      for (var k = 0; k < len; k++) {
        if (this.state.socialWidget[k].SWM_Active === 1) {
          checkedBoxes.push(this.state.socialWidget[k]);
          //document.getElementById('lnk_icon_'+this.state.linkMaster[j].LM_ID).style.opacity='1';
        }
        else {
          const index = checkedBoxes.findIndex((ch) => ch.SWM_ID === this.state.socialWidget[k].SWM_ID);
          // checkedBoxes.splice(index, 1);    
          document.getElementById('lnk_item_' + this.state.socialWidget[k].SWM_ID).style.opacity = '0.5';
        }

      }
    }
    if (this.state.category_master != null && this.state.category_master.length > 0) {
      let len = this.state.category_master.length;
      for (let k = 0; k < len; k++) {
        if (this.state.category_master[k].CM_Active_Status === 1) {
          checkedBoxes.push(this.state.category_master[k]);

        }
        else {
          const index = checkedBoxes.findIndex((ch) => ch.CM_ID === this.state.category_master[k].CM_ID);
          document.getElementById('lnk_item_' + this.state.category_master[k].CM_ID).style.opacity = '0.5';
        }

      }
    }
    if (this.state.embed_content != null && this.state.embed_content.length > 0) {
      let len = this.state.embed_content.length;
      for (let k = 0; k < len; k++) {
        if (this.state.embed_content[k].LM_Active === 1) {
          checkedBoxes.push(this.state.embed_content[k]);
          //document.getElementById('lnk_icon_'+this.state.linkMaster[j].LM_ID).style.opacity='1';
        }
        else {
          const index = checkedBoxes.findIndex((ch) => ch.EC_ID === this.state.embed_content[k].EC_ID);
          // checkedBoxes.splice(index, 1);    
          document.getElementById('lnk_item_' + this.state.embed_content[k].EC_ID).style.opacity = '0.5';
        }

      }
    }

    if (this.state.productList != null && this.state.productList.length > 0) {
      let len = this.state.productList.length;
      for (let k = 0; k < len; k++) {
        if (this.state.productList[k].DA_Active === 1) {
          checkedBoxes.push(this.state.productList[k]);
          //document.getElementById('lnk_icon_'+this.state.linkMaster[j].LM_ID).style.opacity='1';
        }
        else {
          const index = checkedBoxes.findIndex((ch) => ch.DA_ID === this.state.productList[k].DA_ID);
          // checkedBoxes.splice(index, 1);    
          document.getElementById('lnk_item_' + this.state.productList[k].DA_ID).style.opacity = '0.5';
        }

      }
    }
    this.setState({
      checkedBoxes
    });

    console.log(this.state.checkedBoxes)
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
      document.getElementById('lnk_item_' + item.LM_ID).style.opacity = '1';
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.LM_ID === item.LM_ID);
      checkedBoxes.splice(index, 1);
      document.getElementById('lnk_item_' + item.LM_ID).style.opacity = '0.5';
    }
    this.setState({ checkedBoxes });

    var JSONdata = {
      LM_ID: item.LM_ID,
      LM_Active: LM_Active
    };

    const API_url = this.state.base_url + "admin/updateActiveLink";
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
      document.getElementById('lnk_item_' + item.CM_ID).style.opacity = '1';
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.CM_ID === item.CM_ID);
      checkedBoxes.splice(index, 1);
      document.getElementById('lnk_item_' + item.CM_ID).style.opacity = '0.5';
    }
    this.setState({ checkedBoxes });

    var JSONdata = {
      CM_ID: item.CM_ID,
      CM_Active_Status: CM_Active_Status
    };

    const API_url = this.state.base_url + "admin/updateActiveCategory";
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
      document.getElementById('lnk_item_' + item.EC_ID).style.opacity = '1';
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.EC_ID === item.EC_ID);
      checkedBoxes.splice(index, 1);
      document.getElementById('lnk_item_' + item.EC_ID).style.opacity = '0.5';
    }
    this.setState({ checkedBoxes });

    var JSONdata = {
      EC_ID: item.EC_ID,
      LM_Active: LM_Active
    };

    const API_url = this.state.base_url + "admin/updateActiveEmbed";
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
      document.getElementById('lnk_item_' + item.SWM_ID).style.opacity = '1';
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.SWM_ID === item.SWM_ID);
      checkedBoxes.splice(index, 1);
      document.getElementById('lnk_item_' + item.SWM_ID).style.opacity = '0.5';
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
        headers: { "Content-Type": "application/json" },
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
  doActivePremium = item => e => {

    const checkedBoxes = [...this.state.checkedBoxes];
    let DA_Active = 0;
    if (e.target.checked) {
      checkedBoxes.push(item);
      DA_Active = 1;
      document.getElementById('lnk_item_' + item.DA_ID).style.opacity = '1';
    } else {
      const index = checkedBoxes.findIndex((ch) => ch.DA_ID === item.DA_ID);
      checkedBoxes.splice(index, 1);
      document.getElementById('lnk_item_' + item.DA_ID).style.opacity = '0.5';
    }
    this.setState({ checkedBoxes });

    var JSONdata = {
      DA_ID: item.DA_ID,
      DA_Active: DA_Active
    };

    const API_url = this.state.base_url + "admin/updateActivePremium";
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
    this.props.history.push("/premium-feature");
    let JM_ID = 0; let JM_User_Profile_Url = "";
    if (this.state.userDetails != null && this.state.userDetails.length > 0) {
      JM_ID = this.state.userDetails[0].JM_ID;
      JM_User_Profile_Url = this.state.userDetails[0].JM_User_Profile_Url;
    }

    this.props.history.push({
      state: {
        directAccess: this.state.directAccess,
        JM_ID: JM_ID,
        JM_User_Profile_Url: JM_User_Profile_Url,
      }
    })

    console.log(this.props);
  }
  EmbedContent = () => {

  }
  doCopied = (e) => {
    e.target.innerHTML = 'Copied';
    e.target.style.background = 'black';
    e.target.style.color = 'white';

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
        headers: { "Content-Type": "application/json" },
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
    if (type === "video") {
      if (fileNameArr !== null && fileNameArr.length > 0)
        fileName = fileNameArr[0]
      JSONdata = {
        DA_ID: DA_ID,
        profileName: ProfileUrl,
        fileName: fileName
      };
    }
    if (type === "audio") {
      if (fileNameArr !== null && fileNameArr.length > 0)
        fileName = fileNameArr[0]
      JSONdata = {
        DA_ID: DA_ID,
        profileName: ProfileUrl,
        fileName: fileName
      };
    }
    if (type === "image") {
      if (fileNameArr !== null && fileNameArr.length > 0)
        fileName = fileNameArr[0]
      JSONdata = {
        DA_ID: DA_ID,
        profileName: ProfileUrl,
        fileName: fileName
      };
    }
    if (type === "NA") {

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
    const API_url = this.state.base_url + "admin/deleteProduct";
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
          this.refreshMobileView();
        }
        else
          alert('not fetch');
      });


  }
  isConfirm = () => {
    confirmAlert({
      title: 'Confirm !!!',
      message: 'Are you sure to Exit',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.OK
        },
        {
          label: 'No',
          onClick: () => this.CANCEL
        }
      ]
    });



  };

  uploadProfilePic = (e) => {

    const file = e.target.files[0];
    this.setState({ selectedFile: e.target.files[0] });
    this.setState({
      selectedFile: file
    }, () => {
      console.log(this.state.selectedFile);
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
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          this.setState({ uploadPercentage: percent })
        }
      }
    }

    axios.post(Api_url, formData, options).then(res => {
      if (res.data.status === 1) 
      {
        var userDetails = res.data.userDetails;
        if (userDetails != null && userDetails.length > 0)
        {
          this.setState({ avatar: res.data.url, uploadPercentage: 100 }, () => {
            setTimeout(() => {
              this.setState({ uploadPercentage: 0 })
            }, 1000);
          })
          this.setState({ userDetails });
          this.Get_User_Details();
          this.setState({
            openCropModal:false
          })
          this.refreshMobileView();

        }
      }
      else {
        alert("internal error occered");
      }
      console.log(res.data)

    })
  }

  doEditUrl = (e) => {
    e.preventDefault();
    if (this.state.Validation)
      //console.log(this.state.Validation)
      document.getElementById("req_msg").innerHTML = 'Nothing to Change';    
    else {

      // this.validate();
      const formData = new FormData();
      const files = e.target.files
      let Api_url = this.state.base_url + 'admin/updateProfileUrl';

      let old_url = localStorage.getItem('JM_User_Profile_Url');
      formData.append('old_url', old_url)
      formData.append('JM_ID', this.state.JM_ID)
      formData.append('JM_User_Profile_Url', this.state.JM_User_Profile_Url)
      fetch(Api_url, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          document.getElementById("req_msg").innerHTML = data.msg;       
          this.Get_User_Details();
          
        })
        .catch(error => {

          console.error(error)
        })

    }
  }
  onEditChangeUrl = (e) => {
    //this.setState({[e.target.name]:e.target.value});  
    let Url = e.target.value.replace(/[^a-z0-9\-\_]/gi, "");
    this.setState({ [e.target.name]: Url });
    let valid = true;
    if (Url.length > 0) {
      let API_url = this.state.base_url + "admin/ValidateURL_Profile";
      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JM_User_Profile_Url: Url, JM_ID: this.state.JM_ID })
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 1 || data.status === 2) {
            console.log(data.msg);
            document.getElementById("msg").innerHTML = data.msg;
            valid = true;
          }
          else {
            document.getElementById("msg").innerHTML = '';
            valid = false;

          }
          this.setState({ Validation: valid });
        });

    }
    else {
      document.getElementById("msg").innerHTML = 'enter url';
      this.setState({ Validation: false });
      return false;
    }
  }

  openModalDynamic = id => e => {
    // !this.state.openDynamic ?
    //   this.setState({ openDynamic: true })
    //   :
    //   this.setState({ openDynamic: false })
    console.log(e)
  }
  reload = (e) => {
    document.getElementById('iframeid').src += '';
    console.log("ok")
  }

  onDragEndSocialWidget = (result) => {
    console.log(result)
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
    console.log(socialWidget)
    this.UpdateOrderBySocialWidget(socialWidget);
  }
  UpdateOrderBySocialWidget = (socialWidget) => {

    let JSONdata = {
      socialWidget: socialWidget
    };
    const API_url = this.state.base_url + "admin/updateOrderBySocialWidget";
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
    console.log(result)
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
    let JSONdata = {
      customLink: customLink
    };
    const API_url = this.state.base_url + "admin/updateOrderByCustomLink";
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
    console.log(result)
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
    console.log(productList)
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
    this.livepreview.UpdateMobileView();
  }

  updateUserName = (e) => {
    document.getElementById('userName').value = e.target.value;
    console.log(e.target.value)
  }
  onChangeNameDesc = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'JM_Name')
      this.updateProfile('JM_Name', e.target.value);
    else
      this.updateProfile('JM_Description', e.target.value);
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
        headers: { "Content-Type": "application/json" },
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

      if (colapseBoxes.filter(item => item.id === id).length === 0) {
        colapseBoxes.push({ id: id, isOpen: true });
      }
      colapseBoxes.map((item, i) => {
        (item.id !== id) ? item.isOpen = false : item.isOpen = true;
      });
    }

    console.log(colapseBoxes);
    this.setState({ colapseBoxes });
    let element = document.getElementById("Collapse_" + id);
    var className = element.classList.value;
    console.log(element.classList.value)
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
    console.log(event.target.value)
  };
  moveCustomLinks = () => {
    console.log(this.state.radio)
    console.log(this.state.LM_ID_Move)
    console.log(this.state.JM_ID_Move)
    //if(this.state.radio > 0)
    //{
    let folderId = this.state.radio;
    let type = 'customLink';
    this.MoveLinkToFolder(folderId, this.state.JM_ID_Move, this.state.LM_ID_Move, type);
    // }

  }
  MoveLinkToFolder = (folderId, JM_ID, LinkId, type) => {
    let JSONdata = [];
    if(folderId > 0)
    {
        if (type === 'customLink') {
          JSONdata = {
            type: type,
            CM_ID: folderId,
            JM_ID: JM_ID,
            LM_ID: LinkId
          };
        }
        const API_url = process.env.REACT_APP_API_URL + "admin/moveLinkToFolder";
        fetch(API_url,
          {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(JSONdata)
          })
          .then((response) => response.json())
          .then(data => {
            if (data.status === 1) 
            {
              this.Get_User_Details();
              this.setState({
                show: true,
                title: 'Success!!!',
                msg: 'Link is Moved Successfully',
                // isLoading:true   
              });
              this.refreshMobileView();
            }
            else 
            {
              this.setState({
                show: false,
                title: 'Failed!!!',
                msg: 'Failed to Move',
                // isLoading:true   
              });
            }
          });
    }
    else
    {
      this.setState({
        show: true,
        title: 'Info!!!',
        msg: 'Select a folder',
        // isLoading:true   
      });
      return false;
    }
  }
  createCategoryLinks = id => e => {
    let category_links;
    category_links = this.state.category_links.map((link, i) => {
      return (
        link.LM_Folder_ID > 0 && id === link.LM_Folder_ID ?
          <div className="item" id={'lnk_item_' + link.LM_ID}>
            <p style={{ fontWeight: 'bold', color: '#ff6f6e' }}>Custom Link</p>
            <div className="move"><MoreVertIcon /></div>
            <div className="top-part">
              {
                link.LM_Image === '' ?
                  <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                  :
                  <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.LM_Image} /></div>
              }

              <h4> {link.LM_Title}</h4>
            </div>
            <div className="bottom-part">
              <div className="row">
                <div className="col-lg-2">
                  <label className="switch" for={'lnk_' + link.LM_ID}>
                    <input type="checkbox" id={'lnk_' + link.LM_ID} name={'lnk_' + link.LM_ID}
                      checked={this.state.checkedBoxes.find((ch) => ch.LM_ID === link.LM_ID)}
                      onClick={this.doActive(link)}
                    />
                    <div className="slider round" ></div>
                  </label>
                </div>
                <div className="col-lg-10 text-right">
                  {/* <button><ShareIcon /></button> */}
                  <button data-remove={link.LM_Folder_ID} onClick={() => { this.setState({ openMoveLinkModel: true, LM_ID_Move: link.LM_ID, JM_ID_Move: link.JM_ID, CM_ID_Move: link.LM_Folder_ID }) }}><OpenWithSharpIcon /></button>
                  <EditLinks data={this.state.linkMaster[i]} setStateAfterInsert={this.setStateAfterInsert} />
                  <input type="hidden" name="hidden" value={link.LM_ID}></input>
                  <button data-remove={link.LM_ID} onClick={this.doDeleteLink}><DeleteForeverIcon /></button>
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
  render() {
    const { uploadPercentage } = this.state;
    const { crop, profile_pic, src } = this.state
    //const urlParams = queryString.parse(window.location.search);

    //console.log(`The code is: ${urlParams.code}`);

    let imagePath = this.state.base_url + this.state.ProfilePath;
    let base_url = this.state.base_url;
    let linkPath = "";
    let JM_User_Profile_Url_plus_JM_ID = "";
    let JM_Profile_Pic = ""; let JM_User_Profile_Url = "", JM_Payout_Details = 0, JM_Verified = 0, isRequested = 1, isRequestForChangeUrl = 0;

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
        break;
      }
      localStorage.setItem('JM_Profile_Pic', JM_Profile_Pic);
      localStorage.setItem('JM_User_Profile_Url', JM_User_Profile_Url);
      

      var root_url = this.state.root_url;

      console.log(JM_User_Profile_Url)
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
    let embed_content;
    embed_content = this.state.embed_content.map((lnk, i) => {
      return (
        <div className="item" id={'lnk_item_' + lnk.EC_ID}>         
          <div className="move"><MoreVertIcon /></div>
          <div className="top-part">

            <div className="row">
              <div className="col-md-4">
                <h4>Embed Link</h4>
              </div>
              <div className="col-md-8">
                <label className="switch" for={'lnk_' + lnk.EC_ID}>
                  <input type="checkbox" id={'lnk_' + lnk.EC_ID} name={'lnk_' + lnk.EC_ID}
                    checked={this.state.checkedBoxes.find((ch) => ch.EC_ID === lnk.EC_ID)}
                    onClick={this.doActiveEmbed(lnk)}
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
                  lnk.LM_Image === '' ?
                    <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                    :
                    <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + lnk.LM_Image} /></div>
                }

              </div>
              <div className="col-md-6">
                <div className="text">
                  <h4>{lnk.LM_Title}</h4>
                </div>
              </div>


              <div className="col-md-4 text-right">
                {/* <button><ShareIcon /></button> */}
                {/* <button onClick={()=>{this.setState({openMoveLinkModel:true,LM_ID_Move:lnk.LM_ID,JM_ID_Move:lnk.JM_ID})}}><OpenWithSharpIcon/></button> */}
                <EditEmbedContent data={this.state.embed_content[i]} setStateAfterInsert={this.setStateAfterInsert} JM_User_Profile_Url={this.state.JM_User_Profile_Url} />
                <input type="hidden" name="hidden" value={lnk.EC_ID}></input>
                <button data-remove={lnk.EC_ID} onClick={this.doDeleteEmbed}><DeleteForeverIcon /></button>
              </div>
            </div>
          </div>
        </div>
      )
    })
    let category_master;
    category_master = this.state.category_master.map((link, i) => {
      return (
        <>

          <div className="item" id={'lnk_item_' + link.CM_ID} >
            <div className="top-part">

              {/* <p style={{ fontWeight: 'bold', color: '#ff6f6e', fontSize: '24px' }}>{link.CM_Folder_Title}</p> */}
              {/* <p style={{ fontWeight: 'bold', color: 'gray', fontSize: '18px' }}>{link.CM_Folder_Sub_Title}  </p> */}


              <div className="row">
                <div className="col-md-4">
                  <h4>{link.CM_Folder_Title}</h4>
                </div>
                <div className="col-md-8">
                  <label className="switch" for={'link_' + link.CM_ID}>
                    <input type="checkbox" id={'link_' + link.CM_ID} name={'lnk_' + link.CM_ID}
                      checked={this.state.checkedBoxes.find((ch) => ch.CM_ID === link.CM_ID)}
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
                    (link.CM_Folder_Back_Image === null || link.CM_Folder_Back_Image === '') && (link.CM_Icon === '' || link.CM_Icon === null) ?
                      <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                      : (link.CM_Folder_Back_Image !== null || link.CM_Folder_Back_Image !== '') && link.CM_Icon === '' ?
                        <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.CM_Folder_Back_Image} /></div>
                        : (link.CM_Icon !== '' || link.CM_Icon !== null) ?
                          <div className="icon"><MDBIcon icon={link.CM_Icon} size="2x" /></div>
                          :
                          <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                  }
                </div>
                <div className="col-md-6">
                  <div className="text">
                    <h4>{link.CM_Folder_Sub_Title} </h4>
                  </div>
                </div>

                <div className="col-md-4 text-right">
                  <button onClick={this.collapseHandleClick(link.CM_ID)} style={{ display: 'none' }} id={"minus_icon_" + link.CM_ID}><IndeterminateCheckBoxOutlinedIcon /></button>
                  <button onClick={this.collapseHandleClick(link.CM_ID)} id={"plus_icon_" + link.CM_ID} style={{ display: 'inline-block' }} ><AddCircleOutlineOutlinedIcon /></button>
                  <EditStackedLink category_master={this.state.category_master[i]} CM_ID={link.CM_ID}
                    JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} />
                  <input type="hidden" name="hidden" value={link.CM_ID}></input>
                  <button data-remove={link.CM_ID} onClick={this.doDeleteCategory}><DeleteForeverIcon /></button>
                </div>
              </div>
              <span id={"hide_show_text_" + link.CM_ID} style={{ display: 'none' }}> Show</span>

            </div>
            <div className="move"><MoreVertIcon />
            </div>
            <Collapse in={this.state.colapseBoxes.find(x => x.id === link.CM_ID)?.isOpen}
              id={'Collapse_' + link.CM_ID}>
              {
                this.state.category_links !== null && this.state.category_links.length > 0 ?
                  <div id={"example-collapse-text"}>
                    {

                      this.state.category_links.map((lnk, i) => {
                        return (
                          lnk.LM_Folder_ID > 0 && lnk.LM_Folder_ID === link.CM_ID ?
                            <div className="item" id={'lnk_item_' + lnk.LM_ID}>
                              {/* <p style={{ fontWeight: 'bold', color: '#ff6f6e' }}>Custom Link</p> */}
                              <div className="move"><MoreVertIcon /></div>
                              <div className="top-part">


                                <div className="row">
                                  <div className="col-md-4">
                                    <h4>Custom Link</h4>
                                  </div>
                                  <div className="col-md-8">
                                    <label className="switch" for={'lnk_' + lnk.LM_ID}>
                                      <input type="checkbox" id={'lnk_' + lnk.LM_ID} name={'lnk_' + lnk.LM_ID}
                                        checked={this.state.checkedBoxes.find((ch) => ch.LM_ID === lnk.LM_ID)}
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
                                      lnk.LM_Image === '' && (lnk.LM_Icon === '' || lnk.LM_Icon === null) ?
                                        <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                        : lnk.LM_Image !== '' && lnk.LM_Icon === '' ?
                                          <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + lnk.LM_Image} /></div>
                                          : lnk.LM_Icon !== '' && lnk.LM_Image === '' ?
                                            <div className="icon"> <MDBIcon icon={link.LM_Icon} size="2x" /></div>
                                            :
                                            <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                    }
                                  </div>
                                  <div className="col-md-6">
                                    <div className="text">
                                      <h4> {lnk.LM_Title}</h4>
                                    </div>
                                  </div>
                                  <div className="col-md-4 text-right">
                                    {/* <button><ShareIcon /></button> */}
                                    <button onClick={() => { this.setState({ openMoveLinkModel: true, LM_ID_Move: lnk.LM_ID, JM_ID_Move: lnk.JM_ID }) }}><OpenWithSharpIcon /></button>
                                    <EditLinks data={this.state.linkMaster[i]} setStateAfterInsert={this.setStateAfterInsert} />
                                    <input type="hidden" name="hidden" value={lnk.LM_ID}></input>
                                    <button data-remove={lnk.LM_ID} onClick={this.doDeleteLink}><DeleteForeverIcon /></button>
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

        </>
      )
    })

    let productList;
    productList = this.state.productList.map((link, i) => (
     
        link.DA_DA_ID > 0 ?    
      <Draggable key={i} draggableId={i + " "} index={i}>
        {(provided) => (
          <div className="item" id={'lnk_item_' + link.DA_ID} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}>
            {/* <p style={{ fontWeight: 'bold', color: '#ff6f6e' }}>Premium Content</p> */}

            <div className="top-part">
              <div className="row">
                <div className="col-md-4">
                  {/* <h4>{link.DA_DA_ID===1 ? 'Personalized Video or Audio Message' : link.DA_DA_ID===2 ? 'Unlock Content' : 'Premium Features'}</h4> */}
                  <h4>{link.DA_DA_ID === 1 ? 'Personalized Message' : link.DA_DA_ID === 2 ? 'Unlock Content':null}</h4>
                </div>
                <div className="col-md-8">
                  {
                    JM_Payout_Details === 1 && (link.DA_Type !== 'gifts' ||  link.DA_Type !== 'support')?
                      <label className="switch" for={'lnk_' + link.DA_ID}>
                        <input type="checkbox" id={'lnk_' + link.DA_ID} name={'lnk_' + link.DA_ID}
                          checked={this.state.checkedBoxes.find((ch) => ch.DA_ID === link.DA_ID)}
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
                      link.DA_Type === "video" ?
                        <PlayCircleOutlineIcon style={{ fontSize: "50px", color: "#007bff" }} />
                        : null
                    }
                    {
                      link.DA_Type === "image" ?
                        <PhotoAlbumIcon style={{ fontSize: "50px", color: "#007bff" }} />
                        : null
                    }
                    {
                      link.DA_Type === "audio" ?
                        <AudiotrackIcon style={{ fontSize: "50px", color: "#007bff" }} />
                        : null
                    }
                    {
                      link.DA_Type === "album" ?
                        <PhotoAlbumIcon style={{ fontSize: "50px", color: "#007bff" }} />
                        : null
                    }
                    {
                      link.DA_Type === "NA" ?

                        <CameraAltOutlinedIcon style={{ fontSize: "50px", color: "#007bff" }} />
                        : null
                    }
                    {
                      link.DA_Type === 'txt' ?

                        <DescriptionOutlinedIcon style={{ fontSize: 35 }} />
                        :
                        null
                    }
                    {
                      link.DA_Type === 'pdf' ?

                        <PictureAsPdfOutlinedIcon style={{ fontSize: 35 }} />
                        :
                        null
                    }

                  </div>


                </div>
                <div className="col-md-6">
                  <div className="text">
                    <h4>{link.DA_Title + " (Rs. " + link.DA_Price + ")"}</h4>
                  </div>
                </div>
                <div className="col-md-4 text-right">
                  {/* <button><ShareIcon /></button> */}
                  {
                    (link.DA_Type === 'video' || link.DA_Type === 'image' || link.DA_Type === 'NA') && link.DA_DA_ID === 1 ?
                      <EditPremiumFeature data={this.state.productList[i]} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} />
                      :
                      link.DA_DA_ID === 2 ?
                        <EditUnlockContent data={this.state.productList[i]} JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} showToast={this.showToast} />
                        :
                        null
                  }

                  <input type="hidden" name="hidden" value={link.DA_ID}></input>
                  <button data-remove={link.DA_ID} data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID}
                    data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID} data-fileName={link.DA_Collection}
                    data-type={link.DA_Type}
                    onClick={this.deleteProduct}><DeleteForeverIcon /></button>
                </div>
              </div>
            </div>
          </div>

        )}
      </Draggable>
      :
      null
    ))


    let socialWidget;
    socialWidget = this.state.socialWidget && this.state.socialWidget.map((link, i) => (
      link.SWM_Url !== "" ?
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
                    <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.SWM_Icon} /></div>
                  </div>
                  <div className="col-md-6">
                    <div className="text">
                      <h4>{link.SWM_Title}</h4>
                    </div>
                  </div>
                  <div className="col-md-4 text-right">
                    {/* <button><ShareIcon /></button> */}
                    <EditSocialWidget socialWidget={this.state.socialWidget[i]} setStateAfterInsert={this.setStateAfterInsert} userDetails={this.state.userDetails}/>
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
        link.DA_Type==='gifts'?
        <div className="gift-item">
          { 
          link.DA_Collection.includes('.gif')?
          <img src={link.DA_Collection} />
          :
          <MonetizationOnIcon  style={{fontSize:'56px'}} />
          }


       

          <p>{"Rs. " + link.DA_Price}</p>
          <div className="row">

         {
          link.DA_DA_ID===999 ?
          <EditSupportMe src={link.DA_Collection} gift={this.state.gifts[i]} setStateAfterInsert={this.setStateAfterInsert} />

          :
          <EditPopGift src={link.DA_Collection} gift={this.state.gifts[i]} setStateAfterInsert={this.setStateAfterInsert} />

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
        :
        null
      )
    })

    let supportMe;
    supportMe = this.state.gifts.map((link, i) => {
      return (
        link.DA_Type==='support' ?
        <div className="gift-item">
          <MonetizationOnIcon style={{fontSize:'56px'}}/>
          <p>{"Rs. " + link.DA_Price}</p>
          <div className="row">

            <EditSupportMe src={link.DA_Collection} gift={this.state.gifts[i]} setStateAfterInsert={this.setStateAfterInsert} />


            <input type="hidden" name="hidden" value={link.DA_ID}></input>
            <button data-remove={link.DA_ID} data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID}
              data-ProfileUrl={JM_User_Profile_Url_plus_JM_ID} data-fileName={link.DA_Collection}
              data-type={link.DA_Type}
              onClick={this.deleteGift}>
              <DeleteForeverIcon />
            </button>
          </div>
        </div>
        :
        null
      )
    })

    let LiveMobile = (
      <>
            <LivePreview state={this.state} ref={this.livepreview} />
        <button onClick={this.refreshMobileView} style={{ display: 'none' }}>Click</button>
      </>
    )



    return (
      <>
{/*        
      <Helmet>
         <title>{this.state.JM_Name + ' | Expy'}</title>  


        <meta name="description" content={"Everything about "+this.state.JM_Name+" in one place. Follow and Connect with " +this.state.JM_Name}/>
       
  
     </Helmet>  */}


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
            <div className="row">
              <div className="col-md-8">
                <div className="profilePart">
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

                            <input type="file" id="prop_up" style={{ display: "none" }}  accept="image/png, image/jpeg,image/gif"   onChange={this.handleFile} />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="name">
                            <input type="text" className="form-control" id="userName" name="JM_Name" value={this.state.JM_Name} onChange={this.onChangeNameDesc} />
                            <textarea type="text" className="form-control" id="tagLine" name="JM_Description" value={this.state.JM_Description === 'NA' || this.state.JM_Description === 'Write your tagline' ? '' : this.state.JM_Description} onChange={this.onChangeNameDesc} placeholder="Your Bio"/>
                          </div>
                        </div>

                        <div className="col-md-3">
                      
                          {/* {uploadPercentage > 0 && <ProgressBar animated variant="success" style={{ width: '100%' }} now={uploadPercentage} active label={`${uploadPercentage}%`} />} */}
                        
                        
                          {/* <button id="btn" style={{display:'block'}} onClick={this.reload} >Reuqest For Verification</button> */}
                          <NavLink className="set-btn"
                            to={{ pathname: "/settings", userDetails: this.state.userDetails }} >
                            <SettingsOutlinedIcon /> Settings
                            </NavLink>
                          {/* <a className="set-btn" style={{padding:'9px 24px',marginTop:'5px'}} href={root_url + JM_User_Profile_Url}>
                               View My Page
                            </a> */}

                        </div>

                      </div>






                    </div>
                    <div className="prop-link">
                      <div className="row">
                        <div className="col-md-3">
                          <p> Your expy.bio link: </p>
                        </div>
                        <div className="col-md-7">
                          <span id="copy_text" className="copy-text">{root_url + JM_User_Profile_Url}</span>
                          <input type="hidden" id="url" value={JM_User_Profile_Url} />
                          <span className="edit-text">
                            <i className="fa fa-edit" onClick={() => this.setState({ openEditURLModal: true, JM_User_Profile_Url: JM_User_Profile_Url })}></i>
                          </span>
                        </div>

                        <div className="col-md-2">
                          <CopyToClipboard text={root_url + JM_User_Profile_Url}>
                            <button onClick={this.doCopied} className="copybtn">Copy</button>
                          </CopyToClipboard>
                        </div>
                      </div>

                      <br />

                      {
                        isRequested === 0 ?
                          <button onClick={this.doRequestVerify} id="btn_Request" className="copybtn" style={{ float: 'none', margin: 'auto', display: 'table' }}> Request verification</button>
                          // <i className="fa fa-check-circle-o" aria-hidden="true"></i>
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
                      <Collapse in={this.state.open} style={{ padding: '20px' }}>

                        <div id="example-collapse-text">
                          <div className="row justify-content-center" >
                            <div className="col-md-4">
                              <SocialWidget showToast={this.showToast}
                                JM_ID={this.state.JM_ID}
                                JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} Get_User_Details={this.Get_User_Details} setStateAfterInsert={this.setStateAfterInsert} userDetails={this.state.userDetails} />

                            </div>
                            <div className="col-md-4">
                              <AddNewLink showToast={this.showToast}
                                JM_ID={this.state.JM_ID}
                                JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} Get_User_Details={this.Get_User_Details} setStateAfterInsert={this.setStateAfterInsert} />

                            </div>
                            <div className="col-md-4">
                              <StackedLink JM_ID={this.state.JM_ID}
                                JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} setStateAfterInsert={this.setStateAfterInsert} />

                            </div>
                            <div className="col-md-4">
                              <EmbedContent showToast={this.showToast}
                                JM_ID={this.state.JM_ID}
                                JM_User_Profile_Url_plus_JM_ID={JM_User_Profile_Url_plus_JM_ID} Get_User_Details={this.Get_User_Details} setStateAfterInsert={this.setStateAfterInsert} />

                            </div>
                            <div className="col-md-4">
                              <div className="card-btun" onClick={this.DirectAccess}>
                                <AddCircleOutlineOutlinedIcon />
                                <h4>Premium Features</h4>
                                <p>Sell & earn</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                    <DragDropContext onDragEnd={this.onDragEndSocialWidget}>
                      <Droppable droppableId="dp1" >
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {socialWidget}
                          </div>

                        )}

                      </Droppable>
                    </DragDropContext>

                    {/* custom link */}
                    <DragDropContext onDragEnd={this.onDragEndCustomLink}>
                      <Droppable droppableId="dp2" >
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {this.state.linkMaster && this.state.linkMaster.map((link, i) => (
                              link.LM_Url !== "" && link.LM_Folder_ID === 0 ?
                                <Draggable key={i} draggableId={i + " "} index={i}>
                                  {(provided) => (
                                    <div className="item" id={'lnk_item_' + link.LM_ID} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}>
                                      {/* <p style={{ fontWeight: 'bold', color: '#ff6f6e' }}>Custom Link</p> */}
                                      <div className="move"><MoreVertIcon /></div>
                                      <div className="top-part">

                                        <div className="row">
                                          <div className="col-md-4">
                                            <h4>Custom Link</h4>
                                          </div>
                                          <div className="col-md-8">
                                            <label className="switch" for={'lnk_' + link.LM_ID}>
                                              <input type="checkbox" id={'lnk_' + link.LM_ID} name={'lnk_' + link.LM_ID}
                                                checked={this.state.checkedBoxes.find((ch) => ch.LM_ID === link.LM_ID)}
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
                                              link.LM_Image === '' && (link.LM_Icon === '' || link.LM_Icon === null) ?
                                                <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                                : link.LM_Image !== '' && link.LM_Icon === '' ?
                                                  <div className="icon"><img style={{ width: '100%' }} src={process.env.REACT_APP_UPLOAD_URL + link.LM_Image} /></div>
                                                  : link.LM_Icon !== '' && link.LM_Image === '' ?
                                                    <div className="icon"> <MDBIcon icon={link.LM_Icon} size="2x" /></div>
                                                    :
                                                    <div className="icon"><img src={process.env.REACT_APP_UPLOAD_URL + 'no_image.png'} /></div>
                                            }
                                          </div>

                                          <div className="col-md-6">
                                            <div className="text">
                                              <h4>{link.LM_Title}</h4>
                                            </div>
                                          </div>
                                          <div className="col-md-4 text-right">
                                            {/* <button><ShareIcon /></button> */}
                                            <button onClick={() => { this.setState({ openMoveLinkModel: true, LM_ID_Move: link.LM_ID, JM_ID_Move: link.JM_ID }) }}><OpenWithSharpIcon /></button>
                                            <EditLinks data={this.state.linkMaster[i]} setStateAfterInsert={this.setStateAfterInsert} />
                                            <input type="hidden" name="hidden" value={link.LM_ID}></input>
                                            <button data-remove={link.LM_ID} onClick={this.doDeleteLink}><DeleteForeverIcon /></button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                                :
                                null
                            ))}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>


                    {category_master}


                    <DragDropContext onDragEnd={this.onDragProductList}>
                      <Droppable droppableId="dp3" >
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {productList}
                          </div>

                        )}
                      </Droppable>
                    </DragDropContext>



                    {embed_content}
                    <div className="item">
                      <div className="move"><MoreVertIcon />
                      </div>
                      <div className="top-part">
                        <h4>Virtual Gifts</h4>

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
                    {/* <div className="item">
                      <div className="move"><MoreVertIcon />
                      </div>
                      <div className="top-part">
                        <h4>Support Me</h4>

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
                        {supportMe}
                      </div>
                    </div> */}

                    {/* <div className="item">
                      <div className="move"><MoreVertIcon /></div>
                      <div className="top-part">
                        <h4>Refferal Link</h4>
                        <div className="text">
                          <p>This will show an item on your profile in this position that will prompt users to register to get their own page, you'll earn 5% of anything they sell.</p>
                          <p>You can also directly invite your friends and followers using your referral link which you can find <a href="#">here</a></p>
                        </div>
                      </div>
                      <div className="bottom-part">
                        <div className="row">
                          <div className="col-lg-6">
                            <label className="switch" for="Link">
                              <input type="checkbox" id="Link" />
                              <div className="slider round"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <Modal
                    size="sm"
                    show={this.state.openEditURLModal}
                    onHide={() => this.setState({ openEditURLModal: false })}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop="static"
                    keyboard={false}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
                        Request to Edit Profile Username
                                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <input type="text" className="form-control" placeholder="username" name="JM_User_Profile_Url" value={this.state.JM_User_Profile_Url} onChange={this.onEditChangeUrl} />
                    </Modal.Body>
                    <Modal.Footer>
                      <p id="msg" style={{ color: 'red' }}></p>
                      <div className="btun-box">
                        {
                          isRequestForChangeUrl === 0 ?
                            <Button onClick={this.doEditUrl} className="btun btun_1">Request</Button>
                            :
                            <Button className="btun btun_1" disabled >Request Sent</Button>
                        }
                        <p id='req_msg'></p>
                        {/* <p style={{color:' #ea9515',fontWweight: 'bold',fontSsize: '12px'}}>
                             Note: if you update this current username you will not able to see any data of earlier username. 
                         </p> */}
                      </div>
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
            <h5 style={{fontSize:'20px',marginBottom:'10px',fontWeight:'bold' }}>Your Desired Folder(s)</h5>
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
        <FooterClass />
      </>
    )

  }
}
export default withRouter(MyProfile);

