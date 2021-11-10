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
class EditPopGift extends Component
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
    }
    console.log(this.props.gift)
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
        JM_ID: this.props.gift.JM_ID
    });
  }

  
  handleChange=(e)=>{
     let val=parseFloat(e.target.value);
     this.setState({[e.target.name]:e.target.value})
     if(e.target.name==='price' && val > 0)
     {
      let twoPer=val * 2/100;
      let TenPer=val * 10/100;
      let razorPay=(twoPer+(twoPer*18/100));
      console.log(twoPer)
      console.log(razorPay)
      console.log(TenPer)
      let charges=val - razorPay - TenPer;

        let chargesInfo="You'll receive INR "+ charges.toFixed(2) + " ";
        let showIconCharges='block';
         this.setState({chargesInfo,showIconCharges});
     }
 }
 SaveItem=e=>
 {

   var JSONdata = {  
    DA_ID:this.props.gift.DA_ID,
     JM_ID:this.props.gift.JM_ID,
     DA_Title:this.state.DA_Title,
     DA_Price:this.state.price,
     DA_Type:'gifts',
     image:this.props.src 
   };
   console.log(JSONdata)
         const API_url = process.env.REACT_APP_API_URL + "admin/updateGifts";
       fetch(API_url,
         {
           method: 'post',
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(JSONdata)
         })
       .then((response) => response.json())
       .then(data => {
         
         console.log(data)
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

         }
       
          
         //this.ModalClose();         
        
       }).catch(error=>{
            document.getElementById("msg").innerText='internal error occured';
       });
 }
 Get_User_Details = () => {
    var JSONdata = {
      JM_ID: this.state.JM_ID
    };
    const API_url = process.env.REACT_APP_API_URL+ "admin/userDetails";
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
      this.setState({
        userDetails:data.userDetails,
        linkMaster:data.linkMaster,
        LM_Title:'',
        LM_Url:'',
        LM_Image:'',
        LM_Who_Will_See:1,
        selectedFile: null,
        title:'Success!!!',
        msg:'Gift is updated',
        socialWidget:data.socialWidget,
        category_master:data.category_master,
        category_links:data.category_links,
        embed_content:data.embed_content,
        productList:data.productList,
        gifts: data.gifts,
      });
      this.props.setStateAfterInsert(this.state);
    }   
      else
        alert('not fetch');
  });
}
hidePopover=()=>{
  document.getElementById("popover-basic").style.display='none';
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
    let chargesMessage="You receive 90% of the transaction value minus a 2% transaction fee that is collected by our payment provider.";
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
            <p className="addnew-title">Update Gift Options</p>
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
                <input type="number" name="price" value={this.state.price} onChange={this.handleChange}  className="form-control" placeholder="Set Price" />
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
              <button className="btun" onClick={this.SaveItem}>Updated Item</button>   
              <span id="msg"></span>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}

}

export default EditPopGift;