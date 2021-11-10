import React, { Component,  } from 'react';





import FooterClass from '../header_footer/FooterClass';
import ProfileHeader from '../header_footer/ProfileHeader';

import ToastAlert from '../pages/ToastAlert';



import { TimePicker } from 'antd';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'antd/dist/antd.css';
import moment from 'moment';
import API from '../services/API';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


class EditLiveVideoSessionPage extends Component {
    constructor(props) {
        super(props)
        if (typeof this.props.location.state === "undefined" || this.props.location.state === null) {
            window.location.href = '/';
        }
        this.state = {
            data: this.props.location.state.data,
            JM_ID: this.props.location.state.JM_ID,
            JM_User_Profile_Url: this.props.location.state.JM_User_Profile_Url,
            showAlert: false,
            EM_Title: this.props.location.state.data.title,
            EM_Desc: this.props.location.state.data.description,
            EM_Mail_Text: this.props.location.state.data.mailText,
            EM_Duration: this.props.location.state.data.duration,
            EM_Plan_Days: this.props.location.state.data.planDays,
            EM_Price: this.props.location.state.data.price,
            tableId: this.props.location.state.data.tableId,
            msg: '',
            base_url: process.env.REACT_APP_API_URL,
            root_url: process.env.REACT_APP_ROOT_URL,
            schedule: [],
            mon_checked: false, mon_start: '', mon_end: '',
            tue_checked: false, tue_start: '', tue_end: '',
            wed_checked: false, wed_start: "", wed_end: "",
            thus_checked: false, thus_start: "", thus_end: "",
            fry_checked: false, fry_start: "", fry_end: "",
            sat_checked: false, sat_start: "", sat_end: "",
            sun_checked: false, sun_start: "", sun_end: "",
            btnDisabled: false,
            btn_text: 'Update',
            cover_Image_video: '',
            coverImageorVideo: null,
            allowCustomertoPay: 0,
            min_amt: '',
            suggested_amt: '',
            showDiv: false,

        }
    }
    componentDidMount() {
        this.setData();
    }

