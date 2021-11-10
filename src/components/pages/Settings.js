import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import FooterClass from '../header_footer/FooterClass';
import Accordion from 'react-bootstrap/Accordion';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ProfileNav from './ProfileNav';
import ProfileHeader from '../header_footer/ProfileHeader';
import {Helmet} from 'react-helmet';
import API from '../services/API';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import { confirmAlert } from 'react-confirm-alert'; // Import
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';
 
import Modal from 'react-bootstrap/Modal'
class Settings extends Component
{
  constructor(props) {
    super(props)
  
    this.state = {     
       JM_ID: parseInt(localStorage.getItem('JM_ID')), 
       Current_Password:'',
       New_Password:'',
       Confirm_Password:'',
       JM_Acc_No:'',
       JM_Acc_Code:'',
       JM_SWIFT_Code:'',
       JM_Beneficiary_Name:'',
       Social_Widget_Position:'',
       userDetails:[],
       JM_Name:'',
       JM_Description:'',
       JM_Social_Widget_Position:'',
       base_url: process.env.REACT_APP_API_URL,
       root_url: process.env.REACT_APP_ROOT_URL,
       defaultActiveKey:'',
       JM_Email:'',
       JM_Notify_Pref:'',
       Validation:false,
       JM_SMS_Pref:'',
       JM_Email_Pref:'',
       JM_Phone:'',
       isValidPhone:false,
       notific_pref:[],
       Vid_Aud_Msg_Email:'Y',
       Vid_Aud_Msg_SMS:'Y',

       Req_Reminder_Email:'Y',
       Req_Reminder_SMS:'N',

       Goods_Purchased_Email:'Y',
       Goods_Purchased_SMS:'N',

       Gift_Donation_Email:'Y',
       Gift_Donation_SMS:'N',
       JM_Phone_Bank:'',
       JM_Profile_Name:'',
       JM_Contact_Id:'',
       JM_Fund_Id:'',
       JM_Password:'',
       showPaypal:false,

       isNormalUser:false,
       old_email:'',
       JM_Google_ID:'NA',
       GoogleResponse: [], 
       showGoogleModal: false,
       expy_email:''
    }
   
  }

  componentDidMount()
  {
    ////console.log(this.props.location.userDetails)  
    //const userDetails=this.props.location.userDetails;
    //API.isActive();
    this.Get_User_Details();
  }

  async Get_User_Details() {
    var id = parseInt(localStorage.getItem('JM_ID'));
    var JSONdata = {
      JM_ID: id
    };
    const API_url = this.state.base_url + "admin/userDetailsAllSettings";
    const response = await fetch(API_url, {
      method: 'post',
      headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
      body: JSON.stringify(JSONdata)
    });
    const data1 = await response.json();

    if (data1 != null && data1.status > 0) 
    {
      const data=API.decryptJson(data1.flag);
      let userDetails=data.userDetails;
      if(userDetails!=null && userDetails.length > 0)
      {
        let JM_Name=userDetails[0].JM_Name;
        let JM_Description=userDetails[0].JM_Description;
        let JM_Social_Widget_Position=userDetails[0].JM_Social_Widget_Position;
        this.setState({userDetails,JM_Name,JM_Description,JM_Social_Widget_Position});
        this.setState({       
          JM_Acc_No:userDetails[0].JM_Acc_No,
          JM_Acc_Code:userDetails[0].JM_Acc_Code,
          JM_SWIFT_Code:userDetails[0].JM_SWIFT_Code,
          JM_Beneficiary_Name:userDetails[0].JM_Beneficiary_Name,
          JM_Email:userDetails[0].JM_Email,
          JM_Notify_Pref:userDetails[0].JM_Notify_Pref,
          JM_PayPal_Name:userDetails[0].JM_PayPal_Name==='NA'?'':userDetails[0].JM_PayPal_Name,
          JM_PayPal_Phone:userDetails[0].JM_PayPal_Phone==='NA' ? '' : userDetails[0].JM_PayPal_Phone,
          JM_PayPal_Email:userDetails[0].JM_PayPal_Email==='NA' || userDetails[0].JM_PayPal_Email==='Na'? '' : userDetails[0].JM_PayPal_Email,
          JM_PayPal_UserName:userDetails[0].JM_PayPal_UserName,
          JM_SMS_Pref:userDetails[0].JM_SMS_Pref,
          JM_Email_Pref:userDetails[0].JM_Email_Pref,
          JM_Phone:userDetails[0].JM_Phone,
          JM_Phone_Bank:userDetails[0].JM_Phone_Bank,
          JM_Profile_Name_ID:userDetails[0].JM_User_Profile_Url + userDetails[0].JM_ID,
          JM_Contact_Id:userDetails[0].JM_Contact_Id,
          JM_Fund_Id:userDetails[0].JM_Fund_Id,
          old_email:userDetails[0].JM_Email,
          isNormalUser: userDetails[0].JM_Google_ID!=='' && userDetails[0].JM_Google_ID!=='NA' && userDetails[0].JM_Google_ID.length > 10 ? false : true,
        });
        //110280980867140553009
      }

      if(data.notific_pref!=null && data.notific_pref.length > 0)
      {
        this.setState({
          Vid_Aud_Msg_Email:data.notific_pref[0].Vid_Aud_Msg_Email,
          Vid_Aud_Msg_SMS:data.notific_pref[0].Vid_Aud_Msg_SMS,
          Req_Reminder_Email:data.notific_pref[0].Req_Reminder_Email,
          Req_Reminder_SMS:data.notific_pref[0].Req_Reminder_SMS,
          Goods_Purchased_Email:data.notific_pref[0].Goods_Purchased_Email,
          Goods_Purchased_SMS:data.notific_pref[0].Goods_Purchased_SMS,
          Gift_Donation_Email:data.notific_pref[0].Gift_Donation_Email,
          Gift_Donation_SMS:data.notific_pref[0].Gift_Donation_SMS,
        })
      }
    }



  }

