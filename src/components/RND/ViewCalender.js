import React, { Component, useState, Form }from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import { Link,NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import FooterClass from '../header_footer/FooterClass';
import MainHeader from '../header_footer/MainHeader';
import { Calendar, momentLocalizer} from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
class Eventcalender extends Component
{
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();

  
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
      constructor(props) {
        super(props)

        this.state = {
          
        }
      }
      componentDidMount()
      {
 
        
      let  monthAndYear = document.getElementById("monthAndYear");
        this.showCalendar(this.currentMonth, this.currentYear);
      }
   

     
     next=()=>{
   
     this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
     this.currentMonth = (this.currentMonth + 1) % 12;
          this.showCalendar(this.currentMonth, this.currentYear);
      }
      
      previous=()=> {
        this.currentYear  = (this.currentMonth === 0) ?  this.currentYear  - 1 :  this.currentYear ;
        this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
          this.showCalendar(this.currentMonth,  this.currentYear );
      }
      
      jump=()=> {
          this.currentYear = parseInt(this.selectYear.value);
          this.currentMonth = parseInt(this.selectMonth.value);
          this.showCalendar(this.currentMonth,  this.currentYear );
      }
      
       showCalendar=(month, year)=> {
      
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
          for (let i = 0; i < 6; i++) {
              // creates a table row
              let row = document.createElement("tr");
              let cell=""; let cellText="";
              //creating individual cells, filing them up with data.
              for (let j = 0; j < 7; j++) {
                  if (i === 0 && j < firstDay) {
                      cell = document.createElement("td");
                      cellText = document.createTextNode("");
                      cell.appendChild(cellText);
                      row.appendChild(cell);
                  }
                  else if (date > this.daysInMonth(month, year)) {
                      break;
                  }
      
                  else {
                      cell = document.createElement("td");
                      cellText = document.createTextNode(date);
                      if (date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) {
                          cell.classList.add("bg-info");
                      } // color today's date
                      let span=document.createElement("span");
                      span.innerHTML='5';
                      cell.appendChild(cellText);
                      cell.appendChild(span);
                      row.appendChild(cell);
                      date++;
                  }
      
      
              }
      
              tbl.appendChild(row); // appending each row into calendar body.
          }
      
      }
      
      
      // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
      daysInMonth=(iMonth, iYear)=> {
          return 32 - new Date(iYear, iMonth, 32).getDate();
      }
      





  render(){
    
    const events = [
    {
        start: moment().toDate(),
        end: moment().add(3, "days")
          .toDate(),
        title: "Some title",
        
    },
];
  
  const localizer = momentLocalizer(moment)
  return (
      
    <>
    <MainHeader/>
   
        <div className="calender-sec">
          <div className="container">
            <div className="col-md-10 offset-md-1">
              <div className="big-calender">

                        <div className="container col-sm-4 col-md-7 col-lg-4 mt-5">
                          <div className="card">
                              <h3 className="card-header" id="monthAndYear"></h3>
                                 <div className="calender-body">
                                     <table classname="table" id="calendar">
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
                                </div>
                                <div className="form-inline">

                                    <button className="btn btn-outline-primary col-sm-6" id="previous" onClick={this.previous}>Previous</button>

                                      <button className="btn btn-outline-primary col-sm-6" id="next" onClick={this.next}>Next</button>
                                  </div>
                                  <br/>
                                    <form className="form-inline">
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
                                        {/* <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option> */}
                                       
                                    </select></form>
                               </div>  
                        </div>     
              </div>
            </div>
          </div>
        </div>
 
     <FooterClass/>
    </>
  )
}
}



export default Eventcalender
