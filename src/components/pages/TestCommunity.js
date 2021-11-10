import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Loader from './Loader';
import API  from '../services/API';
import OwlCarousel from 'react-owl-carousel2';
 class TestCommunity extends Component {
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
                     <div className="item">
                             <a href={process.env.REACT_APP_API_URL+user.JM_User_Profile_Url} target="_blank" rel="noreferrer">    
                                     <div className="profile">
                                             <div className="abtar">
                                             {
                                             
                                                 user.Landing_Image!==null && user.Landing_Image!==''?
                                                 <img src={process.env.REACT_APP_UPLOAD_URL+user.Landing_Image} alt=""/>
                                                 :
                                                 <img src={"images/abtar.png"} alt=""/>
                                             } 
                                              </div>
                                             <div className="text">
                                                 <h3>{user.JM_Name}</h3>
                                             </div>
                                      </div>
                             </a>
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
                    </div>
        </div>
        )

        const expertoptions = {
          items: 5,
          nav: false,
          margin: 20,
          navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
          rewind: true,
          dots: false,
          autoplay: false,
          responsive: {
              0: {
                  items: 1,
                  margin: 0,
                  nav: true,
                  dots: true,
                  autoplay: true,
              },
              460: {
                  items: 1,
                  margin: 0,
                  nav: true,
                  dots: true,
                  autoplay: true,
              },
              576: {
                  items: 2,
                  margin: 15,
                  nav: true,
                  dots: true,
                  autoplay: true,
              },
              992: {
                  items: 5,
                  
                  
              }
          }
      };


    return (
      <>     
        {
            this.state.isLoading ?           
            <Loader/>
            : 
            <>
               
                {
                 this.state.tab_people ? 
                  
            //      <div className="profile-sec">
            //      <div className="container">
            //        <div className="row">
            //          <div className="col-md-8 offset-md-2">
            //              <div className="title">
            //                <h2>Who is using Expy?</h2>
            //                <h6>Anyone who creates and earns on the Internet. Expy is your digital identity. From creators to educators, entrepreneurs, freelancers to communities.</h6>
            //              </div>
            //            </div>
            //        </div>
            //        <div className="row">
            //        <div className="col-md-12">
            //              <div className="slider">
            //                  <OwlCarousel options={expertoptions}>
            //                        {profileCard}
            //                  </OwlCarousel>
            //              </div>
            //            </div>
            //        </div>
            //      </div>
            //    </div>
               <div className="community-user">
               <div className="container">
                   <div className="row">
                       <div class="col-md-6 offset-md-3">
                           <div class="title">
                               <h2>Our Community</h2>
                               <h6>Join today to get access to a thriving community and
   grow alongside our talented list of creators.
                               </h6>
                           </div>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-12">
                               <div className="slider">
                                   <OwlCarousel options={expertoptions}>
                                       {profileCard}   
                                   </OwlCarousel>
                               </div>
                               <div className="bigbtn">
                                   <h3>& 1000+ Creators</h3>
                               </div>
                           </div>
                   </div>
               </div>
           </div>




                 :                  
                    null  
                }
                
         
            </>  
             
        }        
     
    
      </>
    )
  }
}
export default TestCommunity;
