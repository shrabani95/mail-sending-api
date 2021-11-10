import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Checkout from './Checkout';
import Checkout_videoSession from './Checkout_videoSession';
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
// import imageToBase64 from 'image-to-base64/browser';
// import Blur from 'react-blur';
import API  from "../services/API";
const dropdownList=[];
class Buy extends Component {
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
     
         }
        
    }
 
     ModalClose=()=>{       
        this.setState({openModel:false,show:false});
     
      }
      ModalOpen=()=>{
        this.setState({openModel:true,show:true});
        this.setState({checkedRequest:true,request:true,checkedPayDetails:false,PayDetails:false,checkedFanDetails:false,FanDetails:false,checkeddescript:false,descript:false});
        this.setState({openModel:true,show:true});
        //console.log(this.props.productList);
        //console.log(this.props.userDetails[0]);
        var JSONdata = {
          Stat_Type: 'P',
          Stat_ID: this.props.productList.DA_ID,
          JM_ID: this.props.productList.JM_ID   
        };
        let data = API.doClick(JSONdata);
        //console.log(data)
      }
      OpenModalVideo=async()=>{

        this.setState({ModalOpenVideo:true});   
        //console.log(this.props.productList);
        //console.log(this.props.userDetails[0]);
        var JSONdata = {
          Stat_Type: 'P',
          Stat_ID: this.props.productList.DA_ID,
          JM_ID: this.props.productList.JM_ID   
        };
        let data1 = API.doClick(JSONdata);

      
        var flagData={
          JM_ID: this.props.productList.JM_ID,
          ES_EM_ID: this.props.productList.DA_ID    
        }
        const flag=API.encryptData(flagData);

        var JSONData={
         flag:flag
        }
        
        var response=await API.Get_Config(JSONData);
        if(response.status===1)
            this.setState({
              data:response.data,slot_dropdown:0,dateString:'',dropdown:[]
            })
        //console.log(data)
      // var json = {
      //     "status": 0,
      //     "msg": "invalid api calling L2"
      //   }
      //   let token=API.encryptData(json);
      //   console.log(token)

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
    //  if(this.state.video_phone.length===0)
    //  {
    //    document.getElementById('msg_video').innerHTML='* Enter Phone Number';
    //     return false;
    //  }
    // console.log(this.state.dateString)
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
      AddLeads=()=>{
        var JSONdata = {
          DA_ID:this.props.productList.DA_ID,
          BM_Instruction:this.state.BM_Instruction,
          BM_Name:this.state.BM_Name,
          BM_Email:this.state.BM_Email,
          BM_Phone:this.state.BM_Phone,
          BM_Purchase_Amt:this.props.productList.DA_Price,
          Consent:this.state.Consent,
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
                  //console.log(data)
            });
        
      }
      
      AddLeadsVideo=()=>{
        var JSONdata = {
          DA_ID:this.props.productList.DA_ID,
          BM_Instruction:this.state.video_instruction,
          BM_Name:this.state.video_name,
          BM_Email:this.state.video_email,
          BM_Phone:this.state.video_phone,
          BM_Purchase_Amt:this.props.productList.DA_Price,
          Consent:this.state.Consent,
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
                  //console.log(data)
            });
        
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
   
          if(e.target.name==='slot_dropdown')
          {
            const {options, selectedIndex} = e.target;
            //console.log(options[selectedIndex].innerHTML);
            this.setState({
              session_timeing:options[selectedIndex].innerHTML,ES_ID:e.target.value
            })
          }
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
              
              //console.log(data)
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
      //console.log('this is:', this);
    }

   onChange=async (date, dateString)=> {
    
    //console.log(API.tConvert24To12('23:00'));
     // console.log(dateString)
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
          let cal_start_date='',cal_end_date='';
          for (let i = 0; i < this.state.data.length; i++)
           {
              let ESC_Day_ID = this.state.data[i].ESC_Day_ID;
              cal_start_date = this.state.data[i].cal_start_date;
              cal_end_date= this.state.data[i].cal_end_date;
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

     
           //console.log(cal_start_date)
      let date=new Date(cal_start_date);
    //  console.log(date)
      let customDate = date.toISOString().substr(0,10);;

      let dateEnd=new Date(cal_end_date);
//      console.log(dateEnd)
      let planDays=this.props.productList.planDays;

     // return current && current < moment(customDate, "YYYY-MM-DD");
     const start = moment(cal_start_date,'YYYY-MM-DD');  
     const end = moment(dateEnd,'YYYY-MM-DD');  
     // return  current < start || current > moment(dateEnd,'YYYY-MM-DD');
      return current < moment(customDate, "YYYY-MM-DD") || current >= moment(customDate).add(planDays, 'days')
      || (
          moment(current).day() !== mon_day  && moment(current).day() !== tue_day &&         
          moment(current).day() !== wed_day && moment(current).day() !== thu_day &&
          moment(current).day() !== fry_day && moment(current).day() !== sat_day &&
          moment(current).day() !== sun_day 
       )
        
    }



    render() 
    {
    
      const productList=this.props.productList;
      var arrCover=[];
      var cover_imageOrVideo='';var src="";
      
      arrCover=JSON.parse(productList.DA_Collection);
      //console.log(arrCover)
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
            { productList.DA_DA_ID!==5?
            <button className={"buy "+  this.props.font_family} data={this.props.productList} style={this.props.mystyleForHightight} onClick={this.ModalOpen}>Buy</button>
            : productList.DA_DA_ID===5?
            <button className={"buy "+  this.props.font_family} data={this.props.productList} style={this.props.mystyleForHightight} onClick={this.OpenModalVideo}>Book</button>
            :
             null
            }
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
                                        {
                                        this.state.request ?
                                        <Grow in={this.state.checkedRequest} >
                                            <div className="body-part" id="request">
                                                    <div className="icon">
                                                      {
                                                        this.props.productList.DA_Type==='NA' ?
                                                         <img src={"/images/play.gif"} />
                                                         :
                                                         this.props.productList.DA_Type==='image' && this.props.productList.DA_DA_ID===1?
                                                              <img src={cover_imageOrVideo} />                                                        
                                                          :
                                                            this.props.productList.DA_Type==='image' && this.props.productList.DA_DA_ID===2 ?
                                                            <img id="unlock" src={cover_imageOrVideo}/>
                                                          :   
                                                            this.props.productList.DA_Type==='image' && this.props.productList.DA_DA_ID===3?
                                                            <img id="unlock" src={cover_imageOrVideo}/>
                                                          :    
                                                          this.props.productList.DA_Type==='image' && this.props.productList.DA_DA_ID===5?
                                                          <img id="unlock" src={cover_imageOrVideo}/>
                                                          :                                                     
                                                            this.props.productList.DA_Type==='video' && this.props.productList.DA_DA_ID===1 ?
                                                            <video style={{width: '100%'}} src={cover_imageOrVideo}/>
                                                          :
                                                             this.props.productList.DA_Type==='video' && this.props.productList.DA_DA_ID===2 ?
                                                             <video  id="vip"  src={cover_imageOrVideo}/>                                                        
                                                          :
                                                             this.props.productList.DA_Type==='video' && this.props.productList.DA_DA_ID===3 ?
                                                             <video  id="vip"  src={cover_imageOrVideo}/>                                                        
                                                          :
                                                          this.props.productList.DA_Type==='video' && this.props.productList.DA_DA_ID===5 ?
                                                          <video  id="vip"  src={cover_imageOrVideo}/>                                                        
                                                          :
                                                            <img src={"/images/play.gif"} />
                                                      }
                                                        
                                                    </div>
                                                    <div className="text">
                                                        <h4>{this.props.productList.DA_Title}</h4>
                                                        <p>{this.props.productList.DA_Description}</p>
                                                        <br/>
                                                        <button class="btun" onClick={this.requestClick}>Request- 
                                                        {
                                                            this.props.productList.DA_INR_Doller==='INR' ?
                                                                  "Rs." + this.props.productList.DA_Price
                                                            :
                                                                  "$" + this.props.productList.DA_Price
                                                        }
                                                        
                                                        </button>
                                                    </div>
                                            </div>
                                        </Grow>
                                        :
                                        null                            
                                        }    
                                              
                                  {
                                    this.state.descript ?
                                        <Grow in={this.state.checkeddescript} >
                                            {/* <Paper elevation={4} className={useStyles.paper}> */}
                                          
                                            <div className="body-part" id="descrip">
                                               
                                                        <div className="form-box">
                                                              {
                                                                this.props.productList.DA_DA_ID===2 || this.props.productList.DA_DA_ID===3 ?
                                                                  <>
                                                                    <h4>Your Message</h4>
                                                                    <p>What would you like the Creator to know? {this.props.productList.DA_DA_ID===2 || this.props.productList.DA_DA_ID===0? '(Optional)' : null}</p>
                                                                    <textarea className="form-control area" name="BM_Instruction" value={this.state.BM_Instruction} onChange={this.handleChange} 
                                                                    placeholder="Hi! Thank you for the great content."/>
                                                                    <button class="btun" onClick={this.nextClick}>Next</button>
                                                                  </>
                                                                :
                                                                <>
                                                                    <h4>Your instructions</h4>
                                                                    <p>What would you like the Creator to know? {this.props.productList.DA_DA_ID===2 || this.props.productList.DA_DA_ID===0? '(Optional)' : null}</p>
                                                                    <textarea className="form-control area" name="BM_Instruction" value={this.state.BM_Instruction} onChange={this.handleChange} 
                                                                    placeholder="Hey! My friend loves your work. Could you please wish her a happy birthday? Thanks!"/>
                                                                    <button class="btun" onClick={this.nextClick}>Next</button>
                                                                </>
                                                              }
                                                                


                                                            </div>
                                                            <div className="dtl-box">
                                                                <p>Your request details:</p>    
                                                                <h4>{this.props.productList.DA_Title}</h4>
                                                                <br/>
                                                                <h3>
                                                                {
                                                                    this.props.productList.DA_INR_Doller==='INR' ?
                                                                          "Rs." + this.props.productList.DA_Price
                                                                    :
                                                                          "$" + this.props.productList.DA_Price
                                                                  }
                                                                  </h3>
                                                            </div>
                                                           <button className="back-btn" onClick={this.backClick}><KeyboardBackspaceIcon style={{fontSize:'30px'}} /></button> 
                                            </div>
                                        </Grow>
                                    :
                                    null
                                }
                                 {
                                    this.state.FanDetails ?
                                        <Grow in={this.state.checkedFanDetails} >
                                            {/* <Paper elevation={4} className={useStyles.paper}> */}
                                          
                                            <div className="body-part" id="FanDetails">
                                               
                                            <div className="form-box">
                                                  <h4>Your details</h4>
                                                  <p>Please leave some of your details for us to keep you updated with your request.</p>
                                                  <input type="text" name={"BM_Name"} value={this.state.BM_Name} onChange={this.handleChange}  placeholder="Your Name" className="form-control"/>
                                                  <input type="email" name={"BM_Email"} value={this.state.BM_Email} onChange={this.handleChange}  placeholder="Email Address" className="form-control"/>
                                                 <p>
                                                   <input type="checkbox" name="consent" onClick={this.doConsent}/> Consent to providing your details to the Creator
                                                 </p>
                                                
                                                  <input type="number" name={"BM_Phone"} value={this.state.BM_Phone} onChange={this.handleChange}  placeholder="Phone Number (optional)" className="form-control"/>
                                    
                                                  <input type="password" style={{display:'none'}}name={"BM_Password"} value={this.state.BM_Password} onChange={this.handleChange}  placeholder="Choose a password" className="form-control"/>
                                                  
                                                  <input type="hidden" name={"price"} value={this.props.productList.DA_Price} />
                                                  <button class="btun"  onClick={this.continueClick}>Next</button>
                                                </div>
                                                <div className="dtl-box">
                                                  <p>Your request details:</p>
                                                  <h4>{this.props.productList.DA_Title}</h4>
                                                  <h3>
                                                  {
                                                    this.props.productList.DA_INR_Doller==='INR' ?
                                                           "Rs." + this.props.productList.DA_Price
                                                    :
                                                          "$" + this.props.productList.DA_Price
                                                  }
                                                    </h3>
                                                </div>
                                                <button className="back-btn" onClick={this.backClick}><KeyboardBackspaceIcon style={{fontSize:'30px'}} /></button> 
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
                                                
                                                
                                                  <Checkout ref="checkout" BM_Type={'B'}  DA_INR_Doller={ this.props.productList.DA_INR_Doller} DA_Price={this.props.productList.DA_Price} 
                                                  name={this.state.BM_Name} email={this.state.BM_Email} DA_ID={this.props.productList.DA_ID}  phone={this.state.BM_Phone} state={this.state} userDetails={this.props.userDetails[0]} JM_ID={this.props.userDetails[0].JM_ID}/>
                                              
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
                                                <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
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
                                           
                                            style={{ border: 'none', width: '100%'}}
                                           
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
                              <label className="lab">Time Slot in IST :</label>     
                             
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

Buy.propTypes = {

};

export default Buy;