import React, { Component } from 'react';
// import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
// import './MyStyle.css'
// import './animate.css'
// import './bootstrap.css'
// import './resonsive.css'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import AddIcon from '@material-ui/icons/Add';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import PhotoIcon from '@material-ui/icons/Photo';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
class AccessPopUp extends Component
{
  fileObj = [];
  fileArray = [];
  albumArray=[];
   Files = [];
  constructor(props) {
    super(props)
  
    this.state = {
      base_url: process.env.REACT_APP_API_URL,
      root_url: process.env.REACT_APP_ROOT_URL,
       openModel:false,
       show:false,
       open:false,
       directAccess:this.props.data,
       userDetails:this.props.userDetails,
       confirm:false,
       videoFile:null,
       imageFile:null,
       coverImageorVideo:null,
       title:'',
       description:'',
       price:0,
       handleDisabled:true,
       toolTip:false,
       chargesInfo:'',
       showIconCharges:'none',
       videoData:'NA',
       album:[null],
       cover_Image_video:''

    }
    console.log(this.state.userDetails)
       this.imageonMultiChange = this.imageonMultiChange.bind(this)
       
  }
  ModalClose=()=>
  {    
    this.setState({openModel:false,show:false});
  }
  ModalOpen=()=>{
        this.setState({openModel:true,show:true,chargesInfo:'',showIconCharges:'none'});
  }
  openCollapse = () => {
    !this.state.open ?
      this.setState({ open: true })
      :
      this.setState({ open: false })
      
  }
  isConfirm = () => {
    confirmAlert({
      title: 'Confirm !!!',
      message: 'Are you sure to Exit',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.setState({confirm:true})
        },
        {
          label: 'No',
          onClick: () => this.setState({confirm:false})
        }
      ]
    });
  };
  popOver=(data)=>{
  }
  videoonChange=(e)=>{
    const file = e.target.files[0];

    var fileUrl = window.URL.createObjectURL(file);
    this.setState({ imageFile: e.target.files[0] }); 
     this.setState({
       videoFile: file,
       videoData:fileUrl
     });

     this.hidePopover();
  
    //  let reader = new FileReader();

    // //if reading completed
    //   reader.onload = e => {
    //       let blobData = e.target.result; //blob data
    //       console.log(blobData);
    //       // this.setState({
    //       //   videoData: URL.createObjectURL(blobData)
    //       // });
    //       var binaryData = [];
    //         binaryData.push(blobData); //My blob
    //         var foo = URL.createObjectURL(new Blob(binaryData, {type: "application/text"}));
    //         console.log(foo);
    //          this.setState({
    //         videoData:blobData
    //       });
    //   };

    //   //read the file
    //   reader.readAsDataURL(file);
  }
  imageonChange=(e)=>{
    const file = e.target.files[0];
    this.setState({ coverImageorVideo: e.target.files[0] }); 
    this.setState({
      cover_Image_video: URL.createObjectURL(file)
    });
    this.hidePopover();
  }
  nextClick=(event)=>{
    event.preventDefault();
    let isValid=this.validation();
    if(isValid)
      {
        //alert("ok");
      
        const formData = new FormData(); 

        let Api_url=this.state.base_url+'admin/addProduct';
        if(this.state.directAccess.DA_Type==="video")
            formData.append('videoFile', this.state.videoFile)
        if(this.state.directAccess.DA_Type==="image")
        {
          formData.append('coverFile', this.state.coverImageorVideo) 
         // const ins = document.getElementById('img_multiple').files.length;
          const ins = this.Files.length;
          const arr=[];
          for (var x = 0; x < ins; x++)
           {
      
            // formData.append('img_multiple',document.getElementById('img_multiple').files[x]);
             formData.append('img_multiple',this.Files[x]);
             
            }
          
          // for (const file of myInput.files) {
          //   formData.append('album',file,file.name)
          //   console.log(file.name)
          // }
          
        }

        
        formData.append('DA_DA_ID', this.state.directAccess.DA_ID)   
        formData.append('DA_Type', this.state.directAccess.DA_Type)   
        formData.append('JM_ID', this.props.JM_ID)         
        formData.append('DA_Title', this.state.title)  
        formData.append('DA_Description', this.state.description)  
        formData.append('DA_Cover', "") 
        formData.append('DA_Price', this.state.price)      
        formData.append('JM_User_Profile_Url_plus_JM_ID',this.props.JM_User_Profile_Url + "_" + this.props.JM_ID)
        
            fetch(Api_url, {
              method: 'POST',         
              body: formData
            })
            .then(response => response.json())
            .then(data => 
              {                   
                 console.log(data);   
                  alert("success");   
                  this.albumArray=[];
                  this.fileArray=[];
                  this.ModalClose();                      
            })
            .catch(error => {
              console.error(error)
            })

      }
      else
      {

      }
  }
   validation =()=>{
        if(this.state.directAccess.DA_Type==="image")
        {
          if(this.state.description.length > 0 && parseInt(this.state.price) > 0 && (this.albumArray!==null && this.state.coverImageorVideo!==null))
             return true;
           else
            return false;           
        }
        if(this.state.directAccess.DA_Type==="video")
        {
          if(this.state.description.length > 0 && parseInt(this.state.price) > 0 && (this.state.imageFile!==null || this.state.videoFile!==null))
             return true;
         else
            return false;         
        }
   }
   handleChange=(e)=>{
    let val=parseFloat(e.target.value);
   this.setState({[e.target.name]:e.target.value})
   let chargesInfo="";
   if(e.target.name==='price' && val >0)
     {
       let charges=val * .75;
       let chargesInfo="You'll receive $"+ charges + " ";
       let showIconCharges='block';
         this.setState({chargesInfo,showIconCharges});
     }
     else{      
          let chargesInfo="";
          let showIconCharges='none';
         this.setState({chargesInfo,showIconCharges});
     }
    
  }
   hidePopover=()=>{
    document.getElementById("popover-basic").style.display='none';
   }
   handleClose=()=>{
      this.setState({toolTip:true});
   }
   handleOpen=()=>{
    this.setState({toolTip:false});
  }
  

  imageonMultiChange(e) {
    var numFiles = e.target.files.length; 
    for (var i = 0, numFiles = e.target.files.length; i < numFiles; i++) 
    { 
      var file = e.target.files[i];
      this.albumArray.push(URL.createObjectURL(file));
      //this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
      this.Files.push(file);
    }

    this.setState({ album: this.albumArray })

}

