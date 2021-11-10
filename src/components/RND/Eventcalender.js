import React, { Component, useState, Form }from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import { Link,NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import { Calendar, momentLocalizer} from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import ProfileHeader from '../header_footer/ProfileHeader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import API  from '../services/API';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
class Eventcalender extends Component
{
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();  
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  calender=[];
  constructor(props) {
    super(props)
  
    this.state = {
       openModalAvailable:false,
       openModalBooking:false,
       available:[],
       calender:[],
       allSlot:[]
    }
  }
  
     
     async  componentDidMount()
      {
        let  monthAndYear = document.getElementById("monthAndYear");       
        //console.log( this.currentMonth)
        this.getCalender(this.currentMonth);
       
      }
      async getCalender(month)
      {
        var currMonth=month+1;
        currMonth=currMonth.toString().length===1 ? "0" + currMonth:currMonth;
        var JSONdata={
          yearMonthString:this.currentYear+"-"+currMonth+'-',
          currMonth:this.currentMonth+1
        }
        const data1=await API.postData(JSONdata,'getCalender');
        if(data1.status===1)
        {
          const resp=API.decryptJson(data1.flag);
          this.calender=resp.data;          
        }


        
      
        this.showCalendar(this.currentMonth, this.currentYear);
      }
   

     
     next=()=>{
        
          this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
          this.currentMonth = (this.currentMonth + 1) % 12;
          this.getCalender(this.currentMonth)
         // this.showCalendar(this.currentMonth, this.currentYear);
      }
      
      previous=()=> {

        this.currentYear  = (this.currentMonth === 0) ?  this.currentYear  - 1 :  this.currentYear ;
        this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;

        this.getCalender(this.currentMonth)
        //this.showCalendar(this.currentMonth,  this.currentYear );
      }
      
      jump=(e)=> {

        let selectMonth=document.getElementById("month").value;
        let selectYear=document.getElementById("yesr").value;
          this.currentYear = parseInt(selectYear);
          this.currentMonth = parseInt(selectMonth);
          this.showCalendar(this.currentMonth,  this.currentYear );
      }
      
      showCalendar=async (month, year)=> {
          var jsonData={
            month:month+1,year:year
          }
          const data=await API.postData(jsonData,'Get_All_Booking_By_Date_Month');
          let bookingData=[];
          if(data.status===1)
          {
            const resp=API.decryptJson(data.flag);
            bookingData=resp.bookingData;
          }
          
          // //console.log(this.calender)
          let firstDay = (new Date(year, month)).getDay();
      
         let tbl = document.getElementById("calendar-body"); // body of the calendar
      
          // clearing all previous cells
          tbl.innerHTML = "";
      
          // filing data about month and in the page via DOM.
          let  monthAndYear = document.getElementById("monthAndYear");
          monthAndYear.innerHTML = this.months[month] + " " + year;

          let selectYear = document.getElementById("year");
          let  selectMonth = document.getElementById("month");

          selectYear.value = year;
          selectMonth.value = month;
      
          // creating all cells
          let date = 1;
          for (let i = 0; i < 6; i++) 
          {
              // creates a table row
              let row = document.createElement("tr");
              let cell=""; let cellText="";
              //creating individual cells, filing them up with data.
              for (let j = 0; j < 7; j++) 
              {
                  if (i === 0 && j < firstDay) 
                  {
                      cell = document.createElement("td");
                      cellText = document.createTextNode("");
                      cell.appendChild(cellText);
                      row.appendChild(cell);
                  }
                  else if (date > this.daysInMonth(month, year))
                  {
                      break;
                  }      
                  else
                  {
                      cell = document.createElement("td");                
                      var h = document.createElement("H4");                 
                      var t = document.createTextNode(date);
                      h.appendChild(t);

                          var btnAvailable = document.createElement("BUTTON");  
                          btnAvailable.innerHTML = "View";     
                          btnAvailable.onclick=this.openAvailable;
                          btnAvailable.setAttribute("data-id", date);
                          btnAvailable.setAttribute("title", "Available Schedule");
                          btnAvailable.setAttribute("class", 'calenderBtn');
                      

                    
                          if (date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) 
                          {
                              cell.classList.add("today");
                          } 
                          
                          //color if any schedule created on this date
                          if(this.calender && this.calender.length > 0)
                          {
                            let  monthNumber=month + 1;
                            monthNumber= monthNumber.toString().length===1 ? "0"+monthNumber.toString() : monthNumber.toString();
                            let curDateNumber=date.toString().length ===1? "0"+date.toString():date.toString();
                            let searchDate=this.today.getFullYear() + "-"+ monthNumber +"-"+ curDateNumber;

                           
                            let searchDate2= curDateNumber + "-"+ monthNumber +"-"+ this.today.getFullYear();
                            var varDate = new Date(searchDate2); //dd-mm-YYYY
                            var today = new Date();
                            
                            if(today >= varDate) 
                            {
                         
                                //console.log('current_date date is grater than specific_date')
                            }
                      
                            var span = document.createElement("span"); // no of booking   
                            var foundValue = this.calender.filter(obj=>obj.calDate===searchDate && obj.calDateSlot===searchDate);
                            if(foundValue.length > 0)
                            {   
      
                              if (date >= this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth())
                              {
                                cell.classList.add("scheduled"); 
                                cell.appendChild(btnAvailable)
                                cell.setAttribute("data-id",  searchDate);
                              } 
                              if (year === this.today.getFullYear() && month > this.today.getMonth())
                              {
                                cell.classList.add("scheduled"); 
                                cell.appendChild(btnAvailable)
                                cell.setAttribute("data-id",  searchDate);
                              } 

                               var foundObject= bookingData.filter(obj=>obj.calDay===date);
                                if(foundObject && foundObject.length > 0)                             
                                    span.innerHTML=foundObject[0].noOfBooking + " session(s)";
                            }

                           
                      
                          }

                            cell.appendChild(h);
                            cell.appendChild(span)
                           // cell.appendChild(btnBooked)
                            row.appendChild(cell);
                            date++;
                  }
      
      
              }
      
              tbl.appendChild(row); // appending each row into calendar body.
          }
      
      }
      
      
      // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
      daysInMonth=(iMonth, iYear)=> 
      {
          return 32 - new Date(iYear, iMonth, 32).getDate();
      }
      
      openBooking=(e)=>
      {
        
      }
      openAvailable=async (e)=>
      {
                  
                  var dateNumber = e.currentTarget.dataset.id
                  
                  let currentMonth=this.currentMonth+1;
                  var day=dateNumber.toString().length===1 ? "0"+ dateNumber:dateNumber;
                  var month=currentMonth.toString().length===1 ? "0"+currentMonth.toString(): currentMonth.toString();
                  if(isNaN(day)) day=0;
                  var flagData=
                  {
                    date:this.currentYear+"-"+month+"-"+day
                  }    
                
                  const flag=API.encryptData(flagData)
                  var  JSONdata={
                        flag:flag           
                    }
                  const response=await API.postData(JSONdata,'GetOpenSlots');
                  if(response.status===1)
                  {    
                      const resp=API.decryptJson(response.flag);
                        
                        if(resp && resp.length > 0)
                        {
                          //console.log(resp.available)
                          const data=resp;
                          let dropdown=[];
                          for (let i = 0; i < data.length; i++) 
                          {
                            let Duration=parseInt(data[i].Duration); if(isNaN(Duration)) Duration=0;
                            if(Duration > 0)
                            {
                                  
                                  let startSlotTime = data[i].startSlotTime.split(':');
                                  let start='';let end='';
                                  let start2='';let end2='';
                                  if(startSlotTime.length  > 0)
                                  {
                                    start=startSlotTime[0];
                                    if(startSlotTime[0].length===1)
                                    {
                                      start="0"+startSlotTime[0];
                                    }
                                    end=startSlotTime[1];
                                    if(startSlotTime[1].length===1)
                                    {
                                      end="0"+startSlotTime[1];
                                    }
                                  }
                                  let endSlotTime = data[i].endSlotTime.split(':');           
                                  if(endSlotTime.length > 0)
                                  {
                                    start2=endSlotTime[0];
                                    if(endSlotTime[0].length===1)
                                    {
                                      start2="0"+endSlotTime[0];
                                    }
                                    end2=endSlotTime[1];
                                    if(endSlotTime[1].length===1)
                                    {
                                      end2="0"+endSlotTime[1];
                                    }
                                  }
                        
                                  let newSlotStartTime=API.tConvert24To12(start+":"+end);
                                  let newSlotEndTime=API.tConvert24To12(start2+":"+end2);
                        
                                  data[i].startSlotTime=newSlotStartTime;
                                  data[i].endSlotTime=newSlotEndTime;
                            }
                          }
                            this.setState({
                              openModalAvailable :true, allSlot:data
                          })
                        } 
                  
                  }
      }
      onchangeCheck= async(item,e)=>{

        //set status as blocked for this id 
        var JSONdata={
          ES_ID:item.ES_ID
        }
        let ES_ID=item.ES_ID;
        const data=await API.postData(JSONdata,'blockedSlot');
        //console.log(data)
        if(data.status===1)
        {
          let filteredArray = this.state.allSlot.filter(item => item.ES_ID !== ES_ID)
          this.setState({allSlot: filteredArray});
          e.target.checked=false
        }

      }
      isConfirm = (item) =>e=> {
        confirmAlert({
          title: 'Confirm Change',
          message: 'Are you sure you want to remove this slot?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.onchangeCheck(item,e)
            },
            {
              label: 'No',
              onClick: () => e.target.checked=false
            }
          ],
          closeOnEscape: false,
          closeOnClickOutside: false,
        });
      };
      isConfirm_Dec = (item) =>e=> {

        confirmAlert({
          title: 'Confirm Change',
          message: 'Are you sure you want to decline this booking?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.doDeclined(item)
            },
            {
              label: 'No',
              onClick: () => e.target.checked=false
            }
          ],
          closeOnEscape: false,
          closeOnClickOutside: false,
        });
      };
 
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
                const API_url = process.env.REACT_APP_ROOT_URL + "admin/declinedFree";
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
        const API_url =process.env.REACT_APP_ROOT_URL + "admin/refund";
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
 
      render()
  {
    
            const events = [
            {
                start: moment().toDate(),
                end: moment().add(3, "days")
                  .toDate(),
                title: "Some title",
                
            },
        ];

      
     let openSlots;
     openSlots= this.state.allSlot &&  this.state.allSlot.map((item,i) =>{
         return (
          <div className="row calender-modal">
              { 
              item.ES_Status==='Open'?
                <>
                  <div className="col-md-12"><h6> {item.DA_Title}</h6></div>
                  <div className="col-md-5 col-6"><p><span>Start Time:</span> {item.startSlotTime}</p></div>             
                  <div className="col-md-5 col-6"><p><span>End Time:</span>{item.endSlotTime} </p></div> 
                  {/* <div className="col-md-6 col-8"><p><span>End Time:</span>{item.endSlotTime} </p></div>  */}
                  {/*  className="col-md-6 col-4" */}
                  <div className="col-md-2 col-12">
                          <label className="switch" for={"blockedTimeSlot_"+item.ES_ID}>
                              <input type="checkbox" id={"blockedTimeSlot_"+item.ES_ID} onChange={this.isConfirm(item)} />
                              <div className="slider round"></div>
                          </label>
                   </div> 
                </>     
              :
              null                    
              }
                  
          </div>  
         )
      })
    
      let bookedSlot;
      bookedSlot= this.state.allSlot &&  this.state.allSlot.map((item,i) =>{
          return (
           <div className="calender-modal">
               { 
               item.ES_Status==='Booked'?
                 <div className="booked_tr">
                   <button className="declineBooking" onClick={this.isConfirm_Dec(item)}>Cancel</button>
                  <div className="row calenderList">
                   <div className="col-md-6 "><p><span>Start Time:</span> {item.startSlotTime}</p></div>     
                   <div className="col-md-6 "><p><span>Duration:</span> {item.Duration}</p></div>
                  </div>
                  <div className="row calenderList">        
                   <div className="col-md-6 "><p><span>Name of user:</span>{item.BM_Name} </p></div>
                   <div className="col-md-6 "><p><span>Notes:</span>{item.BM_Instruction} </p></div>
                   </div> 
                   <div className="row calenderList">  
                    <div className="col-md-6 ">
                      <p><span>Video Link:</span> <a href={process.env.REACT_APP_ROOT_URL+"meet?id="+item.BM_Content_Sent} target="_black">Open</a> </p>
                    </div>
                    
                      <div className="col-md-6">
                         <p><a href={'/notify?type=Booked' }>Further Details</a> </p>
                      </div>  
                     
                  </div>
                 </div>     
               :
               null                    
               }
                   
           </div>  
          )
       })
  return (
      
    <>
    <ProfileHeader/>
   
        <div className="calender-sec">
          <div className="container">
            <div className="col-md-10 offset-md-1">
              <div className="big-calender">
                  <div className="calender-head">
                    <button id="previous" onClick={this.previous}>&lt;</button>
                    <h3 className="card-header" id="monthAndYear"></h3>
                    <button id="next" onClick={this.next}>&gt;</button>
                  </div>
              
                  <div className="calender-body">
                    <table className="table" id="calendar">
                      <thead>
                        <tr>
                          <th>Sun</th>
                          <th>Mon</th>
                          <th>Tue</th>
                          <th>Wed</th>
                          <th>Thu</th>
                          <th>Fri</th>
                          <th>Sat</th>
                        </tr>
                      </thead>
                     
                         <tbody id="calendar-body">

                        </tbody>
                    </table>

                       {/* <div className="form-inline">
                        <button className="btn btn-outline-primary col-sm-6" id="previous" onClick={this.previous}>Previous</button>

                          <button className="btn btn-outline-primary col-sm-6" id="next" onClick={this.next}>Next</button>
                        </div> */}
                        <br/>
                        <form className="form-inline" style={{display:'none'}}>
                            <label className="lead mr-2 ml-2" for="month">Jump To: </label>
                            <select className="form-control col-sm-4" name="month" id="month" onChange={this.jump}>
                                <option value="0">Jan</option>
                                <option value="1">Feb</option>
                                <option value="2">Mar</option>
                                <option value="3">Apr</option>
                                <option value="4">May</option>
                                <option value="5">Jun</option>
                                <option value="6">Jul</option>
                                <option value="7">Aug</option>
                                <option value="8">Sep</option>
                                <option value="9">Oct</option>
                                <option value="10">Nov</option>
                                <option value="11">Dec</option>
                            </select>


                            <label for="year"></label><select className="form-control col-sm-4" name="year" id="year" onChange={this.jump}>
                          
                            {/* <option value='2020'>2020</option> */}
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                             {/* <option value="2023">2023</option>
                            <option value="2024">2024</option> */}
                          
                        </select></form>
                        </div>  
                  </div>
              </div>
            </div>
          </div>
     
 
    {/* available*/}
    <Modal
          show={this.state.openModalAvailable}
          onHide={() => this.setState({ openModalAvailable: false })}
          aria-labelledby="example-modal-sizes-title-sm"
          backdrop="static"
          keyboard={false}
          size={'lg'}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
               View Schedule
            </Modal.Title>
          </Modal.Header>
          <Modal.Body> 
            <div className="calender-modal">
              
                         
                      <Tabs
                            
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3"
                            variant='tabs' 
                          >
                            <Tab eventKey="open" title="Open Slots" style={{maxHeight:'300px',overflowY:'auto',overflowX:'hidden',cursor:'pointer'}}>
                           
                            {openSlots}
                            </Tab>
                            <Tab eventKey="booked" title="Booked Slots" style={{maxHeight:'300px',overflowY:'auto',overflowX:'hidden',cursor:'pointer'}}>
                            {bookedSlot}
                            </Tab>
                          
                          </Tabs>
            </div> 
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
 {/* booking*/}
 <Modal
          show={this.state.openModalBooking}
          onHide={() => this.setState({ openModalBooking: false })}
          aria-labelledby="example-modal-sizes-title-sm"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
              Booking Schedule
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>          
              <div className="cropp-image" >
               

              </div>
              {/* <button className="btnCropSave"   onClick={this.uploadPic(3)}>Okay</button> */}
           
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>

          <FooterClass/>
    </>
  )
}
}

export default Eventcalender
