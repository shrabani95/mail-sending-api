import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import FooterClass from '../header_footer/FooterClass';
import ProfileNav from './ProfileNav';
import ButtonMaterial from '@material-ui/core/Button';
import ProfileHeader from '../header_footer/ProfileHeader';
import LivePreview2 from './LivePreview2';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tab2 from 'react-bootstrap/Tab';
import BurstModeOutlinedIcon from '@material-ui/icons/BurstModeOutlined';
import SettingsOverscanOutlinedIcon from '@material-ui/icons/SettingsOverscanOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import WbIridescentOutlinedIcon from '@material-ui/icons/WbIridescentOutlined';
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Helmet } from "react-helmet";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover';
import API  from '../services/API';

class MyAppearance extends Component {
  constructor(props) {
    super(props)

    this.state = {
      JM_Email: localStorage.getItem('JM_Email'),
      JM_ID: parseInt(localStorage.getItem('JM_ID')),
      themeMaster: [],
      userThemeDetails: [],
      linkMaster: [],
      userDetails: this.props.location.userDetails,
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
      showSuccess: false,
      showError: false,
      message: '',
      templateTab: 1,
      templateTab1: true,
      templateTab2: false,
      activeItemStyle: "",
      btnStyle: "",
      Custom_template1: 'Custom_template1',
      selectedFile: null,
      JM_Description: '',
      JM_User_Profile_Url: '',
      showBackImage:'none',
      btnUploadVideo:'Upload a video',
      btnUploadVideoDisabled:false,
      activeButtonEffectStyle:''
    }

  }

  componentDidMount() {
  
    //API.isActive();
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
    try {
      var JM_ID = parseInt(localStorage.getItem('JM_ID'));
      var JSONdata = {
        JM_ID: JM_ID
      };
      const API_url = this.state.base_url + "admin/userAppear";
      const response = await fetch(API_url, {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      });
      const data1 = await response.json();
      if (data1.status === 1)
      {
        const data=await API.decryptJson(data1.flag);
        this.setState({
          userThemeDetails: data.userThemeDetails,
          themeMaster: data.themeMaster,
          linkMaster: data.linkMaster,
          userDetails: data.userDetails,
          TM_Bio_Color: data.userThemeDetails[0].TM_Bio_Color
        });
      }      
  

      //document.getElementById("tab_1").click(); // default click on tab 1
      this.FetchCustomTheme();
      if (this.state.userDetails && this.state.userDetails.length > 0) {
        this.setState({
          JM_Description: this.state.userDetails[0].JM_Description,
          JM_User_Profile_Url: this.state.userDetails[0].JM_User_Profile_Url

        });
        //console.log(this.state.JM_User_Profile_Url)
      }
    }
    catch (e) {
      //console.log("exception Get_User_Theme_Details my appearance")
    }

  }
    getApper=()=>{
      var JM_ID = parseInt(localStorage.getItem('JM_ID'));
      var JSONdata = {
        JM_ID: JM_ID
      };
                const API_url = process.env.REACT_APP_API_URL + "admin/userAppear";       
                fetch(API_url,
                {
                    method: 'post',
                    headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
                    body: JSON.stringify(JSONdata)
                })
                .then((response) => response.json())
                .then(async data1 => { 
                      if (data1.status === 1)
                      {
                        const data=await API.decryptJson(data1.flag);
                      this.setState({
                        userThemeDetails: data.userThemeDetails,
                        themeMaster: data.themeMaster,
                        linkMaster: data.linkMaster,
                        userDetails: data.userDetails
                      });
                    }
                });
    }

  onChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
  useThisTheme = data => e => {
    var flagData = {
      TM_ID: data.TM_ID,
      JM_ID: this.state.JM_ID,
      TM_Back_Color: data.TM_Back_Color,
      TM_Back_Image: data.TM_Back_Image,
      TM_Item_Color: '',
      TM_Item_Style: '',
      TM_Highlight_Color: '',
      TM_Font: '',
      TM_Font_Color: '',
      TM_Bio_Color:this.state.TM_Bio_Color,
      TM_Active: data.TM_Active,
      TM_Class_Name: data.TM_Class_Name
    };
    const API_url = this.state.base_url + "admin/updateDefaultTheme";

     
    const flag=API.encryptData(flagData);
     var JSONdata = {
      flag: flag
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
          this.setState({ showSuccess: true, message: 'Profile is Successfully Updated' });
          this.setState({ showError: false });
          this.refreshMobileView();
        }
        else {
          this.setState({ showError: true, message: 'Failed to Update profile, try agian after Sometimes' });
          this.setState({ showSuccess: false });
        }
      });

    //console.log(data.TM_ID);
    //console.log(JSONdata);
  }

  changeColor = id => e => {
    var color = document.getElementById('color-picker_' + id).value;
    document.getElementById('custom_color_' + id).style.backgroundColor = color;
    document.getElementById('custom_color_' + id).style.borderColor = color;

    if (id === "bg") {
      this.setState({ activeItemBGcolor: color, dynamicColor: color });
      var JSONdata = {
        colName: 'TM_Back_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
      this.updateCustomThemeOnclick(JSONdata);
    }
    if (id === "item") {
      this.setState({ activeItemcolor: color, dynamicItemColor: color });
      var JSONdata = {
        colName: 'TM_Item_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
      this.updateCustomThemeOnclick(JSONdata);
    }
    if (id === "highlight") {
      this.setState({ activeHighlightcolor: color, dynamicHighlightColor: color });
      var JSONdata = {
        colName: 'TM_Highlight_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
      this.updateCustomThemeOnclick(JSONdata);
    }
    if (id === "font") {
      this.setState({ activeFontcolor: color, dynamicFontColor: color });
      var JSONdata = {
        colName: 'TM_Font_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
      
      this.updateCustomThemeOnclick(JSONdata);
    }
    if (id === "border") 
    {
      this.setState({ activeBordercolor: color, dynamicBorderColor: color });
      var JSONdata = {
        colName: 'TM_Border_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
      this.updateCustomThemeOnclick(JSONdata);
    }
       //thumbIcon
    if (id === "thumbIcon") 
    {
      this.setState({ activeIconcolor: color,dynamicIconColor: color  });
      JSONdata = {
        colName: 'TM_Thumbnail_Icon_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
      this.updateCustomThemeOnclick(JSONdata);
    }
    if (id === "socialWidgetIcon") {
      this.setState({ activeSocialWidgetcolor: color,dynamicSocialWidgetcolor: color  });
      JSONdata = {
        colName: 'TM_SocialWidget_Icon_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
      this.updateCustomThemeOnclick(JSONdata);
    }
      
    
  }

  openColorPicker = id => event => {
    document.getElementById("color-picker_" + id).click();
    var color = document.getElementById("color-picker_" + id).value;
    event.currentTarget.setAttribute("data-color", color);

    if (id === "bg") {
      this.setState({ activeItemBGcolor: color, dynamicColor: color });
    }
    if (id === "item") {
      this.setState({ activeItemcolor: color, dynamicItemColor: color });
    }
    if (id === "highlight") {
      this.setState({ activeHighlightcolor: color, dynamicHighlightColor: color });
    }
    if (id === "font") {
      this.setState({ activeFontcolor: color, dynamicFontColor: color });
    }
    if (id === "thumbIcon") {
      this.setState({ activeIconcolor: color, dynamicIconColor: color });
    }
    if (id === "socialWidgetIcon") {
      this.setState({ activeSocialWidgetcolor: color,dynamicSocialWidgetcolor: color  });      
    }
  }

  setActiveClass = id => event => { // bg color
    //console.log(event.currentTarget.attributes['data-color'].value);
    var color = event.currentTarget.attributes['data-color'].value;
    let JSONdata = {};
    if (id === "bg")
    {
      this.setState({ activeItemBGcolor: color,selectedFileVideo:null });
      document.getElementById('upVideo').value='';
      JSONdata = {
        colName: 'TM_Back_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
    }
    if (id === "item") {
      this.setState({ activeItemcolor: color });
      JSONdata = {
        colName: 'TM_Item_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
    }
    if (id === "highlight") {
      this.setState({ activeHighlightcolor: color });
      JSONdata = {
        colName: 'TM_Highlight_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
    }
    if (id === "font") {
      this.setState({ activeFontcolor: color });
      JSONdata = {
        colName: 'TM_Font_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
    }
    if (id === "border") {
      this.setState({ activeBordercolor: color });
      JSONdata = {
        colName: 'TM_Border_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
    }
    //thumbIcon
    if (id === "thumbIcon") {
      this.setState({ activeIconcolor: color });
      JSONdata = {
        colName: 'TM_Thumbnail_Icon_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
    }
    if (id === "socialWidgetIcon") {
      this.setState({ activeSocialWidgetcolor: color });
      JSONdata = {
        colName: 'TM_SocialWidget_Icon_Color',
        JM_ID: this.state.JM_ID,
        colValue: color,
      }
    }

    this.updateCustomThemeOnclick(JSONdata);

  }
  //05-mar-2021
  updateCustomThemeOnclick = (flagData) => {

        const flag=API.encryptData(flagData);
      let  JSONdata = {
          flag: flag
        };

   
    const API_url = process.env.REACT_APP_API_URL + "admin/updateCustomThemeOnclick";
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
            showBackImage:'none' 
          });
          
          this.getApper();
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


  //02-mar-2021
  onClickUpdateTheme = () => {

  }
  //================== set active buton style or item style
  //05-mar-2021
  setButtonStyleActive = id => event => {
    // console.log(event.currentTarget.attributes['data-color'].value);
    var shape = event.currentTarget.attributes['data-shape'].value;
    let JSONdata = {};
    if (id === "button") {
      this.setState({ activeButtonStyle: shape });
      JSONdata = {
        colName: 'TM_Item_Style',
        JM_ID: this.state.JM_ID,
        colValue: shape,
      }
    }
    if (id === "font") {
      this.setState({ activeFontStyle: shape });
      JSONdata = {
        colName: 'TM_Font',
        JM_ID: this.state.JM_ID,
        colValue: shape,
      }
    }
    if(id==='buttonEffect')
    {
      this.setState({ activeButtonEffectStyle: shape });
      JSONdata = {
        colName: 'TM_Item_Effect',
        JM_ID: this.state.JM_ID,
        colValue: shape,
      }
    }
      //nameSize
    if(id==='nameSize')
    {
      this.setState({ activeNameSize: shape });
      JSONdata = {
        colName: 'TM_Name_Size',
        JM_ID: this.state.JM_ID,
        colValue: shape,
      }
    }
    if(id==='bioSize')
    {
      this.setState({ activeBioSize: shape });
      JSONdata = {
        colName: 'TM_Bio_Size',
        JM_ID: this.state.JM_ID,
        colValue: shape,
      }
    }
    this.updateCustomThemeOnclick(JSONdata);
  }
  //========================================== item color

  changeColorForItem = id => event => {
    var color = document.getElementById('color-picker_item').value;
    var dynamicItemColor = color;
    document.getElementById('custom_color_item').style.backgroundColor = color;
    document.getElementById('custom_color_item').style.borderColor = color;
    var activeItemcolor = color;
    this.setState({ activeItemcolor });
    this.setState({ dynamicItemColor });
  }

  // color format convertion
  rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  //for storing element into one global array
  CreateCustomArray = (key, value) => {

    this.setState(
      {
        customArray: this.state.customArray.push({ key: key, value: value })
      }
    );

  }
  uploadBackgroundImage = () => {

    const formData = new FormData();
    const API_url = process.env.REACT_APP_API_URL + "admin/uploadBackgroundImage";
    formData.append('sampleFile', this.state.selectedFile)
    formData.append('TM_ID', 0)
    formData.append('JM_ID', this.state.JM_ID)
    formData.append('TM_Active', 1)
    formData.append('JM_User_Profile_Url_plus_JM_ID', this.state.userDetails[0].JM_User_Profile_Url + "_" + this.state.JM_ID)
    fetch(API_url,
      {
        method: 'post',
        headers: {"authorization": API.getAuth(),"id":API.getId()},
        body: formData
      })
      .then((response) => response.json())
      .then(async data1 => {
        if (data1.status === 1) 
        {
          const data=await API.decryptJson(data1.flag);
          this.setState({ showSuccess: true, message: 'Profile is Successfully Updated', 
          showError: false,
          userThemeDetails: data.userThemeDetails,
           selectedFile:null 
          });   
          document.getElementById('upImage').value='';
          //userThemeDetails
          this.FetchCustomTheme();
          this.refreshMobileView();
        }
        else {
          this.setState({ showError: true, message: 'Failed to Update profile, try agian after Sometimes' });
          this.setState({ showSuccess: false });
        }
      });
  }
  //MS2
  uploadBackgroundVideo = () => {

    const formData = new FormData();
    const API_url = process.env.REACT_APP_API_URL + "admin/uploadBackgroundImage";
    formData.append('sampleFile', this.state.selectedFileVideo)
    formData.append('TM_ID', 0)
    formData.append('JM_ID', this.state.JM_ID)
    formData.append('TM_Active', 1)
    formData.append('JM_User_Profile_Url_plus_JM_ID', this.state.userDetails[0].JM_User_Profile_Url + "_" + this.state.JM_ID)
   
   this.setState({
    btnUploadVideo:'Uploading...',
    btnUploadVideoDisabled:true
   })
    fetch(API_url,
      {
        method: 'post',
        headers: {"authorization": API.getAuth(),"id":API.getId()},
        body: formData
      })
      .then((response) => response.json())
      .then(async data1 => {
        if (data1.status === 1) 
        {
          const data=await API.decryptJson(data1.flag);
          this.setState({ showSuccess: true, message: 'Profile is Successfully Updated' });
          this.setState({ showError: false });
          this.setState({ userThemeDetails: data.userThemeDetails });
          this.setState({
            btnUploadVideo:'Upload a video',
            btnUploadVideoDisabled:false
           })
          //userThemeDetails
          this.FetchCustomTheme();
          this.refreshMobileView();
        }
        else {
          this.setState({ showError: true, message: 'Failed to Update profile, try agian after Sometimes' });
          this.setState({ showSuccess: false });
        }
      });
  }
  saveCustomTheme = (event) => {

    event.preventDefault();
    var JSONdata = {
      TM_ID: 0,
      JM_ID: this.state.JM_ID,
      TM_Back_Color: this.state.activeItemBGcolor,
      TM_Item_Color: this.state.activeItemcolor,
      TM_Back_Image: "",
      TM_Item_Style: this.state.activeButtonStyle,
      TM_Highlight_Color: this.state.activeHighlightcolor,
      TM_Font: this.state.activeFontStyle,
      TM_Font_Color: this.state.activeFontcolor,
      TM_Active: 1,
      TM_Class_Name: this.state.Custom_template1,
      JM_Description: this.state.JM_Description
    };

    const formData = new FormData();

    const API_url = this.state.base_url + "admin/updateCustomTheme";
    formData.append('sampleFile', this.state.selectedFile)
    formData.append('TM_ID', 0)
    formData.append('JM_ID', this.state.JM_ID)
    formData.append('TM_Back_Color', this.state.activeItemBGcolor)
    formData.append('TM_Item_Color', this.state.activeItemcolor)
    formData.append('TM_Back_Image', "")
    formData.append('TM_Item_Style', this.state.activeButtonStyle)
    formData.append('TM_Highlight_Color', this.state.activeHighlightcolor)
    formData.append('TM_Font', this.state.activeFontStyle)
    formData.append('TM_Font_Color', this.state.activeFontcolor)
    formData.append('TM_Class_Name', this.state.Custom_template1)
    formData.append('TM_Active', 1)
    formData.append('JM_Description', this.state.JM_Description)
    formData.append('JM_User_Profile_Url_plus_JM_ID', this.state.userDetails[0].JM_User_Profile_Url + "_" + this.state.JM_ID)

    fetch(API_url,
      {
        method: 'post',
        body: formData,
      })
      .then((response) => response.json())
      .then(data => {
        if (data.status === 1) {
          this.setState({ showSuccess: true, message: 'Profile is Successfully Updated' });
          this.setState({ showError: false });
          this.setState({ userThemeDetails: data.userThemeDetails });

          //userThemeDetails
          this.FetchCustomTheme();
          this.refreshMobileView();
        }
        else {
          this.setState({ showError: true, message: 'Failed to Update profile, try agian after Sometimes' });
          this.setState({ showSuccess: false });
        }
      });

    //console.log(JSONdata);
  }

  FetchCustomTheme = () => {

    //console.log(this.state.userThemeDetails);

    let activeItemBGcolor = "", activeButtonStyle = '', activeItemcolor = '', activeHighlightcolor = '', activeFontStyle = '', activeFontcolor = '';
    let activeBordercolor='',activeButtonEffectStyle='',activeNameSize='',activeBioSize='';
    let activeIconcolor='',activeSocialWidgetcolor='';
    if (this.state.userThemeDetails && this.state.userThemeDetails.length > 0) {

      let len = this.state.userThemeDetails.length;
      for (var i = 0; i < len; i++) {
        activeItemBGcolor = this.state.userThemeDetails[i].TM_Back_Color;
        activeItemcolor = this.state.userThemeDetails[i].TM_Item_Color;
        activeButtonStyle = this.state.userThemeDetails[i].TM_Item_Style;
        
        activeHighlightcolor = this.state.userThemeDetails[i].TM_Highlight_Color;
        activeFontStyle = this.state.userThemeDetails[i].TM_Font;
        activeFontcolor = this.state.userThemeDetails[i].TM_Font_Color;
        activeBordercolor = this.state.userThemeDetails[i].TM_Border_Color;
        activeButtonEffectStyle = this.state.userThemeDetails[i].TM_Item_Effect;
        activeNameSize = this.state.userThemeDetails[i].TM_Name_Size;
        activeBioSize = this.state.userThemeDetails[i].TM_Bio_Size;
        activeIconcolor= this.state.userThemeDetails[i].TM_Thumbnail_Icon_Color;
        activeSocialWidgetcolor=this.state.userThemeDetails[i].TM_SocialWidget_Icon_Color;
        break;
      }

    }
    this.setState({
      dynamicColor: activeItemBGcolor,
      dynamicItemColor: activeItemcolor,
      dynamicFontColor: activeFontcolor,
      dynamicHighlightColor: activeHighlightcolor,
      dynamicBorderColor:activeBordercolor,
      dynamicIconColor:activeIconcolor,
      dynamicSocialWidgetcolor:activeSocialWidgetcolor,
      activeItemBGcolor, activeItemcolor, activeButtonStyle, activeHighlightcolor, activeFontStyle, activeFontcolor,
      activeBordercolor,activeButtonEffectStyle,
      activeNameSize,activeBioSize,activeIconcolor,activeSocialWidgetcolor

    });

    //document.getElementById('custom_color_bg').style.background= activeItemBGcolor;
    // var labelText='Some Value';
    // document.getElementById("custom_color_bg").setAttribute('data-color', '{' + activeItemBGcolor + '}' ); 
  }

  imageonChange = (e) => {
    const file = e.target.files[0];
    if(typeof file!=='undefined')
    {
      this.setState({ selectedFile: e.target.files[0] });
      this.setState({
        TM_Back_Image: URL.createObjectURL(file)
      });
  
      this.setState({
        selectedFile: file
      }, () => {
        //console.log(this.state.selectedFile);
        this.uploadBackgroundImage();
  
      });
    }
    

  }
  // MS2
  videoonChange = (e) => {
    const file = e.target.files[0];
    this.setState({ selectedFile: e.target.files[0] });
    this.setState({
      TM_Back_Video: URL.createObjectURL(file)
    });

    this.setState({
      selectedFileVideo: file
    }, () => {
      //console.log(this.state.selectedFileVideo);
      this.uploadBackgroundVideo();

    });

  }
  handleOnBlurDescription = () => {
    //alert();

    this.reload();
  }
  refreshMobileView = () => {
    this.refs.livepreview.UpdateMobileView();
  }
  updateBackgroundImage = id => e => {

    const formData = new FormData();
    const API_url = process.env.REACT_APP_API_URL + "admin/removeBackgroundImage";

    formData.append('JM_ID', id)
    formData.append('TM_Active', 1)
    formData.append('JM_User_Profile_Url_plus_JM_ID', this.state.userDetails[0].JM_User_Profile_Url + "_" + this.state.JM_ID)
    fetch(API_url,
      {
        method: 'post',
        headers: {"authorization": API.getAuth(),"id":API.getId()},
        body: formData,
        
      })
      .then((response) => response.json())
      .then(data1 => {
        if (data1.status === 1) {
          //document.getElementById('bg_image').src="";
          const data=API.decryptJson(data1.flag);
        //  let userThemeDetails=data.userThemeDetails;
          this.setState({ showSuccess: true,
             message: 'Profile is Successfully Updated',
          showError: false ,userThemeDetails:data.userThemeDetails,
          selectedFile:null,
          TM_Back_Video:'',
          TM_Back_Image:''
        
        });
        //upVideo
            document.getElementById('upVideo').value=''
          //userThemeDetails
          this.FetchCustomTheme();
          this.refreshMobileView();
        }
        else {
          this.setState({ showError: true, message: 'Failed to Update profile, try agian after Sometimes' });
          this.setState({ showSuccess: false });
        }
      });
  }
  render() {

    const useStyles = {
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
    const CssAlert = {
      success: {
        backgroundColor: '#78e27869',
        color: 'black',
      },
      error: {
        backgroundColor: '#ef276045',
        color: 'black',
      },
      warning: {
        backgroundColor: '#5bdc6240',
        color: 'black',
      },
      info: {
        backgroundColor: '#f1bf1f59',
        color: 'black',
      },
    }
    // var fontStyle="'Noto Sans TC', sans-serif ";
    var h=window.screen.height;
    var w=window.screen.width;
    let position='';
    if(w >= 480) 
    {
      position='right';
    }
    else
    {
      position='top';
    }
    const themePopOver = (
      <Popover id="popover-basic"  style={{zIndex:'99999',color:'#fff'}}>      
        <Popover.Title as="h6" style={{backgroundColor:'#7504f8'}}>
           Choose a premade theme for your page with one click.
        </Popover.Title>
        {/* <Popover.Content>         
        </Popover.Content>     */}       
      </Popover>
    );
    const backgroundPopOver = (
      <Popover id="popover-basic" style={{zIndex:'99999',color:'#fff'}}>      
        <Popover.Title as="h6" style={{backgroundColor:'#7504f8'}}>
        Choose or upload a custom Background.
        
        </Popover.Title>
        {/* <Popover.Content>         
        </Popover.Content>     */}       
      </Popover>
    );
    const itemPopOver = (
      <Popover id="popover-basic" style={{zIndex:'99999',color:'#fff'}}>      
        <Popover.Title as="h6" style={{backgroundColor:'#7504f8'}}>
        Customize Item shape, colors and more.
        </Popover.Title>
        {/* <Popover.Content>         
        </Popover.Content>     */}       
      </Popover>
    );
    const highlightPopOver = (
      <Popover id="popover-basic" style={{zIndex:'99999',color:'#fff'}}>      
        <Popover.Title as="h6" style={{backgroundColor:'#7504f8'}}>
            Choose color for icons and action buttons.
        </Popover.Title>
        {/* <Popover.Content>         
        </Popover.Content>     */}       
      </Popover>
    );
    const textPopOver = (
      <Popover id="popover-basic" style={{zIndex:'99999',color:'#fff'}}>      
        <Popover.Title as="h6" style={{backgroundColor:'#7504f8'}}>
              Change Text font, color and more.
        </Popover.Title>
        {/* <Popover.Content>         
        </Popover.Content>     */}       
      </Popover>
    );
    
    return (
      <>
       <Helmet>
            <title>Design | Expy </title>
            <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta>
        </Helmet>
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
       
        <div className="template1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-12">
                <Tab2.Container id="left-tabs-example" defaultActiveKey="first">
                  <div className="appar-left">
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>                     
                               <OverlayTrigger  placement={position} overlay={themePopOver} >
                                    <Nav.Link eventKey="first"><BurstModeOutlinedIcon /> Theme</Nav.Link>
                              </OverlayTrigger > 
                      </Nav.Item>
                      <Nav.Item>                        
                            <OverlayTrigger   placement={position}   overlay={backgroundPopOver} >
                                 <Nav.Link eventKey="second"><SettingsOverscanOutlinedIcon /> Background</Nav.Link>
                              </OverlayTrigger >
                      </Nav.Item>
                      <Nav.Item>
                            <OverlayTrigger  placement={position}   overlay={itemPopOver} >
                               <Nav.Link eventKey="third"><CategoryOutlinedIcon /> Items</Nav.Link>
                              </OverlayTrigger >
                      </Nav.Item>
                      <Nav.Item> 
                              <OverlayTrigger  placement={position}  overlay={highlightPopOver} >
                                  <Nav.Link eventKey="fourth"><WbIridescentOutlinedIcon /> Icons</Nav.Link>
                              </OverlayTrigger >
                      </Nav.Item>
                      <Nav.Item>                     
                              <OverlayTrigger  placement={position}  overlay={textPopOver} >
                                 <Nav.Link eventKey="fifth"><TextFieldsOutlinedIcon /> Text</Nav.Link>
                              </OverlayTrigger >
                      </Nav.Item>
                    </Nav>
                  </div>
                  <div className="appar-right">
                    <Tab2.Content>
                      <Tab2.Pane eventKey="first">
                        <div className="appear-body">
                          <div className="appear">
                            <div className="theme">
                              <div className="row">
                                {
                                  this.state.themeMaster && this.state.themeMaster.map((theme, i) => (
                                    <div className="col-md-6">
                                      <div className="item">
                                        <img src={process.env.REACT_APP_UPLOAD_URL + theme.TM_Back_Image} alt="background" />
                                        <div className="text">
                                          <h3 style={{ fontFamily: theme.TM_Font }}>Aa </h3>
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
                      </Tab2.Pane>
                      <Tab2.Pane eventKey="second">
                        <div className="template1_body">
                          <div className="heading">
                            <h5>Upload your background image</h5>
                            <p>Pick your overall background image <br/>
                            <span style={{fontSize:'12px'}}>
                                (Recommended size 1920px * 1080px)
                              </span>
                              </p>      
                          </div>
                          <div className="item">
                            <div className="row">
                              {
                                this.state.userThemeDetails.length > 0 && this.state.userThemeDetails[0].TM_Back_Image ?
                                  <div className="col-md-12">
                                    <div className="color-box">                                
                                          {
                                          this.state.userThemeDetails[0].TM_Back_Image!='' 
                                          && ( this.state.userThemeDetails[0].TM_Back_Image.includes('.jpg') 
                                          || this.state.userThemeDetails[0].TM_Back_Image.includes('.png')
                                          || this.state.userThemeDetails[0].TM_Back_Image.includes('.jpeg')
                                          || this.state.userThemeDetails[0].TM_Back_Image.includes('.gif') ) ?
                                            <>
                                              <img id="bg_image" src={process.env.REACT_APP_UPLOAD_URL + this.state.userThemeDetails[0].TM_Back_Image} style={{ border: 'none', width: '100%',position:'absolute' }} /> 
                                              <span className="closeBackground" onClick={this.updateBackgroundImage(this.state.userThemeDetails[0].JM_ID)}><HighlightOffIcon /></span>
                                             </>
                                          :
                                             null
                                          }
                                    </div>
                                  </div>
                                  :
                                  null
                              }
                              <div className="col-md-12">
                                <div className="color-box">
                                  <img src={this.state.TM_Back_Image} style={{ border: 'none', width: '100%' }} />
                                  <label className="up-ico" for="upImage">
                                    Upload an Image
                                    <input type="file" id="upImage" accept=".jpeg,.jpg,.png" style={{ display: "none" }} onChange={this.imageonChange} />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                         
                          <div className="heading">
                            <h5>Select your background color</h5>
                            <p>Choose your background color</p>
                          </div>
                          <div className="item">                           
                              <div className="part">
                                <div data-color="#011627" data-index="1" data-test={'hiii'}
                                  className={this.state.activeItemBGcolor === "#011627" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                  onClick={this.setActiveClass('bg')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#2ec4b6" data-index="2" className={this.state.activeItemBGcolor === "#2ec4b6" ? 'color-box bg_2 active' : 'color-box bg_2'}
                                  onClick={this.setActiveClass('bg')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#e71d36" data-index="3" className={this.state.activeItemBGcolor === "#e71d36" ? 'color-box bg_3 active' : 'color-box bg_3'}
                                  onClick={this.setActiveClass('bg')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#ff9f1c" data-index="4" className={this.state.activeItemBGcolor === "#ff9f1c" ? 'color-box bg_4 active' : 'color-box bg_4'}
                                  onClick={this.setActiveClass('bg')}>
                                </div>
                              </div>
                         
                          {/* gradiend color */}

                               <div className="part mr0">
                                  <div  data-color="#23ab34" className={this.state.activeItemBGcolor === "#23ab34" ? 'color-box bg_5 active' : 'color-box bg_5'}
                                   onClick={this.setActiveClass('bg')}>
                                  </div>
                                </div>
                                <div className="part">
                                  <div  data-color="linear-gradient(180deg,  #9c14fc 0%, #7604f9 100%)" className={this.state.activeItemBGcolor === "linear-gradient(180deg,  #9c14fc 0%, #7604f9 100%)" ? 'color-box bg_6 active' : 'color-box bg_6'}
                                   onClick={this.setActiveClass('bg')}>
                                  </div>
                                </div>
                                <div className="part">
                                  <div  data-color="linear-gradient(180deg,  #2293d7 0%, #1ed2ed 100%)" className={this.state.activeItemBGcolor === "linear-gradient(180deg,  #2293d7 0%, #1ed2ed 100%)" ? 'color-box bg_7 active' : 'color-box bg_7'}
                                   onClick={this.setActiveClass('bg')}>
                                  </div>
                                </div>
                                <div className="part">
                                  <div  data-color="linear-gradient(180deg,  #f66a08 0%, #f50f2c 100%)" className={this.state.activeItemBGcolor === " linear-gradient(180deg,  #f66a08 0%, #f50f2c 100%)" ? 'color-box bg_8 active' : 'color-box bg_8'}
                                   onClick={this.setActiveClass('bg')}>
                                  </div>
                                </div>
                                <div className="part">
                                  <div  data-color="linear-gradient(180deg,  #19c4f2 0%, #7008fb 100%)" className={this.state.activeItemBGcolor === "linear-gradient(180deg,  #19c4f2 0%, #7008fb 100%)" ? 'color-box bg_9 active' : 'color-box bg_9'}
                                   onClick={this.setActiveClass('bg')}>
                                  </div>
                                </div>
                                <div className="part mr0">
                                  <div  data-color="linear-gradient(180deg,  #7c15fa 0%, #f21890 100%)" className={this.state.activeItemBGcolor === "linear-gradient(180deg,  #7c15fa 0%, #f21890 100%)" ? 'color-box bg_10 active' : 'color-box bg_10'}
                                   onClick={this.setActiveClass('bg')}>
                                  </div>
                                </div>


                                <div className="part">
                                  <div  data-color="linear-gradient(180deg,  #fb754f 0%, #f39911 100%)" className={this.state.activeItemBGcolor === "linear-gradient(180deg,  #fb754f 0%, #f39911 100%)" ? 'color-box bg_11 active' : 'color-box bg_11'}
                                   onClick={this.setActiveClass('bg')}>
                                  </div>
                                </div>
                                <div className="part">
                                  <div  data-color="linear-gradient(180deg,  #fb6ca2 0%, #fd8877 100%)" className={this.state.activeItemBGcolor === "linear-gradient(180deg,  #fb6ca2 0%, #fd8877 100%)" ? 'color-box bg_12 active' : 'color-box bg_12'}
                                   onClick={this.setActiveClass('bg')}>
                                  </div>
                                </div>

                                <div className="part">
                                  <div  data-color="linear-gradient(180deg,  #ffff00 0%, #54a000 100%)" className={this.state.activeItemBGcolor === "linear-gradient(180deg,  #ffff00 0%, #54a000 100%)" ? 'color-box bg_13 active' : 'color-box bg_13'}
                                   onClick={this.setActiveClass('bg')}>
                                  </div>
                                </div>


                                <div className="part">
                                  <div  data-color="linear-gradient(180deg,  #27a2e4 0%, #0a2437 100%)" className={this.state.activeItemBGcolor === "linear-gradient(180deg,  #27a2e4 0%, #0a2437 100%)" ? 'color-box bg_14 active' : 'color-box bg_14'}
                                   onClick={this.setActiveClass('bg')}>
                                  </div>
                                </div>
                                


                            {/* gradiend color */}
                              <div className="part mr0">
                                <div className={this.state.activeItemBGcolor === this.state.dynamicColor ? 'color-box color-pick active' : 'color-box color-pick'}
                                  data-color={this.state.dynamicColor} style={{ backgroundColor: this.state.activeItemBGcolor }} data-index="6" id="custom_color_bg" onClick={this.openColorPicker('bg')}>
                                  <label>
                                    <input type="color" id="color-picker_bg" onChange={this.changeColor('bg')} />
                                    <AddBoxOutlinedIcon />
                                  </label>
                                </div>
                          
                              </div>
                           </div>
                      {/* upload video background */}
                      <div className="heading">
                              <h5>Upload your background Video</h5>
                              <p>Pick your overall background Video <br/>
                              <span style={{fontSize:'12px'}}>
                                  (Recommended size 5mb)
                                </span>
                                </p>      
                            </div>
                            <div className="item">
                              <div className="row">
                                {
                                  this.state.userThemeDetails.length > 0 && this.state.userThemeDetails[0].TM_Back_Image ?
                                    <div className="col-md-12">
                                       <div className="color-box" style={{minHeight: '80px',height: 'auto'}}>
                              
                                          {
                                            this.state.userThemeDetails[0].TM_Back_Image!=='' 
                                            && ( this.state.userThemeDetails[0].TM_Back_Image.includes('.mp4') 
                                            || this.state.userThemeDetails[0].TM_Back_Image.includes('.mov')
                                              ) ?
                                            <>
                                              {/* <video controls src={process.env.REACT_APP_UPLOAD_URL + this.state.userThemeDetails[0].TM_Back_Image} style={{ border: 'none', width: '100%'}} /> */}
                                              <video preload="true" playsinline="true" controls style={{ border: 'none', width: '100%'}}>
                                                <source src={process.env.REACT_APP_UPLOAD_URL + this.state.userThemeDetails[0].TM_Back_Image}  type="video/mp4" />
                                              </video>
                                              <span className="closeBackground" onClick={this.updateBackgroundImage(this.state.userThemeDetails[0].JM_ID)}><HighlightOffIcon /></span>                                          
                                            </>
                                            :
                                            null
                                            }
                                   
                                     
                                      </div>
                                    </div>
                                    :
                                    null
                                }
                                <div className="col-md-12">
                                  <div className="color-box" style={{minHeight: '80px',height: 'auto'}}>

                                    <video controls playsinline="true" src={this.state.TM_Back_Video} style={{ border: 'none', width: '100%' }} />
                                  
                                    <label className="up-ico" for="upVideo"    style={{top:'38%'}}>
                                    {this.state.btnUploadVideo}
                                      <input type="file" id="upVideo" accept=".mp4" disabled={this.state.btnUploadVideoDisabled} style={{ display: "none" }} onChange={this.videoonChange} />
                                    </label>

                                  </div>
                                </div>
                              </div>
                            </div>
                           {/* end of video background */}
                    
                        </div>
                      </Tab2.Pane>
                      <Tab2.Pane eventKey="third">
                        <div className="template1_body">
                          <div className="heading">
                            <h5>Button Shape</h5>
                            <p>Chose the item button shape</p>
                          </div>
                          <div className="item">
                            <div className="row">
                              <div className="col-md-6">
                                <div data-shape="style_sharp" data-index="1" className={this.state.activeButtonStyle === "style_sharp" ? "button-box active" : "button-box"}
                                  onClick={this.setButtonStyleActive('button')}>
                                  <div className="btun style_sharp">

                                    Sharp
                                                            </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div data-shape="style_rounded" data-index="2" className={this.state.activeButtonStyle === "style_rounded" ? 'button-box active' : 'button-box'}
                                  onClick={this.setButtonStyleActive('button')}>
                                  <div className="btun style_rounded" >
                                    Round
                                                            </div>

                                </div>
                              </div>
                              <div className="col-md-6">
                                <div data-shape="style_pill" data-index="3" className={this.state.activeButtonStyle === "style_pill" ? 'button-box active' : 'button-box'}
                                  onClick={this.setButtonStyleActive('button')}>
                                  <div className="btun style_pill">

                                   Cylinder 
                                                            </div>
                                </div>
                              </div>
                              {/* <div className="col-md-6">
                                <div data-shape="style_push" data-index="1" className={this.state.activeButtonStyle === "style_push" ? "button-box active" : "button-box"}
                                  onClick={this.setButtonStyleActive('button')}>
                                  <div className="btun style_push">

                                  Shadow 
                                                            </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div data-shape="style_rainbow" data-index="2" className={this.state.activeButtonStyle === "style_rainbow" ? 'button-box active' : 'button-box'}
                                  onClick={this.setButtonStyleActive('button')}>
                                  <div className="btun style_rainbow" >
                                    Colorful 
                                    </div>

                                </div>
                              </div>
                              <div className="col-md-6">
                                <div data-shape="style_Shine" data-index="3" className={this.state.activeButtonStyle === "style_Shine" ? 'button-box active' : 'button-box'}
                                  onClick={this.setButtonStyleActive('button')}>
                                  <div className="btun style_Shine">

                                  Shiny 
                                              </div>
                                </div>
                              </div> */}

                              <div className="col-md-6">
                                <div data-shape="style_mixed_corners" data-index="1" className={this.state.activeButtonStyle === "style_mixed_corners" ? "button-box active" : "button-box"}
                                  onClick={this.setButtonStyleActive('button')}>
                                      <div className="btun style_mixed_corners">
                                      Mixed Corners 
                                    </div>
                                </div>
                              </div>


                            </div>
                          </div>
                          <div className="heading">
                            <h5>Button Effect</h5>
                            <p>Choose the item button effect</p>
                          </div>
                          <div className="item">
                              <div className="row"> 
                              <div className="col-md-6">
                                  <div className="button-box"  data-shape="effect_push" className={this.state.activeButtonEffectStyle === "effect_push" ? "button-box active" : "button-box"}
                                     onClick={this.setButtonStyleActive('buttonEffect')}>
                                    <div className="btun effect_push">
                                      Shadow
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="button-box"  data-shape="effect_rainbow" className={this.state.activeButtonEffectStyle === "effect_rainbow" ? "button-box active" : "button-box"}
                                    onClick={this.setButtonStyleActive('buttonEffect')}>
                                    <div className="btun effect_rainbow">
                                    Colorful
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="button-box" data-shape="effect_Shine" className={this.state.activeButtonEffectStyle === "effect_Shine" ? "button-box active" : "button-box"}
                                    onClick={this.setButtonStyleActive('buttonEffect')}>
                                    <div className="btun effect_Shine">
                                      Shiny
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="button-box" data-shape="effect_td" className={this.state.activeButtonEffectStyle === "effect_td" ? "button-box active" : "button-box"}
                                    onClick={this.setButtonStyleActive('buttonEffect')}>
                                    <div className="btun effect_td" >
                                      3D
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="button-box" data-shape="effect_door" className={this.state.activeButtonEffectStyle === "effect_door" ? "button-box active" : "button-box"}
                                      onClick={this.setButtonStyleActive('buttonEffect')}>
                                    <div className="btun effect_door" >
                                      Door Open
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="button-box" data-shape="effect_increase" className={this.state.activeButtonEffectStyle === "effect_increase" ? "button-box active" : "button-box"}
                                      onClick={this.setButtonStyleActive('buttonEffect')}>
                                    <div className="btun effect_increase" >
                                    Increase
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="button-box" data-shape="effect_soft_shadow" className={this.state.activeButtonEffectStyle === "effect_soft_shadow" ? "button-box active" : "button-box"}
                                      onClick={this.setButtonStyleActive('buttonEffect')}>
                                    <div className="btun effect_soft_shadow" >
                                    Soft Shadow
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="button-box" data-shape="effect_hard_shadow" className={this.state.activeButtonEffectStyle === "effect_hard_shadow" ? "button-box active" : "button-box"}
                                      onClick={this.setButtonStyleActive('buttonEffect')}>
                                    <div className="btun effect_hard_shadow" >
                                    Hard Shadow
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="button-box" data-shape="effect_inner_shadow" className={this.state.activeButtonEffectStyle === "effect_inner_shadow" ? "button-box active" : "button-box"}
                                      onClick={this.setButtonStyleActive('buttonEffect')}>
                                    <div className="btun effect_inner_shadow" >
                                    Inner Shadow
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="button-box" data-shape="effect_transparent" className={this.state.activeButtonEffectStyle === "effect_transparent" ? "button-box active" : "button-box"}
                                      onClick={this.setButtonStyleActive('buttonEffect')}>
                                    <div className="btun effect_transparent" >
                                    Transparent
                                    </div>
                                  </div>
                                </div>

                              </div>
                          </div>


                          <div className="heading">
                            <h5>Button Color</h5>
                            <p>Choose the item button color</p>
                          </div>
                          <div className="item">
                                          <div className="part">
                                            <div data-color="#011627" data-index="1" className={this.state.activeItemcolor === "#011627" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                              onClick={this.setActiveClass('item')}>
                                            </div>
                                          </div>
                                          <div className="part">
                                            <div data-color="#2ec4b6" data-index="2" className={this.state.activeItemcolor === "#2ec4b6" ? 'color-box bg_2 active' : 'color-box bg_2'}
                                              onClick={this.setActiveClass('item')}>
                                            </div>
                                          </div>
                                          <div className="part">
                                            <div data-color="#e71d36" data-index="3" className={this.state.activeItemcolor === "#e71d36" ? 'color-box bg_3 active' : 'color-box bg_3'}
                                              onClick={this.setActiveClass('item')}>
                                            </div>
                                          </div>
                                          <div className="part">
                                            <div data-color="#ff9f1c" data-index="4" className={this.state.activeItemcolor === "#ff9f1c" ? 'color-box bg_4 active' : 'color-box bg_4'}
                                              onClick={this.setActiveClass('item')}>
                                            </div>
                                          </div>
                                          <div className="part mr0">
                                            <div className={this.state.activeItemcolor === this.state.dynamicItemColor ? 'color-box color-pick active' : 'color-box color-pick'}
                                                data-color={this.state.dynamicItemColor} style={{ backgroundColor: this.state.activeItemcolor }}
                                                data-index="6" id="custom_color_item" onClick={this.openColorPicker('item')}>
                                                <label>
                                                  <input type="color" id="color-picker_item" onChange={this.changeColor('item')} />
                                                  <AddBoxOutlinedIcon/>
                                                </label>
                                              </div>
                                          </div>

                          </div>
                     
                                                

                                                   {/* border color */}
                                <div className="heading">
                                  <h5>Border Color</h5>
                                  <p>Choose the item border color</p>
                                </div>

                                  <div className="item">
                                      <div className="part">
                                        <div data-color="#011627" data-index="1" className={this.state.activeBordercolor === "#011627" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                          onClick={this.setActiveClass('border')}>
                                        </div>
                                      </div>
                                      <div className="part">
                                        <div data-color="#2ec4b6" data-index="2" className={this.state.activeBordercolor === "#2ec4b6" ? 'color-box bg_2 active' : 'color-box bg_2'}
                                          onClick={this.setActiveClass('border')}>
                                        </div>
                                      </div>
                                      <div className="part">
                                        <div data-color="#e71d36" data-index="3" className={this.state.activeBordercolor === "#e71d36" ? 'color-box bg_3 active' : 'color-box bg_3'}
                                          onClick={this.setActiveClass('border')}>
                                        </div>
                                      </div>
                                      <div className="part">
                                        <div data-color="#ff9f1c" data-index="4" className={this.state.activeBordercolor === "#ff9f1c" ? 'color-box bg_4 active' : 'color-box bg_4'}
                                          onClick={this.setActiveClass('border')}>
                                        </div>
                                      </div>
                                      <div className="part mr0">
                                      <div className={this.state.activeBordercolor === this.state.dynamicBorderColor ? 'color-box color-pick active' : 'color-box color-pick'}
                                            data-color={this.state.dynamicBorderColor} style={{ backgroundColor: this.state.activeBordercolor }}
                                            data-index="6" id="custom_color_border" onClick={this.openColorPicker('border')}>
                                            <label>
                                                <input type="color" id="color-picker_border" onChange={this.changeColor('border')} />
                                              <AddBoxOutlinedIcon/>
                                            </label>
                                          </div>
                                      </div>
                                </div>
                               {/* end */}


                        </div>
                      </Tab2.Pane>
                      <Tab2.Pane eventKey="fourth">
                        <div className="template1_body">
                          <div className="heading">
                            <h5>Action buttons </h5>
                            <p>Choose the color used for action buttons (like "View", "Buy")</p>
                          </div>
                           <div className="item">                          
                              <div className="part">
                                <div data-color="#011627" data-index="1" className={this.state.activeHighlightcolor === "#011627" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                  onClick={this.setActiveClass('highlight')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#2ec4b6" data-index="2" className={this.state.activeHighlightcolor === "#2ec4b6" ? 'color-box bg_2 active' : 'color-box bg_2'}
                                  onClick={this.setActiveClass('highlight')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#e71d36" data-index="3" className={this.state.activeHighlightcolor === "#e71d36" ? 'color-box bg_3 active' : 'color-box bg_3'}
                                  onClick={this.setActiveClass('highlight')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#ff9f1c" data-index="4" className={this.state.activeHighlightcolor === "#ff9f1c" ? 'color-box bg_4 active' : 'color-box bg_4'}
                                  onClick={this.setActiveClass('highlight')}>
                                </div>
                              </div>
                              <div className="part mr0">
                                            <div className={this.state.activeHighlightcolor === this.state.dynamicHighlightColor ? 'color-box color-pick active' : 'color-box color-pick' }
                                              data-color={this.state.dynamicHighlightColor} style={{ backgroundColor: this.state.activeHighlightcolor }} data-index="6" id="custom_color_highlight" onClick={this.openColorPicker('highlight')}>
                                                            <label>
                                                  <input type="color" id="color-picker_highlight" onChange={this.changeColor('highlight')} />
                              
                                                  <AddBoxOutlinedIcon/>
                                                </label>
                                              </div>
{/* 
                                <div className={this.state.activeHighlightcolor === this.state.dynamicHighlightColor ? 'color-box color-pick active' : 'color-box color-pick' }
                                  data-color={this.state.dynamicHighlightColor} style={{ backgroundColor: this.state.activeHighlightcolor }} data-index="6" id="custom_color_highlight" onClick={this.openColorPicker('highlight')}>
                                  <input type="color" className="invisibleCustom" id="color-picker_highlight" onChange={this.changeColor('highlight')} />
                                </div> */}
                              </div>
                            </div>
                             {/* thumbnail icons */}
                            <div className="heading">
                              <h5>Link thumbnail icons</h5>
                              <p>Choose the color used for thumbnail icons</p>
                            </div>
                            <div className="item">                          
                              <div className="part">
                                <div data-color="#011627" data-index="1" className={this.state.activeIconcolor === "#011627" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                  onClick={this.setActiveClass('thumbIcon')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#2ec4b6" data-index="2" className={this.state.activeIconcolor === "#2ec4b6" ? 'color-box bg_2 active' : 'color-box bg_2'}
                                  onClick={this.setActiveClass('thumbIcon')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#e71d36" data-index="3" className={this.state.activeIconcolor === "#e71d36" ? 'color-box bg_3 active' : 'color-box bg_3'}
                                  onClick={this.setActiveClass('thumbIcon')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#ff9f1c" data-index="4" className={this.state.activeIconcolor === "#ff9f1c" ? 'color-box bg_4 active' : 'color-box bg_4'}
                                  onClick={this.setActiveClass('thumbIcon')}>
                                </div>
                              </div>
                              <div className="part mr0">
                                  <div className={this.state.activeIconcolor === this.state.dynamicIconColor ? 'color-box color-pick active' : 'color-box color-pick' }
                                    data-color={this.state.dynamicIconColor} style={{ backgroundColor: this.state.activeIconcolor }} data-index="6" id="custom_color_thumbIcon" onClick={this.openColorPicker('thumbIcon')}>
                                                  <label>
                                        <input type="color" id="color-picker_thumbIcon" onChange={this.changeColor('thumbIcon')} />
                    
                                        <AddBoxOutlinedIcon/>
                                      </label>
                                    </div>
                              </div>
                            </div>     
                            {/* end thumbnail icons */}
                              {/* social widget icons color */}
                              <div className="heading">
                              <h5>Social widget icons</h5>
                              <p>Choose the color used for social widget icons</p>
                            </div>
                            <div className="item">                          
                              <div className="part">
                                <div data-color="#011627" data-index="1" className={this.state.activeSocialWidgetcolor === "#011627" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                  onClick={this.setActiveClass('socialWidgetIcon')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#2ec4b6" data-index="2" className={this.state.activeSocialWidgetcolor === "#2ec4b6" ? 'color-box bg_2 active' : 'color-box bg_2'}
                                  onClick={this.setActiveClass('socialWidgetIcon')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#e71d36" data-index="3" className={this.state.activeSocialWidgetcolor === "#e71d36" ? 'color-box bg_3 active' : 'color-box bg_3'}
                                  onClick={this.setActiveClass('socialWidgetIcon')}>
                                </div>
                              </div>
                              <div className="part">
                                <div data-color="#ff9f1c" data-index="4" className={this.state.activeSocialWidgetcolor === "#ff9f1c" ? 'color-box bg_4 active' : 'color-box bg_4'}
                                  onClick={this.setActiveClass('socialWidgetIcon')}>
                                </div>
                              </div>
                              <div className="part mr0">
                                  <div className={this.state.activeSocialWidgetcolor === this.state.dynamicSocialWidgetcolor? 'color-box color-pick active' : 'color-box color-pick' }
                                    data-color={this.state.dynamicSocialWidgetcolor} style={{ backgroundColor: this.state.activeSocialWidgetcolor }} data-index="6" id="custom_color_socialWidgetIcon" onClick={this.openColorPicker('socialWidgetIcon')}>
                                                  <label>
                                        <input type="color" id="color-picker_socialWidgetIcon" onChange={this.changeColor('socialWidgetIcon')} />
                    
                                        <AddBoxOutlinedIcon/>
                                      </label>
                                    </div>
                              </div>
                            </div> 
                         </div>
                      </Tab2.Pane>
                      <Tab2.Pane eventKey="fifth">
                        <div className="template1_body">
                          <div className="heading">
                            <h5>Text Style</h5>
                            <p>Choose the font of the text for your page</p>
                          </div>
                          <div className="item">
                                        <div className="row">
                                          <div className="col-md-4">
                                            <div data-shape="font_style_1" data-index="1" className={this.state.activeFontStyle === "font_style_1" ? 'font-box font_style_1  active' : 'font-box font_style_1'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                          </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_2" data-index="2" className={this.state.activeFontStyle === "font_style_2" ? 'font-box font_style_2  active' : 'font-box font_style_2'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                          </div>

                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_3" data-index="3" className={this.state.activeFontStyle === "font_style_3" ? 'font-box font_style_3  active' : 'font-box font_style_3'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                          </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_4" data-index="4" className={this.state.activeFontStyle === "font_style_4" ? 'font-box font_style_4  active' : 'font-box font_style_4'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_5" data-index="5" className={this.state.activeFontStyle === "font_style_5" ? 'font-box font_style_5  active' : 'font-box font_style_5'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_6" data-index="6" className={this.state.activeFontStyle === "font_style_6" ? 'font-box font_style_6  active' : 'font-box font_style_6'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                            </div>
                                          </div>


                                          <div className="col-md-4">
                                            <div data-shape="font_style_7" data-index="7" className={this.state.activeFontStyle === "font_style_7" ? 'font-box font_style_7  active' : 'font-box font_style_7'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_8" data-index="8" className={this.state.activeFontStyle === "font_style_8" ? 'font-box font_style_8  active' : 'font-box font_style_8'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_9" data-index="9" className={this.state.activeFontStyle === "font_style_9" ? 'font-box font_style_9  active' : 'font-box font_style_9'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                            </div>
                                          </div>



                                          <div className="col-md-4">
                                            <div data-shape="font_style_10" data-index="10" className={this.state.activeFontStyle === "font_style_10" ? 'font-box font_style_10  active' : 'font-box font_style_10'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div data-shape="font_style_11" data-index="11" className={this.state.activeFontStyle === "font_style_11" ? 'font-box font_style_11  active' : 'font-box font_style_11'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div data-shape="font_style_12" data-index="12" className={this.state.activeFontStyle === "font_style_12" ? 'font-box font_style_12  active' : 'font-box font_style_12'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          {/* new font style */}

                                          <div className="col-md-4">
                                            <div data-shape="font_style_13" data-index="13" className={this.state.activeFontStyle === "font_style_13" ? 'font-box font_style_13  active' : 'font-box font_style_13'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_14" data-index="14" className={this.state.activeFontStyle === "font_style_14" ? 'font-box font_style_14  active' : 'font-box font_style_14'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_15" data-index="15" className={this.state.activeFontStyle === "font_style_15" ? 'font-box font_style_15  active' : 'font-box font_style_15'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_16" data-index="16" className={this.state.activeFontStyle === "font_style_16" ? 'font-box font_style_16  active' : 'font-box font_style_16'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_17" data-index="17" className={this.state.activeFontStyle === "font_style_17" ? 'font-box font_style_17  active' : 'font-box font_style_17'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div data-shape="font_style_18" data-index="18" className={this.state.activeFontStyle === "font_style_18" ? 'font-box font_style_18  active' : 'font-box font_style_18'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_19" data-index="19" className={this.state.activeFontStyle === "font_style_19" ? 'font-box font_style_19  active' : 'font-box font_style_19'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_20" data-index="20" className={this.state.activeFontStyle === "font_style_20" ? 'font-box font_style_20  active' : 'font-box font_style_20'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_21" data-index="21" className={this.state.activeFontStyle === "font_style_21" ? 'font-box font_style_21  active' : 'font-box font_style_21'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_22" data-index="22" className={this.state.activeFontStyle === "font_style_22" ? 'font-box font_style_22  active' : 'font-box font_style_22'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_23" data-index="23" className={this.state.activeFontStyle === "font_style_23" ? 'font-box font_style_23  active' : 'font-box font_style_23'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_24" data-index="24" className={this.state.activeFontStyle === "font_style_24" ? 'font-box font_style_24  active' : 'font-box font_style_24'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_25" data-index="25" className={this.state.activeFontStyle === "font_style_25" ? 'font-box font_style_25  active' : 'font-box font_style_25'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_26" data-index="25" className={this.state.activeFontStyle === "font_style_26" ? 'font-box font_style_26  active' : 'font-box font_style_26'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_27" data-index="27" className={this.state.activeFontStyle === "font_style_27" ? 'font-box font_style_27  active' : 'font-box font_style_27'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_28" data-index="28" className={this.state.activeFontStyle === "font_style_28" ? 'font-box font_style_28  active' : 'font-box font_style_28'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_29" data-index="29" className={this.state.activeFontStyle === "font_style_29" ? 'font-box font_style_29  active' : 'font-box font_style_29'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_30" data-index="30" className={this.state.activeFontStyle === "font_style_30" ? 'font-box font_style_30  active' : 'font-box font_style_30'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div data-shape="font_style_30" data-index="30" className={this.state.activeFontStyle === "font_style_31" ? 'font-box font_style_31  active' : 'font-box font_style_31'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_31" data-index="31" className={this.state.activeFontStyle === "font_style_32" ? 'font-box font_style_32  active' : 'font-box font_style_32'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_32" data-index="32" className={this.state.activeFontStyle === "font_style_33" ? 'font-box font_style_33  active' : 'font-box font_style_33'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_34" data-index="34" className={this.state.activeFontStyle === "font_style_34" ? 'font-box font_style_34  active' : 'font-box font_style_34'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_35" data-index="35" className={this.state.activeFontStyle === "font_style_35" ? 'font-box font_style_35  active' : 'font-box font_style_35'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div data-shape="font_style_36" data-index="36" className={this.state.activeFontStyle === "font_style_36" ? 'font-box font_style_36  active' : 'font-box font_style_36'}
                                              onClick={this.setButtonStyleActive('font')}>
                                              Aa
                                            </div>
                                          </div>
                                            {/* new font style */}
                                        </div>
                                      </div>
                          <div className="heading">
                            <h5>Text Color</h5>
                            <p>Choose the color of the text for your page</p>
                          </div>
                          <div className="item">
                                        <div className="row">
                                          <div className="part">
                                            <div data-color="#011627" data-index="1" className={this.state.activeFontcolor === "#011627" ? 'color-box bg_1 active' : 'color-box bg_1'}
                                              onClick={this.setActiveClass('font')}>
                                            </div>
                                          </div>
                                          <div className="part">
                                            <div data-color="#2ec4b6" data-index="2" className={this.state.activeFontcolor === "#2ec4b6" ? 'color-box bg_2 active' : 'color-box bg_2'}
                                              onClick={this.setActiveClass('font')}>
                                            </div>
                                          </div>
                                          <div className="part">
                                            <div data-color="#e71d36" data-index="3" className={this.state.activeFontcolor === "#e71d36" ? 'color-box bg_3 active' : 'color-box bg_3'}
                                              onClick={this.setActiveClass('font')}>
                                            </div>
                                          </div>
                                          <div className="part">
                                            <div data-color="#ff9f1c" data-index="4" className={this.state.activeFontcolor === "#ff9f1c" ? 'color-box bg_4 active' : 'color-box bg_4'}
                                              onClick={this.setActiveClass('font')}>
                                            </div>
                                          </div>
                                         
                                          <div className="part mr0">
                           
                                            <div className={this.state.activeFontcolor === this.state.dynamicFontColor ? 'color-box color-pick active' : 'color-box color-pick'}
                                              data-color={this.state.dynamicFontColor} style={{ backgroundColor: this.state.activeFontcolor }} data-index="6" id="custom_color_font" onClick={this.openColorPicker('font')}>
                                                <label>
                                                  <input type="color" id="color-picker_font" onChange={this.changeColor('font')} />
                                                  <AddBoxOutlinedIcon/>
                                                  </label>
                                              </div>

                                          </div>



                                        </div>
                                      </div>
                          <div className="heading">
                            <h5>Text Name  Size</h5>
                            <p>Choose text size of your name </p>
                          </div>
                          <div className="item">
                              <div className="row">
                                 <div className="col-md-4">
                                      <div className="font-size-box namesmall" 
                                            data-shape="14px"
                                             className={this.state.activeNameSize === "14px" ? 'font-size-box namesmall active' : 'font-size-box namesmall'}
                                              onClick={this.setButtonStyleActive('nameSize')}>
                                        Small
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="font-size-box namemedium" data-shape="18px"
                                             className={this.state.activeNameSize === "18px" ? 'font-size-box namemedium active' : 'font-size-box namemedium'}
                                              onClick={this.setButtonStyleActive('nameSize')}>
                                        Medium
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="font-size-box namelarge" 
                                      data-shape="22px"
                                      className={this.state.activeNameSize === "22px" ? 'font-size-box namelarge active' : 'font-size-box namelarge'}
                                       onClick={this.setButtonStyleActive('nameSize')}>
                                        Large
                                      </div>
                                    </div>
                              </div>
                          </div>
                          <div className="heading">
                            <h5>Text Bio Size</h5>
                            <p>Choose text size of your bio</p>
                          </div>
                          <div className="item">
                              <div className="row">
                                 <div className="col-md-4">
                                      <div className="font-size-box biosmall" data-shape="14px"
                                      className={this.state.activeBioSize === "14px" ? 'font-size-box biosmall active' : 'font-size-box biosmall'}
                                       onClick={this.setButtonStyleActive('bioSize')}>
                                        Small
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="font-size-box biomedium" data-shape='18px'
                                      className={this.state.activeBioSize === "18px" ? 'font-size-box biomedium active' : 'font-size-box biomedium'}
                                      onClick={this.setButtonStyleActive('bioSize')}>
                                        Medium
                                      </div>
                                    </div>
                                    <div className="col-md-4 ">
                                      <div className="font-size-box biolarge" data-shape='22px'
                                      className={this.state.activeBioSize === "22px" ? 'font-size-box biolarge active' : 'font-size-box biolarge'}
                                      onClick={this.setButtonStyleActive('bioSize')}> 
                                        Large
                                      </div>
                                    </div>
                              </div>
                          </div>
                    
                    
                        </div>
                      </Tab2.Pane>
                  
                    </Tab2.Content>
                  </div>
                </Tab2.Container>
              </div>
              <LivePreview2 JM_User_Profile_Url={this.state.JM_User_Profile_Url} ref="livepreview" />
                                
            </div>
          </div>
        </div>
                              

        <FooterClass />
      </>
    )
  }
}
export default MyAppearance
