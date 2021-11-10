import React from 'react';
import config from './config'
import API  from "../services/API";
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
    LM_ID:0,
    dynamic_price:0
  }


   

  constructor() {
    super()
    this.openCheckout = this.openCheckout.bind(this);
  }
  componentDidMount()
  {
    this.setState(this.props.productList);
    //console.log(this.props.state)
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
            const payUrl = process.env.REACT_APP_API_URL+'admin/capture';
            var flagData = {
              DA_ID:this.props.state.DA_ID,
              BM_Instruction:this.props.state.BM_Instruction,
              BM_Name:this.props.state.BM_Name,
              BM_Email:this.props.state.BM_Email,
              BM_Phone:this.props.state.BM_Phone,
              BM_Password:this.props.state.BM_Password,
              BM_Purchase_Amt:this.props.DA_Price > 0 ? this.props.DA_Price : this.typingPrice,
              paymentId:paymentId,
              amount:this.props.DA_Price,
              Consent:this.props.state.Consent,
              JM_Name:this.props.userDetails.JM_Name,
              DA_Title:this.props.state.DA_Title,
              LM_ID:this.props.state.LM_ID,
              JM_Email:this.props.userDetails.JM_Email,
              JM_Phone:this.props.userDetails.JM_Phone,
              responseData:responseData
            };

            const flag=API.encryptData(flagData);
            var JSONdata={
              flag:flag
            }
            document.getElementById('btn_payment').innerHTML='Processing...';
            document.getElementById('btn_payment').disabled=true;
            const token=API.encryptData(paymentId)
            const response= await fetch(payUrl,{
                method: 'post',
                headers: { "Content-Type": "application/json" ,"token":token},
                body: JSON.stringify(JSONdata)
            });
            const data1=await response.json();
            if(data1.status === 1)
            {

              const data=API.decryptJson(data1.flag);
             // console.log(resultData)

              if(data.DA_DA_ID===2)
              {

                document.getElementById('request').innerHTML='';
                var p = document.createElement('p');
                p.innerHTML= API.paidMonitizationMsg();  
                p.style.color='green'
                document.getElementById('request').appendChild(p); 
        
                if(data.url.endsWith('.mp4')===false)
                {
                    if(data.url.endsWith('.pdf') || data.url.endsWith('.docx'))
                    {
                      var iDiv = document.createElement('div');
                      iDiv.id = 'pdf_docx';
                      iDiv.className = 'icon';
                    
                      document.getElementById('request').appendChild(iDiv); 
                      var a = document.createElement('a');
                      a.href = data.url;
                      a.setAttribute('target', '_blank');
                      a.click();
                    }
                  else if(data.url.endsWith('.mp3') || data.url.endsWith('.ogv'))
                    {
                      var iDiv = document.createElement('div');
                      iDiv.id = 'content';
                      iDiv.className = 'icon';
                    
                      document.getElementById('request').appendChild(iDiv); 
                      var a = document.createElement('a');
                      a.href = data.url;
                      a.setAttribute('target', '_blank');
                      a.click();
                    }
                  else if(data.url.endsWith('.png') || data.url.endsWith('.jpg') || data.url.endsWith('.jpeg'))//image
                    {
                      var iDiv = document.createElement('div');
                      iDiv.id = 'image';
                      iDiv.className = 'icon';
                      var img = document.createElement('img');
                      img.src= data.url;   
                      iDiv.appendChild(img);
                      document.getElementById('request').appendChild(iDiv); 
                      var a = document.createElement('a');
                      a.href = data.url;
                      a.setAttribute('target', '_blank');
                      a.click();
                    }
                    
                }  
                else
                {
                  var iDiv = document.createElement('div');
                  iDiv.id = 'image';
                  iDiv.className = 'icon';
                  var video = document.createElement('video');
                  video.src= data.url;   
                  video.controls = true;
                  video.style.width='100%';
                  iDiv.appendChild(video);                  
              
                    document.getElementById('request').appendChild(iDiv);  
                
                    var a1 = document.createElement('a');
                    a1.href = data.url;
                    a1.setAttribute('target', '_blank');
                    a1.click();
                }            
              
              }
              else if(data.DA_DA_ID===3) // for e-comm selling
              {

                document.getElementById('request').innerHTML='';
                var p = document.createElement('p');
                p.style.color='green'
                p.innerHTML= API.paidMonitizationMsg();  

                document.getElementById('request').appendChild(p);
                var a1 = document.createElement('a');
                a1.href = data.url;
                a1.innerHTML = "Click here to download";
                a1.download = data.url;
                document.getElementById('request').appendChild(a1);  

                
              }
              else
              {

                document.getElementById('request').innerHTML='';
                var p = document.createElement('p');
                p.innerHTML= API.paidMonitizationMsg();  
                p.style.color='green'
                document.getElementById('request').appendChild(p);
                this.WaitAndReload();
        
              }              
          
            }
            else
            {           


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
        //console.log(err);
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
    var flagData = {
      DA_ID:this.props.state.DA_ID,
      BM_Instruction:this.props.state.BM_Instruction,
      BM_Name:this.props.state.BM_Name,
      BM_Email:this.props.state.BM_Email,
      BM_Phone:this.props.state.BM_Phone,
      BM_Password:"123456",
      BM_Purchase_Amt:this.props.DA_Price > 0 ? this.props.DA_Price : this.typingPrice,
      paymentId:paymentId,
      amount:this.props.DA_Price,
      DA_Title:this.props.state.DA_Title,
      JM_Name:this.props.state.JM_Name,
      JM_ID:this.props.JM_ID,
      LM_ID:this.props.state.LM_ID,
      JM_User_Profile_Url:this.props.userDetails.JM_User_Profile_Url,
      JM_Email:this.props.userDetails.JM_Email,
      JM_Phone:this.props.userDetails.JM_Phone,
      responseData:responseData,   
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
      p.innerHTML= "Congratulations, your gift has successfully reached "+this.props.state.JM_Name+". Thank you for your support!";
      //API.paidMonitizationMsg();  
      p.style.color='green'
      document.getElementById('request').appendChild(p);
     // document.getElementById('btn_payment').disabled=false;
      this.WaitAndReload();  
    }
    else
    {
    
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

    
    }
  } 
  catch (err) 
  {
  //console.log(err);
  }
  }

  async openCheckout()
  {
    var isFree=false;
    this.setState({
      message:'',  msgColor:''
    })
    if( this.props.state.DA_DA_ID===1 && this.props.state.BM_Instruction.length===0)
    {

      this.setState({
        message:'* Enter instructions',
        msgColor:'red'
      })
        return false;
    }
    if(this.props.state.BM_Instruction.length > 1000)
    {

      this.setState({
        message:'* Enter instructions within 1000 characters',
        msgColor:'red'
      })
        return false;
    }

    if(this.props.state.BM_Name.length===0)
    {

      this.setState({
        message:'* Enter name',
        msgColor:'red'
      })
        return false;
    }
    if(this.props.state.BM_Name.length > 100)
    {

      this.setState({
        message:'* Enter name wothin 100 characters',
        msgColor:'red'
      })
        return false;
    }
    if(this.props.state.BM_Email.length===0)
    {
      this.setState({
        message:'* Enter email-id',  msgColor:'red'
      })
      return false
    }
    if(this.props.state.BM_Email.length > 0)
    {            
      if(API.isValidEmail(this.props.state.BM_Email)===false)
      {
        this.setState({
          message:'* Enter valid email-id',  msgColor:'red'
        })
        return false
      }    
    } 
    if(this.props.state.BM_Email.length > 50 )
    {           
      this.setState({
        message:'*  Enter valid email-id within 50 characters',  msgColor:'red'
      })
      return false    
      
    } 

    if(this.props.state.BM_Phone.length === 0 )
    {           
  
      this.setState({
        message:'* Enter phone number',  msgColor:'red'
      })
      return false    
      
    } 
    if(this.props.state.BM_Phone.length !==10 )
    {           
      this.setState({
        message:'* Enter 10 digits phone number',  msgColor:'red'
      })
      return false    
      
    } 


    if(this.props.DA_Allow_Cust_Pay ===0  && this.props.DA_Price ===0)
    {
      isFree=true;
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
    
    
    //console.log(API.removeSpecialChar(this.props.state.BM_Instruction));

    if(isFree===true)
    {
      this.freeCapture();
      return false;
    }
    else
    {
      var DA_Price=0;    
      //DA_Price=this.props.DA_Price * 100; 
      DA_Price=this.props.DA_Price > 0 ? this.props.DA_Price * 100 : this.typingPrice; 

          var leadPrice=parseFloat(DA_Price/100);
            this.props.AddLeads(leadPrice);      
          
            const API_url = process.env.REACT_APP_API_URL+'admin/order';  
              var flagData = {
                amount:DA_Price,
                currency:this.props.DA_INR_Doller,
                Product_Id:this.props.state.DA_ID,
                Name:this.props.state.BM_Name,
                Email:this.props.state.BM_Email,
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
                  
                  // this.setState({
                  //   isloading:true,
                  //   disabled:true
                  // });

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
                rzp.on('payment.failed', function (response){
                  // alert(response.error.code);
                  console.log(response.error.description);
                  // alert(response.error.source);
                  // alert(response.error.step);
                  // alert(response.error.reason);
                  // alert(response.error.metadata.order_id);
                  // alert(response.error.metadata.payment_id);
                    

                  //updateTrackOrder
                });
                rzp.open();
    }
  }

  WaitAndReload=()=>
  {
    setTimeout(function() {
      window.location.reload();
     }, 5000);  
  }

  async freeCapture(){

          try {
            const paymentId = API.randomString(10);        
            let payUrl="";

            if(this.props.state.DA_DA_ID===0) //gift
                 payUrl = process.env.REACT_APP_API_URL+'admin/addDonerFree';      
            else 
                 payUrl = process.env.REACT_APP_API_URL+'admin/freeCapture';   

            var flagData = {
              DA_ID:this.props.state.DA_ID,
              BM_Instruction:this.props.state.BM_Instruction,
              BM_Name:this.props.state.BM_Name,
              BM_Email:this.props.state.BM_Email,
              BM_Phone:this.props.state.BM_Phone,
              BM_Password:this.props.state.BM_Password,
              BM_Purchase_Amt:this.props.DA_Price,
              paymentId:paymentId,
              amount:0,
              Consent:this.props.state.Consent,
              JM_Name:this.props.userDetails.JM_Name,
              DA_Title:this.props.state.DA_Title,
              LM_ID:this.props.state.LM_ID,
              JM_Email:this.props.userDetails.JM_Email,
              JM_Phone:this.props.userDetails.JM_Phone,
              JM_ID:this.props.userDetails.JM_ID,
              DA_DA_ID:this.props.state.DA_DA_ID,
            };

          
            const flag=API.encryptData(flagData);
            var JSONdata={
              flag:flag
            }

            document.getElementById('btn_payment').innerHTML='Processing...';
            document.getElementById('btn_payment').disabled=true;

            const token=API.encryptData(paymentId)
            const response= await fetch(payUrl,{
                method: 'post',
                headers: { "Content-Type": "application/json" ,"token":token},
                body: JSON.stringify(JSONdata)
            });


            const data1=await response.json();
            if(data1.status === 1)
            {

              const data=API.decryptJson(data1.flag);

              if(data.DA_DA_ID===2)
              {

             
                document.getElementById('request').innerHTML='';
                var p = document.createElement('p');
                p.innerHTML= API.freeMonitizationMsg();  
                p.style.color='green'
                document.getElementById('request').appendChild(p);
                //document.getElementsByClassName("back-btn").style.display = 'none';
                if(data.url.endsWith('.mp4')===false)
                {
                   
                    if(data.url.endsWith('.pdf') || data.url.endsWith('.docx'))
                    {
                      var iDiv = document.createElement('div');
                      iDiv.id = 'pdf_docx';
                      iDiv.className = 'icon';
                    
                      document.getElementById('request').appendChild(iDiv); 
                      var a = document.createElement('a');
                      a.href = data.url;
                      a.setAttribute('target', '_blank');
                      a.click();
                    }
                  else if(data.url.endsWith('.mp3') || data.url.endsWith('.ogv'))
                    {
                      var iDiv = document.createElement('div');
                      iDiv.id = 'content';
                      iDiv.className = 'icon';
                    
                      document.getElementById('request').appendChild(iDiv); 
                      var a = document.createElement('a');
                      a.href = data.url;
                      a.setAttribute('target', '_blank');
                      a.click();
                    }
                  else if(data.url.endsWith('.png') || data.url.endsWith('.jpg') || data.url.endsWith('.jpeg'))//image
                    {
                      var iDiv = document.createElement('div');
                      iDiv.id = 'image';
                      iDiv.className = 'icon';
                      var img = document.createElement('img');
                      img.src= data.url;   
                      iDiv.appendChild(img);
                      document.getElementById('request').appendChild(iDiv); 
                      var a = document.createElement('a');
                      a.href = data.url;
                      a.setAttribute('target', '_blank');
                      a.click();
                    }
                    
                }  
                else
                {
                  var iDiv = document.createElement('div');
                  iDiv.id = 'image';
                  iDiv.className = 'icon';
                  var video = document.createElement('video');
                  video.src= data.url;   
                  video.controls = true;
                  iDiv.appendChild(video);                  
              
                    document.getElementById('request').appendChild(iDiv);  
                
                    var a1 = document.createElement('a');
                    a1.href = data.url;
                    a1.setAttribute('target', '_blank');
                    a1.click();
                }            
              
              }
              else if(data.DA_DA_ID===3) // for e-comm selling
              {

   
                document.getElementById('request').innerHTML='';
                var p = document.createElement('p');
                p.style.color='green'
                p.innerHTML= API.freeMonitizationMsg();  

                document.getElementById('request').appendChild(p);
                var a1 = document.createElement('a');
                a1.href = data.url;
                a1.innerHTML = "Click here to download";
                a1.download = data.url;
                document.getElementById('request').appendChild(a1);  
              }
              else if(data.DA_DA_ID===0)
              {
                document.getElementById('request').innerHTML='';
                var p = document.createElement('p');
                p.innerHTML= API.freeMonitizationMsg();  
                p.style.color='green'
                document.getElementById('request').appendChild(p);
                this.WaitAndReload();
              }
              else if(data.DA_DA_ID===5)
              {
                document.getElementById('request').innerHTML='';
                var p = document.createElement('p');
                p.innerHTML=API.freeMonitizationMsg();  
                p.style.color='green'
                document.getElementById('request').appendChild(p);
                this.WaitAndReload();
              }
              else if(data.DA_DA_ID===6)
              {
                    document.getElementById('request').innerHTML='';
                    var p = document.createElement('p');
                    p.innerHTML=API.freeMonitizationMsg();  
                    p.style.color='green'
                    document.getElementById('request').appendChild(p);
                    this.WaitAndReload();
              }
              else
              {

                    document.getElementById('request').innerHTML='';
                    var p = document.createElement('p');
                    p.innerHTML=API.freeMonitizationMsg();  
                    p.style.color='green'
                    document.getElementById('request').appendChild(p);
                    this.WaitAndReload();
              }              
          
            }
            else
            {           
                document.getElementById('request').innerHTML='';
                var p = document.createElement('p');
                p.innerHTML=API.freeMonitizationMsg();  
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
        
            <button onClick={this.openCheckout} class="btun" disabled={this.state.disabled} id="btn_payment"> 
            { 
             this.props.productList.DA_DA_ID===999?
             'Send Support' 
             : this.props.productList.DA_DA_ID===0?
              'Send' 
             : this.props.productList.DA_DA_ID===6? 
             'Join' 
             : this.props.productList.DA_DA_ID===5?
              'Book'               
              : 
              this.props.productList.DA_Price > 0 || ( this.props.productList.DA_Min_Amount > 0 &&  this.props.productList.DA_Allow_Cust_Pay===1) ?
              'Buy ':
              'Get'
             
             }
            



                                                  {
                                                     this.props.DA_Allow_Cust_Pay===0 && this.props.DA_Price > 0 ?

                                                            this.props.DA_INR_Doller==='INR' ?
                                                                  " Rs." + this.props.DA_Price
                                                            :
                                                                  " $" + this.props.DA_Price
                                                      :
                                                      null

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