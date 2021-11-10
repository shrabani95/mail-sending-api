import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Nav, Navbar, Button } from 'react-bootstrap';
import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ProfileNav from './ProfileNav';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { Theaters } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';

import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ButtonMaterial from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { SketchPicker  } from 'react-color';


import ProfileHeader from '../header_footer/ProfileHeader';
import Preview from './Preview';
import LivePreview from './LivePreview';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
class MyAppearance extends Component {
  constructor(props) {
    super(props)

    this.state = {
      JM_Email: localStorage.getItem('JM_Email'),
      JM_ID: parseInt(localStorage.getItem('JM_ID')),
      themeMaster: [],
      userThemeDetails: [],
      linkMaster:[],
      userDetails:this.props.location.userDetails,
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
      tab: 1,
      showTab1: true,
      showTab2: false,
      showSuccess:false,
      showError:false,
      message:'',
      templateTab:1,
      templateTab1: true,
      templateTab2: false,
      activeItemStyle:"",
      btnStyle:"",
      Custom_template1:'Custom_template1',
      selectedFile:null,
      JM_Description:'',
      JM_User_Profile_Url:''
 
  
      
    }
  
  }

  componentDidMount() {
    this.validateSession();
    this.Get_User_Theme_Details();
   
  }
  

  validateSession() {

    var JM_ID = parseInt(localStorage.getItem('JM_ID'));
    if (isNaN(JM_ID) || JM_ID === 0 || JM_ID === null) {
      localStorage.setItem('JM_Email', "");
      localStorage.setItem('JM_ID', 0);
      window.location.href = '/';
    }
  }
  async Get_User_Theme_Details() {
    try{
      var JM_ID = parseInt(localStorage.getItem('JM_ID'));
      var JSONdata = {
        JM_ID: JM_ID
      };
      const API_url = this.state.base_url + "admin/userAppear";
      const response = await fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSONdata)
      });
      const data = await response.json();
      if (data.status === 1)
        this.setState({
          userThemeDetails: data.userThemeDetails,
          themeMaster: data.themeMaster,
          linkMaster:data.linkMaster,
          userDetails:data.userDetails
        });
      else
        alert(data.msg);
      
      document.getElementById("tab_1").click(); // default click on tab 1
        this.FetchCustomTheme();
        if(this.state.userDetails && this.state.userDetails.length > 0)
        {
          this.setState({
            JM_Description:this.state.userDetails[0].JM_Description,
            JM_User_Profile_Url:this.state.userDetails[0].JM_User_Profile_Url
          
          });
          console.log(this.state.JM_User_Profile_Url)
        }
    }
    catch(e)
    {
      console.log("exception Get_User_Theme_Details my appearance")
    }
    
  }

  onChangeInput=(e)=>{
    this.setState({[e.target.name]:e.target.value});
  }
  handleChange = (event, tab) => {
    this.setState({ tab });
  };
  handleChangeTemplate = (event, templateTab) => {
    this.setState({ templateTab });
  };
  
  onTabChange = tabvalue => e => {
    //let tabvalue=e.target.index;
    if (tabvalue === 1) {
      this.setState({
        showTab1: true,
        showTab2: false

      });
    }
    if (tabvalue === 2) {
      this.setState({
        showTab2: true,
        showTab1: false
      });
    }
  }
  onTabTemplateChange = tabvalue => e => {
    //let tabvalue=e.target.index;
    if (tabvalue === 1) {
      this.setState({
        templateTab1: true,
        templateTab2: false

      });
    }
    if (tabvalue === 2) {
      this.setState({
        templateTab2: true,
        templateTab1: false
      });
    }
  }

  //onTabTemplateChange
  useThisTheme = data => e =>{
    var JSONdata = {
      TM_ID: data.TM_ID,
      JM_ID:this.state.JM_ID,
      TM_Back_Color: data.TM_Back_Color,
      TM_Back_Image: data.TM_Back_Image,
      TM_Item_Color: '',
      TM_Item_Style: '',
      TM_Highlight_Color: '',
      TM_Font: '',
      TM_Font_Color: '',
      TM_Bio_Color: data.TM_Bio_Color,
      TM_Active: data.TM_Active,
      TM_Class_Name: data.TM_Class_Name       
    };
    const API_url = this.state.base_url + "admin/updateDefaultTheme";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSONdata)
      })
    .then((response) => response.json())
    .then(data => {
       if(data.status===1)
       {   
         this.setState({showSuccess:true,message:'Profile is Successfully Updated'});
         this.setState({showError:false});
         this.refreshMobileView();
       }
       else
       {
            this.setState({showError:true,message:'Failed to Update profile, try agian after Sometimes'});
            this.setState({showSuccess:false});
        }
    });

    console.log(data.TM_ID);
    console.log(JSONdata);
  }

  changeColor=id=>e=>{
    var color = document.getElementById('color-picker_'+id).value;  
    document.getElementById('custom_color_'+id).style.backgroundColor = color;
    document.getElementById('custom_color_'+id).style.borderColor = color;

    if(id==="bg")
    {
      this.setState({activeItemBGcolor :color,dynamicColor:color});
    }
    if(id==="item")
    {
      this.setState({activeItemcolor :color,dynamicItemColor:color});
    }
    if(id==="highlight")
    {
      this.setState({activeHighlightcolor :color,dynamicHighlightColor:color});
    }
    if(id==="font")
    {
      this.setState({activeFontcolor :color,dynamicFontColor:color});
    }
  }

  openColorPicker = id => event =>{
    document.getElementById("color-picker_"+id).click();    
    var color=document.getElementById("color-picker_"+id).value;
    event.currentTarget.setAttribute("data-color", color);

    if(id==="bg")
    {
      this.setState({activeItemBGcolor :color,dynamicColor:color});
    }
    if(id==="item")
    {
      this.setState({activeItemcolor :color,dynamicItemColor:color});
    }
    if(id==="highlight")
    {
      this.setState({activeHighlightcolor :color,dynamicHighlightColor:color});
    }
    if(id==="font")
    {  
      this.setState({activeFontcolor :color,dynamicFontColor:color});
    }


  }

