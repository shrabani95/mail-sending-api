import React,{Component} from 'react'

import { NavLink,   } from 'react-router-dom'

import MenuIcon from '@material-ui/icons/Menu';
//import $ from 'jquery'

import Header_Updation from './Header_Updation';
class MainHeader extends Component
 {
     constructor(props) {
       super(props)
     
       this.state = {
          Email:sessionStorage.getItem('JM_Email'),
          JM_ID:sessionStorage.getItem('JM_ID')
       }
     }
     componentDidMount()
     {
        // var height = window.innerHeight;
        // var width = window.innerWidth; 
        // $('#sidebar-btn').on('click', function() {
        //     $('#sidebar').addClass('visible');
        //   });
        //    $('#cls').on('click', function() {
        //     $('#sidebar').removeClass('visible');
        //   });
     }
     render(){
         if(this.state.JM_ID > 0 && this.state.JM_ID !=="")
         {
             return (

                    <div className="main-header">  
                        <Header_Updation/>
                        <div className="container">
                            <div className="row">
                                    <div className="col-md-4">
                                        <div className="logo">
                                            <NavLink to="/"><img src="Logo.png" alt=""></img></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="header-button">
                                         <NavLink to="/logout" className="btun">Logout</NavLink>                                            
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>       
             
             );
         }
         else
         {
            return (
                <>
                    <div className="main-header navbar-expand-sm">
                         <Header_Updation/>
                        <div className="container">
                            <div className="row">
                                    <div className="col-md-4">
                                            <button className="navbar-toggler toggle-bar" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                                 <MenuIcon/>
                                            </button>
                             
                                            

                                        <div className="logo">
                                            <NavLink to="/"><img src="Logo.png" alt=""></img></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="header-button collapse navbar-collapse" id="collapsibleNavbar"> 
                                            <a href="/how-it-work" className="btun">How it Works</a>
                                            {/* <NavLink to="/browse" className="btun">Browse</NavLink> */}
                                            {/* <a href="/signin" className="btun">Login</a> */}
                                            <NavLink to="/signin" className="btun">Login</NavLink> 
                                            <NavLink to="/join" className="btun btn-1">Sign Up</NavLink> 

                                          
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </>
            );
         }
  
    }

 }
export default MainHeader


