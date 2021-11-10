import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import API  from '../services/API';
class EmbedContent2 extends Component
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
      category_master:[],
      category_links:[],
      title:'',
      msg:'',
      logo:''
      
    }
    
  }
  ModalClose=()=>{
    this.setState({openModel:false,show:false});
  }
  ModalOpen=()=>{
    this.setState({
      openModel:true,show:true,
      LM_Title:'',
      LM_Url:''    
    
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
      document.getElementById("msg_error").innerHTML='';    

      if(this.state.LM_Url.length===0)
      {
        document.getElementById("msg_error").innerHTML='Enter Embed URL';
        return false;
      }
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
          //embedUrl=LM_Url.replace('watch?v=','embed/'); 
          embedUrl=LM_Url;  
        }
        else
        {
          embedUrl=LM_Url;    
        }
       
       
       
        //https://itunes.apple.com/us/album/luys-i-luso/1035022308
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
      else if(
        this.state.LM_Url.startsWith('https://music.apple.com/') 
      )
      {
        
          //https://music.apple.com/us/album/bloom/1396292262
          embedUrl=LM_Url.replace('https://music.apple.com/','https://embed.music.apple.com/');    
       
      }
    else
    {
      embedUrl=LM_Url;    
    }
      //watch?v=
      const formData = new FormData(); 
      const files = event.target.files
      let Api_url=this.state.base_url+'admin/InsertEmbedContent';
      formData.append('sampleFile', this.state.selectedFile)
      formData.append('JM_ID', this.state.JM_ID) 
      formData.append('LM_Title', this.state.LM_Title) 
      formData.append('LM_Url', embedUrl) 
      formData.append('LM_Image', this.state.LM_Image)
      formData.append('LM_Who_Will_See', this.state.LM_Who_Will_See)
      formData.append('JM_User_Profile_Url_plus_JM_ID', this.props.JM_User_Profile_Url_plus_JM_ID)
      
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
               if(data.status===1) 
               {
                this.ModalClose();
                this.Get_User_Details();      
               }
              else
              {
                document.getElementById("msg_error").innerHTML="Already have 3 embed content";
                return false;
              }      
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

fileSelectHandler=()=> {
  //console.log("changed")
}

clickhandler = () => {
//console.log("clicked")
}

  render(){
  return (
    <>
      <div className="card-btun" onClick={this.ModalOpen}><AddCircleOutlineOutlinedIcon />
        <h4>Embed Content </h4> <p>Share your latest work</p>
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
            <p className="addnew-title"> Add a Embed Content to your profile </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <form  onSubmit={this.doInsertLink}>
          <div className="addnew-box">
            <input type="text" className="form-control" placeholder="Title"
             name="LM_Title" value={this.state.LM_Title} onChange={this.onChangeHandle}/>

            <input type="text" className="form-control" placeholder="Enter Embed URL"
           name="LM_Url" value={this.state.LM_Url} onChange={this.onChangeHandle} />

           
            <div className="image-btun-box" style={{display:'none'}}>
              <div className="row">
                    <div className="col-md-12">
                        <div className="view-image">
                            <img  src={this.state.LM_Image}/>
                        </div>
                    </div>
                    <div className="col-md-6">                    
                        <label className="up-ico" htmlFor="selectImage">
                            Upload an Image    </label>        
                            <input type="file" id="prop_up" accept="image/*" name="photo" style={{ display:"none"}} 
                                onChange={this.imageonChange}/>         
                            <input id='selectImage' type="file" style={{ display:"none"}}  onClick={this.clickhandler} onChange={this.imageonChange} />
                        </div>
                    
                  </div>
            </div>
            {/* <label>Who should be able to see this?</label> */}
            <select style={{display:'none'}} className="form-control" name="LM_Who_Will_See" value={this.state.LM_Who_Will_See} onChange={this.onChangeHandle}>
                <option value="1">Everyone</option>
                <option value="2">My Followers</option>
                <option value="3">People I follow</option>
            </select>
            <div className="btun-box">
              <button className="btun btun_1">Add</button>
              <button className="btun" onClick={this.ModalClose}>Cancel</button>
            </div>
            <p id="msg_error" style={{color:'red'}}></p>
          </div>
          </form>
        </Modal.Body>

      </Modal>
    </>
  );
}

}

export default EmbedContent2;