cancelAlbum=id=>e=>
{
  console.log(this.albumArray) 
   console.log(id)

   const i = id
  const filteredItems = this.albumArray.slice(0, i).concat(this.albumArray.slice(i + 1, this.albumArray.length))
  this.albumArray=filteredItems;
  this.setState({ album: filteredItems })
  const ins = document.getElementById('img_multiple').files.length;

  this.Files.splice(id, 1);

  console.log(this.Files);

}
  render()
  {
    let type=this.state.directAccess.DA_Type;
    const popover = (
      <Popover id="popover-basic">
         <button type="button" className="pop-close"><span aria-hidden="true" onClick={this.hidePopover}>×</span>
          <span className="sr-only">Close</span>
        </button>
        <Popover.Title as="h6"><h6>Select {type==="image"? 'image' : 'video'}</h6>
       
        </Popover.Title>
        <Popover.Content>
          {           
            this.state.directAccess.DA_Type==='video' ?   
            <>         
             <label htmlFor="video" style={{cursor:'pointer'}}><h6>Video</h6></label> <PersonalVideoIcon/>  
            
             </>            
            : null
          
          }
          {
              this.state.directAccess.DA_Type==='image' ?  
              <>          
              <label htmlFor="img_cover" style={{cursor:'pointer'}}><h6>Image</h6></label>
              <PhotoIcon/>
              <br/>
              <label htmlFor="video_cover" style={{cursor:'pointer'}}><h6>Video</h6></label>   
              <PersonalVideoIcon/> 
              <form>
                <input type="file" id="img_cover" accept="image/*" style={{display:'none'}} onChange={this.imageonChange}/>
                <input type="file" id="video_cover"  accept="video/mp4" style={{display:'none'}} onChange={this.imageonChange}/>    
             </form>  
             </>            
          : null
          }
        </Popover.Content>    
       
      </Popover>
    );
        let typeOfProduct;
        if(this.state.directAccess.DA_Type==='video' )
        {
          typeOfProduct= <> <div className="col-md-8">
                              <label for="upImage" style={{    marginTop: "10px"}}>
                                Upload a Video             
                              </label>
                          </div>  
                          <div className="col-md-10 offset-md-1">           
                          {
                          this.state.videoData!=='NA' && this.state.videoData!=='' ?              
                                  <video className="img-thumbnail-custom" width="100%" controls src={this.state.videoData} type="video/mp4" >                                   
                                  </video>
                                  : null
                          }
                          </div>  
                          </>
        }
        if(this.state.directAccess.DA_Type==='image' )
        {
          typeOfProduct= <> 
                               
          
                            <div className="col-md-10">
                              <label for="img_vid" style={{marginTop:"10px"}}>
                                Upload a Cover Photo or Video             
                              </label>
                            </div>
                            {
                              this.state.cover_Image_video!=="" && !this.state.cover_Image_video.startsWith('blob') ?
                              <div className="col-md-12">                 
                                  <div className="img-grid">
                                    <img src={this.state.cover_Image_video} alt=""/>
                                    <div className="cls"><CloseIcon style={{    fontSize: "14px"}} onClick={()=>{this.setState({cover_Image_video:""})}}/></div>
                                </div>     
                              </div>
                              :
                              null
                            }                                                 
                            {
                              this.state.coverImageorVideo!=null ?
                              <div className="col-md-12">                 
                                  <div className="img-grid">
                                    <video src={this.state.coverImageorVideo} />
                                    <div className="cls"><CloseIcon style={{    fontSize: "14px"}} onClick={()=>{this.setState({coverImageorVideo:null})}}/></div>
                                </div>     
                              </div>
                              :
                              null
                            }    
                            <div className="col-md-2">
                              <label className="up-ico" htmlFor="img_multiple">
                              <AddIcon style={{fontSize:'25px'}}/>       
                              </label>
                              <input type="file" id="img_multiple" multiple  accept="image/*" style={{display:'none'}} onChange={this.imageonMultiChange}/>
                            </div> 
                            <div className="col-md-6">
                              <label  for="img_album">
                                Upload a photo album            
                              </label>
                            </div> 
                           
                            <div className="col-md-12" id="diplay_album">
                              
                            </div>
                            <div className="col-md-12">
                              <div className="row">
                              {
                              (this.albumArray || []).map((url,i) => (
                                 <>
                                  {/* <img className="" src={url} width="50" height="50" style={{marginLeft:'20px'}}alt="..." /> */}
                                   <div className="col-md-2">
                                      <div className="img-grid">
                                        <img src={url} />
                                        <div className="cls"><CloseIcon style={{    fontSize: "14px"}} onClick={this.cancelAlbum(i)}/></div>
                                    </div>
                                  </div>
                                  </>
                              ))
                              }
                                
                              </div>
                            </div> 
                            <div className="form-group">
                              
                          </div>
                          </>
        }

    const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

const useStyles = {
  button: {
    margin: '5px',
  },
  customWidth: {
    maxWidth: 500,
    fontSize:'25px',
   
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
};
let chargesMessage="You receive a 75% share of the transaction value minus a 30c transaction fee which is collected by our payment provider.";
const HtmlTooltip = withStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: '#212529',
    color: 'white',
    maxWidth: '50%',
    fontSize: theme.typography.pxToRem(10),
    // border: '1px solid #dadde9',
  },
}))(Tooltip);

