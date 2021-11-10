import React from 'react';

import config from './config'
import API  from '../services/API';
class Checkout extends React.Component {
  typingPrice=0;
  state={
    paymentId:'',
    isloading:false,
    disabled:false,
    msgColor:'',
    base_url: process.env.REACT_APP_API_URL,
    root_url: process.env.REACT_APP_ROOT_URL,
    cashfreePayUrl: config.paths[config.enviornment].cashfreePayUrl,
    appId: config.appIdSecretKey[config.enviornment].appId,
    secretKey: config.appIdSecretKey[config.enviornment].secretKey,
  }


   

  constructor() {
    super()
    this.openCheckout = this.openCheckout.bind(this);
  }
  componentDidMount()
  {
    //console.log(this.props.session_date);
   // console.log(this.props.session_timeing);
   // console.log(this.props.state)
   // console.log(this.props.userDetails)    
   // console.log(config.paths[config.enviornment].cashfreePayUrl)
  }
 
  async CapturePayment(razorpay_payment_id,responseData)
  {
            // this.setState({
            //   isloading:true
            // });
      try {
            const paymentId = razorpay_payment_id;         
            const payUrl = process.env.REACT_APP_API_URL+'admin/videoSession';
            var flagData = {
              DA_ID:this.props.state.DA_ID,
              BM_Instruction:this.props.state.video_instruction,
              BM_Name:this.props.state.video_name,
              BM_Email:this.props.state.video_email,
              BM_Phone:this.props.state.video_phone,
              BM_Password:'xxxxxxxx',
              BM_Purchase_Amt:this.props.DA_Price > 0 ? this.props.DA_Price : this.typingPrice,
              paymentId:paymentId,
              amount:this.props.DA_Price,
              Consent:0,
              JM_Name:this.props.userDetails.JM_Name,
              DA_Title:this.props.state.DA_Title,
              LM_ID:this.props.state.LM_ID,
              JM_Email:this.props.userDetails.JM_Email,
              JM_Phone:this.props.userDetails.JM_Phone,
              mailText:this.props.state.mailText,
              session_date:this.props.session_date,
              session_timeing:this.props.session_timeing,
              ES_ID:this.props.ES_ID,
              userDetails:this.props.userDetails,
              JM_User_Profile_Url:this.props.userDetails.JM_User_Profile_Url,
              responseData:responseData,
            };
            
            let token=API.encryptData(paymentId);
            const flag=API.encryptData(flagData);
            let  JSONdata = {
                flag : flag
              };


            document.getElementById('btn_payout').innerHTML='Processing...';
            document.getElementById('btn_payout').disabled=true;
            const response= await fetch(payUrl,{
                method: 'post',
                headers: { "Content-Type": "application/json","token":token },
                body: JSON.stringify(JSONdata)
            });
            const data=await response.json();
            if(data.status === 1)
            {              
              document.getElementById('request').innerHTML='';
              var p = document.createElement('p');
              p.innerHTML= API.paidMonitizationMsg();  
              p.style.color='green'
              document.getElementById('request').appendChild(p);
              this.WaitAndReload();
         
            }
            else
            {           
              // document.getElementById('request').innerHTML='';
              // var p = document.createElement('p');
              // p.innerHTML= API.paidMonitizationMsg();  
              // p.style.color='green'
              // document.getElementById('request').appendChild(p);
              // this.WaitAndReload();

               //do rest if payment done but data not captured
               this.setState({
                isloading:false,        
                message:'Internal error - Please contact Expy support',
                msgColor:"#ff5f70"
              }); 
              //do rest if payment done but data not captured
              const url = process.env.REACT_APP_API_URL+'admin/dataUncaptured';
              const response1= await fetch(url,{
                method: 'post',
                headers: { "Content-Type": "application/json" ,"token":token},
                body: JSON.stringify(JSONdata)
               });
               const resp=await response1.json();
       
            }
      } 
      catch (err) 
      {
       // console.log(err);
      }
  }
  //BM_Type
  async CapturePaymentDoner(razorpay_payment_id,responseData){
    this.setState({
      isloading:true
    });
  try {


    const paymentId = razorpay_payment_id;         
    const payUrl = process.env.REACT_APP_API_URL+'admin/addDoner';
    var JSONdata = {
      DA_ID:this.props.state.DA_ID,
      BM_Instruction:this.props.state.BM_Instruction,
      BM_Name:this.props.state.BM_Name,
      BM_Email:this.props.state.BM_Email,
      BM_Phone:this.props.state.BM_Phone,
      BM_Password:this.props.state.BM_Password,
      BM_Purchase_Amt:this.props.DA_Price,
      paymentId:paymentId,
      amount:this.props.DA_Price,
      DA_Title:this.props.state.DA_Title,
      JM_Name:this.props.state.JM_Name,
      JM_ID:this.props.JM_ID,
      LM_ID:this.props.state.LM_ID,
      JM_User_Profile_Url:this.props.userDetails.JM_User_Profile_Url,
      JM_Email:this.props.userDetails.JM_Email,
      JM_Phone:this.props.userDetails.JM_Phone,
      session_date:this.props.session_date,
      session_timeing:this.props.session_timeing,
      ES_ID:this.props.ES_ID,
      userDetails:this.props.userDetails,
      responseData:responseData
    };
    const response= await fetch(payUrl,{
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSONdata)
    });
    const data=await response.json();
    if(data.status === 1)
    {
     // console.log(data)
      this.setState({
        isloading:false,
        message:'Payment is Successfully captured ',
        msgColor:"#ff9272",
      });   

      this.WaitAndReload();
      
    }
    else
    {
    
      this.setState({
        isloading:false,
        //message:'Payment is Successfully captured ',
        message:'Failed to capture payment',
        msgColor:"#ff5f70"
      });
    
    }
  } 
  catch (err) 
  {
 // console.log(err);
  }
  }

  async openCheckout()
  {

    var isFree=false;
    this.setState({
      message:'',  msgColor:''
    })

    if(this.props.state.dateString.length===0)
    {
  
      this.setState({
        message:'* Select Date',
        msgColor:'red'
      })
        return false;
    }
    if(parseInt(this.props.state.slot_dropdown)===0)
    {

      this.setState({
        message:'* Select Slot',
        msgColor:'red'
      })
        return false;
    }


    if(this.props.state.video_name.length===0 && this.props.state.DA_DA_ID===5 )
    {

      this.setState({
        message:'* Enter name',
        msgColor:'red'
      })
        return false;
    }
    
    if(this.props.state.video_email.length === 0)
    {            
      this.setState({
        message:'* Enter valid email-id',  msgColor:'red'
      })
      return false
      
    } 
    if(API.isValidEmail(this.props.state.video_email)===false)
    {
      this.setState({
        message:'* Enter valid email-id',  msgColor:'red'
      })
      return false
    } 
    if(this.props.state.video_phone.length === 0 )
    {            
      this.setState({
        message:'* Enter phone number',  msgColor:'red'
      })
      return false
      
    } 
    if(this.props.state.video_phone.length !==10 )
    {            
      this.setState({
        message:'* Enter 10 digits phone number',  msgColor:'red'
      })
      return false
      
    } 

    if(this.props.DA_Allow_Cust_Pay === 1 && parseInt(this.props.productList.DA_Min_Amount)===0) //free
    {
      
      if(isNaN(parseInt(this.props.state.dynamic_price)) || parseInt(this.props.state.dynamic_price) === 0)
      {
        isFree=true;
      }

    }
    else if(this.props.DA_Allow_Cust_Pay === 1 && parseInt(this.props.productList.DA_Min_Amount) > 0) 
    {

      if((this.props.DA_Price > 0) && this.props.DA_Price < parseInt(this.props.productList.DA_Min_Amount))
      {
  
        this.setState({
          message:'*Minimum amount required is '+this.props.DA_INR_Doller + ' '+this.props.productList.DA_Min_Amount,
          msgColor:'red'
        })
          return false;
      }
      else if(this.props.DA_Price===0)
      {
        this.typingPrice= parseInt(this.props.productList.DA_Min_Amount) * 100;
      }

    }
    if(this.props.DA_Allow_Cust_Pay === 0 && parseInt(this.props.DA_Price)===0) //free
    {
      
      if(parseInt(this.props.state.dynamic_price) === 0)
      {
        isFree=true;
      }

    }
    if(isFree===true)
    {
      this.freeCapture();
      return false;
    }
    else
    {

        var DA_Price=0;    
          DA_Price=this.props.DA_Price > 0 ? this.props.DA_Price * 100 : this.typingPrice; 
          var leadPrice=parseFloat(DA_Price/100);
            this.props.AddLeadsVideo(leadPrice);

             
              const API_url = process.env.REACT_APP_API_URL+'admin/order';  
                var flagData = {
                  amount:DA_Price,
                  currency:this.props.DA_INR_Doller,                
                  Product_Id:this.props.state.DA_ID,
                  Name:this.props.name,
                  Email:this.props.email,
                  DA_Price:this.props.DA_Price,  

                };   
              
                const flag=API.encryptData(flagData);
                let  JSONdata = {
                    flag: flag
                  };
          

                const response=await fetch(API_url,{
                      method: 'post',
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(JSONdata)
                    });
                    
                    
                  const data1=await response.json();              
                  const data=API.decryptJson(data1.flag)

                    let options = {
                      "key": process.env.REACT_APP_RAZOR_PAY_TEST_KEY,
                      "amount":DA_Price, // 2000 paise = INR 20, amount in paisa
                      "name": "Expy",
                      "description": "Purchase Description",
                      "image": "/favicon.png",
                      "order_id": data.id,
                      "method": 'wallet',
                      "wallet": 'paypal',
                      "handler":  response => 
                      {        
                        //console.log(response.razorpay_payment_id);
                        if(this.props.BM_Type==='D')
                          this.CapturePaymentDoner(response.razorpay_payment_id,response);
                        else
                          this.CapturePayment(response.razorpay_payment_id,response);
                      },
                      "prefill": {
                        "name": this.props.name,
                        "email": this.props.email,
                        "contact":this.props.phone
                      },
                      "notes": {
                        "address": ""
                      },
                      "theme": {
                        "color": "#fa217c"
                      }
                    };

                    let rzp = new window.Razorpay(options);
                    rzp.open();
    }
  }

  WaitAndReload=()=>{
    setTimeout(function() {
      window.location.reload();
     }, 3000);    
     
  }

  async freeCapture(){

    try {
      const paymentId = API.randomString(10);        
      let payUrl="";

      payUrl = process.env.REACT_APP_API_URL+'admin/videoSessionFree';   

       var flagData = {
              DA_ID:this.props.state.DA_ID,
              BM_Instruction:this.props.state.video_instruction,
              BM_Name:this.props.state.video_name,
              BM_Email:this.props.state.video_email,
              BM_Phone:this.props.state.video_phone,
              BM_Password:'xxxxxxxx',
              BM_Purchase_Amt:this.props.DA_Price,
              paymentId:paymentId,
              amount:0,
              Consent:0,
              JM_Name:this.props.userDetails.JM_Name,
              DA_Title:this.props.state.DA_Title,
              LM_ID:this.props.state.LM_ID,
              JM_Email:this.props.userDetails.JM_Email,
              JM_Phone:this.props.userDetails.JM_Phone,
              mailText:this.props.state.mailText,
              session_date:this.props.session_date,
              session_timeing:this.props.session_timeing,
              ES_ID:this.props.ES_ID,
              userDetails:this.props.userDetails,
              JM_User_Profile_Url:this.props.userDetails.JM_User_Profile_Url,
            };

    
      const flag=API.encryptData(flagData);
      var JSONdata={
        flag:flag
      }


      document.getElementById('btn_payout').innerHTML='Processing...';
      document.getElementById('btn_payout').disabled=true;

      const token=API.encryptData(paymentId)
      const response= await fetch(payUrl,{
          method: 'post',
          headers: { "Content-Type": "application/json" ,"token":token},
          body: JSON.stringify(JSONdata)
      });
      const data=await response.json();
      if(data.status === 1)
      {

     
            document.getElementById('request').innerHTML='';
            var p = document.createElement('p');
            p.innerHTML= API.freeMonitizationMsg();  
            p.style.color='green'
            document.getElementById('request').appendChild(p);
            this.WaitAndReload();
       
      }
      else
      {           
        document.getElementById('request').innerHTML='';
        var p = document.createElement('p');
        p.innerHTML= API.freeMonitizationMsg();  
        p.style.color='green'
        document.getElementById('request').appendChild(p);
        this.WaitAndReload();
      }
} 
catch (err) 
{
  //console.log(err);
}

}
  render(){
  return (
    <>
      <div>
        {/*<input type='text' onChange={
           this.changeAmount
          } />*/}
        {/* <button onClick={this.openCheckout}>Pay Rs. {this.state.amount/100}</button>  */}
                     <button onClick={this.openCheckout} class="btun" id="btn_payout" disabled={this.state.disabled}> 
                                                {
                                                     this.props.DA_Allow_Cust_Pay===0 && this.props.DA_Price > 0?

                                                            this.props.DA_INR_Doller==='INR' ?
                                                                  "Pay Rs." + this.props.DA_Price
                                                            :
                                                                  "Pay $" + this.props.DA_Price
                                                      :
                                                      "Get"

                                                  }

                                                  {/* {
                                                    this.state.isloading?
                                                      <i class="fa fa-spinner fa-spin" style={{marginLeft: '20px',fontSize: '31px',float: 'right'}}></i>
                                                    :
                                                      null
                                                  } */}
                                                 
                                                  </button>
                                                  <span id="msg" style={{color:this.state.msgColor,fontSize:'15px'}}>{this.state.message}</span>
                               {/* <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                                <span class="sr-only">Loading...</span>
                              </div> */}
                                              
      </div>
    </>
  );
}

}

export default Checkout;