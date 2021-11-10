import React, { Component }from 'react'

import FooterClass from '../header_footer/FooterClass';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRupeeSign} from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-bootstrap/Modal';
import API  from '../services/API'
import ProfileHeader from '../header_footer/ProfileHeader';
import Moment from 'react-moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
class Payout extends Component
{
    

    constructor(props) {
        super(props)
      
        this.state = {
           openModel:false,
           show:false,
           open:false,
           amount:0,
           bal:0,
           lastPayout:0,
           cancelBtn:true,
           withdrawBtn:true,
           type:'B',
           withDrawableBalance:0,
        }
      }
    
      async componentDidMount()
        {
         //let sender_batch_id=API.randomString(100,'alphanumeric')
          //console.log(sender_batch_id)
            API.autoLogout();
            this.getBal();
        }
    async getBal()
      {
        try
        {
     
            const data=await API.postData({bal:0},'pay_balance');
            //console.log(data)
            if(data.status===1)
            {
                this.setState({
                    bal:data.currentBalance,result:data.result,
                    withDrawableBalance:data.withDrawableBalance,
                })
                
            }
         
        }
        catch(error)
        {
            //...
        }
 
        
      }
      ModalClose=()=>{
        this.setState({openModel:false,show:false});
      }
      ModalOpen=()=>{
        this.setState({
            openModel:true,show:true,amount:0,type:'B'
        
        });
      }
      openCollapse = () => {
        !this.state.open ?
          this.setState({ open: true })
          :
          this.setState({ open: false })
          
      }
   
doPayout=()=>{

  
    let msg="Minimum balance required of Rs. 1000";
    if(this.state.withDrawableBalance < 1000)
    {
      document.getElementById('msg').innerHTML=msg;
      setTimeout(function() {     
         document.getElementById("msg").innerHTML='';       
        }, 2000);   
      return false;
    }

    this.ModalOpen();
}
withdrawal=async (e)=>{
    document.getElementById('msg_modal').innerHTML="";
    if(this.state.amount.length === 0)
    {
        document.getElementById('msg_modal').innerHTML="* Enter Amount";
        return false;
    }
    if(parseInt(this.state.amount) === 0)
    {
        document.getElementById('msg_modal').innerHTML="* Enter Amount";
        return false;
    }
    if(parseInt(this.state.amount) < 0)
    {
        document.getElementById('msg_modal').innerHTML="* Enter Amount";
        return false;
    }
    console.log(parseInt(this.state.amount))

//btn_withdraw
  
    this.isConfirm();
}
confirmPayout=async()=>
{
  document.getElementById('msg_modal').style.color='red';
    document.getElementById('msg_modal').innerHTML="Processing..Don't refresh the page";
    this.setState({
        cancelBtn:false,withdrawBtn:false
    })
    var JSONdata={
        amount:this.state.amount,
        type:this.state.type
    }
    if(this.state.type==='B')
    {
      let data=await API.postData(JSONdata,'payout');
      if(data.status===1)
      {
         document.getElementById('msg_modal').style.color='green';
          document.getElementById('msg_modal').innerHTML="Payout process is successfully completed";
          setTimeout(function() {
             window.location.reload();        
           }, 2000);   
         
      }
      else
      {
          this.setState({
              cancelBtn:true,withdrawBtn:true
          })
          document.getElementById('msg_modal').innerHTML=data.msg;
          return false;
      }
    }
    else // for paypal payout
    {
        
      
        var flagData={
            amount:parseFloat(this.state.amount),
            type:this.state.type
        }
        const flag=API.encryptData(flagData)
        var  JSONdata={
                flag:flag           
            }
        let data=await API.postData(JSONdata,'paypalPayout');
      if(data.status===1)
      {

          document.getElementById('msg_modal').style.color='green';
          document.getElementById('msg_modal').innerHTML="Payout process is successfully completed";
          setTimeout(function() {
             window.location.reload();        
           }, 2000);  
      }
      else
      {
          this.setState({
              cancelBtn:true,withdrawBtn:true
          })
          document.getElementById('msg_modal').innerHTML=data.msg;
          return false;
      }
    }
 
}
isConfirm =()=>
{
  confirmAlert({
    title: 'Confirm withdrawal',
    message: 'Are you sure you want to proceed the withdrawal?',
    buttons: [
        {
        label: 'Yes',
        onClick: () => this.confirmPayout() //this.postData(data,'payout')
        },
        {
        label: 'No',
        onClick: () => console.log("cancel")
        }
    ],
    closeOnEscape: false,
    closeOnClickOutside: false,
    });
}


checkType=(e)=>{
       if(e.target.checked===true && e.target.id==='B')
       {
         this.setState({
            type:'B'
         })
       }
       if(e.target.checked===true && e.target.id==='P')
       {
         this.setState({
            type:'P'
         })
       }
}