const iconStyle={
    display:this.state.showIconCharges,
    fontSize: "23px",
    color: "gray"
}
const chargesStyle={
  fontFamily: "consolas",
  fontSize: "13px",
  textTransform: "capitalize",
  marginTop: "-6%",
  fontWeight: "bold",
  color: "gray",
}

  return (
    <>
      <button class="btun"  onClick={this.ModalOpen}><AddCircleOutlineIcon/> Add This</button>
      <Modal
        show={this.state.show}
        onHide={this.ModalClose}
        backdrop="static"
        keyboard={false}         
        size="lg"
        contentClassName="modal-radius"
        centered

      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="addnew-title">{this.state.directAccess.DA_Title}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="direct-access-pop">
            <div className="row">
              <div className="col-md-2">
                    <center>
                      <OverlayTrigger  trigger="click" placement="right" overlay={popover}>
                        <div className="up-ico"  onClick={this.popOver}>
                           <AddIcon style={{fontSize:'25px'}}/>
                         </div>
                      </OverlayTrigger >                       
                    </center>     
              </div>
              {
               typeOfProduct
              }
              <form>                          
                <input type="file" id="video" accept=".mp4" style={{display:'none'}} onChange={this.videoonChange}/>      
             </form>   

              <div className="col-md-12">
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" placeholder="Title" />       
              </div>
              <div className="col-md-12">
                <textarea className="form-control area" name="description" onChange={this.handleChange} 
                placeholder={this.state.directAccess.DA_Title}/>
              </div>
              <div className="col-md-12">
                <input type="number" name="price" onChange={this.handleChange} className="form-control" placeholder="$ Price" />       
              </div>
              <div className="col-md-12">
                  <HtmlTooltip arrow
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Transaction Info</Typography>                
                          <p style={{fontFamily:'monospace',fontSize:'12px'}}>{chargesMessage}</p>
                        </React.Fragment>
                      } placement="top-start"
                    >
                  <Button style={chargesStyle}>{this.state.chargesInfo}<i class="fa fa-question-circle" aria-hidden="true" 
                  style={iconStyle}></i></Button>
                </HtmlTooltip>
              </div>
               
            </div>
            <div className="btun-box">
              <button className="btun"  onClick={this.nextClick}> Save <NavigateNextIcon/></button>
              {/* <button className="btun" onClick={this.isConfirm}>Cancel</button> */}
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}

}

export default AccessPopUp;