import React, { Component } from 'react'

import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import API  from '../services/API';
import ProfileHeader from '../header_footer/ProfileHeader';
import TestCommunity from './TestCommunity';
class CreatorCommunity extends Component
{

    constructor(props) {
        super(props)
      
        this.state = {
           tab:0,
           tab_item:false,
           tab_people:true,
           exploreData:[],
           JM_ID:parseInt(localStorage.getItem('JM_ID')),
           JM_Name: '',
           JM_Email: '',
           JM_Url: '',
           JM_Profile_Pic: '',
           JM_User_Profile_Url: '',
           base_url: process.env.REACT_APP_API_URL,
           root_url: process.env.REACT_APP_ROOT_URL,
           ProfilePath: 'Profile/',
           linkPath: '',
           ProfileimagePath: '',
           limitData:4,
           isLoading:false
        }
      }
    componentDidMount() {
        this.validateSession();     
           
      }
      validateSession()
      {
        var JM_ID =this.state.JM_ID;
        if (isNaN(JM_ID) || JM_ID === 0 || JM_ID===null)  
        {
          localStorage.setItem('JM_Email', "");
          localStorage.setItem('JM_ID', 0);
          //window.location.href = '/';
          this.Get_All_Users();  
          return false;
        }
        else
        {
          this.Get_All_Users();  
        }
      
      }

    Get_All_Users=()=>{
        this.setState({isLoading: true})  
        const API_url = process.env.REACT_APP_API_URL+ "admin/Get_Four_Users";
        let flagData = {
            JM_ID: this.state.JM_ID,
            limit:this.state.limitData        
          };

               
            const flag=API.encryptData(flagData);
            var JSONdata = {
            flag: flag
          };


        fetch(API_url,
            {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(JSONdata)
            })
        .then((response) => response.json())
        .then(async data1 => {
            if(data1.status===1)
            {
              const data=await API.decryptJson(data1.flag);
              ////console.log(data.exploreData)
              this.setState({exploreData:data.exploreData})
              this.setState({isLoading: false})  
            }           
        });

      }

  render(){
 
	let  JM_ID= parseInt(localStorage.getItem('JM_ID')) 

  return (
    <>
  	{
		(JM_ID > 0) ?
		<ProfileHeader/>
		:
		<MainHeader/>
	} 
    



            <div className="community-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 offset-lg-2">
                            <h2>Join the Expy Creator Tribe</h2>
                        </div>
                        <div className="col-lg-8 col-md-8 offset-lg-2 offset-md-2">
                            <h6>Expy’s Creator Tribe is a private community 
where creators connect, collaborate, learn from top 
global creators, earn through exclusive perks and
 rewards and 10X their online growth.</h6>
                        <a href="/join" class="btun">Start Now</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <TestCommunity/>


            <div className="community-last-back">  
            <div className="community-last right-back">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-4">
                            <div className="image">
                                <img src={"images/community-img-1.png"} />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-8 cpr-0 d-flex align-items-center">
                            <div className="text">
                                    <div className="left">
                                        <h3>Expy Creator Tribe WhatsApp & Discord Group</h3>
                                        <p>Engage, learn & collaborate with amazing
                                             creators to grow together.
                                        </p>
                                        <a href="/join" class="btun">Join Now</a>
                                    </div>
                                    <div className="mobile">
                                        <img src={"images/community-mobile-1.png"} />
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="community-last left-back">
                <div className="container">
                    <div className="row mb-70">
                        <div className="col-lg-5 col-md-4 order-md-last">
                            <div className="image">
                                <img src={"images/community-img-2.png"} />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-8 cpl-0 d-flex align-items-center">
                            <div className="left-text">
                                    <div className="mobile-left">
                                        <img src={"images/community-mobile-2.png"} />
                                    </div>
                                    <div className="right">
                                        <h3>Chai pe Charcha with the OGs</h3>
                                        <p>Have fireside chats with top content 
                                        creators from India and the USA.
                                        </p>
                                        <a href="/join" class="btun">Join Right Now</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
            <div className="community-last right-back">
                <div className="container">
                <div className="row">
                        <div className="col-lg-5 col-md-4">
                            <div className="image">
                                <img src={"images/community-img-3.png"} />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-8  cpr-0 d-flex align-items-center">
                            <div className="text">
                                    <div className="left">
                                        <h3>Discover Opportunities </h3>
                                        <p>Showcase your talent to a 
                                        wide group of creators with 
                                        creator spotlights, and get 
                                        featured on our newsletter 
                                        and website.
                                        </p>
                                        <a href="/join" class="btun">Don't Miss Out!</a>
                                    </div>
                                    <div className="mobile">
                                        <img src={"images/community-mobile-3.png"} />
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="community-last left-back">
                <div className="container">
                <div className="row">
                        <div className="col-lg-5 col-md-4 order-md-last">
                            <div className="image">
                                <img src={"images/community-img-4.png"} />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-8 cpl-0 d-flex align-items-center">
                            <div className="left-text">
                                    <div className="mobile-left">
                                        <img src={"images/community-mobile-4.png"} />
                                    </div>
                                    <div className="right">
                                        <h3>Get Rewarded</h3>
                                        <p>Be a part of rewarding Expy 
                                        contests on Twitter, IG and 
                                        pursue your creator dreams 
                                        with our Creator Fund 
                                        Programme.
                                        </p>
                                        <a href="/join" class="btun">Did You Join?</a>
                                    </div>
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
}
export default CreatorCommunity
