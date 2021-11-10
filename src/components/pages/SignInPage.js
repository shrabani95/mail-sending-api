

import React, { Component } from 'react'

import {  NavLink,  } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';

//facebook login
import * as queryString from 'query-string';

import Modal from 'react-bootstrap/Modal'
import GoogleLogin from 'react-google-login';

import API  from '../services/API';
import { Helmet } from "react-helmet";
class SignInPage extends Component {


  constructor(props) {
    super(props)

    this.state = {
      base_url: process.env.REACT_APP_API_URL,
      root_url: process.env.REACT_APP_ROOT_URL,
      JM_Email: localStorage.getItem('JM_Email'),
      JM_ID: localStorage.getItem('JM_ID'),
      JM_Password: '',
      bgColor: 'red',
      Validation: true,
      keepMeLogin: localStorage.getItem('keepLogin'),
      isKeep:false,
      facebookResponse:[],
      showEmailModal:false,
      showForgotModal:false,
      forgot_email:'',
      sendBtnDisabled:false,
      sendBtnText:'Send',
      
    }
    if (typeof this.state.JM_Email !== 'undefined') {
      if (this.state.JM_Email !== "" && parseInt(this.state.JM_ID) > 0) {
        window.location.href = '/me';
      }
    }
    
  }

  componentDidMount() 
  {
   // this.add_minutes();
   // //console.log(this.state.keepMeLogin)
      if(this.state.keepMeLogin==="1")
      {        
        document.getElementById("keepme").checked=true;    
      }
      else
      {
        document.getElementById("keepme").checked=false;  
      }
    
  }
  add_minutes = (e)=>
  {
      var minutes=60;
      var dt=new Date();
      var FromNewTime=new Date();
      var ToNewTime=new Date(dt.getTime() + minutes*60000);
          
      //console.log(FromNewTime)    
      //console.log(ToNewTime)

      localStorage.setItem('FromNewTime',FromNewTime);
      localStorage.setItem('ToNewTime',ToNewTime);
      if(this.state.keepMeLogin===1)
         localStorage.setItem('keepLogin',this.state.keepMeLogin);
      else
          localStorage.setItem('keepLogin',0);
    // var milli = new Date().getTime()
      //var timeWithoutMilli = Math.floor(milli/1000);
    // //console.log(new Date(timeWithoutMilli))
    // return new Date(dt.getTime() + minutes*60000);
  }


  performValidation = () => {
    return this.state.JM_Email.length > 0 && this.state.JM_Password.length > 0;
  }

  onChangeHandle = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    //this.performValidation();
  }

  doLogin = () => {
    try {

      document.getElementById("msg").innerHTML='';

      if(this.state.JM_Email.length===0)
      {
        document.getElementById("msg").innerHTML='* Enter username or email';
        return false;
      }
      if(this.state.JM_Password.length===0)
      {
        document.getElementById("msg").innerHTML='* Enter Password';
        return false;
      }

      if (this.state.JM_Email.length > 0 && this.state.JM_Password.length > 0) 
      {
  
        let API_url = this.state.base_url + "admin/signin";


        const password=API.encryptData(this.state.JM_Password);
       // console.log(password)
        // var JSONdata = {
        //   JM_Email: this.state.JM_Email,
        //   JM_Password: password,
        //   Keep:this.state.keepMeLogin
        // };

        
        var flagData = {
          JM_Email: this.state.JM_Email,
          JM_Password: password,
          Keep:this.state.keepMeLogin
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
        }).then(async data1 => {

          if (data1.status === 1) 
          {

            const data=await API.decryptJson(data1.flag);
            var userDetails = data.userDetails;
            if (userDetails != null && userDetails.length > 0) {
              //console.log(data.msg);
              localStorage.setItem('JM_ID', data.JM_ID);
              localStorage.setItem('JM_User_Profile_Url', data.userDetails[0].JM_User_Profile_Url);
              localStorage.setItem('JM_Name', data.userDetails[0].JM_Name);
              localStorage.setItem('JM_Email', this.state.JM_Email);
              localStorage.setItem('userDetails', JSON.stringify(userDetails));
              localStorage.setItem('directAccess', JSON.stringify(data.directAccess));
              localStorage.setItem('linkMaster', JSON.stringify(data.linkMaster));
              this.setState({ userDetails: userDetails });
              localStorage.setItem('auth', data.token);  

              // window.location='/me'; 
              this.add_minutes();
              //window.token = data.token;
              this.props.history.push({
                pathname:"/me",
                state: {
                 token:data.token
                }
              })
    
         
      
              //this.props.history.push("/me");
            }
          }
          else 
          {
            document.getElementById("msg").innerHTML = data1.msg;
            return false;
          }

        });

      }

    } catch (e) {
      alert("connection error");
    }
  }
  //04-may-2021
  forgotPassword = (e) => {
    var email = this.state.forgot_email;
    try {
      if (email.length > 0 && email.includes('@') && email.includes('.')) {

        let API_url = process.env.REACT_APP_API_URL + "admin/forgotPassword";
        // var JSONdata = {
        //   JM_Email: this.state.forgot_email,
        //   JM_Password: this.state.JM_Password
        // };

        var flagData = {
          JM_Email: this.state.forgot_email,
          JM_Password: this.state.JM_Password
        };
  
        const flag=API.encryptData(flagData);
        let  JSONdata = {
            flag: flag
          };

        this.setState({sendBtnDisabled:true,sendBtnText:'Wait...'})
        fetch(API_url, {
          method: 'post',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(JSONdata)
        }).then(function (response) {
          return response.json();
        }).then(data => {
          if (data.status === 1) 
          {
            //alert("Password has been sent to above email id");
            document.getElementById("forgot_msg").innerText='Password has been sent to entered email id';
            this.setState({
              forgot_email:'', sendBtnDisabled:false,sendBtnText:'Send'
            })

          }
          else 
          {
            document.getElementById("forgot_msg").innerText=data.msg;
            this.setState({
              forgot_email:'', sendBtnDisabled:false,sendBtnText:'Send'
            })
          }
        });
      }
      else {
        document.getElementById("forgot_msg").innerText="Enter email ID to receive new password";
      }
    } catch (e) {
      //alert("enter email id");
      document.getElementById("forgot_msg").innerText="Enter a valid email id";
      ////console.log("exception in forgot password")
    }

  }
  keepMeLogin=(e)=>{
    if(e.target.checked)
    {
      ////console.log('working')
      this.setState({
        keepMeLogin:1
      })
    }
    else
    {
      this.setState({
        keepMeLogin:2
      })
    }
  }

  
