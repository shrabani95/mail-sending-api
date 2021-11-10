import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Loader from './Loader';
import API  from '../services/API';
 class HomeExplore extends Component {
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
      seeMore=(prevState)=>{
          let limitData=this.state.limitData;
          limitData=limitData+2;
          //this.Get_All_Users();         
          this.setState({
            limitData:limitData
            },() => {
                ////console.log(this.state.limitData);
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

        let root_url=process.env.REACT_APP_ROOT_URL;
     let profileCard;
     profileCard=this.state.exploreData.map((user,i) =>{
          return (
                  user.isForLandingPage===1 ?
                    <div className={i===0 ? "item mt50" : i===2 ? "item mt50" : "item"  } key={i}>
                        <div className="cards">
                            <div className="prop-pic">
                            <a href={root_url+user.JM_User_Profile_Url} target="_blank" rel="noreferrer">    
                               {
                               
                                 user.Landing_Image!==null && user.Landing_Image!==''?
                                 <img src={process.env.REACT_APP_UPLOAD_URL+user.Landing_Image} alt=""/>
                                 :
                                 <img src={process.env.REACT_APP_UPLOAD_URL+"no_image.png"} alt=""/>
                               }                               
                           
                            </a>
                            </div>
                            <div className="name">
                              {
                                user.JM_Verified===1 ?
                                <span className="verify-tick"><img  src="/images/verifyIcon.png"  alt=""/></span>
                                :
                                null
                              }
                        

                            <a href={root_url+user.JM_User_Profile_Url} target="_blank" rel="noreferrer"> <h4>{user.JM_Name}</h4></a> 
                                {/* <p>{user.JM_Email}</p> */}
                            </div>
                            {/* <a href={root_url+user.JM_User_Profile_Url} target="_blank">Follow</a> */}
                        </div>
                    </div>
                    :
                  null
              ) 
        })
      let exploreContent=(
        <div className="profile-sec dash">
                 

                <div className="container"> 
                     <div className="row">
          			    <div className="col-md-8 offset-md-2">
                    <div className="title">
                        <h3>Connect with your Favorite Creators</h3>
                      </div>
                      <div className="sub-title">
                        <p>Find and engage with your favorite people who are already using Expy.</p>
                      </div>
          			</div>
          	        </div>
                    <div className="row">
                        <div className="profile-box">                 
                            {profileCard}                 
                        </div>
                    </div>
                        {/* <div className="row">
                            <button className="btun" onClick={this.seeMore}>See More</button>                   
                        </div> */}
                    </div>
        </div>
        )

    return (
      <>     
        {
            this.state.isLoading ?           
            <Loader/>
            : 
            <>
               
                {
                 this.state.tab_people ? 
                    exploreContent 
                 :                  
                    null  
                }
                
         
            </>  
             
        }        
     
    
      </>
    )
  }
}
export default HomeExplore;