    setData = async (e) => {
        //console.log(this.props.location.state.data.tableId)
        let EM_Title = this.props.location.state.data.title
        let EM_Desc = this.props.location.state.data.description
        let EM_Mail_Text = this.props.location.state.data.mailText
        let EM_Duration = this.props.location.state.data.duration
        let EM_Plan_Days = this.props.location.state.data.planDays;
        let EM_Price = this.props.location.state.data.price;
        document.getElementsByName('EM_Title')[0].value = EM_Title;
        document.getElementsByName('EM_Desc')[0].value = EM_Desc;
        document.getElementsByName('EM_Mail_Text')[0].value = EM_Mail_Text;
        document.getElementsByName('EM_Duration')[0].value = EM_Duration;
        document.getElementsByName('EM_Plan_Days')[0].value = EM_Plan_Days;
        document.getElementsByName('EM_Price')[0].value = EM_Price;
      //  console.log(this.props.location.state.data)
        // this.setState(
        //     {
        //         allowCustomertoPay: this.props.location.state.data.DA_Allow_Cust_Pay,
        //         min_amt: this.props.location.state.data.DA_Min_Amount,
        //         suggested_amt: this.props.location.state.data.DA_Suggested_Amont,
        //         showDiv: this.props.location.state.data.DA_Allow_Cust_Pay === 1 ? true : false
        //     });


           
            document.getElementById('showDiv').style.display='none';    

            document.getElementById("allowCustomertoPay").value=this.props.location.state.data.DA_Min_Amount;
            document.getElementById("min_amt").value=this.props.location.state.data.DA_Min_Amount;
            document.getElementById("suggested_amt").value=this.props.location.state.data.DA_Suggested_Amont;
            if(this.props.location.state.data.DA_Allow_Cust_Pay === 1)
            {
                document.getElementById("allowCustomertoPay").checked=true;  
                document.getElementById('EM_Price').disabled=true;  
                document.getElementById('showDiv').style.display='block';    
                document.getElementById('EM_Price').value=0;     
            }
            document.getElementById('img_div').style.display='none'; 
        var JM_User_Profile_Url = localStorage.getItem('JM_User_Profile_Url') + "_" + API.getId();
        if (this.props.location.state.data.prodType === 'videoCam') 
        {
            let arr = JSON.parse(this.props.location.state.data.collection);
            if (arr !== null && arr.length > 0) 
            {
              document.getElementById('img_div').style.display='block'; 
              document.getElementById("cover_img").src = process.env.REACT_APP_API_URL + "adm/uploads/Profile/" + JM_User_Profile_Url + "/" + arr[0];
            }

        }
        let ESC_EM_ID = this.props.location.state.data.tableId;
        let JM_ID = this.props.location.state.data.JM_ID;

        var JSONdata = {
            ESC_EM_ID: ESC_EM_ID,
            JM_ID: JM_ID
        }
        const response = await API.postData(JSONdata, 'GetScheduleConfig');
        // console.log(response.data)
        if(response.status===1)
        {

            const data1 = API.decryptJson(response.flag);
            if (data1.data!==null && data1.data.length > 0) 
            {
                var data=data1.data;
                for (let i = 0; i < data.length; i++) {
                    const dayId = data[i].dayId;
    
    
                    var startTime = data[i].startTimeNum ? moment(data[i].startTime, "HH:mm").format("hh:mm A") : '';
                    var endTime = data[i].endTimeNum ? moment(data[i].endTime, "HH:mm").format("hh:mm A") : '';
                    var startTime2 = data[i].startTimeNum2 ? moment(data[i].startTime2, "HH:mm").format("hh:mm A") : '';
                    var endTime2 = data[i].endTimeNum2 ? moment(data[i].endTime2, "HH:mm").format("hh:mm A") : '';
    
                    if (data[i].startTimeNum === -1 && data[i].endTimeNum === -1) {
                        startTime = "1234"; endTime = "1234";
                    }
                    if (data[i].startTimeNum2 === -1 && data[i].endTimeNum2 === -1) {
                        startTime2 = "1234"; endTime2 = "1234";
                    }
    
                    if (dayId === 1) {
    
                        //  this.setState({
                        //     mon_checked:true
                        // })
                        document.getElementsByName('mon_start')[0].value = startTime === "" ? "12:00 AM" : startTime === "1234" ? '' : startTime;
                        document.getElementsByName('mon_end')[0].value = endTime === "" ? "12:00 AM" : endTime === "1234" ? '' : endTime;
                        document.getElementsByName('mon_start2')[0].value = startTime2 === "" ? "12:00 AM" : startTime2 === "1234" ? '' : startTime2;
                        document.getElementsByName('mon_end2')[0].value = endTime2 === "" ? "12:00 AM" : endTime2 === "1234" ? '' : endTime2;
                        document.getElementsByName('mon_checked')[0].checked = true;
                    }
                    if (dayId === 2) {
                        // this.setState({
                        //     tue_checked:true
                        // })
    
                        document.getElementsByName('tue_start')[0].value = startTime === "" ? "12:00 AM" : startTime === "1234" ? '' : startTime;
                        document.getElementsByName('tue_end')[0].value = endTime === "" ? "12:00 AM" : endTime === "1234" ? '' : endTime;
                        document.getElementsByName('tue_start2')[0].value = startTime2 === "" ? "12:00 AM" : startTime2 === "1234" ? '' : startTime2;
                        document.getElementsByName('tue_end2')[0].value = endTime2 === "" ? "12:00 AM" : endTime2 === "1234" ? '' : endTime2;
    
    
                        document.getElementsByName('tue_checked')[0].checked = true;
    
                    }
                    if (dayId === 3) {
                        // this.setState({
                        //     wed_checked:true
                        // })
                        document.getElementsByName('wed_start')[0].value = startTime === "" ? "12:00 AM" : startTime === "1234" ? '' : startTime;
                        document.getElementsByName('wed_end')[0].value = endTime === "" ? "12:00 AM" : endTime === "1234" ? '' : endTime;
                        document.getElementsByName('wed_start2')[0].value = startTime2 === "" ? "12:00 AM" : startTime2 === "1234" ? '' : startTime2;
                        document.getElementsByName('wed_end2')[0].value = endTime2 === "" ? "12:00 AM" : endTime2 === "1234" ? '' : endTime2;
    
                        document.getElementsByName('wed_checked')[0].checked = true;
    
                    }
                    if (dayId === 4) {
                        // this.setState({
                        //     thus_checked:true
                        // })
                        document.getElementsByName('thus_start')[0].value = startTime === "" ? "12:00 AM" : startTime === "1234" ? '' : startTime;
                        document.getElementsByName('thus_end')[0].value = endTime === "" ? "12:00 AM" : endTime === "1234" ? '' : endTime;
                        document.getElementsByName('thus_start2')[0].value = startTime2 === "" ? "12:00 AM" : startTime2 === "1234" ? '' : startTime2;
                        document.getElementsByName('thus_end2')[0].value = endTime2 === "" ? "12:00 AM" : endTime2 === "1234" ? '' : endTime2;
                        document.getElementsByName('thus_checked')[0].checked = true;
    
                    }
                    if (dayId === 5) {
                        // this.setState({
                        //     fry_checked:true
                        // })
    
    
                        document.getElementsByName('fry_start')[0].value = startTime === "" ? "12:00 AM" : startTime === "1234" ? '' : startTime;
                        document.getElementsByName('fry_end')[0].value = endTime === "" ? "12:00 AM" : endTime === "1234" ? '' : endTime;
                        document.getElementsByName('fry_start2')[0].value = startTime2 === "" ? "12:00 AM" : startTime2 === "1234" ? '' : startTime2;
                        document.getElementsByName('fry_end2')[0].value = endTime2 === "" ? "12:00 AM" : endTime2 === "1234" ? '' : endTime2;
    
    
                        document.getElementsByName('fry_checked')[0].checked = true;
    
                    }
                    if (dayId === 6) {
                        // this.setState({
                        //     sat_checked:true
                        // })      
                        document.getElementsByName('sat_start')[0].value = startTime === "" ? "12:00 AM" : startTime === "1234" ? '' : startTime;
                        document.getElementsByName('sat_end')[0].value = endTime === "" ? "12:00 AM" : endTime === "1234" ? '' : endTime;
                        document.getElementsByName('sat_start2')[0].value = startTime2 === "" ? "12:00 AM" : startTime2 === "1234" ? '' : startTime2;
                        document.getElementsByName('sat_end2')[0].value = endTime2 === "" ? "12:00 AM" : endTime2 === "1234" ? '' : endTime2;
    
                        document.getElementsByName('sat_checked')[0].checked = true;
    
                    }
                    if (dayId === 7) {
                        // this.setState({
                        //     sun_checked:true
                        // })     
    
                        document.getElementsByName('sun_start')[0].value = startTime === "" ? "12:00 AM" : startTime === "1234" ? '' : startTime;
                        document.getElementsByName('sun_end')[0].value = endTime === "" ? "12:00 AM" : endTime === "1234" ? '' : endTime;
                        document.getElementsByName('sun_start2')[0].value = startTime2 === "" ? "12:00 AM" : startTime2 === "1234" ? '' : startTime2;
                        document.getElementsByName('sun_end2')[0].value = endTime2 === "" ? "12:00 AM" : endTime2 === "1234" ? '' : endTime2;
    
                        document.getElementsByName('sun_checked')[0].checked = true;
    
                    }
                }
            }
        }

        document.getElementById('charges_info').innerHTML='';
        document.getElementById('charges_info').style.display='none';
        document.getElementById('info_charges').style.display='none';

    }
    startTime = (time, timeString, e) => {
       

    }
    startTime2 = (time, timeString, e) => {
       

    }
    handleSubmit = async (event) => {


        event.preventDefault();
        let mon_checked = document.getElementsByName('mon_checked')[0].checked;
        let tue_checked = document.getElementsByName('tue_checked')[0].checked;
        let wed_checked = document.getElementsByName('wed_checked')[0].checked;
        let thus_checked = document.getElementsByName('thus_checked')[0].checked;
        let fry_checked = document.getElementsByName('fry_checked')[0].checked;
        let sat_checked = document.getElementsByName('sat_checked')[0].checked;
        let sun_checked = document.getElementsByName('sun_checked')[0].checked;

        let EM_Title = document.getElementsByName("EM_Title")[0].value;
        let EM_Desc = document.getElementsByName('EM_Desc')[0].value;
        let EM_Mail_Text = document.getElementsByName('EM_Mail_Text')[0].value;
        let EM_Duration = document.getElementsByName('EM_Duration')[0].value;
        let EM_Plan_Days = document.getElementsByName('EM_Plan_Days')[0].value;
        let EM_Price = document.getElementsByName('EM_Price')[0].value;


        //console.log(this.state)
        document.getElementById('msg_live').innerHTML = '';
        if (EM_Title.length === 0) {
            document.getElementById('msg_live').innerHTML = '* Enter Title';
            return false;
        }
        // if(this.state.EM_Desc.length===0)
        // {
        //     document.getElementById('msg_live').innerHTML='* Enter Description';
        //     return false;
        // }
        if (EM_Mail_Text.length === 0) {
            document.getElementById('msg_live').innerHTML = '* Enter Mail Text';
            return false;
        }




        var days = mon_checked === true ? true :
            tue_checked === true ? true :
                wed_checked === true ? true :
                    thus_checked === true ? true :
                        fry_checked === true ? true :
                            sat_checked === true ? true :
                                sun_checked === true ? true
                                    : false;
        if (days === false) {
            document.getElementById('msg_live').innerHTML = "* Select atleast one day's schedule";
            return false;
        }


        //monday=========================================================================
        let mon_start_time = document.getElementsByName('mon_start')[0].value;
        let mon_end_time = document.getElementsByName('mon_end')[0].value;
        let mon_start_time2 = document.getElementsByName('mon_start2')[0].value;
        let mon_end_time2 = document.getElementsByName('mon_end2')[0].value;
        let mon_start = -1;
        let mon_end = -1;
        let mon_start2 = -1;
        let mon_end2 = -1;
        if (mon_checked === true) {
            if (
                (
                    (mon_start_time.length === 0 && mon_end_time.length === 0) || //1st
                    (mon_start_time.length === 0 || mon_end_time.length === 0)
                ) &&
                ((mon_start_time2.length === 0 && mon_end_time2.length === 0) || //2nd
                    (mon_start_time2.length === 0 || mon_end_time2.length === 0)
                )
            ) {
                document.getElementById('msg_live').innerHTML = '* Select atleast one schedule for monday';
                return false;
            }
        }

        if (mon_checked === true && (
            (mon_start_time.length > 0 && mon_end_time.length > 0) ||
            (mon_start_time2.length > 0 && mon_end_time2.length > 0))
        ) {
            mon_start = this.time_convert_number(mon_start_time);
            if (mon_start_time === "") mon_start = -1;

            mon_end = this.time_convert_number(mon_end_time);
            if (mon_end_time === "") mon_end = -1;

            mon_start2 = this.time_convert_number(mon_start_time2);
            if (mon_start_time2 === "") mon_start2 = -1;

            mon_end2 = this.time_convert_number(mon_end_time2);
            if (mon_end_time2 === "") mon_end2 = -1;

            if (mon_start > -1 && mon_end > -1 && mon_start2 > -1 && mon_end2 > -1) {
                if ((mon_start >= mon_end)
                    || (mon_start2 >= mon_end2)
                    || API.inRange(mon_start2, mon_start, mon_end)
                    || API.inRange(mon_end2, mon_start, mon_end)
                    || API.inRange(mon_start, mon_start2, mon_end2)
                    || API.inRange(mon_end, mon_start2, mon_end2)
                    || (mon_start === mon_start2 && mon_end === mon_end2)
                ) {
                    alert("The time schedule for monday is incorrect. Please check and correct");
                    return false;
                }
            }
            else if (mon_start > -1 && mon_end > -1 && mon_start2 === -1 && mon_end2 === -1) {
                if (mon_start >= mon_end
                ) {
                    alert("The time schedule for monday is incorrect. Please check and correct");
                    return false;
                }

            }
            else if (mon_start2 > -1 && mon_end2 > -1 && mon_start === -1 && mon_end === -1) {
                if (mon_start2 >= mon_end2) {
                    alert("The time schedule for monday is incorrect. Please check and correct");
                    return false;
                }
            }
            else {
                alert("The time schedule for monday is incorrect. Please check and correct");
                return false;
            }
        }

        //=========================================================================end
        //tue=========================================================================
        let tue_start_time = document.getElementsByName('tue_start')[0].value;
        let tue_end_time = document.getElementsByName('tue_end')[0].value;
        let tue_start_time2 = document.getElementsByName('tue_start2')[0].value;
        let tue_end_time2 = document.getElementsByName('tue_end2')[0].value;
        let tue_start = -1;
        let tue_end = -1;
        let tue_start2 = -1;
        let tue_end2 = -1;

        if (tue_checked === true) {
            if (
                (
                    (tue_start_time.length === 0 && tue_end_time.length === 0) || //1st
                    (tue_start_time.length === 0 || tue_end_time.length === 0)
                ) &&
                ((tue_start_time2.length === 0 && tue_end_time2.length === 0) || //2nd
                    (tue_start_time2.length === 0 || tue_end_time2.length === 0)
                )
            ) {
                document.getElementById('msg_live').innerHTML = '* Select atleast one schedule for tuesday';
                return false;
            }
        }


        if (tue_checked === true && (
            (tue_start_time.length > 0 && tue_end_time.length > 0) ||
            (tue_start_time2.length > 0 && tue_end_time2.length > 0))
        ) {
            tue_start = this.time_convert_number(tue_start_time);
            if (tue_start_time === "") tue_start = -1;

            tue_end = this.time_convert_number(tue_end_time);
            if (tue_end_time === "") tue_end = -1;

            tue_start2 = this.time_convert_number(tue_start_time2);
            if (tue_start_time2 === "") tue_start2 = -1;

            tue_end2 = this.time_convert_number(tue_end_time2);
            if (tue_end_time2 === "") tue_end2 = -1;

            if (tue_start > -1 && tue_end > -1 && tue_start2 > -1 && tue_end2 > -1) {
                if ((tue_start >= tue_end)
                    || (tue_start2 >= tue_end2)
                    || API.inRange(tue_start2, tue_start, tue_end)
                    || API.inRange(tue_end2, tue_start, tue_end)
                    || API.inRange(tue_start, tue_start2, tue_end2)
                    || API.inRange(tue_end, tue_start2, tue_end2)
                    || (tue_start === tue_start2 && tue_end === tue_end2)
                ) {
                    alert("The time schedule for tuesday is incorrect. Please check and correct");
                    return false;
                }
            }
            else if (tue_start > -1 && tue_end > -1 && tue_start2 === -1 && tue_end2 === -1) {
                if (tue_start >= tue_end
                ) {
                    alert("The time schedule for tuesday is incorrect. Please check and correct");
                    return false;
                }

            }
            else if (tue_start2 > -1 && tue_end2 > -1 && tue_start === -1 && tue_end === -1) {
                if (tue_start2 >= tue_end2) {
                    alert("The time schedule for tuesday is incorrect. Please check and correct");
                    return false;
                }
            }
            else {
                alert("The time schedule for tuesday is incorrect. Please check and correct");
                return false;
            }



        }


        //============================================================================== end
        //wed
        let wed_start_time = document.getElementsByName('wed_start')[0].value;
        let wed_end_time = document.getElementsByName('wed_end')[0].value;
        let wed_start_time2 = document.getElementsByName('wed_start2')[0].value;
        let wed_end_time2 = document.getElementsByName('wed_end2')[0].value;
        let wed_start = -1;
        let wed_end = -1;
        let wed_start2 = -1;
        let wed_end2 = -1;
        if (wed_checked === true) {
            if (
                (
                    (wed_start_time.length === 0 && wed_end_time.length === 0) || //1st
                    (wed_start_time.length === 0 || wed_end_time.length === 0)
                ) &&
                ((wed_start_time2.length === 0 && wed_end_time2.length === 0) || //2nd
                    (wed_start_time2.length === 0 || wed_end_time2.length === 0)
                )
            ) {
                document.getElementById('msg_live').innerHTML = '* Select atleast one schedule for tuesday';
                return false;
            }
        }




        if (wed_checked === true && (
            (wed_start_time.length > 0 && wed_end_time.length > 0) ||
            (wed_start_time2.length > 0 && wed_end_time2.length > 0))
        ) {
            wed_start = this.time_convert_number(wed_start_time);
            if (wed_start_time === "") wed_start = -1;

            wed_end = this.time_convert_number(wed_end_time);
            if (wed_end_time === "") wed_end = -1;

            wed_start2 = this.time_convert_number(wed_start_time2);
            if (wed_start_time2 === "") wed_start2 = -1;

            wed_end2 = this.time_convert_number(wed_end_time2);
            if (wed_end_time2 === "") wed_end2 = -1;

            if (wed_start > -1 && wed_end > -1 && wed_start2 > -1 && wed_end2 > -1) {
                if ((wed_start >= wed_end)
                    || (wed_start2 >= wed_end2)
                    || API.inRange(wed_start2, wed_start, wed_end)
                    || API.inRange(wed_end2, wed_start, wed_end)
                    || API.inRange(wed_start, wed_start2, wed_end2)
                    || API.inRange(wed_end, wed_start2, wed_end2)
                    || (wed_start === wed_start2 && wed_end === wed_end2)
                ) {
                    alert("The time schedule for Wednesday is incorrect. Please check and correct");
                    return false;
                }
            }
            else if (wed_start > -1 && wed_end > -1 && wed_start2 === -1 && wed_end2 === -1) {
                if (wed_start >= wed_end
                ) {
                    alert("The time schedule for Wednesday is incorrect. Please check and correct");
                    return false;
                }

            }
            else if (wed_start2 > -1 && wed_end2 > -1 && wed_start === -1 && wed_end === -1) {
                if (wed_start2 >= wed_end2) {
                    alert("The time schedule for Wednesday is incorrect. Please check and correct");
                    return false;
                }
            }
            else {
                alert("The time schedule for Wednesday is incorrect. Please check and correct");
                return false;
            }


        }


        //thus

        let thus_start_time = document.getElementsByName('thus_start')[0].value;
        let thus_end_time = document.getElementsByName('thus_end')[0].value;
        let thus_start_time2 = document.getElementsByName('thus_start2')[0].value;
        let thus_end_time2 = document.getElementsByName('thus_end2')[0].value;
        let thus_start = -1;
        let thus_end = -1;
        let thus_start2 = -1;
        let thus_end2 = -1;
        if (thus_checked === true) {
            if (
                (
                    (thus_start_time.length === 0 && thus_end_time.length === 0) || //1st
                    (thus_start_time.length === 0 || thus_end_time.length === 0)
                ) &&
                ((thus_start_time2.length === 0 && thus_end_time2.length === 0) || //2nd
                    (thus_start_time2.length === 0 || thus_end_time2.length === 0)
                )
            ) {
                document.getElementById('msg_live').innerHTML = '* Select atleast one schedule for thursday';
                return false;
            }
        }


        if (thus_checked === true && (
            (thus_start_time.length > 0 && thus_end_time.length > 0) ||
            (thus_start_time2.length > 0 && thus_end_time2.length > 0))
        ) {
            thus_start = this.time_convert_number(thus_start_time);
            if (thus_start_time === "") thus_start = -1;

            thus_end = this.time_convert_number(thus_end_time);
            if (thus_end_time === "") thus_end = -1;

            thus_start2 = this.time_convert_number(thus_start_time2);
            if (thus_start_time2 === "") thus_start2 = -1;

            thus_end2 = this.time_convert_number(thus_end_time2);
            if (thus_end_time2 === "") thus_end2 = -1;

            if (thus_start > -1 && thus_end > -1 && thus_start2 > -1 && thus_end2 > -1) {
                if ((thus_start >= thus_end)
                    || (thus_start2 >= thus_end2)
                    || API.inRange(thus_start2, thus_start, thus_end)
                    || API.inRange(thus_end2, thus_start, thus_end)
                    || API.inRange(thus_start, thus_start2, thus_end2)
                    || API.inRange(thus_end, thus_start2, thus_end2)
                    || (thus_start === thus_start2 && thus_end === thus_end2)
                ) {
                    alert("The time schedule for thursday is incorrect. Please check and correct");
                    return false;
                }
            }
            else if (thus_start > -1 && thus_end > -1 && thus_start2 === -1 && thus_end2 === -1) {
                if (thus_start >= thus_end
                ) {
                    alert("The time schedule for thursday is incorrect. Please check and correct");
                    return false;
                }

            }
            else if (thus_start2 > -1 && thus_end2 > -1 && thus_start === -1 && thus_end === -1) {
                if (thus_start2 >= thus_end2) {
                    alert("The time schedule for thursday is incorrect. Please check and correct");
                    return false;
                }
            }
            else {
                alert("The time schedule for thursday is incorrect. Please check and correct");
                return false;
            }

        }




        //==========================================================================
        //friday
        let fry_start_time = document.getElementsByName('fry_start')[0].value;
        let fry_end_time = document.getElementsByName('fry_end')[0].value;
        let fry_start_time2 = document.getElementsByName('fry_start2')[0].value;
        let fry_end_time2 = document.getElementsByName('fry_end2')[0].value;
        let fry_start = -1;
        let fry_end = -1;
        let fry_start2 = -1;
        let fry_end2 = -1;
        if (fry_checked === true) {
            if (
                (
                    (fry_start_time.length === 0 && fry_end_time.length === 0) || //1st
                    (fry_start_time.length === 0 || fry_end_time.length === 0)
                ) &&
                ((fry_start_time2.length === 0 && fry_end_time2.length === 0) || //2nd
                    (fry_start_time2.length === 0 || fry_end_time2.length === 0)
                )
            ) {
                document.getElementById('msg_live').innerHTML = '* Select atleast one schedule for fryday';
                return false;
            }
        }


        if (fry_checked === true && (
            (fry_start_time.length > 0 && fry_end_time.length > 0) ||
            (fry_start_time2.length > 0 && fry_end_time2.length > 0))
        ) {
            fry_start = this.time_convert_number(fry_start_time);
            if (fry_start_time === "") fry_start = -1;

            fry_end = this.time_convert_number(fry_end_time);
            if (fry_end_time === "") fry_end = -1;

            fry_start2 = this.time_convert_number(fry_start_time2);
            if (fry_start_time2 === "") fry_start2 = -1;

            fry_end2 = this.time_convert_number(fry_end_time2);
            if (fry_end_time2 === "") fry_end2 = -1;

            if (fry_start > -1 && fry_end > -1 && fry_start2 > -1 && fry_end2 > -1) {
                if ((fry_start >= fry_end)
                    || (fry_start2 >= fry_end2)
                    || API.inRange(fry_start2, fry_start, fry_end)
                    || API.inRange(fry_end2, fry_start, fry_end)
                    || API.inRange(fry_start, fry_start2, fry_end2)
                    || API.inRange(fry_end, fry_start2, fry_end2)
                    || (fry_start === fry_start2 && fry_end === fry_end2)
                ) {
                    alert("The time schedule for friday is incorrect. Please check and correct");
                    return false;
                }
            }
            else if (fry_start > -1 && fry_end > -1 && fry_start2 === -1 && fry_end2 === -1) {
                if (fry_start >= fry_end
                ) {
                    alert("The time schedule for friday is incorrect. Please check and correct");
                    return false;
                }

            }
            else if (fry_start2 > -1 && fry_end2 > -1 && fry_start === -1 && fry_end === -1) {
                if (fry_start2 >= fry_end2) {
                    alert("The time schedule for friday is incorrect. Please check and correct");
                    return false;
                }
            }
            else {
                alert("The time schedule for friday is incorrect. Please check and correct");
                return false;
            }


        }



        //sat

        let sat_start_time = document.getElementsByName('sat_start')[0].value;
        let sat_end_time = document.getElementsByName('sat_end')[0].value;
        let sat_start_time2 = document.getElementsByName('sat_start2')[0].value;
        let sat_end_time2 = document.getElementsByName('sat_end2')[0].value;
        let sat_start = -1;
        let sat_end = -1;
        let sat_start2 = -1;
        let sat_end2 = -1;
        if (sat_checked === true) {
            if (
                (
                    (sat_start_time.length === 0 && sat_end_time.length === 0) || //1st
                    (sat_start_time.length === 0 || sat_end_time.length === 0)
                ) &&
                ((sat_start_time2.length === 0 && sat_end_time2.length === 0) || //2nd
                    (sat_start_time2.length === 0 || sat_end_time2.length === 0)
                )
            ) {
                document.getElementById('msg_live').innerHTML = '* Select atleast one schedule for saturday';
                return false;
            }
        }


        if (sat_checked === true && (
            (sat_start_time.length > 0 && sat_end_time.length > 0) ||
            (sat_start_time2.length > 0 && sat_end_time2.length > 0))
        ) {
            sat_start = this.time_convert_number(sat_start_time);
            if (sat_start_time === "") sat_start = -1;

            sat_end = this.time_convert_number(sat_end_time);
            if (sat_end_time === "") sat_end = -1;

            sat_start2 = this.time_convert_number(sat_start_time2);
            if (sat_start_time2 === "") sat_start2 = -1;

            sat_end2 = this.time_convert_number(sat_end_time2);
            if (sat_end_time2 === "") sat_end2 = -1;

            if (sat_start > -1 && sat_end > -1 && sat_start2 > -1 && sat_end2 > -1) {
                if ((sat_start >= sat_end)
                    || (sat_start2 >= sat_end2)
                    || API.inRange(sat_start2, sat_start, sat_end)
                    || API.inRange(sat_end2, sat_start, sat_end)
                    || API.inRange(sat_start, sat_start2, sat_end2)
                    || API.inRange(sat_end, sat_start2, sat_end2)
                    || (sat_start === sat_start2 && sat_end === sat_end2)
                ) {
                    alert("The time schedule for saturday is incorrect. Please check and correct");
                    return false;
                }
            }
            else if (sat_start > -1 && sat_end > -1 && sat_start2 === -1 && sat_end2 === -1) {
                if (sat_start >= sat_end
                ) {
                    alert("The time schedule for saturday is incorrect. Please check and correct");
                    return false;
                }

            }
            else if (sat_start2 > -1 && sat_end2 > -1 && sat_start === -1 && sat_end === -1) {
                if (sat_start2 >= sat_end2) {
                    alert("The time schedule for saturday is incorrect. Please check and correct");
                    return false;
                }
            }
            else {
                alert("The time schedule for saturday is incorrect. Please check and correct");
                return false;
            }


        }



        //sun



        let sun_start_time = document.getElementsByName('sun_start')[0].value;
        let sun_end_time = document.getElementsByName('sun_end')[0].value;
        let sun_start_time2 = document.getElementsByName('sun_start2')[0].value;
        let sun_end_time2 = document.getElementsByName('sun_end2')[0].value;
        let sun_start = -1;
        let sun_end = -1;
        let sun_start2 = -1;
        let sun_end2 = -1;

        if (sun_checked === true) {
            if (
                (
                    (sun_start_time.length === 0 && sun_end_time.length === 0) || //1st
                    (sun_start_time.length === 0 || sun_end_time.length === 0)
                ) &&
                ((sun_start_time2.length === 0 && sun_end_time2.length === 0) || //2nd
                    (sun_start_time2.length === 0 || sun_end_time2.length === 0)
                )
            ) {
                document.getElementById('msg_live').innerHTML = '* Select atleast one schedule for sunday';
                return false;
            }
        }


        if (sun_checked === true && (
            (sun_start_time.length > 0 && sun_end_time.length > 0) ||
            (sun_start_time2.length > 0 && sun_end_time2.length > 0))
        ) {
            sun_start = this.time_convert_number(sun_start_time);
            if (sun_start_time === "") sun_start = -1;

            sun_end = this.time_convert_number(sun_end_time);
            if (sun_end_time === "") sun_end = -1;

            sun_start2 = this.time_convert_number(sun_start_time2);
            if (sun_start_time2 === "") sun_start2 = -1;

            sun_end2 = this.time_convert_number(sun_end_time2);
            if (sun_end_time2 === "") sun_end2 = -1;

            if (sun_start > -1 && sun_end > -1 && sun_start2 > -1 && sun_end2 > -1) {
                if ((sun_start >= sun_end)
                    || (sun_start2 >= sun_end2)
                    || API.inRange(sun_start2, sun_start, sun_end)
                    || API.inRange(sun_end2, sun_start, sun_end)
                    || API.inRange(sun_start, sun_start2, sun_end2)
                    || API.inRange(sun_end, sun_start2, sun_end2)
                    || (sun_start === sun_start2 && sun_end === sun_end2)
                ) {
                    alert("The time schedule for sunday is incorrect. Please check and correct");
                    return false;
                }
            }
            else if (sun_start > -1 && sun_end > -1 && sun_start2 === -1 && sun_end2 === -1) {
                if (sun_start >= sun_end
                ) {
                    alert("The time schedule for sunday is incorrect. Please check and correct");
                    return false;
                }

            }
            else if (sun_start2 > -1 && sun_end2 > -1 && sun_start === -1 && sun_end === -1) {
                if (sun_start2 >= sun_end2) {
                    alert("The time schedule for sunday is incorrect. Please check and correct");
                    return false;
                }
            }
            else {
                alert("The time schedule for sunday is incorrect. Please check and correct");
                return false;
            }



        }



        if (isNaN(parseInt(EM_Price))) EM_Price = 0;

        if (parseInt(EM_Price) === 0) 
        {
            //document.getElementById('msg_live').innerHTML = '* Enter Price';
            //return false;
        }




        var JSONData = {
            JM_ID: this.state.JM_ID,
            EM_Title: EM_Title,
            EM_Desc: EM_Desc,
            EM_Mail_Text: EM_Mail_Text,
            EM_Duration: EM_Duration,
            EM_Plan_Days: EM_Plan_Days,
            EM_Price: EM_Price,
            ES_EM_ID: this.state.tableId,
            days: [
                {
                    Day_ID: mon_checked === true ? 1 : 0,
                    Slot_Start: mon_start, Slot_End: mon_end,
                    Slot_Start2: mon_start2, Slot_End2: mon_end2,
                },
                {
                    Day_ID: tue_checked === true ? 2 : 0,
                    Slot_Start: tue_start, Slot_End: tue_end,
                    Slot_Start2: tue_start2, Slot_End2: tue_end2
                },
                {
                    Day_ID: wed_checked === true ? 3 : 0,
                    Slot_Start: wed_start, Slot_End: wed_end,
                    Slot_Start2: wed_start2, Slot_End2: wed_end2
                },
                {
                    Day_ID: thus_checked === true ? 4 : 0,
                    Slot_Start: thus_start, Slot_End: thus_end,
                    Slot_Start2: thus_start2, Slot_End2: thus_end2
                },
                {
                    Day_ID: fry_checked === true ? 5 : 0,
                    Slot_Start: fry_start, Slot_End: fry_end,
                    Slot_Start2: fry_start2, Slot_End2: fry_end2,

                },
                {
                    Day_ID: sat_checked === true ? 6 : 0,
                    Slot_Start: sat_start, Slot_End: sat_end,
                    Slot_Start2: sat_start2, Slot_End2: sat_end2,

                },
                {
                    Day_ID: sun_checked === true ? 7 : 0,
                    Slot_Start: sun_start, Slot_End: sun_end,
                    Slot_Start2: sun_start2, Slot_End2: sun_end2,
                }
            ]

        }
         const formData = new FormData();
        for ( var key in JSONData ) 
        {
            if(key!=='days')
                 formData.append(key, JSONData[key]);
            else
               formData.append(key,JSON.stringify(JSONData[key]));
        }
        ////console.log(JSONData);
        let allowCustomertoPay = 0,min_amt=0,suggested_amt=0;
        if(document.getElementById('allowCustomertoPay').checked===true)
        {
            min_amt=document.getElementById('min_amt').value;
            suggested_amt=document.getElementById('suggested_amt').value;
            allowCustomertoPay=1;
        }
        formData.append('JM_User_Profile_Url', localStorage.getItem('JM_User_Profile_Url')); 
        formData.append('DA_Allow_Cust_Pay', allowCustomertoPay)
        formData.append('DA_Min_Amount', parseInt(min_amt))
        formData.append('DA_Suggested_Amont', parseInt(suggested_amt))
        var f = (document.getElementById('prop_up').files);

        if(f.length > 0)      
        {
           // console.log(f[0])
            formData.append('sampleFile', f[0])
            formData.append('DA_Type', 'image');
        }
    

        ////console.log(JSONData);
        //this.setState({btn_text:'Processing...',btnDisabled:true})
        document.getElementById('btn_update').disabled = true;
        document.getElementById('btn_update').innerHTML = 'Processing...';
        const data = await API.updateSchedule(formData);
        if (data.status > 0) {
            document.getElementById("msg_live").style.color = 'green';
            document.getElementById("msg_live").innerHTML = "Live video session setup is updated successfully. Please return to Profile to view it.";

            document.getElementById('btn_update').disabled = false;
            document.getElementById('btn_update').innerHTML = 'Update';
        }
        else {
            API.minusResponse(data);
            document.getElementById("msg_live").style.color = 'red';
            document.getElementById('btn_update').disabled = false;
            // this.setState({btn_text:'Update',btnDisabled:false})
            document.getElementById("msg_live").innerHTML = data.msg;
            document.getElementById('btn_update').innerHTML = 'Update';
        }
    }
    inRange = (x, min, max) => {
        return ((x - min) * (x - max) <= 0);
    }
    time_convert = (num) => {
        const hours = Math.floor(num / 60);
        const minutes = num % 60;
        return `${hours}:${minutes}`;
    }
    time_convert_number = (time) => {
        let h = moment(time, "h:mm A").format("HH");
        let m = moment(time, "h:mm A").format("mm");
        if (isNaN(h)) h = 0;
        if (isNaN(m)) m = 0;
        const hours = Math.floor(h * 60);
        const minutes = Math.round(m);
        return hours + minutes;
    }


