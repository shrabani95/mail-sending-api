import React, { Component } from 'react';
// import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'


class ContactUs extends Component
{
  constructor(props) {
    super(props)
  
    this.state = {
       openModel:false,
       show:false,
       open:false,
       Email:'',
       Name:'',
       Message:'',
       errorMessage:'',
    }
  }
  ModalClose=()=>{
    this.setState({openModel:false,show:false});
  }
  ModalOpen=()=>{
    this.setState({
      openModel:true,show:true,
      errorMessage:'',
      Email:'',
      Name:'',
      Message:''
    });
  }
  openCollapse = () => {
    !this.state.open ?
      this.setState({ open: true })
      :
      this.setState({ open: false })
      
  }
  onChangeHandle=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
  }
  ContactUs=(e)=>{
             this.setState({errorMessage:''});
           if(this.state.Name.length===0)
            {
                this.setState({errorMessage:'Name is Empty'});
                return false;
            }
            if(this.state.Email.length===0)
            {
                this.setState({errorMessage:'Name is Empty'});
                return false;
            }
            if(this.state.Email.includes(".")===false && this.state.Email.includes("@")===false )
            {
                this.setState({errorMessage:'Not a valid Email ID'});
                return false;
            }
            if(this.state.Message.length===0)
            {
                this.setState({errorMessage:'Message is Empty'});
                return false;
            }
                var JSONdata = {};            
                 JSONdata = {                 
                    Email:this.state.Email,
                    Name:this.state.Name,
                    Message:this.state.Message,
                };
                const API_url = process.env.REACT_APP_API_URL + "admin/contactUsMail";       
                fetch(API_url,
                {
                    method: 'post',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(JSONdata)
                })
                .then((response) => response.json())
                .then(data => {                    
                        this.setState({
                            errorMessage:data.msg,                          
                            Email:'',
                            Name:'',
                            Message:''
                        });
                        
                });
            

  }
  render(){
  return (
    <>
      {
        this.props.for==='Home'?
        <div className="chatbot" onClick={this.ModalOpen}>
         <span>Contact Us</span>
       </div>
      :
         <a href="#"  onClick={this.ModalOpen}>Contact Us</a>
      }
      


      <Modal
        show={this.state.show}
        onHide={this.ModalClose}
        backdrop="static"
        keyboard={false}
        centered

      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="addnew-title">Contact Us</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="direct-access-pop">
            <div className="row">
              <div className="col-md-12">
                <input type="text" className="form-control" placeholder="Name" name="Name" value={this.state.Name} onChange={this.onChangeHandle}/>
              </div>
              <div className="col-md-12">
                <input type="text" className="form-control" placeholder="Email" name="Email" value={this.state.Email} onChange={this.onChangeHandle}/>
              </div>
              <div className="col-md-12">
                <textarea className="form-control area" placeholder="Message" name="Message" value={this.state.Message} onChange={this.onChangeHandle}/>
              </div>
            </div>
            <div className="btun-box">
              <button className="btun pull-right" onClick={this.ContactUs}>Send</button>
              <p id="msg">{this.state.errorMessage}</p>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}

}

export default ContactUs;