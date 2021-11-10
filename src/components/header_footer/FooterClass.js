import React, { Component } from 'react'
import {BrowserRouter as Router,} from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import ContactUs from '../pages/ContactUs';
import API from '../services/API';
export default class FooterClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news_email:'',
      placeholder:'',
      placeholderColor:'red',
      videoGuide:'https://www.youtube.com/playlist?list=PLIsPVSTJtbnsatcCe_qd3Wp9YtVuvT8sH',
      JM_ID:parseInt(localStorage.getItem('JM_ID')) 
    }
  }
  sendDetails=(e)=>{



    if(API.isValidEmail(this.state.news_email)===false)
    {
      this.setState({       
          placeholder:'Enter valid email-id',
          placeholderColor:'red'       
      })
      return false
    }    

    if(this.state.news_email.length > 0 && this.state.news_email.includes('.') && this.state.news_email.includes('@'))
    {
            let API_url=process.env.REACT_APP_API_URL+"admin/letter";
            fetch(API_url, {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({news_email:this.state.news_email})
              }).then(function(response) { 
                return response.json();
              }).then(data => 
              {  
                  if(data.status===1)
                  {
                    console.log(data.msg); 
                    this.setState({
                      news_email:'',
                      placeholder:'Thank You for Contacting Us',
                      placeholderColor:'green'
                    })
                                      
                  }
                  else
                  {                                 
                    this.setState({
                      news_email:'',
                      placeholder:data.msg,
                      placeholderColor:'red'
                    })
                  }                 

          });
    }
    else
    {
      this.setState({
        news_email:'',
        placeholder:'Enter a Valid Email Id',
        placeholderColor:'red'
      })
    }
  }
  onChangeHandle=(e)=>{
    this.setState({[e.target.name]:e.target.value});     
}
  render() {
    return (
      <>
        <Router>
        
        <div className="main-footer"> 
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                    <div className="subscribe">
                      <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                          <h3>Subscribe to our Newsletter</h3>
                        </div>
                        <div className="col-md-6">
                          <div style={{width:'100%',display:'table'}}>
                              <input type="text" id="news_email" placeholder={"Enter your email"} name={"news_email"} value={this.state.news_email}  className="form-control" onChange={this.onChangeHandle}/>
                              <button className="btun" onClick={this.sendDetails}>Subscribe</button>
                              <p style={{color:this.state.placeholderColor,fontSize:'13px',width:'100%',display:'table'}}>{this.state.placeholder}</p>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ul className="list-menu">
                            <li><a href="/about-us">About Us</a></li>
                            <li><a href="/FAQs">FAQ</a></li>
                            <li><a href="/how-it-work">How It Works</a></li>
                            <li><a href="/terms-and-condition">Terms &amp; Conditions</a></li>
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                            <li><ContactUs for="footer"/> </li>
                    </ul>
                    <ul className="Social-links">
                         {/* <li><Link href="#"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li> */}
                         <li><a href="https://instagram.com/expy.bio" target="_blank" rel="noreferrer"> <FontAwesomeIcon icon={faInstagram}/></a></li>
                        <li><a href=" https://www.facebook.com/Expy-334489027955270" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook}/></a></li>
                        {/* <li><a href="https://www.facebook.com/" target="_blank"> <FontAwesomeIcon icon={faYoutube} /></a></li> */}
                        <li><a href="https://twitter.com/expybio" target="_blank" rel="noreferrer"> <FontAwesomeIcon icon={faTwitter}/></a></li>
                    </ul>
                    <p className="lasttext">©- 2021 Expy. All rights reserved.</p>
                </div>
            </div>
        </div>
        </div>
        
        </Router>
      </>
    )
  }
}
