import React, { Component } from 'react';
import FooterClass from '../header_footer/FooterClass';
import ProfileHeader from '../header_footer/ProfileHeader_MS2_B1';
import ProfileNav from './ProfileNav';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal'
import * as queryString from 'query-string';
import { Helmet } from "react-helmet";
import { confirmAlert } from 'react-confirm-alert'; // Import
import API from '../services/API'

class NotificationRequest extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            allRequest:[],
            newRequest:0, 
            openModel:false,
            base_url: process.env.REACT_APP_API_URL,
            root_url: process.env.REACT_APP_ROOT_URL,
          
            show:false,
            open:false,
            JM_ID:this.props.JM_ID,   
            BM_Email:'',
            BM_ID:'',
            data:[],
            selectedFile:null,
            showSubmitBtn:false,
            fileName:'',
            openModelLiveVideo:false,
            showLiveVideo:false,
            session_date:API.GetCurDate(),
            session_time:'',
            session_time_end:'',
            Asc:0
        }
      

    }
 
    async  Get_AllRequests()
        {
            var id = parseInt(localStorage.getItem('JM_ID'));  
            var JSONdata = {
              JM_ID: id
            };   
            const API_url = process.env.REACT_APP_API_URL+ "admin/GetAllRequest";
            const response=await fetch(API_url,{
                  method: 'post',
                  headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
                  body: JSON.stringify(JSONdata)
                });
            const data1=await response.json();
            if(data1.status===1)
            {

                const data=API.decryptJson(data1.flag);
                let items=data.allRequest;
               let allRequest= items.sort(function (a, b) {
                    return b.BM_ID - a.BM_ID;
                 });
     
             
              // //console.log(allRequest)
              this.setState({
                allRequest:allRequest,    
               });
              // //console.log(data.allRequest)
               if(data.newRequest!==null && data.newRequest.length > 0)
                this.setState({
                    newRequest:data.newRequest[0].pendingRequest,    
                });
                if(data.userDetails.length > 0)
                {
                    this.setState({
                        JM_Name:data.userDetails[0].JM_Name,    
                        JM_User_Profile_Url:data.userDetails[0].JM_User_Profile_Url, 

                    });
                }

            }
            else
            {
              this.setState({newRequest:0})       
            }
               //////console.log(data)
        }
    componentDidMount() {
     
        this.Get_AllRequests();
         
        $(document).ready(function () 
        {
                
            //   $('#tbl_pending').DataTable();           
            //   $('#tbl_accepted').DataTable();
            //   $('#tbl_completed').DataTable();
            //   $('#tbl_declined').DataTable(); 
            //   $('.odd').hide();
            //   let tableId="myTable";
             
         });

         //$('#uncontrolled-tab-example-tab-Pending').click();
     }

     createJqueryTable=(tableId)=>
     {
        var isDataTable = $.fn.DataTable.isDataTable('#' + tableId);
        //////console.log('isDataTable: ' + isDataTable); 
      var  table = $('#' + tableId).DataTable({ 
         destroy : true,
        "order": [[ 3, "asec" ]], // for ordering desc
        'iDisplayLength': 100
      
        });
     }
     updateRequestStat=(BM_ID,data)=>e=>
     {
        ////console.log(data);        
        const API_url = process.env.REACT_APP_API_URL + "admin/updateRequestStat";        
        var Status=e.target.value;

        var id=e.target.id;
        if(Status==='D')
        {
            this.isConfirm_Dec(Status,data,id)
        }
        else if(Status==='A')
        {
            var JSONdata = {};
            var id = parseInt(localStorage.getItem('JM_ID'));
            var JSONdata = {        
              BM_ID: BM_ID,
              JM_ID:id,
              Status:Status,
              data:data
    
            };
        
            fetch(API_url,
              {
                method: 'post',
                headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
                body: JSON.stringify(JSONdata)
              })
              .then((response) => response.json())
              .then(data => {
                if (data.status > 0) 
                {
                  
                    let items=data.allRequest;
                   let allRequest= items.sort(function (a, b) {
                        return b.BM_ID - a.BM_ID;
                     });
                  this.setState({
                    allRequest:allRequest,
                    selectedFile:null
                    //newRequest:data.newRequest[0].pendingRequest,                
                  });
                 // var req=data.newRequest[0].pendingRequest;
    
                 if(Status==='C')
                        window.location.href='/notify?type=Completed';
                    else if(Status==='A')
                        window.location.href='/notify?type=Accepted';
                    else if(Status==='D')
                        window.location.href='/notify?type=Declined';
                    else if(Status==='B')
                        window.location.href='/notify?type=Booked';
                    else if(Status==='P')
                        window.location.href='/notify?type=Pending';
    
                }
              });
    
        }
     


     }

    

     closeCompleteModal=e=>{
        this.setState({openModel:false,show:false});    
        window.location.reload();
       
      }
      closeLiveVideoModal=e=>{
        this.setState({openModelLiveVideo:false,showLiveVideo:false});    
        window.location.reload();
       
      }
        openCompleteModal=(data)=>e=>{
          var type=e.target.value;
          //console.log(data);
          if(type==='C')
          {
            if(data.DA_DA_ID===1)
            {
                this.setState({openModel:true,show:true,data});
            }
           else 
            {
                this.setState({openModelLiveVideo:true,showLiveVideo:true,data});
            }
          }              
          else if(type==='D')
                this.doDeclined(data);
         
      }
      //26-jul-2021
      openCompleteVideoModal=(data)=>e=>{
        var type=e.target.value;        
        var id=e.target.id;   
        this.isConfirm(type,data,id)
       
    }
    isConfirm = (type,data,id) => {
         
           if(type==='C')
           {
        
            confirmAlert({
            title: 'Confirm Change',
            message: 'Are you sure you want to complete the request?',
            buttons: [
                {
                label: 'Yes',
                onClick: () => this.DoCompleteRequest(data,id)
                },
                {
                label: 'No',
                onClick: () => document.getElementById(id).value='A'
                }
            ],
            closeOnEscape: false,
            closeOnClickOutside: false,
            });
          }
          else if(type==='D')
          {
            confirmAlert({
                title: 'Confirm Decline',
                message: 'Are you sure you want to decline the request?',
                buttons: [
                    {
                    label: 'Yes',
                    onClick: () => this.doDeclined(data)
                    },
                    {
                    label: 'No',
                    onClick: () => document.getElementById(id).value='A'
                    }
                ],
                closeOnEscape: false,
                closeOnClickOutside: false,
                });
          }
      };
      isConfirm_Dec = (type,data,id) => {
         
       if(type==='D')
       {
         confirmAlert({
             title: 'Confirm Decline',
             message: 'Are you sure you want to decline the request?',
             buttons: [
                 {
                 label: 'Yes',
                 onClick: () => this.doDeclined(data)
                 },
                 {
                 label: 'No',
                 onClick: () => document.getElementById(id).value='P'
                 }
             ],
             closeOnEscape: false,
             closeOnClickOutside: false,
             });
       }
   };
      DoCompleteRequest=async(data,id)=>{
              //////console.log(data)
            // /video_rq_complete
           

            var flagData={
                data:data
              }
              const flag=API.encryptData(flagData);
      
              var JSONdata={
               flag:flag
              }

            const response=await API.postData(JSONdata,"video_rq_complete");          
            if (response.status === 1) 
            {    
                alert('Request is Completed');
                window.location.reload();
            }
            else if(response.status === 2) 
            {    
                alert('Unable to complete request before completion date');
                document.getElementById(id).value='A'
            }
            else
                alert('internal error');
           
      }    

     doDeclined=(data)=>{
       
        // var JSONdata = {
        //     BM_ID: data.BM_ID,
        //     paymentId:data.Payment_ID,
        //     data:data
        // };
        var flagData={
            BM_ID: data.BM_ID,
            paymentId:data.Payment_ID,
            data:data
          }
          const flag=API.encryptData(flagData);
  
          var JSONdata={
           flag:flag
          }

        if(isNaN(parseInt(data.isFree))===false && parseInt(data.isFree)===1)
        {
                const API_url = this.state.base_url + "admin/declinedFree";
                fetch(API_url,
                {
                    method: 'post',
                    headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
                    body: JSON.stringify(JSONdata)
                })
                .then((response) => response.json())
                .then(data => {
                    if (data.status === 1) 
                    {    
                        alert('Request is Declined');
                        window.location.reload();
                    }
                    else
                    alert('internal error');
                });
        }

       else if(data.isFree===0)
        {
                const API_url = this.state.base_url + "admin/refund";

        fetch(API_url,
          {
            method: 'post',
            headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
            body: JSON.stringify(JSONdata)
          })
          .then((response) => response.json())
          .then(data => {
            if (data.status === 1) 
            {    
               alert('Request is Declined');
                window.location.reload();
            }
            else
              alert('internal error');
          });
        }

     }

      fileOnChange=(e)=>{
        this.setState({ audioData: '' }); 
         const file = e.target.files[0];
         if(typeof file!=='undefined')
         {
            const name = e.target.files[0].name;
            const lastDot = name.lastIndexOf('.');        
            const fileName = name.substring(0, lastDot);
            const ext = name.substring(lastDot + 1);
            var fileType='';
            if(ext==='mp4')           
                fileType='vdo'
            else if(ext==='mp3')           
              fileType='ado'
            else if(ext==='mov')           
              fileType='mov'
           else         
              fileType='img'

           this.setState({
              selectedFile: file,
              fileUrl: URL.createObjectURL(file),
              fileType                    
           });
           this.uploadFile(file);
     
         }
         else
         {
             //////console.log("file is undefined")
         }
     }
     uploadFile=(file)=>{
        document.getElementById('msg').innerHTML='Uploading .....';
        const formData = new FormData();                     
        let Api_url=this.state.base_url+'admin/uploadFile';
        formData.append('sampleFile', file)
        formData.append('JM_User_Profile_Url_plus_JM_ID',this.state.data.JM_User_Profile_Url+"_"+this.state.data.JM_ID) 
       
            fetch(Api_url, {
            method: 'POST',    
            headers: { "authorization": API.getAuth(),"id":API.getId()},     
            body: formData
            })
            .then(response => response.json())
            .then(data1 => 
            {          //////console.log(data);     
                if(data1.status===1)       
                {                       
                    
                    const data=API.decryptJson(data1.flag);

                    this.setState({
                        fileName:data.fileName,
                        showSubmitBtn:true,
                        isPreview:true
                    })
                    document.getElementById("msg").style.color='green';
                    document.getElementById('msg').innerHTML='Uploaded now you can submit it';
                    document.getElementById('upfile').style.display='none';
                }
                else
                {
                    this.setState({
                        fileName:'',
                        showSubmitBtn:false,
                        isPreview:false
                    })
                    document.getElementById("msg").style.color='red';
                    document.getElementById('msg').innerHTML='Internal error, try later';
                }
            })
            .catch(error => {
                    ////console.error(error)
                    this.setState({
                        fileName:'',
                        showSubmitBtn:false,
                        isPreview:false
                    })
                    document.getElementById("msg").style.color='red';
                    document.getElementById('msg').innerHTML='Internal error, try later';
            })
     }

     submitFile=event=>{

            event.preventDefault();    
            if(this.state.selectedFile!==null || typeof this.state.selectedFile==='undefined')      
            {
                const formData = new FormData(); 
           
                let Api_url=this.state.base_url+'admin/completeRequest';


                // formData.append('fileName', this.state.fileName)
                // formData.append('ProfileName',this.state.data.JM_User_Profile_Url+"_"+this.state.data.JM_ID) 
                // formData.append('BM_Email', this.state.data.BM_Email) 
                // formData.append('BM_ID', this.state.data.BM_ID)  
                
                // formData.append('BM_Name', this.state.data.BM_Name)  
                // formData.append('BM_Purchase_Date', this.state.data.BM_Purchase_Date)  
                // formData.append('JM_Name', this.state.JM_Name)  
                // formData.append('JM_User_Profile_Url', this.state.JM_User_Profile_Url)  
                // formData.append('DA_Title', this.state.data.DA_Title)  
                // formData.append('BM_Purchase_Amt', this.state.data.BM_Purchase_Amt)  
                // formData.append('BM_Phone', this.state.data.BM_Phone)  

                var flagData={
                    fileName:this.state.fileName,
                    ProfileName:this.state.data.JM_User_Profile_Url+"_"+this.state.data.JM_ID,
                    BM_Email:this.state.data.BM_Email,
                    BM_ID:this.state.data.BM_ID,
                    BM_Name:this.state.data.BM_Name,
                    BM_Purchase_Date:this.state.data.BM_Purchase_Date,
                    JM_Name:this.state.JM_Name,
                    JM_User_Profile_Url:this.state.JM_User_Profile_Url,
                    DA_Title: this.state.data.DA_Title,
                    BM_Purchase_Amt: this.state.data.BM_Purchase_Amt,
                    Actual_Price: this.state.data.Actual_Price,
                    BM_Phone:this.state.data.BM_Phone
                }

                const flag=API.encryptData(flagData);
                let  JSONdata = {
                    flag: flag
                  };

                this.setState({                   
                    showSubmitBtn:false,
                })
                document.getElementById('msg').innerHTML='Processing...please wait';

                    fetch(Api_url, {
                    method: 'POST',         
                    headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
                    body: JSON.stringify(JSONdata)
                    })
                    .then(response => response.json())
                    .then(data => 
                    {          //////console.log(data);     
                        if(data.status===1)       
                        {                      
                            
                            document.getElementById("msg").style.color='green';
                            document.getElementById("msg").innerHTML='Request has been completed';


                           //this.closeCompleteModal();  
                           this.showMessage();
                     
                        }
                        else
                        {
                            this.setState({
                                fileName:'',
                                showSubmitBtn:true,
                            })
                            document.getElementById("msg").style.color='red';
                             document.getElementById('msg').innerHTML='Server error, Try later';
                        }
    
                    })
                    .catch(error => {

                        this.setState({
                            fileName:'',
                            showSubmitBtn:true,
                        })
                        document.getElementById("msg").style.color='red';
                         document.getElementById('msg').innerHTML='Server error, Try later';
                         ////console.error(error)
                    })
            }
            else
            {
                document.getElementById("msg").innerHTML='Select File';
                return false;
            }

     }
     showMessage=()=>{
        setTimeout(function() {      
            window.location.reload();
         }, 3000);    
         
      }
      requestTab=()=>{
         // alert("hii");
      }

      sortTable=(tableName,n)=>e=> 
      {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById(tableName);
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc"; 
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
          //start by saying: no switching is done:
          switching = false;
          rows = table.rows;
          /*Loop through all table rows (except the
          first, which contains table headers):*/
          for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir === "asc") 
            {
                if(tableName!=='tbl_purchased')
                {
                    
                
                    if(n!==7 && n!==3)
                    {
                            

                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch= true;
                            break;
                        }
                    }
                    if(n===7)
                    {
                        var xValue=x.getAttribute("data-value");
                        var yValue=y.getAttribute("data-value");
                        var dt1=new Date(xValue)
                        var dt2=new Date(yValue)
                        if (dt1 > dt2 ) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if(n===3)
                    {
                        var xValue=parseFloat(x.innerHTML)
                        var yValue=parseFloat(y.innerHTML)
                    
                        if (xValue > yValue ) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                else
                {

                    if(n===3 || n===6)
                    {
                        var xValue=parseFloat(x.innerHTML)
                        var yValue=parseFloat(y.innerHTML)
                    
                        if (xValue > yValue ) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    else if(n===5)
                    {
                        var xValue=x.getAttribute("data-value");
                        var yValue=y.getAttribute("data-value");
                        var dt1=new Date(xValue)
                        var dt2=new Date(yValue)
                        if (dt1 > dt2 ) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    else
                    {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch= true;
                            break;
                        }
                    }

                }
            } 
            else if (dir === "desc")
            {
                if(tableName!=='tbl_purchased')
                {
                    if(n!==7 && n!==3)
                    {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if(n===7)
                    {
                        var xValue=x.getAttribute("data-value");
                        var yValue=y.getAttribute("data-value");
                        var dt1=new Date(xValue)
                        var dt2=new Date(yValue)
                        if (dt1 < dt2 ) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if(n===3)
                    {
                        var xValue=parseFloat(x.innerHTML)
                        var yValue=parseFloat(y.innerHTML)
                    
                        if (xValue < yValue ) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                else
                {

                    if(n===3 || n===6)
                    {
                        var xValue=parseFloat(x.innerHTML)
                        var yValue=parseFloat(y.innerHTML)
                    
                        if (xValue < yValue ) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    else if(n===5)
                    {
                        var xValue=x.getAttribute("data-value");
                        var yValue=y.getAttribute("data-value");
                        var dt1=new Date(xValue)
                        var dt2=new Date(yValue)
                        if (dt1 < dt2 ) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    else
                    {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch= true;
                            break;
                        }
                    }

                }
            }
          }
          if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;      
          } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount === 0 && dir === "asc") {
              dir = "desc";
              switching = true;
            }
          }
        }
      }

      onSort=(sortKey)=>e=>{
        /*
        assuming your data is something like
        [
          {accountname:'foo', negotiatedcontractvalue:'bar'},
          {accountname:'monkey', negotiatedcontractvalue:'spank'},
          {accountname:'chicken', negotiatedcontractvalue:'dance'},
        ]
        */
     
        
        let allRequest = this.state.allRequest;
       if(this.state.Asc===0)
       {

        allRequest.sort((a,b) => a.sortKey - b.sortKey)
        this.setState({allRequest,Asc:1})
       }
       if(this.state.Asc===1)
       {
        allRequest.sort((a,b) => b.sortKey - b.sortKey)
        this.setState({allRequest,Asc:0})
      
       }
     

      
      }
    
  
      myFunction=(tableName,id)=>e=>{
          //////console.log(tableName + " "+ id)
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById(id);
        filter = input.value.toUpperCase();
        table = document.getElementById(tableName);
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }

      //07-jul-2021
      submitLiveVideo=async (e)=>{
        document.getElementById('msg_live_session').innerHTML=''
          if(this.state.session_date==='')
          {
            document.getElementById('msg_live_session').innerHTML='Select date';
              return false;
          }
          if(this.state.session_time==='')
          {
             document.getElementById('msg_live_session').innerHTML='Select start time';
              return false;
          }
          if(this.state.session_time_end==='')
          {
            document.getElementById('msg_live_session').innerHTML='Select end time';
              return false;
          }
        
          var session_time=API.ConvertTimeTo12(this.state.session_time);
          var session_time_end=API.ConvertTimeTo12(this.state.session_time_end);

          var JSONdata={
            fileName:this.state.fileName,
            ProfileName:this.state.data.JM_User_Profile_Url+"_"+this.state.data.JM_ID,
            BM_Email:this.state.data.BM_Email,
            BM_ID:this.state.data.BM_ID,
            BM_Name: this.state.data.BM_Name,
            BM_Purchase_Date: this.state.data.BM_Purchase_Date,
            JM_Name: this.state.JM_Name,
            JM_User_Profile_Url:this.state.JM_User_Profile_Url,
            DA_Title: this.state.data.DA_Title,
            BM_Purchase_Amt: this.state.data.BM_Purchase_Amt,
            BM_Phone: this.state.data.BM_Phone,
            session_date:this.state.session_date,
            session_time:session_time,
            session_time_end:session_time_end
          }
          //////console.log(JSONdata)
          var data=await API.postData(JSONdata,'setMeeting');
         if(data.status===1)
         {
            document.getElementById("msg_live_session").innerHTML=data.msg;
            this.setState({
                session_date:API.GetCurDate(),
                session_time:'',
                session_time_end:''

            })
            API.WaitForSecond(3000);
            window.location.reload();
         }
         else
         {
            document.getElementById("msg_live_session").innerHTML=data.msg;
            return false;
         }
      }
      changeDate=(e)=>{
          var date=e.target.value;
        this.setState({
            [e.target.name]:e.target.value
        }) 
      }
    render() {

        const urlParams = queryString.parse(window.location.search);
        const type = urlParams.type;

        var allRequest=this.state.allRequest;
        let pendingTable=allRequest && allRequest.map((item,i)=>{
            return (      
                        item.Status==='P' && item.DA_DA_ID!==3 ?        
                        <tr>
                            <td>{item.BM_Name}</td>
                            { 
                                item.Consent > 0 ?     
                                 <td>{item.BM_Email}</td> 
                                :     
                                 <td></td>                            
                            }
                            <td>{item.DA_Title}</td>
                            <td>{item.DA_INR_Doller==='INR'? '' : item.DA_INR_Doller==='USD'? '$' : ''}
                            {/* {item.BM_Purchase_Amt} */}
                             {item.Actual_Price} 

                            </td>
                            <td>{item.BM_Instruction}</td>    
                            <td>{item.Status}</td>
                            <td>
                                 <select id={"ddl_stat_"+item.BM_ID} onChange={this.updateRequestStat(item.BM_ID,item)}>
                                   
                                    {/* <option value="C" selected={item.Status==='C'}>Complete</option> */}
                                    <option value="P" selected={item.Status==='P'}>Pending</option>
                                    <option value="A" selected={item.Status==='A'}>Accept</option>
                                    <option value="D" selected={item.Status==='D'}>Decline</option>
                                </select>
                            </td>
                            <td data-value={item.actualPurchaseDate}>
                                   {/* <Moment date= {item.BM_Purchase_Date}/> */}
                                      {item.BM_Purchase_Date}
                                      { " "+item.BM_Purchase_Time}
                            </td>

                            <td>
                            {item.BM_Purchase_Amt}
                                
                            </td>
                        </tr>   
                      :
                      null
                  
            )

        });
        let acceptedTable=allRequest && allRequest.map((item,i)=>{
            return (
                    item.Status==='A' ?                          
                        <tr>                                  
                            <td>{item.BM_Name}</td>
                             { 
                                item.Consent > 0 ?     
                                 <td>{item.BM_Email}</td> 
                                :     
                                 <td></td>
                            
                            }

                            <td>{item.DA_Title}</td>
                            <td>{item.DA_INR_Doller==='INR'? '' : item.DA_INR_Doller==='USD'? '$' : ''}
                            {/* {item.BM_Purchase_Amt} */}
                                {item.Actual_Price} 
                            </td>
                            <td>{item.BM_Instruction}</td>    
                            <td>{item.Status}</td>
                            <td>
                                 <select id={"ddl_accept_"+item.BM_ID} onChange={this.openCompleteModal(allRequest[i])}>
                                    <option value="A" selected={item.Status==='A'}>Accept</option>
                                    <option value="C" selected={item.Status==='C'}>Complete</option>                         
                                    <option value="D" selected={item.Status==='D'}>Decline</option>
                                </select>
                            </td>
                            <td data-value={item.actualPurchaseDate}>
                               {item.BM_Purchase_Date}
                               { " "+item.BM_Purchase_Time}
                            </td>
                            <td>
                            {item.BM_Purchase_Amt}
                                
                            </td>
                        </tr>   
                    :
                    null
            )
        });

        let bookedTable=allRequest && allRequest.map((item,i)=>{
            return (
                    item.Status==='B' && item.DA_DA_ID===5?                          
                        <tr>                                  
                            <td>{item.BM_Name}</td>
                             {                                  
                                 <td>{item.BM_Email}</td>   
                             }

                            <td>{item.DA_Title}</td>
                            <td>{item.DA_INR_Doller==='INR'? '' : item.DA_INR_Doller==='USD'? '$' : ''}
                            {/* {item.BM_Purchase_Amt} */}
                            {item.Actual_Price} 
                            
                            </td>
                            <td>{item.BM_Instruction}</td>    
                            <td>{item.Status}</td>
                            <td>
                                 <select id={"ddl_accept_"+item.BM_ID} disabled onChange={this.openCompleteVideoModal(allRequest[i])}>
                                    <option value="A" selected={item.Status==='A'}>Booked</option>
                                    
                                    {/* <option value="C" selected={item.Status==='C'}>Complete</option>                            
                                    <option value="D" selected={item.Status==='D'}>Decline</option> */}
                                </select>
                            </td>
                            <td data-value={item.actualPurchaseDate}>
                                      {item.BM_Purchase_Date}
                                      { " "+item.BM_Purchase_Time}
                            </td>
                            <td>
                            {item.BM_Purchase_Amt}
                            </td>
                        </tr>   
                    :
                    null
            )
        });

        let completedTable=allRequest && allRequest.map((item,i)=>{
            return (
                    item.Status==='C' && item.DA_DA_ID !==2 &&  item.DA_DA_ID !==3 && item.DA_DA_ID !==0 && item.DA_DA_ID !==999  &&  item.DA_DA_ID !==6 ?                          
                        <tr>
                            <td>{item.BM_Name}</td>
                            { 
                                item.Consent > 0 ?     
                                 <td>{item.BM_Email}</td> 
                                :     
                                 <td></td>
                            
                            }
                            <td>{item.DA_Title}</td>
                            <td>{item.DA_INR_Doller==='INR'? '' : item.DA_INR_Doller==='USD'? '$' : ''}
                            {/* {item.BM_Purchase_Amt} */}
                            {item.Actual_Price} 
                            </td>
                            <td>{item.BM_Instruction}</td>    
                            {/* <td>{item.Status}</td> */}
                            <td>
                                {        
                         
                                    item.BM_Content_Sent!=='NA'  &&  item.BM_Content_Sent.includes('uploads/Profile/') ?
                                    <a className="btnCropSave"   href={item.BM_Content_Sent} download target="_blank">Download</a>
                                    :
                                    <a className="" style={{fontWeight:'600'}}  href={process.env.REACT_APP_API_URL+'meet?id='+item.BM_Content_Sent}  target="_blank"><strong></strong></a>

                                }

                             
                                {/* <Link to={item.BM_Content_Sent} target="_blank" download={"uploaded"}>Download</Link> */}
                                
                                </td>
                            <td>
                                 <select id={"ddl_stat_"+item.BM_ID} disabled onChange={this.updateRequestStat(item.BM_ID)}>
                                    <option value="A" selected={item.Status==='A'}>Accept</option>
                                    <option value="C" selected={item.Status==='C'}>Complete</option>
                                    <option value="P" selected={item.Status==='P'}>Pending</option>
                                    <option value="D" selected={item.Status==='D'}>Decline</option>
                                </select>
                            </td>
                            <td data-value={item.actualPurchaseDate}>
                            {item.BM_Purchase_Date}
                            { " "+item.BM_Purchase_Time}
                            </td>
                            <td>
                             {item.BM_Purchase_Amt}
                            </td>
                        </tr>   
                   
                    :
                    null
            )

        });
        let declinedTable=allRequest && allRequest.map((item,i)=>{
            return (
                    item.Status==='D' ?                          
                        <tr>
                            <td>{item.BM_Name}</td>
                            { 
                                 <td>{item.BM_Email}</td> 
                            }
                            <td>{item.DA_Title}</td>
                            <td>
                                {/* {item.BM_Purchase_Amt} */}
                                {item.Actual_Price} 
                            </td>
                            <td>{item.BM_Instruction}</td>    
                            <td>{item.Status}</td>
                            <td>
                                 <select id={"ddl_stat_"+item.BM_ID} disabled onChange={this.updateRequestStat(item.BM_ID)}>
                                    {/* <option value="A" selected={item.Status==='A'}>Accept</option>
                                    <option value="C" selected={item.Status==='C'}>Complete</option>
                                    <option value="P" selected={item.Status==='P'}>Pending</option> */}
                                    <option value="D" selected={item.Status==='D'}>Decline</option>
                                </select>
                            </td>
                            <td data-value={item.actualPurchaseDate}>
                            {item.BM_Purchase_Date}
                            { " "+item.BM_Purchase_Time}
                            </td>
                        </tr>   
                   
                    :
                    null
            )

        });
        //14-jun
        let purchasedTable=allRequest && allRequest.map((item,i)=>{ 
            return (
                    ( (item.Status==='C' || (item.DA_DA_ID===3 && item.Status==='P')) && (item.DA_DA_ID===2  || item.DA_DA_ID===3 || item.DA_DA_ID===0 || item.DA_DA_ID===999 || item.DA_DA_ID===6  ) )?                          
                        <tr>
                            <td>{item.BM_Name}</td>
                            { 
                                item.Consent === 0 ?     
                                 <td>{item.BM_Email}</td> 
                                :     
                                 <td></td>
                            
                            }
                            <td>{item.DA_Title}</td>
                            <td>
                                
                                {/* {item.BM_Purchase_Amt} */}
                                {item.Actual_Price} 
                            
                            
                            </td>
                            <td>{item.BM_Instruction}</td>   
                         
                            <td data-value={item.actualPurchaseDate}>
                            {item.BM_Purchase_Date}
                            { " "+item.BM_Purchase_Time}
                            </td>
                            <td>
                            {item.BM_Purchase_Amt}
                            </td>
                        </tr>   
                   
                    :
                    null
            )

        });

        let dummyTable=allRequest && allRequest.map((item,i)=>{
            return (
                    item.Status==='C' ?                          
                        <tr>
                            <td>{item.BM_Name}</td>
                            { 
                                item.Consent > 0 ?     
                                 <td>{item.BM_Email}</td> 
                                :     
                                 <td></td>
                            
                            }                           
                        </tr>   
                   
                    :
                    null
            )

        });
        return (
            <>
              <Helmet>
                    <title>Notification & Requests | Expy </title>
                    <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta>
                </Helmet>
            
                <ProfileHeader/>
                <div className="profile-tab">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12 text-center">
                        <ProfileNav/>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="notification-sec">
                        <div className="container">
                              <div className="row">
                                     <div className="col-md-12">
                                        <div className="table-box">
                                            <div className="heading">
                                                <h3>Transactions & Requests</h3>
                                            </div>


                                            <Tabs defaultActiveKey={type} id="uncontrolled-tab-example">
                                                <Tab eventKey="Pending" title="Pending" id="Pending_tab">
                                                    <div  className="table-responsive" >
                                                    <input type="text" style={{margin: '10px'}} id="inp_pending" onKeyUp={this.myFunction('tbl_pending','inp_pending')} placeholder="Search for names.." title="Type in a name"/>
                                                        <table  id="tbl_pending" className="table table-bordered">    
                                                             <thead>
                                                                  <tr>                                                          
                                                                    <th style={{width:'30%'}} onClick={this.sortTable('tbl_pending',0)}>Name</th>
                                                                    <th style={{width:'20%'}} onClick={this.sortTable('tbl_pending',1)}>Email ID</th>
                                                                    <th style={{width:'20%'}} onClick={this.sortTable('tbl_pending',2)}>Service</th>                                                           
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_pending',3)}>Price(₹)</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_pending',4)}>Message</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_pending',5)}>Status</th>                                                                       
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_pending',6)}>Action</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_pending',7)}>Date & Time</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_pending',8)}>Amount Earned</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody> 
                                                             {pendingTable}
                                                            </tbody>
                                                        
                                                        </table>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="Accepted" title="Accepted">
                                                     <div  className="table-responsive" >
                                                     <input type="text" style={{margin: '10px'}} id="inp_accepted" onKeyUp={this.myFunction('tbl_accepted','inp_accepted')} placeholder="Search for names.." title="Type in a name"/>
                                                         <table  striped bordered hover  id="tbl_accepted" className="table table-bordered">  
                                                            <thead>
                                                                <tr>                                                          
                                                                    <th style={{width:'30%'}} onClick={this.sortTable('tbl_accepted',0)}>Name</th>
                                                                    <th style={{width:'20%'}} onClick={this.sortTable('tbl_accepted',1)}>Email ID</th>
                                                                    <th style={{width:'20%'}} onClick={this.sortTable('tbl_accepted',2)}>Service</th>                                                           
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_accepted',3)}>Price(₹)</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_accepted',4)}>Message</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_accepted',5)}>Status</th>                                                                       
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_accepted',6)}>Action</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_accepted',7)}>Date & Time</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_accepted',8)}>Amount Earned</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody> 
                                                             {acceptedTable}
                                                            </tbody>
                                                        
                                                        </table>
                                                        </div>
                                                </Tab>
                                                <Tab eventKey="Completed" title="Completed" onClick={this.requestTab}>
                                                     <div  className="table-responsive" >
                                                            <input type="text" style={{margin: '10px'}} id="inp_completed" onKeyUp={this.myFunction('tbl_completed','inp_completed')} placeholder="Search for names.." title="Type in a name"/>
                                                            <table id="tbl_completed" className="table table-bordered">    
                                                                 <thead>             
                                                                        <tr>
                                                                                <th style={{width:'30%'}} onClick={this.sortTable('tbl_completed',0)}>Name</th>
                                                                                <th style={{width:'20%'}} onClick={this.sortTable('tbl_completed',1)}>Email ID</th>
                                                                                <th style={{width:'20%'}} onClick={this.sortTable('tbl_completed',2)}>Service</th>                                                           
                                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_completed',3)}>Price(₹)</th>
                                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_completed',4)}>Message</th>
                                                                                {/* <th style={{width:'50%'}} onClick={this.sortTable('tbl_completed',5)}>Status</th> */}
                                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_completed',5)}>File</th>
                                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_completed',6)}>Action</th>
                                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_completed',7)}>Date & Time</th>
                                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_completed',7)}>Amount Earned</th>
                                                                        </tr>
                                                                </thead>       
                                                                <tbody>
                                                                   {completedTable}
                                                                </tbody>                                                            
                                                            </table>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="Declined" title="Declined">
                                                 <div className="table-responsive" >
                                                    <input type="text" style={{margin: '10px'}} id="inp_declined" onKeyUp={this.myFunction('tbl_declined','inp_declined')} placeholder="Search for names.." title="Type in a name"/>
                                                    <table  id="tbl_declined" className="table table-bordered">  
                                                         <thead>
                                                            <tr>                                                          
                                                                <th style={{width:'30%'}} onClick={this.sortTable('tbl_declined',0)}>Name</th>
                                                                <th style={{width:'20%'}} onClick={this.sortTable('tbl_declined',1)}>Email ID</th>
                                                                <th style={{width:'20%'}} onClick={this.sortTable('tbl_declined',2)}>Service</th>                                                           
                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_declined',3)}>Price(₹)</th>
                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_declined',4)}>Message</th>
                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_declined',5)}>Status</th>                                                                       
                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_declined',6)}>Action</th>
                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_declined',7)}>Date & Time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody> 
                                                         {declinedTable}
                                                        </tbody>
                                                    
                                                    </table>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="Purchased" title="Purchased">
                                                     <div className="table-responsive" >
                                                    <input type="text" style={{margin: '10px'}} id="inp_purchased" onKeyUp={this.myFunction('tbl_purchased','inp_purchased')} placeholder="Search for names.." title="Type in a name"/>
                                                    <table  id="tbl_purchased" className="table table-bordered">  
                                                         <thead>
                                                            <tr>                                                          
                                                                <th style={{width:'30%'}} onClick={this.sortTable('tbl_purchased',0)}>Name</th>
                                                                <th style={{width:'20%'}} onClick={this.sortTable('tbl_purchased',1)}>Email ID</th>
                                                                <th style={{width:'20%'}} onClick={this.sortTable('tbl_purchased',2)}>Service</th>                                                           
                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_purchased',3)}>Price(₹)</th>
                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_purchased',4)}>Message</th>                       
                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_purchased',5)}>Date & Time</th>
                                                                <th style={{width:'50%'}} onClick={this.sortTable('tbl_purchased',6)}>Amount Earned</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody> 
                                                         {purchasedTable}
                                                        </tbody>
                                                    
                                                    </table>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="Booked" title="Call Booked">
                                                     <div  className="table-responsive" >
                                                     <input type="text" style={{margin: '10px'}} id="inp_Booked" onKeyUp={this.myFunction('tbl_Booked','inp_Booked')} placeholder="Search for names.." title="Type in a name"/>
                                                         <table  striped bordered hover  id="tbl_Booked" className="table table-bordered">  
                                                            <thead>
                                                                <tr>                                                          
                                                                    <th style={{width:'30%'}} onClick={this.sortTable('tbl_Booked',0)}>Name</th>
                                                                    <th style={{width:'20%'}} onClick={this.sortTable('tbl_Booked',1)}>Email ID</th>
                                                                    <th style={{width:'20%'}} onClick={this.sortTable('tbl_Booked',2)}>Service</th>                                                           
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_Booked',3)}>Price(₹)</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_Booked',4)}>Message</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_Booked',5)}>Status</th>                                                                       
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_Booked',6)}>Action</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_Booked',7)}>Date & Time</th>
                                                                    <th style={{width:'50%'}} onClick={this.sortTable('tbl_Booked',8)}>Amount Earned</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody> 
                                                             {bookedTable}
                                                            </tbody>
                                                        
                                                        </table>
                                                        </div>
                                                </Tab>

                                            </Tabs>   
                                  




   {/* =================================== */}
                         
                        {/* -================= */}






                                         </div>
                                        
                                    </div>
                                </div>
                        </div>
                </div>
                <Modal
                        show={this.state.show}
                        onHide={this.closeCompleteModal}
                        backdrop="static"
                        keyboard={false}
                        centered

                    >
                        <Modal.Header closeButton>
                        <Modal.Title>
                            <p className="addnew-title">Upload Content as Per Request</p>
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form  onSubmit={this.doInsertLink}>
                        <div className="addnew-box">                
                            <div className="image-btun-box">
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="file" name="upfile" id="upfile" accept=".mp4,.mp3,.mov" onChange={this.fileOnChange}/>
                                    </div>
                                </div>
                                <div id="preview_req" className="requestPreview">
                                    {
                                        this.state.isPreview && this.state.fileType ==='img'?
                                           <img src={this.state.fileUrl} style={{width:'100%'}}/>
                                        :
                                        this.state.isPreview && (this.state.fileType ==='vdo' || this.state.fileType ==='mov')?
                                         <video src={this.state.fileUrl} style={{width:'100%'}} controls/>
                                        :
                                        this.state.isPreview && this.state.fileType ==='ado'?
                                        <audio src={this.state.fileUrl}/>
                                       :
                                        null

                                    }

                                </div>
                            </div>
                            <div className="btun-box" >
                                {
                                    this.state.showSubmitBtn ?
                                    <button className="btun btun_1" onClick={this.submitFile} id="btn_sbmit">Submit Request</button> 
                                    :
                                    null                            
                                }
                                <p id="msg" style={{color:'red'}}></p>                    
                            </div>
                  
                        </div>
                        </form>
                        </Modal.Body>

                    </Modal>
                      
                    <Modal
                        show={this.state.showLiveVideo}
                        onHide={this.closeLiveVideoModal}
                        backdrop="static"
                        keyboard={false}
                        centered

                    >
                        <Modal.Header closeButton>
                        <Modal.Title>
                            <p className="addnew-title">Set date time for live video session</p>
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        <div className="addnew-box">   
                                          {/* <DateTimePicker
                                        
                                             value={this.session_date}
                                             />              */}
                            <div className="image-btun-box">
                                <div className="row">
                                    <p>Date</p>
                                    <div className="col-md-4">
                                        <input type="date" name="session_date" value={this.state.session_date}      onChange={this.changeDate}/>
                                    </div>
                                    <br/>
                                    <p>Start-Time</p>
                                    <div className="col-md-4">
                                        <input type="time" name="session_time" value={this.state.session_time} onChange={this.changeDate}/>
                                    </div>
                                    <p>End-Time</p>
                                    <div className="col-md-4">
                                        <input type="time" name="session_time_end" value={this.state.session_time_end} onChange={this.changeDate}/>
                                    </div>
                                </div>                                
                            </div>
                            <div className="btun-box" >                                
                               <button className="btun btun_1" onClick={this.submitLiveVideo} id="btn_sbmit_video">Submit Request</button> 
                                <p id="msg" style={{color:'red'}}></p>                    
                            </div>
                                <p id="msg_live_session" style={{color:'red'}}></p>                    
                           
                  
                        </div>
                       
                        </Modal.Body>

                    </Modal>
                <FooterClass/>
            </>
        );
    }
}

NotificationRequest.propTypes = {

};

export default NotificationRequest;