setActiveClass=id=>event=>{ // bg color
  console.log(event.currentTarget.attributes['data-color'].value);
  var color=event.currentTarget.attributes['data-color'].value;
  let JSONdata={};
  if(id==="bg")
   { 
     this.setState({activeItemBGcolor:color});
    JSONdata={
      colName:'TM_Back_Color',
        JM_ID: this.state.JM_ID,
          colValue:color,
      }
   }
  if(id==="item")
    {
      this.setState({activeItemcolor:color});
      JSONdata={
         colName:'TM_Item_Color',
        JM_ID:this.state.JM_ID,
          colValue:color,
      }
    }
  if(id==="highlight")
   { 
     this.setState({activeHighlightcolor:color});
    JSONdata={
        colName:'TM_Highlight_Color',
        JM_ID: this.state.JM_ID,
        colValue:color,
      }
   }
  if(id==="font")
   {
      this.setState({activeFontcolor:color});
      JSONdata={
        colName:'TM_Font_Color',
        JM_ID:this.state.JM_ID,
          colValue:color,
      }
   }
    
  this.updateCustomThemeOnclick(JSONdata);

}
//05-mar-2021
updateCustomThemeOnclick=(JSONdata)=>{

    const API_url = process.env.REACT_APP_API_URL+ "admin/updateCustomThemeOnclick";
    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSONdata)
      })
    .then((response) => response.json())
    .then(data => {
      if(data.status===1)
      {   
          this.setState({      
              show:true,   
              title:'Success!!!',
              msg:'Profile is updated',
            // isLoading:true   
            });  

              this.refreshMobileView();
            
            
      }
      else
      {
            this.setState({      
              show:true,   
              title:'error!!!',
              msg:'Profile is not updated',
            // isLoading:true   
            });  
      }
    });

}


//02-mar-2021
onClickUpdateTheme=()=>{
  
}
//================== set active buton style or item style
//05-mar-2021
setButtonStyleActive = id=>event =>{
  // console.log(event.currentTarget.attributes['data-color'].value);
   var shape=event.currentTarget.attributes['data-shape'].value;
   let JSONdata={};
   if(id==="button")
      { 
        this.setState({activeButtonStyle:shape});
          JSONdata={
            colName:'TM_Item_Style',
            JM_ID:this.state.JM_ID,
            colValue:shape,
          }
      }
  if(id==="font")
  {   
    this.setState({activeFontStyle:shape});
      JSONdata={
            colName:'TM_Font',
            JM_ID:this.state.JM_ID,
            colValue:shape,
          }
  }
    this.updateCustomThemeOnclick(JSONdata);
}
//========================================== item color

changeColorForItem = id=> event =>{
  var color = document.getElementById('color-picker_item').value;
  var dynamicItemColor=color;
  document.getElementById('custom_color_item').style.backgroundColor = color;
  document.getElementById('custom_color_item').style.borderColor = color;
  var activeItemcolor=color;
  this.setState({activeItemcolor});
  this.setState({dynamicItemColor});
}

