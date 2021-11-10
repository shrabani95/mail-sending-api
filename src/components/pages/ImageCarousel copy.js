import React, { Component } from 'react';
import RBCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import ProfileHeader from '../header_footer/ProfileHeader';
import FooterClass from '../header_footer/FooterClass';
import ToastAlert from './ToastAlert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios, { isCancel } from "axios";
import {ProgressBar} from 'react-bootstrap';
import cryptoRandomString from 'crypto-random-string';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Modal from 'react-bootstrap/Modal'
class ImageCarousel extends Component {
    constructor(props) {
        super(props);
      
        this.state = {       
           JM_Email: localStorage.getItem('JM_Email'),
           JM_ID: parseInt(localStorage.getItem('JM_ID')),      
           JM_User_Profile_Url: localStorage.getItem('JM_User_Profile_Url'),        
           showAlert:false,   
           title:'',
           msg:'',
           base_url: process.env.REACT_APP_API_URL,
           root_url: process.env.REACT_APP_ROOT_URL,
           carousel_1:'',
           carousel_2:'',
           carousel_3:'',
           selectedFile1:null,
           selectedFile2:null,
           selectedFile3:null,
           Is_Image1:false, 
           Is_Image2:false, 
           Is_Image3:false, 
           uploadPercentage: 0,
           BtnName:'Save Carousel',
           show: false,
           title:'',
           msg:'',
           carousel_title_1:'', 
           carousel_title_2:'',
           carousel_title_3:'',   
           openCropModal_1:false,        
           openCropModal_2:false,     
           openCropModal_3:false, 
           
           src1: null,  src2: null,  src3: null,
           crop: {
             unit: "%",
             width: 30,
             aspect: 1 / 1
           },
        
        }
    }

  

    componentDidMount() 
    {
    //console.log(this.props)
    }



  //===starting of crop image1

  handleFile=id=> e => {
    const fileReader = new FileReader()
    if (e.target.files !== null && e.target.files.length > 0) 
    {
      fileReader.onloadend = () => 
      {
        if(id===1)
             this.setState({ src1: fileReader.result })
         else  if(id===2) 
            this.setState({ src2: fileReader.result })
            else  if(id===3)  this.setState({ src3: fileReader.result })
      }
      fileReader.readAsDataURL(e.target.files[0])
      if(id===1)
            this.setState({ openCropModal_1: true })
        else if(id===2)
            this.setState({ openCropModal_2: true })
       else if(id===3)
            this.setState({ openCropModal_3: true })
     }
  }

  onImageLoaded = image => {
    this.imageRef = image
  }

  onCropChange = (crop)=> {
    
    this.setState({ crop });
  }

