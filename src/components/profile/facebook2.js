import React, { Component } from 'react';
import { Link, NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

class facebook2 extends Component {
    constructor(props) {
        super(props);

    }

    responseFacebook(response) {
        console.log(response);
    }
    componentClicked=()=>{
        console.log("clicked")
    }

    render() {
        return (
            <>
            <div>
                <FacebookLogin
                appId={"726882861316821"}
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} 
            />
            </div>

                <div style='margin: 5px;padding: 10px;text-align: justify;font-size: 16px;'><h3> Hi "+JM_Name+",</h3><p>We received a request to reset your Expy.bio password.</p><p>You can Enter the following auto-generated password to login: <b> "+randomPassword+"</b></p><p>If you wish to reset your password, you can login to your expy account and reset it from the <b>settings</b> page in your account.</p><p> <a href='"+process.env.BASE_URL+"'>Click here to login</a></p><p>If this reset request was not made by you, please let us know by emailing the same to info@expy.bio .</p><span><b>Regards,</b></span><br/><span><b>Team Expy,</b></span><br/><span><b>Expy.bio </b></span></div>
                </>
        );
    }
}

facebook2.propTypes = {

};

export default facebook2;