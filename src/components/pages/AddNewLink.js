import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import API  from '../services/API';
import { MDBIcon } from 'mdbreact';
class AddNewLink extends Component
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
       LM_Title:'',
       LM_Url:'',
       LM_Image:'',
       LM_Who_Will_See:1,
       selectedFile: null,
       linkMaster:[],
      userDetails:[],
      socialWidget:[],
      embed_content:[],
      productList:[],
      title:'',
      msg:'',
      logo:'',
      activeIcon:'',
      isDisplayIcon:'block',
      isDisplayImage:'none',
      iconCheked:true,
      imageCheked:false,

      errMsg:'',
      errColor:''
      
    }
    console.log(this.props.JM_User_Profile_Url_plus_JM_ID);
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
    this.setState({[e.target.name]:e.target.value});     
}
onChangeHandleURL=(e)=>
{
 // let value = e.target.value
  //value = value.replace(/[^A-Za-z]/ig, '')
  this.setState({ JM_User_Profile_Url: e.target.value.replace(/[^\w\s]/gi, "") });     
}
imageonChange=(e)=>{     
  const file = e.target.files[0];
  this.setState({ selectedFile: e.target.files[0] }); 
  this.setState({
    LM_Image: URL.createObjectURL(file)
  });
}
doInsertLink=(event)=>{  
      event.preventDefault();

      if(this.state.LM_Title.length === 0)
      {
        this.setState({
          errMsg:'Enter Title',
          errColor:'#ff6a6e'
         })
        return false;
      }
      if(this.state.LM_Url.length === 0)
      {
        this.setState({
          errMsg:'Enter URL',
          errColor:'#ff6a6e'
         })
        return false;
      }
     if(this.state.LM_Url.length > 0 && this.state.LM_Url.includes('https://')===false)
      {
          this.setState({
          errMsg:'Invalid URL, Enter correct URL',
          errColor:'#ff6a6e'
          })
        return false;
      }
      else
      {
      const formData = new FormData(); 
      const files = event.target.files
      let Api_url=this.state.base_url+'admin/InsertLink';
      formData.append('sampleFile', this.state.selectedFile)
      formData.append('JM_ID', this.state.JM_ID) 
      formData.append('LM_Title', this.state.LM_Title) 
      formData.append('LM_Url', this.state.LM_Url) 
      formData.append('LM_Image', this.state.LM_Image)
      formData.append('LM_Who_Will_See', this.state.LM_Who_Will_See)
      formData.append('JM_User_Profile_Url_plus_JM_ID', this.props.JM_User_Profile_Url_plus_JM_ID)
      formData.append('LM_Icon', this.state.activeIcon)
      //activeIcon
          fetch(Api_url, {
            method: 'POST',         
            body: formData
          })
          .then(response => response.json())
          .then(data => 
            {                   
               console.log(data);   
               this.ModalClose();
              this.Get_User_Details();    
               
               //this.GetuserDetailsAll();    
          })
          .catch(error => {
            console.error(error)
          })
        }
}
//10-may-2021
GetuserDetailsAll=()=>{
  var JSONdata = {
    JM_ID: this.state.JM_ID
  };
  const API_url = this.state.base_url + "admin/userDetailsAll";
fetch(API_url,
  {
    method: 'post',
    headers: { "Content-Type": "application/json","authorization": API.getAuth(),"id":API.getId()},
    body: JSON.stringify(JSONdata)
  })
.then((response) => response.json())
.then(data => {
  if(data.status===1)
  {
   
     this.setState({
       userDetailsAll: data.data,
       themeMasterUser:data.themeMasterUser   
     });

    this.props.setStateAfterInsert(this.state);
  }   
    else
      alert('not fetch');
});
}
validate=()=>{
  if(this.state.LM_Url.length===0)
  {

  }
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
        category_master:data.category_master,
        category_links:data.category_links,
        embed_content:data.embed_content,
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
  console.log("changed")
}

