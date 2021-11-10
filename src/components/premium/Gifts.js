import React, { Component } from 'react';
// import {Button} from 'react-bootstrap'



import { withStyles } from '@material-ui/core/styles';

import FooterClass from '../header_footer/FooterClass';
import ProfileHeader from '../header_footer/ProfileHeader';

import * as queryString from 'query-string';

import Loader from '../pages/Loader';
import PopGift from './PopGift';
import ToastAlert from '../pages/ToastAlert';
import { faAssistiveListeningSystems } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '@material-ui/core/Tooltip';

import SupportMe from './SupportMe';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class Gifts extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            islogged:faAssistiveListeningSystems,
            showAlert:false,
            show:false,   
            title:"",
            msg:"",
            JM_ID : parseInt(localStorage.getItem('JM_ID'))
        }
            //console.log(this.props.location.state)
    }

    componentDidMount() {
        this.validateSession();
        window.scrollTo(500, 0);
      }
      validateSession()
      {
      
        const urlParams = queryString.parse(window.location.search);
        const code=urlParams.code;
        var JM_ID = parseInt(localStorage.getItem('JM_ID'));
        if (isNaN(JM_ID) || JM_ID === 0 || JM_ID===null)  
        {
            localStorage.setItem('JM_Email', "");
            localStorage.setItem('JM_ID', 0);
            window.location.href = '/';
        }
        else{
            this.setState({islogged:true});
        }
      }
      showToast =(title,msg) =>{
        this.setState({showAlert:true})
        this.setState({      
          show:true,   
          title:title,
          msg:msg,
        // isLoading:true   
        });  
      }
      hideToast = (e) => {
        this.setState({ showAlert: false })
      }
      DirectAccess = () => {

     
        this.props.history.push("/premium-feature");
        this.props.history.push({
          state: {
            directAccess: this.props.location.state.state.directAccess,
            JM_ID: this.props.JM_ID,
            JM_User_Profile_Url: this.props.JM_User_Profile_Url,
          }
        })
        //}
    
        //console.log(this.props);
      }
    render() {

        const {uploadPercentage} = this.state;
        const longText = `
        Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
        Praesent non nunc mollis, fermentum neque at, semper arcu.
        Nullam eget est sed sem iaculis gravida eget vitae justo.
        `;
        
        const useStyles = {
          button: {
            margin: '5px',
          },
          customWidth: {
            maxWidth: 500,
            fontSize:'25px',
           
          },
          noMaxWidth: {
            maxWidth: 'none',
          },
        };
        //let chargesMessage="You receive a 90% share of the transaction value minus 10% transaction fee which is collected by our payment provider.";
        let chargesMessage="You receive 90% of the transaction value. We take care of the rest.";
      
        const HtmlTooltip = withStyles((theme) => ({
          arrow: {
            color: theme.palette.common.black,
          },
          tooltip: {
            backgroundColor: '#212529',
            color: 'white',
            maxWidth: '50%',
            fontSize: theme.typography.pxToRem(10),
            // border: '1px solid #dadde9',
          },
        }))(Tooltip);
        
        const iconStyle={
            display:this.state.showIconCharges,
            fontSize: "23px",
            color: "gray"
        }
        const chargesStyle={
          fontFamily: "consolas",
          fontSize: "13px",
          textTransform: "capitalize",
          marginTop: "-6%",
          fontWeight: "bold",
          color: "gray",
        }
        
        return (
            <>
                {
                  this.state.islogged ?   
                  <>               
                    <ProfileHeader/>
                  
                    <div className="virtual-gift">
                        <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                            <div className="heading">
                                <h3>Let your fans send you virtual gifts</h3>
                                <p>Pick which gifts (and prices) your fans could send you!.</p>
                                <button  onClick={this.DirectAccess} className="btnCropSave" style={{marginTop:'10px'}}>
                                  <ArrowBackIcon/>
                                  Back to monetization features                             
                               </button>
                            </div>
                            </div>
                            <div className="col-md-3">
                                    <div className="item">
                                        <h3>Kulhad Chai</h3>
                                        <div className="image">
                                            <img src={"images/gifts/kulhad_chai.gif"} />
                                        </div>
                                        <PopGift src={"images/gifts/kulhad_chai.gif"} state={this.props.location.state} showToast={this.showToast}/>
                                    </div>
                            </div>
                            <div className="col-md-3">
                                 <div className="item">
                                      <h3> Masala Chai</h3>
                                    <div className="image">
                                            <img src={"images/gifts/masala_chai.gif"} />
                                    </div>

                                         <PopGift src={"images/gifts/masala_chai.gif"} state={this.props.location.state} showToast={this.showToast}/>
                                  </div>
                            </div>
                            <div className="col-md-3">
                                  <div className="item">
                                      <h3> Special  Chai</h3>
                                      <div className="image">
                                          <img src={"images/gifts/special_chai.gif"} />
                                      </div>
                                  
                                      <PopGift src={"images/gifts/special_chai.gif"} state={this.props.location.state} showToast={this.showToast}/>
                                </div>
                            </div>
              
                            <div className="col-md-3">
                                  <div className="item">
                                      <h3> Support Me</h3>
                                      <div className="image">
                                      <img src={"images/gifts/support.gif"} />
                                      </div>
                                  
                                      <SupportMe src={"images/gifts/support.gif"} state={this.props.location.state} showToast={this.showToast}/>
                                </div>
                            </div>
                        
                        </div>
                        </div>
                
                    </div>
                    <ToastAlert title={this.state.title} hideToast={this.hideToast} 
                        msg={this.state.msg} show={this.state.showAlert} 
                        image={this.state.logo} showToast={this.showToast}/>
                        
                     <FooterClass/>
                     </>
                :
                    <Loader/>
                }
            </>
          );
    }
}

Gifts.propTypes = {

};

export default Gifts;