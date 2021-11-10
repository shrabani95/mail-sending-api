
//,"authorization": API.getAuth(),"id":API.getId()},
//import API  from '../services/API';

import { confirmAlert } from 'react-confirm-alert'; // Import
import cryptoRandomString from 'crypto-random-string';
import CryptoJS  from "crypto-js"
import validator from 'validator';
import isWebview from 'is-ua-webview'


import {
  faInstagram,
  faFacebookF,
  faYoutube,
  faSnapchatGhost,
  faLinkedinIn,
  faTwitch,
  faTwitter,
  faPinterestP,
  faSpotify,
  faDiscord,
  faMedium,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import {
  faGlobe,
  faShoppingCart,
  faEnvelope,
  faHandPaper
} from "@fortawesome/free-solid-svg-icons";

const API={
  postData:async function(JSONdata,apiName,ext="")
  {
    try 
    {
      let response; 
      const API_url =  process.env.REACT_APP_API_URL + "admin/"+apiName;  
        response = await fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId(),'ext':ext},
        body: JSON.stringify(JSONdata)
      })
      const data = await response.json();
      return data;
      
    } 
    catch (error) 
    {
      //alert("network error, try later");
    }
  },
 
  doClick: function(JSONdata) 
  {      
    const API_url = process.env.REACT_APP_API_URL + "admin/updateClick";   
      return  fetch(API_url,
        {
          method: 'post',
          headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
          body: JSON.stringify(JSONdata)
        })
        .then((response) => response.json())
        .then(data => {
          //console.log(data);
          return data;  
        }).catch(error => console.warn(error));
  },
  updateStepStatus: async function(JSONdata)
  {
    if(JSONdata.JM_ID > 0)
    {
      const API_url = process.env.REACT_APP_API_URL + "admin/updateStepStatus";   
      return  fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(data => {
        ////console.log(data);
        return data;  
      }).catch(error => console.warn(error));
    }
    
  },
  updateToolStep: function(id)
  {

        if(id===2)
        {              
          document.getElementById('tool_bio').style.display='none';
      
          document.getElementById('tool_drag_part').style.display='none';   
          document.getElementById('tool_preview').style.display='none';
          // document.getElementById('tool_design').style.display='none';
          // document.getElementById('tool_stat').style.display='none';
          document.getElementById('tool_setting').style.display='none';   
          //document.getElementById('tool_notify').style.display='none';
          document.getElementById('tool_page_link').style.display='none';
          
          document.getElementById('tool_new_item').style.display='block';
          this.scrollDiv('profilePart',id);
        }
        if(id===3)
        {
          document.getElementById('tool_new_item').style.display='none';
          document.getElementById('tool_drag_part').style.display='block';   
          this.scrollDiv('profilePart',id);
        }
        if(id===4)
        {          

          document.getElementById('tool_drag_part').style.display='none';  
          document.getElementById('tool_preview').style.display='block';   
        
        }
        if(id===5)
        {      
          document.getElementById('tool_preview').style.display='none';         
          document.getElementById('tool_design').style.display='block';   
          this.scrollDiv('profilePart',id);
        }
        if(id===6)
        {            
          document.getElementById('tool_design').style.display='none';  
          document.getElementById('tool_stat').style.display='block';  
        }
        if(id===7)
        {          
          document.getElementById('tool_stat').style.display='none';  
          document.getElementById('tool_setting').style.display='block'; 
          this.scrollDiv('profilePart',id); 
        }
        if(id===8)
        {
          var h=window.screen.height;
          var w=window.screen.width;
          if(w >= 480) 
          {
            document.getElementById('tool_setting').style.display='none'; 
            document.getElementById('tool_notify').style.display='block'; 
          }
          else
          {
            document.getElementById('sidemenu').click();
            document.getElementById('tool_setting').style.display='none'; 
            document.getElementById('tool_notify_top').style.display='block'; 
          }
    
          
          // this.scrollDiv('profilePart',id); 
        }
        if(id===9)
        {          

          var h=window.screen.height;
          var w=window.screen.width;
          if(w >= 480) 
          {
            document.getElementById('tool_notify').style.display='none'; 
            document.getElementById('tool_page_link').style.display='block'; 
          }
          else
          {
              document.getElementById('cls').click();                
              document.getElementById('tool_notify_top').style.display='none'; 
              document.getElementById('tool_page_link').style.display='block';
              this.scrollDiv('profilePart',id); 
          }
        }
        
  },
  updateStepsClose: async function(id)
  { 
  let JM_Email=localStorage.getItem('JM_Email');
  let JM_ID=parseInt(localStorage.getItem('JM_ID'));
  var JSONdata={
    JM_ID:JM_ID
  }
  let data=await API.updateStepStatus(JSONdata);
 // console.log(data)    
  document.getElementById(id).style.display = data.status===1 ? 'none' : 'block';

  },
  scrollDiv:function(divId,id)
  {
  var div = document.getElementById(divId);
  var scrollHeight = div.scrollHeight;
  // var scrollTop = div.scrollTop;
  var h=window.screen.height;
  var w=window.screen.width;
  if(w >= 480)  // web
  {
    if(id===2) 
    {
        document.getElementById(divId).scrollTop = 200;
    }  
    if(id===3) 
    {
      document.getElementById(divId).scrollTop = 500;           
    }  
    if(id===7) 
    {
      document.getElementById(divId).scrollTop = 0;           
    }  
  }  
  else // mobile
  {
    if(id===2) 
    {           
      window.scroll(0, 500)
    }  
    if(id===3) 
    {
      window.scroll(0, 800)      
    }  
    if(id===5) 
    {
      window.scroll(0, 0)                     
    }  
    if(id===7) 
    {
      window.scroll(0, 150)                     
    }  
    if(id===9) 
    {
      window.scroll(0, 500)                     
    }  
  }  
    
  },
  updateSeen: async function()
  {
       try {
        
              const API_url = process.env.REACT_APP_API_URL+ "admin/updateSeen";
              const response=await fetch(API_url,{
                  method: 'post',
                  headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},               
                });
              const data=await response.json();             
              //window.location.href='/view-notification'
            
       } 
       catch (error) 
       {
         alert('internal error')
       }
     
  },
  ShowNotification: async function()
  {
          var id = parseInt(localStorage.getItem('JM_ID'));  
          var JSONdata = {
            JM_ID: id
          };   
            const API_url = process.env.REACT_APP_API_URL+ "admin/GetAllRequest";
            const response=await fetch(API_url,{
                method: 'post',
                headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
                body: JSON.stringify(JSONdata)
              });
            const data=await response.json();
            return data;
        
  },
  makeOrderBy: function(type,arr,key)
  {
    if(type==='desc')
    {
      arr.sort( function ( a, b ) { return b.key - a.key; } );
    }
    if(type==='asec')
    {
      arr.sort( function ( a, b ) { return a.key - b.key; } );
    }
    return arr;
  },
  validatePhone:async function(phone)
  {
          try {
            var id = parseInt(localStorage.getItem('JM_ID'));
            var JSONdata = {
              JM_Phone : phone,
              JM_ID:id
            };   
            const API_url = process.env.REACT_APP_API_URL+ "admin/isAvailablePhone";
            const response=await fetch(API_url,{
                method: 'post',
                headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
                body: JSON.stringify(JSONdata)
              });
            const data=await response.json();             
            // console.log(data)
            if(data.status===1)
              return true; // available
            else
              return false; // not available
          
      } 
      catch (error) 
      {
       alert('internal error')
       return false;
      }
  },
  validatePhoneBank:async function(phone)
  {
          try {
            var id = parseInt(localStorage.getItem('JM_ID'));
            var JSONdata = {
              JM_Phone_Bank : phone,
              JM_ID:id
            };   
            const API_url = process.env.REACT_APP_API_URL+ "admin/isAvailablePhoneBank";
            const response=await fetch(API_url,{
                method: 'post',
                headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
                body: JSON.stringify(JSONdata)
              });
            const data=await response.json();             
            // console.log(data)
            if(data.status===1)
              return true; // available
            else
              return false; // not available
          
      } 
      catch (error) 
      {
       alert('internal error')
       return false;
      }
  },

  updatePhone : async function(JSONdata)
  {
        try {
            
          const API_url = process.env.REACT_APP_API_URL+ "admin/updatePhone";
          const response=await fetch(API_url,{
              method: 'post',
              headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
              body: JSON.stringify(JSONdata)
            });
          const data=await response.json();             
          //console.log(data)
          if(data.status===1)
            return true; // available
          else
            return false; // not available
        
    } 
    catch (error) 
    {
      alert('internal error')
      return false;
    }
  },
  matchNumberPattern:function(input_str)
  {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,10}$/im;
    return re.test(input_str);
  },
  GetDummyImageCarousel:function(param)
  {
    const default_image1="images/no_img_carousel.jpg";
    const default_image2="images/no_img_carousel.jpg";
    const default_image3="images/no_img_carousel.jpg";
    if(param===1)
      return default_image1;
    if(param===2)
      return default_image2;
    if(param===3)
      return default_image3;
  },
  GetDummyChoosImageCarousel:function(param)
  {
    const default_image1='images/choose_img1.jpg';
    const default_image2='images/choose_img2.jpg';
    const default_image3='images/choose_img3.jpg';
    if(param===1)
      return default_image1;
    if(param===2)
      return default_image2;
    if(param===3)
      return default_image3;
  },
  GetSlidingInterval:function()
  {
    const time=10000;
    return time;
  },
  updateNotiPref:async function(JSONdata)
  {
        
        try {
                
          const API_url = process.env.REACT_APP_API_URL+ "admin/updateNotiPref";
          const response=await fetch(API_url,{
              method: 'post',
              headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
              body: JSON.stringify(JSONdata)
            });
          const data=await response.json();             
         return data;
        
    } 
    catch (error) 
    {
      alert('internal error')
      return false;
    }
  },
  EmailValidation:async function(email)
  {
    if (email.length > 0 && email.includes('@') && email.includes('.')) 
    {   
      try {
       const JSONdata={
          JM_Email: email
        }
              const API_url = process.env.REACT_APP_API_URL+ "admin/ValidateEmail";
              const response=await fetch(API_url,{
                  method: 'post',
                  headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
                  body: JSON.stringify(JSONdata)
                });
              const data=await response.json();             
             return data;
            
        } 
        catch (error) 
        {
          alert('internal error')
          return false;
        }
    }
    else
    {
      var data={
        status:2
      }
      return data;
    }
  },
  validReferralCode:async function(JM_Referral)
  {
    if (JM_Referral.length > 0 ) 
    {   
      try {
            var JSONdata = {
              code: JM_Referral,
            };
              const API_url = process.env.REACT_APP_API_URL+ "admin/validReferralCode";
              const response=await fetch(API_url,{
                  method: 'post',
                  headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
                  body: JSON.stringify(JSONdata)
                });
              const data=await response.json();             
              return data;
            
        } 
        catch (error) 
        {
          var data={
            status:0
          }
          return data;
        }
    }   
  },
  isAvailablePhone_by_phone:async function(phone)
  {
          try {      
            var JSONdata = {
              JM_Phone : phone,          
            };   
            const API_url = process.env.REACT_APP_API_URL+ "admin/isAvailablePhone_by_phone";
            const response=await fetch(API_url,{
                method: 'post',
                headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
                body: JSON.stringify(JSONdata)
              });
            const data=await response.json();             
            //console.log(data)
            if(data.status===1)
              return true; // available
            else
              return false; // not available
          
      } 
      catch (error) 
      {
          alert('internal error')
         return false;
      }
  },
  SocialIcons:function(iconName)
  {
    
    var componentLookup = {
      faInstagram,
      faFacebookF,
      faYoutube,
      faSnapchatGhost,
      faLinkedinIn,
      faTwitch,
      faTwitter,
      faPinterestP,
      faSpotify,
      faGlobe,
      faShoppingCart,
      faEnvelope,
      faHandPaper,
      faDiscord,
      faMedium,
      faWhatsapp
      
    }

     return componentLookup[iconName]
  },
  GetCurDate:function(min=1)
  {
    var utc = new  Date(Date.now() + min * 24 * 60 * 60 * 1000).toJSON().slice(0,10).replace(/-/g,'-');
    return utc;
  },
  ConvertTimeTo12 : function(time){

    var parts = time.split(':');
    var hours = parseInt(parts[0]);
    var minutes = parts[1];
  
    if(hours >= 12){
      var newhours = parseInt(hours) - 12;
      var meridiem = "pm";
    }else{
      var newhours = parseInt(hours);
      var meridiem = "am";
    }
  
    if(newhours == 0) newhours = "12";
    var newtime = newhours + ":" + minutes + " " + meridiem;
  
    return newtime;
  },
  WaitForSecond:function(second)
  {
    setTimeout(function() {            
     }, second); 
  },
  SplitCarouselTitle:function(carousel)
  {
    var data;
    if(carousel.length > 2 )
    {
        var description = carousel.description.replace(/\'/g, '"');
         data=JSON.parse(description);
         if(data.length===3)
         {
            this.setState({
                carousel_title_1:data[0],
                carousel_title_2:data[1],
                carousel_title_3:data[2],
            })
         }
    }
  },
  razorpay_x:async function(JSONdata)
  {
    try {                      
            const API_url = process.env.REACT_APP_API_URL+ "admin/createContact";
            const response=await fetch(API_url,{
                method: 'post',
                headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
                body: JSON.stringify(JSONdata)
              });
            const data=await response.json();             
            return data;
          
      } 
      catch (error) 
      {
        alert('internal error')
        return false;
      }
  },
  updateJoiningMaster:async function(value,colName,tableId)
  {
    //var funName=this.getFuncName();
   // //console.log(funName)
    var JSONdata={
      value,colName,tableId
    }
    try {                      
      const API_url = process.env.REACT_APP_API_URL+ "admin/updateJoiningMaster";
      const response=await fetch(API_url,{
                method: 'post',
                headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
                body: JSON.stringify(JSONdata)
              });
            const data=await response.json();             
            return data;
          
      } 
      catch (error) 
      {
        alert('internal error')
        return false;
      }
  },
 getFuncName:function() 
 {
   // return arguments.callee.name;
 },
 //22-jul-2021
 createSchedule:async function(JSONdata)
 {
  try {                      
    const API_url = process.env.REACT_APP_API_URL+ "admin/createSchedule";
    const response=await fetch(API_url,{
              method: 'post',
              headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
              body: JSON.stringify(JSONdata)
            });
          const data=await response.json();             
          return data;
        
    } 
    catch (error) 
    {
      //alert('internal error')
      return false;
    }
 },
 createScheduleFormData:async function(formData)
 {
  try {                      
    const API_url = process.env.REACT_APP_API_URL+ "admin/createSchedule";
    const response=await fetch(API_url,{
              method: 'post',
              headers: { "authorization": this.getAuth(),"id":this.getId()},
              body: formData
            });
          const data=await response.json();             
          return data;
        
    } 
    catch (error) 
    {
      //alert('internal error')
      return false;
    }
 },
 updateSchedule:async function(formData)
 {
  try {                      
    const API_url = process.env.REACT_APP_API_URL+ "admin/updateSchedule";
    const response=await fetch(API_url,{
              method: 'post',
              headers: {"authorization": this.getAuth(),"id":this.getId()},
              body: formData
            });
          const data=await response.json();             
          return data;
        
    } 
    catch (error) 
    {
      //alert('internal error')
      return false;
    }
 },
 isNumber:function(n)
 {
    if(!isNaN(n))
        return 0;
    else
        return n;
 },
 inRange:function(x, min, max)
  {
      return ((x-min)*(x-max) <= 0);
  },
  clearVideoField:function()
  {  

        document.getElementsByName('mon_start')[0].value='';
        document.getElementsByName('mon_end')[0].value='';
        document.getElementsByName('mon_start2')[0].value='';
        document.getElementsByName('mon_end2')[0].value='';
        document.getElementsByName('mon_checked')[0].checked=false;

        document.getElementsByName('tue_start')[0].value='';
        document.getElementsByName('tue_end')[0].value='';
        document.getElementsByName('tue_start2')[0].value='';
        document.getElementsByName('tue_end2')[0].value='';
        document.getElementsByName('tue_checked')[0].checked=false;

        document.getElementsByName('wed_start')[0].value='';
        document.getElementsByName('wed_end')[0].value='';
        document.getElementsByName('wed_start2')[0].value='';
        document.getElementsByName('wed_end2')[0].value='';
        document.getElementsByName('wed_checked')[0].checked=false;

        document.getElementsByName('thus_start')[0].value='';
        document.getElementsByName('thus_end')[0].value='';
        document.getElementsByName('thus_start2')[0].value='';
        document.getElementsByName('thus_end2')[0].value='';
        document.getElementsByName('thus_checked')[0].checked=false;

        document.getElementsByName('fry_start')[0].value='';
        document.getElementsByName('fry_end')[0].value='';
        document.getElementsByName('fry_start2')[0].value='';
        document.getElementsByName('fry_end2')[0].value='';
        document.getElementsByName('fry_checked')[0].checked=false;

        document.getElementsByName('sat_start')[0].value='';
        document.getElementsByName('sat_end')[0].value='';
        document.getElementsByName('sat_start2')[0].value='';
        document.getElementsByName('sat_end2')[0].value='';
        document.getElementsByName('sat_checked')[0].checked=false;

        document.getElementsByName('sun_start')[0].value='';
        document.getElementsByName('sun_end')[0].value='';
        document.getElementsByName('sun_start2')[0].value='';
        document.getElementsByName('sun_end2')[0].value='';
        document.getElementsByName('sun_checked')[0].checked=false;
  },
    time_convert:function(num)
    { 
        const hours = Math.floor(num / 60);  
        let minutes="";
        minutes = (num % 60);
        //console.log(minutes.toString().length);
        if(minutes.toString().length === 2)
        minutes = (num % 60);
        else 
        minutes = "0"+ (num % 60);    
      return `${hours}:${minutes}`;  
    },
    Get_Config:async function(JSONdata)
    {     
      try {                      
        const API_url = process.env.REACT_APP_API_URL+ "admin/Get_Config";
        const response=await fetch(API_url,{
                  method: 'post',
                  headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
                  body: JSON.stringify(JSONdata)
                });
              const data=await response.json();             
              return data;
            
        } 
        catch (error) 
        {
          //alert('internal error')
          return false;
        }
   
    },
    tConvert24To12 : function(time)
    {
      // Check correct time format and split into components
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
      if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join (''); // return adjusted time or original string
    },
    getAuth:function()
    {
      const auth= localStorage.getItem('auth');    
      return auth;
    },
    getId:function()
    {
      const id= localStorage.getItem('JM_ID');    
      return id;
    },
    autoLogout:function()
    {
      const auth= localStorage.getItem('auth');   
//      console.log(auth)     
      if(auth.length ===0)
      {
          var arr=[]    
          let keepLogin=localStorage.getItem('keepLogin');
          localStorage.clear();
          localStorage.setItem('keepLogin', keepLogin);   
          localStorage.setItem('JM_ID', 0);
          localStorage.setItem('JM_Email', '');
          localStorage.setItem('userDetails', arr); 
          localStorage.setItem('directAccess', arr);  
          localStorage.setItem('JM_Profile_Pic', '');              
          localStorage.setItem('auth', '');   
          alert("Something went wrong, Please, re-login");   //your session has expired
          window.location.href='/';
      }
    }   ,

    payout:async function(JSONdata)
    {
      //amount
      try {                      
        const API_url = process.env.REACT_APP_API_URL+ "admin/payout";
        const response=await fetch(API_url,{
                  method: 'post',
                  headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},
                  body: JSON.stringify(JSONdata)
                });
              const data=await response.json();             
              return data;
            
        } 
        catch (error) 
        {
          //alert('internal error')
          return false;
        }
    },
    isConfirm : async function(id='')
    {
      confirmAlert({
        title: 'Confirm withdrawal',
        message: 'Are you sure you want to proceed the withdrawal?',
        buttons: [
            {
            label: 'Yes',
            onClick: () => console.log("ok") //this.postData(data,'payout')
            },
            {
            label: 'No',
            onClick: () => console.log("cancel")
            }
        ],
        closeOnEscape: false,
        closeOnClickOutside: false,
        });
    },
    decryptJson:function(flag)
    {
      var bytes  = CryptoJS.AES.decrypt(flag, process.env.REACT_APP_Encrypt_Key);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    },  
    encryptData:function(data)
    {
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_Encrypt_Key).toString();   
      return ciphertext;
    
    },
    DoSleep:async function(ms){
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    randomString:function(length=250,type='numeric')
    {
      return  cryptoRandomString({length: length, type: type})
    },    
    isValidEmail:function(email)
    {
      if (validator.isEmail(email)===false)
        return false;
      else 
        return true;     
    },
  
// for active users
  isActive:async function()
  {
  //amount
  try {                      
    const API_url = process.env.REACT_APP_API_URL+ "admin/isUserBlock";
    const response=await fetch(API_url,{
              method: 'post',
              headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()}           
            });
          const data1=await response.json();  
          var data;
          if(typeof data1.flag!=='undefined')   
              data=this.decryptJson(data1.flag) 
          if(data1.status===1)        //active
           {
              
              if(data.isValid===0)
              {
                var arr=[]    
                let keepLogin=localStorage.getItem('keepLogin');
                localStorage.clear();
                localStorage.setItem('keepLogin', keepLogin);   
                localStorage.setItem('JM_ID', 0);
                localStorage.setItem('JM_Email', '');
                localStorage.setItem('userDetails', arr); 
                localStorage.setItem('directAccess', arr);    
                localStorage.setItem('auth', '');   
                alert("Your session has expired. Please relogin");   
                window.location.href='/';      
                return false;
              }

           }
          else
            {
              if(typeof data!=='undefined')
              {
                if(data.isBlocked===1)
                {
                  var arr=[]    
                  let keepLogin=localStorage.getItem('keepLogin');
                  localStorage.clear();
                  localStorage.setItem('keepLogin', keepLogin);   
                  localStorage.setItem('JM_ID', 0);
                  localStorage.setItem('JM_Email', '');
                  localStorage.setItem('userDetails', arr); 
                  localStorage.setItem('directAccess', arr);    
                  localStorage.setItem('auth', '');   
                  alert("Your account has been blocked, contact admin");   
                  window.location.href='/';      
                  return false;
                }
                if(data.isDeleted===1)
                {
                  var arr=[]    
                  let keepLogin=localStorage.getItem('keepLogin');
                  localStorage.clear();
                  localStorage.setItem('keepLogin', keepLogin);   
                  localStorage.setItem('JM_ID', 0);
                  localStorage.setItem('JM_Email', '');
                  localStorage.setItem('userDetails', arr); 
                  localStorage.setItem('directAccess', arr);    
                  localStorage.setItem('auth', '');   
                  alert("Your account has been removed, contact admin");   
                  window.location.href='/';      
                  return false;
                }
               
              }
             
              var arr=[]    
              let keepLogin=localStorage.getItem('keepLogin');
              localStorage.clear();
              localStorage.setItem('keepLogin', keepLogin);   
              localStorage.setItem('JM_ID', 0);
              localStorage.setItem('JM_Email', '');
              localStorage.setItem('userDetails', arr); 
              localStorage.setItem('directAccess', arr);    
              localStorage.setItem('auth', '');   
              alert("Your session has expired. Please relogin");   
              window.location.href='/';      
              return false;
            }
            
        
    } 
    catch (error) 
    {
     // alert('internal error')
      return false;
    }
},
paidMonitizationMsg:function()
{
  
  const msg ="Congratulations! Your transaction was successful. Please check your email for more details.";
  return msg;
},
dynamicPriceMessage:function()
{
  const dynamicPriceMessage='You receive 90% minus payment charges + taxes of the transaction value. We take care of the rest.';
  return dynamicPriceMessage;
},
//Congratulations! Your request was successful. Please check your email for more details
freeMonitizationMsg:function()
{  
  const msg ="Congratulations! Your request was successful. Please check your email for more details.";
  return msg;
},
giftMonitizationMsg:function()
{  
  const msg ="Congratulations! Your request was successful. Please check your email for more details.";
  return msg;
},
SupportMonitizationMsg:function()
{  
  const msg ="Congratulations! Your request was successful. Please check your email for more details.";
  return msg;
},
chargesMessage:function()
{
  const chargesMessage="You receive 90% minus payment charges + taxes of the transaction value. We take care of the rest.";
  return chargesMessage;
  //API.chargesMessage();
},
consentLebel:function()
{
  const msg="Consent to providing your email to the Creator (optional)";
  return msg;
},
consentLebel_GiftDonation:function()
{
  const msg="Keep my name and details hidden from the Creator (optional)"; return msg;
},