  onChangeHandle=(e)=>{
    var value= e.target.value.replace(/'/g, "\\'");  
    this.setState({[e.target.name]:e.target.value});
  }
  updatePayout=async (e)=>{
      document.getElementById("msg").innerHTML='';
      document.getElementById("msg").style.color='red';
     // if(this.state.JM_PayPal_Phone.length > 0)
     // { document.getElementById("msg").innerHTML='* Paypal details already exist' ;return false}



    if(this.state.JM_Beneficiary_Name.length===0)
       { document.getElementById("msg").innerHTML='* Beneficiary Name'; return false}

    if(this.state.JM_Acc_No.length===0)
       { document.getElementById("msg").innerHTML='* Enter A/C No'; return false}
       if(this.state.JM_Acc_No.length > 18)
       { document.getElementById("msg").innerHTML='* A/C No must be within 18 digits'; return false}
        
        
    if(this.state.JM_Acc_Code.length===0)
     { document.getElementById("msg").innerHTML='* Enter 11 Characters IFSC' ;return false}
     if(this.state.JM_Acc_Code.length!==11)
     { document.getElementById("msg").innerHTML='* The ifsc must be 11 characters.' ;return false}
     //The ifsc must be 11 characters.

     if(this.state.JM_Phone_Bank.length!==10)
     { document.getElementById("msg").innerHTML='* Enter Phone Number' ;return false}

     if(this.state.JM_Phone_Bank.length === 10)
     {
 
       let resp=await API.validatePhoneBank(this.state.JM_Phone_Bank);
       //console.log(resp)
       var msg=resp? '' : 'Use another phone number';   
       if(resp)
       {
           document.getElementById("msg_prof_other").style.color='green';
          document.getElementById("msg").innerHTML=msg; 
        }
       else
       {
        document.getElementById("msg").innerHTML=msg; 
        return false;    
       }
           
      
     }


    if(this.state.JM_Acc_No.length > 0 && this.state.JM_Acc_Code.length > 0 && this.state.JM_Phone_Bank.length ===10)
    {
       let API_url=process.env.REACT_APP_API_URL+"admin/UpdatePayoutDetails";
      fetch(API_url, {
        method: 'post',
        headers: {"Content-Type": "application/json","authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify({
          JM_Acc_No:this.state.JM_Acc_No,
          JM_Acc_Code:this.state.JM_Acc_Code,
          JM_ID:this.state.JM_ID,
          JM_SWIFT_Code:this.state.JM_SWIFT_Code,
          JM_Beneficiary_Name:this.state.JM_Beneficiary_Name,
          JM_Social_Widget_Position:'',
          JM_Phone_Bank:this.state.JM_Phone_Bank
        })
          })
          .then(response => response.json())
          .then(async data => 
          {  
              if(data.status===1 || data.status===2)
              {
                      var JSONdata={        
                        JM_ID:this.state.JM_ID,
                        acc_name:this.state.JM_Beneficiary_Name,
                        acc_num:this.state.JM_Acc_No,
                        acc_ifsc:this.state.JM_Acc_Code,
                        reference_id:this.state.JM_Profile_Name_ID,          
                        email:this.state.JM_Email,       
                        contact:this.state.JM_Phone_Bank,
                        swift_code:this.state.JM_SWIFT_Code,
                        contact_id:this.state.JM_Contact_Id,
                        fund_id:this.state.JM_Fund_Id,
                      }
                      document.getElementById("msg").style.color='red';
                      document.getElementById("msg").innerHTML='Please, wait....'    
                      var response=await API.razorpay_x(JSONdata);
                      ////console.log(response);  
                      if(response.status===1)           
                      {
                         console.log(response.fund_id);
                        this.setState({
                          JM_Fund_Id:response.fund_id
                        })
                        document.getElementById("msg").style.color='green';
                        document.getElementById("msg").innerHTML=data.msg;    
                        //this.hideMessage('payout');  
                       // window.location.href='/me'; 
                        setTimeout(function() {  
                          window.location.href='/me';   
                         }, 3000); 
                      }
                      else
                      {
                        document.getElementById("msg").style.color='red';
                        document.getElementById("msg").innerHTML=data.msg;   
                        return false;                      
                      }
              
              }
              else
              {
                document.getElementById("msg").innerHTML=data.msg; 
                this.hideMessage('payout');     
              }                 
           
      });
 
    }
    else
    {
      alert('unable to update');
    }
  }

  //12-aug-2021
  removeBankDetails=async (type)=>{
    document.getElementById("msg_payPal").style.color='red';
    document.getElementById("msg").style.color='red';
    document.getElementById("msg").innerHTML='';
    document.getElementById("msg_payPal").innerHTML='';
      var JSONData={
        type:type
      }
      const data=await API.postData(JSONData,'removeBankPayPal')
      if(data.status===1)
      {
        if(type==='B')
        {
          document.getElementById("msg").style.color='green';
          document.getElementById("msg").innerHTML='Details has been removed';    

          this.setState({
            JM_Acc_No:'',
            JM_Acc_Code:'',JM_Beneficiary_Name:'',JM_SWIFT_Code:'',JM_Phone_Bank:''
          })


          setTimeout(function() {       
            document.getElementById("msg").innerHTML='';            
           }, 2000); 
        }
        else if(type==='P')
        {          
          document.getElementById("msg_payPal").style.color='green';
          document.getElementById("msg_payPal").innerHTML='Details has been removed'; 
          this.setState({
            JM_PayPal_Name:'',
            JM_PayPal_Phone:'',JM_PayPal_Email:''
          })
          setTimeout(function() {       
            document.getElementById("msg_payPal").innerHTML='';            
           }, 2000); 
        }
      }
      else
      {
        if(type==='B')
        {
          document.getElementById("msg").style.color='red';
          document.getElementById("msg").innerHTML='Failed to remove'; 
          setTimeout(function() {       
            document.getElementById("msg").innerHTML='';            
           }, 2000);     
        }
        else if(type==='P')
        {
          document.getElementById("msg_payPal").style.color='red';
          document.getElementById("msg_payPal").innerHTML='Failed to remove';  
          setTimeout(function() {       
            document.getElementById("msg_payPal").innerHTML='';            
           }, 2000);   
        }
      }

  }

