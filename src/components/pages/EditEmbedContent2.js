import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import CreateIcon from '@material-ui/icons/Create';
import API  from '../services/API';
class EditEmbedContent2 extends Component
{
  constructor(props) {
    super(props)
  
    this.state = {
       openModel:false,
       base_url: process.env.REACT_APP_API_URL,
       root_url: process.env.REACT_APP_ROOT_URL,
       show:false,
       open:false,
       JM_ID:this.props.data.JM_ID,
       LM_Title:this.props.data.title,
       LM_Url:this.props.data.URL,
       LM_Image:this.props.data.image,
       LM_Who_Will_See:1,
       selectedFile: null,
       linkMaster:[],
      userDetails:[],
      fromEdit:true
    }
    //console.log(this.props.data.LM_Who_Will_See);

  }
  ModalClose=()=>{
    this.setState({openModel:false,show:false});
  }
  ModalOpen=()=>{
    this.setState({openModel:true,show:true});

    //console.log(this.props.data);
      this.setState({ 
        JM_ID:this.props.data.JM_ID,
        EC_ID:this.props.data.tableId,
        LM_Title:this.props.data.title,
        LM_Url:this.props.data.URL,
        LM_Image:this.props.data.image,
        LM_Who_Will_See:1,
        selectedFile: null,
        linkMaster:[],
        userDetails:[],
        fromEdit:true
    });
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

      var LM_Url=this.state.LM_Url;
      var embedUrl='';
      if(this.state.LM_Url.startsWith('https://youtu.be') || 
        this.state.LM_Url.startsWith('https://www.youtu.be') || 
        this.state.LM_Url.startsWith('https://www.youtube.com/watch?v=') || 
        this.state.LM_Url.startsWith('https://youtube.com/watch?v='))
       {
        if(LM_Url.includes('embed')===false && LM_Url.includes('youtu.be'))
        {
          embedUrl=LM_Url.replace('youtu.be','youtube.com/embed');    //https://youtu.be/wFQ9VQ5jyw8  
       
            //embed : https://www.youtube.com/embed/wFQ9VQ5jyw8
            //https://www.youtube.com/embed/wFQ9VQ5jyw8
        }
        else if(LM_Url.includes('embed')===false && LM_Url.includes('watch?v='))
        {
         // embedUrl=LM_Url.replace('watch?v=','embed/'); //https://www.youtube.com/watch?v=sxxPuBDhHTM

          //https://www.youtube.com/embed/sxxPuBDhHTM
          embedUrl=LM_Url;  
        }
        else
        {
          embedUrl=LM_Url;    
        }
      }
   else if(
        this.state.LM_Url.startsWith('https://open.spotify.com/') || 
        this.state.LM_Url.startsWith('https://www.open.spotify.com/')
        )
      {
        if(LM_Url.includes('embed')===false && LM_Url.includes('/album/'))
        {
          //https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3?si=HIySgutBRQqwTWPyE_bPoA&dl_branch=1 //playlist
          embedUrl=LM_Url.replace('/album/','/embed/album/');          
          //https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3?si=HIySgutBRQqwTWPyE_bPoA&dl_branch=1
        }
       else if(LM_Url.includes('embed')===false && LM_Url.includes('/track/'))
        {
          //https://open.spotify.com/track/1Xu7rSdycX0Hri6ztWA5Wz?si=1745acd538434609  single alubum
          embedUrl=LM_Url.replace('/track/','/embed/track/');    
          //https://open.spotify.com/embed/track/1Xu7rSdycX0Hri6ztWA5Wz?si=1745acd538434609
            
        }
        else if(LM_Url.includes('embed')===false && LM_Url.includes('/playlist/'))
        {
          //https://open.spotify.com/playlist/37i9dQZF1DXdpQPPZq3F7n?si=79QsPno4TteIPAl50dlBCQ&utm_source=copy-link&dl_branch=1 

          embedUrl=LM_Url.replace('/playlist/','/embed/playlist/');    
           //https://open.spotify.com/embed/playlist/37i9dQZF1DXdpQPPZq3F7n?si=79QsPno4TteIPAl50dlBCQ&utm_source=copy-link&dl_branch=1 
  
        }
        else
        {
          embedUrl=LM_Url;    
        }
      }
    else
    {
      embedUrl=LM_Url;    
    }
      const formData = new FormData(); 
      const files = event.target.files
      let Api_url=this.state.base_url+'admin/UpdateEmbedContent';
      formData.append('sampleFile', this.state.selectedFile)
      formData.append('EC_ID', this.props.data.tableId) 
      formData.append('LM_Title', this.state.LM_Title) 
      formData.append('LM_Url', embedUrl) 
      formData.append('LM_Image', this.state.LM_Image)
      formData.append('LM_Who_Will_See', this.state.LM_Who_Will_See)
      formData.append('JM_User_Profile_Url_plus_JM_ID', this.props.JM_User_Profile_Url+"_"+this.props.data.JM_ID)
      
          fetch(Api_url, {
            method: 'POST',     
            headers: {
              "authorization": API.getAuth(),"id":API.getId()
            },     
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
            console.error(error)
          })
}

Get_User_Details = () => {  
  
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
    .then(data1 => {
      if(data1.status===1)
      {
        const data=API.decryptJson(data1.flag);
        this.setState({
          LM_Title:'',
          LM_Url:'',
          LM_Image:'',
          LM_Who_Will_See:1,
          selectedFile: null,
          title:'Success!!!',
          msg:'Profile is updated',
          userDetailsAll: data.data,
          userDetails:data.userDetails,
          themeMasterUser:data.themeMasterUser,
          socialWidget:data.socialWidget,
          gifts:data.gifts, 
          category_master:data.category_master
        });

        this.props.setStateAfterInsert(this.state);
      }   
        else
          alert('not fetch');
    });
  

}
  render(){
    var imagePath=process.env.REACT_APP_UPLOAD_URL+"no_image.png";
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
            <p className="addnew-title">Edit Embed Content</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form  onSubmit={this.doUpdateLink}>
          <div className="addnew-box">
            <input type="text" className="form-control" placeholder="Title"
             name="LM_Title" value={this.state.LM_Title} onChange={this.onChangeHandle}/>

            <input type="text" className="form-control" placeholder="https://"
           name="LM_Url" value={this.state.LM_Url} onChange={this.onChangeHandle} />

       
            <div className="image-btun-box" style={{display:'none'}}>
              <div className="row">
              <div className="col-md-12">
                  <div className="view-image">
                      {
                        this.state.fromEdit ?
                        <img  src={imagePath}/>
                        :
                        <img  src={process.env.REACT_APP_UPLOAD_UR+this.state.LM_Image}/>
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
            {/* <label>Who should be able to see this?</label> */}
            <select style={{display:'none'}}  className="form-control" name="LM_Who_Will_See" value={this.state.LM_Who_Will_See} onChange={this.onChangeHandle}>
              <option value="1">Everyone</option>
              <option value="2">My Followers</option>
              <option value="3">People I follow</option>
            </select>
            <div className="btun-box">
              <button className="btun btun_1">Update Links</button>
              <button className="btun" onClick={this.ModalClose}>Cancel</button>
            </div>
          </div>
          </form>
        </Modal.Body>

      </Modal>
    </>
  );
}

}

export default EditEmbedContent2;