    onChangeDays = (e) => {
        //console.log(e.target.id)
        //this.setState({
        //     [e.target.name]:e.target.checked
        //})

    }
    handleChange = (e) => {
        // document.getElementsByName(e.target.name)=e.target.value;

    }
    handlePrice = (e) => {
        // if (!((e.keyCode > 95 && e.keyCode < 106)
        //     || (e.keyCode > 47 && e.keyCode < 58)
        //     || e.keyCode === 8)) {
        //     return false;
        // }

       // document.getElementById('EM_Price').value=0;        
        let val=isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        let fee=val * API.razorPayTax();
        let gst=fee * API.razorPayGST();         
        let razorPay=(fee+gst); // 1.65 + 0.297
        let TenPer=(val - razorPay) * 10/100; // 10 if val is 100                  
        let charges= val - razorPay - TenPer; // 100 - 1.65- 0.297                      
        let chargesInfo="You'll receive INR "+ charges.toFixed(2) + " ";
        if(val > 0)
        {  
          document.getElementById('charges_info').innerHTML=chargesInfo;
          document.getElementById('charges_info').style.display='inline-block';
          document.getElementById('info_charges').style.display='block';
          
        }
        else
        {
            document.getElementById('charges_info').innerHTML='';
            document.getElementById('charges_info').style.display='none';
            document.getElementById('info_charges').style.display='none';
         
        }
    }
    onchangeCheck=(e)=>{

        if(e.target.checked===true)
        {       

          document.getElementById("showDiv").style.display="block";
          document.getElementById("EM_Price").value=0;
          document.getElementById("EM_Price").disabled=true;
          document.getElementById('charges_info').innerHTML='';
          document.getElementById('charges_info').style.display='none';
          document.getElementById('info_charges').style.display='none';
        }
        else
        {
          
          document.getElementById("showDiv").style.display="none";    
          document.getElementById("EM_Price").disabled=false;
         
        }
      }
      removeCover=(e)=>{    
        document.getElementById('prop_up').value='';   
        document.getElementById('img_div').style.display='none'; 

        var flagData={
            DA_Collection:'[]',
            DA_ID:this.state.tableId
        }

        const flag=API.encryptData(flagData);
        var JSONdata = {
          flag: flag
        };
     

        const data=API.postData(JSONdata,'removeVideoCover')
        if(data.status===1)
        {
            document.getElementById("cover_img").src='';
            document.getElementById("img_div").style.display='block';  
        }
        
           
      }
      imageonChange = (e) => 
      {
        if( typeof e.target.files!=='undefined' && e.target.files.length > 0)
        {
            var files = e.target.files[0];      
            var fileUrl = window.URL.createObjectURL(files);      
            document.getElementById("cover_img").src=fileUrl;
            document.getElementById("img_div").style.display='block';            
        }
     
      }
      isConfirm = (e) => {      
        e.preventDefault();
         confirmAlert({
         title: 'Confirm Change',
         message: 'Are you sure you want to update schedule?',
         buttons: [
             {
             label: 'Yes',
             onClick: () => this.handleSubmit(e)
             },
             {
             label: 'No',
             onClick: () => console.log('')
             }
         ],
         closeOnEscape: false,
         closeOnClickOutside: false,
         });
      
   };

