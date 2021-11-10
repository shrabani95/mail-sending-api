import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal'

import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Checkout_videoSession from './Checkout_videoSession';
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
// import imageToBase64 from 'image-to-base64/browser';
// import Blur from 'react-blur';
import API  from "../services/API";


class BuyContestGiveAways extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModel:false,
            base_url: process.env.REACT_APP_API_URL,
            root_url: process.env.REACT_APP_ROOT_URL,
          
            show:false,
            open:false,
            JM_ID:this.props.JM_ID,
            JM_Name:'',  
            SWM_Title:'',
            SWM_Url:'',
            SWM_Icon:'',
            LM_Who_Will_See:1,
            selectedFile: null,
            linkMaster:[],
           userDetails:[],
           socialWidget:[],
           title:'',
           msg:'',
           logo:'',
           SWM_Icon_Position:'bottom',
     
           Instagram:'https://www.instagram.com/',
           Facebook:'https://www.facebook.com/',
           YouTube:'https://www.youtube.com/',
           Twitter:'https://twitter.com/',
           Snapchat:'https://www.snapchat.com/',
           LinkedIn:'https://www.linkedin.com/',
           Twitch:'https://www.twitch.com/',
           Pinterest:'https://www.pinterest.com/',
           Spotify:'https://www.spotify.com/',
           category_links:[],
     
           checked:false,
           request:true,
           checkedRequest:true,
           descript:false,
           checkeddescript:false,
           FanDetails:false,
           checkedFanDetails:false,
           DA_ID:this.props.productList.DA_ID,
           DA_DA_ID:this.props.productList.DA_DA_ID,
           BM_Instruction:'',
           BM_Name:'',
           BM_Email:'',
           BM_Phone:'',
           BM_Password:'123456',
           BM_Purchase_Amt:this.props.productList.DA_Price,
           DA_Title:this.props.productList.DA_Title,
           mailText:this.props.productList.mailText,
           duration:this.props.productList.duration,
           planDays:this.props.productList.planDays,
           Consent:0,
           LM_ID:0,
           payment_id:'',


           showVideo:false,
           ModalOpenVideo:false,
           video_instruction:'',
           video_email:'',
           video_phone:'',
           video_name:'',
           btn_video_pay:true,
           data:[],
           dropdown:[],
           slot_dropdown:0,
           videoRequest:false,
           dateString:'',
           videoRequest1stTab:true,
           session_timeing:'',
           ES_ID:0,
           BM_ans_1:'',
           BM_ans_2:'',       
           BM_ans_3:'',     
           BM_ans_4:'',
           anser_file:null,
           file_size:0,
           messageBox:false,
           dynamic_price:this.props.productList.DA_Min_Amount,
         }
        
    }
 
     ModalClose=()=>{       
        this.setState({openModel:false,show:false});
     
      }
      ModalOpen=()=>{
        this.setState({openModel:true,show:true,
          messageBox:false,
          descript:true,
          checkeddescript:true,
          BM_Name:'',BM_Email:'',Q1:'',Q2:'',Q3:'',Q4:''
        });
        this.setState({checkedRequest:true,request:true,
          checkedPayDetails:false,PayDetails:false,
          checkedFanDetails:false,FanDetails:false,checkeddescript:false,descript:false});
        this.setState({openModel:true,show:true});

      
        ////console.log(this.props.productList);
      //  //console.log(this.props.userDetails[0]);
        var JSONdata = {
          Stat_Type: 'P',
          Stat_ID: this.props.productList.DA_ID,
          JM_ID: this.props.productList.JM_ID   
        };
        let data = API.doClick(JSONdata);
        ////console.log(data)
      }
      OpenModalVideo=async()=>{

        this.setState({ModalOpenVideo:true});   
        ////console.log(this.props.productList);
        ////console.log(this.props.userDetails[0]);
        var JSONdata = {
          Stat_Type: 'P',
          Stat_ID: this.props.productList.DA_ID,
          JM_ID: this.props.productList.JM_ID   
        };
        let data1 = API.doClick(JSONdata);

        var JSONData={
          JM_ID: this.props.productList.JM_ID,
          ES_EM_ID: this.props.productList.DA_ID    
        }
        var response=await API.Get_Config(JSONData);
        if(response.status===1)
            this.setState({
              data:response.data,slot_dropdown:0,dateString:'',dropdown:[]
            })
        ////console.log(data)
      }
    //26-jul-2021
    btn_video_next=(e)=>{
      document.getElementById('msg_video').innerHTML='';
     if(this.state.dateString.length===0)
     {
       document.getElementById('msg_video').innerHTML='* Select Date';
        return false;
     }
     if(parseInt(this.state.slot_dropdown)===0)
     {
       document.getElementById('msg_video').innerHTML='* Select Slot';
        return false;
     }
     if(this.state.video_name.length===0)
     {
       document.getElementById('msg_video').innerHTML='* Enter Name';
        return false;
     }
     if(this.state.video_email.length===0)
     {
       document.getElementById('msg_video').innerHTML='* Enter Email';
        return false;
     }
     if(this.state.video_phone.length===0)
     {
       document.getElementById('msg_video').innerHTML='* Enter Phone Number';
        return false;
     }
     //console.log(this.state.dateString)
     this.setState({
       videoRequest:true,videoRequest1stTab:false,
     })
     
     this.AddLeadsVideo();
    }
    btn_video_prev=(e)=>{
      this.setState({
        videoRequest:false,videoRequest1stTab:true,
      })
    }
     
      requestClick=(e)=>{
        this.setState({checkeddescript:true,checkedRequest:false,descript:true,request:false});
      }
      nextClick=(e)=>{
        if(this.state.DA_DA_ID===1)
        {
          if(this.state.BM_Instruction.length > 0)
             this.setState({checkedFanDetails:true,FanDetails:true,checkeddescript:false,descript:false,checkedRequest:false,request:false});
         else
           return false;
        }
        else{
       
         this.setState({checkedFanDetails:true,FanDetails:true,checkeddescript:false,descript:false,checkedRequest:false,request:false});
         this.setState({
          BM_Instruction:'NA'
        })
          return true;
        }      
      }
      continueClick=(e)=>{
        if(this.state.BM_Name.length > 0 && this.state.BM_Email.length > 0  && this.state.BM_Password.length > 0)
          {            
            this.AddLeads();
            this.setState({checkedPayDetails:true,PayDetails:true,checkedFanDetails:false,FanDetails:false,checkedRequest:false,request:false});
          } 
        else
          return false;
      }
      continueClickGift=(e)=>{
        if(this.state.BM_Name.length > 0 && this.state.BM_Email.length > 0)
          {            
            this.AddLeads();
            this.setState({checkedPayDetails:true,PayDetails:true,checkedFanDetails:false,FanDetails:false,checkedRequest:false,request:false});
            
          } 
        else
          return false;
      }
  
      
  
      backClick=(e)=>{
          if(this.state.descript)
          {
            this.setState({checkeddescript:false,checkedRequest:true,descript:false,request:true});
          }
         else if(this.state.FanDetails)
          {
            this.setState({checkedFanDetails:false,FanDetails:false,checkeddescript:true,descript:true});
          }
        else  if(this.state.PayDetails)
          {
            this.setState({checkedPayDetails:false,PayDetails:false,checkedFanDetails:true,FanDetails:true,
            
            });
          }
       
      }

      videoPayment=(e)=>{
       
     
      }
      handleChange=(e)=>{
         // let val=parseFloat(e.target.value);
          this.setState({[e.target.name]:e.target.value})
      }
      PayNow=e=>
      {
        var JSONdata = {
          DA_ID:this.props.productList.DA_ID,
          BM_Instruction:this.state.BM_Instruction,
          BM_Name:this.state.BM_Name,
          BM_Email:this.state.BM_Email,
          BM_Phone:this.state.BM_Phone,
          BM_Password:this.state.BM_Password,
          BM_Purchase_Amt:this.props.productList.DA_Price
        };
              const API_url = process.env.REACT_APP_API_URL + "admin/addBuyers";
            fetch(API_url,
              {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(JSONdata)
              })
            .then((response) => response.json())
            .then(data => {
              
              ////console.log(data)
            });
      }
      openSpinner=()=>{
        this.setState({
          isLoading:true,
          showLoading:true,
          checkedPayDetails:false,
          PayDetails:false,
          checkedFanDetails:true,
          FanDetails:false
        });
      }

      showMessage=()=>{
        this.refs.checkout.UpdateMobileView();
      }

      doConsent=(e)=>{
        if(e.target.checked)
          this.setState({
            Consent:1
          });

      }
     
    capture=()=>{
      var canvas = document.getElementById('canvas');
      var video = document.getElementById('video');
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }
    handleClick() {
      ////console.log('this is:', this);
    }

   onChange=async (date, dateString)=> {
    
    ////console.log(API.tConvert24To12('23:00'));
      //console.log(dateString)
      this.setState({
        dropdown:[],dateString
      })
      var JSONdata={
        ES_EM_ID:this.props.productList.DA_ID,
        date:dateString,
        Duration:this.props.productList.duration,
      }
      if(dateString.length > 8)
      {
        const response=await API.postData(JSONdata,'open_slots');
        if(response.status===1)
        {    

          if(response.data.length > 0)
          {
            let data=response.data;
            let dropdown=[];
            for (let i = 0; i < data.length; i++) 
            {
              let startSlotTime = data[i].startSlotTime.split(':');
              let start='';let end='';
              let start2='';let end2='';
              if(startSlotTime.length  > 0)
              {
                start=startSlotTime[0];
                if(startSlotTime[0].length===1)
                {
                  start="0"+startSlotTime[0];
                }
                end=startSlotTime[1];
                if(startSlotTime[1].length===1)
                {
                  end="0"+startSlotTime[1];
                }
              }
              let endSlotTime = data[i].endSlotTime.split(':');           
              if(endSlotTime.length > 0)
              {
                start2=endSlotTime[0];
                if(endSlotTime[0].length===1)
                {
                  start2="0"+endSlotTime[0];
                }
                end2=endSlotTime[1];
                if(endSlotTime[1].length===1)
                {
                  end2="0"+endSlotTime[1];
                }
              }

              let newSlotStartTime=API.tConvert24To12(start+":"+end);
              let newSlotEndTime=API.tConvert24To12(start2+":"+end2);

              data[i].startSlotTime=newSlotStartTime;
              data[i].endSlotTime=newSlotEndTime;
            }
          }

          this.setState({
            dropdown:response.data
          })
        }
      }
    }

   
     disabledDate=(current) =>
     {
      // Can not select days before today and today
      
      // return current < moment().startOf('day') || 
      // current > moment('2021-07-15').add(60, 'days').endOf('day') 
      // || moment(current).day() !== 0 
      // && moment(current).day() !== 3 
      // &&  moment(current).day() !== 6;
      //return moment(current).day() === 1 ;

       
          let mon_day=10;
          let tue_day=20;
          let wed_day=30;
          let thu_day=40;
          let fry_day=50;
          let sat_day=60;
          let sun_day=70;
          let cal_start_date='';
          for (let i = 0; i < this.state.data.length; i++)
           {
              let ESC_Day_ID = this.state.data[i].ESC_Day_ID;
              cal_start_date = this.state.data[i].cal_start_date;
              if(ESC_Day_ID===0)
                  sun_day=ESC_Day_ID;
              if(ESC_Day_ID===1)
                 mon_day=ESC_Day_ID;
              if(ESC_Day_ID===2)
                 tue_day=ESC_Day_ID;
              if(ESC_Day_ID===3)
                wed_day=ESC_Day_ID;
              if(ESC_Day_ID===4)
                  thu_day=ESC_Day_ID;
              if(ESC_Day_ID===5)
                  fry_day=ESC_Day_ID;
              if(ESC_Day_ID===6)
                  sat_day=ESC_Day_ID;
           }

 

      let date=new Date(cal_start_date);
      let customDate = date.toISOString().substr(0,10);;

   

      let planDays=this.props.productList.planDays;

     // return current && current < moment(customDate, "YYYY-MM-DD");
      return current < moment(customDate, "YYYY-MM-DD") || (current >= moment(customDate).add(planDays, 'days'))
      || (
          moment(current).day() !== mon_day 
          && moment(current).day() !== tue_day &&
          moment(current).day() !== wed_day && moment(current).day() !== thu_day &&
          moment(current).day() !== fry_day && moment(current).day() !== sat_day &&
          moment(current).day() !== sun_day 
       )
        
    }
    fileChangedHandler = (event) => {

            let file=event.target.files[0];
            document.getElementById("msg_contest").innerHTML="";
        if(typeof file==='undefined' || file===null)
        {

            return false;
        }
        let file_size = event.target.files[0].size;
    
        //or if you like to have name and type
        let file_name = event.target.files[0].name;
        let file_type = event.target.files[0].type;
        let maxSize=5000000;
        //console.log(file_size)
        if(file_size > maxSize)
        {
            document.getElementById("msg_contest").innerHTML="file size must be within 5mb";
            return false;
        }

        this.setState({ 
            anser_file: file,
            anser_createObjectURL: URL.createObjectURL(file),
            file_size         
        }); 
       
       
        //	5,000,000 Bytes
       //do whatever operation you want to do here
    };

    submitData=async (e)=>{
      document.getElementById("msg_contest").innerHTML="";
        if(this.state.BM_Name.length ===0 )
        {       
          document.getElementById("msg_contest").innerHTML="* Enter Name";     
          return false;
        } 
        if(this.state.BM_Email.length===0)
        {       
          document.getElementById("msg_contest").innerHTML="* Enter Email";     
          return false;
        } 
        if(API.isValidEmail(this.state.BM_Email)===false)
        {       
          document.getElementById("msg_contest").innerHTML="* Enter a valid email";     
          return false;
        } 
        if(this.props.productList.Q1.length > 0)
        {       
            if(this.state.BM_ans_1.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 1st question";  
                return false;
            }        
        } 
        if(this.props.productList.Q2.length > 0)
        {       
            if(this.state.BM_ans_2.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 2nd question";     
                return false;
            }        
        } 
        if(this.props.productList.Q3.length > 0)
        {       
            if(this.state.BM_ans_3.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 3rd question";     
                return false;
            }        
        } 
        if(this.props.productList.Q4.length > 0)
        {       
            if(this.state.BM_ans_4.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 4th question";     
                return false;
            }        
        } 
        if(this.state.anser_file!==null)
        {
            let file = document.getElementById("upImage").files[0];
            let file_size=0;
            if(file)
            {
                file_size=file.size;
            } 
         
            if(file_size > 5000000)
            {
                document.getElementById("msg_contest").innerHTML="file size must be within 5mb";
                return false;
            }
          }
     
          if(this.props.productList.File_Upload=== 1 && this.state.anser_file===null)
          {
               document.getElementById("msg_contest").innerHTML="* Select a file";
                return false;
          }
   
          var flagData_new = {
            amount:0,
            currency:this.props.productList.DA_INR_Doller,                 
            Product_Id:this.props.productList.DA_ID,
            Name:this.state.BM_Name,
            Email:this.state.BM_Email,
            DA_Price:this.props.productList.DA_Price,   
          };   
        
          const flag_new=API.encryptData(flagData_new);
          let  JSONdata_new = {
              flag: flag_new
            };
            
            // check this email id already exists for this contest or not if not then allow else not allowed
                                    
            if(await API.email_Already_inContest(JSONdata_new)===false)
            {
              document.getElementById("msg_contest").innerHTML="Use another email for this contest";
              return false;	
            }

        
        const formData = new FormData(); 
        let Api_url="";     
    



        
        Api_url=this.state.base_url+'admin/addFollowerContestFree';
                  
        // formData.append('DA_ID', this.props.productList.DA_ID) // for premium featured id
        // formData.append('JM_ID', this.props.userDetails[0].JM_ID )         
        // formData.append('CM_Name', this.state.BM_Name)  
        // formData.append('CM_Email', this.state.BM_Email) 
        // formData.append('CM_A1', this.state.BM_ans_1)    
        // formData.append('CM_A2', this.state.BM_ans_2)    
        // formData.append('CM_A3', this.state.BM_ans_3) 
        // formData.append('CM_A4', this.state.BM_ans_4)   

        // formData.append('sampleFile', this.state.anser_file);  
        // formData.append('JM_User_Profile_Url_plus_JM_ID', this.props.userDetails[0].JM_User_Profile_Url+"_"+ this.props.userDetails[0].JM_ID);  
        // formData.append('JM_Name',  this.props.userDetails[0].JM_Name) 
        // formData.append('JM_Email', this.props.userDetails[0].JM_Email) 
        // formData.append('JM_Phone', this.props.userDetails[0].JM_Phone) 
        // formData.append('JM_User_Profile_Url', this.props.userDetails[0].JM_User_Profile_Url) 
        // formData.append('dataTitle', this.props.productList.DA_Title) 
        var responseData=[];
       // formData.append('responseData', JSON.stringify(responseData))
        //formData.append('CM_Amount', 0) 
      
           
        formData.append('sampleFile', this.state.anser_file);  
          
              var flagData={
                DA_ID:this.props.productList.DA_ID,
                JM_ID:this.props.userDetails[0].JM_ID,
                CM_Name:this.state.BM_Name,
                CM_Email: this.state.BM_Email,
                CM_Phone: this.state.BM_Phone,
                Consent:this.state.Consent,
                CM_A1:this.state.BM_ans_1,
                CM_A2: this.state.BM_ans_2,
                CM_A3: this.state.BM_ans_3,
                CM_A4: this.state.BM_ans_4,            
                JM_User_Profile_Url_plus_JM_ID:this.props.userDetails[0].JM_User_Profile_Url+"_"+ this.props.userDetails[0].JM_ID,
                JM_Name: this.props.userDetails[0].JM_Name,
                JM_Email:this.props.userDetails[0].JM_Email,
                JM_Phone:this.props.userDetails[0].JM_Phone,
                JM_User_Profile_Url: this.props.userDetails[0].JM_User_Profile_Url,
                dataTitle: this.props.productList.DA_Title,
                CM_Amount:0,
                responseData: []
              }
              const flag=API.encryptData(flagData);
              let  JSONdata = {
                  flag: flag
                };
                formData.append('flag', flag) 


        let crsf_id=API.encryptData(this.props.userDetails[0].JM_ID);

            try{
                document.getElementById("sbmit").disabled = true;
                document.getElementById("sbmit").innerHTML='Please Wait...';
                fetch(Api_url, {
                    method: 'POST',
                    headers:{                         
                        "authorization": API.getAuth(),"id":API.getId(),
                        "crsf_id":crsf_id,
                        "token":crsf_id,
                        "p":this.state.payment_id,
                         "l":this.state.LM_ID
                        },
                    body: formData,
            
                    
                })
                    .then(response => response.json())
                    .then(async data => {
                    //console.log(data);
                    if (data.status > 0)
                    {
                       
                     
                       // document.getElementById("msg_contest").innerHTML='Giveaways submitted successfully';  
        
                        document.getElementById("msg_contest").innerHTML='';
                        document.getElementById("req_div").innerHTML='';
                        document.getElementById("req_div").style.display='none'
                       this.setState({
                        messageBox:true,                      
                         Request:false,
                           anser_file: null,
                            BM_Email:'',
                            BM_Name:'',
                            BM_ans_1:'',
                            BM_ans_2:'',
                            BM_ans_3:'',
                            BM_ans_4:'',   

                       })
                       this.WaitAndReload();
                    }
                    else 
                    {
                        document.getElementById("sbmit").disabled = false;
                        document.getElementById("sbmit").innerHTML='Submit';
                        document.getElementById("msg_contest").innerHTML='Internal error, try again later';  
                        return false;
                    }

                    })
                    .catch(error => 
                    { 
                        document.getElementById("sbmit").disabled = false;
                        document.getElementById("sbmit").innerHTML='Submit';
                        document.getElementById("msg_contest").innerHTML='Internal error, try again later';  
                        return false;
                    })
            }
            catch(e)
            {
                // this.setState({BtnName:'Save',disabledBtn:false});
                // this.props.showToast('Failed', 'Server Error');
            }
     

    }
    AddLeads= async (price=0)=>{
      var flagData = {
        DA_ID:this.props.productList.DA_ID,
        BM_Instruction:'',
        BM_Name:this.state.BM_Name,
        BM_Email:this.state.BM_Email,
        BM_Phone:this.state.BM_Phone,
        BM_Purchase_Amt:price,
        Consent:this.state.Consent,
      };


      
      const flag=API.encryptData(flagData);
      let  JSONdata = {
          flag: flag
        };




            const API_url = process.env.REACT_APP_API_URL + "admin/addLeads";
          fetch(API_url,
            {
              method: 'post',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(JSONdata)
            })
          .then((response) => response.json())
          .then(data1 =>
             {             
                if(data1.status===1)
                {
                  const data=API.decryptJson(data1.flag);
                  this.setState({
                    LM_ID:data.LM_ID
                  });
                }
                ////console.log(data)
          });
      
    }
    openCheckout=async e=>
    {
      var isFree=false;   
      document.getElementById("msg_contest").innerHTML='';
      if(this.state.BM_Name.length ===0 )
        {       
          document.getElementById("msg_contest").innerHTML="* Enter Name";     
          return false;
        } 
        if(this.state.BM_Email.length===0)
        {       
          document.getElementById("msg_contest").innerHTML="* Enter Email";     
          return false;
        } 
        if(API.isValidEmail(this.state.BM_Email)===false)
        {       
          document.getElementById("msg_contest").innerHTML="* Enter a valid email";     
          return false;
        } 


        if(this.state.BM_Phone.length === 0 )
        {           
      
          document.getElementById("msg_contest").innerHTML='* Enter phone number';
          return false
          
        } 
        if(this.state.BM_Phone.length !==10 )
        {           
    
          document.getElementById("msg_contest").innerHTML='* Enter 10 digits phone number';
          return false
          
        } 

        if(this.props.productList.Q1.length > 0)
        {       
            if(this.state.BM_ans_1.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 1st question";  
                return false;
            }        
        } 
        if(this.props.productList.Q2.length > 0)
        {       
            if(this.state.BM_ans_2.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 2nd question";     
                return false;
            }        
        } 
        if(this.props.productList.Q3.length > 0)
        {       
            if(this.state.BM_ans_3.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 3rd question";     
                return false;
            }        
        } 
        if(this.props.productList.Q4.length > 0)
        {       
            if(this.state.BM_ans_4.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 4th question";     
                return false;
            }        
        } 
        if(this.state.anser_file!==null)
        {
            let file = document.getElementById("upImage").files[0];
            let file_size=0;
            if(file)
            {
                file_size=file.size;
            } 
         
            if(file_size > 5000000)
            {
                document.getElementById("msg_contest").innerHTML="file size must be within 5mb";
                return false;
            }
          }

          if(this.state.anser_file!==null)
          {
              let file = document.getElementById("upImage").files[0];
              let file_size=0;
              if(file)
              {
                  file_size=file.size;
              } 
           
              if(file_size > 5000000)
              {
                  document.getElementById("msg_contest").innerHTML="file size must be within 5mb";
                  return false;
              }
            }
          //======
          if(this.props.productList.File_Upload=== 1 && this.state.anser_file===null)
          {

               document.getElementById("msg_contest").innerHTML="* Select a file";
                return false;
          }


          var DA_Price=0;   
          if(this.props.productList.DA_Allow_Cust_Pay === 1 && parseInt(this.props.productList.DA_Min_Amount) > 0) 
          {
      
            if((this.state.dynamic_price > 0) && this.state.dynamic_price < parseInt(this.props.productList.DA_Min_Amount))
            {        
              
              document.getElementById("msg_contest").innerHTML='*Minimum amount required is '+this.props.productList.DA_INR_Doller + ' '+this.props.productList.DA_Min_Amount;
              return false;            
            }
            else
            {
              if(this.props.productList.DA_Allow_Cust_Pay === 1 && this.state.dynamic_price > 0)
              {
                DA_Price=this.state.dynamic_price * 100; 
              }
              else
              {
                DA_Price=parseInt(this.props.productList.DA_Min_Amount) * 100; 
              }
            
            }
          }


        
             var leadPrice=parseFloat(DA_Price/100);
              await this.AddLeads(leadPrice);  
           

              const API_url = process.env.REACT_APP_API_URL+'admin/order';  
                var flagData = {
                  amount:DA_Price,
                  currency:this.props.productList.DA_INR_Doller,                 
                  Product_Id:this.props.productList.DA_ID,
                  Name:this.state.BM_Name,
                  Email:this.state.BM_Email,
                  DA_Price:this.props.productList.DA_Price,   
                };   
              
                const flag=API.encryptData(flagData);
                let  JSONdata = {
                    flag: flag
                  };
                  
                  
                // check this email id already exists for this contest or not if not then allow else not allowed
                      
                if(await API.email_Already_inContest(JSONdata)===false)
                {
                  document.getElementById("msg_contest").innerHTML="Use another email for this contest";
                  return false;	
                }




                const response=await fetch(API_url,{
                      method: 'post',
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(JSONdata)
                    });
                    
                   
                  const data1=await response.json();              
                  const data=API.decryptJson(data1.flag)

                  let options = {
                    "key": process.env.REACT_APP_RAZOR_PAY_TEST_KEY,
                    "amount":DA_Price, // 2000 paise = INR 20, amount in paisa
                    "name": "Expy",
                    "description": "Purchase Description",
                    "image": "/favicon.png",
                    "order_id": data.id,
                    "method": 'wallet',
                    "wallet": 'paypal',
                    "handler":  response => 
                    {        
                      ////console.log(response.razorpay_payment_id);
                     
                        this.CapturePayment(response.razorpay_payment_id,response,DA_Price);
                    },
                    "prefill": {
                      "name": this.state.BM_Name,
                      "email": this.state.BM_Email,
                      "contact":''
                    },
                    "notes": {
                      "address": ""
                    },
                    "theme": {
                      "color": "#fa217c"
                    }
                  };
  
                  let rzp = new window.Razorpay(options);
                  rzp.open();
      
    }
    openCheckoutNormal=async e=>{
      var isFree=false;   
      document.getElementById("msg_contest").innerHTML='';
      if(this.state.BM_Name.length ===0 )
        {       
          document.getElementById("msg_contest").innerHTML="* Enter Name";     
          return false;
        } 
        if(this.state.BM_Email.length===0)
        {       
          document.getElementById("msg_contest").innerHTML="* Enter Email";     
          return false;
        } 
        if(API.isValidEmail(this.state.BM_Email)===false)
        {       
          document.getElementById("msg_contest").innerHTML="* Enter a valid email";     
          return false;
        } 


        if(this.state.BM_Phone.length === 0 )
        {           
      
          document.getElementById("msg_contest").innerHTML='* Enter phone number';
          return false
          
        } 
        if(this.state.BM_Phone.length !==10 )
        {           
    
          document.getElementById("msg_contest").innerHTML='* Enter 10 digits phone number';
          return false
          
        } 







        if(this.props.productList.Q1.length > 0)
        {       
            if(this.state.BM_ans_1.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 1st question";  
                return false;
            }        
        } 
        if(this.props.productList.Q2.length > 0)
        {       
            if(this.state.BM_ans_2.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 2nd question";     
                return false;
            }        
        } 
        if(this.props.productList.Q3.length > 0)
        {       
            if(this.state.BM_ans_3.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 3rd question";     
                return false;
            }        
        } 
        if(this.props.productList.Q4.length > 0)
        {       
            if(this.state.BM_ans_4.length === 0)
            {
                document.getElementById("msg_contest").innerHTML="* Answer 4th question";     
                return false;
            }        
        } 
        if(this.state.anser_file!==null)
        {
            let file = document.getElementById("upImage").files[0];
            let file_size=0;
            if(file)
            {
                file_size=file.size;
            } 
         
            if(file_size > 5000000)
            {
                document.getElementById("msg_contest").innerHTML="file size must be within 5mb";
                return false;
            }
          }
          if(this.state.anser_file!==null)
          {
              let file = document.getElementById("upImage").files[0];
              let file_size=0;
              if(file)
              {
                  file_size=file.size;
              } 
           
              if(file_size > 5000000)
              {
                  document.getElementById("msg_contest").innerHTML="file size must be within 5mb";
                  return false;
              }
            }
          //======
          
          if(this.props.productList.File_Upload=== 1 && this.state.anser_file===null)
          {

               document.getElementById("msg_contest").innerHTML="* Select a file";
                return false;
          }
   


             var DA_Price=parseFloat(this.props.productList.DA_Price * 100);
             var leadPrice=parseFloat(this.props.productList.DA_Price);
              await this.AddLeads(leadPrice);  

              const API_url = process.env.REACT_APP_API_URL+'admin/order';  
                var flagData = {
                  amount:DA_Price,
                  currency:this.props.productList.DA_INR_Doller,                 
                  Product_Id:this.props.productList.DA_ID,
                  Name:this.state.BM_Name,
                  Email:this.state.BM_Email,
                  DA_Price:this.props.productList.DA_Price,   
                };                 

                const flag=API.encryptData(flagData);
                let  JSONdata = {
                    flag: flag
                  };

                  // check this email id already exists for this contest or not if not then allow else not allowed
                                      
                  if(await API.email_Already_inContest(JSONdata)===false)
                  {
                    document.getElementById("msg_contest").innerHTML="Use another email for this contest";
                    return false;	
                  }





                const response=await fetch(API_url,{
                      method: 'post',
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(JSONdata)
                    });
                    
               
                  const data1=await response.json();
                  const data=API.decryptJson(data1.flag)

                  let options = {
                    "key": process.env.REACT_APP_RAZOR_PAY_TEST_KEY,
                    "amount":DA_Price, // 2000 paise = INR 20, amount in paisa
                    "name": "Expy",
                    "description": "Purchase Description",
                    "image": "/favicon.png",
                    "order_id": data.id,
                    "method": 'wallet',
                    "wallet": 'paypal',
                    "handler":  response => 
                    {        
                      ////console.log(response.razorpay_payment_id);
                     
                        this.CapturePayment(response.razorpay_payment_id,response,DA_Price);
                    },
                    "prefill": {
                      "name": this.state.BM_Name,
                      "email": this.state.BM_Email,
                      "contact":''
                    },
                    "notes": {
                      "address": "Hello World"
                    },
                    "theme": {
                      "color": "#fa217c"
                    }
                  };
  
                  let rzp = new window.Razorpay(options);
                  rzp.open();
    }
    WaitAndReload=()=>
    {
      setTimeout(function() {
        window.location.reload();
       }, 5000);  
    }
  
    async CapturePayment(razorpay_payment_id,responseData,DA_Price)
    {
     
              const paymentId = razorpay_payment_id;         
              
              const formData = new FormData(); 
              let Api_url="";     
          
              Api_url=this.state.base_url+'admin/addFollowerContest';
                       
     
             
              // formData.append('DA_ID', this.props.productList.DA_ID) // for premium featured id
              // formData.append('JM_ID', this.props.userDetails[0].JM_ID )         
              // formData.append('CM_Name', this.state.BM_Name)  
              // formData.append('CM_Email', this.state.BM_Email) 
              // formData.append('CM_A1', this.state.BM_ans_1)    
              // formData.append('CM_A2', this.state.BM_ans_2)    
              // formData.append('CM_A3', this.state.BM_ans_3) 
              // formData.append('CM_A4', this.state.BM_ans_4)         
              formData.append('sampleFile', this.state.anser_file);  

              // formData.append('JM_User_Profile_Url_plus_JM_ID', this.props.userDetails[0].JM_User_Profile_Url+"_"+ this.props.userDetails[0].JM_ID);  
              // formData.append('JM_Name',  this.props.userDetails[0].JM_Name) 
              // formData.append('JM_Email', this.props.userDetails[0].JM_Email) 
              // formData.append('JM_Phone', this.props.userDetails[0].JM_Phone) 
              // formData.append('JM_User_Profile_Url', this.props.userDetails[0].JM_User_Profile_Url) 
              // formData.append('dataTitle', this.props.productList.DA_Title)            
              // formData.append('responseData', JSON.stringify(responseData))
              let CM_Amount=DA_Price/100;
             // formData.append('CM_Amount', CM_Amount) 

          
              var flagData={
                DA_ID:this.props.productList.DA_ID,
                JM_ID:this.props.userDetails[0].JM_ID,
                CM_Name:this.state.BM_Name,
                CM_Email: this.state.BM_Email,
                CM_Phone: this.state.BM_Phone,
                Consent:this.state.Consent,
                CM_A1:this.state.BM_ans_1,
                CM_A2: this.state.BM_ans_2,
                CM_A3: this.state.BM_ans_3,
                CM_A4: this.state.BM_ans_4,            
                JM_User_Profile_Url_plus_JM_ID:this.props.userDetails[0].JM_User_Profile_Url+"_"+ this.props.userDetails[0].JM_ID,
                JM_Name: this.props.userDetails[0].JM_Name,
                JM_Email:this.props.userDetails[0].JM_Email,
                JM_Phone:this.props.userDetails[0].JM_Phone,
                JM_User_Profile_Url: this.props.userDetails[0].JM_User_Profile_Url,
                dataTitle: this.props.productList.DA_Title,
                CM_Amount:CM_Amount,
                responseData: JSON.stringify(responseData),
                Payment_Id:paymentId,
                LM_ID:this.state.LM_ID
              }
              const flag=API.encryptData(flagData);
              let  JSONdata = {
                  flag: flag
                };
                formData.append('flag', flag) 

              let crsf_id=API.encryptData(this.props.userDetails[0].JM_ID);
      
                  try{
                      document.getElementById("sbmit").disabled = true;
                      document.getElementById("sbmit").innerHTML='Please Wait...';
                      fetch(Api_url, {
                          method: 'POST',
                          headers:{                         
                              "authorization": API.getAuth(),"id":API.getId(),
                              "crsf_id":crsf_id,
                              "token":crsf_id,
                              "p":'',
                               "l":0
                              },
                          body: formData,
                  
                          
                      })
                          .then(response => response.json())
                          .then(async data => {
                        //  //console.log(data);
                          if (data.status > 0)
                          {
                             
                           
                             // document.getElementById("msg_contest").innerHTML='Giveaways submitted successfully';  
                          
                              document.getElementById("msg_contest").innerHTML='';
                              document.getElementById("req_div").style.display='none'
                             this.setState({
                                  messageBox:true,
                                  request:false,                        
                                  anser_file: null,
                                  BM_Email:'',
                                  BM_Name:'',
                                  BM_ans_1:'',
                                  BM_ans_2:'',
                                  BM_ans_3:'',
                                  BM_ans_4:'',   
      
                             })
                            //  document.getElementById("sbmit").disabled = false;
                            //  document.getElementById("sbmit").innerHTML='Submit';
                      
                        
                            this.WaitAndReload();
                          }
                          else 
                          {
                              document.getElementById("sbmit").disabled = false;
                              document.getElementById("sbmit").innerHTML='Submit';
                              document.getElementById("msg_contest").innerHTML='Internal error - Please contact Expy support';  
                             

                              var JSONdata={
                                DA_ID:this.props.productList.DA_ID,
                                JM_ID:this.props.userDetails[0].JM_ID,
                                CM_Name:this.state.BM_Name,
                                CM_Email: this.state.BM_Email,
                                CM_A1:this.state.BM_ans_1,
                                CM_A2:this.state.BM_ans_2,
                                CM_A3:this.state.BM_ans_3,
                                CM_A4: this.state.BM_ans_4,
                                paymentId:paymentId,
                                responseData:responseData
                              }
                              const token=API.encryptData(paymentId)
                              const url = process.env.REACT_APP_API_URL+'admin/dataUncaptured';
                              const response1= await fetch(url,{
                                method: 'post',
                                headers: { "Content-Type": "application/json" ,"token":token},
                                body: JSON.stringify(JSONdata)
                               });
                               const resp=await response1.json();                             
                              return false;
                          }
      
                          })
                          .catch(error => 
                          { 
                              // document.getElementById("sbmit").disabled = false;
                              // document.getElementById("sbmit").innerHTML='Submit';
                              document.getElementById("msg_contest").innerHTML='Internal error - Please contact Expy support';  
                              return false;
                          })
  
            
                      } 
                      catch (err) 
                      {
                        ////console.log(err);
                      }
    }
    handleDynamicPrice=(e)=>{
      let val=parseInt(e.target.value);
      //console.log(isNaN(val))
     if(isNaN(val)===true)
        val=0;

      this.setState({[e.target.name]:val})
    }
    WaitAndReload=()=>
    {
      setTimeout(function() {
        window.location.reload();
       }, 3000);  
    }
    render() 
    {
    
      const productList=this.props.productList;
      var arrCover=[];
      var cover_imageOrVideo='';var src="";
      
      arrCover=JSON.parse(productList.DA_Collection);
      ////console.log(arrCover)
      src=process.env.REACT_APP_UPLOAD_URL+"Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+arrCover[0];
      if(productList.DA_DA_ID!==2)
      {
        cover_imageOrVideo=process.env.REACT_APP_UPLOAD_URL+"Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+arrCover[0];
      }
      if(productList.DA_DA_ID===2 || productList.DA_DA_ID===3)
      {
        if(arrCover[0].endsWith('.mp4')===false && productList.DA_Type==='image')
           cover_imageOrVideo=process.env.REACT_APP_ADM_URL+"cover/"+arrCover[0];
          else
          {
            cover_imageOrVideo=process.env.REACT_APP_UPLOAD_URL+"Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+arrCover[0];
          }
      }
         
        const useStyles = makeStyles((theme) => ({
            root: {
              height: 180,
            },
            container: {
              display: 'flex',
            },
            paper: {
              margin: theme.spacing(1),
            },
            svg: {
              width: 100,
              height: 100,
            },
            polygon: {
              fill: theme.palette.common.white,
              stroke: theme.palette.divider,
              strokeWidth: 1,
            },
          }));

           
          let createDropdown = this.state.dropdown.map(item => (
           <option value={item.ES_ID}>{item.startSlotTime+"-"+item.endSlotTime}</option>
          ));

        return (
           <>
            {/* { productList.DA_DA_ID!==5?
            <button className={"buy "+  this.props.font_family} data={this.props.productList} style={this.props.mystyleForHightight} onClick={this.ModalOpen}>Buy</button>
            : productList.DA_DA_ID===5?
            <button className={"buy "+  this.props.font_family} data={this.props.productList} style={this.props.mystyleForHightight} onClick={this.OpenModalVideo}>Buy</button>
            :
             null
            } */}
             <button className={"buy "+  this.props.font_family} data={this.props.productList} style={this.props.mystyleForHightight} onClick={this.ModalOpen}>Join</button>
            <Modal
            show={this.state.openModel}
            onHide={this.ModalClose}
            backdrop="static"
            keyboard={false}
            centered
    
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <p className="addnew-title">{this.props.productList.DA_Title}</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    
                         <div className="request-sec">                     
                            <div className="request-box">   
                                <div id="req_div">
                                        {
                                        this.state.request ?
                                        <Grow in={this.state.checkedRequest} >
                                            <div className="body-part" id="request">
                                              
                                                    <div className="icon">
                                                      {
                                                        this.props.productList.DA_Type==='NA' ?
                                                         <img src={"/images/play.gif"} alt=""/>
                                                         :                                                                                                             
                                                          this.props.productList.DA_Type==='image' && this.props.productList.DA_DA_ID===6?
                                                          <img  src={cover_imageOrVideo} alt="" />
                                                          :     
                                                          this.props.productList.DA_Type==='video' && this.props.productList.DA_DA_ID===6 ?
                                                          <video  loop autoplay="autoplay" muted playsinline="true" style={{width:'100%'}}> 
                                                              <source id="vip"  src={cover_imageOrVideo} type="video/mp4"/>
                                                          </video>
                                                        //   <video  id=""  src={cover_imageOrVideo} controls autoplay muted/>           
                                                          :
                                                          <img src={"/images/play.gif"} alt=""/>
                                                      }
                                                
                                                    </div>
                                                    <label>{this.props.productList.DA_Description}</label> 
                                                       
                                  
                                               
                                               <div className="form-box">

                                                                           
                                                               <input type="text" name={"BM_Name"} value={this.state.BM_Name} onChange={this.handleChange}  placeholder="Your Name" className="form-control"/>
                                                                <input type="email" name={"BM_Email"} value={this.state.BM_Email} onChange={this.handleChange}  placeholder="Email Address" className="form-control"/>
                                                                <p style={{ marginBottom:'10px',textAlign:'left'}}>
                                                                   <input type="checkbox" name="consent" onClick={this.doConsent}/> {API.consentLebel()}
                                                               </p>

                                                               <input type="number" name={"BM_Phone"} value={this.state.BM_Phone} onChange={this.handleChange}  placeholder="Phone Number" className="form-control"/>
                                                              
                                                               <div className="row contestAns">
                                                                 <div className="col-md-12">
                                                           
                                                                <p>Enter giveaway info</p>
                                                               {
                                                                   this.props.productList.Q1.length > 0 ?
                                                                   <>
                                                                   <label>{this.props.productList.Q1}</label>
                                                                   <input type="text" name={"BM_ans_1"} value={this.state.BM_ans_1} onChange={this.handleChange}  placeholder="Enter Answer" className="form-control"/>
                                                                   </>
                                                                   :
                                                                   null
                                                               }
                                                               
                                                               {
                                                                   this.props.productList.Q2.length > 0 ?
                                                                    <>
                                                                   <label>{this.props.productList.Q2}</label>
                                                                   <input type="text" name={"BM_ans_2"} value={this.state.BM_ans_2} onChange={this.handleChange}  placeholder="Enter Answer" className="form-control"/>
                                                                   </>
                                                                   :
                                                                   null
                                                               }
                                                               
                                                               {
                                                                   this.props.productList.Q3.length > 0 ?
                                                                   <>
                                                                    <label>{this.props.productList.Q3}</label>
                                                                    <input type="text" name={"BM_ans_3"} value={this.state.BM_ans_3} onChange={this.handleChange} placeholder="Enter Answer" className="form-control"/>
                                                                  </>
                                                                   :
                                                                   null
                                                               }
                                                               
                                                               {
                                                                   this.props.productList.Q4.length > 0 ?
                                                                   <>
                                                                    <label>{this.props.productList.Q4}</label>
                                                                    <input type="text" name={"BM_ans_4"} value={this.state.BM_ans_4} onChange={this.handleChange}  placeholder="Enter Answer" className="form-control"/>
                                                                   </>
                                                                   :
                                                                   null
                                                               }
                                                                {
                                                                   this.props.productList.File_Upload=== 1 ?
                                                                    <>
                                                                      <label>{this.props.productList.File_upload_text}</label>
                                                                       <label className="contestFileuplaod" for="upImage" style={{marginBottom: '20px'}}>                                                                              
                                                                       Upload a file (max 5mb)
                                                                         <input type="file" id="upImage" style={{ display: "none" }} onChange={this.fileChangedHandler}/>
                                                                     </label>
                                                                   
                                                                     </>
                                                                   :                                                                  
                                                                     null
                                                                 }


                                                        {
                                                         this.props.productList.DA_Allow_Cust_Pay===1   &&  this.props.productList.DA_Min_Amount > 0?
                                                          <>
                                                          <p>Pay what you want</p>
                                                           <input type="text" name={"dynamic_price"} 
                                                           onChange={this.handleDynamicPrice} 
                                                           placeholder={this.props.productList.DA_Min_Amount + "+"}  className="form-control"
                                                           onKeyPress={(event) => {
                                                             if (!/[0-9]/.test(event.key)) {
                                                               event.preventDefault();
                                                             }
                                                           }}
                                                           onPaste={(e)=>{
                                                            e.preventDefault()
                                                            return false;
                                                          }} onCopy={(e)=>{
                                                            e.preventDefault()
                                                            return false;
                                                          }}
                                                           />
                                                         
                                                                   <button class="btun"  onClick={this.openCheckout} id="sbmit">Submit                                                                   
                                                                     </button>


                                                           </>
                                                           : 
                                                           this.props.productList.DA_Allow_Cust_Pay===0   &&  this.props.productList.DA_Price > 0 ?    
                                                                <button class="btun"  onClick={this.openCheckoutNormal} id="sbmit">  Submit {"Rs." + this.props.productList.DA_Price }  </button>
                                                           :
                                                            <button class="btun"  onClick={this.submitData} id="sbmit">Submit  </button>


                                                          }




                                                     <p id="msg_contest" style={{color:'red'}}></p>   

                                                           </div>
                                                     </div>
                                                             
                                                   </div>


                                                   
                                                  {/* <button className="back-btn" onClick={this.backClick}><KeyboardBackspaceIcon style={{fontSize:'30px'}} /></button>  */}
                                             </div>
                                        </Grow>
                                        :
                                        null                            
                                        }    
                                              
                                 </div>
                                 {
                                    this.state.messageBox ?
                                        <Grow in={true} >
                                            {/* <Paper elevation={4} className={useStyles.paper}> */}
                                          
                                            <div className="body-part" id="messageBox">
                                               
                                            <i class="far fa-check-circle" style={{fontSsize: '25px',color: 'green',marginRight:'5px'}}></i>
                                             <span style={{fontSsize: '19px',color: 'green',textAlign:'center'}}>
                                             You have successfully participated in {this.props.productList.DA_Title}
                                               
                                               </span>                                                 
                                              
                                                
                                            </div>
                                        </Grow>
                                    :
                                    null
                                }

                                {
                                    this.state.PayDetails ?
                                        <Grow in={this.state.checkedPayDetails} >
                                            {/* <Paper elevation={4} className={useStyles.paper}> */}
                                          
                                            <div className="body-part" id="PayDetails">
                                               
                                                  <div className="form-box" id="payment">
                                                  <h4>Secure Payment</h4>
                                                  {/* <p>Please enter your payment details to complete your request.</p>
                                                  <input type="text" placeholder="Card Number" className="form-control"/> */}
                                                
                                                
                                                 
                                                  {/* cashfree */}
                                                  {/* <PaymentCashFree ref="checkout" BM_Type={'B'}  DA_INR_Doller={ this.props.productList.DA_INR_Doller} DA_Price={this.props.productList.DA_Price} 
                                                  name={this.state.BM_Name} email={this.state.BM_Email} DA_ID={this.props.productList.DA_ID}  phone={this.state.BM_Phone} state={this.state} userDetails={this.props.userDetails[0]} JM_ID={this.props.userDetails[0].JM_ID}/>
                                               */}
                                              
                                                  {/* <button class="btun" onClick={this.PayNow}>Pay 
                                                  {
                                                    this.props.productList.DA_INR_Doller==='INR' ?
                                                           " Rs." + this.props.productList.DA_Price
                                                    :
                                                          " $" + this.props.productList.DA_Price
                                                  }
                                                  
                                                  </button> */}
                                                  {/* <p>We currently accept:</p> */}
                                                  {/* <ul>
                                                    <li><img src={"images/pay-1.png"} /></li>
                                                    <li><img src={"images/pay-2.png"} /></li>
                                                    <li><img src={"images/pay-3.png"} /></li>
                                                    <li><img src={"images/pay-4.png"} /></li>
                                                  </ul> */}
                                                </div>
                                              
                                                <button className="back-btn" onClick={this.backClick}><KeyboardBackspaceIcon style={{fontSize:'30px'}} /></button> 
                                            </div>
                                        </Grow>
                                    :
                                    null
                                }

                                  {
                                        this.state.isLoading ?
                                        <Grow in={this.state.showLoading} >
                                            <div className="body-part" id="request">
                                                <div class="spinner-grow" style={{width: '3rem', height: '3rem'}} role="status">
                                                    <span class="sr-only">Please Wait...</span>
                                                </div>
                                            </div>
                                        </Grow>
                                        :
                                        null                            
                                        }    
                                      <div id="main_div">
                                          {
                                            this.state.showVideo ?
                                            <>
                                            <video id="video" src={cover_imageOrVideo} type="video/mp4" style={{display:'none'}}></video>
                                            <button id="mybtn" onClick={this.handleClick}>Capture</button><br/>
                                              
                                            </>                                   
                                            :
                                            null
                                          }
                                      </div>
                                     
                                        

                            </div>
                        </div>
            </Modal.Body>
    
          </Modal>
                       

  {/* edit send me a gift option */}
  <Modal
              size="md"
              show={this.state.ModalOpenVideo}
              onHide={() => this.setState({ ModalOpenVideo: false })}
              aria-labelledby="example-modal-sizes-title-sm"
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal" style={{ fontSize: '15px' }}>
                {this.props.productList.DA_Title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="request-sec">
               <div className="request-box">
                    <div className="body-part">
               
                      <div className="form-box" style={{display:this.state.videoRequest1stTab===true ?'block':'none'}}>    
                          <p>{this.props.productList.DA_Description}</p>                        
                         <div className="textLabel">
                           <label className="lab">Duration:</label> <span>{this.props.productList.duration+ 'mins'}</span>
                         </div>
                         <div className="row">
                           <div className="col-md-6">
                             <label className="lab">Date:</label>
                             <DatePicker name="datepicker" disabledDate={this.disabledDate} onChange={this.onChange} />
                           </div>
                           <div className="col-md-6">
                              <label className="lab">Time Slot:</label>
                              <select className="form-control" name="slot_dropdown" value={parseInt(this.state.slot_dropdown)} onChange={this.handleChange}>
                              <option value={0}>Select Slot</option>
                               {createDropdown}
                              </select>
                           </div>
                         </div>
                 
                           <h4>Heads up</h4>                                
                            <p>Give {this.props.productList.JM_Name} a short intro note about the session </p>
                            <textarea className="form-control area" name="video_instruction" 
                              value={this.state.video_instruction} onChange={this.handleChange} 
                              placeholder="I'd like to speak about…"/>                          
                            
                             <input type="text" placeholder="Enter Name" name="video_name" value={this.state.video_name} className="form-control" onChange={this.handleChange} />
                             <input type="email" placeholder="Email Address" name="video_email" value={this.state.video_email} className="form-control" onChange={this.handleChange} />
                             <input type="number" placeholder="Enter Phone" name="video_phone" value={this.state.video_phone} className="form-control" onChange={this.handleChange} />
                              
                              <button class="btun" onClick={this.btn_video_next}> Next </button>                                                        
                              <span id="msg_video" style={{color:'red'}}></span>
                          <br/>
                      </div>
                      {                   
                        this.state.videoRequest===true?
                           <div className="form-box">     
                                <p>{this.props.productList.DA_Description}</p>                        
                                <div className="textLabel">
                                  <label className="lab">Duration:</label> <span>{this.props.productList.duration +"mins"}</span>
                                </div>       
                                  <Grow in={this.state.videoRequest} >
                                      <div id="Checkout_videoSession">                                      
                                          <Checkout_videoSession ref="checkout" BM_Type={'B'}  DA_INR_Doller={ this.props.productList.DA_INR_Doller} DA_Price={this.props.productList.DA_Price} 
                                          name={this.state.video_name} email={this.state.video_email} DA_ID={this.props.productList.DA_ID}  
                                          phone={this.state.video_phone} state={this.state} 
                                          userDetails={this.props.userDetails[0]}   
                                          session_date={this.state.dateString}
                                          session_timeing={this.state.session_timeing}                                     
                                          JM_ID={this.props.userDetails[0].JM_ID} ES_ID={this.state.ES_ID}/>

                                            <button className="back-btn" onClick={this.btn_video_prev}><KeyboardBackspaceIcon style={{fontSize:'30px'}} /></button> 
                                            <span id="msg_video_pay" style={{color:'red'}}></span>
                                     
                                      </div>
                                    
                                  </Grow>
                              
                            </div>
                            :
                            null
                          }

                    </div>
                       
                  </div>
              </div>


              </Modal.Body>
              <Modal.Footer>               
                
              
              </Modal.Footer>
            </Modal>

    
           </>             
                       
                 
          
        );
    }
}

BuyContestGiveAways.propTypes = {

};

export default BuyContestGiveAways;