  render(){
    const {bal,result}=this.state;
     let lastPayout=0;let itemtype='';
     let recentActivity;let isActivity=false;
     if(result)
     {
         for (let i = 0; i < result.length; i++) 
         {
             if(i===0)
                { 
                    
                    itemtype=result[i].type;
                    if(itemtype==='P')
                       lastPayout= result[i].INR_USD;
                    else
                       lastPayout = result[i].amount;
                    isActivity=true;
                     break;
                }
             
         }
         recentActivity=result && result.map((item, i) => {
            return (    
              <p>
                Payout to your bank account of
                {
                  item.type==='B' ?  <span> <FontAwesomeIcon icon={faRupeeSign} /> {item.amount} </span> 
                  :  <span> <i class="fas fa-dollar-sign"></i> {item.INR_USD} </span> 
                }
                on {<Moment date= {item.tranDate}  format="DD-MM-YYYY"/> }              
              </p>
            )
      
          })
      

     }
 
  return (
    <>
       <ProfileHeader />
      
      
      <div className="wallet-sec">
          <div className="container">
              <div className="row">
                  <div className="col-md-5">
                      <div className="left-part">
                          <div className="balance-part">
                            
                              <div className="amount-box">
                                <div className="amount">
                                  <p>Balance</p> 
                                  <h3><FontAwesomeIcon icon={faRupeeSign} />{bal}</h3>                               
                                
                                {/* <button className="btun" onClick={this.doPayout} style={{cursor:'pointer'}}>Withdrawal</button> */}
                              
                                </div>
                                <div className="amount">
                                  <p>Withdrawable Balance</p> 
                                  <h3><FontAwesomeIcon icon={faRupeeSign} />{this.state.withDrawableBalance}</h3>                               
                                
                                <button className="btun" onClick={this.doPayout} style={{cursor:'pointer'}}>Withdrawal</button>
                              
                                </div>
                                
                              </div>
                              
                             
                              {/* <p>Learn how to <a href="#">earn more</a></p> */}
                              <p><a href="#" id="msg"></a></p>
                              
                                 {
                                    itemtype==='B' ?  
                                    <p>Your last payout to your bank account was for  <span> <FontAwesomeIcon icon={faRupeeSign} /> {lastPayout}</span>  </p>
                                    :  itemtype==='P' ?  
                                   
                                     <p>Your last payout to your bank account was for    <span> <i class="fas fa-dollar-sign"></i> {lastPayout} </span>  </p>
                                     :
                                     null
                                  }
                              
                              {/* <p>Your total earnings to date are  <span><FontAwesomeIcon icon={faRupeeSign} /> 0.00</span></p> */}
                          </div>
                      </div>
                  </div>
                  <div className="col-md-7">
                        {/* <div className="right-first-part">
                            <p>Earn more by <a href="#">inviting your friends</a> to join expy.bio</p>
                        </div> */}
                        <div className="right-last-part">
                            <p className="lab">Recent Activity</p>
                            <div className="activity-area">
                                {/* dynamic activity */}                                
                                {
                                    isActivity ? 
                                        recentActivity 
                                    : <p>You have no recent transaction activity</p>                                
                                }
                                {/* <p>You are credited <span><FontAwesomeIcon icon={faRupeeSign} /> 150.00</span> from <span>xxxxx xxx</span> at 29-07-2021</p>
                                <p>Payout to your bank account <span><FontAwesomeIcon icon={faRupeeSign} /> 9500.00</span> at 28-07-2021</p> */}
                            </div>
                        </div>
                  </div>
              </div>
          </div>
      </div>

      <Modal
        show={this.state.show}
        // onHide={this.ModalClose}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"

      >
        <Modal.Header>
          <Modal.Title>
             <p className="addnew-title">Payout </p>
          </Modal.Title>
        </Modal.Header>
         <Modal.Body>
           <div className="withdrow-pop">
            

             <div className="form-group">
               <label>Select Payout Type</label> <br/>              
               <input type="radio" name="type" id="B" onChange={this.checkType} checked={this.state.type==='B'? true:false} style={{cursor:'pointer'}}/> To Bank
               {/* <input type="radio" name="type" id="P" onChange={this.checkType} checked={this.state.type==='P'? true:false}  style={{marginLeft:'15px',cursor:'pointer'}}/> To PayPal */}
             </div> 
             <div className="form-group">
               <label>Enter Amount</label>
               <input type="number" min="0" name="amount" title="" value={this.state.amount} className="form-control" placeholder="Enter Amount" onChange={(e)=>this.setState({[e.target.name]:e.target.value})}/>
             </div>             
             <div className="btun-box">
                 {
                     this.state.withdrawBtn===true ?
                     <button className="btun" onClick={this.withdrawal} id="btn_withdraw" style={{cursor:'pointer'}}>   Withdraw</button>
                    :null
                 }
            
               {/* <i class="fas fa-spinner fa-spin"></i> */}
               
                  {
                  this.state.cancelBtn===true?
                  <button className="btun" onClick={this.ModalClose} style={{cursor:'pointer'}}>Cancel</button>
                  :null
                  }
            
            </div>
           
           </div>
           
        </Modal.Body>
        <Modal.Footer>
             <p id="msg_modal" style={{color:'red'}}></p>
        </Modal.Footer>

      </Modal>

    <FooterClass/>
    </>
  )
}
}
export default Payout
