

import React,{Component} from 'react';
import './App.css';
import {Route,BrowserRouter as Router,Switch,} from 'react-router-dom';

import Sudipta from './components/profile/Sudipta';
import BrowsePage from './components/pages/BrowsePage';
import JoinPage from './components/pages/JoinPage';
import SignInPage from './components/pages/SignInPage';
import HomePage from './components/pages/HomePage';
import MyAppearance from './components/pages/MyAppearance';
import MyStatus from './components/pages/MyStatus';
import Me from './components/profile/Me';
import Explore from './components/pages/Explore';
import Settings from './components/pages/Settings';
import StackedLink from './components/pages/StackedLink';
import DragableList from './components/pages/DragableList';
import DragDropMulti from './components/pages/DragDropMulti';
import PremiumFeature from './components/pages/PremiumFeature';
import AboutUs from './components/pages/AboutUs';
import FAQs from './components/pages/FAQs';
import HowItWork from './components/pages/HowItWork';
import TermsAndCondition from './components/pages/TermsAndCondition';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Gifts from './components/premium/Gifts';
import Cards from './components/pages/Cards';

import './css/MyStyle.css';
import './css/resonsive.css';
import NotificationRequest from './components/pages/NotificationRequest';
import facebook from './components/profile/facebook';
import MyProfile2 from './components/pages/MyProfile2';
import CropImage from './components/pages/CropImage';

// import PaymentCashFree from './components/RND/PaymentCashFree';

import NewsLetter from './components/pages/NewsLetter';
import NotificationView from './components/pages/NotificationView';
import ImageCarousel from './components/pages/ImageCarousel';
import EditImageCarousel from './components/pages/EditImageCarousel';
import MyProfile2_copy from './components/pages/MyProfile2_copy';
import LiveVideoSessionPage from './components/premium/LiveVideoSessionPage';
import EditLiveVideoSessionPage from './components/premium/EditLiveVideoSessionPage';
import Payout from './components/premium/Payout';

import Eventcalender from './components/RND/Eventcalender';
import Contest_All from './components/pages/Contest_All';
import CreatorCommunity from './components/pages/CreatorCommunity';
import pexel from './components/RND/pexel'
// import GoogleAnalysis from './components/RND/GoogleAnalysis';
import Page from './components/RND/Pagination'


class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      userDetails: [],
      directAccess: [],
      isLoggin:false     
    }
  }
  componentDidMount()
  {
    
  }
  setBaseUrl() 
  {
    //localStorage.setItem('api_url',"http://localhost:9000/");
  }

  
  validateSession=()=>{
    var email=localStorage.getItem('JM_Email');
    var JM_ID = parseInt(localStorage.getItem('JM_ID'));
    if (isNaN(JM_ID) || JM_ID === 0 || JM_ID===null) 
    {      
        localStorage.setItem('JM_Email',"");
        localStorage.setItem('JM_ID',0);
        this.setState({isLoggin:false});        
    }
    else
    {      

      this.setState({isLoggin:true});   
    }
}


  render(){

  return (
    <Router>
          <div className="App">
            {/* <Helmet>
                <title>Expy: The Only Page You Need to Monetize & Grow as a Creator</title>
                <meta name="description" content="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up." />
             </Helmet> */}
                <Switch>
                  
                      <Route exact path="/sudipta" component={Sudipta}/>

                      <Route exact path="/browse" component={BrowsePage}/>
                  
                      <Route exact path="/join" component={JoinPage}/> 
                      <Route exact path="/signin" component={SignInPage}/>       
                      <Route exact path="/statis" component={MyStatus}/> 
                      <Route exact path="/appear" component={MyAppearance}/>  
                      <Route exact path="/premium-feature" component={PremiumFeature}/>  
                      <Route exact path="/gifts" component={Gifts}/>  
                      <Route exact path="/stacked-link" component={StackedLink}/>  
                      <Route exact path="/me" component={MyProfile2}   /> 
                      <Route exact path="/me2" component={MyProfile2_copy}   /> 
                      <Route exact path="/crop" component={CropImage}   />                   
                      <Route exact path="/" component={HomePage}/>                      
                      <Route exact path="/notify" render={(props) => <NotificationRequest {...props} updateNotify={this.props.updateNotify}/>}/>
                   
                      <Route exact path="/newsletter" render={(props) => <NewsLetter/>}/>                    
                      <Route exact path="/explore" component={Explore}/>
                      <Route exact path="/settings" component={Settings}/>
                      <Route exact path="/drag" component={DragableList}/>
                      <Route exact path="/dragMul" component={DragDropMulti}/>
                      <Route exact path="/embed" component={PremiumFeature}/>                  
                      <Route exact path="/about-us" component={AboutUs}/>
                      <Route exact path="/faqs" component={FAQs}/>
                      <Route exact path="/how-it-work" component={HowItWork}/>
                      <Route exact path="/terms-and-condition" component={TermsAndCondition}/>
                      <Route exact path="/privacy-policy" component={PrivacyPolicy}/>
                      <Route exact path="/card" component={Cards}/>
                      <Route exact path="/face" component={facebook}/>    
                      <Route exact path="/view-notification" component={NotificationView}/> 
                      {/* 23-jun-2021 */}
                      <Route exact path="/create-carousel" component={ImageCarousel}/>    
                      <Route exact path="/create-carousel-edit" component={EditImageCarousel}/> 

                      <Route exact path="/live-video-session" component={LiveVideoSessionPage}/> 
                      <Route exact path="/live-video-session-edit" component={EditLiveVideoSessionPage}/> 
                      <Route exact path="/payout" component={Payout}/> 
                      {/* <Route exact path="/scheduleView" component={ViewCalender}/>  */}
                      <Route exact path="/view-calendar" component={Eventcalender}/> 
                      <Route exact path="/contest" component={Contest_All}/> 
                      <Route path="/pexel" component={pexel}/>
                      <Route path="/page" component={Page}/>
                      {/* <Route path="/testCommunity" component={testCommunity}/> */}
                      <Route path="/community" component={CreatorCommunity}/>
                     
                      
                      <Route  path="/:Url" component={Me} />
     
            
               </Switch> 
              
          </div> 

        </Router>
  );
}
}

export default App;