// color format convertion
rgbToHex=(r, g, b)=> {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
//for storing element into one global array
CreateCustomArray=(key,value)=>{
 
  this.setState(
    {
      customArray:this.state.customArray.push({key:key,value:value})
    }
  );

}
uploadBackgroundImage=()=>{

  const formData = new FormData();  
  const API_url = process.env.REACT_APP_API_URL + "admin/uploadBackgroundImage";
  formData.append('sampleFile', this.state.selectedFile)
  formData.append('TM_ID',0) 
  formData.append('JM_ID', this.state.JM_ID)  
  formData.append('TM_Active', 1)
  formData.append('JM_User_Profile_Url_plus_JM_ID', this.state.userDetails[0].JM_User_Profile_Url+"_"+this.state.JM_ID)
  fetch(API_url,
    {
      method: 'post',
      body: formData
    })
  .then((response) => response.json())
  .then(data => {
      if(data.status===1)
      {   
        this.setState({showSuccess:true,message:'Profile is Successfully Updated'});
        this.setState({showError:false});
        this.setState({userThemeDetails:data.userThemeDetails});  
        //userThemeDetails
        this.FetchCustomTheme();
        this.refreshMobileView();
      }
      else
      {
        this.setState({showError:true,message:'Failed to Update profile, try agian after Sometimes'});
        this.setState({showSuccess:false});
      }
  });
}
saveCustomTheme=(event)=>{

    event.preventDefault();
    var JSONdata = {
      TM_ID: 0,
      JM_ID:this.state.JM_ID,
      TM_Back_Color: this.state.activeItemBGcolor,
      TM_Item_Color: this.state.activeItemcolor,
      TM_Back_Image:"",
      TM_Item_Style: this.state.activeButtonStyle,
      TM_Highlight_Color: this.state.activeHighlightcolor,
      TM_Font :this.state.activeFontStyle,
      TM_Font_Color: this.state.activeFontcolor, 
      TM_Active:1,
      TM_Class_Name: this.state.Custom_template1,
      JM_Description: this.state.JM_Description       
    };

          const formData = new FormData(); 
        
          const API_url = this.state.base_url + "admin/updateCustomTheme";
          formData.append('sampleFile', this.state.selectedFile)
          formData.append('TM_ID',0) 
          formData.append('JM_ID', this.state.JM_ID) 
          formData.append('TM_Back_Color',this.state.activeItemBGcolor) 
          formData.append('TM_Item_Color', this.state.activeItemcolor)
          formData.append('TM_Back_Image', "")
          formData.append('TM_Item_Style',this.state.activeButtonStyle)
          formData.append('TM_Highlight_Color',this.state.activeHighlightcolor)
          formData.append('TM_Font', this.state.activeFontStyle)
          formData.append('TM_Font_Color', this.state.activeFontcolor)
          formData.append('TM_Class_Name', this.state.Custom_template1 )
          formData.append('TM_Active', 1)
          formData.append('JM_Description', this.state.JM_Description )
          formData.append('JM_User_Profile_Url_plus_JM_ID', this.state.userDetails[0].JM_User_Profile_Url+"_"+this.state.JM_ID)
          
        fetch(API_url,
          {
            method: 'post',
            body: formData
          })
        .then((response) => response.json())
        .then(data => 
        {
            if(data.status===1)
            {   
              this.setState({showSuccess:true,message:'Profile is Successfully Updated'});
              this.setState({showError:false});
              this.setState({userThemeDetails:data.userThemeDetails});

              //userThemeDetails
              this.FetchCustomTheme();
              this.refreshMobileView();
            }
            else
            {
              this.setState({showError:true,message:'Failed to Update profile, try agian after Sometimes'});
              this.setState({showSuccess:false});
            }
        });

          console.log(JSONdata);
}

FetchCustomTheme=()=>{

  console.log(this.state.userThemeDetails);
 
  let activeItemBGcolor="",activeButtonStyle='',activeItemcolor='',activeHighlightcolor='',activeFontStyle='',activeFontcolor='';
 
  if(this.state.userThemeDetails && this.state.userThemeDetails.length > 0)
    {
  
      let len=this.state.userThemeDetails.length;
      for(var i=0;i < len ;i++)
      {
        activeItemBGcolor=this.state.userThemeDetails[i].TM_Back_Color;
        activeItemcolor=this.state.userThemeDetails[i].TM_Item_Color;
        activeButtonStyle=this.state.userThemeDetails[i].TM_Item_Style;
        activeHighlightcolor=this.state.userThemeDetails[i].TM_Highlight_Color;
        activeFontStyle=this.state.userThemeDetails[i].TM_Font;
        activeFontcolor=this.state.userThemeDetails[i].TM_Font_Color;              
        break;
      } 
      
    }
     this.setState({
       dynamicColor:activeItemBGcolor,
       dynamicItemColor:activeItemcolor,
       dynamicFontColor:activeFontcolor,
       dynamicHighlightColor:activeHighlightcolor,
      activeItemBGcolor,activeItemcolor,activeButtonStyle,activeHighlightcolor,activeFontStyle,activeFontcolor});

     //document.getElementById('custom_color_bg').style.background= activeItemBGcolor;
    // var labelText='Some Value';
     // document.getElementById("custom_color_bg").setAttribute('data-color', '{' + activeItemBGcolor + '}' ); 
}

imageonChange=(e)=>{     
  const file = e.target.files[0];
  this.setState({ selectedFile: e.target.files[0] }); 
  this.setState({
    TM_Back_Image: URL.createObjectURL(file)  
  });

  this.setState({
    selectedFile:file
    },() => {
        console.log(this.state.selectedFile);      
       this.uploadBackgroundImage();
      
    });

}
handleOnBlurDescription=()=>{
  //alert();

  this.reload();
}
refreshMobileView=()=>{
  this.refs.livepreview.UpdateMobileView();
}
updateBackgroundImage=id=>e=>{

  const formData = new FormData();  
  const API_url = process.env.REACT_APP_API_URL + "admin/removeBackgroundImage";

  formData.append('JM_ID', id)  
  formData.append('TM_Active', 1)
  formData.append('JM_User_Profile_Url_plus_JM_ID', this.state.userDetails[0].JM_User_Profile_Url+"_"+this.state.JM_ID)
  fetch(API_url,
    {
      method: 'post',
      body: formData
    })
  .then((response) => response.json())
  .then(data => {
      if(data.status===1)
      {   
        this.setState({showSuccess:true,message:'Profile is Successfully Updated'});
        this.setState({showError:false});
      //  this.setState({userThemeDetails:data.userThemeDetails});  
        //userThemeDetails
        this.FetchCustomTheme();
        this.refreshMobileView();
      }
      else
      {
        this.setState({showError:true,message:'Failed to Update profile, try agian after Sometimes'});
        this.setState({showSuccess:false});
      }
  });
}
  render() 
  {

    const useStyles  = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
      root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
     
    };
   const CssAlert={
    success: {
      backgroundColor:'#78e27869',
      color:'black', 
    },
    error: {
      backgroundColor:'#ef276045',
      color:'black', 
    },
    warning: {
      backgroundColor:'#5bdc6240',
      color:'black', 
    },
    info: {
      backgroundColor:'#f1bf1f59',
      color:'black', 
    },
   }
      // var fontStyle="'Noto Sans TC', sans-serif ";
     
  
    return (          
      <>
         <ProfileHeader />
        <div className="profile-tab">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <ProfileNav />
              </div>
            </div>
          </div>
        </div>
        <div className="appear-body">
          <div className="container">   
            <div className="row">
                  <diV className="col-md-8">
                          {
                          this.state.showSuccess ?              
                              <Alert severity="success" style={CssAlert.success} id="msgId"
                              onClose={() => {this.setState({showSuccess:false})}}>
                              <AlertTitle>Success</AlertTitle>
                              <strong>{this.state.message}</strong>
                            </Alert>        
                          :
                          null
                          
                          }
                          {
                          this.state.showError ?
                              <Alert severity="error" style={CssAlert.error} id="msgId"
                              onClose={() => {this.setState({showError:false})}}>
                              <AlertTitle>Error</AlertTitle>
                              <strong>{this.state.message}</strong>
                            </Alert>
                          :
                          null
                          
                          }
                  
                            {/* <Alert onClose={() => {}}>
                              This is a success alert — check it out!                  
                            </Alert> */}
                        
                            <Paper square className="">
                              <Tabs
                                value={this.state.tab}
                                onChange={this.handleChange}
                                variant="fullWidth"
                                indicatorColor="secondary"
                                textColor="secondary"
                                aria-label="icon label tabs example"
                              >
                                <Tab icon={<Theaters />} label="Theme " onClick={this.onTabChange(1)} value="1" id="tab_1" />
                                <Tab icon={<FavoriteIcon />} label="Create Your Custom Theme" onClick={this.onTabChange(2)} value="2" />
                                {/* <Tab icon={<PersonPinIcon />} label="NEARBY" /> */}
                              </Tabs>
                              {
                                this.state.showTab1 ?
                                  <div className="row" >
                                    <div className="col-md-12">
                                      <div className="appear">
                                        <div className="title">
                                          Apply Your Desire Theme
                                    </div>

                                        <div className="theme">
                                          <div className="row">
                                            {
                                              this.state.themeMaster && this.state.themeMaster.map((theme, i) => (
                                                <div className="col-md-6">
                                                  <div className="item">
                                                    <img src={process.env.REACT_APP_UPLOAD_URL + theme.TM_Back_Image} alt="background" />
                                                    <div className="text">
                                                      <h3 style={{fontFamily:theme.TM_Font}}>Aa </h3>
                                                    </div>
                                                    <div className="butn-box">
                                                      <ButtonMaterial className="btun" data={theme[i]} onClick={this.useThisTheme(this.state.themeMaster[i])}>Use This Theme</ButtonMaterial>
                                                      {/* <Preview data={this.state.themeMaster[i]} linkMaster={this.state.linkMaster} bgImage={this.state.base_url + theme.TM_Back_Image} userDetails={this.state.userDetails} userThemeDetails={this.state.userThemeDetails}/>                                             */}
                                                    </div>
                                                  </div>
                                                </div>
                                              ))
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  : null
                              }
                              {
                                this.state.showTab2 ?
                                  <div className="row" >
                                    <div className="col-md-12">
                                      <div className="appear">
                                        <Paper square className="">
                                     

                                        {
                                          this.state.templateTab1 ?
                                              <div className="template1" >
                                                <div className="template1_body">
                                                    <div className="heading">
                                                    <div className="row">
                                                      <div className="col-sm-6" style={{display:'none'}}>
                                                          <h5>Description</h5>
                                                          <p>Write your Content</p>
                                                        </div>
                                                        <div className="col-sm-6" style={{display:'none'}}>                                            
                                                              <textarea placeholder="Enter Description" name="JM_Description" value={this.state.JM_Description}
                                                               className="form-control" onChange={this.onChangeInput}  onBlur={this.handleOnBlurDescription}></textarea>
                                                        </div>
                                                    </div>
                                                    
                                                    </div>
                                                    <div className="heading">
                                                    <h5>Background Image</h5>
                                                    <p>Pick your background image</p>
                                                  </div>
                                                    <div className="item">
                                                  <div className="row">
                                                    {
                                                      this.state.userThemeDetails.length > 0 &&  this.state.userThemeDetails[0].TM_Back_Image?
                                                    <div className="col-md-4">
                                                      <div className="color-box">
                                                          <img src={process.env.REACT_APP_UPLOAD_URL+this.state.userThemeDetails[0].TM_Back_Image} style={{border: 'none', width: '100%'}}/>
                                                          <span className="closeBackground" onClick={this.updateBackgroundImage(this.state.userThemeDetails[0].JM_ID)}><HighlightOffIcon/></span>
                                                      </div>
                                                    </div>
                                                    :
                                                    null
                                                      }
                                                    <div className="col-md-4">
                                                      <div className="color-box">                                              
                                                          <img src={this.state.TM_Back_Image} style={{border: 'none', width: '100%'}}/>
                                                        
                                                      </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                      <label className="up-ico" for="upImage">
                                                          Upload an Image
                                                          <input type="file"  id="upImage" style={{ display: "none" }}  onChange={this.imageonChange} />
                                                    </label>
                                                    </div>

                                                  </div>
                                                </div>
                                                    <div className="heading">
                                                      <h5>Background</h5>
                                                      <p>Pick your overall background color</p>
                                                    </div>
                                                    <div className="item">
                                                      <div className="row">
                                                        <div className="col-md-2">
                                                          <div data-color="#FC2070" data-index="1" data-test={'hiii'} 
                                                          className={this.state.activeItemBGcolor==="#FC2070" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                                          onClick={this.setActiveClass('bg')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div data-color="#3DA5DF" data-index="2"  className={this.state.activeItemBGcolor==="#3DA5DF" ? 'color-box bg_2 active' : 'color-box bg_2'} 
                                                          onClick={this.setActiveClass('bg')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                        <div data-color="#F25F25"  data-index="3"  className={this.state.activeItemBGcolor==="#F25F25" ? 'color-box bg_3 active' : 'color-box bg_3'} 
                                                        onClick={this.setActiveClass('bg')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                        <div data-color="#FFC224"  data-index="4"  className={this.state.activeItemBGcolor==="#FFC224" ? 'color-box bg_4 active' : 'color-box bg_4'} 
                                                                                      onClick={this.setActiveClass('bg')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div data-color="#276E57" data-index="5"  className={this.state.activeItemBGcolor==="#276E57" ? 'color-box bg_5 active' : 'color-box bg_5'} 
                                                        onClick={this.setActiveClass('bg')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div className={this.state.activeItemBGcolor===this.state.dynamicColor ? 'color-box active' : 'color-box'}
                                                          data-color={this.state.dynamicColor} style={{backgroundColor:this.state.activeItemBGcolor}} data-index="6" id="custom_color_bg" onClick={this.openColorPicker('bg')}>
                                                          <input type="color" className="invisibleCustom" id="color-picker_bg" onChange={this.changeColor('bg')}/>
                                                          </div>
                                                      
                                                        </div>
                                                      
                                                      </div>
                                                    </div>
                                                    <div className="heading">
                                                      <h5>Item Style</h5>
                                                      <p>Select the styling you'd like your items to have</p>
                                                    </div>
                                                    <div className="item">
                                                      <div className="row">
                                                        <div className="col-md-4">
                                                          <div  data-shape="style_sharp" data-index="1" className={this.state.activeButtonStyle==="style_sharp" ? "button-box active" : "button-box"}
                                                              onClick={this.setButtonStyleActive('button')}>
                                                            <div  className="btun style_sharp">   
                                                            
                                                              Sharp
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                          <div data-shape="style_rounded" data-index="2"  className={this.state.activeButtonStyle==="style_rounded" ? 'button-box active' : 'button-box'}
                                                                onClick={this.setButtonStyleActive('button')}>                                               
                                                            <div  className="btun style_rounded" >                                                    
                                                            Rounded
                                                            </div>

                                                          </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                          <div data-shape="style_pill"  data-index="3" className={this.state.activeButtonStyle==="style_pill" ? 'button-box active' : 'button-box'}
                                                                onClick={this.setButtonStyleActive('button')}>                                              
                                                            <div   className="btun style_pill">
                                                                                                                
                                                            Pill
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                          <div  data-shape="style_push" data-index="1" className={this.state.activeButtonStyle==="style_push" ? "button-box active" : "button-box"}
                                                              onClick={this.setButtonStyleActive('button')}>
                                                            <div  className="btun style_push">   
                                                            
                                                              Push me
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                          <div data-shape="style_rainbow" data-index="2"  className={this.state.activeButtonStyle==="style_rainbow" ? 'button-box active' : 'button-box'}
                                                                onClick={this.setButtonStyleActive('button')}>                                               
                                                            <div  className="btun style_rainbow" >                                                    
                                                            Ranibow
                                                            </div>

                                                          </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                          <div data-shape="style_Shine"  data-index="3" className={this.state.activeButtonStyle==="style_Shine" ? 'button-box active' : 'button-box'}
                                                                onClick={this.setButtonStyleActive('button')}>                                              
                                                            <div   className="btun style_Shine">
                                                                                                                
                                                            Shine
                                                            </div>
                                                          </div>
                                                        </div>
                                                        
                                                     
                                                     
                                                      </div>
                                                    </div>
                                                    {/* item color */}
                                                    <div className="heading">
                                                      <h5>Item Color</h5>
                                                      <p>This is the color that the items on your profile will be</p>
                                                    </div>
                                                    <div className="item">
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                          <div data-color="#FC2070" data-index="1"  className={this.state.activeItemcolor==="#FC2070" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                                          onClick={this.setActiveClass('item')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div data-color="#3DA5DF" data-index="2"  className={this.state.activeItemcolor==="#3DA5DF" ? 'color-box bg_2 active' : 'color-box bg_2'} 
                                                          onClick={this.setActiveClass('item')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                        <div data-color="#F25F25"  data-index="3"  className={this.state.activeItemcolor==="#F25F25" ? 'color-box bg_3 active' : 'color-box bg_3'} 
                                                        onClick={this.setActiveClass('item')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                        <div data-color="#FFC224"  data-index="4"  className={this.state.activeItemcolor==="#FFC224" ? 'color-box bg_4 active' : 'color-box bg_4'} 
                                                          onClick={this.setActiveClass('item')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div data-color="#276E57" data-index="5"  className={this.state.activeItemcolor==="#276E57" ? 'color-box bg_5 active' : 'color-box bg_5'} 
                                                            onClick={this.setActiveClass('item')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div className={this.state.activeItemcolor===this.state.dynamicItemColor ? 'color-box active' : 'color-box'}
                                                          data-color={this.state.dynamicItemColor} style={{backgroundColor:this.state.activeItemcolor}}
                                                          data-index="6" id="custom_color_item" onClick={this.openColorPicker('item')}>
                                                          </div>
                                                          <input type="color" className="invisibleCustom" id="color-picker_item" onChange={this.changeColor('item')}/>
                                                        </div>
                                                      
                                                      </div>
                                                    </div>
                                                    {/* highligh color */}
                                                    <div className="heading">
                                                      <h5>Highlight color</h5>
                                                      <p>This is used for icons, your follow button and other highlighted elements</p>
                                                    </div>
                                                    <div className="item">                                         
                                                      <div className="row">
                                                        <div className="col-md-2">
                                                          <div data-color="#FC2070" data-index="1"  className={this.state.activeHighlightcolor==="#FC2070" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                                          onClick={this.setActiveClass('highlight')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div data-color="#3DA5DF" data-index="2"  className={this.state.activeHighlightcolor==="#3DA5DF" ? 'color-box bg_2 active' : 'color-box bg_2'} 
                                                          onClick={this.setActiveClass('highlight')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                        <div data-color="#F25F25"  data-index="3"  className={this.state.activeHighlightcolor==="#F25F25" ? 'color-box bg_3 active' : 'color-box bg_3'} 
                                                        onClick={this.setActiveClass('highlight')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                        <div data-color="#FFC224"  data-index="4"  className={this.state.activeHighlightcolor==="#FFC224" ? 'color-box bg_4 active' : 'color-box bg_4'} 
                                                                                      onClick={this.setActiveClass('highlight')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div data-color="#276E57" data-index="5"  className={this.state.activeHighlightcolor==="#276E57" ? 'color-box bg_5 active' : 'color-box bg_5'} 
                                                        onClick={this.setActiveClass('highlight')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div className={this.state.activeHighlightcolor===this.state.dynamicHighlightColor ? 'color-box active' : 'color-box'}
                                                          data-color={this.state.dynamicHighlightColor} style={{backgroundColor:this.state.activeHighlightcolor}} data-index="6" id="custom_color_highlight" onClick={this.openColorPicker('highlight')}>
                                                          <input type="color" className="invisibleCustom"id="color-picker_highlight" onChange={this.changeColor('highlight')}/>
                                                          </div>
                                                        </div>
                                                      
                                                      </div>                                            
                                                    </div>
                                                    {/* Font Style */}
                                                    <div className="heading">
                                                      <h5>Font Style</h5>
                                                      <p>This Style will be used on your template fonts</p>
                                                    </div>
                                                    <div className="item">
                                                      <div className="row">
                                                        <div className="col-md-4">
                                                          <div data-shape="font_style_1"  data-index="1" className={this.state.activeFontStyle==="font_style_1" ? 'font-box font_style_1  active' : 'font-box font_style_1'}
                                                                onClick={this.setButtonStyleActive('font')}>  
                                                          Aa
                                                          </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                        <div data-shape="font_style_2"  data-index="2" className={this.state.activeFontStyle==="font_style_2" ? 'font-box font_style_2  active' : 'font-box font_style_2'}
                                                                onClick={this.setButtonStyleActive('font')}>  
                                                          Aa
                                                          </div>
                                                        
                                                        </div>
                                                        <div className="col-md-4">
                                                        <div data-shape="font_style_3"  data-index="3" className={this.state.activeFontStyle==="font_style_3" ? 'font-box font_style_3  active' : 'font-box font_style_3'}
                                                                onClick={this.setButtonStyleActive('font')}>  
                                                          Aa
                                                          </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                          <div data-shape="font_style_4"  data-index="4" className={this.state.activeFontStyle==="font_style_4" ? 'font-box font_style_4  active' : 'font-box font_style_4'}
                                                                  onClick={this.setButtonStyleActive('font')}>  
                                                            Aa
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div data-shape="font_style_5"  data-index="5" className={this.state.activeFontStyle==="font_style_5" ? 'font-box font_style_5  active' : 'font-box font_style_5'}
                                                                  onClick={this.setButtonStyleActive('font')}>  
                                                            Aa
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                          <div data-shape="font_style_6"  data-index="6" className={this.state.activeFontStyle==="font_style_6" ? 'font-box font_style_6  active' : 'font-box font_style_6'}
                                                                  onClick={this.setButtonStyleActive('font')}>  
                                                            Aa
                                                            </div>
                                                        </div>
                                                      

                                                        <div className="col-md-4">
                                                          <div data-shape="font_style_7"  data-index="7" className={this.state.activeFontStyle==="font_style_7" ? 'font-box font_style_7  active' : 'font-box font_style_7'}
                                                                  onClick={this.setButtonStyleActive('font')}>  
                                                            Aa
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                          <div data-shape="font_style_8"  data-index="8" className={this.state.activeFontStyle==="font_style_8" ? 'font-box font_style_8  active' : 'font-box font_style_8'}
                                                                  onClick={this.setButtonStyleActive('font')}>  
                                                            Aa
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                          <div data-shape="font_style_9"  data-index="9" className={this.state.activeFontStyle==="font_style_9" ? 'font-box font_style_9  active' : 'font-box font_style_9'}
                                                                  onClick={this.setButtonStyleActive('font')}>  
                                                            Aa
                                                            </div>
                                                        </div>



                                                        <div className="col-md-4">
                                                          <div data-shape="font_style_10"  data-index="10" className={this.state.activeFontStyle==="font_style_10" ? 'font-box font_style_10  active' : 'font-box font_style_10'}
                                                                  onClick={this.setButtonStyleActive('font')}>  
                                                            Aa
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                          <div data-shape="font_style_11"  data-index="11" className={this.state.activeFontStyle==="font_style_11" ? 'font-box font_style_11  active' : 'font-box font_style_11'}
                                                                  onClick={this.setButtonStyleActive('font')}>  
                                                            Aa
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                          <div data-shape="font_style_12"  data-index="12" className={this.state.activeFontStyle==="font_style_12" ? 'font-box font_style_12  active' : 'font-box font_style_12'}
                                                                  onClick={this.setButtonStyleActive('font')}>  
                                                            Aa
                                                            </div>
                                                        </div>








                                                      </div>
                                                    </div>
                                                    {/* Font Color */}
                                                    <div className="heading">
                                                      <h5>Font Color</h5>
                                                      <p>This color will be used on your items</p>
                                                    </div>
                                                    <div className="item">
                                                      <div className="row">
                                                        <div className="col-md-2">
                                                          <div data-color="#FC2070" data-index="1"  className={this.state.activeFontcolor==="#FC2070" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                                          onClick={this.setActiveClass('font')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div data-color="#3DA5DF" data-index="2"  className={this.state.activeFontcolor==="#3DA5DF" ? 'color-box bg_2 active' : 'color-box bg_2'} 
                                                          onClick={this.setActiveClass('font')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                        <div data-color="#F25F25"  data-index="3"  className={this.state.activeFontcolor==="#F25F25" ? 'color-box bg_3 active' : 'color-box bg_3'} 
                                                        onClick={this.setActiveClass('font')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                        <div data-color="#FFC224"  data-index="4"  className={this.state.activeFontcolor==="#FFC224" ? 'color-box bg_4 active' : 'color-box bg_4'} 
                                                          onClick={this.setActiveClass('font')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div data-color="#276E57" data-index="5"  className={this.state.activeFontcolor==="#276E57" ? 'color-box bg_5 active' : 'color-box bg_5'} 
                                                        onClick={this.setActiveClass('font')}>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div className={this.state.activeFontcolor===this.state.dynamicFontColor ? 'color-box active' : 'color-box'}
                                                          data-color={this.state.dynamicFontColor} style={{backgroundColor:this.state.activeFontcolor}} data-index="6" id="custom_color_font" onClick={this.openColorPicker('font')}>
                                                            <input type="color" className="invisibleCustom" id="color-picker_font" onChange={this.changeColor('font')}/>
                                                          </div>
                                                        </div>
                                                      
                                                      </div> 
                                                    </div>
                                                    <div className="item">
                                                      <div className="row">
                                                        <div className="col-md-4">                                              
                                                          {/* <Button class="col-md-8 offset-md-2" onClick={this.saveCustomTheme}>Save Your Custom Theme</Button>  */}
                                                          {/* <Preview data={this.state.themeMaster[i]} linkMaster={this.state.linkMaster} bgImage={this.state.base_url + theme.TM_Back_Image} userDetails={this.state.userDetails} userThemeDetails={this.state.userThemeDetails}/>                                                                               */}
                                                        </div>                                             
                                                      </div>
                                                    </div>
                                                </div>
                                                
                                              </div>
                                            :null
                                            
                                          }
                                         
                                        </Paper>

                                      </div>
                                    </div>
                                  </div>
                                  : null
                              }
                            </Paper>
                  </diV>
                  {/* <LivePreview state={this.state}  />  */}
                 <LivePreview  JM_User_Profile_Url={this.state.JM_User_Profile_Url} ref="livepreview"/> 
            </div>
          </div>         
        </div>
      
        <FooterClass />
      </>
    )
  }
}
export default MyAppearance
