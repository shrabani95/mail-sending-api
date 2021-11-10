

import React,{Component } from 'react'
import {Link} from 'react-router-dom';

import FooterClassHome from '../header_footer/FooterClass_Home';
import MainHeader from '../header_footer/MainHeader';
import ProfileHeader from '../header_footer/ProfileHeader';
import HomeExplore from './HomeExplore';
import ContactUs from './ContactUs';
import OwlCarousel from 'react-owl-carousel2';

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

  const options = {
    items: 5,
    nav: false,
    margin: 25,
    navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    rewind: true,
    dots: false,
    autoplay: false,
    responsive: {
        0: {
            items: 1,
            margin: 0,
            nav: true,
            dots: true,
            autoplay: true,
        },
        460: {
            items: 1,
            margin: 0,
            nav: true,
            dots: true,
            autoplay: true,
        },
        576: {
            items: 2,
            margin: 15,
            nav: true,
            dots: true,
            autoplay: true,
        },
        992: {
            items: 5,
            
            
        }
    }
};




  return (
    <>

{/* <Helmet>
  <title>Expy: The Only Page You Need to Monetize & Grow as a Creator </title>
  <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta>

</Helmet> */}



	{
		(JM_ID > 0) ?
		<ProfileHeader/>
		:
		<MainHeader/>
	} 
    

   
        
          <div className="banner-sec">
            <div className="container">
              <div className="row">
                  <div className="col-md-5 col-lg-5 d-flex align-items-center">
                    <div className="text">
                      <h4>Monetize, Engage & Grow Your Followers <span>With 1 Link</span></h4>
                      <h6>The Ultimate Homepage & Community For Creators</h6>   
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
                  <div className="col-md-7 col-lg-6 offset-lg-1">
                    <div className="image">
                    <img src={"images/banner-phone.png"} alt=""/>
                    </div>
                  </div>
              </div>
            </div> 
          </div>
          <div className="about-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <div className="title">
                    <h2>What’s Included?</h2>
                    <h6>Your Expy link will house your entire social media persona. From your links, videos, playlists to hosting and selling exclusive products and services. All from your link in bio.</h6>
                    <h6 className="hov">Hover your cursor over a feature to know more.</h6>
                  </div>
                </div>
              </div>
              <div className="row">
                  <div className="col-md-12">
                    <div className="slider">
                        <OwlCarousel options={options}>
                            <div className="item">
                              <div className="overlay-hover">
                                <p>With Expy, capture everything important to you into one simple page, from socials to affiliate marketing links.</p>
                              </div>
                              <img src={"images/include-1.png"} alt=""/>
                              <div className="btun">Share Links</div>
                            </div>
                            <div className="item">
                              <div className="overlay-hover">
                                <p>Earn money by selling products, personalized and premium services, and receiving gifts from your followers, all with 1 link.</p>
                              </div>
                              <img src={"images/include-2.png"} alt=""/>
                              <div className="btun">Monetize</div>
                            </div>
                            <div className="item">
                              <div className="overlay-hover">
                                <p>Personalize your page to show your authentic personality with over 20 customization styles.</p>
                              </div>
                              <img src={"images/include-3.png"} alt=""/>
                              <div className="btun">Customize</div>
                            </div>
                            <div className="item">
                              <div className="overlay-hover">
                                <p>Showcase your videos, songs and playlists playable directly on your page.</p>
                              </div>
                              <img src={"images/include-4.png"} alt=""/>
                              <div className="btun">Embed Content</div>
                            </div>
                            <div className="item">
                              <div className="overlay-hover">
                                <p>Get to know your audience better and grow with data-rich statistics of your page.</p>
                              </div>
                              <img src={"images/include-5.png"} alt=""/>
                              <div className="btun">Analyze</div>
                            </div>
                            
                        </OwlCarousel>
                    </div>
                  </div>
              </div>
            </div>
            
          </div>
          <div className="why-sec">
              <div className="col-md-12 why-img-box">
                    <img src={"images/why.png"} className="why-img" alt=""/>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="text">
                      <h2>Join Expy’s Creator Community</h2>
                      <h6>Expy’s Creator Tribe is a private community where creators connect, collaborate, learn from top global creators, earn through exclusive perks and rewards and 10X their online growth.
                      </h6>
                      <a href="/community" className="btun" rel="noreferrer">Join Community</a>
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
   
    <FooterClassHome/>
    </>
  )
}
}

export default HomePage