   hidePopover=()=>{
    document.getElementById("popover-basic").style.display='none';
}


        profile = () => {            
                this.props.history.push("/me");
        }
    render() {
        //console.log(this.time_convert(1240));  
        // console.log(this.time_convert_number(12,40,'pm'))
        //console.log(this.time_convert_number(14,40,'pm'))
       
        
       
        //let chargesMessage="You receive 90% of the transaction value minus a 2% transaction fee that is collected by our payment provider.";
       // let chargesMessage = API.chargesMessage();
        
       
        
       



        return (
            <>
                <ProfileHeader />
                <div>
                    <div className="direct-access">
                        {/* <a href="/premium-feature" className="btnCropSave" style={{ marginTop: '10px' }}>
                                            <ArrowBackIcon />
                                            Back to premium-feature
                                        </a> */}
                        <div className="container">
                            <form onSubmit={this.isConfirm}>
                                <div className="row">
                                    <div className="col-md-8 offset-md-2">
                                        <div className="heading text-center">
                                            <h3>Update live video session</h3>
                                            <input type="hidden" id="hiddenText" />
                                            <button  onClick={this.profile} className="btnCropSave" style={{margin:'auto',marginTop:'10px'}}>
                                                <ArrowBackIcon/>
                                                Back to profile                          
                                            </button>
                                        </div>
                                    </div>


                                    <div className="col-md-8 offset-md-2">
                                        <div className="direct-access-pop" style={{ backgroundColor: '#fff', padding: '20px',border:'1px solid #f0f0f0' }}>
                                            <div className="row">

                                            <div className="col-md-12">
                                                    <label class="up-ico" for="prop_up">Upload cover photo</label>
                                                    <input type="file" id="prop_up" accept="image/*" name="photo" style={{ display: 'none' }}  onChange={this.imageonChange}/>

                                                </div>
                                          
                                                              
                                                                  
                                                                     <div className="col-md-12" id="img_div">
                                                                             <div className="img-grid">  
                                                                                <img className="img-thumbnail-custom" id="cover_img" width="200px"  type="image/*" alt="" >
                                                                                </img>
                                                                                <div className="cls" onClick={this.removeCover}>x</div>
                                                                                </div>          
                                                                         </div>
                                     


                                                <div className="col-md-6">
                                                    <label className="lab">Title</label>
                                                    <input type="text" className="form-control" name="EM_Title" placeholder="Set Title" onChange={this.handleChange} />
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="lab">Description</label>
                                                    <input type="text" className="form-control" name="EM_Desc" placeholder="Write a description" onChange={this.handleChange} />
                                                </div>

                                                <div className="col-md-12">
                                                <label className="lab">Automated Email Message</label>
                                                    <textarea className="form-control area" name="EM_Mail_Text" placeholder="Write a brief message to be shown in the email confirmation." onChange={this.handleChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="lab">Time duration</label>
                                                    <select className="form-control" name="EM_Duration" disabled onChange={this.handleChange}>
                                                        <option value="15">15 mins</option>
                                                        <option value="30">30 mins</option>
                                                        <option value="45">45 mins</option>
                                                        <option value="60">60 mins</option>
                                                        <option value="90">90 mins</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="lab">Date Range</label>
                                                    <select className="form-control" name="EM_Plan_Days" onChange={this.handleChange}>
                                                        <option value="7">7 Days</option>
                                                        <option value="30">30 Days</option>
                                                        <option value="60">60 Days</option>
                                                        <option value="90">90 Days</option>
                                                        <option value="180">180 Days</option>
                                                        <option value="365">365 Days</option>
                                                    </select>
                                                </div>


                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label className="lab">Set Hours</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="row timebook">
                                                    <div className="col-md-2 daycheck">
                                                        <input type="checkbox" id="mon" name="mon_checked" value="1" onChange={this.onChangeDays} />
                                                        <label for="mon">
                                                            MON
                                                        </label>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">First Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="mon_start" placeholder="Start Time" />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="mon_end" placeholder="End Time" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="mon_start2" placeholder="Start Time" />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="mon_end2" placeholder="End Time" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="row timebook">
                                                    <div className="col-md-2 daycheck">

                                                        <input type="checkbox" id="tue" name="tue_checked" value="2" onChange={this.onChangeDays} />
                                                        <label for="tue">
                                                            TUE
                                                        </label>

                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">First Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="tue_start" placeholder="Start Time" />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="tue_end" placeholder="End Time" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="tue_start2" placeholder="Start Time" />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="tue_end2" placeholder="End Time" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* wed */}

                                            <div className="col-md-12">
                                                <div className="row timebook">
                                                    <div className="col-md-2 daycheck">
                                                        <input type="checkbox" id="wed" name="wed_checked" value={3} onChange={this.onChangeDays} />
                                                        <label for="wed">
                                                            WED
                                                        </label>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">First Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="wed_start" placeholder="Start Time" />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="wed_end" placeholder="End Time" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="wed_start2" placeholder="Start Time" />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="wed_end2" placeholder="End Time" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="row timebook">
                                                    <div className="col-md-2 daycheck">
                                                        <input type="checkbox" id="thus" name="thus_checked" value="4" onChange={this.onChangeDays} />
                                                        <label for="thus">
                                                            THURS
                                                        </label>
                                                    </div>



                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">First Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="thus_start" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="thus_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="thus_start2" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="thus_end2" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* fry */}
                                            <div className="col-md-12">
                                                <div className="row timebook">
                                                    <div className="col-md-2 daycheck">
                                                        <input type="checkbox" id="fry" name="fry_checked" value="5" onChange={this.onChangeDays} />
                                                        <label for="fry">
                                                            FRI
                                                        </label>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">First Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="fry_start" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="fry_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="fry_start2" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="fry_end2" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="row timebook">
                                                    <div className="col-md-2 daycheck">
                                                        <input type="checkbox" id="sat" name="sat_checked" value="6" onChange={this.onChangeDays} />
                                                        <label for="sat">
                                                            SAT
                                                        </label>
                                                    </div>


                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">First Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="sat_start" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="sat_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="sat_start2" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="sat_end2" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* sun */}
                                            <div className="col-md-12">
                                                <div className="row timebook">
                                                    <div className="col-md-2 daycheck">
                                                        <input type="checkbox" id="sun" name="sun_checked" value="7" onChange={this.onChangeDays} />
                                                        <label for="sun">
                                                            SUN
                                                        </label>
                                                    </div>

                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">First Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="sun_start" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15}  format="h:mm a" name="sun_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15} format="h:mm a"  name="sun_start2" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker minuteStep={15} format="h:mm a"   name="sun_end2" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="lab">Price</label>
                                                    <input type="text"  title="" className="form-control" 
                                                     onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    name="EM_Price" id="EM_Price"  placeholder="Set Price" onChange={this.handlePrice} />
                                                </div>
                                                <div className="col-md-6 d-flex align-items-center">

                                                     
                                                 
