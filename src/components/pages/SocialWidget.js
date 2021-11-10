import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import API from '../services/API';
class SocialWidget extends Component
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
      embed_content:[],
      productList:[],
      

    }
    //console.log(this.props.JM_User_Profile_Url_plus_JM_ID);
  }
  ModalClose=()=>{
    this.setState({openModel:false,show:false});
  }
  ModalOpen=()=>{
    this.setState({openModel:true,show:true});
  }
  openCollapse = () => {
    !this.state.open ?
      this.setState({ open: true })
      :
      this.setState({ open: false })
      
  }

  onChangeHandle=(e)=>{
      let titleVal=e.target.value;
    this.setState({[e.target.name]:e.target.value});  
    let index = e.nativeEvent.target.selectedIndex;
  //  let label = e.nativeEvent.target[index].text;
    let SWM_Icon = e.target[e.target.selectedIndex].getAttribute('data-icon');
    //console.log(SWM_Icon)
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
      const formData = new FormData(); 
      const files = event.target.files
      let Api_url=this.state.base_url+'admin/InsertSocialWidget';
      formData.append('sampleFile', this.state.selectedFile)
      formData.append('JM_ID', this.state.JM_ID) 
      formData.append('SWM_Title', this.state.SWM_Title) 
      formData.append('SWM_Url', this.state.SWM_Url)      
      formData.append('SWM_Icon', this.state.SWM_Icon)  
      formData.append('JM_User_Profile_Url_plus_JM_ID', this.props.JM_User_Profile_Url_plus_JM_ID)
      
          fetch(Api_url, {
            method: 'POST',         
            body: formData
          })
          .then(response => response.json())
          .then(data => 
            {                   
              if(data.status===1)
              {
                this.ModalClose();
                this.Get_User_Details();  
              }
              else
              {
                API.minusResponse(data);  
              }            
          })
          .catch(error => {
         
            
          })
}

Get_User_Details = () => {
    var JSONdata = {
      JM_ID: this.state.JM_ID
    };
    const API_url = this.state.base_url + "admin/userDetails";
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
        userDetails:data.userDetails,
        linkMaster:data.linkMaster,
        LM_Title:'',
        LM_Url:'',
        LM_Image:'',
        LM_Who_Will_See:1,
        selectedFile: null,
        title:'Success!!!',
        msg:'Profile is updated',
        socialWidget:data.socialWidget,
        embed_content:data.embed_content,
        category_master:data.category_master,
        category_links:data.category_links,
        productList:data.productList,
        gifts: data.gifts,
      });
      this.props.setStateAfterInsert(this.state);
    }   
      else
        alert('not fetch');
  });
  

}

fileSelectHandler=()=> {
  //console.log("changed")
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
        <h4>Social Widgets  </h4>  <p>Share your socials</p>
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
         <form  onSubmit={this.doInsertLink}>
          <div className="addnew-box">
               <label> Social media platform</label>
                <select className="form-control" name="SWM_Title" data-icon={this.state.SWM_Icon} value={this.state.SWM_Title} onChange={this.onChangeHandle}>
                <option value="SELECT">--SELECT--</option>
                <option value="Instagram" data-icon="social/instagram.png">Instagram</option>
                <option value="Facebook" data-icon="social/facebook.png">Facebook</option>
                <option value="YouTube" data-icon="social/youtube.png">YouTube</option>
                <option value="Snapchat" data-icon="social/snapchat.png">Snapchat</option>
                <option value="LinkedIn" data-icon="social/linkedIn.png">LinkedIn</option>
                <option value="Twitch" data-icon="social/twitch.png">Twitch</option>
                <option value="Twitter" data-icon="social/twitter.png">Twitter</option>
                <option value="Pinterest" data-icon="social/pinterest.png">Pinterest</option>
                <option value="Spotify" data-icon="social/spotify.png">Spotify</option>
                <option value="Website" data-icon="social/website.png">Website</option>
                <option value="Shop" data-icon="social/shop.png">Shop</option>
                <option value="Email" data-icon="social/email.png">Email</option>
                
                <option value="Website" data-icon="social/website.png">Website</option>
                <option value="Shop" data-icon="social/shop.png">Shop</option>
                <option value="Email" data-icon="social/email.png">Email</option>
                </select>
                <label>URL</label>
                <input type="text" className="form-control" placeholder="URL"
                    name="SWM_Url" value={this.state.SWM_Url} onChange={this.onChangeHandleURL}/>
 
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

export default SocialWidget;