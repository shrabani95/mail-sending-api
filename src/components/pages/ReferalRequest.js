import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';

class ReferalRequest extends Component {
    constructor(props) {
        super(props);
        this.state={
            openModel:false,
            show:false,
            Ref_Email:'',
            Ref_Social:'',
            Ref_Name:'',
            emailError:'',
        }
    }
    onChangeHandle=(e)=>
    {
      this.setState({[e.target.name]:e.target.value}); 
    }
   
    ModalClose=()=>{
        this.setState({openModel:false,show:false});
      }
      ModalOpen=()=>{
        this.setState({openModel:true,show:true});
      }
      sendReuqest=(e)=>{
        if(this.validate())
        {
          let inserted_id=0;
          let API_url=process.env.REACT_APP_API_URL+"admin/sendReuqest";
          var JSONdata  = {             
            Ref_Email:this.state.Ref_Email, 
            Ref_Name:this.state.Ref_Name,
            Ref_Social:this.state.Ref_Social,
            };	
          fetch(API_url, {
          method: 'post',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(JSONdata)
            }).then(function(response) {
              return response.json();
            }).then(data => { 
              
              if(data.status===1)
                {
                   this.setState({
                        emailError:"Request has been sent to Expy. Please make sure to check your junk folder within the next few days. Thanks!",
                        Ref_Email:'',
                        Ref_Name:'',
                        Ref_Ref_Social:''
                      });
                     // this.ModalClose();
                  
                }
                else
                {
            
                  this.setState({emailError:data.msg});
                  return false;
                }          
  
          
          });
        }
      }
      validate(){
        if(!this.state.Ref_Name)
        {  
          this.setState({emailError:"Name Field is Empty"});
          return false;          
        }
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!this.state.Ref_Email || reg.test(this.state.Ref_Email) === false){
            this.setState({emailError:"Email Field is Invalid"});
            return false;
        }
        if(!this.state.Ref_Social && !this.state.Ref_Social )
        {  
          this.setState({emailError:"Social Handle Field is Empty"});
          return false;          
        }
      
        return true;
    }
    render() {
        return (
          <>
            <p><a onClick={this.ModalOpen}>Click here to receive Invite Code</a></p>

            <Modal show={this.state.show}
            onHide={this.ModalClose}
            backdrop="static"
            keyboard={false}
            centered
    
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <p className="addnew-title">Request for Invite Code</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
         
              <div className="addnew-box">
             
                  <input type="text" className="form-control" placeholder="Enter Name"
                 name="Ref_Name" value={this.state.Ref_Name} onChange={this.onChangeHandle}/>

                    <input type="email" className="form-control" placeholder="Enter Email"
                 name="Ref_Email" value={this.state.Ref_Email} onChange={this.onChangeHandle}/>

                  <input type="text" className="form-control" placeholder="Enter Social media handle"
                 name="Ref_Social" value={this.state.Ref_Social} onChange={this.onChangeHandle}/>
    
                <div className="btun-box">
                  <button className="btun btun_1" onClick={this.sendReuqest}>Request</button>
                  
                </div>
                <span className="text-danger">{this.state.emailError}</span>  
              </div>
            
            </Modal.Body>
    
          </Modal>
          </>
        );
    }
}

ReferalRequest.propTypes = {

};

export default ReferalRequest;