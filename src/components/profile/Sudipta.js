import React, { Component } from 'react'
import {Link,Route,BrowserRouter as Router,Switch} from 'react-router-dom'
import {Nav,Navbar,Button} from 'react-bootstrap';
import JoinModal from '../JoinModal';
import SignInModal from '../SignInModal';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

export default class Sudipta extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
         data:{"name":"sam"},
         logo:"Logo.png",
         bgColor:'#333',
         bgImage:"url('../images/profile_back.jpg')"

      }
    }
    
  render() {
    return (
      <>
        
        <div className="per-prop" style={{backgroundImage:this.state.bgImage}}>
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <div className="per-prop-header">
                        <button className="btun">Follow</button>
                        <button className="btun_2"><ChatOutlinedIcon style={{ fontSize: 35 }}/></button>
                  </div>
                  <div className="per-prop-body">
                    <div className="dtail-part">
                      <div className="prop-pic">
                        <img src={"images/prop_2.png"} />
                      </div>
                      <div className="name">
                        <h3>Your Name</h3>
                        <p>Description</p>
                      </div>
                      <div className="button-part">
                        <div className="btun-box">
                          <button className="big-btun">Follow me on Instagram </button>
                          <div className="icon"><img src={"images/insta.png"} /></div>
                        </div>

                        <div className="btun-box">
                          <button className="big-btun">I'll send you a video message</button>
                          <div className="icon"><PlayCircleOutlineIcon style={{ fontSize: 35 }}/></div>
                          <button className="buy">Buy</button>
                        </div>

                        <div className="btun-box">
                          <button className="big-btun">Follow me on Youtube </button>
                          <div className="icon"><img src={"images/youtube.png"} /></div>
                        </div>

                        <div className="reg-box">
                          <div className="heading">
                            <p>Get updates about me</p>
                          </div>
                          <input type="text" className="form-control" placeholder="Your Name..."/>
                          <div className="frm-btun">
                            <button className="next-btun">Next</button>
                            <a className="log-btun">Log in now</a>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="per-prop-footer">
                    <ul className="Social-links">
                        <li><Link href="#"> <FontAwesomeIcon icon={faYoutube}/></Link></li>
                        <li><Link href="#"><FontAwesomeIcon icon={faFacebook}/></Link></li>
                        <li><Link href="#"> <FontAwesomeIcon icon={faInstagram}/></Link></li>  
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 offset-md-2">
                  <div className="page-footer-logo">
                    <img src={"images/logo_2.png"} />
                  </div>
                </div>
                <div className="col-md-4">
                  <ul className="page-footer-link">
                      <li><Link href="#">Brouse</Link></li> | 
                      <li><Link href="#">Create Page</Link></li>
                    </ul>
                </div>
              </div>  
            </div>
        </div> 
        
      </>
    )
  }
}
