import React, { Component } from 'react';
import API from '../services/API';

class Tipping extends Component {
    state={
        paymentId:'',
        isloading:false,
        disabled:false,
        msgColor:'',
        base_url: process.env.REACT_APP_API_URL,
        root_url: process.env.REACT_APP_ROOT_URL,
      }
      constructor() {
        super()
    
        this.openCheckout = this.openCheckout.bind(this);
      }
      componentDidMount()
      {
        //this.setState(this.props.state);
       // console.log(this.props.state)
       // console.log(this.props.userDetails)
     
      // console.log(API.userAgentType());
       if(API.userAgentType()===false)
       {
         //alert('web browser ' + navigator.userAgent)
       }
       else
       {
       // alert('web view ' + navigator.userAgent)


       }

      }
     
     async CapturePayment(razorpay_payment_id,responseData){
              this.setState({
                isloading:true
              });
        try {
    
    
              const paymentId = razorpay_payment_id;         
              const payUrl = process.env.REACT_APP_API_URL+'admin/captureTipping';
              var JSONdata = {
                DA_ID:this.props.state.DA_ID,
                BM_Instruction:this.props.state.message,
                BM_Name:'Donator',
                BM_Email:'Donator@gmail.com',
                BM_Phone:'70000000000',
                BM_Password:'123456',
                BM_Purchase_Amt:this.props.DA_Price,
                paymentId:paymentId,
                amount:this.props.DA_Price,
                Consent:0,
                JM_Name:this.props.userDetails.JM_Name,
                DA_Title:'Support Me',
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
                  message:'Payment is Successfully captured '+ data.url,
                  msgColor:"#ff9272",
                });
                
                window.location.reload();
              }
              else{
               
                this.setState({
                  isloading:false,               
                  message:'Internal error - Please contact Expy support',
                  msgColor:"#ff5f70"
                });

                 //do rest if payment done but data not captured
                  const token=API.encryptData(paymentId)
                  const url = process.env.REACT_APP_API_URL+'admin/dataUncaptured';
                  const response1= await fetch(url,{
                    method: 'post',
                    headers: { "Content-Type": "application/json" ,"token":token},
                    body: JSON.stringify(JSONdata)
                    });
                    const resp=await response1.json();
                return false;
              }
        } 
        catch (err) 
        {
         // console.log(err);
        }
    }
    WaitAndReload=()=>
    {
      setTimeout(function() {
        window.location.reload();
       }, 5000);  
    }
    //BM_Type
    async CapturePaymentDoner(razorpay_payment_id,responseData){
      this.setState({
        isloading:true
      });
    try {
    
    
      const paymentId = razorpay_payment_id;         
      const payUrl = process.env.REACT_APP_API_URL+'admin/addDoner';
      var flagData = {
        DA_ID:this.props.state.DA_ID,
        BM_Instruction:this.props.state.DonarMsg,
        BM_Name:this.props.state.DonarName,
        BM_Email:this.props.state.DonarEmail,
        BM_Phone:this.props.state.DonarPhone,
        BM_Password:'*******',
        BM_Purchase_Amt:this.props.state.DonarAmt,
        paymentId:paymentId,
        amount:this.props.DA_Price,
        DA_Title:this.props.DA_Title,
        JM_Name:this.props.userDetails.JM_Name,
        JM_ID:this.props.userDetails.JM_ID,
        JM_User_Profile_Url:this.props.userDetails.JM_User_Profile_Url,
        JM_Email:this.props.userDetails.JM_Email,
        JM_Phone:this.props.userDetails.JM_Phone,
        LM_ID:this.props.state.LM_ID,   
        responseData:responseData
      };


      const flag=API.encryptData(flagData);
      var JSONdata={
        flag:flag
      }

      
      document.getElementById('btn_payment').innerHTML='Processing...';
      document.getElementById('btn_payment').disabled=true;
      const response= await fetch(payUrl,{
          method: 'post',
          headers: { "Content-Type": "application/json" },
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
       
          
        // this.setState({
        //   isloading:false,        
        //   message:'Internal error - Please contact Expy support',
        //   msgColor:"#ff5f70"
        // });

        document.getElementById('request').innerHTML='';
        var p = document.createElement('p');
        p.innerHTML= "Internal error - Please contact Expy support";  
        p.style.color='red'
        document.getElementById('request').appendChild(p);

        //do rest if payment done but data not captured
        const token=API.encryptData(paymentId)
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
    
      async openCheckout()
      {

        document.getElementById("msg_tipping").innerHTML='';
        document.getElementById("msg_tipping").style.color='red';
        if(this.props.DA_Price===0)
        {
          document.getElementById("msg_tipping").innerHTML='* Enter tipping amount';
          return false;
        }
       
   
     
        if(this.props.state.DonarName.length===0)
        {
            document.getElementById("msg_tipping").innerHTML='* Enter name';         
            return false;
        }
        
        if(this.props.state.DonarEmail.length===0)
        {        
          document.getElementById("msg_tipping").innerHTML='* Enter email-id';
          return false;
        }
        if(this.props.state.DonarEmail.length > 50)
        {        
          document.getElementById("msg_tipping").innerHTML='* Enter email-id within 50 characters';
          return false;
        }


        if(this.props.state.DonarEmail.length > 0)
        {            
          if(API.isValidEmail(this.props.state.DonarEmail)===false)
          {           
            document.getElementById("msg_tipping").innerHTML='* Enter valid email-id';
             return false
          }    
        } 


        if(this.props.state.DonarPhone.length === 0 )
        {           
      
          document.getElementById("msg_tipping").innerHTML='* Enter phone number';
          return false
          
        } 
        if(this.props.state.DonarPhone.length !==10 )
        {           
    
          document.getElementById("msg_tipping").innerHTML='* Enter 10 digits phone number';
          return false
          
        } 

        this.props.AddLeads();
        this.setState({
          isloading:true,
          disabled:true
        });
    
        var DA_Price=0;    
        DA_Price=this.props.DA_Price * 100; 
        const API_url = process.env.REACT_APP_API_URL+'admin/order';  
          var flagData = {
            amount:DA_Price,
            Product_Id:this.props.state.DA_ID,
            Name:this.props.state.DonarName,
            Email:'NA',
            DA_Price:this.props.DA_Price,
            currency:this.props.DA_INR_Doller,
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
              const data=API.decryptJson(data1.flag);


              let options={};
             // var isWebView=API.userAgentType();
              var isWebView=false;
              if(isWebView===false)
              {
                 options = {
                  "key": process.env.REACT_APP_RAZOR_PAY_TEST_KEY,
                  "amount":DA_Price, // 2000 paise = INR 20, amount in paisa
                  "name": "Expy",
                  "description": "Donation",
                  "image"   : "/favicon.png",
                  "order_id": data.id,
                  "method": 'wallet',
                  "wallet": 'paypal',
                  "handler" :  response => 
                  {        
                    //console.log(response.razorpay_payment_id);           
                      this.CapturePaymentDoner(response.razorpay_payment_id,response);
                  
                  },
                  "prefill": {
                    "name": this.props.state.DonarName,
                    "email": this.props.state.DonarEmail,
                    "contact":this.props.state.DonarPhone,
                  },
                  "notes": {
                    "address": ""
                  },
                  "theme": {
                    "color": "#fa217c"
                  },
             
                };    
        
              }
              else //webview
              {

                  // dummy details
                  const paymentId = '';         
                  const payUrl_Dum = process.env.REACT_APP_API_URL+'admin/addDoner_Dum';
                  var flagData_Dum = {
                    ord_id:data.id,
                    DA_ID:this.props.state.DA_ID,
                    BM_Instruction:this.props.state.DonarMsg,
                    BM_Name:this.props.state.DonarName,
                    BM_Email:this.props.state.DonarEmail,
                    BM_Phone:this.props.state.DonarPhone,
                    BM_Password:'*******',
                    BM_Purchase_Amt:this.props.state.DonarAmt,
                    paymentId:paymentId,
                    amount:this.props.DA_Price,
                    DA_Title:this.props.DA_Title,
                    JM_Name:this.props.userDetails.JM_Name,
                    JM_ID:this.props.userDetails.JM_ID,
                    JM_User_Profile_Url:this.props.userDetails.JM_User_Profile_Url,
                    JM_Email:this.props.userDetails.JM_Email,
                    JM_Phone:this.props.userDetails.JM_Phone,
                    LM_ID:this.props.state.LM_ID,   
                    responseData:[]
                  };
            
            
                  const flag_dum=API.encryptData(flagData_Dum);
                   var JSONdata_Dum={
                    flag:flag_dum
                  }          
                  
      
                  const response_Dum= await fetch(payUrl_Dum,{
                      method: 'post',
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(JSONdata_Dum)
                  });
                  const data_Dum=await response_Dum.json();


                    options = {
                      "key": process.env.REACT_APP_RAZOR_PAY_TEST_KEY,
                      "amount":DA_Price, // 2000 paise = INR 20, amount in paisa
                      "name": "Expy",
                      "description": "Donation",
                      "image"   : "/favicon.png",
                      "order_id": data.id,
                      "method": 'wallet',
                      "wallet": 'paypal',
                      callback_url: process.env.REACT_APP_API_URL+'admin/success',
                      redirect: true,
                      "handler" :  response => 
                      {        
                        //console.log(response.razorpay_payment_id);           
                         // this.CapturePaymentDoner(response.razorpay_payment_id,response);
                      
                      },
                      "prefill": {
                        "name": this.props.state.DonarName,
                        "email": this.props.state.DonarEmail,
                        "contact":this.props.state.DonarPhone,
                      },
                      "notes": {
                        "address": ""
                      },
                      "theme": {
                        "color": "#fa217c"
                      },
                      
                
                    };   
       
              }
    

        let rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response){
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);

          //callback
          // callback_url: process.env.REACT_APP_API_URL+'admin/callback_url',
           //redirect: true
        });
        rzp.open();
      }
   

    render() {
        return (
          <>
            <button className="btun btun_1 setCursor"  id="btn_payment" disabled={this.props.DA_Price > 0 ?false:true} onClick={this.openCheckout} >Pay</button>
           <p id="msg_tipping"></p>
            </>
        );
    }
}

Tipping.propTypes = {

};

export default Tipping;