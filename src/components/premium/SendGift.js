import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Checkout from './Checkout';
import API  from "../services/API";
class SendGift extends Component {
    constructor(props) {
      super(props)
    
     
    this.state = {
        openModel:false,
        base_url: process.env.REACT_APP_API_URL,
        root_url: process.env.REACT_APP_ROOT_URL,
      
        show:false,
        open:false,
        JM_ID:this.props.JM_ID,
        SWM_Title:'',
        SWM_Url:'',
        SWM_Icon:'',
        LM_Who_Will_See:1,
        selectedFile: null,
        linkMaster:[],
       userDetails:[],
       socialWidget:[],
       title:'',
       msg:'',
       logo:'',
       SWM_Icon_Position:'bottom',
 
       Instagram:'https://www.instagram.com/',
       Facebook:'https://www.facebook.com/',
       YouTube:'https://www.youtube.com/',
       Twitter:'https://twitter.com/',
       Snapchat:'https://www.snapchat.com/',
       LinkedIn:'https://www.linkedin.com/',
       Twitch:'https://www.twitch.com/',
       Pinterest:'https://www.pinterest.com/',
       Spotify:'https://www.spotify.com/',
       category_links:[],
 
       checked:false,
       request:true,
       checkedRequest:true,
       descript:false,
       checkeddescript:false,
       FanDetails:false,
       checkedFanDetails:false,
       DA_ID:this.props.productList.DA_ID,
       DA_DA_ID:this.props.productList.DA_DA_ID,
       BM_Instruction:'',
       BM_Name:'',
       BM_Email:'',
       BM_Phone:'',
       BM_Password:'12345678',
       BM_Purchase_Amt:this.props.productList.DA_Price,
       DA_Title:this.props.productList.DA_Title,
       JM_Name:this.props.JM_Name,
       dynamic_price:this.props.productList.DA_Min_Amount,
       LM_ID:0,
      Consent:0,
     }
//     console.log(this.props.productList);

}
ModalClose=()=>{
    this.setState({openModel:false,show:false});
  }
  ModalOpen=()=>{
    this.setState({openModel:true,show:true});
    this.setState({checkedRequest:true,request:true,checkedPayDetails:false,PayDetails:false,checkedFanDetails:false,FanDetails:false,checkeddescript:false,descript:false});
    //console.log(this.props.productList);
   // console.log(this.props.userDetails);

    var JSONdata = {
      Stat_Type: 'P',
      Stat_ID: this.props.productList.DA_ID,
      JM_ID: this.props.productList.JM_ID   
    };
    let data = API.doClick(JSONdata);
    
  }
 
  requestClick=(e)=>{
    this.setState({checkeddescript:true,checkedRequest:false,descript:true,request:false});
  }
  nextClick=(e)=>{
    //if(this.state.BM_Instruction.length > 0)
       this.setState({checkedFanDetails:true,FanDetails:true,checkeddescript:false,descript:false,checkedRequest:false,request:false
      ,BM_Instruction:'NA'
      });

       // else
    //   return false;
  }
  continueClick=(e)=>{
    if(this.state.BM_Name.length > 0 && this.state.BM_Email.length > 0 )
      {            
       // this.AddLeads();
        this.setState({checkedPayDetails:true,PayDetails:true,checkedFanDetails:false,FanDetails:false,checkedRequest:false,request:false});
      } 
    else
      return false;
  }
  AddLeads=()=>{
    var flagData = {
      DA_ID:this.props.productList.DA_ID,
      BM_Instruction:this.state.BM_Instruction,
      BM_Name:this.state.BM_Name,
      BM_Email:this.state.BM_Email,
      BM_Phone:this.state.BM_Phone,
      BM_Purchase_Amt:this.props.productList.DA_Price,
      Consent:this.state.Consent,    
    };

    const flag=API.encryptData(flagData);
    let  JSONdata = {
        flag: flag
      };


          const API_url = process.env.REACT_APP_API_URL + "admin/addLeads";
          fetch(API_url,
            {
              method: 'post',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(JSONdata)
            })
          .then((response) => response.json())
          .then(data1 =>
            {             
                if(data1.status===1)
                {
                  const data=API.decryptJson(data1.flag);
                  this.setState({
                    LM_ID:data.LM_ID
                  });
                }
                //console.log(data)
          });
    
  }
  backClick=(e)=>{
      if(this.state.descript)
      {
        this.setState({checkeddescript:false,checkedRequest:true,descript:false,request:true});
      }
     else if(this.state.FanDetails)
      {
        this.setState({checkedFanDetails:false,FanDetails:false,checkeddescript:true,descript:true});
      }
    else  if(this.state.PayDetails)
      {
        this.setState({checkedPayDetails:false,PayDetails:false,checkedFanDetails:true,FanDetails:true,
        
        });
      }
   
  }
  handleChange=(e)=>{
     // let val=parseFloat(e.target.value);
      this.setState({[e.target.name]:e.target.value})
  }