  isConfirm=(id)=>e=>
  {
    confirmAlert({
      title: 'Confirm Remove',
      message: 'Are you sure you want to remove the bank deatils?',
      buttons: [
          {
          label: 'Yes',
          onClick: () => this.removeBankDetails(id)
          },
          {
          label: 'No',
          onClick: () => console.log("cancel")
          }
      ],
      closeOnEscape: false,
      closeOnClickOutside: false,
      });
  }


  updatePayPal=()=>{

    document.getElementById("msg_payPal").style.color='red';
    document.getElementById("msg_payPal").innerHTML='';
   // if(this.state.JM_Acc_Code.length > 0)
   // { document.getElementById("msg_payPal").innerHTML='* Bank Details already exist' ;return false}
    
    if(this.state.JM_PayPal_Name.length===0 || this.state.JM_PayPal_Name.length==='NA')
    { document.getElementById("msg_payPal").innerHTML='* Enter Name'; return false}
        
    if(this.state.JM_PayPal_Phone.length===0)
      { document.getElementById("msg_payPal").innerHTML='* Enter Phone Number' ;return false}

      if(this.state.JM_PayPal_Email.length===0)
      { document.getElementById("msg_payPal").innerHTML='* Enter Username or Email' ;return false}

   
      

    if(this.state.JM_PayPal_Name.length > 0 && this.state.JM_PayPal_Phone.length > 0 && this.state.JM_PayPal_Email.length > 0)
    {
        let API_url=process.env.REACT_APP_API_URL+"admin/UpdatePayoutDetailsPayPal";
      fetch(API_url, {
        method: 'post',
        headers: {"Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify({
          JM_PayPal_Name:this.state.JM_PayPal_Name,
          JM_PayPal_Phone:this.state.JM_PayPal_Phone,
          JM_PayPal_Email:this.state.JM_PayPal_Email,
          JM_ID:this.state.JM_ID,            
        })
          })
          .then(response => response.json())
          .then(data => 
          {  
              if(data.status===1 || data.status===2)
              {
                ////console.log(data.msg);             
                document.getElementById("msg_payPal").style.color='green';
                document.getElementById("msg_payPal").innerHTML=data.msg;    
                this.hideMessage('payout');  
                setTimeout(function() {
       
                  document.getElementById("msg_payPal").innerHTML='';   
                  window.location.href='/me';   
                 }, 3000); 
               
              }
              else
              {
                document.getElementById("msg_payPal").style.color='red';
                document.getElementById("msg").innerHTML='unable to update'; 
                this.hideMessage('payout');     
              }                 
            
      });

    }
    else
    {
      alert('unable to update');
    }
  }
  hideMessage=(id)=>{
    setTimeout(function() {
     // document.getElementById(id).innerHTML='';  
          var element = document.getElementById(id);
          element.classList.remove("show");
     }, 2000);    
     
  }

  updatePassword=(e)=>{

    document.getElementById("msg_security").innerHTML='';
    document.getElementById("msg_security").style.color='red';
    if(this.state.Current_Password.length===0)
    { document.getElementById("msg_security").innerHTML='Enter Current Password'; return false}
     
  if(this.state.New_Password.length===0)
    { document.getElementById("msg_security").innerHTML='Enter New Password' ;return false}

          
    if(this.state.Confirm_Password.length===0)
    { document.getElementById("msg_security").innerHTML='Enter Confirm Password' ;return false}

    if(this.state.Confirm_Password!==this.state.New_Password)
    { document.getElementById("msg_security").innerHTML="New Password and Confirm password does't Matched ";return false;}

    if(this.state.Current_Password.length > 0 && this.state.New_Password.length > 0 && this.state.Confirm_Password.length > 0) 
    {
       let API_url=process.env.REACT_APP_API_URL+"admin/updatePassword";
      fetch(API_url, {
        method: 'post',
        headers: {"Content-Type": "application/json","authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify({Current_Password:this.state.Current_Password,New_Password:this.state.New_Password,Confirm_Password:this.state.Confirm_Password,JM_ID:this.state.JM_ID})
          })
          .then(response => response.json())
          .then(data => 
          {  
              if(data.status===1 || data.status===2)
              {
                ////console.log(data.msg);             
                document.getElementById("msg_security").style.color='green';
                document.getElementById("msg_security").innerHTML=data.msg;    
               // this.hideMessage("msg_security");    
                setTimeout(function() {
       
                  document.getElementById("msg_security").innerHTML='';   
                  window.location.reload();         
                 }, 2000); 
                
              }
              else
              {
                document.getElementById("msg_security").style.color='red';
                document.getElementById("msg_security").innerHTML=data.msg; 
                this.hideMessage("msg_security");     
              }                 
           
      });
 
    }
    else
    {
      alert('unable to update');
    }
  }

  updateProfileSettings=()=>{

    document.getElementById("msg_prof_set").style.color='red';
    document.getElementById("msg_prof_set").innerHTML='';
      if(this.state.JM_Name.length===0 )
        { document.getElementById("msg_prof_set").innerHTML='* Enter Profile Name'; return false}

      if(this.state.JM_Name.length > 0 )
      {
        var JM_Description= this.state.JM_Description.replace(/'/g, "\\'");  
        var JM_Name= this.state.JM_Name.replace(/'/g, "\\'");  
        let API_url=process.env.REACT_APP_API_URL+"admin/updateProfileSettings";
        fetch(API_url, {
          method: 'post',
          headers: {"Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
          body: JSON.stringify({
                JM_Name:JM_Name,
                JM_Description:JM_Description,
                JM_Social_Widget_Position:this.state.JM_Social_Widget_Position,
                JM_ID:this.state.JM_ID             
              })
            })
            .then(response => response.json())
            .then(data => 
            {  
                if(data.status===1 || data.status===2)
                {
                  document.getElementById("msg_prof_set").style.color='green';        
                  document.getElementById("msg_prof_set").innerHTML=data.msg;    
                  this.hideMessage('msg_prof_set');                             
                }
                else
                {
                  document.getElementById("msg_prof_set").style.color='red';
                  document.getElementById("msg_prof_set").innerHTML=data.msg; 
                  this.hideMessage('msg_prof_set');     
                }                 
              
        });
      }
  }

  availableEmail = (e) =>{
    // this.onChangeHandle(e);
    // let email=e.target.value;
    // let valid=true;
    // document.getElementById("email_msg").innerHTML='';
    // if(email.length > 0 && email.includes('@') && email.includes('.'))
    // {
    //           let API_url=this.state.base_url+"admin/ValidateEmail";
    //           fetch(API_url, {
    //           method: 'post',
    //           headers: {"Content-Type": "application/json"},
    //           body: JSON.stringify({JM_Email:email})
    //             }).then(function(response) {
    //               return response.json();
    //             }).then(function(data) {
               
    //           if(data.status===1 || data.status===2)
    //           {
    //             //console.log(data.msg);             
    //             document.getElementById("email_msg").innerHTML=data.msg;
    //             valid=true;           
    //           }
    //           else
    //           {
    //             document.getElementById("email_msg").innerHTML='';            
    //             valid=false;
                
    //           }                 

    //         });

    //   }        
    //   else
    //   {
    //   document.getElementById("email_msg").innerHTML='Not a valid email';
    //   valid=false;
    //   }  
    //   this.setState({Validation:valid});
  }
  updateEmail=(e)=>{

          if(API.isValidEmail(this.state.JM_Email)===false)
          {
            document.getElementById("msg_email").style.color='red';
            document.getElementById("msg_email").innerHTML="Invalid email";   
              return false;
          }
          if(this.state.JM_Password.length===0)
          {
            document.getElementById("msg_email").style.color='red';
            document.getElementById("msg_email").innerHTML="Enter password";   
            return false;
          }

   
          var flagData = {
            JM_Email:this.state.JM_Email,
            JM_ID:this.state.JM_ID,
            JM_Password:this.state.JM_Password
          };
    
          const flag=API.encryptData(flagData);
          var JSONdata = {
            flag: flag
          };
    

        let API_url=process.env.REACT_APP_API_URL+"admin/updateEmail";
        document.getElementById("msg_email").style.color='red';
        fetch(API_url, {
          method: 'post',
          headers: {"Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
          body: JSON.stringify(JSONdata)
            })
            .then(response => response.json())
            .then(data => 
            {  
                if(data.status===1)
                {
                  //console.log(data.msg);       
                  document.getElementById("msg_email").style.color='green';
                  document.getElementById("msg_email").innerHTML=data.msg;    
                  this.hideMessage("msg_email");                             
                }
                else
                {

                  document.getElementById("msg_email").innerHTML=data.msg; 
                  this.hideMessage("msg_email");     
                }                 
            
        });

     
  }


  responseGoogle = (response) => {

    let GoogleResponse;
    if (typeof response !== "undefined") {
      if (typeof response.profileObj === 'undefined') {
        return false;
      }
      document.getElementById("msg_email").innerHTML ='';
      GoogleResponse = response.profileObj;

      if(GoogleResponse.email!==this.state.old_email)
      {
         document.getElementById("msg_email").innerHTML = "Select your current email id";
          return false;
      }
    
      if (GoogleResponse.googleId.length > 0 && GoogleResponse.email.length > 0) 
      {
        this.setState({ GoogleResponse: GoogleResponse, showGoogleModal: true });
      }

    }

  }
  GoogleLogout=(response)=>{
    console.log(response);
    //idpiframe_initialization_failed : //client doesn't have third party cookies enabled
    //popup_closed_by_user :The user closed the popup before finishing the sign in flow.
  }
  updateEmailviaGoogle=(response)=>{
    let GoogleResponse;
    if (typeof response !== "undefined") 
    {
        if (typeof response.profileObj === 'undefined') {
          return false;
        }
        document.getElementById("msg_email_google").innerHTML ='';
        GoogleResponse = response.profileObj;

      if(GoogleResponse.email===this.state.old_email)
      {
        document.getElementById("msg_email_google").innerHTML ='Select another email id to update';
        return false;
      }

  
      let flagData = {
        JM_Email: GoogleResponse.email,
        JM_ID:this.state.JM_ID,       
        JM_Google_ID: GoogleResponse.googleId
      };

      const flag=API.encryptData(flagData);
      let JSONdata = {
        flag: flag
      };


      let API_url = this.state.base_url + "admin/ValidateEmail_after_login";
      fetch(API_url, {
        method: 'post',
        headers: {"Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      }).then(function (response) {
        return response.json();
      }).then(data => { 
        if (data.status === 1) 
        {
          document.getElementById("msg_email_google").style.color='green';
          document.getElementById("msg_email_google").innerHTML = data.msg;
          window.location.reload();
      
        }
        else if(data.status === -1 )
        {
          document.getElementById("msg_email_google").innerHTML = data.msg;      
          return false;
        }
        else 
        {
          document.getElementById("msg_email_google").innerHTML = data.msg;      
          return false;
        }
      });
    }

  }
  
 


  updateNotiPref2=async (e)=>{
    try {




      var JSONdata = {
        JM_ID: this.state.JM_ID,
        JM_Email_Pref: this.state.JM_Email_Pref,
        JM_SMS_Pref: this.state.JM_SMS_Pref
      };
      document.getElementById("msg_prof_other").style.color='red';
      let data=await API.postData(JSONdata,'updateNofityPref');
      if(data.status===1)
      {
        document.getElementById("msg_prof_other").style.color='green';
        document.getElementById("msg_prof_other").innerHTML=data.msg; 
        setTimeout(function() {
          document.getElementById("msg_prof_other").innerHTML='';            
         }, 2000);   
      }
      else
      {
        document.getElementById("msg_prof_other").innerHTML=data.msg; 
        return false;
      }
    } catch (error) 
    {
      document.getElementById("msg_prof_other").innerHTML='Network error, try later'; 
    }
  
  }
  onChangePhoneNumber= async(e)=>{
    var JM_Phone=e.target.value;
    this.setState({
      JM_Phone
    })
    let isNumber=API.matchNumberPattern(JM_Phone);
   
    if(!isNumber || JM_Phone.length > 10)
    {
      document.getElementById("msg_phone").innerHTML='Please enter a valid phone number';    
   
      return false;
    }
  
    if(JM_Phone.length === 10)
    {

      let resp=await API.validatePhone(JM_Phone);
      //console.log(resp)
      var msg=resp? '':'Use another number';      
      document.getElementById("msg_phone").innerHTML=msg;
 
      this.setState({
        isValidPhone:resp
      })
    }
    else
    {
      document.getElementById("msg_phone").innerHTML='Please enter a valid phone number';

    }
  }

  onChangePhoneNumberBank=async (e)=>{
    var JM_Phone_Bank=e.target.value;
    this.setState({
      JM_Phone_Bank
    })
    let isNumber=API.matchNumberPattern(JM_Phone_Bank);
    document.getElementById("msg").innerHTML='';
    if(!isNumber || JM_Phone_Bank.length !==10 )
    {
      document.getElementById("msg").innerHTML='Please enter a valid phone number of 10 digits'; 
      return false;
    }
    
  
  }

  updatePhone=async (e)=>
  {
    if(this.state.isValidPhone)
    {
      var JSONdata={
        JM_ID:this.state.JM_ID,
        JM_Phone:this.state.JM_Phone
      }
      document.getElementById("msg_phone").innerHTML='';
      document.getElementById("msg_phone").style.color='red';  
      let updateResp=await API.postData(JSONdata,'updatePhone');
      var msg=updateResp ? 'Update Successfully':'Use another number'; 
      document.getElementById("msg_phone").style.color=updateResp?'green':'red';  
      document.getElementById("msg_phone").innerHTML=msg;
      setTimeout(function() {
       
         document.getElementById("msg_phone").innerHTML='';            
        }, 2000); 
    }
    else
    {
      document.getElementById("msg_phone").innerHTML='Please enter a valid phone number';
    }
  }
  isPhoneNumberExist=(e)=>{
  
    if(this.state.JM_Phone && this.state.JM_Phone.length > 0)
    { 
      this.setState({ JM_SMS_Pref : 'Y'})
    }
    else
    {
      e.target.checked=false;
      document.getElementById("JM_Phone").focus();
    }
  }
  updateNotiPref= async(e)=>{
        var checked='N';
        var id=e.target.id;
        //console.log(id)
        if(e.target.checked)
        {
          if(id==='Vid_Aud_Msg_Email')
            this.setState({ Vid_Aud_Msg_Email:'Y'})
          if(id==='Vid_Aud_Msg_SMS')
            this.setState({ Vid_Aud_Msg_SMS:'Y'})

          if(id==='Req_Reminder_Email')
            this.setState({ Req_Reminder_Email:'Y'})
          if(id==='Req_Reminder_SMS')
            this.setState({ Req_Reminder_SMS:'Y'}) 

            if(id==='Goods_Purchased_Email')
            this.setState({ Goods_Purchased_Email:'Y'})
          if(id==='Goods_Purchased_SMS')
            this.setState({ Goods_Purchased_SMS:'Y'}) 
            
          if(id==='Gift_Donation_Email')
            this.setState({ Gift_Donation_Email:'Y'})
          if(id==='Gift_Donation_SMS')
            this.setState({ Gift_Donation_SMS:'Y'}) 

            checked='Y';
        }
        else
        {
          if(id==='Vid_Aud_Msg_Email')
            this.setState({ Vid_Aud_Msg_Email:'N'})
          if(id==='Vid_Aud_Msg_SMS')
            this.setState({ Vid_Aud_Msg_SMS:'N'})

          if(id==='Req_Reminder_Email')
            this.setState({ Req_Reminder_Email:'N'})
          if(id==='Req_Reminder_SMS')
            this.setState({ Req_Reminder_SMS:'N'}) 

            if(id==='Goods_Purchased_Email')
            this.setState({ Goods_Purchased_Email:'N'})
          if(id==='Goods_Purchased_SMS')
            this.setState({ Goods_Purchased_SMS:'N'}) 
            
          if(id==='Gift_Donation_Email')
            this.setState({ Gift_Donation_Email:'N'})
          if(id==='Gift_Donation_SMS')
            this.setState({ Gift_Donation_SMS:'N'}) 
          checked='N';
        }
        //console.log(this.state.Vid_Aud_Msg_SMS)
        var JSONdata={
          JM_ID:this.state.JM_ID,
          id:id,
          checked:checked
        }
        let data=await API.postData(JSONdata,'updateNofityPref');
        //console.log(data)
  }
  render(){
  return (
    <>
         <Helmet>
            <title>Settings | Expy </title>
            <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta>
        </Helmet>
            
    <ProfileHeader/>
      <div className="profile-tab">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <ProfileNav/>
            </div>
          </div>
        </div>
      </div>
      
      <div className="setting-sec">
        	<div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="setting">
                  <div className="heading">
                    <h3>Account Settings</h3>
                  </div>
                  <Accordion defaultActiveKey={this.state.defaultActiveKey ===''? "0" : this.state.defaultActiveKey }>
                    {/* Profile details */}
                    <div className="crd">
                      <div className="head">
                        <Accordion.Toggle  as={Link} variant="link" eventKey="0">
                          <h3>Profile Settings <AddCircleOutlineIcon/></h3>
                          <p>General profile settings such as name and bio.</p>
                        </Accordion.Toggle>
                      </div>
                      <Accordion.Collapse eventKey="0"  id="profile">
                       <div className="crdbody"> 
                        <label>Name</label>
                        <input type="text" className="form-control" name="JM_Name" placeholder="Name" 
                        value={this.state.JM_Name} onChange={this.onChangeHandle}/>

                         

                        <label>Tagline (Default is your handle)</label>
                        <input type="text" className="form-control" placeholder="Tagline"
                         name="JM_Description"  value={this.state.JM_Description} onChange={this.onChangeHandle} />
                        <label> Social Widget Position </label>
                        <select className="form-control" name="JM_Social_Widget_Position" value={this.state.JM_Social_Widget_Position} onChange={this.onChangeHandle}>                         
                          <option value="bottom"> Bottom </option>
                          <option value="top"> Top </option>
                        </select> 
                        <button className="btun" onClick={this.updateProfileSettings}> Save Setting </button>
                        <p id="msg_prof_set" style={{color:'red'}}></p>
                       </div>
                      </Accordion.Collapse>
                    </div>
                    {/* payout details */}                

                    
                     <div className="crd">
                      <div className="head">
                        <Accordion.Toggle as={Link} variant="link" eventKey="1">
                          <h3>Payout Details <AddCircleOutlineIcon/></h3>
                          <p>Control your Payout Details with expy</p>
                        </Accordion.Toggle>
                      </div>
                      <Accordion.Collapse eventKey="1" id="payout">
                       <div className="crdbody">    
                         <h5>Bank Account Details</h5>  

                         <label>Beneficiary Name </label>
                          <input type="text"name="JM_Beneficiary_Name"  className="form-control" placeholder="Beneficiary Name" 
                          value={this.state.JM_Beneficiary_Name} onChange={this.onChangeHandle}/>  

                         <label>Account No.</label>
                          <input type="number" min="0" name="JM_Acc_No"  className="form-control" placeholder="A/C No." 
                          value={this.state.JM_Acc_No} onChange={this.onChangeHandle}/>

                          <label>IFSC Code</label>
                          <input type="text" className="form-control" placeholder="IFSC CODE"  
                          name="JM_Acc_Code"  value={this.state.JM_Acc_Code} onChange={this.onChangeHandle}/>

                         

                          <label>SWIFT Code</label>
                          <input type="text" className="form-control" placeholder="SWIFT CODE (Optional)"  
                          name="JM_SWIFT_Code"  value={this.state.JM_SWIFT_Code} onChange={this.onChangeHandle}/>

                           <label>Phone Number </label>
                          <input type="number"name="JM_Phone_Bank" id="JM_Phone_Bank" min="0" max={"10"} 
                          className="form-control" placeholder="Enter Phone Number"  title=''
                          value={this.state.JM_Phone_Bank} onChange={this.onChangePhoneNumberBank}/> 
                         <button className="btun" onClick={this.updatePayout}>Save Setting</button>
                        
                           {/* <DeleteForeverIcon onClick={this.isConfirm('B')} style={{float:'right',cursor:'pointer',fontSize:'30px',color:'#ff4975'}}/> */}
                         
                         <p id="msg" style={{color:'red'}}></p>

                          <div className="title login" style={{display:'none'}}>
                            <h3>OR</h3>
                          </div>
                          {
                            this.state.showPaypal===true?                          
                          <div style={{display:'none'}}>
                             <h5>PayPal Details</h5>
                             <label>Name </label>
                              <input type="text"name="JM_PayPal_Name"  className="form-control" placeholder="Name" 
                              value={this.state.JM_PayPal_Name} onChange={this.onChangeHandle}/>    
                             <label>Phone No.</label>
                              <input type="number" min="0" name="JM_PayPal_Phone"  className="form-control" placeholder="Phone No" 
                              value={this.state.JM_PayPal_Phone} onChange={this.onChangeHandle}/>
                              <label>Associated Username or Email</label>
                              <input type="text"name="JM_PayPal_Email"  className="form-control" placeholder="Associated Username or Email" 
                              value={this.state.JM_PayPal_Email} onChange={this.onChangeHandle}/> 

                            <button className="btun" onClick={this.updatePayPal}>Save Setting</button>
                            
                              {/* <DeleteForeverIcon onClick={this.isConfirm('P')} style={{float:'right',cursor:'pointer',fontSize:'30px',color:'#ff4975'}}/> */}
                         
                            <p id="msg_payPal" style={{color:'red'}}></p>
                            </div>
                          :
                          null
                        }

                       </div>
                      
                      </Accordion.Collapse>
                    </div>
               



                    {/*change  password  */}
                    <div className="crd">
                      <div className="head">
                        <Accordion.Toggle as={Link} variant="link" eventKey="2" >
                          <h3>Security <AddCircleOutlineIcon/></h3>
                          <p>Change your password and other security settings.</p>
                        </Accordion.Toggle>
                      </div>
                          <Accordion.Collapse eventKey="2" id="security">
                              <div className="crdbody"> 
                                  <label>Email</label>
                                  <input type="email" className="form-control" name="JM_Email" placeholder="Enter Email" 
                                  value={this.state.JM_Email} onChange={this.onChangeHandle} disabled={this.state.isNormalUser===true ? false:true}/>  
                                    {
                                    
                                      this.state.isNormalUser===true ?    
                                       <>                         
                                          <input type="password" className="form-control" placeholder="Enter Password"
                                          name="JM_Password" onChange={this.onChangeHandle} value={this.state.JM_Password} />                                                               
                                          <button className="btun" disabled={this.state.Validation} onClick={this.updateEmail}> Update Email</button>
                                       </>
                                      :
                                
                                        <>
                                          {/* <GoogleLogin className="btun" style={{color:'red',cursor:'pointer'}} id="google_btn"
                              
                                          clientId={process.env.REACT_APP_Google_Client_Id} 
                                    
                                          render={renderProps => (
                                            <button onClick={renderProps.onClick} className="btun"  disabled={renderProps.disabled}>Verify and update email</button>
                                          )}
                                          buttonText="Validate and update email"
                                          onSuccess={this.responseGoogle}
                                          onFailure={this.responseGoogleFaild}
                                          cookiePolicy={'single_host_origin'}
                                    
                                        /> */}
                                              <Modal
                                                size="sm"
                                                show={this.state.showGoogleModal}
                                                onHide={() => this.setState({ showGoogleModal: false, expy_email: '' })}
                                                aria-labelledby="example-modal-sizes-title-sm"
                                                backdrop="static"
                                                keyboard={false}
                                                centered
                                              >
                                                <Modal.Header closeButton>
                                                  <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
                                                    Update email
                                                  </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                  {/* <input type="text" className="form-control" placeholder="Enter new email" name="expy_email" 
                                                  value={this.state.expy_email}
                                                  onChange={this.onChangeHandle}
                                                  /> */}
                                                                                               
                                                      <GoogleLogin className="loginBtn" style={{color:'red',cursor:'pointer'}}                                                      
                                                          clientId={process.env.REACT_APP_Google_Client_Id}  
                                                          buttonText="Update a new email id"
                                                          onSuccess={this.updateEmailviaGoogle}
                                                          onFailure={this.responseGoogleFaild}
                                                          isSignedIn={false}
                                                          // cookiePolicy={'single_host_origin'}
                                                        />

                                                       {/* <GoogleLogout
                                                         clientId={process.env.REACT_APP_Google_Client_Id}  
                                                          buttonText="Logout"
                                                          onLogoutSuccess={this.GoogleLogout}                                                          
                                                        >
                                                        </GoogleLogout> 
                                          */}
                                                  <p id='msg_email_google' style={{ fontSize: '15px', color: 'red', width: '100%' }}></p>
                                                </Modal.Body>
                                                <Modal.Footer>                                                  
                                                    
                                                </Modal.Footer>
                                              </Modal>
                                      </>
                                    }
                                 

                                  <p id="msg_email" style={{color:'red'}}></p>

                                  <hr></hr>
                                  
                                   <label>Phone Number </label>
                                    <input type="number"name="JM_Phone" id="JM_Phone" min="0" max={"10"} className="form-control" placeholder="Enter Phone Number" 
                                    value={this.state.JM_Phone} onChange={this.onChangePhoneNumber}/> 
                                  <button className="btun" onClick={this.updatePhone}>Update Phone</button>
                                  <p id="msg_phone" style={{color:'red'}}></p>
                                  
                                  <hr></hr>
                                  <label>Current Password</label>
                                  <input type="password" className="form-control" placeholder="Current Password" 
                                  name="Current_Password" onChange={this.onChangeHandle} value={this.state.Current_Password} />
                                  <label>New Password</label>
                                  <input type="password" className="form-control" placeholder="New Password"
                                  name="New_Password" onChange={this.onChangeHandle} value={this.state.New_Password} />
                                  <label>Confirm Password</label>
                                  <input type="password" className="form-control" placeholder="Confirm Password"
                                    name="Confirm_Password" onChange={this.onChangeHandle} value={this.state.Confirm_Password} />
                                  <button className="btun" onClick={this.updatePassword}>Update Password</button>
                                  <p id="msg_security" style={{color:'red'}}></p>
                          </div>
                          </Accordion.Collapse>
                       </div>
                     {/*change  others  */}
                    <div className="crd" style={{display:'block'}}>
                      <div className="head">
                        <Accordion.Toggle  as={Link} variant="link" eventKey="3">
                          <h3>Notification Preferences <AddCircleOutlineIcon/></h3>
                          <p></p>
                        </Accordion.Toggle>
                      </div>
                      <Accordion.Collapse eventKey="3"  id="others">

                      
                          

                       <div className="crdbody">  
                        
                          <div className="row" style={{display:'none'}}>
                              <div className="col-md-6">                                        
                                <h5>Email </h5>                              
                              </div>
                              <div className="col-md-6">     
                                  <input type="radio" className="globalradio"  id="chooseType_1"   onClick={()=> this.setState({ JM_Email_Pref : 'Y'})} 
                                  name="email_pref" checked={this.state.JM_Email_Pref==='Y' ? true : false}/>
                                          <label for="chooseType_1">Yes</label>
                            
                                  <input type="radio" className="globalradio"   onClick={()=> this.setState({ JM_Email_Pref : 'N'})} 
                                  name="email_pref" id="chooseType_2"  checked={this.state.JM_Email_Pref==='N' ? true : false}/>
                                    <label for="chooseType_2">No</label> 
                              
                              </div>
                          </div>
                          <div className="row" style={{display:'none'}}>
                              <div className="col-md-6">                                        
                                <h5>SMS </h5>                              
                              </div>
                              <div className="col-md-6">                         
                                  <input type="radio" className="globalradio"   onClick={this.isPhoneNumberExist} 
                                  name="sms_pref"  id="chooseType_3"  checked={this.state.JM_SMS_Pref==='Y' ? true : false}/>
                                    <label for="chooseType_3">Yes</label> 
                            
                                  <input type="radio" className="globalradio"    onClick={()=> this.setState({ JM_SMS_Pref : 'N'})} 
                                  name="sms_pref" id="chooseType_4" checked={this.state.JM_SMS_Pref==='N' ? true : false}/>
                                      <label for="chooseType_4">No</label> 
                          
                              </div>
                          </div>
                          <button className="btun" onClick={this.updateNotiPref} style={{display:'none'}}>> Save</button> 
                            <p id="msg_prof_other" style={{color:'red'}}></p>
                      
                 
                        <div className="item">
                            <div className="item-heading">
                              <div className="row">
                                <div className="col-md-2 order-md-last justify-content-end d-flex flex-wrap align-content-center">
                                    <a><PhoneAndroidIcon style={{fontSize:"22px"}}/></a>
                                    <a><EmailIcon style={{fontSize:"22px"}}/></a>
                                  </div>
                                  <div className="col-md-10">
                                      <p>Activity</p>
                                  </div>
                              </div>
                            </div>
                            <div className="item-list">
                                <div className="row">
                                  <div className="col-md-2 order-md-last justify-content-end d-flex flex-wrap align-content-center">
                                      <label className="checklabel">                              
                                        <input type="checkbox"  className="checkinput"  id="Vid_Aud_Msg_SMS"   
                                           checked={this.state.Vid_Aud_Msg_SMS==='Y'?true:false} 
                                           onClick={this.updateNotiPref}/>
                                            <span className="checkmark"></span>
                                      </label>
                                      <label className="checklabel">
                                          <input type="checkbox" className="checkinput"  id="Vid_Aud_Msg_Email" 
                                            checked={this.state.Vid_Aud_Msg_Email==='Y'?true:false} 
                                            onClick={this.updateNotiPref}/>
                                           <span className="checkmark"></span>
                                      </label>                                      
                                    </div>
                                    <div className="col-md-10">
                                        <p>New video or audio message request </p>
                                    </div>
                                </div>
                            </div>


                            <div className="item-list">
                                <div className="row">
                                  <div className="col-md-2 order-md-last justify-content-end d-flex flex-wrap align-content-center">
                                      <label className="checklabel">                                   
                                        <input type="checkbox" className="checkinput" id="Req_Reminder_SMS" 
                                        checked={this.state.Req_Reminder_SMS==='Y'?true:false}
                                        onClick={this.updateNotiPref}/>
                                        <span className="checkmark"></span>
                                      </label>
                                      <label className="checklabel">                                   
                                      <input type="checkbox" id="Req_Reminder_Email"  className="checkinput"
                                         checked={this.state.Req_Reminder_Email==='Y'?true:false}
                                         onClick={this.updateNotiPref}/>
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                    <div className="col-md-10">
                                        <p>Pending/accepted video or audio message request reminder </p>
                                    </div>
                                </div>
                            </div>
                            <div className="item-list">
                                <div className="row">
                                  <div className="col-md-2 order-md-last justify-content-end d-flex flex-wrap align-content-center">
                                        <label className="checklabel">                                   
                                          <input type="checkbox" id="Goods_Purchased_SMS"  className="checkinput"
                                          checked={this.state.Goods_Purchased_SMS==='Y'?true:false}
                                            onClick={this.updateNotiPref}/>
                                          <span className="checkmark"></span>
                                        </label>
                                      <label className="checklabel">
                                        <input type="checkbox"  className="checkinput" id="Goods_Purchased_Email"
                                        checked={this.state.Goods_Purchased_Email==='Y'?true:false}
                                            onClick={this.updateNotiPref}/>
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                    <div className="col-md-10">
                                        <p>New unlock content or digital e-commerce good purchased </p>
                                    </div>
                                </div>
                            </div>
                            <div className="item-list">
                                <div className="row">
                                  <div className="col-md-2 order-md-last justify-content-end d-flex flex-wrap align-content-center">
                                        <label className="checklabel">                                   
                                            <input type="checkbox" id="Gift_Donation_SMS" className="checkinput"
                                            checked={this.state.Gift_Donation_SMS==='Y'?true:false}
                                              onClick={this.updateNotiPref}/>
                                          <span className="checkmark"></span>
                                        </label>
                                      <label className="checklabel">
                                          <input type="checkbox" id="Gift_Donation_Email"  className="checkinput"
                                            checked={this.state.Gift_Donation_Email==='Y'?true:false}
                                          onClick={this.updateNotiPref}/>
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                    <div className="col-md-10">
                                        <p>New gift or donation  </p>
                                    </div>
                                </div>
                            </div>

                          </div>
                       </div>

                       


                      </Accordion.Collapse>
                    </div>
                  </Accordion>
                </div>
                


              </div>
            </div>
          </div>
      </div>

                             
    <FooterClass/>
    </>
  )
}
}
export default Settings