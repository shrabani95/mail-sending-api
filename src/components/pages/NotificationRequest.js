import React, { Component } from 'react';

import FooterClass from '../header_footer/FooterClass';
import ProfileHeader from '../header_footer/ProfileHeader_MS2_B1';
import ProfileNav from './ProfileNav';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';
import Modal from 'react-bootstrap/Modal'
import * as queryString from 'query-string';
import { Helmet } from "react-helmet";
import { confirmAlert } from 'react-confirm-alert'; // Import
import API from '../services/API'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faSearch,
    faExclamationCircle,faChevronRight,faChevronLeft
  } from "@fortawesome/free-solid-svg-icons";
// import config from 'config.json'

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
            Asc:0,
            dataLoading:true,
            pendingRequest:0,
            ddl_request:'',
            searchByName:'',
            searchByProduct:'',
            showConfirmModal:false,
            requestData:[],
            ddl_id:'',
            showPopUp:''

        }
      

    }
 
    async  Get_AllRequests(type)
    {
    var id = parseInt(localStorage.getItem('JM_ID'));  

    var flagData={
    JM_ID: id,
    type:type
    }
    const flag=API.encryptData(flagData);      
    let JSONdata={
    flag:flag
    }

    const API_url = process.env.REACT_APP_API_URL+ "admin/GetAllRequest_by_status";
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

    this.setState({
    allRequest:allRequest,dataLoading:false ,ddl_request:type,
    pendingRequest:data.pendingRequest!==null && data.pendingRequest.length > 0 ? data.pendingRequest[0].pendingRequest : 0,    
    productList:data.productList
    });

    if(data.userDetails.length > 0)
    {
    this.setState({
    JM_Name:data.userDetails[0].JM_Name,    
    JM_User_Profile_Url:data.userDetails[0].JM_User_Profile_Url, 

    });
    }
    document.getElementById('ddl_request').value=type;
    // console.log(this.state.ddl_request)
    }            

    }
    componentDidMount() {   
        $(document).ready(function() {
            $('#right-button').on('click', function() {
            //   event.preventDefault();
                $('#content').animate({
                    scrollLeft: "+=700px"
                }, "slow");
            });
            $('#left-button').on('click', function() {
                //   event.preventDefault();
                $('#content').animate({
                    scrollLeft: "-=700px"
                  }, "slow");
            });

    });

          this.Get_AllRequests('S'); 
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



    //MS3 B2
    updateRequestStat=(BM_ID,data)=>e=>
    {     

         let Status=e.target.value;
         let ddl_id=e.target.id; 
         if(Status==='D' || Status==='A')
         {
             this.setState({
                 showConfirmModal:true,currentStatus:Status,requestData:data,ddl_id:ddl_id
             })
         }
         else
         {
            this.setState({
                showPopUp:'show-popup',currentStatus:Status,requestData:data,ddl_id:ddl_id
            })
         }
         
    }
    updateRequestStatAfterConfirm=(e)=>{
        const API_url = process.env.REACT_APP_API_URL + "admin/updateRequestStat"; 
        let Status=this.state.currentStatus;
        let data=this.state.requestData;
        let id=this.state.ddl_id;
        if(Status==='D')
        {

           // this.isConfirm_Dec(Status,data,id)
            this.doDeclined(data)
        }
        else if(Status==='A')
        {
                    let JSONdata = {};
                    id = parseInt(localStorage.getItem('JM_ID'));   
                    let flagData = {                           
                            BM_ID: data.BM_ID,
                            JM_ID:id,
                            Status:Status,
                            data:data
                      };
                  
                    const flag=API.encryptData(flagData);                  
                       JSONdata = {
                        flag: flag
                      };

                    fetch(API_url,
                    {
                    method: 'post',
                    headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
                    body: JSON.stringify(JSONdata)
                    })
                    .then((response) => response.json())
                    .then(data1 => {
                    if (data1.status > 0) 
                    {
                        this.setState({  dataLoading:true,    ddl_request:Status,
                            searchByName:'',  searchByProduct:'',showConfirmModal:false})
                            alert("Request is accepted");
                        this.Get_AllRequests(Status)
                    }
                });

        }
    }
    closeConfirmModal=(e)=>{
        document.getElementById(this.state.ddl_id).value=this.state.requestData.Status;
        this.setState({showConfirmModal:false,ddl_id:'',currentStatus:'',requestData:[]})
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

        const allowedExtension = ['mp3','mp4','mov'];			
        if(!allowedExtension.includes(ext))
        {
            document.getElementById("msg").style.color='red';
            document.getElementById('msg').innerHTML='File type must be mp4 or mp3';
            return false;
        }
     

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
        
    document.getElementById("upfile").disabled=true;
    document.getElementById("msg").style.color='#6107f7';
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
        document.getElementById('msg').innerHTML=data1.msg;
        //document.getElementById('upfile').style.display='none';
    }
    else
    {
        this.setState({
            fileName:'',
            showSubmitBtn:false,
            isPreview:false
        })
        document.getElementById("msg").style.color='red';
        document.getElementById('msg').innerHTML=data1.msg;
        document.getElementById("upfile").disabled=true;
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



    var flagData={
    fileName:this.state.fileName,
    ProfileName:this.state.requestData.JM_User_Profile_Url+"_"+this.state.requestData.JM_ID,
    BM_Email:this.state.requestData.BM_Email,
    BM_ID:this.state.requestData.BM_ID,
    BM_Name:this.state.requestData.BM_Name,
    BM_Purchase_Date:this.state.requestData.actualPurchaseDate,
    JM_Name:this.state.requestData.JM_Name,
    JM_User_Profile_Url:this.state.requestData.JM_User_Profile_Url,
    DA_Title: this.state.requestData.DA_Title,
    BM_Purchase_Amt: this.state.requestData.BM_Purchase_Amt,
    Actual_Price: this.state.requestData.Actual_Price,
    BM_Phone:this.state.requestData.BM_Phone
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


    myFunction=(tableName,id,colIndex=1)=>e=>{        
        this.closeSidePopUp();
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById(id);
        filter = input.value.toUpperCase();
        table = document.getElementById(tableName);
        tr = table.getElementsByTagName("tr");

        if(e.target.name==='searchByName')
         this.setState({searchByProduct:'',})
        else
            this.setState({searchByName:'',searchByProduct:e.target.value})

        for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[colIndex];
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

    //MS3 B1 -28 -oct-2021
    GetRequest=(e)=>{
        this.closeSidePopUp();
        let type=e.target.value;     
        this.setState({  dataLoading:true,    ddl_request:type,
            searchByName:'',  searchByProduct:''})
        this.Get_AllRequests(type)
    }
    openSidePopUp=(data)=>e=>{
        this.setState({
            showPopUp:'show-popup',requestData:data,showSubmitBtn:false
        })
        let msg=document.getElementById("msg");
        if(typeof msg!=='undefined' &&  msg!==null)
            document.getElementById("msg").innerHTML='';
    }
    closeSidePopUp=(e)=>{
        this.setState({
            showPopUp:'',currentStatus:'',requestData:[],ddl_id:''
        })
        
    }
   
    render() {

        const urlParams = queryString.parse(window.location.search);
        const type = urlParams.type;
        const {allRequest,productList}=this.state;     
        let dataTableAll=allRequest && allRequest.map((item,i)=>{
        return(
                <tr>

                    
                    <td>
                    {  item.DA_DA_ID===0 || item.DA_DA_ID===999 ?
                            <div className="td-service" onClick={this.openSidePopUp(item)}>
                                <img src={API.GetProductIcon(item.DA_DA_ID)} alt=""/> Donation & Gifts
                            </div>
                        :
                        item.DA_DA_ID===1?
                             <div className="td-service" onClick={this.openSidePopUp(item)}>
                                <img src={API.GetProductIcon(1)} alt=""/> Personalizes Video or Audio
                            </div>
                        :
                        item.DA_DA_ID===2?
                            <div className="td-service" onClick={this.openSidePopUp(item)}>
                                <img src={API.GetProductIcon(2)} alt=""/> Unlock Content
                            </div>
                        :
                        item.DA_DA_ID===3?
                            <div className="td-service" onClick={this.openSidePopUp(item)}>
                                <img src={API.GetProductIcon(3)} alt=""/> Sell Digital Goods
                            </div>
                        :
                        item.DA_DA_ID===5?
                            <div className="td-service" onClick={this.openSidePopUp(item)}>
                                <img src={API.GetProductIcon(5)} alt=""/> Live Video Session
                            </div>
                        :
                        item.DA_DA_ID===6?
                             <div className="td-service" onClick={this.openSidePopUp(item)}>
                                <img src={API.GetProductIcon(6)} alt=""/> Contests & Giveaways
                            </div>
                        :
                        null
                    }

                    </td>
                    <td data-value={item.actualPurchaseDate}>                         
                                {item.BM_Purchase_Date}
                                { " "+item.BM_Purchase_Time}
                        </td>
                        <td>{item.BM_Name}</td>
                        { 
                            item.Consent > 0 ?     
                            <td>{item.BM_Email}</td> 
                            :     
                            <td></td>                            
                        }
                
                    <td> {item.Actual_Price} </td>
                    {/* <td>{item.BM_Instruction}</td>   */}
                    <td> {item.BM_Purchase_Amt} </td>
                    <td>
                        
                                            
                            { 
                                item.Status==='P' && (this.state.ddl_request==='P' || this.state.ddl_request==='All') ?
                                <>                                 
                                    <div className="action pending">
                                        <select id={"ddl_stat_"+item.BM_ID} onChange={this.updateRequestStat(item.BM_ID,item)}>
                                            <option value="P" selected={item.Status==='P'}>Pending</option>                                                    
                                            <option value="A">Accept</option>
                                            <option value="D">Decline</option>
                                        </select> 
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                    </div>
                                </>
                                :
                                item.Status==='A' && (this.state.ddl_request==='A' || this.state.ddl_request==='All') ?
                                <>
                                
                                    <div className="action accepted">
                                        <select id={"ddl_stat_"+item.BM_ID} onChange={this.updateRequestStat(item.BM_ID,item)}>
                                            <option value="A" selected={item.Status==='A'}>Accept</option>
                                            <option value="C">Complete</option>
                                            <option value="D">Decline</option>
                                        </select> 
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                    </div>
                                </>
                                :
                                item.Status==='C'  && (this.state.ddl_request==='C' || this.state.ddl_request==='All')?
                                <>                               
                                
                                    <div className="action completed">
                                        <select id={"ddl_stat_"+item.BM_ID} onChange={this.updateRequestStat(item.BM_ID,item)}>
                                        <option value="C"  selected={item.Status==='C'} disabled>Completed</option>  
                                        </select> 
                                        {/* <FontAwesomeIcon icon={faExclamationCircle} /> */}
                                    </div>          
                                                    
                                </>
                                :
                                item.Status==='C' && (this.state.ddl_request==='S' || this.state.ddl_request==='All')?
                                <>                               
                                
                                    <div className="action completed">
                                        <select id={"ddl_stat_"+item.BM_ID} onChange={this.updateRequestStat(item.BM_ID,item)}>
                                        <option value="C"  selected={item.Status==='C'} disabled>Purchased</option>  
                                        </select> 
                                        {/* <FontAwesomeIcon icon={faExclamationCircle} /> */}
                                    </div>           
                                             
                                </>
                                :
                                item.Status==='B' && (this.state.ddl_request==='B' || this.state.ddl_request==='All')?
                                <>                               
                                    <div className="action accepted">
                                        <select id={"ddl_stat_"+item.BM_ID} onChange={this.updateRequestStat(item.BM_ID,item)}>
                                            <option value="B"   selected={item.Status==='B'}  disabled>Booked</option>  
                                        </select> 
                                        {/* <FontAwesomeIcon icon={faExclamationCircle} />    */}
                                    </div>                          
                                </>
                                :
                                item.Status==='D' && (this.state.ddl_request==='D'|| this.state.ddl_request==='All')?
                                <>                               
                                        <div className="action declined">
                                        <select id={"ddl_stat_"+item.BM_ID} onChange={this.updateRequestStat(item.BM_ID,item)}>
                                            <option value="D"   selected={item.Status==='D'}  disabled>Declined</option>  
                                        </select> 
                                        {/* <FontAwesomeIcon icon={faExclamationCircle} />  */}
                                    </div>                                
                                </>
                                :
                                <span></span>
                            }
                        
                    </td>
                </tr>
            )
        })

        let ddl_filter_product = productList && productList.map((item,i)=>{
            return (
               <option value={item.DA_Title}>{item.DA_Title}</option>           
            )
        })
        const sidePop=this.state.requestData;
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

               

                 {/* sudipta */}

                <div className="notification-sec">
                    <button className="right-scroll-btun" id="right-button"><FontAwesomeIcon icon={faChevronRight} /></button>
                    <button className="left-scroll-btun" id="left-button"><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 padd-0">
                                <div className="table-box">
                                    <div className="heading">
                                        <h3>Transactions & Requests</h3>
                                    </div>
                                    <div className="filter-part">
                                        <div className="row">
                                            <div className="col-lg-5 col-md-3">
                                                <select className="catagory" name="ddl_request" id="ddl_request" onChange={this.GetRequest}>
                                                    <option value="All">All</option>
                                                    <option value="P">Pending</option>
                                                    <option value="A">Accept</option>
                                                    <option value="C">Completed</option>
                                                    <option value="B">Booked</option>
                                                    <option value="S">Purchased</option>
                                                    <option value="D">Declined</option>
                                                </select>
                                                {
                                                    this.state.pendingRequest > 0 ?
                                                        <span className="totalpending">{this.state.pendingRequest}</span>
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div className="col-lg-7 col-md-9">
                                                <a href="/payout" className="wallet-btn">View Wallet</a>
                                                <div className="input-group">
                                                    <select className="service" id="inp_product"  name="searchByProduct" 
                                                      value={this.state.searchByProduct} onChange={this.myFunction('tbl_request','inp_product',0)}>
                                                      <option value="">--Select--</option>  
                                                      {ddl_filter_product}
                                                    </select>
                                                    <div className="input-group-prepend">
                                                    <div className="input-group-text"><FontAwesomeIcon icon={faSearch} /></div>
                                                    </div>
                                                        <input className="form-control" type="text" id="inp_search" name="searchByName"
                                                         onKeyUp={this.myFunction('tbl_request','inp_search',2)} 
                                                        value={this.state.searchByName}
                                                        onChange={(e)=> this.setState({[e.target.name]:e.target.value})}
                                                        placeholder="Search for names.." title="Type in a name"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive main-table " id="content">
                                        <table id="tbl_request">
                                            <thead>
                                                 <th style={{width:'20%'}}onClick={this.sortTable('tbl_all',0)}>Product/Service</th>     
                                                <th style={{width:'11%'}} onClick={this.sortTable('tbl_all',1)}>Date/Time</th>                                              
                                                <th style={{width:'16%'}} onClick={this.sortTable('tbl_all',2)}>Name</th>
                                                <th style={{width:'20%'}} onClick={this.sortTable('tbl_all',3)}>Email id</th>                                                                                   
                                                <th style={{width:'7%'}} onClick={this.sortTable('tbl_all',4)}>Price(₹)</th>
                                                {/* <th style={{width:'50%'}} onClick={this.sortTable('tbl_all',5)}>Message</th>                                                                */}
                                                <th style={{width:'15%'}} onClick={this.sortTable('tbl_all',5)}>Amount Earned</th>
                                                <th style={{width:'13%'}} onClick={this.sortTable('tbl_all',6)}>Status</th>
                                            </thead>
                                            <tbody>      
                                               {
                                                    this.state.dataLoading===false ?
                                                    dataTableAll.length > 0  ? dataTableAll : 'No data found'
                                                    :
                                                    <p>Loading....</p>
                                                }                                  
                                            </tbody>
                                        </table>
                                    </div> 
                                </div>    
                            </div>
                        </div>
                    </div>
                    {/* className="details-popup show-popup" */}
                    <div className={"details-popup-back "+this.state.showPopUp}>
                        <div className="details-popup" >                
                                <span className="details_popup_close" id="close_pop" onClick={this.closeSidePopUp}>×</span>
                                <div className="main-details">
                                    <div className="date">
                                        <p>                                
                                            {sidePop.BM_Purchase_Date}        
                                            {/* + " "+sidePop.BM_Purchase_Time  */}
                                        </p>
                                    </div>
                                    <div className="details-box">
                                        <div className="icon"><img src={API.GetProductIcon(sidePop.DA_DA_ID)} alt=""/></div>
                                                <h3>
                                                {
                                                            productList && productList.map((item,i)=>{
                                                                return (
                                                                    item.DA_DA_ID===sidePop.DA_DA_ID ?
                                                                    ' '+item.DA_Title
                                                                    :
                                                                    sidePop.DA_DA_ID===999 && item.DA_DA_ID===0 ?
                                                                    ' '+item.DA_Title
                                                                    :
                                                                    null       
                                                                )
                                                            })
                                                }     

                                                </h3>
                                        <div className="details">
                                            <p><span>Total Price: </span> {sidePop.Actual_Price}</p>
                                            <p><span>Amount credit: </span> {sidePop.BM_Purchase_Amt}</p>
                                        </div>
                                        <div className="details">
                                            <p><span>Person name: </span>{sidePop.BM_Name}</p>
                                            <p><span>Email ID: </span> 
                                            {
                                            sidePop.Consent > 0 && (sidePop.DA_DA_ID!==0 || sidePop.DA_DA_ID!==999)? 
                                            ' '+sidePop.BM_Email 
                                            : 
                                            sidePop.Consent === 0 && (sidePop.DA_DA_ID===0 || sidePop.DA_DA_ID===999)? 
                                            ' '+sidePop.BM_Email 
                                            :
                                            ''
                                            
                                            }
                                            
                                            </p>
                                        </div>
                                        <div className="details">
                                            <p><span>Massage: </span>{sidePop.BM_Instruction}</p>
                                            <p><span>Payment Status:</span>{ sidePop.Status!=='P' ? ' Added to Wallet' : ' Pending'} </p>
                                        </div>
                                    </div>
                                    {
                                        sidePop.DA_DA_ID===1 && sidePop.Status==='A'?
                                        <div className="upload-box">
                                            <h3>You can upload your file</h3>
                                            <p>CLICK ON THE BUTTON FOR UPLOAD FILES</p>
                                            {/* <div className="file-preview"><img src={"images/why-back.jpg"}/></div>  */}
                                        
                                                
                                            
                                                {
                                                    this.state.showSubmitBtn===true ?
                                                    <>
                                                    <div id="preview_req" className="file-preview">
                                                        {
                                                            this.state.isPreview && this.state.fileType ==='img'?
                                                            <img src={this.state.fileUrl} style={{width:'100%'}} alt=""/>
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
                                                    <button className="up-file" onClick={this.submitFile} id="btn_sbmit">Submit Request</button> 

                                                    </>
                                                    :
                                                    <>                                               
                                                    <label className="up-file" for="upfile">
                                                        Upload Video or Audio
                                                        <input type="file" 
                                                        name="upfile" id="upfile" accept=".mp4,.mp3,.mov" onChange={this.fileOnChange}
                                                        style={{display: "none"}}/>
                                                    </label>   
                                                    </>                        
                                                }
                                                <p id="msg" style={{color:'red',fontSize:'13px'}}></p>  
                                        </div>
                                        :
                                        null
                                    }
                                    
                                </div>
                        </div>                            
                    </div>

                </div>

                    {/* sudipta */}              

                        <Modal
                            show={this.state.showConfirmModal}
                            onHide={this.closeConfirmModal}
                            backdrop="static"
                            keyboard={false}
                            centered
                            size="sm"
                            className="request-modal"
                        >
                                <Modal.Header closeButton>
                                <Modal.Title>
                                        <h4>Are You Sure ?</h4>
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                        <p>Do you want to {                                            
                                            this.state.currentStatus==='A'?
                                            ' Accept the request?'
                                            :
                                            this.state.currentStatus==='D'?
                                            ' Decline the request?'
                                            :
                                            ' change the status ?'
                                        }</p>
                                </Modal.Body>
                                <Modal.Footer>                                  
                                     <button className="yes" onClick={this.updateRequestStatAfterConfirm}>Yes</button>
                                     <button onClick={this.closeConfirmModal}>No</button>
                                </Modal.Footer>
                          </Modal>

                      
                <FooterClass/>
            </>
        );
    }
}

NotificationRequest.propTypes = {

};

export default NotificationRequest;