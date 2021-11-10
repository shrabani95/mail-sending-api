import React,{useState,useEffect,Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FunClick from './components/FunClick'
import HeaderClass from './components/header_footer/HeaderClass';
import FooterClass from './components/header_footer/FooterClass';

export default function Home()
{
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    function  activateLasers() {
            setLgShow(true)
      }
    return (
        <div>
        <HeaderClass/>
          <div className="banner-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-6 d-flex flex-wrap align-content-center">
                  <div className="text">
                    <h2>Get Your Free Link in Bio</h2>
                    <h4>Engage, Grow & <span>EARN</span> with one link.</h4>
                    <button className="btun">Get started, it's free</button>
                  </div>  
                </div>
                <div className="col-md-6">
                  <div className="image">
                    <img src={"images/mobile_view.png"} />
                  </div>
                </div>
              </div>  
            </div>
          </div>
          <div className="profile-sec">
          	<div className="container">
          		<div className="row">
          			<div className="col-md-8 offset-md-2">
          				<div className="title">
          					<h2>Get Expert's Access</h2>
          					<p>Expert access is the best way to engage with all your favorite people. Explore who is currently using Expert Access</p>
          				</div>
          			</div>
          		</div>
          		<div className="row">
          			<div className="profile-box">
          				<div className="item">
          					<div className="cards">
          						<div className="prop-pic">
          							<img src={"images/prop.png"} />
          						</div>
          						<div className="name">
          							<h4>Prasant Babu</h4>
          							<p>Senior Developer</p>
          						</div>
          						<button className="flw-btn">Follow</button>
          					</div>
          				</div>
          				<div className="item">
          					<div className="cards">
          						<div className="prop-pic">
          							<img src={"images/prop_2.png"} />
          						</div>
          						<div className="name">
          							<h4>Prasant Babu</h4>
          							<p>Senior Developer</p>
          						</div>
          						<button className="flw-btn">Follow</button>
          					</div>
          				</div>
          				<div className="item">
          					<div className="cards">
          						<div className="prop-pic">
          							<img src={"images/prop.png"} />
          						</div>
          						<div className="name">
          							<h4>Prasant Babu</h4>
          							<p>Senior Developer</p>
          						</div>
          						<button className="flw-btn">Follow</button>
          					</div>
          				</div>
          				<div className="item">
          					<div className="cards">
          						<div className="prop-pic">
          							<img src={"images/prop_2.png"} />
          						</div>
          						<div className="name">
          							<h4>Prasant Babu</h4>
          							<p>Senior Developer</p>
          						</div>
          						<button className="flw-btn">Follow</button>
          					</div>
          				</div>
          				<div className="item">
          					<div className="cards">
          						<div className="prop-pic">
          							<img src={"images/prop.png"} />
          						</div>
          						<div className="name">
          							<h4>Prasant Babu</h4>
          							<p>Senior Developer</p>
          						</div>
          						<button className="flw-btn">Follow</button>
          					</div>
          				</div>
          				<div className="item">
          					<div className="cards">
          						<div className="prop-pic">
          							<img src={"images/prop_2.png"} />
          						</div>
          						<div className="name">
          							<h4>Prasant Babu</h4>
          							<p>Senior Developer</p>
          						</div>
          						<button className="flw-btn">Follow</button>
          					</div>
          				</div>
          				<div className="item">
          					<div className="cards">
          						<div className="prop-pic">
          							<img src={"images/prop.png"} />
          						</div>
          						<div className="name">
          							<h4>Prasant Babu</h4>
          							<p>Senior Developer</p>
          						</div>
          						<button className="flw-btn">Follow</button>
          					</div>
          				</div>
          				<div className="item">
          					<div className="cards">
          						<div className="prop-pic">
          							<img src={"images/prop_2.png"} />
          						</div>
          						<div className="name">
          							<h4>Prasant Babu</h4>
          							<p>Senior Developer</p>
          						</div>
          						<button className="flw-btn">Follow</button>
          					</div>
          				</div>
          				<div className="item">
          					<div className="cards">
          						<div className="prop-pic">
          							<img src={"images/prop.png"} />
          						</div>
          						<div className="name">
          							<h4>Prasant Babu</h4>
          							<p>Senior Developer</p>
          						</div>
          						<button className="flw-btn">Follow</button>
          					</div>
          				</div>
          				<div className="item">
          					<div className="cards">
          						<div className="prop-pic">
          							<img src={"images/prop_2.png"} />
          						</div>
          						<div className="name">
          							<h4>Prasant Babu</h4>
          							<p>Senior Developer</p>
          						</div>
          						<button className="flw-btn">Follow</button>
          					</div>
          				</div>
          			</div>
          		</div>
          		<div className="row">
          			<button className="btun">See More</button>
          		</div>
          	</div>
          </div>
        <FooterClass/>
        </div>
    )
}