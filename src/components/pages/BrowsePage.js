import React, { Component } from 'react'

import FooterClass from '../header_footer/FooterClass';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SearchItemNextPrev from './SearchItemNextPrev';
import Items from './Items';
import MainHeader from '../header_footer/MainHeader';

 class BrowsePage extends Component {
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
          limitData:2,
          isLoading:false
       }
     }
     handleChange =tab=>e=> {
      this.setState({tab});
        if(tab===0)
        {
          this.setState({tab_people:true,tab_item:false});
           // alert(1);           
        }
        if(tab===1)
        {
          this.setState({tab_people:false,tab_item:true});
            //alert(2);
        }
      };
      componentDidMount() {
       // this.validateSession();
        this.Get_All_Users();  
           
      }
  
      Get_All_Users=()=>{
        this.setState({isLoading: true})  
        const API_url = this.state.base_url + "admin/Get_All_Users";
        let JSONdata = {
            JM_ID: this.state.JM_ID,
            limit:this.state.limitData        
          };
        fetch(API_url,
            {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(JSONdata)
            })
        .then((response) => response.json())
        .then(data => {
            if(data.status===1)
            {
                    this.setState({exploreData:data.exploreData})
                    this.setState({isLoading: false})  
            }
            else
                alert(data.msg);
        });

      }
      seeMore=(prevState)=>{
          let limitData=this.state.limitData;
          limitData=limitData+2;

          //this.Get_All_Users();
         
          this.setState({
            limitData:limitData
            },() => {
                //console.log(this.state.limitData);
               this.Get_All_Users();
            });
         
      }
      gotoProfile=()=>{
        this.props.history.push("/direct-access");
      }
  render() {
    const useStyles = makeStyles({
        root: {
          flexGrow: 1,
          maxWidth: 500,
        },
      });

      let tabView=(
        <Paper square className={useStyles.root}>
        <Tabs
            value={this.state.tab}       
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon label tabs example"
            centered
        >
           <Tab  aria-label="phone" label="People" onClick={this.handleChange(0)}/>
            <Tab  aria-label="favorite" label="Items" onClick={this.handleChange(1)}/>
           
        </Tabs>
        </Paper>
      );
        let base_url=this.state.base_url;
        let root_url=this.state.root_url;
     let profileCard;
     profileCard=this.state.exploreData.map((user,i) =>{
          return (
                <div className="item">
                    <div className="cards">
                        <div className="prop-pic">
                        <a href={root_url+user.JM_User_Profile_Url} target="_blank">   <img src={process.env.REACT_APP_UPLOAD_URL+user.JM_Profile_Pic} /></a>
                        </div>
                        <div className="name">
                        {
                            user.JM_Verified===1 ?
                            <span className="verify-tick"><img  src="/images/verifyIcon.png"/></span>
                            :
                            null
                          }
                     
                        <a href={root_url+user.JM_User_Profile_Url} target="_blank"> <h4>{user.JM_Name}</h4></a> 
                            <p>{user.JM_Email}</p>
                        </div>
                        {/* <a href={root_url+user.JM_User_Profile_Url} target="_blank">Follow</a> */}
                    </div>
                </div>
              ) 
        })
let exploreContent=(
        <div className="profile-sec pd-top1">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">                  
                            {tabView}
                        </div>
                    </div>
                    <div className="container"> 
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            {/* <div className="title">
                                <h2>Explore</h2>
                                <p>Find your favourite people</p>
                            </div> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-box">                 
                            {profileCard}                 
                        </div>
                    </div>
                    <div className="row">
                        <button className="btun" onClick={this.seeMore}>See More</button>                   
                    </div>
                    </div>
                </div>
        )
  let exploreItems=(
            <div className="profile-sec pd-top1">
              <div className="row">
                  <div className="col-md-4 offset-md-4">                  
                      {tabView}
                  </div>
              </div>
              <div className="container"> 
                        <SearchItemNextPrev/>    
                        <Items/>
               </div>
            </div>

        
);
    return (
      <>     
      
                <MainHeader/>
                {
                 this.state.tab_people ? 
                    exploreContent 
                 :                  
                    exploreItems  
                }
                
                <FooterClass/>    
   
             
        }        
     
    
      </>
    )
  }
}
export default BrowsePage;