serverMessage:async function()
{
    //amount
    try {                      
      const API_url = process.env.REACT_APP_API_URL+ "admin/sever_update";
      const response=await fetch(API_url,{
                method: 'post',
                headers: { "Content-Type": "application/json" ,"authorization": this.getAuth(),"id":this.getId()},               
              });
            const data=await response.json();             
            return data;
          
      } 
      catch (error) 
      {
        //alert('internal error')
        return false;
      }
},
//16-sep-2021
email_Already_inContest:async function(JSONdata)
{
  try {                      
    const API_url = process.env.REACT_APP_API_URL+ "admin/email_Already_inContest";
    const response=await fetch(API_url,{
              method: 'post',
              headers: { "Content-Type": "application/json"},      
              body: JSON.stringify(JSONdata)      
            });
          const data=await response.json();  
          if(data.status===1)           
             return true;
          else 
            return false;
        
    } 
    catch (error) 
    {
      //alert('internal error')
      return false;
    }
},

dataNotCaptured:async function(jsonData)
{
  
},
razorPayTax:function()
{
  const tax=1.65/100;
  return tax;
},
razorPayGST:function()
{
  const tax=18/100;
  return tax;
},
userAgentType:function()
{
  var agentType = isWebview(navigator.userAgent);
  return agentType;
       
},
removeSpecialChar:function(str)
{
  return str.replace(/[^a-zA-Z ]/g, " ");
},
minusResponse:function(data)
{ 
  if(data.status===-1)
  {
    var arr=[]    
    let keepLogin=localStorage.getItem('keepLogin');
    localStorage.clear();
    localStorage.setItem('keepLogin', keepLogin);   
    localStorage.setItem('JM_ID', 0);
    localStorage.setItem('JM_Email', '');
    localStorage.setItem('userDetails', arr); 
    localStorage.setItem('directAccess', arr);  
    localStorage.setItem('JM_Profile_Pic', '');              
    localStorage.setItem('auth', '');   
    alert(data.msg);   //your session has expired
    window.location.href='/';
    return false;
  }
},
GetProduct:function(id)
{
  const product={
      0:"Donation & Gifts",
      1:"Personalizes Video or Audio",
      2:"Unlock Content",
      3:"Sell Digital Goods",
      4:"Image Carousel",
      5:"Live Video Session",
      6:"Contests & Giveaways",     
      999:"Donation & Gifts"
  }
 // console.log(product[0]);
  return product[id]
},
GetProductIcon:function(id)
{
  const product={
      0:"images/request-icon_4.png",
      1:"images/request-icon_2.png",
      2:"images/request-icon_3.png",
      3:"images/request-icon_5.png",
      4:"Image Carousel",
      5:"images/request-icon_1.png",
      6:"images/request-icon_6.png",     
      999:"images/request-icon_4.png"
  }
 // console.log(product[0]);
  return product[id]
}

}
export default API;