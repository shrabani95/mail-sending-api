import React, { Component } from 'react';

import FooterClass from '../header_footer/FooterClass';

import Button from '@material-ui/core/Button';

import ProfileHeader from '../header_footer/ProfileHeader';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import API from '../services/API';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
class LiveVideoSessionPage extends Component {
    constructor(props) {
        super(props)
        if (!this.props.location.state) {
            window.location.href = '/';
        }
        this.state = {
            directAccess: this.props.location.state.directAccess,
            JM_ID: this.props.location.state.JM_ID,
            JM_User_Profile_Url: this.props.location.state.JM_User_Profile_Url,
            showAlert: true,
            EM_Title: '',
            EM_Desc: '',
            EM_Mail_Text: '',
            EM_Duration: 15,
            EM_Plan_Days: 7,
            EM_Price: 0,
            tableId: 0,
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
            btn_text: 'Add',
            cover_Image_video: '', coverImageorVideo: null,
            allowCustomertoPay: 0,
            min_amt: '',
            suggested_amt: '',
            showDiv: false,
            min_amt_message: 'You will receive 85% of the amount your follower pays for the product',
            chargesInfo:'',
            showIconCharges:'none',
        }
    }
    componentDidMount() {
    }
    startTime = (time, timeString, e) => {
        ////console.log(timeString);
        const stringTime = timeString.replace(" ", ':')
        ////console.log(stringTime);
        // this.setState({
        //     [e.target.name]:stringTime
        // })

    }
    startTime2 = (time, timeString, e) => {
        //console.log(timeString);
        //console.log(moment(timeString[0], "h:mm A").format("HH:mm"));

        let startHr = moment(timeString[0], "h:mm A").format("HH");
        let startMin = moment(timeString[0], "h:mm A").format("mm");

        let endHr = moment(timeString[1], "h:mm A").format("HH");
        let endMin = moment(timeString[1], "h:mm A").format("mm");

        // let startTimeNumber=this.time_convert_number(start);
        const startTime = timeString[0].replace(" ", ':')
        const endTime = timeString[1].replace(" ", ':')
        //console.log(startTime);       
        //console.log(endTime);
        // this.setState({
        //     [e.target.name]:stringTime
        // })

    }
    handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(this.state)
        document.getElementById('msg_live').innerHTML = '';
        document.getElementById("msg_live").style.color = 'red';
        if (this.state.EM_Title.length === 0) {
            document.getElementById('msg_live').innerHTML = '* Enter Title';
            return false;
        }
        // if(this.state.EM_Desc.length===0)
        // {
        //     document.getElementById('msg_live').innerHTML='* Enter Description';
        //     return false;
        // }
        if (this.state.EM_Mail_Text.length === 0) {
            document.getElementById('msg_live').innerHTML = '* Enter Mail Text';
            return false;
        }

      

