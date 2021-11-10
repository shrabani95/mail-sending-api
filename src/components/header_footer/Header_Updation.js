import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../services/API'

class Header_Updation extends Component {
    constructor(props) {
        super(props);
            this.state={
                isUpdation:false,
                msg:''
            }
    }

   
   async  componentDidMount() 
    {   
        const data=await API.serverMessage();
        if(data.status===1)
        {
            this.setState({
                isUpdation:true,msg:data.msg
            })
        }
    }  

 

    render() {
        
        
        return (
            this.state.isUpdation===true?  
                <div className="updating-bar">
                    <marquee>{this.state.msg}</marquee>
                </div>
                :
            null
            
        );
    }
}

Header_Updation.propTypes = {

};

export default Header_Updation;