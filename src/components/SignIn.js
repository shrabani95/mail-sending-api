import React, { Component } from 'react'
import HeaderClass from './header_footer/HeaderClass';
import FooterClass from './header_footer/FooterClass';
export default class SignIn extends Component {
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
                      <h3>Welcome Back</h3>
                      <p>Please Signin here!</p>
                    </div>
                    <div className="form-box">
                      
                      <label>Email Address</label>
                      <input type="text" className="form-control" placeholder="user@gmail.com"/>
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Password"/>
                      <button className="butn">SignIn!</button>
                      <p>Forgotten your password? request a new one</p>
                      <p>Need to register? Get started now</p>
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