        var days = this.state.mon_checked === true ? true :
            this.state.tue_checked === true ? true :
                this.state.wed_checked === true ? true :
                    this.state.thus_checked === true ? true :
                        this.state.fry_checked === true ? true :
                            this.state.sat_checked === true ? true :
                                this.state.sun_checked === true ? true
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
        if (this.state.mon_checked === true) {
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

        if (this.state.mon_checked === true && (
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

        if (this.state.tue_checked === true) {
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


        if (this.state.tue_checked === true && (
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
        if (this.state.wed_checked === true) {
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




        if (this.state.wed_checked === true && (
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
        if (this.state.thus_checked === true) {
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


        if (this.state.thus_checked === true && (
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
        if (this.state.fry_checked === true) {
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


        if (this.state.fry_checked === true && (
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
        if (this.state.sat_checked === true) {
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


        if (this.state.sat_checked === true && (
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

        if (this.state.sun_checked === true) {
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


        if (this.state.sun_checked === true && (
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
        var price = parseInt(this.state.EM_Price)

        if (isNaN(price)) price = 0;
        if (price < 0) {
            document.getElementById('msg_live').innerHTML = '* Enter Price';
            return false;
        }
        if (price === 0) {
           // document.getElementById('msg_live').innerHTML = '* Enter Price';
           // return false;
        }
      
        //27-aug-2021 dynamic pricing
        if(this.state.allowCustomertoPay===1)
        {
            if( isNaN(parseInt(this.state.min_amt)) || parseInt(this.state.min_amt) < 0 )
            {
                document.getElementById('msg_live').style.color='red';
                document.getElementById('msg_live').innerHTML='* Enter minimum amount';
                return false;
            }
        }


        var JSONData = {
            JM_ID: this.state.JM_ID,
            EM_Title: this.state.EM_Title,
            EM_Desc: this.state.EM_Desc,
            EM_Mail_Text: this.state.EM_Mail_Text,
            EM_Duration: this.state.EM_Duration,
            EM_Plan_Days: this.state.EM_Plan_Days,
            EM_Price: this.state.EM_Price,
            days: [
                {
                    Day_ID: this.state.mon_checked === true ? 1 : 0,
                    Slot_Start: mon_start, Slot_End: mon_end,
                    Slot_Start2: mon_start2, Slot_End2: mon_end2,
                },
                {
                    Day_ID: this.state.tue_checked === true ? 2 : 0,
                    Slot_Start: tue_start, Slot_End: tue_end,
                    Slot_Start2: tue_start2, Slot_End2: tue_end2
                },
                {
                    Day_ID: this.state.wed_checked === true ? 3 : 0,
                    Slot_Start: wed_start, Slot_End: wed_end,
                    Slot_Start2: wed_start2, Slot_End2: wed_end2
                },
                {
                    Day_ID: this.state.thus_checked === true ? 4 : 0,
                    Slot_Start: thus_start, Slot_End: thus_end,
                    Slot_Start2: thus_start2, Slot_End2: thus_end2
                },
                {
                    Day_ID: this.state.fry_checked === true ? 5 : 0,
                    Slot_Start: fry_start, Slot_End: fry_end,
                    Slot_Start2: fry_start2, Slot_End2: fry_end2,

                },
                {
                    Day_ID: this.state.sat_checked === true ? 6 : 0,
                    Slot_Start: sat_start, Slot_End: sat_end,
                    Slot_Start2: sat_start2, Slot_End2: sat_end2,

                },
                {
                    Day_ID: this.state.sun_checked === true ? 7 : 0,
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
        formData.append('JM_User_Profile_Url', localStorage.getItem('JM_User_Profile_Url'));
    


        formData.append('DA_Allow_Cust_Pay', this.state.allowCustomertoPay)
        formData.append('DA_Min_Amount', parseInt(this.state.min_amt))
        formData.append('DA_Suggested_Amont', parseInt(this.state.suggested_amt))
        if (this.state.coverImageorVideo !== null && this.state.cover_Image_video !== '') 
        {
            formData.append('sampleFile', this.state.coverImageorVideo)
            formData.append('DA_Type', 'image');
        }
    


        this.setState({ btn_text: 'Processing...', btnDisabled: true })
        const data = await API.createScheduleFormData(formData);
        if (data.status > 0) {
            this.setState({ btn_text: 'Add', btnDisabled: false })
            document.getElementById("msg_live").style.color = 'green';
            document.getElementById("msg_live").innerHTML = "Live video session is setup successfully. Please return to Profile to enable it";
            this.setState({
                EM_Title: '',
                EM_Desc: '',
                EM_Mail_Text: '',
                EM_Duration: 15,
                EM_Plan_Days: 7,
                EM_Price: 0,
                mon_checked: false, mon_start: '', mon_end: '',
                tue_checked: false, tue_start: '', tue_end: '',
                wed_checked: false, wed_start: "", wed_end: "",
                thus_checked: false, thus_start: "", thus_end: "",
                fry_checked: false, fry_start: "", fry_end: "",
                sat_checked: false, sat_start: "", sat_end: "",
                sun_checked: false, sun_start: "", sun_end: "",
            })
            API.clearVideoField();
            window.location.href = "me";
        }
        else {
            API.minusResponse(data);
            this.setState({ btn_text: 'Add', btnDisabled: false })
            document.getElementById("msg_live").innerHTML = data.msg;
        }
    }
    inRange = (x, min, max) => {
        return ((x - min) * (x - max) <= 0);
    }
    time_convert = (num) => {
        const hours = Math.floor(num / 60);
        let minutes = "";
        minutes = (num % 60);
        //console.log(minutes.toString().length);
        if (minutes.toString().length === 2)
            minutes = (num % 60);
        else
            minutes = "0" + (num % 60);

        return `${hours}:${minutes}`;
    }
    time_convert_number = (time) => {
        //1 : 7
        let h = moment(time, "h:mm A").format("HH");
        let m = moment(time, "h:mm A").format("mm");
        if (isNaN(h)) h = 0;
        if (isNaN(m)) m = 0;
        const hours = Math.floor(h * 60);   //180
        const minutes = Math.floor(m); // 55 * 
        //console.log(minutes)
        return hours + minutes;
    }


    onChangeDays = (e) => {
        //console.log(e.target.id)  
        this.setState({
            [e.target.name]: e.target.checked
        })

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        let val=isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        if(val > 0)
        {
            if(e.target.name==='EM_Price')
            {
                let fee=val * API.razorPayTax();
                let gst=fee * API.razorPayGST();         
                let razorPay=(fee+gst); // 1.65 + 0.297
                let TenPer=(val - razorPay) * 10/100; // 10 if val is 100                  
                let charges= val - razorPay - TenPer; // 100 - 1.65- 0.297                      
                let chargesInfo="You'll receive INR "+ charges.toFixed(2) + " ";                
              let showIconCharges = 'block';
              this.setState({ chargesInfo, showIconCharges });
            }
          
        }
        else
        {
            if(e.target.name==='EM_Price')
            {
                let chargesInfo="";
                let showIconCharges = 'none';
                this.setState({ chargesInfo, showIconCharges });
            }
        }
    }


    imageonChange = (e) => {
        const file = e.target.files[0];
        this.setState({ coverImageorVideo: e.target.files[0] });
        this.setState({
            cover_Image_video: URL.createObjectURL(file),
            videoFile: null,
            videoData: ''
        });

    }
    onchangeCheck=(e)=>{

        if(e.target.checked===true)
        {
          this.setState({
            allowCustomertoPay:1,
            showDiv:true,
            EM_Price:0
          })
         // document.getElementById("EM_Price").value=0;
          document.getElementById("EM_Price").disabled=true;
          let chargesInfo="";
          let showIconCharges = 'none';
          this.setState({ chargesInfo, showIconCharges });
        }
        else
        {
          this.setState({
            allowCustomertoPay:0,
            showDiv:false
          })
          document.getElementById("EM_Price").disabled=false;
      
        }
      }
      hidePopover=()=>{
        document.getElementById("popover-basic").style.display='none';
    }
      removeCover=(e)=>{
        this.setState({cover_Image_video:'',coverImageorVideo:null })
        document.getElementById('prop_up').value='';
      }

      DirectAccess = () => {

     
        this.props.history.push("/premium-feature");
        this.props.history.push({
          state: {
            directAccess: this.props.location.state.directAccess           
          }
        })
        //}
    
        //console.log(this.props);
      }
    render() {
        console.log(this.time_convert(0));  
        // //console.log(this.time_convert(235));  
        //console.log(this.time_convert_number("1:07 am")) //67
        //console.log(this.time_convert_number('3:55 pm')) //235

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
        let chargesMessage = API.chargesMessage();
        
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
          marginTop: "9%",
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
                <ProfileHeader />
                <div>
                    <div className="direct-access">
                              
                        <div className="container">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-8 offset-md-2">
                                        <div className="heading text-center">
                                            <h3>Add live video session</h3>
                                            <input type="hidden" id="hiddenText" />
                                            <button  onClick={this.DirectAccess} className="btnCropSave" style={{margin:'auto',marginTop:'10px'}}>
                                                <ArrowBackIcon/>
                                                Back to monetization features                             
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
                                          
                                                                {/* <img src={"images/template_2.jpg"} /> */}
                                                                {
                                                                 this.state.cover_Image_video!=='NA' && this.state.cover_Image_video!=='' ?    
                                                                     <div className="col-md-12">
                                                                             <div className="img-grid">  
                                                                                <img className="img-thumbnail-custom" width="200px"  src={this.state.cover_Image_video} type="image/*" >                                   
                                                                                </img>
                                                                                <div className="cls" onClick={this.removeCover}>x</div>
                                                                                </div>          
                                                                         </div>
                                                                        : null
                                                                }
                                                               
                                            




                                                <div className="col-md-6">
                                                    <label className="lab">Title</label>
                                                    <input type="text" className="form-control" name="EM_Title" value={this.state.EM_Title} placeholder="Set Title" onChange={this.handleChange} />
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="lab">Description</label>
                                                    <input type="text" className="form-control" name="EM_Desc" value={this.state.EM_Desc} placeholder="Write a description" onChange={this.handleChange} />
                                                </div>

                                                <div className="col-md-12">
                                                    <label className="lab">Automated Email Message</label>
                                                    <textarea className="form-control area" name="EM_Mail_Text" value={this.state.EM_Mail_Text} placeholder="Write a brief message to be shown in the email confirmation." onChange={this.handleChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="lab">Time duration</label>
                                                    <select className="form-control" name="EM_Duration" value={this.state.EM_Duration} onChange={this.handleChange}>
                                                        <option value="15">15 mins</option>
                                                        <option value="30">30 mins</option>
                                                        <option value="45">45 mins</option>
                                                        <option value="60">60 mins</option>
                                                        <option value="90">90 mins</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="lab">Date Range</label>
                                                    <select className="form-control" name="EM_Plan_Days" value={this.state.EM_Plan_Days} onChange={this.handleChange}>
                                                        <option value="7">7 Days</option>
                                                        <option value="30">30 Days</option>
                                                        <option value="60">60 Days</option>
                                                        <option value="90">90 Days</option>
                                                        <option value="180">180 Days</option>
                                                        <option value="365">365 Days</option>
                                                    </select>
                                                </div>
                                                {/* <div className="col-md-6">
                                                    <label className="lab">Select Time Zone</label>

                                                    <select name="EM_Time_Zone" id="EM_Time_Zone" className="form-control" value={this.state.EM_Time_Zone} onChange={this.handleChange}>
                                                        <option value="-12:00">(GMT -12:00) Eniwetok, Kwajalein</option>
                                                        <option value="-11:00">(GMT -11:00) Midway Island, Samoa</option>
                                                        <option value="-10:00">(GMT -10:00) Hawaii</option>
                                                        <option value="-09:50">(GMT -9:30) Taiohae</option>
                                                        <option value="-09:00">(GMT -9:00) Alaska</option>
                                                        <option value="-08:00">(GMT -8:00) Pacific Time (US &amp; Canada)</option>
                                                        <option value="-07:00">(GMT -7:00) Mountain Time (US &amp; Canada)</option>
                                                        <option value="-06:00">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</option>
                                                        <option value="-05:00">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</option>
                                                        <option value="-04:50">(GMT -4:30) Caracas</option>
                                                        <option value="-04:00">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option>
                                                        <option value="-03:50">(GMT -3:30) Newfoundland</option>
                                                        <option value="-03:00">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
                                                        <option value="-02:00">(GMT -2:00) Mid-Atlantic</option>
                                                        <option value="-01:00">(GMT -1:00) Azores, Cape Verde Islands</option>
                                                        <option value="+00:00">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
                                                        <option value="+01:00">(GMT +1:00) Brussels, Copenhagen, Madrid, Paris</option>
                                                        <option value="+02:00">(GMT +2:00) Kaliningrad, South Africa</option>
                                                        <option value="+03:00">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
                                                        <option value="+03:50">(GMT +3:30) Tehran</option>
                                                        <option value="+04:00">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
                                                        <option value="+04:50">(GMT +4:30) Kabul</option>
                                                        <option value="+05:00">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
                                                        <option value="+05:50">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
                                                        <option value="+05:75">(GMT +5:45) Kathmandu, Pokhara</option>
                                                        <option value="+06:00">(GMT +6:00) Almaty, Dhaka, Colombo</option>
                                                        <option value="+06:50">(GMT +6:30) Yangon, Mandalay</option>
                                                        <option value="+07:00">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
                                                        <option value="+08:00">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
                                                        <option value="+08:75">(GMT +8:45) Eucla</option>
                                                        <option value="+09:00">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
                                                        <option value="+09:50">(GMT +9:30) Adelaide, Darwin</option>
                                                        <option value="+10:00">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
                                                        <option value="+10:50">(GMT +10:30) Lord Howe Island</option>
                                                        <option value="+11:00">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
                                                        <option value="+11:50">(GMT +11:30) Norfolk Island</option>
                                                        <option value="+12:00">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
                                                        <option value="+12:75">(GMT +12:45) Chatham Islands</option>
                                                        <option value="+13:00">(GMT +13:00) Apia, Nukualofa</option>
                                                        <option value="+14:00">(GMT +14:00) Line Islands, Tokelau</option>
                                                    </select>
                                                </div> */}


                                            </div>
                                            <div className="row">

                                                <div className="col-md-12">
                                                    <label className="lab">Set Hours</label>
                                                    <label className="lab" style={{ float: 'right' }}>(Time Zone : IST)</label>
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
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="mon_start" placeholder="Start Time" />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="mon_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="mon_start2" placeholder="Start Time" />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="mon_end2" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* tue */}
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
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="tue_start" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="tue_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="tue_start2" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="tue_end2" placeholder="End Time" onChange={this.startTime} />
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
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="wed_start" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="wed_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="wed_start2" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="wed_end2" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* THUS */}
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
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="thus_start" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="thus_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="thus_start2" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="thus_end2" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Fri */}
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
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="fry_start" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="fry_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="fry_start2" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="fry_end2" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* sat */}
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
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="sat_start" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="sat_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="sat_start2" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="sat_end2" placeholder="End Time" onChange={this.startTime} />
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
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="sun_start" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}   minuteStep={15} format="h:mm a" name="sun_end" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="lab2">Second Slot</label>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}    minuteStep={15} format="h:mm a" name="sun_start2" placeholder="Start Time" onChange={this.startTime} />
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <TimePicker defaultOpenValue={moment('00:00 am', 'HH:mm a')}    minuteStep={15} format="h:mm a" name="sun_end2" placeholder="End Time" onChange={this.startTime} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="lab">Price</label>
                                                    <input type="text"  className="form-control" title="" id="EM_Price" name="EM_Price" value={this.state.EM_Price} placeholder="Set Price" onChange={this.handleChange}
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                           
                                              {/* message info */}
                                                            <div className="col-md-6 desktopCharge">
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
                                             </div>

                                           


                                            <div className="btun-box row">
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
                                                        <label className="switch" for="allowCustomertoPay">
                                                            <input type="checkbox" id="allowCustomertoPay" onChange={this.onchangeCheck} />
                                                            <div className="slider round"></div>
                                                        </label>
                                                    </div>
                                            {
                                                this.state.showDiv === true ?
                                                    <>
                                                        <div className="col-md-6">
                                                            <label >
                                                                <strong>
                                                                    Minimum Amount
                                                                </strong>
                                                            </label>
                                                            <input type="text" name="min_amt"
                                                                value={this.state.min_amt} onChange={this.handleChange}
                                                                className="form-control" placeholder="Enter Price"
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                            <p style={{ fontSize: '12px', fontWeight: '600' }}>{API.dynamicPriceMessage()}</p>
                                                        </div>
                                                        <div className="col-md-6" style={{ display: 'none' }}>
                                                            <label >
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
                                                <button className="btun" disabled={this.state.btnDisabled}>{this.state.btn_text}</button>
                                                <a href="/me" className="btun" style={{ textDecoration: 'none' }}>Cancel</a>
                                                <p id="msg_live" style={{ color: 'red' }}></p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <Toast className="m-1 alertBootstrap" bg={'danger'} 
                        id="div_toats" style={{display:'block'}}>
                        <Toast.Header style={{justifyContent:'space-between'}}>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" onClick={(e)=>document.getElementById().style.display='none'}/>
                        <div>
                        <strong className="me-auto">Message</strong>
         
                        </div>
                        </Toast.Header>
                        <Toast.Body className={'danger' === 'Dark' && 'text-white'}>
                        <span id="msg_toast"></span>
                        </Toast.Body>
                    </Toast> */}


                {/* <ToastAlert title={this.state.title} hideToast={this.hideToast}
                    msg={this.state.msg} show={this.state.showAlert}
                    image={this.state.logo} showToast={this.showToast} />
               */}

                <FooterClass />





            </>
        );
    }

}

export default LiveVideoSessionPage;