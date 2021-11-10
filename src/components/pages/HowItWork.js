import React from 'react';
import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ProfileHeader from '../header_footer/ProfileHeader';

const HowItWork = () => {
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
        	<div className="howitwork-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="title">
                    <h3>How Does It Work ?</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                    <Tabs defaultActiveKey="fan">
                        <Tab eventKey="fan" title="FOR FANS">
                        <div className="row mb-30">
                              <div className="col-md-6 d-flex flex-wrap align-content-center">
                                <div className="text">
                                    <h3>What is Expy?</h3>
                                    <p>Expy is the homepage where you can find out everything your favorite creator is doing online, whether new content across platforms, events, personalized services among others. Get to know your favorite creators better from their Expy homepage!</p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="image">
                                    <img src={"images/fan-what.jpg"} />
                                  </div>
                              </div>
                          </div>

                          <div className="row mb-30">
                              <div className="col-md-6 order-md-last d-flex flex-wrap align-content-center">
                                <div className="text">
                                    <h3>How does It work?</h3>
                                    <h4>Enter Expy</h4>
                                    <p>Visit expy.bio from your desktop or mobile phone.</p>
                                    <h4>Browse and Select your Creator</h4>
                                    <p>From our extensive industry category pool of creators using Expy.</p>
                                    <h4>See everything important to your Creator</h4>
                                    <p>Whether their latest YouTube video, Spotify single or paid, premium content, the creator’s whole online persona lives on their Expy page! </p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="image">
                                    <img src={"images/fan-work.jpg"} />
                                  </div>
                              </div>
                          </div>

                          <div className="row mb-30">
                              <div className="col-md-6 d-flex flex-wrap align-content-center">
                                <div className="text">
                                    <h3>How do payments work?</h3>
                                    <p>Payment can be made by debit / credit card when requesting a paid creator service. In case of cancellation or unfulfillment, the money is fully refunded to your account.</p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="image">
                                      <img src={"images/fan-pay.jpg"} />
                                  </div>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-md-6 order-md-last d-flex flex-wrap align-content-center">
                                <div className="text">
                                    <h3>How do I receive the paid creator service?</h3>
                                    <p>A link to the paid service will be sent to your email and a notification of the completed paid service will be sent to your phone. Hooray!</p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="image">
                                    <img src={"images/fan-receive.jpg"} />
                                  </div>
                              </div>
                          </div>
                        </Tab>
                        <Tab eventKey="creators" title="FOR CREATORS">
                        <div className="row mb-30">
                              <div className="col-md-6 d-flex flex-wrap align-content-center">
                                <div className="text">
                                    <h3>What is Expy?</h3>
                                    <p>Expy is a community-first, one-stop homepage for creators and influencers to share all their content, sell monetizable services, engage their audience, plus collaborate with ambitious creators via one link. Share, monetize, engage, collaborate and grow directly from your social media link in bio.</p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="image">
                                    <img src={"images/creator-what.jpg"} />
                                  </div>
                              </div>
                          </div>
                           <div className="row">
                              <div className="col-md-6 order-md-last d-flex flex-wrap align-content-center">
                                <div className="text">
                                    <h3>How does It work?</h3>
                                    <h4>Register and verify your account</h4>
                                    <p>Submit some details to be verified (2 minutes) and create a profile.</p>
                                    <h4>Personalize your page</h4>
                                    <p>With 3 simple clicks, you are able to make your page a reflection of your online persona. Add any links, social widgets, content embedding, paid services (personalized videos, live video sessions, content paywall and many more) and anything else you would like your fans to see. Should not take longer than 5 minutes!</p>
                                    <h4>Post your Expy link</h4>
                                    <p>Find your personalized link and paste it in the “website” section of your main social media profiles (e.g. Instagram, Twitter, YouTube…).</p>
                                    <h4> Engage with Expy’s creator community </h4>
                                    <p>As an Expy creator, you’ll have access to Expy’s exclusive creator tribe, with a private WhatsApp/Discord group, bi-weekly creator calls, numerous monetary-incentivized social media contests, creator collaboration opportunities (facilitated by Expy) and many other perks and rewards.</p>
                                    <p>You’re good to go! Share your Expy link anywhere to engage, monetize and grow your audience and collaborate with ambitious creators!</p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="image">
                                    <img src={"images/fan-work.jpg"} />
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                          <div className="col-md-12">
                                  <div className="image">
                                      <iframe width="100%" height="550" 
                                        src="https://www.youtube.com/embed/videoseries?list=PLIsPVSTJtbnsatcCe_qd3Wp9YtVuvT8sH&rel=0"
                                        title="Video Guide"
              
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen>

                                        </iframe>                               
                                  </div>
                                  
                              </div>
                          </div>
                        </Tab>
                    </Tabs>
                </div>
              </div> 
            </div>  
          </div>
      </div>
    <FooterClass/>
    </>
  )
}


export default HowItWork
