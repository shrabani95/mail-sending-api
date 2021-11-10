import React, { Component,useState,Form } from 'react';
import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
// import './MyStyle.css'
// import './animate.css'
// import './bootstrap.css'
// import './resonsive.css'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


export default function SignInModal(prop) {
  const [show, setShow] = useState(false);
  const [email, setName] = useState('');
  const [pass, setPassword]=useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const SaveData=(e)=> {
    console.warn(email)
    console.warn(pass)

          fetch('https://api.github.com/gists', {
            method: 'post',
            body: JSON.stringify({username:email})
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log('Created Gist:', data.html_url);
          });
  }
 
  return (
    <>
      <button className="" onClick={handleShow}>
      Sign in
      </button>

      <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
     
      >
        <Modal.Header closeButton>
          <Modal.Title>
         Expy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              
        <div className="form-box">
                <div className="heading">
                  <h3 style={{textAlign:"center",color:"blue",fontSize:"24",fontWeight:"bold"}}>Sign In!</h3>
                </div>
                <div className="join-box">
                  <div className="row">
                    <div className="col-md-12">
                   
               
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm"><i className="fa fa-envelope"></i></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
                      value={email} onInput={e => setName(e.target.value)} placeholder="Enter Email/Phone Number"/>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm"><i className="fa fa-phone"></i></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
                      value={pass} onInput={e => setPassword(e.target.value)} placeholder="Enter Password" type="password"/>
                    </InputGroup>
                   
                    </div>
                  </div>
                </div>
                <div className="join-box">
                  <div className="row">
                    <div className="col-md-12">
                    </div>
                    {/* <div className="col-md-6">
                      <input type="radio" name="select_temp"/>
                    </div> */}
                  </div>
                </div>                
            </div>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="outline-primary" onClick={SaveData}>
          launch!
          </Button>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
      
        </Modal.Footer>
      </Modal>
    </>
  );
}