responseFacebook(response) {
  ////console.log(response);

 
  if(typeof response !== "undefined")
  {
      if(response.status==='unknown')
      {
        return false;
      }


      if(response != null && response.email.length ===0) 
      {
        this.setState({facebookResponse:response,showEmailModal:true})  
        return false;
      }
      var id = new Date().getTime(); 
     var name= response.name.replace(/\s+/g, '')+id;
      if (response != null && response.email.length > 0 && response.id.length > 0) 
      {
          var data  = {
            first_name: response.name.replace(/\s+/g, ''),
            email: response.email, 
            id:response.id,
        };	
        let API_url = process.env.REACT_APP_API_URL + "admin/socialLogin";
     
        fetch(API_url, {
          method: 'post',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(function (response) {
          return response.json();
        }).then(result => {
          if (result.status === 1) 
          {
            var name=response.name.replace(/\s+/g, '')+id;
            ////console.log(data.msg);
            localStorage.setItem('JM_ID', result.JM_ID);
            localStorage.setItem('JM_Email', result.JM_Email);
            localStorage.setItem('JM_User_Profile_Url',result.JM_User_Profile_Url);             
            localStorage.getItem('JM_Profile_Pic',null);
            localStorage.setItem('auth', data.token);  
            var minutes=60;
            var dt=new Date();
            var FromNewTime=new Date();
            var ToNewTime=new Date(dt.getTime() + minutes*60000);
                
            ////console.log(FromNewTime)    
            ////console.log(ToNewTime)  
      
            localStorage.setItem('FromNewTime',FromNewTime);
            localStorage.setItem('ToNewTime',ToNewTime);
            if(this.state.keepMeLogin===1)
               localStorage.setItem('keepLogin',this.state.keepMeLogin);
            else
                localStorage.setItem('keepLogin',0);

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
      else
      {
        ////console.log("failed to insert or fetch")
        localStorage.setItem('JM_Email', "");
        localStorage.setItem('JM_ID', 0);
        //window.location.href = '/';
      }
    }
}
facebollbtnClick=()=>{
  ////console.log("clicked")
 // alert();
}

responseInstagram = (response) => {
  ////console.log(response);
  
}

setFace=e=>{
  ////console.log(process.env.REACT_APP_FACEBOOK_APP_ID)
    const stringifiedParams = queryString.stringify({
      client_id: 507049633635811,
      redirect_uri: process.env.REACT_APP_API_URL + 'me',
      scope: ['email', 'user_friends'].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup',
    });
    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
  localStorage.setItem('FB_IG',"FB");
  window.location=facebookLoginUrl;
}
setIG=e=>{
  const stringified= queryString.stringify({
    client_id:371501700778779,
    redirect_uri: process.env.REACT_APP_API_URL+ 'me',
    //redirect_uri: 'https://expy.bio/',
    scope: ['user_profile', 'user_media'].join(','), // comma seperated string
   // scope:'instagram_graph_user_media',
    response_type: 'code'     
  });

  const instagramLoginUrl = `https://api.instagram.com/oauth/authorize?${stringified}`;
  localStorage.setItem('FB_IG',"IG");
  window.location=instagramLoginUrl;
}

doSocialSignIn=()=>{
  ////console.log("clicked doSocialSignIn")
}
responseGoogle = (response) => {
  ////console.log("success");  
  ////console.log(response.profileObj);  
  var GoogleResponse;
  if(typeof response !== "undefined")
  {
      if(typeof response.profileObj==='undefined')
      {
        return false;
      }
      GoogleResponse=response.profileObj;

      if(GoogleResponse.googleId.length > 0  && GoogleResponse.email.length > 0) 
      {
        
        var id = GoogleResponse.googleId;
        var name= GoogleResponse.name.replace(/\s+/g, '')+id;
        if (GoogleResponse != null && GoogleResponse.email.length > 0 && GoogleResponse.googleId.length > 0) 
        {
          //   var JSONdata  = {          
          //     JM_Email:GoogleResponse.email, 
          //     JM_Google_ID:GoogleResponse.googleId,
          // };	

          var flagData = {
            JM_Email:GoogleResponse.email, 
            JM_Google_ID:GoogleResponse.googleId,
          };
    
          const flag=API.encryptData(flagData);
          var JSONdata = {
            flag: flag
          };
    
          let API_url = process.env.REACT_APP_API_URL + "admin/socialSignIn";
                    
          fetch(API_url, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(JSONdata)
          }).then(function (response) {
            return response.json();
          }).then(async data1 => {
            if (data1.status === 1) 
            {

              const data=API.decryptJson(data1.flag);

              var userDetails = data.userDetails;
              if (userDetails != null && userDetails.length > 0) 
              {
                ////console.log(data.msg);
                localStorage.setItem('JM_ID', data.JM_ID);
                localStorage.setItem('JM_User_Profile_Url', data.userDetails[0].JM_User_Profile_Url);
                localStorage.setItem('JM_Name', data.userDetails[0].JM_Name);
                localStorage.setItem('JM_Email', this.state.JM_Email);
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                localStorage.setItem('directAccess', JSON.stringify(data.directAccess));
                localStorage.setItem('linkMaster', JSON.stringify(data.linkMaster));
                localStorage.setItem('auth', data.token);  
                this.setState({ userDetails: userDetails });    

                this.add_minutes();
                this.props.history.push("/me");
              }
            }
            else 
            {
              document.getElementById("google_msg").innerHTML="Email does not exist, please sign up with gmail";         
              return false;
            }

          }).catch((error) => 
          {
            ////console.log(error)
            document.getElementById("google_msg").innerHTML='Network error, Try again later';       
            return false;
          });
        }
      }
      else
      {
        document.getElementById("google_msg").innerHTML="No response from Google, Try again Later";         
        return false;
      }
    }

}
responseGoogleFaild=(response)=>{
  //console.log("Failed");  
  //console.log(response);  
}
handleKeyPress = (event) => {
  if(event.key === 'Enter')
  {
    //console.log('enter press here! ')
    this.doLogin();
  }
}

  render() {

   
    let redirect_uri=process.env.REACT_APP_API_URL + 'me';
    //console.log(process.env.REACT_APP_FACEBOOK_APP_ID)
    const stringifiedParams = queryString.stringify({
      client_id: 507049633635811,
      redirect_uri: process.env.REACT_APP_API_URL + 'me',
      scope: ['email', 'user_friends'].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup',
    });


    const stringified= queryString.stringify({
      client_id:371501700778779,
      redirect_uri: process.env.REACT_APP_API_URL+ 'me',
      //redirect_uri: 'https://expy.bio/',
      scope: ['user_profile', 'user_media'].join(','), // comma seperated string
      response_type: 'code'     
    });
    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
    const instagramLoginUrl = `https://api.instagram.com/oauth/authorize?${stringified}`;
    //client_id={138441281583659}&redirect_uri={redirect_uri}&scope=user_profile,user_media&response_type=code`;
    let checked='';
    return (
 
          
      <>
        
         <Helmet>
            <title>Signin | Expy </title>
            {/* <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta> */}
          </Helmet>
        <MainHeader />
        <div>
          <div className="join-sec logged">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <div className="join-box">
                    <div className="title login">
                      <h3>LOGIN</h3>
                    </div>
                    <div className="form-box">

                      <input type="text" name="JM_Email" value={this.state.JM_Email} className="form-control" placeholder="Enter your username or email" onChange={this.onChangeHandle} />

                      <input type="password" name="JM_Password" value={this.state.JM_Password} className="form-control" placeholder="Enter your password" 
                      onChange={this.onChangeHandle} onKeyPress={this.handleKeyPress} />

                      <div className="row">
                        <div className="col-md-6">
                          <div className="remember">
                            <input type="checkbox" id="keepme"  onClick={this.keepMeLogin}/> Keep me logged in
                            </div>
                        </div>
                        <div className="col-md-6">
                          <div className="forgot">
                            <span onClick={()=>this.setState({showForgotModal:true})}>Forgot your password?</span>
                          </div>
                        </div>
                      </div>

                      <button className="butn" onClick={this.doLogin}>Log In!</button>

                      <p id="msg" style={{ color: 'red' }}></p>
                    </div>
                
                    <div className="title login" style={{display:'block'}}>
                      <h3>OR</h3>
                    </div>
                    <div className="form-box" style={{display:'block'}}>

                      {/* <a type="button" href="#" className="loginBtn" onClick={this.setFace}>
                        <i class="fa fa-facebook"></i> Sign in with Facebook  </a> */}
                        <GoogleLogin className="loginBtn" style={{color:'red',cursor:'pointer'}}
                            //live
                             //clientId="1024467688151-4se3v8kdntbirunv4s79rnq3t95qtt37.apps.googleusercontent.com"  
                            clientId={process.env.REACT_APP_Google_Client_Id} 
                           //UAT
                            //clientId="361176624533-it476osbsr8qe361gc8aao80fqkr1bg8.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogleFaild}
                            cookiePolicy={'single_host_origin'}
                          />
                     <p id="google_msg" style={{color:'red',fontSsize: '12px'}}></p>
                     
                        {/* <FacebookLogin   cssClass="loginBtn"
                            appId={"507049633635811"}    
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.facebollbtnClick}
                            callback={this.responseFacebook}
                            icon="fa-facebook mr5"
                            isMobile={false}
                          />  */}

                        
{/* 


 <GoogleLogin
    clientId="1024467688151-4se3v8kdntbirunv4s79rnq3t95qtt37.apps.googleusercontent.com"
    buttonText="Sign in"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
                        <a   onClick={this.setIG} className="text-decoration-none setCursor"><button className="loginBtn insta">
                        <i class="fa fa-instagram"></i> Log in with Instagram  </button></a> */}

{/*                       

                          <div style={{display:'none'}}>
                                <InstagramLogin 
                                  clientId="371501700778779"
                                  buttonText="Login"
                                  onSuccess={this.responseInstagram}
                                  onFailure={this.responseInstagram}
                                  />

                          </div> */}
                        
                                  {/* <InstagramLogin
                                   
                                    clientId="8208035d75f168409c41a05a1d81fe77"
                                    redirectUrl="https://www.velectico.net.in/me"
                                    scopes={['basic']}        
                                    onSuccess={this.responseInstagram}
                                    onFailure={this.responseInstagram}
                                  /> */}

                      <p>Don’t have an account yet?  <NavLink to="/join">Sign Up</NavLink></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                                  Sign in
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <input type="text" className="form-control" placeholder="Enter Email Id" name="fb_email" value={this.state.fb_email} onChange={this.fb_emailChange} />
                              </Modal.Body>
                              <Modal.Footer>
                                <p id="msg" style={{ color: 'red' }}></p>
                                <div className="btun-box">                            
                                   <Button onClick={this.doSocialSignIn} className="btun btun_1">Sign in</Button>                                
                                  <p id='fb_msg' style={{fontSize: '12px'}}></p>
                                  {/* <p style={{color:' #ea9515',fontWweight: 'bold',fontSsize: '12px'}}>
                                      Note: if you update this current username you will not able to see any data of earlier username. 
                                  </p> */}
                                </div>
                              </Modal.Footer>
                            </Modal>


                            <Modal
                              size="sm"
                              show={this.state.showForgotModal}
                              onHide={() => this.setState({ showForgotModal: false })}
                              aria-labelledby="example-modal-sizes-title-sm"
                              backdrop="static"
                              keyboard={false}
                              centered
                            >
                              <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
                                Please enter your email
                                          </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <input type="text" className="form-control" placeholder="Enter Email Id" name="forgot_email" value={this.state.forgot_email} onChange={this.onChangeHandle} />
                              </Modal.Body>
                              <Modal.Footer>     
                              <p id='forgot_msg' style={{fontSize: '12px'}}></p>                          
                                <div className="btun-box">                            
                                   <Button  onClick={this.forgotPassword}className="btun btun_1" disabled={this.state.sendBtnDisabled}>{this.state.sendBtnText}</Button>                                
                                
                                  {/* <p style={{color:' #ea9515',fontWweight: 'bold',fontSsize: '12px'}}>
                                      Note: if you update this current username you will not able to see any data of earlier username. 
                                  </p> */}
                                </div>
                              </Modal.Footer>
                            </Modal>
        </div>
        <FooterClass />
      </>
    )
  }
}

export default SignInPage