                                                            <div id="info_charges" className="tool_hover">
                                                                <div className="priceTooltip">                                                                                                                           
                                                                 {API.chargesMessage()}                                                       
                                                                </div>  
                                                                <p style={{fontFamily: 'consolas', fontSize: '13px',textTransform: 'capitalize'}}>
                                                                <span id="charges_info"></span>
                                                                    <i class="fa fa-question-circle" aria-hidden="true" style={{display: 'inline-block',fontSize: '23px',color: 'gray'}}></i>
                                                                </p>                                                       
                                                            </div>
  
                                                    
                                                </div>
                                        

                                                                                        {/* message info */}
                                                      {/* <div className="col-md-6 desktopCharge">
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
                                                            <div className="col-md-6 mobileCharge" style={{fontFamily: 'consolas', fontSize: '13px',textTransform: 'capitalize'}}>
                                                                    &nbsp;{this.state.chargesInfo}
                                                                    <OverlayTrigger  className="mobile" style={chargesStyle} trigger="click" placement="top" overlay={popover2}>           
                                                                        <i class="fa fa-question-circle" aria-hidden="true"  style={iconStyle}></i>                     
                                                                    </OverlayTrigger >  
                                                                </div>
   */}


                                            </div>
                                           
                                            <div className="row">
                                                    <div className="col-md-12">
                                                            <label >
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
                                                        <label class="switch" for="allowCustomertoPay">
                                                        <input type="checkbox" id="allowCustomertoPay"  onChange={this.onchangeCheck} />
                                                            <div class="slider round"></div>
                                                        </label>
                                                    </div>

                                                            <div id="showDiv">  
                                                                    <div className="col-md-6">
                                                                        <label >
                                                                                <strong>  
                                                                                    Minimum Amount 
                                                                                </strong>     
                                                                        </label>
                                                                    <input type="text" name="min_amt" id="min_amt"
                                                                    onChange={this.handleChange} 
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
                                                                <input type="text" name="suggested_amt"  id="suggested_amt"
                                                                onChange={this.handleChange} 
                                                                className="form-control" placeholder="Enter Price" 
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                    }
                                                                }}
                                                                />       
                                                                </div>
                                                            </div>
                                                   
                                                            
                                             </div>
                                            <div className="btun-box">
                                                <button className="btun" id="btn_update">Update</button>
                                                <a href="/me" className="btun" style={{textDecoration:'none'}}>Cancel</a>
                                                <p id="msg_live" style={{ color: 'red' }}></p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <FooterClass />
                <ToastAlert title={this.state.title} hideToast={this.hideToast}
                    msg={this.state.msg} show={this.state.showAlert}
                    image={this.state.logo} showToast={this.showToast} />

            </>
        );
    }

}

export default EditLiveVideoSessionPage;