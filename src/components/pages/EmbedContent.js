import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';


class EmbedContent extends Component
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
    console.log(this.props.JM_User_Profile_Url_plus_JM_ID);
  }
  ModalClose=()=>{
    this.setState({openModel:false,show:false});
  }
  ModalOpen=()=>{
    this.setState({openModel:true,show:true});
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
      const formData = new FormData(); 
      const files = event.target.files
      let Api_url=this.state.base_url+'admin/InsertEmbedContent';
      formData.append('sampleFile', this.state.selectedFile)
      formData.append('JM_ID', this.state.JM_ID) 
      formData.append('LM_Title', this.state.LM_Title) 
      formData.append('LM_Url', this.state.LM_Url) 
      formData.append('LM_Image', this.state.LM_Image)
      formData.append('LM_Who_Will_See', this.state.LM_Who_Will_See)
      formData.append('JM_User_Profile_Url_plus_JM_ID', this.props.JM_User_Profile_Url_plus_JM_ID)
      
          fetch(Api_url, {
            method: 'POST',         
            body: formData
          })
          .then(response => response.json())
          .then(data => 
            {                   
               console.log(data);   
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
        this.setState({         
            title:'Failed!!!',
            msg:'Profile is not updated',
        
        });
  });
  

}

fileSelectHandler=()=> {
  console.log("changed")
}

clickhandler = () => {
console.log("clicked")
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

            <input type="text" className="form-control" placeholder="Enter URL to Embed"
           name="LM_Url" value={this.state.LM_Url} onChange={this.onChangeHandle} />

           
            <div className="image-btun-box" style={{display:'none'}}>
              <div className="row">
                    <div className="col-md-12">
                        <div className="view-image">
                            <img  src={this.state.LM_Image}/>
                        </div>
                    </div>
                    <div className="col-md-6" >
                    
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
          </div>
          </form>
        </Modal.Body>

      </Modal>
    </>
  );
}

}

export default EmbedContent;