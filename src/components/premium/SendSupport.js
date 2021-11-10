import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Tipping from './Tipping';
import API  from "../services/API";
class SendSupport extends Component {
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
       BM_Instruction:'',
       BM_Name:'',
       BM_Email:'',
       BM_Phone:'',
       BM_Password:'*******',
       BM_Purchase_Amt:this.props.productList.DA_Price,
       DA_Title:this.props.productList.DA_Title,
       JM_Name:this.props.JM_Name,
       DonarName:'',
       DonarMsg:'',
       DonarEmail:'',
       DonarPhone:'',
       DonarAmt:this.props.productList.DA_Price,
       Consent:0,
       LM_ID:0,
     }
     //console.log(this.props);

}
ModalClose=()=>{
    this.setState({openModel:false,show:false,
      DonarName:'',
      DonarMsg:'',
      DonarEmail:'',
      DonarPhone:'',
      DonarAmt:this.props.productList.DA_Min_Amount
    });

  }
  ModalOpen=()=>{
    this.setState({openModel:true,show:true,
       DonarName:'',
       DonarMsg:'',
       DonarEmail:'',
       DonarPhone:'',
       DonarAmt:this.props.productList.DA_Price,
       Consent:0,
       LM_ID:0,
    
    });
    this.setState({checkedRequest:true,request:true,checkedPayDetails:false,PayDetails:false,checkedFanDetails:false,FanDetails:false,checkeddescript:false,descript:false});
   // //console.log(this.props.productList);
   // //console.log(this.props.userDetails);

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
    if(this.state.BM_Instruction.length > 0)
       this.setState({checkedFanDetails:true,FanDetails:true,checkeddescript:false,descript:false,checkedRequest:false,request:false});
    else
      return false;
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
      BM_Name:this.state.DonarName,
      BM_Email:this.state.DonarEmail,
      BM_Phone:this.state.DonarPhone,
      BM_Purchase_Amt:this.state.DonarAmt,
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
                ////console.log(data)
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
          //console.log(data)
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
  onChangeHandlePrice=(e)=>{
    var val=parseInt(e.target.value)

    if(isNaN(val)) val=0;
    this.setState({[e.target.name]:val});     
}
onChangeHandle=(e)=>{
  var val=e.target.value  
  this.setState({[e.target.name]:val});     
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
                <button className={this.props.className}  data={this.props.productList} style={this.props.mystyleForHightight} onClick={this.ModalOpen}>Buy</button>

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
                                       <div className="addnew-box" id="request">
                                                <label>How much do you want to send?</label>
                                                    <input type="text" className="form-control" placeholder="Enter Tip Amount"
                                                    name="DonarAmt" 
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
                                                    value={this.state.DonarAmt} onChange={this.onChangeHandlePrice}/>

                                                    <input type="text" className="form-control" placeholder="Enter Your Name"
                                                    name="DonarName" value={this.state.DonarName} onChange={this.onChangeHandle}/>
                                                   
                                                    <input type="text" className="form-control" placeholder="Enter Your Email"
                                                    name="DonarEmail" value={this.state.DonarEmail} onChange={this.onChangeHandle}/>
                                                    
                                                    <input type="text" className="form-control" placeholder="Enter Your Phone"
                                                    name="DonarPhone" value={this.state.DonarPhone} onChange={this.onChangeHandle}
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

                                                    <input type="text" className="form-control" placeholder="Tip Messsage (optional)"
                                                    name="DonarMsg" value={this.state.DonarMsg} onChange={this.onChangeHandle} />

                                                                          <p>
                                                                              <input type="checkbox" name="consent" onClick={this.doConsent}/> {API.consentLebel_GiftDonation()}
                                                                          </p> 

                                                        <div className="btun-box">
                                                                      <Tipping ref="checkout" BM_Type={'D'}  DA_INR_Doller={'INR'} DA_Price={this.state.DonarAmt} DA_Title={this.props.productList.DA_Title}
                                                                       AddLeads={this.AddLeads}   DonarName={this.state.DonarName} JM_Name={this.props.userDetails[0].JM_Name} message={this.state.DonarMsg} DA_ID={this.props.productList.DA_DA_ID}  state={this.state} userDetails={this.props.userDetails[0]}/>
                                                                
                                                        
                                                        {/* <button className="btun" onClick={this.closeSupportModal}>Cancel</button> */}
                                                        </div>
                                                        <p style={{color:this.state.errColor}}>{this.state.errMsg}</p>

                                                    </div>   
                                                                                
                                  

                                </div>
                            </div>
                </Modal.Body>

            </Modal>
                        
            </>             
                    
            );
        }

}



export default SendSupport;