import React, { Component } from 'react';
import {  NavLink } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import API  from '../services/API';

class SocialWidget2 extends Component
{
  constructor(props) {
    super(props)
  
    this.state = {
       openModel:false,
       base_url: process.env.REACT_APP_API_URL,
       root_url: process.env.REACT_APP_ROOT_URL,
     
       show:false,
       open:false,
       JM_ID:this.props.JM_ID,
       SWM_Title:'',
       SWM_Url:'',
       SWM_Icon:'',
       SWM_Style_Type:'W',
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
      ClubHouse:'https://www.clubhouse.com/',
      Discord:'https://discord.gg/',
      Medium:'https://www.medium.com/',
      Whatsapp:'https://wa.me/',

      category_links:[],
      embed_content:[],
      productList:[],
      

    }
   // console.log(this.props.JM_User_Profile_Url_plus_JM_ID);
  }
  ModalClose=()=>{
    this.setState({openModel:false,show:false});
  }
  ModalOpen=()=>{
    this.setState({
      openModel:true,show:true,
      SWM_Title:'SELECT',
      SWM_Url:''

    
    });
  }
  openCollapse = () => {
    !this.state.open ?
      this.setState({ open: true })
      :
      this.setState({ open: false })
      
  }

  onChangeHandle=(e)=>{
    document.getElementById("whatsApp").innerHTML='';
    document.getElementById('msg_social').innerText='';
      let titleVal=e.target.value;
    this.setState({[e.target.name]:e.target.value});  
    let index = e.nativeEvent.target.selectedIndex;
  //  let label = e.nativeEvent.target[index].text;
    let SWM_Icon = e.target[e.target.selectedIndex].getAttribute('data-icon');
   // console.log(SWM_Icon)
    if(titleVal==="Instagram")
        this.setState({SWM_Url:this.state.Instagram,SWM_Icon});
    if(titleVal==="Facebook")
        this.setState({SWM_Url:this.state.Facebook,SWM_Icon});
    if(titleVal==="YouTube")
        this.setState({SWM_Url:this.state.YouTube,SWM_Icon});
    if(titleVal==="Twitter")
        this.setState({SWM_Url:this.state.Twitter,SWM_Icon});
    if(titleVal==="Twitch")
        this.setState({SWM_Url:this.state.Twitch,SWM_Icon});
    if(titleVal==="Snapchat")
        this.setState({SWM_Url:this.state.Snapchat,SWM_Icon});
    if(titleVal==="LinkedIn")
        this.setState({SWM_Url:this.state.LinkedIn,SWM_Icon});
    if(titleVal==="Pinterest")
        this.setState({SWM_Url:this.state.Pinterest,SWM_Icon});
    if(titleVal==="Spotify")
        this.setState({SWM_Url:this.state.Spotify,SWM_Icon});
    if(titleVal==="Website" || titleVal==="Shop")
        this.setState({SWM_Url:'https://',SWM_Icon});
    if(titleVal==="Email")
         this.setState({SWM_Url:'example@gmail.com',SWM_Icon});
    if(titleVal==="ClubHouse")
         this.setState({SWM_Url:this.state.ClubHouse,SWM_Icon});

         if(titleVal==="Discord")
         this.setState({SWM_Url:this.state.Discord,SWM_Icon});
         if(titleVal==="Medium")
         this.setState({SWM_Url:this.state.Medium,SWM_Icon});
         if(titleVal==="Whatsapp")
         {
           document.getElementById("whatsApp").innerHTML='Example Url: https://wa.me/mynumber';
           this.setState({SWM_Url:this.state.Whatsapp,SWM_Icon});
         }
         
   
}
onChangeHandleURL=(e)=>
{
  this.setState({[e.target.name]:e.target.value});     
}
imageonChange=(e)=>{     
  const file = e.target.files[0];
  this.setState({ selectedFile: e.target.files[0] }); 
  this.setState({
    SWM_Icon: URL.createObjectURL(file)
  });
}
doInsertLink=(event)=>{  
      event.preventDefault();
      this.validate();
      document.getElementById('msg_social').innerText='';
      if(this.state.SWM_Url.length===0)
      {
        return false;
      }
      if(this.state.SWM_Title==='Whatsapp')
      {
        if(this.state.SWM_Url.startsWith('https://wa.me/'))
        {
            var whatsApp='https://wa.me/';
             let url=this.state.SWM_Url;
       
            var right_number = parseInt(url.substring(whatsApp.length, url.length));
            if(isNaN(right_number))  //if not number or text
            {
              document.getElementById('msg_social').innerText='* Enter your number after https://wa.me/';
              return false;
            }
            if(right_number.toString().length!==10)  //if not number or text
            {
              document.getElementById('msg_social').innerText='* Enter your 10 digit number after https://wa.me/';
              return false;
            }
  
        }
        else
        {
          document.getElementById('msg_social').innerText='* URL should be like https://wa.me/mynumber';
          return false;
        }
      }

   
      const formData = new FormData(); 
      const files = event.target.files
      let Api_url=this.state.base_url+'admin/InsertSocialWidget';
      formData.append('sampleFile', this.state.selectedFile)
      formData.append('JM_ID', this.state.JM_ID) 
      formData.append('SWM_Title', this.state.SWM_Title) 
      formData.append('SWM_Url', this.state.SWM_Url)      
      formData.append('SWM_Icon', this.state.SWM_Icon)  
      formData.append('JM_User_Profile_Url_plus_JM_ID', this.props.JM_User_Profile_Url_plus_JM_ID)
      formData.append('SWM_Style_Type', this.state.SWM_Style_Type)
          fetch(Api_url, {
            method: 'POST',   
            headers: {"authorization": API.getAuth(),"id":API.getId()},
            body: formData
          })
          .then(response => response.json())
          .then(data => 
            {                   
              // console.log(data);   
               this.ModalClose();
               this.Get_User_Details();              
          })
          .catch(error => {
            console.error(error)
          })
}

Get_User_Details=()=>{
  var JSONdata = {
    JM_ID: this.state.JM_ID
  };
  const API_url = this.state.base_url + "admin/userDetailsAll";
fetch(API_url,
  {
    method: 'post',
    headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
    body: JSON.stringify(JSONdata)
  })
.then((response) => response.json())
.then(data1 => {
  if(data1.status===1)
  {
    const data=API.decryptJson(data1.flag);
     this.setState({
            userDetailsAll: data.data,
            userDetails:data.userDetails,
            themeMasterUser:data.themeMasterUser,
            socialWidget:data.socialWidget,
            gifts:data.gifts, 
            category_master:data.category_master,
            title:'Success!!!',
            msg:'Profile is updated',
     });

    this.props.setStateAfterInsert(this.state);
  }   
    else
      alert('not fetch');
});
}
fileSelectHandler=()=> {
  ////console.log("changed")
}

clickhandler = () => {
//console.log("clicked")
}
validate=(e)=>{

    if(this.state.SWM_Title==="SELECT")
        return false;

}
  render(){
  return (
    <>
      <div className="card-btun" onClick={this.ModalOpen}><AddCircleOutlineOutlinedIcon />
        <h4>Social Media Links </h4>  <p>Share your socials</p>
      </div>
      <Modal
        show={this.state.show}
        onHide={this.ModalClose}
        backdrop="static"
        keyboard={false}
        centered

      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="addnew-title">Add Social Widgets to your profile </p>
          
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                            {/* <FontAwesomeIcon icon={faInstagram} /> &nbsp;
                            <FontAwesomeIcon icon={faFacebookF} />&nbsp;
                            <FontAwesomeIcon icon={faYoutube} />&nbsp;
                            <FontAwesomeIcon icon={faSnapchatGhost} />&nbsp;
                            <FontAwesomeIcon icon={faLinkedinIn} />&nbsp;
                            <FontAwesomeIcon icon={faTwitch} />&nbsp;
                            <FontAwesomeIcon icon={faTwitter} />&nbsp;
                            <FontAwesomeIcon icon={faPinterestP} />&nbsp;
                            <FontAwesomeIcon icon={faSpotify} />&nbsp;
                            <FontAwesomeIcon icon={faGlobe} />&nbsp;
                            <FontAwesomeIcon icon={faShoppingCart} />&nbsp;
                            <FontAwesomeIcon icon={faEnvelope} />&nbsp;
                            <FontAwesomeIcon icon={faHandPaper} className="rotateCls" /> */}
         <form  onSubmit={this.doInsertLink}>
          <div className="addnew-box">
               <label> Social media platform</label>
                <select className="form-control" name="SWM_Title" data-icon={this.state.SWM_Icon} value={this.state.SWM_Title} onChange={this.onChangeHandle}>
                <option value="SELECT">--SELECT--</option>
                <option value="Instagram" data-icon="faInstagram">Instagram</option>
                <option value="Facebook" data-icon="faFacebookF">Facebook</option>
                <option value="YouTube" data-icon="faYoutube">YouTube</option>
                <option value="Snapchat" data-icon="faSnapchatGhost">Snapchat</option>
                <option value="LinkedIn" data-icon="faLinkedinIn">LinkedIn</option>
                <option value="Twitch" data-icon="faTwitch">Twitch</option>

                <option value="Twitter" data-icon="faTwitter">Twitter</option>
                <option value="Pinterest" data-icon="faPinterestP">Pinterest</option>
                <option value="Spotify" data-icon="faSpotify">Spotify</option>
                <option value="Website" data-icon="faGlobe">Website</option>
                <option value="Shop" data-icon="faShoppingCart">Shop</option>
                
                <option value="Email" data-icon="faEnvelope">Email</option>
                <option value="ClubHouse" data-icon="faHandPaper">ClubHouse</option>

                <option value="Discord" data-icon="faDiscord">Discord</option>
                <option value="Medium" data-icon="faMedium">Medium</option>
                <option value="Whatsapp" data-icon="faWhatsapp">Whatsapp</option>
                </select>
                <label>URL</label>
                <span style={{fontSize: '12px',float: 'right',fontWeight:'500'}} id="whatsApp"></span>
                <input type="text" className="form-control" placeholder="URL"
                    name="SWM_Url" value={this.state.SWM_Url} onChange={this.onChangeHandleURL}/>
              <label>Social Media Link Style </label>
              <select style={{display:'block'}} className="form-control" name="SWM_Style_Type" value={this.state.SWM_Style_Type} onChange={this.onChangeHandle}>
                <option value="W">As icon</option>
                <option value="B">As bar</option>               
              </select>
              <span id="msg_social" style={{fontSize: '12px',color: 'red'}}></span>
            <div className="btun-box">
              <button className="btun btun_1">Add Widget</button>
              <button className="btun" onClick={this.ModalClose}>Cancel</button>
             <span className="gotosetting"> <i className="fa fa-cog"></i>
          
                 <NavLink 
                     to={{ pathname: "/settings", userDetails: this.props.userDetails }} >
                              &nbsp; Change Widget Position
                    </NavLink>
              </span>
            </div>
          </div>
          </form>
        </Modal.Body>

      </Modal>
    </>
  );
}

}

export default SocialWidget2;