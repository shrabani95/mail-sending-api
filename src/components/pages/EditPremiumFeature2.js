import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal'

import ImageIcon from '@material-ui/icons/Image';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import AddIcon from '@material-ui/icons/Add';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';


import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import CreateIcon from '@material-ui/icons/Create';
import API  from '../services/API';
class EditPremiumFeature2 extends Component 
{
        fileObj = [];
        fileArray = [];
        albumArray=[];
        Files = [];
        constructor(props) 
        {
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
              selectedFile:null,
          
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
              coverImageorVideo:null,
              audioFile:null,
              showAlert:true,
              title:'',
              msg:'',
              logo:'',


              DA_ID:0,
              DA_Title:'',
              DA_Description:'',
              DA_Price:0.0,
              JM_ID:0,
              DA_Type:'',
              DA_Collection:[],
              videoData_Edit:'',
              audioData_edit:'',
              hideVideoAudio:false,

              BtnName:'Save',
              disabledBtn:false,

              allowCustomertoPay:0,
              min_amt:'',
              suggested_amt:'',
              showDiv:false,
              isPriceDisabled:false
            }

            this.imageonMultiChange = this.imageonMultiChange.bind(this)
        }
        ModalClose=()=>
        {    
            this.setState({
              openModel:false,show:false,
              audioData:'',audioFile:null,
              videoData:'NA',videoFile:null
            
            });

        }
        ModalOpen=()=>{
                this.setState({openModel:true,show:true,chargesInfo:'',showIconCharges:'none'});
                //console.log(this.props.data)
                this.setState({ 
                  DA_Title:this.props.data.title,
                  DA_Description:this.props.data.description,
                  JM_ID:this.props.data.JM_ID,
                  DA_Type:this.props.data.prodType,
                  DA_ID:this.props.data.tableId,
                  DA_Collection:'',
                  DA_Price: this.props.data.price,   
                  allowCustomertoPay: this.props.data.DA_Allow_Cust_Pay,                       
                  min_amt: this.props.data.DA_Min_Amount,   
                  suggested_amt: this.props.data.DA_Suggested_Amont,   
                  showDiv:this.props.data.DA_Allow_Cust_Pay===1 ? true : false
              });
              if(this.props.data.DA_Allow_Cust_Pay === 1)
              {           
                  this.setState({
                    isPriceDisabled:true 
                  })             
              }
              if(this.props.data.prodType==='video')
              {
                let arr=JSON.parse(this.props.data.collection);
                if(arr!==null && arr.length >0)
                {
                  this.setState({ 
                    videoData_Edit:process.env.REACT_APP_API_URL+"adm/uploads/Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+arr[0],
                    hideVideoAudio:false
                  });
                  //console.log(arr[0]);
                }
               
              }
            else  if(this.props.data.prodType==='audio')
              {
                let arr=JSON.parse(this.props.data.collection);
                if(arr!==null && arr.length >0)
                {
                  this.setState({ 
                    audioData_edit:process.env.REACT_APP_API_URL+"adm/uploads/Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+arr[0],
                    hideVideoAudio:false
                  });
                  //console.log(arr[0]);
                }
               
              }
              // else  if(this.props.data.prodType==='images')
              // {
              //   let arr=JSON.parse(this.props.data.collection);
              //   if(arr!==null && arr.length >0)
              //   {
              //     this.setState({ 
              //       audioData_edit:process.env.REACT_APP_API_URL+"adm/uploads/Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+arr[0],
              //       hideVideoAudio:false
              //     });
              //     //console.log(arr[0]);
              //   }
               
              // }
              else  if(this.props.data.prodType==='image')
              {
                let arr=JSON.parse(this.props.data.collection);
                if(arr!==null && arr.length >0)
                {
                  this.setState({ 
                    cover_Image_video:process.env.REACT_APP_API_URL+"adm/uploads/Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+arr[0],
               
                  });
                  //console.log(arr[0]);
                }
               
              }



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
           this.setState({ audioData: ''  , audioFile:null}); 
            const file = e.target.files[0];
            if(typeof file!=='undefined')
            {
              var fileUrl = window.URL.createObjectURL(file);
              this.setState({ imageFile: e.target.files[0] }); 
              this.setState({
              videoFile: file,
              videoData:fileUrl,
              hideVideoAudio:true,
              audioFile:null,
              audioData:'',
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
                  //console.log(data);
                  this.setState({ audioData: data ,   hideVideoAudio:true,
                    videoFile: null,
                    videoData:'NA',
                  
                  }); 
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
            cover_Image_video: URL.createObjectURL(file)
            });
            this.hidePopover();
        }
        nextClick=(event)=>{
            event.preventDefault();
           
                
              document.getElementById('msg').innerHTML='';
              document.getElementById('msg').style.color='red';
              if(this.state.DA_Title.length ===0)
              {
                document.getElementById('msg').style.color='red';
                document.getElementById('msg').innerHTML='* Enter Title'; 
                return true;
              }
              if(this.state.DA_Description.length===0)
              {
                document.getElementById('msg').style.color='red';
                document.getElementById('msg').innerHTML='* Enter Description';      
                return false;
              }
              if(isNaN(parseInt(this.state.DA_Price)) || parseInt(this.state.DA_Price) < 0)
              {
                document.getElementById('msg').style.color='red';
                document.getElementById('msg').innerHTML='* Enter Price';
                return false;
              }
                  //23-aug-2021 dynamic pricing
              if(this.state.allowCustomertoPay===1)
              {
                if( isNaN(parseInt(this.state.min_amt)) || parseInt(this.state.min_amt) < 0 )
                {            
                  document.getElementById('msg').style.color='red';
                  document.getElementById('msg').innerHTML='* Enter minimum amount';
                  return false;              
                }
              }
            
                  const formData = new FormData(); 
                  
                  formData.append('DA_Allow_Cust_Pay', this.state.allowCustomertoPay )  
                  formData.append('DA_Min_Amount',parseInt(this.state.min_amt))
                  formData.append('DA_Suggested_Amont', parseInt(this.state.suggested_amt))  

                  let Api_url=process.env.REACT_APP_API_URL+'admin/updateProduct';
                  //const Api_url ="http://localhost:9000/admin/updateProduct";
                  if(this.state.videoFile !==null && this.state.videoData!=='NA' && this.state.videoData!=='')
                  {  
                      formData.append('sampleFile', this.state.videoFile);
                      formData.append('DA_Type', 'video'); 
                  }
                  else  if(this.state.audioFile !==null && this.state.audioData!=='')
                  {   
                     formData.append('sampleFile', this.state.audioFile)
                     formData.append('DA_Type', 'audio'); 
                  }
                  else  if(this.state.coverImageorVideo !==null && this.state.cover_Image_video!=='')
                  {   

                     formData.append('sampleFile', this.state.coverImageorVideo)
                     formData.append('DA_Type', 'image'); 
                  }
                  else
                  {
                    let file=[];
                    if(this.state.audioData_edit!=='')
                    {
                          formData.append('sampleFile', file)
                          formData.append('DA_Type', 'audio');       
                    }                  
                    if(this.state.videoData_Edit!=='')
                    {  
                      formData.append('sampleFile', file);
                      formData.append('DA_Type', 'video');                    
                    }

                  }
            

                
                formData.append('DA_DA_ID', 1) // for premium featured id
                formData.append('DA_ID', this.state.DA_ID) 
                formData.append('JM_ID', this.state.JM_ID)         
                formData.append('DA_Title', this.state.DA_Title)  
                formData.append('DA_Description', this.state.DA_Description)  
                formData.append('DA_Cover', "") 
                formData.append('DA_Price', this.state.DA_Price)      
                formData.append('JM_User_Profile_Url_plus_JM_ID',this.props.JM_User_Profile_Url_plus_JM_ID)
                this.setState({BtnName:'Uploading..',disabledBtn:true});
                    fetch(Api_url, {
                    method: 'POST', 
                    headers: { "authorization": API.getAuth(),"id":API.getId()},        
                    body: formData
                    })
                    .then(response => response.json())
                    .then(data => 
                    {                   
                        //console.log(data);   
                       if(data.status > 0)
                       {
                            this.setState({
                                  videoFile:null,
                                  videoData:'NA',
                                  audioFile:null,
                                  audioData:'',
                                  BtnName:'Save',disabledBtn:false
                            });

                       
                            this.fileArray=[];     
                            this.ModalClose();                     
                            this.Get_User_Details();   
                           
                       }
                       else
                       {

                        API.minusResponse(data);
                        this.setState({BtnName:'Save',disabledBtn:false});
                        this.props.showToast('Failed', 'Server Error');
                   
                       }
                                             
                    })
                    .catch(error => {
                      //console.error(error)
                       this.setState({BtnName:'Save',disabledBtn:false});
                        this.props.showToast('Failed', 'Network Error');
                    })

        }
        //23-aug-2021
        
        onchangeCheck=(e)=>{

          if(e.target.checked===true)
          {
            this.setState({
              allowCustomertoPay:1,
              showDiv:true,
              DA_Price:0,
              isPriceDisabled:true,
            })
            let chargesInfo="";
            let showIconCharges='none';
            this.setState({chargesInfo,showIconCharges});    
          }
          else
          {
            this.setState({
              allowCustomertoPay:0,
              showDiv:false,
              isPriceDisabled:false,
            })
                 
          }
        }
        validation =()=>{
             
              
                if(this.state.DA_Title.length > 0 && this.state.DA_Description.length > 0 && parseInt(this.state.DA_Price) > 0)
                    return true;
                else
                    return false;         
               
        }
        handleChange=(e)=>{
            let val=parseFloat(e.target.value);
        this.setState({[e.target.name]:e.target.value})
        let chargesInfo="";
        if(e.target.name==='DA_Price' && val > 0)
            {
              let fee=val * API.razorPayTax();
              let gst=fee * API.razorPayGST();         
              let razorPay=(fee+gst); // 1.65 + 0.297
              let TenPer=(val - razorPay) * 10/100; // 10 if val is 100                  
              let charges= val - razorPay - TenPer; // 100 - 1.65- 0.297                      
              let chargesInfo="You'll receive INR "+ charges.toFixed(2) + " ";

              
              let showIconCharges='block';         
              this.setState({chargesInfo,showIconCharges});
            }
            else
            {      
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

        hideToast=()=>{
          this.setState({showAlert:false})
        }
        showToast =() =>{
          this.setState({showAlert:true})
        }
       
        Get_User_Details = () => 
        {
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
       // let chargesMessage="You receive 90% of the transaction value minus a 2% transaction fee that is collected by our payment provider.";
        let chargesMessage=API.chargesMessage();
      
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
                                Upload {this.state.DA_Type==='NA' ? 'an intro Photo or Video (optional)': this.state.DA_Type}         
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
                                this.state.cover_Image_video!=='NA' && this.state.cover_Image_video!=='' ?              
                                      <img className="img-thumbnail-custom" width="200px"  src={this.state.cover_Image_video} type="image/*" >                                   
                                      </img>
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
                                  
                           </div>  
                          </>
      

    let type='video';
    const popover = (
      <Popover id="popover-basic" style={{zIndex:'99999'}}>
         <button type="button" className="pop-close"><span aria-hidden="true" onClick={this.hidePopover}>×</span>
          <span className="sr-only">Close</span>
        </button>
        <Popover.Title as="h6"><h6>Select  {this.state.DA_Type==='NA' ? "video or Photo" : this.state.DA_Type }</h6>
       
        </Popover.Title>
        <Popover.Content>
          {           
            this.state.DA_Type==='video' ?   
            <>         
             <label htmlFor="video" style={{cursor:'pointer'}} ><h6>Video</h6></label> <PersonalVideoIcon/>  <br/>
            
             </>            
            : null
          }
          {/* {
            this.state.DA_Type==='audio' ?   
            <>     
             <label htmlFor="audio" style={{cursor:'pointer'}}><h6>Audio</h6></label> <AudiotrackIcon/>  
             </>            
            : null
          } */}
           {
            this.state.DA_Type==='image' ?   
            <>     
             <label htmlFor="photo" style={{cursor:'pointer'}}><h6>Photo</h6></label> <ImageIcon/>  
             </>            
            : null
          }
          {           
            this.state.DA_Type==='NA' ?  
            <>         
            <label htmlFor="video" style={{cursor:'pointer'}}><h6>Video</h6></label> <PersonalVideoIcon/>  <br/>  
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
               <button onClick={this.ModalOpen}><CreateIcon />     
      </button>
                 
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
            <p className="addnew-title">{"Personalized video or audio message"}</p>
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
                  {           
                    this.state.DA_Type==='video' && this.state.hideVideoAudio===false?
                                    <video className="img-thumbnail-custom" width="100%" controls src={this.state.videoData_Edit} type="video/mp4" >                                   
                                    </video>
                                :
                                null
                  
                  }
                  {            
                               this.state.DA_Type==='audio' && this.state.hideVideoAudio===false?
                                    <audio autoplay controls src={this.state.audioData_edit}>
                                          The “audio tag is not supported by your browser.
                                      </audio>
                                :
                                null
                  
                  }
              </div>
              <div className="col-md-12">
                <input type="text" name="DA_Title" value={this.state.DA_Title} onChange={this.handleChange} className="form-control" placeholder="Title" />       
              </div>
              <div className="col-md-12">
                <textarea className="form-control area" value={this.state.DA_Description} name="DA_Description" onChange={this.handleChange} 
                  placeholder="enter description"/>
              </div>
              <div className="col-md-12">
                <input type="text" name="DA_Price" id="DA_Price"  disabled={this.state.isPriceDisabled} onChange={this.handleChange} 
                value={this.state.DA_Price} className="form-control" placeholder=" Price" 
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                />       
              </div>
              <div className="col-md-12 desktopCharge">
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
              <div className="col-md-12 mobileCharge" style={{fontFamily: 'consolas', fontSize: '13px',textTransform: 'capitalize'}}>
                      &nbsp;{this.state.chargesInfo}
                     <OverlayTrigger  className="mobile" style={chargesStyle} trigger="click" placement="top" overlay={popover2}>           
                         <i class="fa fa-question-circle" aria-hidden="true"  style={iconStyle}></i>                     
                      </OverlayTrigger >  
                </div>        


                <div className="col-md-12">
                        <label>
                               <strong>  
                                  Settings 
                              </strong>     
                       </label>
                </div>                  
                <div className="col-md-8 col-9">
                    <label >
                    Let your followers pay what they want     
                      </label>
                </div>  
              <div className="col-md-4 col-3">
                    
                    <label class="switch"  for="allowCustomertoPay">
                    <input type="checkbox" id="allowCustomertoPay" checked={this.state.allowCustomertoPay===1?true:false} onChange={this.onchangeCheck} />
                        <div class="slider round"></div>
                      </label>
                </div>
                {
                  this.state.showDiv===true ?      
                  <>            
                        <div className="col-md-6">
                        <label >
                               <strong>  
                                  Minimum Amount 
                              </strong>     
                       </label>
                        <input type="text" name="min_amt" 
                        value={this.state.min_amt}  onChange={this.handleChange} 
                        className="form-control" placeholder="Enter Price" 
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        />       
                        <p style={{fontSize:'12px',fontWeight:'600'}}>{API.dynamicPriceMessage()}</p>
                      </div>
                    <div className="col-md-6" style={{display:'none'}}>
                       <label>
                               <strong>  
                                  Suggested Amount 
                              </strong>     
                       </label>
                      <input type="text" name="suggested_amt" 
                      value={this.state.suggested_amt} onChange={this.handleChange} 
                      className="form-control" placeholder="Enter Price" 
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      />       
                    </div>
                  </>
                  :
                  null
                }
            </div>
            <div className="btun-box">
              <button className="btun"  onClick={this.nextClick} disabled={this.state.disabledBtn}> {this.state.BtnName} <NavigateNextIcon/></button>
              <p id="msg"></p> 
            </div>
          </div>
        </Modal.Body>

      </Modal>

    
            </>
        );
    }
}

EditPremiumFeature2.propTypes = {

};

export default EditPremiumFeature2;