  handleDynamicPrice=(e)=>{
    let val=parseInt(e.target.value);
    //console.log(isNaN(val))
   if(isNaN(val)===true)
      val=0;

    this.setState({[e.target.name]:val})
  }

  PayNow=e=>
  {
    var JSONdata = {
      DA_ID:this.props.productList.DA_ID,
      BM_Instruction:this.state.BM_Instruction,
      BM_Name:this.state.BM_Name,
      BM_Email:this.state.BM_Email,
      BM_Phone:this.state.BM_Phone,
      BM_Password:this.state.BM_Password,
      BM_Purchase_Amt:this.props.productList.DA_Price,   
    };
          const API_url = process.env.REACT_APP_API_URL + "admin/addDoner";
        fetch(API_url,
          {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(JSONdata)
          })
        .then((response) => response.json())
        .then(data => {          
        //  console.log(data)
        });
  }
  openSpinner=()=>{
    this.setState({
      isLoading:true,
      showLoading:true,
      checkedPayDetails:false,
      PayDetails:false,
      checkedFanDetails:true,
      FanDetails:false
    });
  }

  showMessage=()=>{
    this.refs.checkout.UpdateMobileView();
  }

  doConsent=(e)=>{
    if(e.target.checked)
      this.setState({
        Consent:1
      });

  }
        render() 
        {
            const useStyles = makeStyles((theme) => ({
                root: {
                height: 180,
                },
                container: {
                display: 'flex',
                },
                paper: {
                margin: theme.spacing(1),
                },
                svg: {
                width: 100,
                height: 100,
                },
                polygon: {
                fill: theme.palette.common.white,
                stroke: theme.palette.divider,
                strokeWidth: 1,
                },
            }));
            return (
            <>
                <button className={this.props.className}  data={this.props.productList} style={this.props.mystyleForHightight} onClick={this.ModalOpen}>Send</button>

                <Modal
                    show={this.state.openModel}
                    onHide={this.ModalClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                 >
                <Modal.Header closeButton>
                <Modal.Title>
                    <p className="addnew-title">{this.props.productList.DA_Title}</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        
                            <div className="request-sec">                     
                                <div className="request-box">   
                                            {
                                            this.state.request ?
                                            <Grow in={this.state.checkedRequest} >
                                                <div className="body-part" id="request">
                                                        {/* <div className="icon">
                                                            <img src={this.props.src} />
                                                        </div> */}
                                                        <div className="text">
                                                            {/* <h4>{this.props.productList.DA_Title}</h4> */}

                                                    
                                                             
                                                                  <div className="form-box">
                                                                      <h4>Tell us about you</h4>
                                                                          {/* <p>We need a few details from you to keep you upto date with your Direct Access order.</p> */}
                                                                          <input type="text" name={"BM_Name"} value={this.state.BM_Name} onChange={this.handleChange}  placeholder="Your Name" className="form-control"/>
                                                                          <input type="email" name={"BM_Email"} value={this.state.BM_Email} onChange={this.handleChange}  placeholder="Email Address" className="form-control"/>
                                                                        
                                                                          <input type="number" name={"BM_Phone"} value={this.state.BM_Phone} onChange={this.handleChange}  placeholder="Phone Number" className="form-control"/>
                                                                         
                                                                          <p style={{ marginBottom:'10px',textAlign:'left'}}>
                                                                              <input type="checkbox" name="consent" onClick={this.doConsent}/> {API.consentLebel_GiftDonation()}
                                                                          </p> 
                                                                         
                                                                         
                                                                          <input type="text" name={"BM_Password"} value={this.state.BM_Password} onChange={this.handleChange} style={{display:'none'}} placeholder="Choose a password" className="form-control"/>
                                                                          
                                                                          
                                                                          
                                                                          <input type="hidden" name={"price"} value={this.props.productList.DA_Price} />
                                                                          {/* <button class="btun"  onClick={this.continueClick}>Next</button> */}
                                                                    </div>
                                                                    <p style={{textAlign:'left'}}> <h6>Your Message {this.props.productList.DA_DA_ID===2 || this.props.productList.DA_DA_ID===0? '(Optional)' : null} </h6> </p>
                                                                    <div className="form-box">
                                                                        <textarea className="form-control area" name="BM_Instruction" value={this.state.BM_Instruction} onChange={this.handleChange} 
                                                                        placeholder="Hi! Thank you for what you do. I really appreciate and enjoy it, have a chai on me!"/>
                                                                        {/* <button class="btun" onClick={this.nextClick}>Next</button> */}
                                                                    </div>
                                                               
                                                                    <div className="form-box">
                                                                    {
                                                                   this.props.productList.DA_Allow_Cust_Pay===1 ?
                                                                   <>
                                                                   <h4>Pay what you want</h4>
                                                                    <input type="text" name={"dynamic_price"} 
                                                                    onChange={this.handleDynamicPrice} 
                                                                    placeholder={this.props.productList.DA_Min_Amount + "+"} className="form-control"
                                                                    onKeyPress={(event) => {
                                                                      if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                      }
                                                                    }}
                                                                    onPaste={(e)=>{
                                                                      e.preventDefault()
                                                                      return false;
                                                                    }} onCopy={(e)=>{
                                                                      e.preventDefault()
                                                                      return false;
                                                                    }}
                                                                    
                                                                    />
                                                                    {/* dynamic price */}
                                                         
                                                                          <Checkout ref="checkout" BM_Type={'D'} DA_INR_Doller={ this.props.productList.DA_INR_Doller} DA_Price={this.state.dynamic_price}  productList={this.props.productList}
                                                                          AddLeads = {this.AddLeads}  DA_Allow_Cust_Pay={ this.props.productList.DA_Allow_Cust_Pay}   name={this.state.BM_Name} email={this.state.BM_Email} DA_ID={this.props.productList.DA_ID}  phone={this.state.BM_Phone} state={this.state} userDetails={this.props.userDetails.length > 0 ? this.props.userDetails[0]: null }  JM_ID={this.props.productList.JM_ID}/>
                                                                 


                                                                    </>
                                                                    :                                                                    
                                                                          <Checkout ref="checkout" BM_Type={'D'} DA_INR_Doller={ this.props.productList.DA_INR_Doller} DA_Price={this.props.productList.DA_Price}  productList={this.props.productList}
                                                                          AddLeads = {this.AddLeads} DA_Allow_Cust_Pay={ this.props.productList.DA_Allow_Cust_Pay}  name={this.state.BM_Name} email={this.state.BM_Email} DA_ID={this.props.productList.DA_ID}  phone={this.state.BM_Phone} state={this.state} userDetails={this.props.userDetails.length > 0 ? this.props.userDetails[0]: null } JM_ID={this.props.productList.JM_ID}/>
                                                                 

                                                                }
                                                                </div>
                                                            {/* <p>{this.props.productList.DA_Description}</p> */}

                                                            {/* <button class="btun" onClick={this.requestClick}>Request- 
                                                            {
                                                                this.props.productList.DA_INR_Doller==='INR' ?
                                                                    "Rs." + this.props.productList.DA_Price
                                                                :
                                                                    "$" + this.props.productList.DA_Price
                                                            }
                                                            
                                                            </button> */}
                                                        </div>
                                                </div>
                                            </Grow>
                                            :
                                            null                            
                                            }    
                                                
                                    {
                                        this.state.descript ?
                                            <Grow in={this.state.checkeddescript} >
                                                {/* <Paper elevation={4} className={useStyles.paper}> */}
                                            
                                                <div className="body-part" id="descrip">
                                                
                                                            
                                                            
                                                            <button className="back-btn" onClick={this.backClick}><KeyboardBackspaceIcon style={{fontSize:'30px'}} /></button> 
                                                </div>
                                            </Grow>
                                        :
                                        null
                                    }
                                    {
                                        this.state.FanDetails ?
                                            <Grow in={this.state.checkedFanDetails} >
                                                {/* <Paper elevation={4} className={useStyles.paper}> */}
                                            
                                                <div className="body-part" id="FanDetails">
                                            
                                                    <div className="dtl-box">                                                  
                                                    <h4>{this.props.productList.DA_Title}</h4>
                                                    <h3>
                                                    {
                                                        this.props.productList.DA_INR_Doller==='INR' ?
                                                            "Rs." + this.props.productList.DA_Price
                                                        :
                                                            "$" + this.props.productList.DA_Price
                                                    }
                                                        </h3>
                                                    </div>
                                                    <button className="back-btn" onClick={this.backClick}><KeyboardBackspaceIcon style={{fontSize:'30px'}} /></button> 
                                                </div>
                                            </Grow>
                                        :
                                        null
                                    }

                                    {
                                        this.state.PayDetails ?
                                            <Grow in={this.state.checkedPayDetails} >
                                                {/* <Paper elevation={4} className={useStyles.paper}> */}
                                            
                                                <div className="body-part" id="PayDetails">
                                                
                                                    <div className="form-box">
                                                    <h4>Secure Payment</h4>
                                                    {/* <p>Please enter your payment details to complete your request.</p>
                                                    <input type="text" placeholder="Card Number" className="form-control"/> */}
                                                   
                                                    {/* <button class="btun" onClick={this.PayNow}>Pay 
                                                    {
                                                        this.props.productList.DA_INR_Doller==='INR' ?
                                                            " Rs." + this.props.productList.DA_Price
                                                        :
                                                            " $" + this.props.productList.DA_Price
                                                    }
                                                    
                                                    </button> */}
                                                    {/* <p>We currently accept:</p> */}
                                                    {/* <ul>
                                                        <li><img src={"images/pay-1.png"} /></li>
                                                        <li><img src={"images/pay-2.png"} /></li>
                                                        <li><img src={"images/pay-3.png"} /></li>
                                                        <li><img src={"images/pay-4.png"} /></li>
                                                    </ul> */}
                                                    </div>
                                                
                                                    <button className="back-btn" onClick={this.backClick}><KeyboardBackspaceIcon style={{fontSize:'30px'}} /></button> 
                                                </div>
                                            </Grow>
                                        :
                                        null
                                    }

                                    {
                                            this.state.isLoading ?
                                            <Grow in={this.state.showLoading} >
                                                <div className="body-part" id="request">
                                                    <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                                                        <span class="sr-only">Please Wait...</span>
                                                    </div>
                                                </div>
                                            </Grow>
                                            :
                                            null                            
                                            }    

                                </div>
                            </div>
                </Modal.Body>

            </Modal>
                        
            </>             
                    
            );
        }

}



export default SendGift;