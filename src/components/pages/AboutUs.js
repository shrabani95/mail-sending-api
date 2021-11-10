import React from 'react'
import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import ProfileHeader from '../header_footer/ProfileHeader';
const AboutUs = () => {    
	const  JM_ID= parseInt(localStorage.getItem('JM_ID')) 
  return (
    <>
	{
		(JM_ID > 0) ?
		<ProfileHeader/>
		:
		<MainHeader/>
	}
      <div>
      <div className="inner-page-sec">
              <div className="container">
                <div className="row">
                    <div className="col-md-6 d-flex flex-wrap align-content-center">
                      <div className="text">
                        <h3>About Us</h3>
                        <p>Expy: Community-First Bio Link Homepage for Creators</p>
                        <p>Expy is a community-first, one-stop homepage for creators and influencers to share all their content, sell monetizable services, engage their audience, plus collaborate with ambitious creators via one link.</p>
                        <p>Share, monetize, engage, collaborate and grow directly from your social media link in bio.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="image">
                          <img src={"images/about-us-page.jpg"} alt=""/>
                      </div>
                    </div>
                </div>
              </div>
          </div>
          <div className="inner-page-sec pt-40">
              <div className="container">
                <div className="row">
                    <div className="col-md-6 order-md-last d-flex flex-wrap align-content-center">
                      <div className="text">
                        <h3>The Team</h3>
                        <p>Expy is owned and run by Indian HelloStar Media Pvt Ltd. and American-based HelloStar Tech LLC. The company operates from Kolkata, India, with representation in New York, United States.</p>
                        <p>Our team consists of globally diverse developers, designers, marketers and visionaries. Together, we are passionate in connecting and making life easier for upcoming and established content creators.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="image">
                          <img src={"images/the-team.jpg"} alt=""/>
                      </div>
                    </div>
                </div>
              </div>
          </div>

          <div className="inner-page-sec pt-40 pb-40">
              <div className="container">
                <div className="row">
                    <div className="col-md-6 d-flex flex-wrap align-content-center">
                      <div className="text">
                        <h3>Join Us</h3>
                        <p>If you believe in the vision, join the movement! We are always on the lookout for rising and established talent and would love to get in touch. Reach us at <b>roy@expy.bio</b></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="image">
                          <img src={"images/join-us.jpg"} alt=""/>
                      </div>
                    </div>
                </div>
              </div>
          </div>
      </div>
    <FooterClass/>
    </>
  )
}


export default AboutUs