  onCropComplete = (crop) => {
    if (this.imageRef && crop.width && crop.height)
     {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop)
      this.setState({ croppedImageUrl })
    }
  }

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    //============================= 01-sep-2021 by sudipta
    const targetWidrh=700;
    const targetHeight=700;
    //=====================
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const reader = new FileReader()
    canvas.toBlob(blob => 
    {
      let r = cryptoRandomString({ length: 30 });
      //console.log("random", r);
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, r + '.jpg')
      }
    })
  }
  
  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
   // console.log(croppedImage)
    if(this.state.openCropModal_1===true)
    {
        this.setState({
            croppedImage1 : croppedImage,
            carousel_1: URL.createObjectURL(croppedImage),
            selectedFile1: croppedImage 
       })
    }
  else  if(this.state.openCropModal_2===true)
    {
        this.setState({
            croppedImage2 : croppedImage,
           carousel_2: URL.createObjectURL(croppedImage),
           selectedFile2: croppedImage 
       })
    }
  else  if(this.state.openCropModal_3===true)
    {
        this.setState({
            croppedImage3 : croppedImage,
           carousel_3: URL.createObjectURL(croppedImage),
           selectedFile3: croppedImage   
       })
    }
     
  }


  uploadPic=id=>e=>{  
      if(id===1) 
      {
        this.setState({ 
            Is_Image1: true,openCropModal_1:false,     
        })
      }
      if(id===2) 
      {
        this.setState({ 
            Is_Image2: true,openCropModal_2:false,     
        })
      }
      if(id===3) 
      {
        this.setState({ 
            Is_Image3: true,openCropModal_3:false,     
        })
      }
  }
  //===end of crop image1










    showToast = (title,msg)=> {
        this.setState({ show: true,title,msg })
      }
      hideToast = () => {
        this.setState({ show: false })
      }
    imageOnChange=id=>e=>{

        const file = e.target.files[0];
        if(typeof file!=='undefined' && file!==null)
        {
            if(id===1)
            {
                this.setState({ selectedFile1: e.target.files[0] }); 
                this.setState({
                carousel_1: URL.createObjectURL(file),  
                Is_Image1:true 
                });  
               
            }
           else if(id===2)
            {
                this.setState({ selectedFile2: e.target.files[0] }); 
                this.setState({
                carousel_2: URL.createObjectURL(file),   
                Is_Image2:true ,
                });  
            }
            else
            {
                this.setState({ selectedFile3: e.target.files[0] }); 
                this.setState({
                carousel_3: URL.createObjectURL(file),  
                Is_Image3:true, 
                }); 
            }
        }
      
    }

    //08-jul-2021
    onchangeTitle=(e)=>{

        this.setState({
            [e.target.name]:e.target.value
        })
        var value=e.target.value.replace(/'/g, "<>");
        //console.log(value)
    }

    saveCarousel=(e)=>{
        e.preventDefault();
        let isValid=this.validation();
        if(isValid)
        {
                var carousel_title_1 ='';
                var carousel_title_2='';  
                var carousel_title_3 ='';  
                const formData = new FormData(); 
                let Api_url=this.state.base_url+'admin/addImageCarousel';
            // let Api_url='http://localhost:9000/admin/addProduct';
                if(this.state.selectedFile1 !==null && this.state.carousel_1!=='' )
                {  
                    formData.append('carousel_1', this.state.selectedFile1);  
                    carousel_title_1 = this.state.carousel_title_1.replace(/'/g, "<>");              
                }
                if(this.state.selectedFile2 !==null && this.state.carousel_2!=='' )
                {  
                    formData.append('carousel_2', this.state.selectedFile2);   
                    carousel_title_2 = this.state.carousel_title_2.replace(/'/g, "<>");            
                }
                if(this.state.selectedFile3 !==null && this.state.carousel_3!=='')
                {   
                    formData.append('carousel_3', this.state.selectedFile3)
                    carousel_title_3 = this.state.carousel_title_3.replace(/'/g, "<>"); 
                }
     


            formData.append('carousel_title_1', carousel_title_1); 
            formData.append('carousel_title_2', carousel_title_2); 
            formData.append('carousel_title_3', carousel_title_3); 

            formData.append('DA_Type', 'image'); 
            formData.append('DA_DA_ID', 4) // for premium featured id
            formData.append('JM_ID', this.state.JM_ID)         
            formData.append('DA_Title', 'image carousel')  
            formData.append('DA_Description', '')  
            formData.append('DA_Cover', "") 
            formData.append('DA_Price', 0)      
            formData.append('JM_User_Profile_Url_plus_JM_ID',this.state.JM_User_Profile_Url + "_" + this.state.JM_ID)
            
           
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            const options = {
              onUploadProgress: (progressEvent) => 
              {
                const {loaded, total} = progressEvent;
                let percent = Math.floor( (loaded * 100) / total )
                //console.log( `${loaded}kb of ${total}kb | ${percent}% wait...` );
    
                if( percent < 100 )
                {
                  this.setState({ uploadPercentage: percent })
                }
              },
              cancelToken: source.token,
              
            }
       
           this.setState({BtnName:'Uploading..',disabledBtn:true});
            axios.post(Api_url, formData, options).then(res =>
            { 
              //console.log(res)
              if(res.data.status > 0)
              {
                 this.setState({videoFile:null,videoData:'NA',audioFile:null,audioData:''});
                 this.fileArray=[];     
                
                 this.setState({ avatar: res.data.url, uploadPercentage: 100 }, ()=>{
                  setTimeout(() => {
                    this.setState({ uploadPercentage: 0 })
                  }, 1000);
                })            
                   
                 this.showToast('success','Image Carousel is added to profile');                     
                 this.setState({
                     disabledBtn:false,BtnName:'Save',
                    selectedFile1:null,carousel_1:'',
                    selectedFile2:null,carousel_2:'',
                    selectedFile3:null,carousel_3:'',
                    Is_Image1:false,
                    Is_Image2:false,
                    Is_Image3:false,
                    carousel_title_1:'', 
                    carousel_title_2:'',
                    carousel_title_3:'',
                });
              }
              else
              {
                
                this.showToast('error','internal error occurred'); 
                this.setState({disabledBtn:false,BtnName:'Save Carousel'});
              }     
               
            })
            .catch(err => 
            {
              //console.log(err);             
              if(isCancel(err)) 
              {
                  //alert(err.message);
                  this.showToast('canceled',err.message); 
                  this.setState({
                          disabledBtn:false,BtnName:'Save Carousel',
                        selectedFile1:null,
                        selectedFile2:null,
                        selectedFile3:null,
                        Is_Image1:false,
                        Is_Image2:false,
                        Is_Image3:false,
                        carousel_title_1:'', 
                        carousel_title_2:'',
                        carousel_title_3:'',
                       
                    
                    });
                  this.setState({ uploadPercentage: 0 })
              }
              else
              {
            
                this.showToast('error',err.response.status===404 ?'network connection error':'internal error occurred'); 
            
                this.setState({
                    disabledBtn:false,BtnName:'Save Carousel',
                    selectedFile1:null,
                    selectedFile2:null,
                    selectedFile3:null,
                    Is_Image1:false,
                    Is_Image2:false,
                    Is_Image3:false,
                    carousel_title_1:'', 
                    carousel_title_2:'',
                    carousel_title_3:'',
                });

                this.setState({ uploadPercentage: 0 })
              }
          });
        }
        else
        {
          var msg="Choose atleast one image";
          this.showToast('empty field',msg);           
        }
    }
    cancelUpload = (e) => 
    {
        this.state.source.cancel('Upload cancelled');       
    }
   validation =()=>{
           if(this.state.selectedFile1!==null || this.state.selectedFile2!==null || this.state.selectedFile3!==null)
               return true;
           else
               return false;  
    }
    removeFile=(id)=>e=>{
      if(id===1)
        {
          this.setState({      
            selectedFile1:null,       
            Is_Image1:false,    
            carousel_1:'', 
   
        });
      }
      else if(id===2)
      {
        
          this.setState({            
            selectedFile2:null,   
            Is_Image2:false,
            carousel_2:'',
       
        });

      }
      else if(id===3)
      {
        
          this.setState({            
            selectedFile3:null,   
            Is_Image3:false,
            carousel_3:'',
       
        });

      }

    }
    render() {

        const { crop, profile_pic, src1,src2,src3 } = this.state
        const {uploadPercentage} = this.state;
        return (
            <>
            <ProfileHeader/>

                    <div className="direct-access">
                        <div className="container">
                            <div className="row">
                             
                                    <div className="col-md-12">
                                        <div className="heading">
                                            <h3>Add an image carousel to your page</h3>
                                            <p></p>
                                            <a href="/me" className="btnCropSave" style={{marginTop:'10px'}}>              
                                                <ArrowBackIcon/>
                                                Back to Profile
                                            </a>
                                        </div>
                                    </div>
                                
                                    <div className="col-md-4">
                                        <div className="item">                            
                                            <label htmlFor="upImage1" className="up-img">
                                                <div className="carosule-image">
                                                <button onClick={this.removeFile(1)} className="removeCarousel">X</button>
                                                    {
                                                        this.state.Is_Image1===true ?
                                                        <img src={this.state.carousel_1} />
                                                        :
                                                        <img src={'images/choose_img1.jpg'} />

                                                    }
                                            
                                                </div>

                                                {/* accept="image/png, image/jpeg,image/gif" onChange={this.handleFile} /> */}
                                                <input type="file" id="upImage1" accept="image/png, image/jpeg,image/jpg,image/gif" 
                                                onChange={this.handleFile(1)} style={{ display: "none" }} />
                                            </label>
                                            <input type="text" class="form-control" name="carousel_title_1" value={this.state.carousel_title_1} 
                                            onChange={this.onchangeTitle} placeholder="Enter Title"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="item">                            
                                            <label htmlFor="upImage2" className="up-img">
                                                <div className="carosule-image">
                                                   <button onClick={this.removeFile(2)} className="removeCarousel">X</button>
                                                    {
                                                        this.state.Is_Image2===true ?
                                                        <img src={this.state.carousel_2} />
                                                        :
                                                        <img src={'images/choose_img2.jpg'} />

                                                    }
                                            
                                                </div>
                                                <input type="file" id="upImage2" accept="image/png, image/jpeg,image/jpg,image/gif"
                                                     onChange={this.handleFile(2)} style={{ display: "none" }} />
                                            </label>
                                            <input type="text" class="form-control" name="carousel_title_2" value={this.state.carousel_title_2} 
                                            onChange={this.onchangeTitle} placeholder="Enter Title"/>
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="item">                            
                                            <label htmlFor="upImage3" className="up-img">
                                                <div className="carosule-image">
                                                <button onClick={this.removeFile(3)} className="removeCarousel">X</button>
                                                    {
                                                        this.state.Is_Image3===true ?
                                                        <img src={this.state.carousel_3} />
                                                        :
                                                        <img src={'images/choose_img3.jpg'} />

                                                    }
                                                </div>
                                                <input type="file" id="upImage3" accept="image/png, image/jpeg,image/jpg,image/gif" 
                                                 onChange={this.handleFile(3)} style={{ display: "none" }} />
                                            </label>
                                            <input type="text" class="form-control" name="carousel_title_3" value={this.state.carousel_title_3} 
                                            onChange={this.onchangeTitle} placeholder="Enter Title"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 offset-md-3 ">                               
                                            {/* carousel */}
                                            <div className="Carousel-box" style={{display:'block'}}>
                                                    <RBCarousel
                                                        animation={true}
                                                        autoplay={true}
                                                        slideshowSpeed={2000}
                                                        defaultActiveIndex={0}
                                                        leftIcon={this.state.leftIcon}
                                                        rightIcon={this.state.rightIcon}
                                                        onSelect={this._onSelect}
                                                        ref={this.slider}
                                                        version={4}
                                                    >
                                                        <div className="item">
                                                        
                                                            {
                                                                this.state.Is_Image1===true ?
                                                                <img src={this.state.carousel_1} />
                                                                :
                                                                <img
                                                                src="../images/sample_car_image.jpg" alt="image1"
                                                            />

                                                            }
                                                               <div className={"overlay"}> 
                                                                    <span>
                                                                         {this.state.carousel_title_1===''?'Carousel Title 1' : this.state.carousel_title_1}
                                                                    </span>
                                                                </div>
                                                        </div>
                                                        <div className="item">
                                                            {
                                                                this.state.Is_Image2===true ?                                                           
                                                                <img src={this.state.carousel_2} />  
                                                                :
                                                                <img
                                                                src="../images/sample_car_image.jpg" alt="image2"
                                                                />

                                                            } 
                                                            <div className={"overlay"}> 
                                                                <span>
                                                                    {this.state.carousel_title_2 ===''?'Carousel Title 2' : this.state.carousel_title_2}
                                                                </span>
                                                            </div>

                                                        </div>
                                                        <div className="item">
                                                            {
                                                                this.state.Is_Image3===true ?
                                                                <img src={this.state.carousel_3} />
                                                                :
                                                                <img
                                                                src="../images/sample_car_image.jpg" alt="image3"
                                                                />

                                                            }
                                                             <div className={"overlay"}>
                                                                     <span>
                                                                         {this.state.carousel_title_3===''?'Carousel Title 3' : this.state.carousel_title_3}                                                                 
                                                                    </span>
                                                            </div>
                                                        </div>
                                                        </RBCarousel>
                                                </div>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="save-carosule"  onClick={this.saveCarousel}>Save Carousel</button>
                                    </div>
                                    { 
                                            uploadPercentage > 0 && 
                                            <>
                                                <ProgressBar animated  variant="success" style={{width:'80%',margin: '15px'}} now={uploadPercentage} active label={`${uploadPercentage}%`} /> 
                                                <span  style={{cursor:'pointer'}}  onClick={this.cancelUpload}>
                                                    <i className="fa fa-close" style={{fontSize:'22px',marginTop: '56%'}}></i>
                                                </span>
                                            </>
                                    }
                            </div>
                        </div>
                    </div>



                            


        {/* image crop modal */}
        <Modal
          show={this.state.openCropModal_1}
          onHide={() => this.setState({ openCropModal_1: false })}
          aria-labelledby="example-modal-sizes-title-sm"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
              Crop and Save
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
              <div className="cropp-image" >
                {src1 && (
                  <ReactCrop
                    src={src1}
                    crop={crop}
                    id={1}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                )}

              </div>

              <button className="btnCropSave"   onClick={this.uploadPic(1)}>Okay</button>

            {uploadPercentage > 0 && <ProgressBar animated variant="success" style={{ width: '100%' }} now={uploadPercentage} active label={`${uploadPercentage}%`} />}

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>

 {/* image crop modal 2*/}
 <Modal
          show={this.state.openCropModal_2}
          onHide={() => this.setState({ openCropModal_2: false })}
          aria-labelledby="example-modal-sizes-title-sm"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
              Crop and Save
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
              <div className="cropp-image" >
                {src2 && (
                  <ReactCrop
                    src={src2}
                    crop={crop}             
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                )}

              </div>

              <button className="btnCropSave"   onClick={this.uploadPic(2)}>Okay</button>

            {uploadPercentage > 0 && <ProgressBar animated variant="success" style={{ width: '100%' }} now={uploadPercentage} active label={`${uploadPercentage}%`} />}

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>


{/* image crop modal 3*/}
<Modal
          show={this.state.openCropModal_3}
          onHide={() => this.setState({ openCropModal_3: false })}
          aria-labelledby="example-modal-sizes-title-sm"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
              Crop and Save
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
              <div className="cropp-image" >
                {src3 && (
                  <ReactCrop
                    src={src3}
                    crop={crop}             
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                )}

              </div>

              <button className="btnCropSave"   onClick={this.uploadPic(3)}>Okay</button>

            {uploadPercentage > 0 && <ProgressBar animated variant="success" style={{ width: '100%' }} now={uploadPercentage} active label={`${uploadPercentage}%`} />}

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>



              <FooterClass/>
          <ToastAlert title={this.state.title} hideToast={this.hideToast} 
            msg={this.state.msg} show={this.state.show} 
            image={this.state.logo} showToast={this.showToast}/>
        </>
        );
    }
}

ImageCarousel.propTypes = {

};

export default ImageCarousel;