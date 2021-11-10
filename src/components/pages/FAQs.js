import React from 'react';
import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import ProfileHeader from '../header_footer/ProfileHeader';
const FAQs = () => {
    
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
      <div className="faqs-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="title">
                    <h3>FAQ</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                          What is Expy?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>Expy is a community-first, one-stop homepage for creators and influencers to share all their content, sell monetizable services, engage their audience, plus collaborate with ambitious creators via one link. Share, monetize, engage, collaborate and grow directly from your social media link in bio.</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <h3>FOR CREATORS</h3>
                    <Card>
                      <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                      Why Create an Expy page?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <h5>All-purpose:</h5>
                          <p>Integrate and drive engagement across all of your most important links, content, personalized / premium services, and collaboration opportunities from one aesthetic page.</p>
                          <h5>Simple:</h5>
                          <p>Requires minutes to set up and doesn’t require your followers to leave social media platforms or messengers in order to engage / transact. Anywhere you can share a link.</p>
                          <h5>Manageable:</h5>
                          <p>Get all the feature insights you need from a single dashboard and save by not paying multiple platform service fees and charges. Saves you time and improves convenience.</p>
                          <h5>Monetizable:</h5>
                          <p>Diversify revenue streams creatively, whether through followers (paid personalized / premium content features) or brands (affiliate marketing, or brand deal opportunities). All pre-built.</p>
                          <h5>Community-first:</h5>
                          <p>The only full-fledged creator community for established and upcoming creators in India. Join Expy to learn from top US creators, earn from various contests and funds, and connect and collaborate with other ambitious creators (facilitated by Expy).</p>
                          <h5>India, creator-first:</h5>
                          <p>First localized ‘link in bio’ monetization solution for Indian creators; this is not just another monetization platform. The purpose is to make a creator’s growth and scaling journey simpler – centralize your online ventures.</p>
                          
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                          What Can I offer on Expy?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>Using Expy, you can share your most important links with followers, driving engagement across platforms and sponsored deals; monetize your fame through all-purpose premium and personalized content features; and create an owned audience, bypassing social media algorithms. All from a single, revenue maximizing sharable link.</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                         Do Creators get paid?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>Yes, Expy provides a variety of monetizable features that you could offer to your followers. You get paid whatever price you set, minus Expy’s commission.</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
                         Do I have to complete every request?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="4">
                        <Card.Body>No, you have full control over which requests you complete.</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} variant="link" eventKey="5">
                         How and when would I get paid?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="5">
                        <Card.Body>Once your account holds over 1000 Rs, it can be withdrawn without any additional fees to your bank account.</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} variant="link" eventKey="6">
                         Who reserves the rights to the video requests?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="6">
                        <Card.Body>You and Expy reserve the rights to the video. Followers that request the video are granted licensing rights, with no abilities for mass distribution.</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <h3>FOR FANS</h3>
                    <Card>
                      <Accordion.Toggle as={Card.Header} variant="link" eventKey="7">
                         Why should I visit Expy?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="7">
                        <Card.Body>Make sure you are up-to-date with everything related to your favorite creator, whether new content or personalized services you could request from them, all from a single, simple page. Get to know your favorite creators better from their Expy page!</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                  <div className="ques">
                  <h3>Still have questions?</h3>
                  <p>Email us at <b>support@expy.bio</b> - We will be happy to answer all your questions.</p>

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


export default FAQs
