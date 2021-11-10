import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import CreateIcon from '@material-ui/icons/Create';
import { MDBIcon } from 'mdbreact';
import API  from '../services/API';
class EditLinks2 extends Component
{
  constructor(props) {
    super(props)
  
    this.state = {
       openModel:false,
       base_url: process.env.REACT_APP_API_URL,
       root_url: process.env.REACT_APP_ROOT_URL,
       show:false,
       open:false,
       JM_ID:0,
       LM_Title:'',
       LM_Url:'',
       LM_Image:'',
       LM_Who_Will_See:0,
       selectedFile: null,
       linkMaster:[],
      userDetails:[],
      productList:[],
      activeIcon:'',
      isDisplayIcon:'block',
      isDisplayImage:'none',
      iconCheked:false,
      imageCheked:false,
      fromEdit:true

      
    }
   // console.log(this.props.data.LM_Who_Will_See);

  }
  ModalClose=()=>{
    this.setState({openModel:false,show:false,
      iconCheked:false ,
      imageCheked:false,
    
    });
  }
  ModalOpen=()=>{
    this.setState({openModel:true,show:true,
      errMsg:'',      
    });

    //console.log(this.props.data);
      this.setState({ 
        JM_ID:this.props.data.JM_ID,
        LM_ID:this.props.data.tableId,
        LM_Title:this.props.data.title,
        LM_Url:this.props.data.URL.includes('https://') ? this.props.data.URL.replace('https://','') : this.props.data.URL.replace('http://',''),
        LM_Image:this.props.data.image,
        ddl_type:this.props.data.URL.includes('https://') ? 'https://' : 'http://',
        LM_Who_Will_See:0,
        selectedFile: null,
        linkMaster:[],
        userDetails:[],
        category_master:[],
        category_links:[],
        embed_content:[],
        fromEdit:true,
        activeIcon:this.props.data.icon,
        iconCheked:this.props.data.icon ===''? false :true,
        imageCheked:this.props.data.icon ===''? true :false,
    });
    if(this.props.data.icon==='')
        this.setState({
          isDisplayIcon:"none", isDisplayImage:"block",
        
        })
    else
      this.setState({
        isDisplayIcon:"block", isDisplayImage:"none",     
      })
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

imageonChange=(e)=>{     
  const file = e.target.files[0];
  this.setState({ selectedFile: e.target.files[0] }); 
  this.setState({
    LM_Image: URL.createObjectURL(file),
    fromEdit:false
  });
}
onChangeHandleURL=(e)=>
{
 // let value = e.target.value
  //value = value.replace(/[^A-Za-z]/ig, '')
  this.setState({ JM_User_Profile_Url: e.target.value.replace(/[^\w\s]/gi, "") });     
}

doUpdateLink=(event)=>{  
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

     
        var val=this.state.LM_Url;
        if(val.includes('http://') || val.includes('https://'))
          {
            this.setState({
               errMsg:'Invalid URL, Remove http:// or https://',
               errColor:'#ff6a6e'
              })
              return false;
          }
          else if(val.includes('.'))
          {
            const arr=val.split('.');
            if(arr!==null && arr.length > 0 && arr[1].length < 2)
            {
              this.setState({
                errMsg:'Invalid URL, Enter correct URL',
                errColor:'#ff6a6e'
               })
                return false;
            }         
          }
          else if(val.includes('.')===false)
          {
            
              this.setState({
                errMsg:'Invalid URL, Enter correct URL',
                errColor:'#ff6a6e'
               })
                return false;
                   
          }
          else
          {
            this.setState({
              errMsg:'',
              errColor:''
             })
          }
      
      const formData = new FormData(); 
      const files = event.target.files;
      let LM_Image='',LM_Icon='';
      if(this.state.iconCheked && this.state.activeIcon!=='')
      {
        LM_Image='';
        LM_Icon=this.state.activeIcon;
      }
      else if(this.state.imageCheked && this.state.LM_Image!=='' && this.state.LM_Image.startsWith('blob:')===false)
      {
        LM_Icon='';
        LM_Image=this.state.LM_Image;
      }
      let Api_url=this.state.base_url+'admin/UpdateLink';
      formData.append('sampleFile', this.state.selectedFile)
      formData.append('LM_ID', this.props.data.tableId) 
      formData.append('LM_Title', this.state.LM_Title) 
      formData.append('LM_Url', this.state.ddl_type + this.state.LM_Url) 
      formData.append('LM_Image', LM_Image)
      formData.append('LM_Who_Will_See', this.state.LM_Who_Will_See)
      formData.append('JM_User_Profile_Url_plus_JM_ID', this.props.userDetails.JM_User_Profile_Url+"_"+this.props.data.JM_ID)
      formData.append('LM_Icon', LM_Icon)
          fetch(Api_url, {
            method: 'POST',     
            headers: { "authorization": API.getAuth(),"id":API.getId()},        
            body: formData
          })
          .then(response => response.json())
          .then(data => 
            {                   
               //console.log(data);   
               this.ModalClose();
              // this.Get_User_Details();   
               
               this.GetuserDetailsAll();    
          })
          .catch(error => {
            //console.error(error)
          })
        
}
GetuserDetailsAll=()=>{
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
       themeMasterUser:data.themeMasterUser,
       userDetails:data.userDetails, 
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
    var imagePath=this.state.LM_Image===''? process.env.REACT_APP_UPLOAD_URL+'no_image.png' :process.env.REACT_APP_UPLOAD_URL+this.state.LM_Image;
  return (
    <>
     <button onClick={this.ModalOpen}><CreateIcon />     
      </button>
      <Modal
        show={this.state.show}
        onHide={this.ModalClose}
        backdrop="static"
        keyboard={false}
        centered

      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="addnew-title">Edit Link</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form  onSubmit={this.doUpdateLink}>
          <div className="addnew-box">
            <input type="text" className="form-control" placeholder="Title"
             name="LM_Title" value={this.state.LM_Title} onChange={this.onChangeHandle}/>
            <select disabled className="form-control" name="ddl_type" value={this.state.ddl_type} onChange={this.onChangeHandle} style={{display:'none'}}>
                  <option value="https://">https://</option>                
              </select>
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
                        <div className="icon"  
                            className={this.state.activeIcon === "external-link-alt" ? 'icon active' : 'icon'}  data-id="external-link-alt"  onClick={this.setActive}>
                            <MDBIcon icon="external-link-alt" size="2x"/> 
                        </div>
                        <div className="icon"
                        className={this.state.activeIcon === "lightbulb" ? 'icon active' : 'icon'} data-id="lightbulb"   onClick={this.setActive}>
                        
                          <MDBIcon icon="lightbulb" size="2x"/>
                        </div>
                        <div className="icon"
                        className={this.state.activeIcon === "anchor" ? 'icon active' : 'icon'} data-id="anchor"    onClick={this.setActive}>
                            <MDBIcon icon="anchor" size="2x"/>
                            
                        </div>
                        <div className="icon"
                          className={this.state.activeIcon === "link" ? 'icon active' : 'icon'}  data-id="link"  onClick={this.setActive}>
                            <MDBIcon icon="link" size="2x"/>
                        </div>
                        <div className="icon"
                          className={this.state.activeIcon === "external-link-square-alt" ? 'icon active' : 'icon'} data-id="external-link-square-alt"    onClick={this.setActive}>
                            <MDBIcon icon="external-link-square-alt" size="2x"/>
                        </div>
      
                        <div className="icon"
                          className={this.state.activeIcon === "archway" ? 'icon active' : 'icon'} data-id="archway" onClick={this.setActive}>
                            <MDBIcon icon="archway" size="2x"/>                   
                        </div>


                        <div className="icon"  
                          className={this.state.activeIcon === "ankh" ? 'icon active' : 'icon'} data-id="ankh" onClick={this.setActive}>
                            <MDBIcon icon="ankh" size="2x" />
                        </div>
                        <div className="icon" 
                        className={this.state.activeIcon === "angle-double-right" ? 'icon active' : 'icon'} data-id="angle-double-right"  onClick={this.setActive}>
                          <MDBIcon icon="angle-double-right" size="2x" />                   
                        </div>
                        <div className="icon"
                          className={this.state.activeIcon === "cannabis" ? 'icon active' : 'icon'} data-id="cannabis"  onClick={this.setActive}>
                              <MDBIcon icon="cannabis" data-id="cannabis" size="2x" />  
                        </div>
                        <div className="icon"
                          className={this.state.activeIcon === "chess-queen" ? 'icon active' : 'icon'} data-id="chess-queen" onClick={this.setActive}>
                              <MDBIcon icon="chess-queen" data-id="chess-queen"  size="2x" />   
                        </div>
                      
                      {/*========= MS2======================*/}

                      <div className="icon"
                        className={this.state.activeIcon === "air-freshener" ? 'icon active' : 'icon'} data-id="air-freshener" onClick={this.setActive}>
                             <MDBIcon icon="air-freshener" data-id="air-freshener"  size="2x" />
                      </div>
                      <div className="icon"
                        className={this.state.activeIcon === "bell" ? 'icon active' : 'icon'} data-id="bell" onClick={this.setActive}>
                             <MDBIcon icon="bell" data-id="bell"  size="2x" />
                      </div>
                      <div className="icon"
                        className={this.state.activeIcon === "guitar mdb-gallery-view-icon" ? 'icon active' : 'icon'} data-id="guitar mdb-gallery-view-icon" onClick={this.setActive}>
                             <MDBIcon icon="guitar mdb-gallery-view-icon" data-id="guitar mdb-gallery-view-icon"  size="2x" />
 
                      </div>
                      <div className="icon"
                        className={this.state.activeIcon === "hat-cowboy mdb-gallery-view-icon" ? 'icon active' : 'icon'} data-id="hat-cowboy mdb-gallery-view-icon" onClick={this.setActive}>
                             <MDBIcon icon="hat-cowboy mdb-gallery-view-icon" data-id="hat-cowboy mdb-gallery-view-icon"  size="2x" />

                      </div>
                      <div className="icon"
                        className={this.state.activeIcon === "music mdb-gallery-view-icon" ? 'icon active' : 'icon'} data-id="music mdb-gallery-view-icon" onClick={this.setActive}>
                             <MDBIcon icon="music mdb-gallery-view-icon" data-id="music mdb-gallery-view-icon"  size="2x" />
                           
                      </div>




                      <div className="icon"
                        className={this.state.activeIcon === "store mdb-gallery-view-icon" ? 'icon active' : 'icon'} data-id="store mdb-gallery-view-icon" onClick={this.setActive}>
                             <MDBIcon icon="store mdb-gallery-view-icon" data-id="store mdb-gallery-view-icon"  size="2x" />
                           
                      </div>

                      <div className="icon"
                        className={this.state.activeIcon === "trophy mdb-gallery-view-icon" ? 'icon active' : 'icon'} data-id="trophy mdb-gallery-view-icon" onClick={this.setActive}>
                             <MDBIcon icon="trophy mdb-gallery-view-icon" data-id="trophy mdb-gallery-view-icon"  size="2x" />
               
                      </div>
                      <div className="icon"
                        className={this.state.activeIcon === "wine-glass-alt mdb-gallery-view-icon" ? 'icon active' : 'icon'} data-id="wine-glass-alt mdb-gallery-view-icon" onClick={this.setActive}>
                             <MDBIcon icon="wine-glass-alt mdb-gallery-view-icon" data-id="wine-glass-alt mdb-gallery-view-icon"  size="2x" />
                  
                      </div>
                      <div className="icon"
                        className={this.state.activeIcon === "venus mdb-gallery-view-icon" ? 'icon active' : 'icon'} data-id="venus mdb-gallery-view-icon" onClick={this.setActive}>
                             <MDBIcon icon="venus mdb-gallery-view-icon" data-id="venus mdb-gallery-view-icon"  size="2x" />
                        
                      </div>
                      <div className="icon"
                        className={this.state.activeIcon === "yin-yang mdb-gallery-view-icon" ? 'icon active' : 'icon'} data-id="yin-yang mdb-gallery-view-icon" onClick={this.setActive}>
                             <MDBIcon icon="yin-yang mdb-gallery-view-icon" data-id="yin-yang mdb-gallery-view-icon"  size="2x" />
                      </div>

                      {/* ==========MS2 end ============== */}


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
                        {
                          this.state.fromEdit ?
                          <img  src={imagePath}/>
                          :
                          <img  src={this.state.LM_Image}/>
                        }
                      
                    </div>
                </div>

                <div className="col-md-12">
                  <label className="up-ico" for="selectImage">
                    Upload an Image
                    <input id='selectImage' type="file" style={{ display:"none"}}  onClick={this.clickhandler} onChange={this.imageonChange} />
                  </label>
                </div>
                <div className="col-md-6">
                          {/* <button className="up-ico">Choose an Icon</button> */}
                     {/* <Button onClick={this.openCollapse} className="btun"
                          aria-controls="example-collapse-text"
                          aria-expanded={this.state.open} >              
                        Choose an Icon
                      </Button> */}
                      <Collapse in={this.state.open}>
                          <div id="example-collapse-text">
                              <div className="row">
                                <div className="col-md-4">

                                       hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                </div>
                                <div className="col-md-4">
                                 
                                </div>
                                <div className="col-md-4">
                                  
                                </div>
                              </div>
                            </div>
                      </Collapse>
                </div>
              </div>
            </div>
            </div>



            <label style={{display:'none'}}>Who should be able to see this?</label>
            <select style={{display:'none'}}className="form-control" name="LM_Who_Will_See" value={this.state.LM_Who_Will_See} onChange={this.onChangeHandle}>
              <option value="1">Everyone</option>
              <option value="2">My Followers</option>
              <option value="3">People I follow</option>
            </select>


            <div className="btun-box">
              <button className="btun btun_1">Update Links</button>
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

export default EditLinks2;