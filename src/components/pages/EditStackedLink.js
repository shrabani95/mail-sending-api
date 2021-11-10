import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import CreateIcon from '@material-ui/icons/Create';
import { MDBIcon } from 'mdbreact';
class EditStackedLink extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           openModel:false,
           base_url: process.env.REACT_APP_API_URL,
           root_url: process.env.REACT_APP_ROOT_URL,
         
           show:false,
           open:false,
           JM_ID: 0,  
           SWM_Title:'',
           SWM_Url:'',
           SWM_Icon:'',
           LM_Who_Will_See:1,
           selectedFile: null,
           linkMaster:[],
          userDetails:[],
          socialWidget:[],
          isClose:'none',
          CM_Folder_Sub_Title:'',
          CM_Folder_Back_Image:'',
          CM_Folder_Title:'',
          category_links:[],
          activeIcon:'',
          isDisplayIcon:'block',
          isDisplayImage:'none',
          iconCheked:true,
          imageCheked:false,
          fromEdit:true
          
    
        }
        ////console.log(this.props.JM_User_Profile_Url_plus_JM_ID);
      }
      ModalClose=()=>{
        this.setState({openModel:false,show:false});


      }
      ModalOpen=()=>{
        this.setState({openModel:true,show:true});
        this.fillData();
      }
     
    
      onChangeHandle=(e)=>{
          let titleVal=e.target.value;
        this.setState({[e.target.name]:e.target.value});  
        let index = e.nativeEvent.target.selectedIndex;
    }
    onChangeHandleURL=(e)=>
    {
      this.setState({[e.target.name]:e.target.value});     
    }
    onChangeFolderImage=(e)=>{     
      const file = e.target.files[0];
      this.setState({ selectedFile: e.target.files[0] }); 
      this.setState({
        CM_Folder_Back_Image: URL.createObjectURL(file),
        isClose:'block'
      });

    }
    addFolder=(event)=>{  
          event.preventDefault();
          if(this.validate())
          {
              const formData = new FormData(); 
              const files = event.target.files
              let Api_url=process.env.REACT_APP_API_URL+'admin/UpdateCategory';
              formData.append('sampleFile', this.state.selectedFile)
              formData.append('CM_ID', this.state.CM_ID) 
              formData.append('JM_ID', this.state.JM_ID) 
              formData.append('CM_Folder_Title', this.state.CM_Folder_Title) 
              formData.append('CM_Folder_Sub_Title', this.state.CM_Folder_Sub_Title)
              formData.append('JM_User_Profile_Url_plus_JM_ID', this.props.JM_User_Profile_Url_plus_JM_ID)
              formData.append('CM_Icon', this.state.activeIcon)
                  fetch(Api_url, {
                    method: 'POST',         
                    body: formData
                  })
                  .then(response => response.json())
                  .then(data => 
                    {                   
                      //console.log(data);   
                      this.ModalClose();
                      this.Get_User_Details();              
                  })
                  .catch(error => {
                    //console.error(error)
                  })
            }
            else
            {
              document.getElementById('msg').innerHTML='Enter Title';
              this.hideMessage('msg');    
            }
    }
    hideMessage=(id)=>{
      setTimeout(function() {
        document.getElementById(id).innerHTML='';  
       }, 2000);
             
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
            productList:data.productList ,
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
      let valid=true;
        if(this.state.CM_Folder_Title === "")
        {
          valid=false;
        }
            return valid;    
    }
   
    fillData=()=>{
        //console.log(this.props.category_master);
        this.setState({
            CM_ID:this.props.category_master.CM_ID,
            JM_ID:this.props.category_master.JM_ID,
            CM_Folder_Title:this.props.category_master.CM_Folder_Title,
            CM_Folder_Sub_Title:this.props.category_master.CM_Folder_Sub_Title,
            CM_Folder_Back_Image_Current:process.env.REACT_APP_UPLOAD_URL+this.props.category_master.CM_Folder_Back_Image,
            activeIcon:this.props.category_master.CM_Icon


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
                <p className="addnew-title">Update Folder</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <form  onSubmit={this.addFolder}>
              <div className="addnew-box">
                   <label> Category Title </label>                    
                   <input type="text" className="form-control" placeholder="Category Title"
                        name="CM_Folder_Title" value={this.state.CM_Folder_Title} onChange={this.onChangeHandleURL}/>
                  <label> Category Sub Title </label>                    
                   <input type="text" className="form-control" placeholder="Sub Title"
                        name="CM_Folder_Sub_Title" value={this.state.CM_Folder_Sub_Title} onChange={this.onChangeHandleURL}/>
                           <label>Category Icon</label>



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
                                            <img  src={this.state.CM_Folder_Back_Image}/>
                                          </div>
                                        </div>
                                        <div className="col-md-6">                   
                                            <label className="up-ico" htmlFor="foldr_img">
                                              Upload an Icon               </label>        
                                              <input type="file" id="foldr_img" accept="image/*" name="photo" style={{ display:"none"}} 
                                                    onChange={this.onChangeFolderImage}/>         
                                              {/* <input id='foldr_img' type="file" style={{ display:"none"}}  onClick={this.clickhandler} onChange={this.imageonChange} /> */}
                                          </div>                 
                                      </div>
                                  </div>
                                </div>



                    {/* <label className="roundPlus" htmlFor='foldr_img'>
                       <AddCircleOutlineOutlinedIcon/>
                    </label> 
                    <img style={{width:'60px',height:'60px',borderRadius: '60%',margin:'5px'}} src={this.state.CM_Folder_Back_Image_Current}></img>
                    <input type="file" id="foldr_img"  style={{display:'none'}}
                         value="" onChange={this.onChangeFolderImage}/>
                         <div>
                           {
                           
                              this.state.isClose==='block' ? 
                               <>
                              <i className="fa fa-close" style={{color:'red',fontSize:'20px',display:this.state.isClose}} onClick={()=> this.setState({CM_Folder_Back_Image:'',selectedFile:null,isClose:'none'})}></i>
                              <img style={{width:'100%',height:'100%',borderRadius: '5%',margin:'5px'}} src={this.state.CM_Folder_Back_Image}></img>
                              </>
                            :
                            null
                            }
                           
                         </div> */}
         
               




                <div className="btun-box">
                  <button className="btun btun_1">Update Folder</button>
                  <button className="btun" onClick={this.ModalClose}>Cancel</button>
                  <p id="msg" style={{color:'red'}}></p>
                </div>
              </div>
              </form>
            </Modal.Body>
    
          </Modal>
        </>
      );
    }
    
    }
export default EditStackedLink;