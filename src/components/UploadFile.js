import React, { Component } from 'react'
import Api from '../Api.js'
class UploadFile extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        selectedFile: null,
        api_url:'http://localhost:8080/expy/API/testImage'
      }
    }
    onChange=(e)=>{
        let files=e.target.files;
        this.setState({ selectedFile: e.target.files[0] }); 
        console.warn(files);
    }
    handleImageUpload = event => {
        event.preventDefault();
        const formData = new FormData(); 
       console.log(this.state.selectedFile); 
      const files = event.target.files
   
        formData.append('sampleFile', this.state.selectedFile)
        formData.append('JM_ID', this.state.JM)
        fetch(this.state.api_url, {
          method: 'POST',         
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error(error)
        })
      }
  render() {
    return (
      <>
        <div>
            <h3>File Upload</h3>
            <form className="addPhotoForm" id="addPhoto" onSubmit={this.handleImageUpload}>
            <input type="file" name="fileName" onChange={(e)=>this.onChange(e)}></input>
            <button type="submit">Upload</button>
            </form>
            <br/>     <br/>     <br/>
        </div>
      </>
    )
  }
}
export default UploadFile