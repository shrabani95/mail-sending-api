import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal'

import CreateIcon from '@material-ui/icons/Create';

import {ProgressBar} from 'react-bootstrap';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';

class EditUnlockContent extends Component 
{
    fileObj = [];
    fileArray = [];
    albumArray=[];
     Files = [];
     cancelFileUpload=null;
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
            textFileUrl:'',
            textFile:[],
            uploadPercentage: 0,
            avatar: '',

            disabledBtn:false,
            BtnName:'Save',
            pdfFileUrl:'',
            pdfFile:null,

            chooseType_1:false,
            chooseType_2:false,
            chooseType_3:false,
            chooseType_4:false,
            errMsg:''

            }
            console.log(this.state.userDetails)
            this.imageonMultiChange = this.imageonMultiChange.bind(this)
        
        }
        ModalClose=()=>
        {    

            this.setState({openModel:false,show:false});
            this.setState({ 
              audioFile: null ,
              audioData: '',
              textFile: null ,
              textFileUrl: '',
              videoData:'',
              videoFile:null,
            }); 
            this.albumArray=[];

        }
        ModalOpen=()=>{
                this.setState({openModel:true,show:true,chargesInfo:'',showIconCharges:'none'});

                console.log(this.props.data)
                this.setState({ 
                  title:this.props.data.DA_Title,
                  description:this.props.data.DA_Description,
                  JM_ID:this.props.data.JM_ID,
                  DA_Type:this.props.data.DA_Type,
                  DA_ID:this.props.data.DA_ID,
                  DA_Collection:'',
                  price: this.props.data.DA_Price,                            
              });

             var files = JSON.parse(this.props.data.DA_Collection); 
            
            if(this.props.data.DA_Type==="album")    
              {  
                for (var i = 0, numFiles = files.length; i < numFiles; i++) 
                { 
                var file =files[i];
                this.albumArray.push(file);           
                
                }
                this.setState({ 
                  chooseType_1:true,
                  chooseType_2:false,
                  chooseType_3:false,
                  chooseType_4:false,     
                  radioStyle1:{fontWeight:'600',color:'#ff746e'},
                  radioStyle2:'',
                  radioStyle3:'',
                  radioStyle4:'',              
                });
            }
            if(this.props.data.DA_Type==="image")    
            {  
              this.albumArray=[];
              for (var i = 0, numFiles = files.length; i < numFiles; i++) 
              { 
              var file =files[i];

              this.albumArray.push(file);           
              
              }
              this.setState({ 
                  chooseType_1:true,
                  chooseType_2:false,
                  chooseType_3:false,
                  chooseType_4:false,     
                  radioStyle1:{fontWeight:'600',color:'#ff746e'},
                  radioStyle2:{},
                  radioStyle3:{},
                  radioStyle4:{},
                      
              });
          }
            if(this.props.data.DA_Type==="video")    
            {   
                
                if(files!=null && files.length > 0)                
                    this.setState({ 
                        videoData:files[0],
                        chooseType_1:false,
                        chooseType_2:true,
                        chooseType_3:false,
                        chooseType_4:false,  
                        radioStyle1:{},
                        radioStyle2:{fontWeight:'600',color:'#ff746e'},
                        radioStyle3:{},
                        radioStyle4:{},                    
                    });
            }
            if(this.props.data.DA_Type==="audio")    
                   { 
                     
                    this.setState({ 
                        chooseType_1:false,
                        chooseType_2:false,
                        chooseType_3:true,
                        chooseType_4:false, 
                        audioData:files[0],  
                        radioStyle1:{},
                        radioStyle2:{},
                        radioStyle3:{fontWeight:'600',color:'#ff746e'},
                        radioStyle4:{},  
                    });
                  
                  }
               if(this.props.data.DA_Type==="txt")    
                  {  
          

                    this.setState({ 
                        chooseType_1:false,
                        chooseType_2:false,
                        chooseType_3:false,
                        chooseType_4:true,  
                        textFileUrl:files[0],  
                        type:'docx',
                        radioStyle1:{},
                        radioStyle2:{},
                        radioStyle3:{},
                        radioStyle4:{fontWeight:'600',color:'#ff746e'},                      
                    });
                         
                  }
                  if(this.props.data.DA_Type==="pdf")    
                  {  
            
                    this.setState({ 
                        chooseType_1:false,
                        chooseType_2:false,
                        chooseType_3:false,
                        chooseType_4:true,  
                        pdfFileUrl:files[0],  
                        type:'pdf',
                        radioStyle1:{},
                        radioStyle2:{},
                        radioStyle3:{},
                        radioStyle4:{fontWeight:'600',color:'#ff746e'},                      
                    });                   
        
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
           this.setState({ 
              audioFile: null ,
              audioData: '',
              textFile: null ,
              textFileUrl: '',
            }); 
            this.albumArray=[];

            const file = e.target.files[0];
            if(typeof file!=='undefined')
            {
              var fileUrl = window.URL.createObjectURL(file);
              this.setState({ imageFile: e.target.files[0] }); 
              this.setState({
              videoFile: file,
              videoData:fileUrl
              });
              
           
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
            cover_Image_video: URL.createObjectURL(file)
            });
           console.log(this.state.cover_Image_video)
        }
        nextClick=(event)=>{
            event.preventDefault();
            let isValid=this.validation();
            if(isValid)
            {
                //alert("ok");
            
                const formData = new FormData(); 

                let Api_url=this.state.base_url+'admin/updateProduct';
               // let Api_url='http://localhost:9000/admin/addProduct';
                if(this.state.videoFile !==null && this.state.videoData!=='NA' && this.state.videoData!=='')
                  {  
                      formData.append('sampleFile', this.state.videoFile);
                      formData.append('DA_Type', 'video'); 
                      this.albumArray=[]; 
                      this.setState({
                        audioFile:null,album:null,textFile:null
                      });
                  }
             else  if(this.state.audioFile !==null && this.state.audioData!=='')
                 {   
                    formData.append('sampleFile', this.state.audioFile)
                    formData.append('DA_Type', 'audio'); 
                    this.albumArray=[];                 
                    this.setState({
                     album:null,textFile:null,videoFile:[]
                    });
                 }
              else  if(this.state.album!==null && this.albumArray!==null && this.albumArray.length > 0)
                {
                        // formData.append('DA_Type', 'album');                
                        // const ins = this.Files.length;
                        // console.log(this.Files)
                        // const arr=[];
                        //    for (var x = 0; x < ins; x++)
                        //   {                        
                 
                        //        formData.append('img_multiple',this.Files[x]);
                                
                        //    }

                           formData.append('DA_Type', 'image'); 
                           formData.append('sampleFile', this.state.coverImageorVideo) 
             
                
                }
               else if(this.state.pdfFile !==null && this.state.pdfFileUrl!=='')
                 {   
                    formData.append('sampleFile', this.state.pdfFile)
                    formData.append('DA_Type', 'pdf'); 
                    this.albumArray=[];                 
                    this.setState({
                     album:null,textFile:null,videoFile:null,audioFile:null,
                    });
                 }
               else  if(this.state.textFile !==null && this.state.textFileUrl!=='')
                 {   
                    formData.append('sampleFile', this.state.textFile)
                    formData.append('DA_Type', 'txt'); 
                    this.albumArray=[];                 
                    this.setState({
                     album:null,videoFile:null,audioFile:null,pdfFile:null
                    });
                 }
                 else   if(this.state.pdfFile !==null && this.state.pdfFileUrl!=='')
                 {   
                    formData.append('sampleFile', this.state.pdfFile)
                    formData.append('DA_Type', 'pdf'); 
                    this.albumArray=[];                 
                    this.setState({
                     album:null,textFile:null,videoFile:null,audioFile:null,
                    });
                 }
               
                
                formData.append('DA_DA_ID', 2) // for premium featured id
                formData.append('JM_ID', this.props.data.JM_ID)       
                formData.append('DA_ID', this.props.data.DA_ID)     
                formData.append('DA_Title', this.state.title)  
                formData.append('DA_Description', this.state.description)  
                formData.append('DA_Cover', "") 
                formData.append('DA_Price', this.state.price)      
                formData.append('JM_User_Profile_Url_plus_JM_ID',this.props.JM_User_Profile_Url_plus_JM_ID)
                this.setState({BtnName:'Uploading..',disabledBtn:true});
                fetch(Api_url, {
                  method: 'POST',         
                  body: formData
                  })
                  .then(response => response.json())
                  .then(data => 
                  {                   
                      console.log(data);   
                     if(data.status > 0)
                     {
                          this.setState({
                                videoFile:null,
                                videoData:'NA',
                                audioFile:null,
                                audioData:''
                          });
                          this.fileArray=[];     
                          this.setState({disabledBtn:false,BtnName:'Save'});
                          this.ModalClose();                     
                          this.Get_User_Details();   
                         
                     }
                      else
                      {
                        var errMsg="Internal error occered, Try later";
                        this.setState({disabledBtn:false,BtnName:'Save',errMsg}); 
                      }                     
                  })
                  .catch(error => 
                  {

                   // this.props.showToast('error','internal error occered'); 
                     var errMsg="Internal error occered, Try later";
                    this.setState({disabledBtn:false,BtnName:'Save',errMsg});                  
                    
                  })

              //   const CancelToken = axios.CancelToken;
              //   const source = CancelToken.source();
              //   const options = {
              //     onUploadProgress: (progressEvent) => 
              //     {
              //       const {loaded, total} = progressEvent;
              //       let percent = Math.floor( (loaded * 100) / total )
              //       console.log( `${loaded}kb of ${total}kb | ${percent}% wait...` );
        
              //       if( percent < 100 )
              //       {
              //         this.setState({ uploadPercentage: percent })
              //       }
              //     },
              //     cancelToken: source.token,
                  
              //   }
           
              //  this.setState({BtnName:'Uploading..',disabledBtn:true});
              //   axios.post(Api_url, formData, options).then(res =>
              //   { 

              //     if(res.data.status > 0)
              //     {
              //        this.setState({videoFile:null,videoData:'NA',audioFile:null,audioData:''});
              //        this.fileArray=[];     
                    
              //        this.setState({ avatar: res.data.url, uploadPercentage: 100 }, ()=>{
              //         setTimeout(() => {
              //           this.setState({ uploadPercentage: 0 })
              //         }, 1000);
              //       })            
              //         this.ModalClose();         
              //        this.props.showToast('success','Premium feature is added to profile');                     
              //        this.setState({disabledBtn:false,BtnName:'Save'});
              //     }
              //     else
              //     {
                    
              //       this.props.showToast('error','internal error occered'); 
              //       this.setState({disabledBtn:false,BtnName:'Save'});
              //     }     
              //       console.log(res.data)
              //   })
              //   .catch(err => {
              //     console.log(err);
  
              //     if (isCancel(err)) 
              //     {
              //         //alert(err.message);
              //         this.props.showToast('canceled',err.message); 
              //         this.setState({disabledBtn:false,BtnName:'Save'});
              //     }
              //     this.setState({ uploadPercentage: 0 })
              // });

              // this.setState({source});


            }
            else
            {
              var errMsg="fill all the neceessary fields and upload a file";
              this.setState({
                errMsg
              })           
            }
           
        }

        Get_User_Details = () => 
        {
                var JSONdata = {
                  JM_ID: this.props.data.JM_ID
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
                    directAccess:data.directAccess,
                    productList:data.productList,
                    socialWidget:data.socialWidget,
                    category_master:data.category_master,
                    category_links:data.category_links,
                    embed_content:data.embed_content,
                    title:'Success!!!',
                    msg:'Profile is updated',
                    gifts: data.gifts,
                  });
                  this.props.setStateAfterInsert(this.state);
                }   
                  else
                    alert('not fetch');
              });
        }       
        validation =()=>
        {            
              
          if(this.state.description.length > 0 && parseInt(this.state.price) > 0 && (this.state.audioFile!==null || this.state.videoFile!==null||  (this.albumArray!==null &&  this.albumArray.length > 0) || this.state.textFile!==null  || this.state.pdfFile!==null ))
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
              let charges=val - razorPay - TenPer;



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
            this.Files.push(file);
          }
      
          this.setState({ album: this.albumArray })

          const fileMain = e.target.files[0];
          this.setState({ coverImageorVideo: e.target.files[0] }); 
          this.setState({
          cover_Image_video: URL.createObjectURL(fileMain)
          });
         console.log(this.state.cover_Image_video)
      
      }

        hideToast=()=>{
          this.setState({showAlert:false})
        }
        showToast =() =>{
          this.setState({showAlert:true})
        }

        openBrowsFile=id=>e=>{
            document.getElementById(id).click();
         

           this.setState({ 
            audioFile: null ,
            audioData: '',
            textFile: null ,
            textFileUrl: '',
            albumArray:null,
            videoData:'',
            videoFile:null,
          }); 
        }
        cancelAlbum=id=>e=>
        {
            console.log(this.albumArray) 
            console.log(id)
            const i = id
            if(this.albumArray!==null)
            {
                const filteredItems = this.albumArray.slice(0, i).concat(this.albumArray.slice(i + 1, this.albumArray.length))
                this.albumArray=filteredItems;
                this.setState({ album: null })
                const ins = document.getElementById('upImage').files.length;
                this.Files.splice(id, 1);
            }
            console.log(this.Files);
            this.setState({
              cover_Image_video: '',
              coverImageorVideo:null
              });
        }

        textFileChange=e=>{

          if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
            return;
          }
        
            const name = e.target.files[0].name;
            const lastDot = name.lastIndexOf('.');        
            const fileName = name.substring(0, lastDot);
            const ext = name.substring(lastDot + 1);

            const file = e.target.files[0];
            const type=  e.currentTarget.dataset.filetype; 
            console.log( e.target.files[0].type)   
          if(ext==='docx')
          {
            this.setState({ textFile: e.target.files[0] }); 
            this.setState({
                textFileUrl: URL.createObjectURL(file),
                type:ext
            });

          }
         else if(ext==='pdf')
          {
            this.setState({ pdfFile: e.target.files[0] }); 
            this.setState({
                pdfFileUrl: URL.createObjectURL(file),
                type:ext
            });
            console.log(URL.createObjectURL(file))
          }   
           
   
        }
        onError(e) {
           console.log('error in file-viewer');
          }
          onInputClick = (event) => {
            if(event.target.name==='upImage' || event.target.name==='upVideo' || event.target.name==='upAudio' || event.target.name==='upText')
                event.target.value = ''


                this.albumArray=[];
        }
         
  
    render() {
      const {uploadPercentage} = this.state;
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
        let chargesMessage="You receive 90% of the transaction value minus a 2% transaction fee that is collected by our payment provider.";
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
        const radioStyle={
          color: "#ff626f",
          fontWeight: "600",        
        }

        let typeOfProduct;
        
          typeOfProduct= <> <div className="col-md-8">
                              <label for="upImage" style={{    marginTop: "10px"}}>
                                Upload a Video or Audio             
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
                                  
                           </div>  
                          </>
      

    let type='video';
    const popover = (
      <Popover id="popover-basic">
         <button type="button" className="pop-close"><span aria-hidden="true" onClick={this.hidePopover}>×</span>
          <span className="sr-only">Close</span>
        </button>
        <Popover.Title as="h6"><h6>Select  video or Audio</h6>
       
        </Popover.Title>
        <Popover.Content>
          {           
            type==='video' ?   
            <>         
             <label htmlFor="video" style={{cursor:'pointer'}}><h6>Video</h6></label> <PersonalVideoIcon/>  <br/>
             <label htmlFor="audio" style={{cursor:'pointer'}}><h6>Audio</h6></label> <AudiotrackIcon/>  
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
                                          
                            {/* <button class="btun"  onClick={this.ModalOpen}><AddCircleOutlineIcon/> Add This</button> */}
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
            <p className="addnew-title">Unlock content</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="direct-access-pop" id="myform">
            <div className="row">
            <div className="col-md-12">
                <label>Choose Your File Type</label>
              </div>
              <div className="col-md-12">
                <div className="choose-part">
                  <input type="radio" id="chooseType_1"  name="chooseType" onClick={this.openBrowsFile('upImage')}/><label for="chooseType_1"   style={this.state.radioStyle1}>Images</label>
                </div>
                <div className="choose-part">
                  <input type="radio" id="chooseType_2"  name="chooseType" onClick={this.openBrowsFile('upVideo')}/><label for="chooseType_2"  style={this.state.radioStyle2}>Video</label>
                </div>
                <div className="choose-part">
                  <input type="radio" id="chooseType_3"  name="chooseType" onClick={this.openBrowsFile('upAudio')}/><label for="chooseType_3"  style={this.state.radioStyle3}>Audio</label>
                </div>
                <div className="choose-part">
                  <input type="radio" id="chooseType_4"  name="chooseType" onClick={this.openBrowsFile('upText')}/><label for="chooseType_4"  style={this.state.radioStyle4}>Text or PDF</label>
                </div>
               
                
              </div>
              <div className="col-md-12" >                    
                      <input type="file" id="upImage" name="upImage" style={{ display: "none" }} accept="image/png, image/jpeg,image/gif" onClick={this.onInputClick} onChange={this.imageonMultiChange}/>       
                      <input type="file" id="upVideo" name="upVideo" style={{ display: "none" }} accept="video/mp4" onClick={this.onInputClick} onChange={this.videoonChange}/>       
                      <input type="file" id="upAudio" name="upAudio" style={{ display: "none" }} accept="audio/mp3" onClick={this.onInputClick} onChange={this.audioChange} />
                      <input type="file" id="upText" name="upText"  data-filetype="docx" style={{ display: "none" }}  onClick={this.onInputClick} accept=".docx,.pdf" onChange={this.textFileChange}/>       
              </div>
              
              <div className="col-md-12">
                <div className="row">
                            {
                              this.albumArray!==null &&  this.albumArray.length > 0 ?
                                (this.albumArray || []).map((url,i) => (
                                  <>                                  
                                    <div className="col-md-3">
                                          <div className="img-grid">                                                                             
                                          <img src={url.includes('blob') ? url : process.env.REACT_APP_UPLOAD_URL+"Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+url} />
                                          <div className="cls"  onClick={this.cancelAlbum(i)}>x</div>
                                          </div>
                                      </div>
                                    </>
                                ))
                                :
                                null
                            }
                             <div className="col-md-8 offset-md-2">
                            {
                               
                                this.state.videoData!=='NA' && this.state.videoData!=='' ?              
                                        <video className="img-thumbnail-custom" width="100%" controls 
                                        src={this.state.videoData.includes('blob') ? this.state.videoData : process.env.REACT_APP_UPLOAD_URL+"Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+this.state.videoData} type="video/mp4" >                                   
                                        </video>
                                        : null
                               
                            }  
                            {
                            this.state.audioData!=='' ?     
                                <audio autoplay controls src={this.state.audioData.includes('blob') ? this.state.audioData : process.env.REACT_APP_UPLOAD_URL+"Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+ this.state.audioData}>
                                  The “audio tag is not supported by your browser.
                                </audio>
                                : 
                                null
                            }
                             </div>
                             <div className="col-md-12">
                                {
                                      this.state.textFileUrl!=='' && this.state.textFileUrl.includes('blob')===false?                           
                                      
                                          <a  target="_blank" href={process.env.REACT_APP_UPLOAD_URL+"Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+ this.state.textFileUrl}>
                                              View file
                                          </a>
                                        : this.state.textFileUrl!=='' && this.state.textFileUrl.includes('blob') ? 
                                          <FileViewer
                                            fileType={this.state.type}
                                            filePath={this.state.textFileUrl}
                                            errorComponent={CustomErrorComponent}
                                            onError={this.onError}/>    
                                        :
                                           null 
                                    
                                  }

                                {
                                  this.state.pdfFileUrl!=='' && this.state.pdfFileUrl.includes('blob')===false?                                
                                      
                                        <a  target="_blank" href={process.env.REACT_APP_UPLOAD_URL+"Profile/"+this.props.JM_User_Profile_Url_plus_JM_ID+"/"+ this.state.pdfFileUrl}>
                                            View PDF file
                                        </a>
                                      : this.state.pdfFileUrl!=='' && this.state.pdfFileUrl.includes('blob') ? 
                                        <FileViewer
                                        fileType={this.state.type}
                                        filePath={this.state.pdfFileUrl}
                                        errorComponent={CustomErrorComponent}
                                        onError={this.onError}/>    
                                        :
                                        null 
                                    
                                  }
                                  
                            </div>
                          
                        
                </div>
              </div>
              <form>                          
                <input type="file" id="video" accept=".mp4" style={{display:'none'}} onChange={this.videoonChange}/>      
             </form>   
             <form>                          
                <input type="file" id="audio" accept="audio/*" style={{display:'none'}} onChange={this.audioChange}/>      
             </form>
              <div className="col-md-12">
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" placeholder="Title" />       
              </div>
              <div className="col-md-12">
                <textarea className="form-control area" name="description" value={this.state.description}  onChange={this.handleChange} 
                placeholder="enter description"/>
              </div>
              <div className="col-md-12">
                <input type="number" name="price" value={this.state.price} onChange={this.handleChange} className="form-control" placeholder=" Price" />       
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

              { uploadPercentage > 0 && 
                  <>
                        <ProgressBar animated  variant="success" style={{width:'80%',margin: '15px'}} now={uploadPercentage} active label={`${uploadPercentage}%`} /> 
                                   
                                   <span
                                        style={{cursor:'pointer'}}
                                        onClick={this.cancelUpload}
                                    >
                                        <i className="fa fa-close" style={{fontSize:'22px',marginTop: '56%'}}></i>
                                    </span>
                   </>
              }
            </div>
            <div className="btun-box">
              <button className="btun" id="btn_save" disabled={this.state.disabledBtn} onClick={this.nextClick}> {this.state.BtnName} <NavigateNextIcon/></button>
          
            </div>
            <p style={{fontSize: '12px',color: '#ff746e',padding:'5px'}}>{this.state.errMsg}</p>
          </div>
        </Modal.Body>

      </Modal>

    
            </>
        );
    }
}

EditUnlockContent.propTypes = {

};

export default EditUnlockContent;