clickhandler = () => {
console.log("clicked")
}
setActive=(e)=>{
  e.preventDefault();

  var icon = e.currentTarget.attributes['data-id'].value;
  this.setState({
    activeIcon:icon
  })
}
showHideDiv=(e)=>{

  if(e.target.value==='icon')
  {
    this.setState({
      isDisplayIcon:"block", isDisplayImage:"none",
      iconCheked:true,imageCheked:false
    })
  }

  if(e.target.value==='image')
  {
    this.setState({
      isDisplayIcon:"none", isDisplayImage:"block",
      iconCheked:false,imageCheked:true
    })
  }
}
  render(){
  return (
    <>
      <div className="card-btun" onClick={this.ModalOpen}><AddCircleOutlineOutlinedIcon />
        <h4>Custom Links</h4> <p>Guide your followers</p>
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
            <p className="addnew-title">Add a link to your profile</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <form  onSubmit={this.doInsertLink}>
          <div className="addnew-box">
            <input type="text" className="form-control" placeholder="Title"
             name="LM_Title" value={this.state.LM_Title} onChange={this.onChangeHandle}/>

            <input type="text" className="form-control" placeholder="https://"
           name="LM_Url" value={this.state.LM_Url} onChange={this.onChangeHandle} />

           <div className="image-btun-box text-center">

             <input type="radio" checked={this.state.iconCheked} className="setCursor" name="selection" id="icon_chk" value="icon" onClick={this.showHideDiv}/>
             <label for="icon_chk" className="setCursor"> &nbsp;Icon&nbsp; </label>
              <input type="radio"  checked={this.state.imageCheked} className="setCursor"  name="selection"  id="image_chk" value="image" onClick={this.showHideDiv}/>
              <label for="image_chk" className="setCursor"> 
                   &nbsp;Image&nbsp;
              </label>
           </div>
           {/* icon */}
            <div style={{display:this.state.isDisplayIcon}}>
                <label>What would you like the icon to be?</label> 
                <div className="image-btun-box" >
                  <div className="iconbox">
                      <div 
                          className={this.state.activeIcon === "external-link-alt" ? 'icon active' : 'icon'}  data-id="external-link-alt"  onClick={this.setActive}>
                          <MDBIcon icon="external-link-alt" size="2x"/>                   
                        
                  
                      </div>
                      <div className="icon"
                      className={this.state.activeIcon === "lightbulb" ? 'icon active' : 'icon'} data-id="lightbulb"   onClick={this.setActive}>
                      
                        <MDBIcon icon="lightbulb" size="2x"/>
                      </div>
                      <div 
                      className={this.state.activeIcon === "anchor" ? 'icon active' : 'icon'} data-id="anchor"    onClick={this.setActive}>
                          <MDBIcon icon="anchor" size="2x"/>
                          
                      </div>
                      <div 
                        className={this.state.activeIcon === "link" ? 'icon active' : 'icon'}  data-id="link"  onClick={this.setActive}>
                          <MDBIcon icon="link" size="2x"/>
                      </div>
                      <div 
                        className={this.state.activeIcon === "external-link-square-alt" ? 'icon active' : 'icon'} data-id="external-link-square-alt"    onClick={this.setActive}>
                          <MDBIcon icon="external-link-square-alt" size="2x"/>
                      </div>
    
                      <div 
                        className={this.state.activeIcon === "archway" ? 'icon active' : 'icon'} data-id="archway" onClick={this.setActive}>
                          <MDBIcon icon="archway" size="2x"/>                   
                      </div>


                      <div  
                        className={this.state.activeIcon === "ankh" ? 'icon active' : 'icon'} data-id="ankh" onClick={this.setActive}>
                          <MDBIcon icon="ankh" size="2x" />
                      </div>
                      <div 
                      className={this.state.activeIcon === "angle-double-right" ? 'icon active' : 'icon'} data-id="angle-double-right"  onClick={this.setActive}>
                        <MDBIcon icon="angle-double-right" size="2x" />                   
                      </div>
                      <div 
                        className={this.state.activeIcon === "cannabis" ? 'icon active' : 'icon'} data-id="cannabis"  onClick={this.setActive}>
                            <MDBIcon icon="cannabis" data-id="cannabis" size="2x" />  
                      </div>
                      <div 
                        className={this.state.activeIcon === "chess-queen" ? 'icon active' : 'icon'} data-id="chess-queen" onClick={this.setActive}>
                            <MDBIcon icon="chess-queen" data-id="chess-queen"  size="2x" />   
                      </div>
                    
                  </div>
                </div>
            </div>

            
            {/* image */}
            <div style={{display:this.state.isDisplayImage}}>
                <label>What would you like the Image to be? </label>
                <div className="image-btun-box">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="view-image">
                        <img  src={this.state.LM_Image} alt=""/>
                      </div>
                    </div>
                    <div className="col-md-6">                   
                        <label className="up-ico" htmlFor="selectImage">
                          Upload an Image               </label>        
                          <input type="file" id="prop_up" accept="image/*" name="photo" style={{ display:"none"}} 
                                onChange={this.imageonChange}/>         
                          <input id='selectImage' type="file" style={{ display:"none"}}  onClick={this.clickhandler} onChange={this.imageonChange} />
                      </div>  
                    
                  </div>
                </div>
            </div>

                <select style={{display:'none'}} className="form-control" name="LM_Who_Will_See" value={this.state.LM_Who_Will_See} onChange={this.onChangeHandle}>
                  <option value="1">Everyone</option>
                  <option value="2">My Followers</option>
                  <option value="3">People I follow</option>
                </select>
                <div className="btun-box">
                  <button className="btun btun_1">Add Links</button>
                  <button className="btun" onClick={this.ModalClose}>Cancel</button>
                </div>
                <p style={{color:this.state.errColor}}>{this.state.errMsg}</p>

            </div>          
        
     
          </form>
        </Modal.Body>

      </Modal>
    </>
  );
}

}

export default AddNewLink;