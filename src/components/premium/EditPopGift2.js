import React, { Component } from 'react';
// import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import API  from '../services/API';
class EditPopGift2 extends Component
{
  constructor(props) {
    super(props)
  
    this.state = {
       openModel:false,
       show:false,
       open:false,
       DA_Title:'',
       price:0,
       chargesInfo:'',
       JM_ID: 0,
       showIconCharges:'none',
       title:'',
       msg:'',

       allowCustomertoPay: 0,
       min_amt: '',
       suggested_amt: '',
       showDiv: false,
       isPriceDisabled:false,
    }
    //console.log(this.props.gift)
  }


  ModalClose=()=>{
    this.setState({
      openModel:false,
      show:false,
      DA_Title:'',
      price:0
    });

  }
  ModalOpen=(e)=>{
    this.setState({
        openModel:true,
        show:true,
        DA_Title:this.props.gift.DA_Title,     
        price:this.props.gift.DA_Price,
        JM_ID: this.props.gift.JM_ID,
        allowCustomertoPay: this.props.gift.DA_Allow_Cust_Pay,                       
        min_amt: this.props.gift.DA_Min_Amount,   
        suggested_amt: this.props.gift.DA_Suggested_Amont,   
        showDiv:this.props.gift.DA_Allow_Cust_Pay===1 ? true : false,
        isPriceDisabled:this.props.gift.DA_Allow_Cust_Pay===1 ? true : false,
    });
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
      let chargesInfo="";
      let showIconCharges='none';
       this.setState({chargesInfo,showIconCharges});
     }
 }
 SaveItem=e=>
 {



   document.getElementById('msg').innerHTML='';
   document.getElementById('msg').style.color='red';
   
   if ((isNaN(parseInt(this.state.price)) || parseInt(this.state.price) === 0 ) && this.state.allowCustomertoPay === 0)   
   {
     document.getElementById('msg').style.color='red';
     document.getElementById('msg').innerHTML='* Enter Price';
     return false;
   }
       //23-aug-2021 dynamic pricing
   if(this.state.allowCustomertoPay===1)
   {
     if( isNaN(parseInt(this.state.min_amt)) || parseInt(this.state.min_amt) === 0 )
     {            
       document.getElementById('msg').style.color='red';
       document.getElementById('msg').innerHTML='* Enter minimum amount';
       return false;              
     }
   }
   //console.log(JSONdata)
   var flagData = {  
    DA_ID:this.props.gift.DA_ID,
     JM_ID:this.props.gift.JM_ID,
     DA_Title:this.state.DA_Title,
     DA_Price:this.state.price,
     DA_Type:'gifts',
     image:this.props.src ,
     DA_Allow_Cust_Pay:this.state.allowCustomertoPay,
     DA_Min_Amount:parseInt(this.state.min_amt),
     DA_Suggested_Amont:parseInt(this.state.suggested_amt)

   };

   const flag=API.encryptData(flagData);

   var JSONdata = {
     flag: flag
   };



         const API_url = process.env.REACT_APP_API_URL + "admin/updateGifts";
       fetch(API_url,
         {
           method: 'post',
           headers: { "Content-Type": "application/json", "authorization": API.getAuth(),"id":API.getId()},    
           body: JSON.stringify(JSONdata)
         })
       .then((response) => response.json())
       .then(data => {
         
         //console.log(data)
         if(data.status ===1)
         {
            
            this.setState({            
              DA_Title:'',
              price:0
            });
            this.ModalClose();  
            this.Get_User_Details();            
         }
         else
         {
          API.minusResponse(data);
          this.setState({
            show:true,
            title:'info !!!',
            msg:'Network error, try later',
          });
         }
       
          
         //this.ModalClose();         
        
       }).catch(error=>{
            document.getElementById("msg").innerText='Network error occured';
       });
 }
 Get_User_Details = () => {
        var JSONdata = {
          JM_ID: this.state.JM_ID
        };
        const API_url =process.env.REACT_APP_API_URL + "admin/userDetailsAll";
      fetch(API_url,
        {
          method: 'post',
          headers: { "Content-Type": "application/json","authorization": API.getAuth(),"id":API.getId()},
          body: JSON.stringify(JSONdata)
        })
      .then((response) => response.json())
      .then(data1 => {
        if (data1 != null && data1.status > 0)
        {
          const data=API.decryptJson(data1.flag);
          this.setState({
            userDetailsAll: data.data,
            userDetails:data.userDetails,
            themeMasterUser:data.themeMasterUser,
            socialWidget:data.socialWidget,
            gifts:data.gifts,
            title:'Success!!!',
            msg:'Profile is updated',
          });
          this.props.setStateAfterInsert(this.state);
        }      
        else
          this.setState({showPage:false})
      //console.log(data)
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
      isPriceDisabled:true,
      chargesInfo:'', showIconCharges:'none'
    })


  }
  else
  {
    this.setState({
      allowCustomertoPay:0,
      showDiv:false, isPriceDisabled:false
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
   // let chargesMessage="You receive 90% of the transaction value minus a 2% transaction fee that is collected by our payment provider.";
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
      <button onClick={this.ModalOpen}><CreateIcon />     
      </button>
      <Modal
        show={this.state.show}
        onHide={this.ModalClose}
        backdrop="static"
        keyboard={false}
        centered

      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="addnew-title">Update {this.props.gift.DA_DA_ID=== 0 ? "Gift Options" : "Support Options"}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="direct-access-pop">
            <div className="row">
              
              <div className="col-md-6 offset-md-3">
                <div className="image">
                   <img src={this.props.src} />
                </div>
              </div>
              <div className="col-md-12">
                <input type="text" name="DA_Title" value={this.state.DA_Title} onChange={this.handleChange} className="form-control" placeholder="Set Title" />
              </div>
              <div className="col-md-12">
                <input type="text" name="price" value={this.state.price}  disabled={this.state.isPriceDisabled}
                 onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={this.handleChange}  className="form-control" placeholder="Set Price" />
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


            <div className="row">
                <div className="col-md-12">
                        <label>
                               <strong>  
                                  Settings 
                              </strong>     
                       </label>
                </div>                  
                <div className="col-md-8 col-9">
                    <label >
                    Let your followers pay what they want     
                      </label>
                </div>  
                <div className="col-md-4 col-3">                    
                    <label class="switch"  for="allowCustomertoPay">
                        <input type="checkbox" id="allowCustomertoPay" checked={this.state.allowCustomertoPay===1?true:false} onChange={this.onchangeCheck} />
                        <div class="slider round"></div>
                      </label>
                </div>
                {
                  this.state.showDiv===true ?      
                  <>            
                        <div className="col-md-6">
                        <label >
                               <strong>  
                                  Minimum Amount 
                              </strong>     
                       </label>
                        <input type="text" name="min_amt" 
                        value={this.state.min_amt}  onChange={this.handleChange} 
                        className="form-control" placeholder="Enter Price" 
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        />       
                        <p style={{fontSize:'12px',fontWeight:'600'}}>{API.dynamicPriceMessage()}</p>
                      </div>
                    <div className="col-md-6" style={{display:'none'}}>
                       <label>
                               <strong>  
                                  Suggested Amount 
                              </strong>     
                       </label>
                      <input type="text" name="suggested_amt" 
                      value={this.state.suggested_amt} onChange={this.handleChange} 
                      className="form-control" placeholder="Enter Price" 
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      />       
                    </div>
                  </>
                  :
                  null
                }
              </div> 
            <div className="btun-box">
              <button className="btun" onClick={this.SaveItem}>Update Item</button>   
              <span id="msg"></span>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}

}

export default EditPopGift2;