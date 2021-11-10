import React, { Component } from 'react';
// import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Popover from 'react-bootstrap/Popover';
import API  from '../services/API';
class SupportMe extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           openModel:false,
           show:false,
           open:false,
           DA_Title:'',
           price:0,
           chargesInfo:'',
           showIconCharges:'none',
           isPriceDisabled:false,
           showDiv:false,
           min_amt:0,

        }
      }
      ModalClose=()=>{
        this.setState({
          openModel:false,
          show:false,
          DA_Title:'',
          price:0
        });
    
      }
      ModalOpen=()=>{
        this.setState({openModel:true,show:true,
          showDiv:false,allowCustomertoPay:0, price: 0,showIconCharges:'none',chargesInfo:'',  isPriceDisabled:false,
        });
      }
      openCollapse = () => {
        !this.state.open ?
          this.setState({ open: true })
          :
          this.setState({ open: false })
          
      }
      
      handleChange=(e)=>{
         let val=parseFloat(e.target.value);
         this.setState({[e.target.name]:e.target.value})
         if(e.target.name==='price' && val > 0)
         {
          let fee=val * API.razorPayTax();
          let gst=fee * API.razorPayGST();         
          let razorPay=(fee+gst); // 1.65 + 0.297
          let TenPer=(val - razorPay) * 10/100; // 10 if val is 100                  
          let charges= val - razorPay - TenPer; // 100 - 1.65- 0.297                      
          let chargesInfo="You'll receive INR "+ charges.toFixed(2) + " ";

          let showIconCharges='block';
          this.setState({chargesInfo,showIconCharges});
         }
         else
         {
          this.setState({chargesInfo:'',showIconCharges:'none'});
         }
     }
     SaveItem=e=>
     {
    
       var flagData = {  
         DA_DA_ID:999,
         JM_ID:this.props.state.JM_ID,
         DA_Title:this.state.DA_Title,
         DA_Price:this.state.price,
         DA_Type:'gifts',
         image:this.props.src ,
         DA_Allow_Cust_Pay: this.state.allowCustomertoPay,
         DA_Min_Amount: parseInt(this.state.min_amt),
         DA_Suggested_Amont: parseInt(this.state.suggested_amt)
       };


       const flag=API.encryptData(flagData);
       var JSONdata = {
         flag: flag
       };

       
       //console.log(JSONdata)
             const API_url = process.env.REACT_APP_API_URL + "admin/addGifts";
           fetch(API_url,
             {
               method: 'post',
               headers: { "Content-Type": "application/json",  "authorization": API.getAuth(),"id":API.getId()},
               body: JSON.stringify(JSONdata)
             })
           .then((response) => response.json())
           .then(data => {
             
        
            if(data.status===1)
            {
              this.props.showToast('success', 'A Gift is added to profile');
              this.ModalClose();         
               this.setState({            
                 DA_Title:'',
                 price:0
               });
            }         
            else
            {
              API.minusResponse(data);
              this.props.showToast('failed', 'internal error');
            }
              
             //this.ModalClose();         
            
           }).catch(error=>{
                document.getElementById("msg").innerText='Network error occured';
           });
     }
     hidePopover=()=>{
      document.getElementById("popover-basic").style.display='none';
    }

    onchangeCheck=(e)=>{
      if(e.target.checked===true)
      {
        this.setState({
          allowCustomertoPay:1,
          showDiv:true,
          price:0,
          chargesInfo:'',showIconCharges:'none',
          isPriceDisabled:true,
        })
     
        
      }
      else
      {
        this.setState({
          allowCustomertoPay:0,
          showDiv:false,
          isPriceDisabled:false,
        })
        
      }
    }
      render(){
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
        //let chargesMessage="You receive 90% of the transaction value minus a 2% transaction fee that is collected by our payment provider.";
        let chargesMessage=API.chargesMessage();
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
        const popover2 = (
          <Popover id="popover-basic" style={{zIndex:'99999',background: 'black',color:'#fff'}}  >
             <button type="button" className="pop-close"><span aria-hidden="true" onClick={this.hidePopover}>×</span>
              <span className="sr-only">Close</span>
            </button>       
            <Popover.Content style={{background: 'black',color:'#fff'}}>
            {chargesMessage}
              
            </Popover.Content>    
           
          </Popover>
        );
      return (
        <>
          <button class="btun"  onClick={this.ModalOpen}><AddCircleOutlineIcon/> Add This</button>
          <Modal
            show={this.state.show}
            onHide={this.ModalClose}
            backdrop="static"
            keyboard={false}
            centered
    
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <p className="addnew-title">Support Me</p>
                <p>Let your followers decide how much to tip you!</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="direct-access-pop">
                <div className="row">
                  
                  <div className="col-md-6 offset-md-3">
                    <div className="image">
                        <img src={this.props.src}/>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <input type="text" name="DA_Title" value={this.state.DA_Title} onChange={this.handleChange} className="form-control" placeholder="Set Title" />
                  </div>
                     <div className="col-md-12">
                    <input type="text"  style={{display:'block'}} name="price" 
                    value={this.state.price} onChange={this.handleChange}  
                    className="form-control" disabled={this.state.isPriceDisabled}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    
                    placeholder="Set Price" />
                  </div>
                </div>
                <div className="col-md-12 desktopCharge">
                      <HtmlTooltip arrow
                          title={
                            <React.Fragment>
                              <Typography color="inherit">Transaction Info</Typography>                
                              <p style={{fontFamily:'monospace',fontSize:'12px'}}>{chargesMessage}</p>
                            </React.Fragment>
                          } placement="top-start"
                        >
                      <Button style={chargesStyle}>{this.state.chargesInfo}<i class="fa fa-question-circle" aria-hidden="true" 
                      style={iconStyle}></i></Button>
                    </HtmlTooltip>
                  </div>
    
                  <div className="col-md-12 mobileCharge" style={{fontFamily: 'consolas', fontSize: '13px',textTransform: 'capitalize'}}>
                          &nbsp;{this.state.chargesInfo}
                         <OverlayTrigger  className="mobile" style={chargesStyle} trigger="click" placement="top" overlay={popover2}>           
                             <i class="fa fa-question-circle" aria-hidden="true"  style={iconStyle}></i>                     
                          </OverlayTrigger >  
                    </div>    
    
            
               
            


                <div className="btun-box">
                  <button className="btun" onClick={this.SaveItem}>Save Item</button>   
                  <span id="msg"></span>
                </div>
              </div>
            </Modal.Body>
    
          </Modal>
        </>
      );
    }
    
    }
    
    export default SupportMe;