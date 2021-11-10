import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal'


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import AddIcon from '@material-ui/icons/Add';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import VideocamIcon from '@material-ui/icons/Videocam';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';


import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ImageIcon from '@material-ui/icons/Image';

class LiveVideoSession extends Component 
{
        fileObj = [];
        fileArray = [];
        albumArray=[];
        Files = [];
        constructor(props) {
            super(props)
            this.myRef = React.createRef();
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
            selectedFile:null,
            coverImageorVideo:null,
            title:'',
            description:'',
            price:0,
            handleDisabled:true,
            toolTip:false,
            chargesInfo:'',
            showIconCharges:'none',
            videoData:'NA',
            audioData:'',
            album:[null],
            cover_Image_video:'',
            audioFile:null,
            showAlert:true,
            title:'',
            msg:'',
            logo:'',
            BtnName:'Save',
            disabledBtn:false,
            Overlayshow:false,
            overlayTarget:null
            }
            console.log(this.state.userDetails)
            this.imageonMultiChange = this.imageonMultiChange.bind(this)
            
        }
        ModalClose=()=>
        {    
            this.setState({openModel:false,show:false});
        }
        ModalOpen=()=>
        {
                this.setState({openModel:true,show:true,chargesInfo:'',showIconCharges:'none',
                videoData:'',
                videoFile:null,
                coverImageorVideo:null,
                cover_Image_video:'',
                BtnName:'Save',
                disabledBtn:false
              });
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
           this.setState({ audioData: '' }); 
            const file = e.target.files[0];
            if(typeof file!=='undefined')
            {
              var fileUrl = window.URL.createObjectURL(file);
              this.setState({ imageFile: e.target.files[0] }); 
              this.setState({
              videoFile: file,
              videoData:fileUrl,
              coverImageorVideo:null,
              cover_Image_video:''
              });
              
              this.hidePopover();
            }
        }
        audioChange=(e)=>
        {

          this.setState({
            videoFile: null,
            videoData:'NA'
            });
            const file = e.target.files[0];
            if(typeof file!=='undefined')
            {
              this.setState({ audioFile: e.target.files[0] }); 
              this.getBase64(file).then(
                data =>{
                  console.log(data);
                  this.setState({ audioData: data }); 
                } 
              );
            }
            
        }
        onClickResetAudioFile (e) {
            this.setState({audioData:''}); // celears state
            
           }

           //12-mar-2021
           getBase64=(file)=> {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = error => reject(error);
            });
          }

        imageonChange=(e)=>{
            const file = e.target.files[0];
            this.setState({ coverImageorVideo: e.target.files[0] }); 
            this.setState({
            cover_Image_video: URL.createObjectURL(file),
            videoFile: null,
            videoData: ''
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

                let Api_url="";
             
                if(this.state.videoFile !==null && this.state.videoData!=='NA' && this.state.videoData!=='')
                  {  
                      formData.append('sampleFile', this.state.videoFile);
                      formData.append('DA_Type', 'video');   
                      Api_url=this.state.base_url+'admin/addProduct';

                                
                      formData.append('DA_DA_ID', 1) // for premium featured id
                      formData.append('JM_ID', this.props.JM_ID)         
                      formData.append('DA_Title', this.state.title)  
                      formData.append('DA_Description', this.state.description)  
                      formData.append('DA_Cover', "") 
                      formData.append('DA_Price', this.state.price)      
                      formData.append('JM_User_Profile_Url_plus_JM_ID',this.props.JM_User_Profile_Url + "_" + this.props.JM_ID)
                      
                      this.setState({BtnName:'Uploading..',disabledBtn:true});

                      try{


                            fetch(Api_url, {
                              method: 'POST',
                              body: formData
                            })
                              .then(response => response.json())
                              .then(data => {
                                console.log(data);
                                if (data.status > 0) {
                                  this.setState({ videoFile: null, videoData: 'NA', audioFile: null, audioData: '', coverImageorVideo: null, cover_Image_video: '' });
                                  this.fileArray = [];
                                  this.ModalClose();
                                  this.props.showToast('success', 'Premium feature is added to profile');

                                }
                                else 
                                {

                                  //this.props.showToast('Failed', 'Server Error');
                                  this.setState({BtnName:'Save',disabledBtn:false});
                                  this.props.showToast('Failed', 'Server Error');
                                }

                              })
                              .catch(error => 
                              { 
                                this.setState({BtnName:'Save',disabledBtn:false});
                                this.props.showToast('Failed', 'Server Error');
                                console.error(error)
                              })
                      }
                      catch(e)
                      {
                        this.setState({BtnName:'Save',disabledBtn:false});
                        this.props.showToast('Failed', 'Server Error');
                      }
                 
                  }
               else if(this.state.audioFile !==null && this.state.audioData!=='')
                 {   
                    formData.append('sampleFile', this.state.audioFile)
                    formData.append('DA_Type', 'audio'); 
                    Api_url=this.state.base_url+'admin/addProduct';
                          
                      formData.append('DA_DA_ID', 1) // for premium featured id
                      formData.append('JM_ID', this.props.JM_ID)         
                      formData.append('DA_Title', this.state.title)  
                      formData.append('DA_Description', this.state.description)  
                      formData.append('DA_Cover', "") 
                      formData.append('DA_Price', this.state.price)      
                      formData.append('JM_User_Profile_Url_plus_JM_ID',this.props.JM_User_Profile_Url + "_" + this.props.JM_ID)
                      
                      this.setState({BtnName:'Uploading..',disabledBtn:true});

                      try{


                            fetch(Api_url, {
                              method: 'POST',
                              body: formData
                            })
                              .then(response => response.json())
                              .then(data => {
                                console.log(data);
                                if (data.status > 0) {
                                  this.setState({ videoFile: null, videoData: 'NA', audioFile: null, audioData: '', coverImageorVideo: null, cover_Image_video: '' });
                                  this.fileArray = [];
                                  this.ModalClose();
                                  this.props.showToast('success', 'Premium feature is added to profile');

                                }
                                else {
                                  this.props.showToast('Failed', 'Server Error');
                                }

                              })
                              .catch(error => {
                                console.error(error)
                              })
                      }
                      catch(e)
                      {
                        this.setState({BtnName:'Save',disabledBtn:false});
                        this.props.showToast('Failed', 'Server Error');
                      }
                 
                 }
               else  if(this.state.coverImageorVideo !==null && this.state.cover_Image_video!=='')
                 {   
                    formData.append('sampleFile', this.state.coverImageorVideo)
                    formData.append('DA_Type', 'image'); 
                    Api_url=this.state.base_url+'admin/addProduct';
                                  
                      formData.append('DA_DA_ID', 5) // for premium featured id
                      formData.append('JM_ID', this.props.JM_ID)         
                      formData.append('DA_Title', this.state.title)  
                      formData.append('DA_Description', this.state.description)  
                      formData.append('DA_Cover', "") 
                      formData.append('DA_Price', this.state.price)      
                      formData.append('JM_User_Profile_Url_plus_JM_ID',this.props.JM_User_Profile_Url + "_" + this.props.JM_ID)
                      
                      this.setState({BtnName:'Uploading..',disabledBtn:true});

                        try{


                              fetch(Api_url, {
                                method: 'POST',
                                body: formData
                              })
                                .then(response => response.json())
                                .then(data => {
                                  console.log(data);
                                  if (data.status > 0) {
                                    this.setState({ videoFile: null, videoData: 'NA', audioFile: null, audioData: '', coverImageorVideo: null, cover_Image_video: '' });
                                    this.fileArray = [];
                                    this.ModalClose();
                                    this.props.showToast('success', 'A video session feature is added to profile');

                                  }
                                  else {
                                    this.props.showToast('Failed', 'Server Error');
                                  }

                                })
                                .catch(error => {
                                  console.error(error)
                                })
                        }
                        catch(e)
                        {
                          this.setState({BtnName:'Save',disabledBtn:false});
                          this.props.showToast('Failed', 'Server Error');
                        }
                        

                 }
                 else
                 {
                               
                      Api_url=this.state.base_url+'admin/addProductNoFile';
                            var JSONdata={
                              DA_DA_ID:5,
                              JM_ID: this.props.JM_ID,
                              DA_Title: this.state.title,
                              DA_Description: this.state.description,
                              DA_Price: this.state.price
                            }

                            
                        try{
                          
                          fetch(Api_url, {
                            method: 'POST',
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(JSONdata)
                          })
                            .then(response => response.json())
                            .then(data => {
                              console.log(data);
                              if (data.status > 0) {
                                this.setState({ videoFile: null, videoData: 'NA', audioFile: null, audioData: '', coverImageorVideo: null, cover_Image_video: '' });
                                this.fileArray = [];
                                this.ModalClose();
                                this.props.showToast('success', 'A video session feature is added to profile');

                              }
                              else {
                                this.props.showToast('Failed', 'Server Error');
                              }

                            })
                            .catch(error => {
                              console.error(error)
                            })
                    }
                    catch(e)
                    {
                      this.setState({BtnName:'Save',disabledBtn:false});
                      this.props.showToast('Failed', 'Server Error');
                    }
             
                 }
           
            }
            else
            {

            }
        }
        validation =()=>{
             
              
                if(this.state.title.length > 0 && this.state.description.length > 0 && parseInt(this.state.price) > 0)
                    return true;
                else
                    return false;         
               
        }
        handleChange=(e)=>{
            let val=parseFloat(e.target.value);
        this.setState({[e.target.name]:e.target.value})
        let chargesInfo="";
        if(e.target.name==='price' && val > 0)
            {
              let twoPer=val * 2/100;
              let TenPer=val * 10/100;
              let razorPay=(twoPer+(twoPer*18/100));
              console.log(twoPer)
              console.log(razorPay)
              console.log(TenPer)
             // let charges=val - razorPay - TenPer;
              let charges=val - TenPer;
              
              let chargesInfo="You'll receive INR "+ charges.toFixed(2) + " ";
              let showIconCharges='block';
                this.setState({chargesInfo,showIconCharges});
            }
            // else
            // {      
            //     let chargesInfo="";
            //     let showIconCharges='none';
            //     this.setState({chargesInfo,showIconCharges});
            // }
            
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

        hideToast=()=>{
          this.setState({showAlert:false})
        }
        showToast =() =>{
          this.setState({showAlert:true})
        }

        overlayClick=(e)=>{
          this.setState({
            OverlayTrigger:e.target,
            Overlayshow:true
          })
        }
    render() {

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
        //let chargesMessage="You receive 90% of the transaction value minus a 2% transaction fee that is collected by our payment provider.";
        let chargesMessage="You receive 90% of the transaction value. We take care of the rest.";
        
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
        
        let typeOfProduct;
        
          typeOfProduct= <> <div className="col-md-8">
                              <label for="upImage" style={{    marginTop: "10px"}}>
                                  Upload an intro Photo or Video (optional)       
                              </label>
                          </div>  
                          <div className="col-md-10 offset-md-1">           
                            {
                               this.state.videoData!=='NA' && this.state.videoData!=='' ?              
                                    <video className="img-thumbnail-custom" width="100%" controls src={this.state.videoData} type="video/mp4" >                                   
                                    </video>
                                    : null
                            }
                            {
                            this.state.audioData!=='' ?     
                                <audio autoplay controls src={this.state.audioData}>
                                  The “audio tag is not supported by your browser.
                                </audio>
                                : 
                                null
                            }
                            {
                               this.state.cover_Image_video!=='NA' && this.state.cover_Image_video!=='' ?              
                                    <img className="img-thumbnail-custom" width="200px"  src={this.state.cover_Image_video} type="image/*" >                                   
                                    </img>
                                    : null
                            }
                           </div>  
                          </>
      

    let type='video';
    const popover = (
      <Popover id="popover-basic" style={{zIndex:'99999'}}>
         <button type="button" className="pop-close"><span aria-hidden="true" onClick={this.hidePopover}>×</span>
          <span className="sr-only">Close</span>
        </button>
        <Popover.Title as="h6"><h6>Select  video or Photo</h6>
       
        </Popover.Title>
        <Popover.Content>
          {           
            type==='video' ?   
            <>         
             <label htmlFor="video" style={{cursor:'pointer'}}><h6>Video</h6></label> <PersonalVideoIcon/>  <br/>
             {/* <label htmlFor="audio" style={{cursor:'pointer'}}><h6>Audio</h6></label> <AudiotrackIcon/>   */}
      
             <label htmlFor="photo" style={{cursor:'pointer'}}><h6>Photo</h6></label> <ImageIcon/>  
             </>            
            : null
          
          }
          
        </Popover.Content>    
       
      </Popover>
    );

    const popover2 = (
      <Popover id="popover-basic" style={{zIndex:'99999',background: 'black',color:'#fff'}}  >
         <button type="button" className="pop-close"><span aria-hidden="true" onClick={this.hidePopover}>×</span>
          <span className="sr-only">Close</span>
        </button>       
        <Popover.Content style={{background: 'black',color:'#fff'}}>
        {chargesMessage}
          
        </Popover.Content>    
       
      </Popover>
    );

        return (
            <>
                   <div className="col-md-3">
                        <div className="item">
                          <div className="icon">
                            <VideocamIcon style={{fontSize: '50px'}}/>
                          </div>
                          <div className="text">
                            <h4>Add Live Video Session</h4>                           
                            <button class="btun"  onClick={this.ModalOpen}><AddCircleOutlineIcon/> Add This</button>
                            {/* <button class="btun"  onClick={()=>alert('Work in progress')}><AddCircleOutlineIcon/> Add This</button> */}
                          </div>
                        </div>
                    </div>
                 
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
            <p className="addnew-title">Add Live Video Session </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="direct-access-pop">
            <div className="row">
              <div className="col-md-2 setCursor">
                    <center>
                      <OverlayTrigger  trigger="click" placement="bottom" overlay={popover}>
                        <div className="up-ico" >
                           <AddIcon style={{fontSize:'25px'}}/>
                         </div>
                      </OverlayTrigger >                       
                    </center>     
              </div>
                   {/* <OverlayTrigger trigger="click" placement="right" overlay={popoverNew}>
                    <Button variant="success">Click me to see</Button>
                  </OverlayTrigger> */}
              {
               typeOfProduct
              }
              <form>                          
                <input type="file" id="video" accept=".mp4" style={{display:'none'}} onChange={this.videoonChange}/>      
             </form>   
             <form>                          
                <input type="file" id="audio" accept="audio/*" style={{display:'none'}} onChange={this.audioChange}/>      
             </form>
             <form>                          
                <input type="file" id="photo" accept="image/*" style={{display:'none'}} onChange={this.imageonChange}/>      
             </form>
              <div className="col-md-12">
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" placeholder="Enter Title" />       
              </div>
              <div className="col-md-12">
                <textarea className="form-control area" name="description" onChange={this.handleChange} 
                placeholder="Enter description"/>
              </div>
              <div className="col-md-12">
                <input type="number" name="price" onChange={this.handleChange} className="form-control" placeholder="Enter Price" />       
              </div>
              <div className="col-md-12 desktopCharge" >
                  <HtmlTooltip arrow
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Transaction Info</Typography>                
                          <p style={{fontFamily:'monospace',fontSize:'12px'}}>{chargesMessage}</p>
                        </React.Fragment>
                      } placement="top-start"
                    >
                  <Button style={chargesStyle}>{this.state.chargesInfo}
                       <i class="fa fa-question-circle" aria-hidden="true" 
                      style={iconStyle}></i>
                  </Button>
                      
                </HtmlTooltip>
               
              </div>
               <div className="col-md-12 mobileCharge" style={{fontFamily: 'consolas', fontSize: '13px',textTransform: 'capitalize'}}>
                      &nbsp;{this.state.chargesInfo}
                     <OverlayTrigger  className="mobile" style={chargesStyle} trigger="click" placement="top" overlay={popover2}>           
                         <i class="fa fa-question-circle" aria-hidden="true"  style={iconStyle}></i>                     
                      </OverlayTrigger >  
                </div>        
                    
          

            </div>
            <div className="btun-box">
              <button className="btun"  onClick={this.nextClick} disabled={this.state.disabledBtn}> {this.state.BtnName} <NavigateNextIcon/></button>
              {/* <button className="btun" onClick={this.isConfirm}>Cancel</button> */}
            </div>
          </div>
        </Modal.Body>

      </Modal>

    
            </>
        );
    }
}

LiveVideoSession.propTypes = {

};

export default LiveVideoSession;