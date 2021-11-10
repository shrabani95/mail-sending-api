import React, { Component,useState,Form } from 'react';
// import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
// import './MyStyle.css'
// import './animate.css'
// import './bootstrap.css'
// import './resonsive.css'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';


export default function JoinInModal(prop) {
  const [show, setShow] = useState(false);
 
  const [name, setName] = useState('');
  const [email, setEmail]=useState('');
  const [phone, setPhone]=useState('');
  const [getState, setAllState]=useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let base_url="http://127.0.0.1:8080/expy/API/";

 
  const  doJoin=()=>{
      console.warn(email)
      console.warn(name)
      if(name==="")
        {
          alert("empty name");
          return false;
        }
        var obj={};
        obj.name=name;
        obj.email=email;
        obj.phone=phone;
        setAllState(obj);
        console.warn(getState);
        let url=base_url+"JoinIn";

        let data = {
          email,
          name,phone
        }
    

        let form = new FormData()
        form.append('data', data)
        axios.post(url,form)
                .then(response=>{
                    console.warn(response)
                }).catch(error=>{
                    console.warn(error)
                })



    }
  return (
    <>
      <button className="" onClick={handleShow}>
      Join
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
                  <h3 style={{textAlign:"center",color:"blue",fontSize:"24",fontWeight:"bold"}}>Join Now!</h3>
                </div>
                <div className="join-box">
                  <div className="row">
                    <div className="col-md-12">     

                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm"><i className="fa fa-user"></i></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Enter Business Name" 
                       value={name} onInput={e => setName(e.target.value)}/>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm"><i className="fa fa-envelope"></i></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Enter Email" 
                      value={email} onInput={e => setEmail(e.target.value)} />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm"><i className="fa fa-phone"></i></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Enter Phone Number"
                       value={phone} onInput={e => setPhone(e.target.value)}/>
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
         
          <Button variant="contained" color="primary"  onClick={doJoin}>
            launch!
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
      
        </Modal.Footer>
      </Modal>
    </>
  );
}

