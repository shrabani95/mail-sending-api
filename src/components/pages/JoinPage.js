import React, { Component } from 'react'

import {  NavLink,  } from 'react-router-dom'
import {  Button } from 'react-bootstrap';
import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import * as queryString from 'query-string';
import FacebookLogin from 'react-facebook-login';
import Modal from 'react-bootstrap/Modal'
import GoogleLogin from 'react-google-login';
import API from '../services/API';
import { Helmet } from "react-helmet";

class JoinPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      base_url: process.env.REACT_APP_API_URL,
      root_url: process.env.REACT_APP_ROOT_URL,
      JM_Referral: 'NA',
      JM_Name: '',
      JM_Phone: '',
      JM_Email: localStorage.getItem('JM_Email'),
      JM_ID: localStorage.getItem('JM_ID'),
      JM_Password: '',
      JM_User_Profile_Url: '',
      JM_Insta_Url: '',
      JM_Utube_Url: '',
      JM_Twiter_Url: '',
      JM_Profie_Pic: 'images/prop_pic.png',
      Validation: true,
      EmailValidation: true,
      inserted_id: 0,
      tab_Reff_show: false,
      tabTerms_show: false,
      tab1_show: true,
      tab2_show: false,
      tab3_show: false,
      data: null,
      selectedFile: null,
      facebookResponse: [],
      showEmailModal: false,
      fb_email: '',
      fb_emailValid: false,
      showGoogleModal: false,
      GoogleResponse: [],
      validUserName: false,
    
      termCondi: false

    }
    if (typeof this.state.JM_Email !== 'undefined') {
      if (this.state.JM_Email !== "" && parseInt(this.state.JM_ID) > 0) {
        window.location.href = '/me';
      }
    }
  }
  onChangeHandle = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.performValidation();
    if (e.target.name === 'JM_Password') 
    {
      document.getElementById("msg_pass").innerText = '';
      if (e.target.value.length < 6)
      {
        document.getElementById("msg_pass").innerText = 'Min. 6 characters required for password';
        return false;
      }

    }
    if(e.target.name === 'JM_Referral') 
    {
      localStorage.setItem('JM_Referral', e.target.value);
    }
  }
  onChangeHandleURL = (e) => {

    // let value = e.target.value
    //value = value.replace(/[^A-Za-z]/ig, '')
    this.setState({ JM_User_Profile_Url: e.target.value.replace(/[^\w\s]/gi, "") });

  }
  doNext = async() => {
    document.getElementById("msg").innerHTML='';
    document.getElementById("msg_terms").innerHTML = "";
    document.getElementById("msg_pass").innerText ='';
    document.getElementById("msg_ref").innerHTML='';   

    if(this.state.JM_Name.length===0)
    {
      document.getElementById("msg_terms").innerHTML='* Enter Name';    return false;
    }

   if(this.state.JM_Email.length === 0)
   {
    document.getElementById("msg_terms").innerHTML='* Enter Email-Id';    return false;
   } 
   if( this.state.JM_User_Profile_Url.length === 0)
   {
       document.getElementById("msg_terms").innerHTML='* Enter Expy username';
       return false;
   }
   if(this.state.JM_Password.length ===0)
   {
    document.getElementById("msg_terms").innerHTML='* Enter Passowrd';    return false;
   } 
 


     
      var data=await API.EmailValidation(this.state.JM_Email);
      document.getElementById("email_msg").innerHTML='';
      if(data.status===1)
      {
        document.getElementById("email_msg").innerHTML = "Email address already exists. Please try a different email address";
        return false;
      }
      if(data.status===2)
      {
        document.getElementById("email_msg").innerHTML = "Not a valid email";
        return false;
      }
      if (this.state.JM_Password.length < 6)
      {
        document.getElementById("msg_pass").innerText = 'Min. 6 characters required for password';
        
        return false;
      }
      if(this.state.JM_Phone.length > 0 && this.state.JM_Phone.length < 10)
      {
          
        document.getElementById("msg_phone").innerHTML="Invalid phone number";  
        return false;   
      }   

      if(this.state.JM_Phone.length === 10)
      {
        document.getElementById("msg_phone").innerHTML='';
        let resp=await API.isAvailablePhone_by_phone(this.state.JM_Phone);
        var msg="";
        if(resp===false)
        {
          msg="Phone number is exist,try another phone number";
          document.getElementById("msg_phone").innerHTML=msg;     
          return false;   
        }       
       
      }      

      //refcode validation
      if(this.state.JM_Referral.length > 0 && this.state.JM_Referral!=='NA')      
      {
        data=await API.validReferralCode(this.state.JM_Referral);
        ////console.log(data)
        document.getElementById("msg_ref").innerHTML='';   
        if(data.status===0)
        {
          document.getElementById("msg_ref").innerHTML='Invalid invite code.';   
          return false;
        }
      }

      document.getElementById("msg_terms").innerHTML='';
      if(this.state.termCondi===false)
      {
        document.getElementById("msg_terms").innerHTML = 'Please accept terms & conditions to proceed';
        return false;
      }
      let inserted_id = 0;

      let API_url = this.state.base_url + "admin/join";
      var flagData = {
        JM_Name: this.state.JM_Name,
        JM_Email: this.state.JM_Email,
        JM_Password: this.state.JM_Password,
        JM_User_Profile_Url: this.state.JM_User_Profile_Url,
        JM_Referral: this.state.JM_Referral,
        JM_Phone: this.state.JM_Phone
      };

      const flag=API.encryptData(flagData);
      let  JSONdata = {
          flag: flag
        };


      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSONdata)
      }).then(function (response) {
        return response.json();
      }).then(data => {

        if (data.status === 1) 
        {
          ////console.log(data.msg);
          const dataRep=API.decryptJson(data.flag);
          inserted_id = dataRep.lastId;
          this.setState({
            JM_ID: inserted_id,         
          });
          //document.getElementById("msg").innerHTML=data.msg;
        }
        else if(data.status === -1)
        {
          document.getElementById("email_msg").innerHTML = data.msg;
          return false;
        }
        else {
          document.getElementById("msg").innerHTML = data.msg;
          return false;
        }

        if (inserted_id > 0)
          this.setState({ tab_Reff_show: false, tab1_show: false, tab2_show: true });
        else
          this.setState({ tab_Reff_show: false, tab1_show: true, tab2_show: false });


      });
  
   
  }

  //11-apr-2021
  validReferralCode = (e) => {

    if (this.state.JM_Referral.length > 0) {
      let API_url = this.state.base_url + "admin/validReferralCode";
      var JSONdata = {
        code: this.state.JM_Referral,
      };
      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSONdata)
      }).then(function (response) {
        return response.json();
      }).then(data => {

        if (data.status === 1) {
          this.setState({
            tab_Reff_show: false,
            tabTerms_show: true,
            tab1_show: false,
            tab2_show: false,
            tab3_show: false,
          });
        }
        else {
          this.setState({
            tab_Reff_show: true,
            tabTerms_show: false,
            tab1_show: false,
            tab2_show: false,
            tab3_show: false,
          });
          document.getElementById("msg_ref").innerHTML = "Not a valid invite Code";

        }
      });
    }
    else {
      document.getElementById("msg_ref").innerHTML = "Enter Invite Code";
      return false;
    }
  }

  //update the social urls
  doNextUrl = () => 
  {
    let inserted_id = 0;
    let API_url = this.state.base_url + "admin/update_url";
    
    const flag_id=API.encryptData(this.state.JM_ID);
    var flagData = {
      JM_ID: this.state.JM_ID,
      flag_id:flag_id,
      JM_Insta_Url: this.state.JM_Insta_Url,
      JM_Utube_Url: this.state.JM_Utube_Url,
      JM_Twiter_Url: this.state.JM_Twiter_Url,
      JM_User_Profile_Url_plus_JM_ID: this.state.JM_User_Profile_Url + "_" + this.state.JM_ID
    };

    const flag=API.encryptData(flagData);
    var JSONdata = {
      flag: flag
    };

    fetch(API_url, {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(JSONdata)
    }).then(function (response) {
      return response.json();
    }).then(data => {
      if (data.status === 1) 
      {
        this.setState({ tab_Reff_show: false, tab1_show: false, tab2_show: false, tab3_show: true });
      }
      else {
        document.getElementById("msg").innerHTML = data.msg;
        this.setState({ tab1_show: false, tab2_show: true });
        return false;
      }

    });
  }
  performValidation = () => {
    if (this.state.JM_Name.length > 0 && this.state.JM_Password.length >=6 && this.state.JM_Email.length > 0 && this.state.JM_Email.length > 5 && this.state.JM_User_Profile_Url.length > 0 && this.state.JM_Referral.length > 0) {
      this.setState({ Validation: false });
      return true;
    }
    else {
      return false;
    }
  }
  URLkeyup = () => {
    var evnt = document.getElementsByClassName("no-special-chars");
    var value = document.getElementsByClassName("no-special-chars").value;
    var start = evnt.selectionStart;
    var end = evnt.selectionEnd;
    var newValue = value.replace(/[^a-z0-9\-\_]/gi, "");
    var difference = value.length - newValue.length;
    ////console.log(newValue);
    evnt.setSelectionRange(start - difference, end - difference);
    this.setState({ JM_User_Profile_Url: newValue });
  }
  availableURl = (e) => 
  {
    let Url = e.target.value.replace(/[^a-z0-9\-\_]/gi, "");
    this.setState({ [e.target.name]: Url });
    let valid = true;
    if (Url.length > 0) {
      let API_url = this.state.base_url + "admin/ValidateURL";
      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JM_User_Profile_Url: Url })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 1 || data.status === 2) {
          ////console.log(data.msg);
          document.getElementById("msg").innerHTML = data.msg;
          valid = true;

        }
        else {
          document.getElementById("msg").innerHTML = '';
          valid = false;

        }

      });

      this.setState({ Validation: valid });
    }
    else {
      document.getElementById("msg").innerHTML = 'enter url';
      return false;
    }

  }

  // email validation
  availableEmail = (e) => {
    this.onChangeHandle(e);
    let email = e.target.value;
    let valid = true;
    document.getElementById("email_msg").innerHTML = '';
    if (email.length > 0 && email.includes('@') && email.includes('.')) 
    {
      let API_url = this.state.base_url + "admin/ValidateEmail";
      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JM_Email: email })
      }).then(function (response) {
        return response.json();
      }).then(function (data) 
      {
      
        if (data.status === 1) 
        {     
          document.getElementById("email_msg").innerHTML = "Email address already exists. Please try a different email address";
          valid = true;
        }
        else if(data.status === -1)
        {
          document.getElementById("email_msg").innerHTML = data.msg;
          valid = false;
        }
        else 
        {
          document.getElementById("email_msg").innerHTML = '';
          valid = false;

        }

      });

    }
    else {
      document.getElementById("email_msg").innerHTML = 'Not a valid email';
      valid = false;
    }
    this.setState({ Validation: valid });
  }

  displayImage = (e) => {
    const file = e.target.files[0];    
    var filePath = e.target.value;      
    
    if(typeof file==='undefined' || file===null )
    {
      this.setState({ selectedFile:null,JM_Profie_Pic:'' });
      return false;
    }

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpeg|\.jpg)$/i;                
    if (!allowedExtensions.exec(filePath)) 
    {
        alert('File type must be png or jpg or jpeg');
        e.target.value = '';
        this.setState({ selectedFile:null,JM_Profie_Pic:'' });
        return false;
    } 

    this.setState({ selectedFile: e.target.files[0] });
    this.setState({
      JM_Profie_Pic: URL.createObjectURL(file)
    });
  }

  handleImageUpload = event => {
    event.preventDefault();
    const formData = new FormData();
    const files = event.target.files
    ////console.log(this.state.JM_User_Profile_Url)
    if (this.state.selectedFile !== null) 
    {
      let Api_url = this.state.base_url + 'admin/profileImage';
      formData.append('sampleFile', this.state.selectedFile)

      const flagData={
        JM_ID:this.state.JM_ID,
        JM_User_Profile_Url:this.state.JM_User_Profile_Url,
        JM_Email: this.state.JM_Email,
        JM_Name: this.state.JM_Name
      }

      const flag=API.encryptData(flagData);   
      formData.append('flag',flag)
      // formData.append('JM_ID', this.state.JM_ID)
      // formData.append('JM_User_Profile_Url', this.state.JM_User_Profile_Url)
      // formData.append('JM_Email', this.state.JM_Email)
      // formData.append('JM_Name', this.state.JM_Name)


      document.getElementById('btn_lnch').innerText = 'Wait....';
      fetch(Api_url, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(async data1 => {
          ////console.log(data);
    
          if (data1.status === 1) 
          {

            const data=await API.decryptJson(data1.flag);
            var userDetails = data.userDetails;
            if (userDetails != null && userDetails.length > 0) {
              ////console.log(data.msg);
              localStorage.setItem('JM_ID', data.JM_ID);
              localStorage.setItem('JM_Email', this.state.JM_Email);
              localStorage.setItem('userDetails', JSON.stringify(userDetails));
              localStorage.setItem('directAccess', JSON.stringify(data.directAccess));
              localStorage.setItem('linkMaster', JSON.stringify(data.linkMaster));
              localStorage.setItem('JM_User_Profile_Url', userDetails[0].JM_User_Profile_Url);
              localStorage.setItem('JM_Name', this.state.JM_Name);
              localStorage.setItem('auth', data.token);  
              this.add_minutes();
              this.props.history.push("/me");
            }
            //this.doSignIn();               

          }
          else 
          {
            document.getElementById('btn_lnch').innerText = 'Launch!';
            alert(data1.msg);       

          }
          ////console.log(data)
        })
        .catch(error => {
          //console.error(error)
        })
    }
    else 
    {

      let Api_url = this.state.base_url + 'admin/noprofileImage';

      // formData.append('JM_ID', this.state.JM_ID)
      // formData.append('JM_Email', this.state.JM_Email)
      // formData.append('JM_Name', this.state.JM_Name)

      const flagData={
        JM_ID:this.state.JM_ID,   
        JM_Email: this.state.JM_Email,
        JM_Name: this.state.JM_Name
      }

      const flag=API.encryptData(flagData);   
      formData.append('flag',flag)

      document.getElementById('btn_lnch').innerText = 'Wait....';
      fetch(Api_url, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(async data1 => {
          if (data1.status === 1) 
          {

            const data=await API.decryptJson(data1.flag);
            var userDetails = data.userDetails;
            if (userDetails != null && userDetails.length > 0) 
            {
              ////console.log(data.msg);
              localStorage.setItem('JM_ID', data.JM_ID);
              localStorage.setItem('JM_Email', this.state.JM_Email);
              localStorage.setItem('userDetails', JSON.stringify(userDetails));
              localStorage.setItem('directAccess', JSON.stringify(data.directAccess));
              localStorage.setItem('linkMaster', JSON.stringify(data.linkMaster));
              localStorage.setItem('JM_User_Profile_Url', userDetails[0].JM_User_Profile_Url);
              localStorage.setItem('JM_Name', this.state.JM_Name);
              localStorage.setItem('auth', data.token);  
              
              
              // window.location='//consol'; 
              this.add_minutes();
              this.props.history.push("/me");
            }
            //this.doSignIn();               

          }
          else {
            alert("internal error occered");
          }
          ////console.log(data)
        })
        .catch(error => {
          //console.error(error)
        })
    }
  }
  lettersValidate = (key) => {
    var keycode = (key.which) ? key.which : key.keyCode;

    if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)) {
      return true;
    }
    else {
      return false;
    }

  }

  doSkip = () => {
    this.setState({ tab_Reff_show: false, tab1_show: false, tab2_show: false, tab3_show: true });
  }

  add_minutes = (e) => {
    var minutes = 25;
    var dt = new Date();
    var FromNewTime = new Date();
    var ToNewTime = new Date(dt.getTime() + minutes * 60000);

    localStorage.setItem('FromNewTime', FromNewTime);
    localStorage.setItem('ToNewTime', ToNewTime);
    localStorage.setItem('keepLogin', 0);
  }

  setFace = e => {
    ////console.log(process.env.REACT_APP_FACEBOOK_APP_ID)
    const stringifiedParams = queryString.stringify({
      client_id: 507049633635811,
      redirect_uri: process.env.REACT_APP_API_URL + 'me',
      scope: ['email', 'username'].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup',
    });
    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
    localStorage.setItem('FB_IG', "FB");
    window.location = facebookLoginUrl;
  }
  setIG = e => {
    const stringified = queryString.stringify({
      client_id: 371501700778779,
      redirect_uri: process.env.REACT_APP_API_URL + 'me',
      //redirect_uri: 'https://expy.bio/',
      scope: ['user_profile', 'user_media'].join(','), // comma seperated string
      response_type: 'code'
    });

    const instagramLoginUrl = `https://api.instagram.com/oauth/authorize?${stringified}`;
    localStorage.setItem('FB_IG', "IG");
    window.location = instagramLoginUrl;
  }
  //faceboook
  responseFacebook = (response) => {
    ////console.log(response);


    if (typeof response !== "undefined") {
      if (response.status === 'unknown') {
        //this.setState({facebookResponse:response,showEmailModal:true})
        return false;
      }
      if (response != null && response.email.length === 0) {
        this.setState({ facebookResponse: response, showEmailModal: true })
        return false;
      }

      if (response != null && response.email.length > 0 && response.id.length > 0) {
        var id = new Date().getTime();
        var data = {
          first_name: response.name.replace(/\s+/g, ''),
          email: response.email,
          id: response.id,
          JM_Referral: localStorage.getItem('JM_Referral'),
        };
        let API_url = process.env.REACT_APP_API_URL + "admin/socialLogin";

        fetch(API_url, {
          method: 'post',
          headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
          body: JSON.stringify(data)
        }).then(function (response) {
          return response.json();
        }).then(result => {
          if (result.status === 1) {
            var name = response.name.replace(/\s+/g, '') + id;
            //////console.log(data.msg);
            localStorage.setItem('JM_ID', result.JM_ID);
            localStorage.setItem('JM_Email', response.JM_Email);
            localStorage.setItem('JM_User_Profile_Url', result.JM_User_Profile_Url);
            localStorage.setItem('auth', result.token);  

            var minutes = 60;
            var dt = new Date();
            var FromNewTime = new Date();
            var ToNewTime = new Date(dt.getTime() + minutes * 60000);

            //////console.log(FromNewTime)
            //////console.log(ToNewTime)

            localStorage.setItem('FromNewTime', FromNewTime);
            localStorage.setItem('ToNewTime', ToNewTime);
            if (this.state.keepMeLogin === 1)
              localStorage.setItem('keepLogin', this.state.keepMeLogin);
            else
              localStorage.setItem('keepLogin', 0);

            window.location.href = '/me';
            //this.props.history.push("/me");
          }
          else 
          {
            //////console.log("failed to insert or fetch")
            localStorage.setItem('JM_Email', "");
            localStorage.setItem('JM_ID', 0);
            window.location.href = '/';
          }
        });

      }
      else {
        //////console.log("failed to insert or fetch")
        localStorage.setItem('JM_Email', "");
        localStorage.setItem('JM_ID', 0);
        //window.location.href = '/';
      }
    }
  }
  facebollbtnClick = () => {
    //////console.log("clicked")
    // alert();
  }
  fb_emailChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  doSocialSignUp = () => {

    this.checkEmail(this.state.fb_email);
  }
  nowSave = () => {

    let response = this.state.facebookResponse;
    var id = new Date().getTime();
    //////console.log(id.toString())
    //response.id=id;
    //response.name="sam11212";
    if (response != null && this.state.fb_email.length > 0 && response.id.toString().length > 0 && this.state.fb_emailValid === false) {
      var data = {
        first_name: response.name.replace(/\s+/g, ''),
        email: this.state.fb_email,
        id: response.id,
        JM_Referral: localStorage.getItem('JM_Referral')
      };
      let API_url = process.env.REACT_APP_API_URL + "admin/socialLogin";

      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(data)
      }).then(function (response) {
        return response.json();
      }).then(result => {
        if (result.status === 1) {
          var name = response.name.replace(/\s+/g, '') + id;
          ////console.log(data.msg);
          localStorage.setItem('JM_ID', result.JM_ID);
          localStorage.setItem('JM_Email', result.JM_Email);
          localStorage.setItem('JM_User_Profile_Url', result.JM_User_Profile_Url);
          localStorage.setItem('auth', result.token);  

          var minutes = 60;
          var dt = new Date();
          var FromNewTime = new Date();
          var ToNewTime = new Date(dt.getTime() + minutes * 60000);

          ////console.log(FromNewTime)
          ////console.log(ToNewTime)

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
          ////console.log("failed to insert or fetch")
          localStorage.setItem('JM_Email', "");
          localStorage.setItem('JM_ID', 0);
          window.location.href = '/';
        }
      });

    }
    else {
      ////console.log("failed to insert or fetch")
      localStorage.setItem('JM_Email', "");
      localStorage.setItem('JM_ID', 0);
      //window.location.href = '/';
    }
  }
  

  checkEmail = (email) => {


    let valid = true;
    document.getElementById("fb_msg").innerHTML = '';
    if (email.length > 0 && email.includes('@') && email.includes('.')) {
      let API_url = this.state.base_url + "admin/ValidateEmail";
      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JM_Email: email })
      }).then(function (response) {
        return response.json();
      }).then(data => {       
        if (data.status === 1 || data.status === 2) 
        { 
          document.getElementById("fb_msg").innerHTML = "Email address already exists. Please try a different email address";
          this.setState({
            fb_emailValid: true
          })

        }
        else if(data.status === -1)
        {
          document.getElementById("fb_msg").innerHTML = data.msg;
          this.setState({
            fb_emailValid: true
          })
        }
        else 
        {
          document.getElementById("fb_msg").innerHTML = '';
          this.setState({
            fb_emailValid: false
          })
          this.nowSave();
        }

      });

    }
    else {
      document.getElementById("fb_msg").innerHTML = 'Not a valid email';
      return false
    }
  }

  //========================== google sign in
  responseGoogle = (response) => {
    ////console.log("success");
    ////console.log(response.profileObj);
    var GoogleResponse;
    if (typeof response !== "undefined") {
      if (typeof response.profileObj === 'undefined') {
        return false;
      }
      GoogleResponse = response.profileObj;

      if (GoogleResponse.googleId.length > 0 && GoogleResponse.email.length > 0) {

        let API_url = this.state.base_url + "admin/ValidateEmail";
        fetch(API_url, {
          method: 'post',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ JM_Email: GoogleResponse.email })
        }).then(function (response) {
          return response.json();
        }).then(data => { 
          if (data.status === 1 || data.status === 2) 
          {
            document.getElementById("google_msg").innerHTML = "Email address already exists. Please try a different email address";
            return false;
          }
          else if(data.status === -1 )
          {
            document.getElementById("google_msg").innerHTML = data.msg;
            this.setState({ GoogleResponse: GoogleResponse, showGoogleModal: true })
          }
          else 
          {
            document.getElementById("google_msg").innerHTML = '';
            this.setState({ GoogleResponse: GoogleResponse, showGoogleModal: true })
          }

        });

      }

    }

  }

  signUpwithGoogle = (e) => {

    let GoogleResponse = this.state.GoogleResponse;
    if (GoogleResponse != null && GoogleResponse.email.length > 0 && GoogleResponse.googleId.length > 0) {
      var id = new Date().getTime();
      var flagData = {
        first_name: GoogleResponse.name.replace(/\s+/g, ''),
        JM_User_Profile_Url: this.state.expy_username,
        email: GoogleResponse.email,
        id: GoogleResponse.googleId,
        JM_Referral: localStorage.getItem('JM_Referral'),
        JM_FB_ID: '',
        JM_Google_ID: GoogleResponse.googleId
      };

      const flag=API.encryptData(flagData);
      var JSONdata = {
        flag: flag
      };



      let API_url = process.env.REACT_APP_API_URL + "admin/socialLogin";
      document.getElementById("btn_userhandle").innerText = "Wait..";
      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      }).then(function (response) {
        return response.json();
      }).then(result1 => {

        if (result1.status === 1) 
        {

          const result=API.decryptJson(result1.flag);
          ////console.log(data.msg);
          localStorage.setItem('JM_ID', result.JM_ID);
          localStorage.setItem('JM_Email', GoogleResponse.email);
          localStorage.setItem('JM_User_Profile_Url', result.JM_User_Profile_Url);
          localStorage.setItem('auth', result.token);  

          var minutes = 60;
          var dt = new Date();
          var FromNewTime = new Date();
          var ToNewTime = new Date(dt.getTime() + minutes * 60000);

          ////console.log(FromNewTime)
          ////console.log(ToNewTime)

          localStorage.setItem('FromNewTime', FromNewTime);
          localStorage.setItem('ToNewTime', ToNewTime);
          if (this.state.keepMeLogin === 1)
            localStorage.setItem('keepLogin', this.state.keepMeLogin);
          else
            localStorage.setItem('keepLogin', 0);

          window.location.href = '/me';
          //this.props.history.push("/me");
        }
        else 
        {
          document.getElementById("btn_userhandle").innerText = "Launch";
          document.getElementById('google_msg').innerText = "try again later";
          ////console.log("failed to insert or fetch")
          localStorage.setItem('JM_Email', "");
          localStorage.setItem('JM_ID', 0);
          //window.location.href = '/';
        }
      });

    }
    else {
      //console.log("failed to insert or fetch")
      document.getElementById('google_msg').innerText = "Network issue, Try again later..";
      localStorage.setItem('JM_Email', "");
      localStorage.setItem('JM_ID', 0);
      //window.location.href = '/';
    }
  }
  responseGoogleFaild = (response) => {
   // //console.log("Failed");
    console.log(response);
  }

  ExpyUserName = (e) => {

    let Url = e.target.value.replace(/[^a-z0-9\-\_]/gi, "");
    this.setState({ [e.target.name]: Url });
    let valid = true;
    if (Url.length > 0) {
      let API_url = this.state.base_url + "admin/ValidateURL";
      fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JM_User_Profile_Url: Url })
      }).then(function (response) {
        return response.json();
      }).then(data => {
        if (data.status === 1 || data.status === 2) {
          ////console.log(data.msg);
          document.getElementById("google_err_msg").innerHTML = data.msg;
          this.setState({ validUserName: false });

        }
        else {
          document.getElementById("google_err_msg").innerHTML = '';
          this.setState({ validUserName: true });
        }

      });


    }
    else {
      this.setState({ validUserName: false });
      document.getElementById("google_err_msg").innerHTML = 'Enter Expy Username';

      return false;
    }

  }

  //07-jul-2021
  checkTermsCondi = (e) => {
    if (this.state.termCondi) {
      this.setState({
        tab_Reff_show: false,
        tabTerms_show: false,
        tab1_show: true,
        tab2_show: false,
        tab3_show: false,
      });
    }
  }
  isTermsCondi = (e) => {
    if (e.target.checked) {
      ////console.log('working')
      this.setState({
        termCondi: true
      })
    }
    else {
      this.setState({
        termCondi: false
      })
    }
  }

  SkipRef=()=>{
    this.setState({
      JM_Referral:'NA',
      tab_Reff_show: false,
      tabTerms_show: true,
      tab1_show: false,
      tab2_show: false,
      tab3_show: false,
    });
  }

  onChangePhoneNumber= async(e)=>{
    var JM_Phone=e.target.value;
    this.setState({
      JM_Phone
    })
    let isNumber=API.matchNumberPattern(JM_Phone);
    document.getElementById("msg_phone").innerHTML='';
    if(JM_Phone.length > 0 && JM_Phone.length !== 10)
    {
      document.getElementById("msg_phone").innerHTML='Please enter a valid phone number';     
      return false;
    }
  }
  render() {

    ////console.log(process.env.REACT_APP_FACEBOOK_APP_ID)
    const stringifiedParams = queryString.stringify({
      client_id: 507049633635811,
      redirect_uri: process.env.REACT_APP_API_URL + 'me',
      scope: ['email', 'user_friends'].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup',
    });


    const stringified = queryString.stringify({
      client_id: 371501700778779,
      redirect_uri: process.env.REACT_APP_API_URL + 'me',
      //redirect_uri: 'https://expy.bio/',
      scope: ['user_profile', 'user_media'].join(','), // comma seperated string
      response_type: 'code'
    });
    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
    const instagramLoginUrl = `https://api.instagram.com/oauth/authorize?${stringified}`;
    let Validation = this.state;
    return (
    <>
        <Helmet>
          <title>Join | Expy </title>
          {/* <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta> */}
        </Helmet>
        <MainHeader />
        <div>
          <div className="join-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">

                  {
                    this.state.tab_Reff_show ?
                      <div className="join-box" id="tab_3">

                        <div className="form-box">
                          <label>Invite or Referral Code</label>
                          <input type="text" name="JM_Referral" vaule={this.state.JM_Referral}
                            className="form-control" placeholder="Enter Invite or Referral Code" onChange={this.onChangeHandle} />
                          <p id="msg_ref" style={{ color: 'red' }}></p>
                          <div className="row">
                              <div className="col-md-6">
                                 <button className="butn" onClick={this.SkipRef}>Skip</button>
                              </div>
                              <div className="col-md-6">
                                 <button className="butn" onClick={this.validReferralCode}>Next</button>
                              </div>
                          </div>
                          {/* <ReferalRequest /> */}
                        </div>
                      </div>
                      : null
                  }
                  {
                    this.state.tabTerms_show ?
                      <div className="join-box" id="tab_terms">
                          <div className="form-box">
                            <div class="row">                            
                              <div class="col-md-12">
                                   
                                <h5> 
                                   <input type="checkbox" name="JM_Term_Cond" onClick={this.isTermsCondi}
                                      style={{transform:'scale(1.5)',marginRight: '10px'}} />  
                                  I agree to the <a href="/terms-and-condition">Terms and Conditions</a></h5>

                              </div>
                            </div>  
                            <button className="butn" onClick={this.checkTermsCondi}>Next</button>
                          </div>
                        </div>
                    :
                    null
                  }

                  {
                          this.state.tab1_show ?
                            <div className="join-box" id="tab_1">
                              <div className="title">
                                <h3>Create Your Page</h3>
                                <p>Get set up in minutes, it’s free!</p>
                              </div>
                              <div className="form-box">

                                <GoogleLogin className="loginBtn" style={{ color: 'red' }}
                                 
                                  clientId={process.env.REACT_APP_Google_Client_Id}     
                                  buttonText="Sign up with Google"
                                  onSuccess={this.responseGoogle}
                                  onFailure={this.responseGoogleFaild}
                                 // cookiePolicy={'single_host_origin'}
                                />
                                {/* <a type="button" href="#" className="loginBtn" onClick={this.setFace}>
                        <i class="fa fa-facebook"></i> Sign up with Facebook  </a> */}
                                <div style={{ display: 'none' }}>
                                  <FacebookLogin cssClass="loginBtn"
                                    appId={"507049633635811"}
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    onClick={this.facebollbtnClick}
                                    callback={this.responseFacebook}
                                    icon="fa-facebook mr5"
                                    textButton="Sign Up With Facebook"
                                    isMobile={false}
                                  />

                                  {/* <a  href={instagramLoginUrl} onClick={this.setIG} className="text-decoration-none setCursor"><button className="loginBtn insta">
                        <i class="fa fa-instagram"></i> Sign up with Instagram  </button></a> */}


                                </div>

                                <p id="google_msg" style={{ color: 'red', fontSsize: '12px' }}></p>
                               
                                <div class="row">                            
                                    <div class="col-md-12">
                                        
                                      <span style={{fontSsize: '10px' }}>                                          
                                       By signing up with Google, you agree to the <a href="/terms-and-condition">terms and conditions.</a>
                                      </span>

                                    </div>
                                  </div>  
                            
                                <div class="title login" >
                                  <h3>OR</h3>
                                </div>
                                <input type="text" name="JM_Name" vaule={this.state.JM_Name} className="form-control" placeholder="Enter your name" onChange={this.onChangeHandle} />


                                <input type="text" className="form-control" vaule={this.state.JM_Email} name="JM_Email" placeholder="user@email.com"
                                  onChange={this.availableEmail} />
                                <p id="email_msg" style={{ color: 'red' }} ></p>

                                <div className="pick">
                                  <span>expy.bio/</span><input type="text" className="form-control no-special-chars" style={{ marginLeft: '25%', width: '75%' }}
                                    value={this.state.JM_User_Profile_Url} name="JM_User_Profile_Url" placeholder="username"
                                    onChange={this.availableURl} />
                                  <p id="msg" style={{ color: 'red' }}></p>
                                </div>

                                <input type="password" className="form-control" vaule={this.state.JM_Password} name="JM_Password" placeholder="Enter your password" onChange={this.onChangeHandle} />
                                <p id="msg_pass" style={{ color: 'red' }}></p>
                 
                                <input type="number"name="JM_Phone" id="JM_Phone" min="0" max={"10"} className="form-control" placeholder="Enter phone number (optional)" 
                                    value={this.state.JM_Phone} onChange={this.onChangePhoneNumber}/> 
                                <p id="msg_phone" style={{ color: 'red' }} ></p>

                                <input type="text" name="JM_Referral" vaule={this.state.JM_Referral}
                                  className="form-control" placeholder="Enter invite code (optional)" onChange={this.onChangeHandle} />
                                 <p id="msg_ref" style={{ color: 'red' }}></p>

                                <div class="row">                            
                                    <div class="col-md-12">
                                        
                                      <span> 
                                        <input type="checkbox" name="JM_Term_Cond" onClick={this.isTermsCondi}
                                            style={{transform:'scale(1.5)',marginRight: '10px'}} />  
                                        I agree to the <a href="/terms-and-condition">Terms and Conditions</a>
                                     </span>
                                   
                                      <p id="msg_terms" style={{ color: 'red' }}></p>
                                    </div>
                                  </div>  
                                <button className="butn" onClick={this.doNext}>Next!</button>
                                <p>Already have a page ?<NavLink to="/signin"> Log in here</NavLink></p>
                              </div>

                              <Modal
                                size="sm"
                                show={this.state.showEmailModal}
                                onHide={() => this.setState({ showEmailModal: false })}
                                aria-labelledby="example-modal-sizes-title-sm"
                                backdrop="static"
                                keyboard={false}
                                centered
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
                                    Last Step to Launch!
                                          </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <input type="text" className="form-control" placeholder="Enter Email Id" name="fb_email" value={this.state.fb_email} onChange={this.fb_emailChange} />
                                </Modal.Body>
                                <Modal.Footer>
                                  <p id="msg" style={{ color: 'red' }}></p>
                                  <div className="btun-box">
                                    <Button onClick={this.doSocialSignUp} className="btun btun_1">Launch</Button>
                                    <p id='fb_msg' style={{ fontSize: '12px' }}></p>
                                    {/* <p style={{color:' #ea9515',fontWweight: 'bold',fontSsize: '12px'}}>
                                      Note: if you update this current username you will not able to see any data of earlier username. 
                                  </p> */}
                                  </div>
                                </Modal.Footer>
                              </Modal>

                              {/* google userhanlde message */}

                              <Modal
                                size="sm"
                                show={this.state.showGoogleModal}
                                onHide={() => this.setState({ showGoogleModal: false, validUserName: false, expy_username: '' })}
                                aria-labelledby="example-modal-sizes-title-sm"
                                backdrop="static"
                                keyboard={false}
                                centered
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
                                    Last Step to Launch!
                                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <input type="text" className="form-control" placeholder="Enter Expy username" name="expy_username" value={this.state.expy_username} onChange={this.ExpyUserName} />
                                </Modal.Body>
                                <Modal.Footer>
                                  <p id="msg" style={{ color: 'red' }}></p>
                                  <div className="btun-box">
                                    {
                                      this.state.validUserName ?
                                        <button onClick={this.signUpwithGoogle} className="btnCropSave" id="btn_userhandle">Launch</button>
                                        :
                                        null
                                    }


                                    {/* <p style={{color:' #ea9515',fontWweight: 'bold',fontSsize: '12px'}}>
                                                Note: if you update this current username you will not able to see any data of earlier username. 
                                            </p> */}
                                  </div>
                                  <p id='google_err_msg' style={{ fontSize: '12px', color: 'red', width: '100%' }}></p>
                                </Modal.Footer>
                              </Modal>
                              {/* end */}

                            </div>
                            :
                            null
                        }
                        {
                          this.state.tab2_show ?
                            <div className="join-box" id="tab_2">
                              <div className="title">
                                <h3>Put Your Social Media URL</h3>
                                <p>It will take you less than 2 minutes, and it's free.</p>
                              </div>
                              <div className="form-box">
                                <div className="social-link">
                                  <span><FontAwesomeIcon icon={faInstagram} /></span>
                                  <input type="text" name="JM_Insta_Url" className="form-control" placeholder="https://www.instagram.com/Bob"
                                    value={this.state.JM_Insta_Url} onChange={this.onChangeHandle} />
                                </div>
                                <div className="social-link">
                                  <span><FontAwesomeIcon icon={faTwitter} /></span>
                                  <input type="text" name="JM_Twiter_Url" className="form-control" placeholder="https://www.twitter.com/Bob"
                                    value={this.state.JM_Twiter_Url} onChange={this.onChangeHandle} />
                                </div>
                                <div className="social-link">
                                  <span><FontAwesomeIcon icon={faYoutube} /></span>
                                  <input type="text" name="JM_Utube_Url" className="form-control" placeholder="https://www.youtube.com/Bob"
                                    value={this.state.JM_Utube_Url} onChange={this.onChangeHandle} />
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <button className="skip-butn" onClick={this.doSkip}>Skip</button>
                                  </div>
                                  <div className="col-md-6">
                                    <button className="butn" onClick={this.doNextUrl}>Next!</button>
                                  </div>
                                </div>
                                {/* <p><NavLink to="/signin"> Log in here</NavLink></p> */}
                              </div>
                            </div>
                            : null
                        }

                        {this.state.tab3_show ?
                          <div className="join-box" id="tab_3">
                            <div className="title">
                              <h3>Put a Face to the Name</h3>
                              <p>Upload a profile picture (optional)</p>
                            </div>
                            <div className="form-box">
                              <form onSubmit={this.handleImageUpload}>
                                <div className="prop-pic">
                                  <label htmlFor="prop_up" className="up_pic">Click for Upload</label>
                                  <img src={this.state.JM_Profie_Pic}  alt=""/>
                                  <input type="file" id="prop_up" accept="image/*" name="photo" style={{ display: "none" }}
                                    onChange={this.displayImage} />
                                </div>

                                <button className="butn" id="btn_lnch">Launch!</button>
                              </form>
                              {/* <p><NavLink to="/signin"> Log in here</NavLink></p> */}
                            </div>
                          </div>
                          : null
                        }
                      </div>
              </div>
              </div>
            </div>
          </div>
          <FooterClass />
    </>
  )
}

}
export default JoinPage
