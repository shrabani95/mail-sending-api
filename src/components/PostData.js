import React, { Component,useState,useEffect } from 'react'
import axios from 'axios'
class PostData extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         name:'',
         email:'',
         phone:''
       
      }
    }
    changeHandler = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }


       submitHandler = e =>{
        e.preventDefault();
        console.warn(this.state);
        let ErrorMsg="";
        if(this.state.name==="")
        {   
            ErrorMsg="Body is empty";
           // this.setState({ErrorMsg:ErrorMsg})
            alert(ErrorMsg);
            return false;
        }
        let url="http://localhost:8080/expy/API/JoinIn";
       //let url="https://jsonplaceholder.typicode.com/posts";
        // axios.get(url)
        // .then(response=>{
        //     console.warn(response)
        // }).catch(error=>{
        //     console.warn(error)
        // })

        // axios({
        //     method: 'post',
        //     url: url, 
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       "Access-Control-Allow-Credentials": "true",
        //       "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        //       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        //     },        
        //     data: this.state
        //   })
        //     .then(result => {
        //         console.warn(result)
        //     })
        //     .catch(error => this.setState({ error: error.message }));

        
        fetch(url, {
          method: 'post',
          body: JSON.stringify({name:this.state.name,email:this.state.email,phone:this.state.phone})
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
          console.log('Created Gist:');
          console.log(data);
        });
      
    }
  render() {
      const {name,email,phone}=this.state
    return (
      <>
        <div>
            <form onSubmit={this.submitHandler}>
            <div>
                <input type="text" name="name" value={name} onChange={this.changeHandler}/>
            </div>
            <div>
            <input type="text" name="email" value={email} onChange={this.changeHandler}/>
            </div>
            <div>
            <input type="text" name="phone" value={phone} onChange={this.changeHandler}/>
            </div>
            <button type="submit" name="submit">Submit</button>
            </form>
            <div>
                {this.ErrorMsg}
            </div>
        </div>
      </>
    )
  }
}

export default PostData
