import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import AddIcon from '@material-ui/icons/Add';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import API  from '../services/API';
class ContestGiveAway extends Component 
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
            overlayTarget:null,
            name_checked:true,
            email_checked:true,     
            dob_checked:false, 
            first_name_checked:false,
            last_name_checked:false,
            phone_checked:false,

            question_1:'',
            question_2:'',
            question_3:'',
            question_4:'',
            File_upload_text:'',
            allowCustomertoPay: 0,
            min_amt: '',
            suggested_amt: '',
            showDiv: false,


            }
            //console.log(this.state.userDetails)
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
                disabledBtn:false,
                showDiv:false,price:0,                    
                question_1:'',
                question_2:'',
                question_3:'',
                question_4:'',
                File_upload_text:'',
                allowCustomertoPay: 0,
                min_amt: '',
                suggested_amt: '',
                title:'',
                description:'',
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
                  //console.log(data);
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
            
                const upload=document.getElementById('upload_file').checked;
                if(upload===true && this.state.File_upload_text.length ===0)
                {
                  document.getElementById('msg_contest').innerHTML='* Enter text for file upload'
                    return false;
                }
                let chk_file=0;
                if(upload===true)
                  chk_file=1

                              
                  //27-aug-2021 dynamic pricing
                  if(this.state.allowCustomertoPay===1)
                  {
                      if( isNaN(parseInt(this.state.min_amt)) || parseInt(this.state.min_amt) < 0 )
                      {
                          document.getElementById('msg_contest').style.color='red';
                          document.getElementById('msg_contest').innerHTML='* Enter minimum amount';
                          return false;
                      }
                  }



                const formData = new FormData(); 
                let Api_url="";             
                if(this.state.videoFile !==null && this.state.videoData!=='NA' && this.state.videoData!=='')
                  {  
                      formData.append('sampleFile', this.state.videoFile);
                      formData.append('DA_Type', 'video');   
                      Api_url=this.state.base_url+'admin/addContest';
                      formData.append('DA_DA_ID', 6) // for premium featured id
                      formData.append('JM_ID', this.props.JM_ID)         
                      formData.append('DA_Title', this.state.title)  
                      formData.append('DA_Description', this.state.description)  
                      formData.append('DA_Cover', "") 
                      formData.append('DA_Price', this.state.price)      
                      formData.append('JM_User_Profile_Url_plus_JM_ID',this.props.JM_User_Profile_Url + "_" + this.props.JM_ID)
                      
                      formData.append('Q1', this.state.question_1)    
                      formData.append('Q2', this.state.question_2)    
                      formData.append('Q3', this.state.question_3) 
                      formData.append('Q4', this.state.question_4)

                      formData.append('File_upload_text', this.state.File_upload_text)
                      formData.append('DA_Allow_Cust_Pay', this.state.allowCustomertoPay)

                      formData.append('File_Upload', chk_file)

                      formData.append('DA_Allow_Cust_Pay', this.state.allowCustomertoPay)
                      formData.append('DA_Min_Amount', parseInt(this.state.min_amt))
                  


                      this.setState({BtnName:'Uploading..',disabledBtn:true});

                      try{


                            fetch(Api_url, {
                              method: 'POST',
                              headers: { "authorization": API.getAuth(),"id":API.getId()},
                              body: formData
                            })
                              .then(response => response.json())
                              .then(data => {
                                //console.log(data);
                                if (data.status > 0) {
                                  this.setState({ videoFile: null, videoData: 'NA', audioFile: null, audioData: '', coverImageorVideo: null, cover_Image_video: '' });
                                  this.fileArray = [];
                                  this.ModalClose();
                                  this.props.showToast('success', 'Contest feature is added to profile');

                                }
                                else 
                                {

                                  API.minusResponse(data);
                                  this.setState({BtnName:'Save',disabledBtn:false});
                                  this.props.showToast('Failed', 'Server Error');
                                }

                              })
                              .catch(error => 
                              { 
                                this.setState({BtnName:'Save',disabledBtn:false});
                                this.props.showToast('Failed', 'Network Error');
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
                    Api_url=this.state.base_url+'admin/addContest';
                                  
                      formData.append('DA_DA_ID', 6) // for premium featured id
                      formData.append('JM_ID', this.props.JM_ID)         
                      formData.append('DA_Title', this.state.title)  
                      formData.append('DA_Description', this.state.description)  
                      formData.append('DA_Cover', "") 
                      formData.append('DA_Price', this.state.price)      
                      formData.append('JM_User_Profile_Url_plus_JM_ID',this.props.JM_User_Profile_Url + "_" + this.props.JM_ID)
                      formData.append('Q1', this.state.question_1)    
                      formData.append('Q2', this.state.question_2)    
                      formData.append('Q3', this.state.question_3) 
                      formData.append('Q4', this.state.question_4) 
                      formData.append('File_Upload', chk_file)
                      formData.append('File_upload_text', this.state.File_upload_text)
                      formData.append('DA_Allow_Cust_Pay', this.state.allowCustomertoPay)  
                      formData.append('DA_Min_Amount', parseInt(this.state.min_amt))   
                      this.setState({BtnName:'Uploading..',disabledBtn:true});



                        try{


                              fetch(Api_url, {
                                method: 'POST',
                                headers: { "authorization": API.getAuth(),"id":API.getId()},
                                body: formData
                              })
                                .then(response => response.json())
                                .then(data => {
                                  //console.log(data);
                                  if (data.status > 0) 
                                  {
                                    this.setState({ videoFile: null, videoData: 'NA', audioFile: null, audioData: '', coverImageorVideo: null, cover_Image_video: '' });
                                    this.fileArray = [];
                                    this.ModalClose();
                                    this.props.showToast('success', 'Contest feature is added to profile');

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
                               
                      Api_url=this.state.base_url+'admin/addContestNoFile';
                            var flagData={
                              DA_DA_ID:6,
                              JM_ID: this.props.JM_ID,
                              DA_Title: this.state.title,
                              DA_Description: this.state.description,
                              DA_Price: this.state.price,
                              Q1: this.state.question_1,
                              Q2: this.state.question_2,
                              Q3: this.state.question_3,
                              Q4: this.state.question_4,
                              File_Upload:chk_file,
                              File_upload_text: this.state.File_upload_text,
                              DA_Allow_Cust_Pay: this.state.allowCustomertoPay,
                              DA_Min_Amount: parseInt(this.state.min_amt)                              
                    
                            }
                       
                            const flag=API.encryptData(flagData);
                            let  JSONdata = {
                                flag: flag
                              };


                        try{
                          
                          fetch(Api_url, {
                            method: 'POST',
                            headers: { "Content-Type": "application/json", "authorization": API.getAuth(),"id":API.getId()},
                            body: JSON.stringify(JSONdata)
                          })
                            .then(response => response.json())
                            .then(data => {
                              //console.log(data);
                              if (data.status > 0) {
                                this.setState({ videoFile: null, videoData: 'NA', audioFile: null, audioData: '', coverImageorVideo: null, cover_Image_video: '' });
                                this.fileArray = [];
                                this.ModalClose();
                                this.props.showToast('success', 'Contest feature is added to profile');

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
                document.getElementById('msg_contest').innerHTML="Empty title or description";
                //this.props.showToast('info', 'Empty title or description');
            }
        }
        validation =()=>{
             
              
                if(this.state.title.length > 0 && this.state.description.length > 0 
                    && this.state.email_checked===true 
                    && this.state.name_checked===true)
                    return true;
                else
                    return false;         
               
        }
        handleChange=(e)=>{
         
           this.setState({[e.target.name]:e.target.value})   
            
        }
        handlePrice=(e)=>{
          let val=isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
          this.setState({[e.target.name]:val}) 
          if(val > 0)
          {
            let fee=val * API.razorPayTax();
            let gst=fee * API.razorPayGST();         
            let razorPay=(fee+gst); // 1.65 + 0.297
            let TenPer=(val - razorPay) * 10/100; // 10 if val is 100                  
            let charges= val - razorPay - TenPer; // 100 - 1.65- 0.297                      
            let chargesInfo="You'll receive INR "+ charges.toFixed(2) + " ";

            let showIconCharges = 'block';
            this.setState({ chargesInfo, showIconCharges });
          }
          else
          {
            let chargesInfo="";
            let showIconCharges = 'none';
            this.setState({ chargesInfo, showIconCharges });
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

        overlayClick=(e)=>{
          this.setState({
            OverlayTrigger:e.target,
            Overlayshow:true
          })
        }
        onchangeCheck=(e)=>{

          if(e.target.checked===true)
          {
            this.setState({
              allowCustomertoPay:1,
              showDiv:true,
              price:0
            })
            
            document.getElementById('enter_price').disabled=true;
          }
          else
          {
            this.setState({
              allowCustomertoPay:0,
              showDiv:false
            })
            document.getElementById('enter_price').disabled=false;
          }
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
        let chargesMessage = API.chargesMessage();
        
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
                              Upload intro photo/video (Optional)     
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
                            <EmojiEventsIcon style={{fontSize: '50px'}}/>
                          </div>
                          <div className="text">
                            <h4>Contests And Giveaways</h4>                           
                            <button class="btun"  onClick={this.ModalOpen}><AddCircleOutlineIcon/> Add This</button>
                          
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
            <p className="addnew-title"> Contests and Giveaways</p>
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
            </div>
            <div className="col-md-12 concert-box">
              <div className="row">
                <div className="col-md-12">
                  <label>Participation Form</label>
                </div>
              </div>
              <div className="row concert-row">
                <div className="col-md-10 col-8">
                  <label>Name</label>
                </div>
                <div className="col-md-2 col-4 concert">                 
                  <label class="switch" for="name">
                  <input type="checkbox" id="name" checked disabled/>
                  <div class="slider round"></div>
                  </label>
                </div>
              </div>
              <div className="row concert-row">
                <div className="col-md-10 col-8">
                  <label>Email</label>
                </div>
                <div className="col-md-2 col-4 concert">
                  
                  <label for="email" class="switch">
                  <input type="checkbox" id="email" checked disabled/>
                      <div class="slider round"></div>
                  </label>
                </div>
              </div>
              <div className="row concert-row">
                <div className="col-md-10 col-8">
                  <label>File upload</label>
                </div>
                <div className="col-md-2 col-4 concert"> 
                  <label class="switch" for="upload_file">
                    <input type="checkbox" id="upload_file" />
                      <div class="slider round"></div>
                  </label>
                </div>
              </div>
              <div className="row concert-row">
                <div className="col-md-4 col-8">
                  <label>Write the Text for file upload</label>
                </div>
                <div className="col-md-8 col-4 concert">  
                    <input type="text" className="form-control" name="File_upload_text" id="text_for_file_upload" placeholder="Enter the Text for file upload" onChange={this.handleChange}/>
                </div>
              </div>

              <div className="row concert-row">
                <div className="col-md-4 col-12">
                  <label>Question no 1.</label>
                </div>
                <div className="col-md-8 col-12">
                  <textarea className="form-control area" row="3" placeholder="Enter 1st Question (optional)" name="question_1" value={this.state.question_1} onChange={this.handleChange}></textarea>
                {/* <input type="text" className="form-control" placeholder="Enter 1st Question" name="question_1" value={this.state.question_1} onChange={this.handleChange}/> */}
                </div>
                {/* <div className="col-md-2 col-4 concert">
                  <input type="checkbox" id="q1"/>
                  <label for="q1"></label>
                </div> */}
              </div>
              <div className="row concert-row">
                    <div className="col-md-4 col-12">
                    <label>Question no 2.</label>
                    </div>
                    <div className="col-md-8 col-12">
                    {/* <input type="text" className="form-control"  placeholder="Enter 2nd Question" name="question_2" value={this.state.question_2} onChange={this.handleChange}/> */}
                    <textarea className="form-control area" row="3" placeholder="Enter 2nd Question (optional)" name="question_2" value={this.state.question_2} onChange={this.handleChange}></textarea>
                   
                    </div>
                    {/* <div className="col-md-2 col-4 concert">
                    <input type="checkbox" id="q2"/>
                    <label for="q2"></label>
                    </div> */}
              </div>
              <div className="row concert-row">
                    <div className="col-md-4 col-12">
                    <label>Question no 3.</label>
                    </div>
                    <div className="col-md-8 col-12">
                    {/* <input type="text" className="form-control"  placeholder="Enter 3rd Question" name="question_3" value={this.state.question_3} onChange={this.handleChange}/> */}
                    <textarea className="form-control area" row="3" placeholder="Enter 3rd Question (optional)" name="question_3" value={this.state.question_3} onChange={this.handleChange}></textarea>
                   
                    </div>
                    {/* <div className="col-md-2 col-4 concert">
                    <input type="checkbox" id="q3"/>
                    <label for="q3"></label>
                    </div> */}
              </div>
              <div className="row concert-row">
                    <div className="col-md-4 col-12">
                    <label>Question no 4.</label>
                    </div>
                    <div className="col-md-8 col-12">
                    {/* <input type="text" className="form-control"  placeholder="Enter 4th Question" name="question_4" value={this.state.question_4} onChange={this.handleChange}/> */}
                   
                    <textarea className="form-control area" row="3" placeholder="Enter 4th Question (optional)" name="question_4" value={this.state.question_4} onChange={this.handleChange}></textarea>
                   
                    </div>
                
              </div>
              <div className="row concert-row">
                    <div className="col-md-4 col-12">
                    <label>Price to enter</label>
                    </div>
                    <div className="col-md-4 col-12">
                    {/* <input type="text" className="form-control"  placeholder="Enter 4th Question" name="question_4" value={this.state.question_4} onChange={this.handleChange}/> */}
                   
                    <input type="text" className="form-control" id="enter_price" placeholder="Enter Price" name="price" 
                            value={this.state.price} onChange={this.handlePrice}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                              }
                              }}                    
                            />
                   
                    </div>
                
                 {/* message info */}
                <div className="col-md-4 col-12 desktopCharge">
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
              <div className="col-md-4 col-12 mobileCharge" style={{fontFamily: 'consolas', fontSize: '13px',textTransform: 'capitalize'}}>
                      &nbsp;{this.state.chargesInfo}
                     <OverlayTrigger  className="mobile" style={chargesStyle} trigger="click" placement="top" overlay={popover2}>           
                         <i class="fa fa-question-circle" aria-hidden="true"  style={iconStyle}></i>                     
                      </OverlayTrigger >  
                </div>


              </div>

              
                  <div className="row concert-row">
                    <div className="col-md-8 col-9">
                          <label >
                              Let your followers pay what they want
                          </label>
                      </div>
                      <div className="col-md-4 col-3">
                          <label className="switch" for="allowCustomertoPay">
                              <input type="checkbox" id="allowCustomertoPay" onChange={this.onchangeCheck} />
                              <div className="slider round"></div>
                          </label>
                      </div>
                          {
                            this.state.showDiv === true ?
                                <>
                                    <div className="col-md-6">
                                        <label >
                                            <strong>
                                                Minimum Amount
                                            </strong>
                                        </label>
                                        <input type="text" name="min_amt"
                                            value={this.state.min_amt} onChange={this.handleChange}
                                            className="form-control" placeholder="Enter Price"
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <p style={{ fontSize: '12px', fontWeight: '600' }}>{API.dynamicPriceMessage()}</p>
                                    </div>
                                    <div className="col-md-6" style={{ display: 'none' }}>
                                        <label >
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
         </div>
         
            <div className="btun-box">
              <button className="btun"  onClick={this.nextClick} disabled={this.state.disabledBtn}> {this.state.BtnName} <NavigateNextIcon/></button>
              {/* <button className="btun" onClick={this.isConfirm}>Cancel</button> */}
              <p id="msg_contest" style={{color:'red'}}></p>
            </div>
          </div>
        </Modal.Body>

      </Modal>

    
            </>
        );
    }
}

ContestGiveAway.propTypes = {

};

export default ContestGiveAway;