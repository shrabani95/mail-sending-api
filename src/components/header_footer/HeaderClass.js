import React, { Component } from 'react'
import {Link,BrowserRouter as Router} from 'react-router-dom'

export default class HeaderClass extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
         data:{"name":"sam"},
         logo:"Logo.png"
      }
    }
    
  render() {
    return (
      <>
      <Router>
        <div className="main-header">     
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="logo">
                            
                                <Link href="#">
                                <img src={this.state.logo} alt=""/></Link>
                            
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="header-button">
                            <Link to="/browse" className="btun btn-1">Browse</Link>
                            <Link to="/join" className="btun">Join</Link>
                            <a href="/signin" className="btun">SignIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Router>
      </>
    )
  }
}
