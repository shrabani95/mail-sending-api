

import React,{Component } from 'react'
import {Link} from 'react-router-dom';

import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import ProfileHeader from '../header_footer/ProfileHeader';
import HomeExplore from './HomeExplore';
import ContactUs from './ContactUs';

import { Helmet } from "react-helmet";
class HomePage extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
      videoGuide:'https://www.youtube.com/playlist?list=PLIsPVSTJtbnsatcCe_qd3Wp9YtVuvT8sH',
      JM_ID:parseInt(localStorage.getItem('JM_ID')) 
	  }
	}
	
render()
{
	let  JM_ID= parseInt(localStorage.getItem('JM_ID')) 
	let  JM_User_Profile_Url= localStorage.getItem('JM_User_Profile_Url')
  return (
    <>

<Helmet>
  <title>Expy: The Only Page You Need to Monetize & Grow as a Creator </title>
  <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta>

</Helmet>



	{
		(JM_ID > 0) ?
		<ProfileHeader/>
		:
		<MainHeader/>
	} 
    

   
    <div className="banner-sec">
            <div className="image">
              <img src={"images/home-banner.jpg"} alt="banner" />
            </div>
            <div className="text">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 offset-md-2">
                      <h2>The Only Page You Need To Monetize & Grow As A Creator</h2>
                      <h4>A creator-first Link in Bio website builder</h4>
                      {
                        		(JM_ID > 0) ?
                            <a className="btun" rel="noreferrer"
                                 href={"/"+JM_User_Profile_Url} target="_blank">
                               View My Page                             
                            </a>
                            :
                            <Link className="btun" to="/join">Create Your Page Now</Link>
                      }
                     


                    </div>
                  </div>
                </div>
            </div> 
          </div>
          <div className="about-sec">
            <div className="image">
              <img src={"images/about.png"} alt=""/>
            </div>
            <div className="dott-1">
              <img src={"images/icon.png"} alt=""/>
            </div>
            <div className="dott-2">
              <img src={"images/icon-2.png"} alt=""/>
            </div>
            <div className="text">
              <div className="container">
                  <div className="row">
                    <div className="col-md-8 offset-md-2">
                      <div className="title">
                        <h3>What is Expy ?</h3>
                      </div>
                      <p>Expy is the only link you need to share all your websites and content, plus offer monetizable services and storefronts on a single, custom page
.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
          <div className="why-sec">
            <div className="container">
                <div className="row">
                  <div className="col-md-12">
                      <div className="title">
                        <h3>What can I put on my page ?</h3>
                      </div>
                      <div className="sub-title">
                        <p>With Expy, consolidate everything important to you into one page:</p>
                      </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="image">
                       <img src={"images/why.png"} alt=""/>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="text">
                      <ul>
                        <li>
                          <div className="icon"><img src={"images/list-icon-1.png"} alt=""/></div>
                          <div className="list"><span>Embed &nbsp;</span> your latest content</div>
                        </li>
                        <li>
                          <div className="icon"><img src={"images/list-icon-2.png"} alt=""/></div>
                          <div className="list"><span>Stylize &amp; Customize &nbsp;</span> your definitive page</div>
                        </li>
                        <li>
                          <div className="icon"><img src={"images/list-icon-3.png"} alt=""/></div>
                          <div className="list"><span>Monetize &nbsp;</span> your fame through built-in premium and personalized features</div>
                        </li>
                        <li>
                          <div className="icon"><img src={"images/list-icon-4.png"} alt=""/></div>
                          <div className="list"><span>Analyze and Grow </span> your audience from a centralized dashboard</div>
                        </li>
                        <li>
                          <div className="icon"><img src={"images/list-icon-5.png"} alt=""/></div>
                          <div className="list"><span>Share &nbsp;</span> your most important social profiles and links</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          </div>

			 <HomeExplore/>
        <div className="contact-us-modal">
           <ContactUs for="Home"/>           
            {
               this.state.JM_ID > 0?
               <a className=" chatbot videoGuide" href={this.state.videoGuide} target="_blank" rel="noreferrer">Video Guides</a>             
        
               :null
            } 
        </div>
      
    <FooterClass/>
    </>
  )
}
}

export default HomePage
