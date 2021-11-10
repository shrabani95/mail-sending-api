import React, { Component } from 'react'
import HeaderClass from './header_footer/HeaderClass';
import FooterClass from './header_footer/FooterClass';
export default class Join extends Component {
  render() {
    return (
      <>
        <div>
        <HeaderClass/>
        	<div className="join-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <div className="join-box">
                    <div className="title">
                      <h3>Let's get you set up.</h3>
                      <p>It will take you less than 2 minutes, and it's free.</p>
                    </div>
                    <div className="form-box">
                      <label>Name</label>
                      <input type="text" className="form-control" placeholder="Gary"/>
                      
                      <label>Email Address</label>
                      <input type="text" className="form-control" placeholder="user@gmail.com"/>

                      <label>Pick a Handel</label>
                      <input type="text" className="form-control" placeholder="expy.in/user"/>

                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Password"/>
                      <button className="butn">Launch!</button>
                      <p>Already a member? Login here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <FooterClass/>
        </div>
      </>
    )
  }
}
