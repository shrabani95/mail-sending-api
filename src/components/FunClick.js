import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
class FunClick extends Component {
    constructor(props) {
      super(props)    
      this.state = {
         message:"hello"
      }
    }
    clickHandler=(e)=>{
        let val = e.target.getAttribute('data-mydatafield')
        this.setState({
            message:"Goodbye"
        })
        console.warn(val);
    }

  render() {
      let mesg
      if(!navigator.onLine)
            mesg=<p style={{color: "red"}}>You are in offline mode</p>
        else 
            mesg= <p>{this.state.message}</p> 
    return (
      <>
        <div>
            {mesg}            
            <button data-mydatafield ={this.state.message} onClick={this.clickHandler}>click</button>
        </div>
      </>
    )
  }
}

export default FunClick
