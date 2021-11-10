import React, { Component } from 'react';

import ProfileHeader from '../header_footer/ProfileHeader';
import FooterClass from '../header_footer/FooterClass';
import { Helmet } from 'react-helmet';
import ProfileNav from './ProfileNav';
import API from '../services/API'
import ContestReport from '../premium/ContestReport';

class Contest_All extends Component {
    constructor(props) {
     
        super(props);
        this.state={
            showDiv:false,
            contestData:[]
        }
        const contest=this.props.location.state;      
        if(typeof contest==='undefined' )
        {
           window.location.href='/signin'
        }
    }

 
    async componentDidMount() 
    {

        console.log(this.props.location.state)
        const contest=this.props.location.state;
      
        if(typeof contest!=='undefined' )
        {
              
            const data1=await API.postData({},'fetchContest');    
            if(data1.status===1)
            {

                const data=API.decryptJson(data1.flag);
                 this.setState({
                    showDiv:true,
                    contestData:data.contestData
                   })
            }

          
        }


    }
    openContestModal=(item)=>e=>{



    }

    render() {
       
        return (
            <>  
                        <Helmet>
                        <title>Contest| Expy </title>
                        <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta>
                    </Helmet>
            
     
                 
              {
                        this.state.showDiv ===true?  
                        <>
                                        <ProfileHeader/>      
                                        <div className="profile-tab">
                                            <div className="container">
                                                <div className="row">
                                                <div className="col-md-12 text-center">
                                                    <ProfileNav />
                                                </div>
                                                </div>
                                            </div>
                                            </div>

                            <div className="req-notification-sec">
                                <div className="container">
                                    <div className="row">
                                    <div className="col-md-8 offset-md-2">
                                        <div className="req-notification">
                                        <div className="heading">
                                            <h3>Contest / Giveaways</h3>
                                        </div>
                                        <div className="contest-btn-box">
                                            {
                                                this.state.contestData && this.state.contestData.map((item,i)=>{
                                                    return (
                                                        // <button className="contest-btn" onClick={this.openContestModal(item)}>{item.title}</button>
                                                   
                                                        <ContestReport  from={'C'} data={item} JM_User_Profile_Url_plus_JM_ID={item.JM_User_Profile_Url_plus_JM_ID} />
                                                    )
                                                
                                                })
                                            }
                                        
                                        </div>    
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>




                                        <FooterClass/>         
                        </> 
                        // : this.state.showDiv===false ?
                        //     <p>No cotest available</p>
                        : null
                }
            </>
        );
    }
}

Contest_All.propTypes = {

};

export default Contest_All;