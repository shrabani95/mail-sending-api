import React, { Component }from 'react';
import FooterClass from '../header_footer/FooterClass';

import ProfileHeader from '../header_footer/ProfileHeader';
import ProfileNav from './ProfileNav';
import API from '../services/API'

import { Helmet } from "react-helmet";

class NotificationView extends Component
{
    constructor(props) {
      super(props)
    
      this.state={
            allRequest:[],
            newRequest:0, 
            openModel:false,
            base_url: process.env.REACT_APP_API_URL,
            root_url: process.env.REACT_APP_ROOT_URL, 
            JM_User_Profile_Url:'',
            isLoading:'heloo'
        }
    }
    
   async  componentDidMount()
    {
            API.updateSeen();
            this.refreshStateHeaders();
            var id = parseInt(localStorage.getItem('JM_ID'));  
            var JSONdata = {
              JM_ID: id
            };  
            this.setState({
              isLoading:'Loading ....'
            })
            const data1=await API.postData(JSONdata,'GetAllRequest','view')
            if(data1.status===1)
            {
              const data=API.decryptJson(data1.flag);
              this.setState({
                allRequest:data.allRequest,    
               });
               if(data.newRequest!==null && data.newRequest.length > 0)
                this.setState({
                    newRequest:data.newRequest[0].pendingRequest,    
                });
                if(data.userDetails.length > 0)
                {
                    this.setState({
                        JM_Name:data.userDetails[0].JM_Name,    
                        JM_User_Profile_Url:data.userDetails[0].JM_User_Profile_Url, 
                        isLoading:''
                    });
                }

            }
            else
            {
              this.setState({newRequest:0})       
            }
            //document.getElementsByTagName('meta')["keywords"].content = "Expy";
           // document.getElementsByTagName('meta')["description"].content = "View All Notification";
            document.title = "View Notification | Expy";
            document.getElementsByClassName("btun Mobile-notification").innerHTML = ""
            
    }
    refreshStateHeaders= () => {
      this.refs.ProfileHeader.updateState(this.state);
    }
  render()
  {
    <Helmet>
      <title>View Notification  | Expy </title>
      <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta>
    </Helmet>
      const {allRequest}=this.state;
      allRequest.sort( function ( a, b ) { return b.BM_ID - a.BM_ID; } );
      let notifyTable=allRequest && allRequest.map((item,i)=>{
                return (      
                    item.IsSeen===1 && (item.DA_DA_ID===0 || item.DA_DA_ID===999 || item.DA_DA_ID===2 || item.DA_DA_ID===3) ?
                     <div className="item">  
                            <a href={"/notify?type=Purchased"}>
                                <div className="row">
                                    <div className="col-md-9">
                                        {
                                            item.DA_DA_ID===0?
                                                <p>You received a new gift of ₹{item.Actual_Price}.</p>
                                            :
                                            item.DA_DA_ID===999?
                                                <p>You received a new Tip of of ₹{item.Actual_Price}.</p>
                                            :
                                            item.DA_DA_ID===2?
                                            <p> Your content has been purchased for ₹{item.Actual_Price}.</p>
                                            :   
                                            item.DA_DA_ID===3?
                                              <p>Your digital good has been purchased for ₹{item.Actual_Price}.</p>
                                              :                                         
                                            null
                                        }  

                                    </div>
                                    <div className="col-md-3 justify-content-end d-flex flex-wrap align-content-center">
                                       <span>
                                          {/* <Moment date= {item.BM_Purchase_Date} format="D MMM YYYY" /> */}
                                        {  item.BM_Purchase_Date}
                                          <button className="defaultButton" style={{marginLeft:'5px'}}>View</button>
                                        </span>
                                    </div>
                                </div>
                            </a>
                     </div>
                     : 
                     item.IsSeen===1 && item.DA_DA_ID === 1?
                    <div className="item">  
                            <a href={item.Status==='P' ? '/notify?type=Pending' :  item.Status==='A' ? '/notify?type=Accepted' : item.Status==='C' ? '/notify?type=Completed' :  item.Status==='B' ? '/notify?type=Booked' :'notify' }>
                                <div className="row">
                                    <div className="col-md-9">
                                        {
                                            item.DA_DA_ID===1?
                                            <p>You have a new request for a personalized video or audio message for ₹{item.Actual_Price}.</p>
                                            // :                                            
                                            // item.DA_DA_ID===3?
                                            // <p> Digital E-Commerce of {item.DA_Title}</p>
                                            :
                                            null
                                        }  

                                    </div>
                                    <div className="col-md-3 justify-content-end d-flex flex-wrap align-content-center">
                                        <span>   
                                        {  item.BM_Purchase_Date}
                                               <button className="defaultButton" style={{marginLeft:'5px'}}>View</button>
                                             </span>
                                    </div>
                                </div>
                            </a>
                     </div>
                    // :
                    //  item.IsSeen===1 && item.DA_DA_ID === 3?
                    //  <div className="item">  
                    //          <a href={item.Status==='C' ? '/notify?type=Completed' : 'notify' }>
                    //              <div className="row">
                    //                  <div className="col-md-9">
                    //                      {
                                                                                      
                    //                           item.DA_DA_ID===3?
                    //                           <p>Your digital good has been purchased for ₹{item.BM_Purchase_Amt}.</p>
                    //                          :
                    //                          null
                    //                      }  
 
                    //                  </div>
                    //                  <div className="col-md-3 justify-content-end d-flex flex-wrap align-content-center">
                    //                      <span>    
                    //                      {  item.BM_Purchase_Date}
                    //                          <button className="defaultButton" style={{marginLeft:'5px'}}>View</button>
                    //                          </span>
                    //                  </div>
                    //              </div>
                    //          </a>
                    //   </div>
                      :
                      item.IsSeen===1 && item.DA_DA_ID === 5?
                      <div className="item">  
                              <a href={item.Status==='B' ? '/notify?type=Booked' : 'notify' }>
                                  <div className="row">
                                      <div className="col-md-9">
                                          {
                                                                                       
                                               item.DA_DA_ID===5 &&  item.isReminder===0?
                                               <p>A video session has been booked for ₹{item.Actual_Price}.</p>
                                              :
                                              item.DA_DA_ID===5 &&  item.isReminder===2?
                                                <p>You have a video session in 1 hour on Expy!.</p> 
                                              :
                                              null
                                          }  
  
                                      </div>
                                      <div className="col-md-3 justify-content-end d-flex flex-wrap align-content-center">
                                          <span>    
                                          {  item.BM_Purchase_Date}

                                         { 
                                          item.DA_DA_ID===5 &&  item.isReminder===2?
                                          <a href={process.env.REACT_APP_ROOT_URL+"meet?id="+item.BM_Content_Sent} target="_blank" className="defaultButton" style={{marginLeft:'5px'}}>Go</a>
                                          :
                                          <button className="defaultButton" style={{marginLeft:'5px'}}>View</button>
                                          
                                          } 
                                            
                                              </span>
                                      </div>
                                  </div>
                              </a>
                       </div>
                       :
                      null
                   
                )
        });
  return (
    <>
 
        <ProfileHeader state={this.state} ref="ProfileHeader" />

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
                                              <div class="heading">
                                                <h3>Transactions &amp; Requests Notifications</h3>
                                                <a href="/notify?type=Pending" type="button">
                                                  <button class="defaultButton">
                                                    View Transactions &amp; Requests Dashboard</button>
                                                    </a>
                                                    {/* <LoaderMobile/>  */}
                                                    <p style={{color:'green',fontWeight:'600',fontSize:'16px'}}>{this.state.isLoading}</p>
                                              </div>
                                      
                                              {
                                                    notifyTable
                                              }
                                          
                                      
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
export default NotificationView