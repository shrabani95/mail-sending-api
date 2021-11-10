import React, { Component } from 'react';

import { Helmet } from "react-helmet";
import ProfileHeader from '../header_footer/ProfileHeader';
import FooterClass from '../header_footer/FooterClass';
import ProfileNav from './ProfileNav';
import $ from 'jquery';
import Moment from 'react-moment';
class NewsLetter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsLetter: [],
        }
    }

    componentDidMount() {
        this.Get_NewsLetter();                
            $(document).ready(function()
           {
            
           });
    }
    doCsv=(e)=>{
        var html = document.getElementById("tbl_newsletter").outerHTML;
        this.export_table_to_csv(html, "newsletter.csv");
    }
   download_csv(csv, filename) {
        var csvFile;
        var downloadLink;
    
        // CSV FILE
        csvFile = new Blob([csv], {type: "text/csv"});
    
        // Download link
        downloadLink = document.createElement("a");
    
        // File name
        downloadLink.download = filename;
    
        // We have to create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);
    
        // Make sure that the link is not displayed
        downloadLink.style.display = "none";
    
        // Add the link to your DOM
        document.body.appendChild(downloadLink);
    
        // Lanzamos
        downloadLink.click();
    }
    
   export_table_to_csv(html, filename) {
        var csv = [];
        var rows = document.querySelectorAll("table tr");
        
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");
            
            for (var j = 0; j < cols.length; j++) 
                row.push(cols[j].innerText);
            
            csv.push(row.join(","));		
        }
    
        // Download CSV
        this.download_csv(csv.join("\n"), filename);
    }
    
    async Get_NewsLetter() {
        var id = parseInt(localStorage.getItem('JM_ID'));
        var JSONdata = {
            JM_ID: id
        };
        const API_url = process.env.REACT_APP_API_URL + "admin/Get_NewsLetter_Creator";
        const response = await fetch(API_url, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(JSONdata)
        });
        const data = await response.json();
        if (data.status === 1) {
            this.setState({
                newsLetter: data.newsLetter,
            });
        }
        //console.log(data)
    }
    sortTable = (tableName, n) => e => {
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
                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount++;
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

    myFunction = (tableName, id) => e => {
        //console.log(tableName + " " + id)
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

    render() {

        const { newsLetter } = this.state;

        let newsLetterTable = newsLetter && newsLetter.map((item, i) => {
            return (
                <tr>
                    <td>{item.NL_Name}</td>
                    <td>{item.NL_Email}</td>
                    <td>  <Moment date={item.Create_Date}  format="D MMM YYYY" withTitle/></td>
                </tr>
            )

        });

        return (
            <>
                <Helmet>
                    <title>Newsletter Subscriptions | Expy </title>
                    <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta>
                </Helmet>

                <ProfileHeader />
                <div className="profile-tab">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <ProfileNav />

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
                                        <h3>Newsletter Subscriptions </h3>

                                    </div>
                                    <div className="table-responsive tab-content" >
                                        <div className="row">
                                             <div className="col-md-6">
                                                     <input type="text" className="form-control" style={{ marginBottom: '10px' }} id="inp_newsletter" onKeyUp={this.myFunction('tbl_newsletter', 'inp_newsletter')} placeholder="Search for names.." title="Type in a name" />
                                          
                                             </div>
                                            <div className="col-md-6">
                                                 <button class="export-btn" data-tablename="tbl_newsletter" data-filename="newsletter-emails" onClick={this.doCsv}>
                                                 <i class="fa fa-file-excel-o"></i> Export to CSV
                                                </button>
                                            </div>
                                        </div>
                                            
                                            	
                                     
                                       
                                        <table id="tbl_newsletter" className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '30%' }} onClick={this.sortTable('tbl_newsletter', 0)}>Name</th>
                                                    <th style={{ width: '20%' }} onClick={this.sortTable('tbl_newsletter', 1)}>Email ID</th>
                                                    <th style={{ width: '20%' }} onClick={this.sortTable('tbl_newsletter', 1)}>Date Subscribed</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {newsLetterTable}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterClass />
            </>
        );
    }
}

NewsLetter.propTypes = {

};

export default NewsLetter;