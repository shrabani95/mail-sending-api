import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from 'react-bootstrap/Modal'
import AssessmentIcon from '@material-ui/icons/Assessment';
import API  from '../services/API';
import Tooltip from '@material-ui/core/Tooltip';
class ContestReport extends Component {
    checkArray=[];
    emailArray=[];
    constructor(props) {
        super(props);
        this.state={
            base_url: process.env.REACT_APP_API_URL,
            root_url: process.env.REACT_APP_ROOT_URL,
            openModel: false,
            show: false,
            open: false,
            reportData:[],
            checkedIds:[],
            DA_ID:0,
        }
    }

   async  componentDidMount() 
    {
       
    }
    ModalClose = () => {
        this.setState({
            openModel: false, show: false,        
        });

    }
    ModalOpen = async (e) => 
    {
       
        var flagData={
            DA_ID:this.props.data.tableId,
            JM_ID:parseInt(API.getId())
        }

        const flag=API.encryptData(flagData);
        let  jsonData = {
            flag: flag
          };

        const resp=await API.postData(jsonData,'contestReport');
        if(resp.status===1)
        {
            const data=API.decryptJson(resp.flag);
           // console.log(data)
            this.setState({
                openModel: true, show: true,
                reportData:data.reportData
            })
        }
      
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
          if (dir === "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
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

    myFunction=(tableName,id)=>e=>{
        ////console.log(tableName + " "+ id)
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById(id);
      filter = input.value.toUpperCase();
      table = document.getElementById(tableName);
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
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

    checkHandle=(data)=>e=>{

        let CM_ID=data.CM_ID;
      
        if(e.target.checked===true)
        {
            this.checkArray.push(CM_ID)
            this.emailArray.push({
                CM_Email:data.CM_Email,
                JM_User_Profile_Url:data.JM_User_Profile_Url,
                CM_ID:CM_ID,
                CM_Name:data.CM_Name,
                JM_Name:data.JM_Name,
            })
        }
        else
        {
            var filteredAry = this.checkArray.filter(e => e !== data.CM_ID)
            this.checkArray=filteredAry;

            var filteredAry2 = this.emailArray.filter(e => e.CM_ID !== data.CM_ID)
            this.emailArray=filteredAry2;
           
        }
    }


    SubmitWinner=async (e)=>{

        //console.log(this.props.data.tableId)
        if(this.checkArray!==null && this.checkArray.length > 0)
        {
            var flagData={
                JM_ID:parseInt(API.getId()),
                CM_ID:this.checkArray,
                DA_ID:this.props.data.tableId,
                email:this.emailArray,
                DA_Title:this.props.data.title,
                JM_User_Profile_Url: localStorage.getItem('JM_User_Profile_Url')
            }

            const flag=API.encryptData(flagData);
            let  JSONdata = {
                flag: flag
              };



            document.getElementById("btn_contest").disabled = true;
            document.getElementById('btn_contest').innerHTML='Processing...'
            document.getElementById('msg_contest').style.color='red';
            const resp=await API.postData(JSONdata,'setWinner');

            if(resp.status===1)
            {
                this.checkArray=[];
                
                document.getElementById("btn_contest").disabled = false;
                document.getElementById('btn_contest').innerHTML='Submit Winner'
                document.getElementById('msg_contest').style.color='green'
                document.getElementById('msg_contest').innerHTML='Congratulations on picking the winner! Please contact the winner through the submitted details.';
                await API.DoSleep(3000);
                document.getElementById("msg_contest").innerHTML='';
                this.ModalClose();
            }
            else
            {
                
                document.getElementById("btn_contest").disabled = false;
                document.getElementById('btn_contest').innerHTML='Submit Winner'
                document.getElementById('msg_contest').innerHTML='unable to set winner,try again later';
                return false;
            }
        }
        else
        {
            document.getElementById('msg_contest').innerHTML='Please, check atleast one person to select a winner'
            return false;
        }

      
    }

    download_csv=(csv, filename)=> {
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
    
     export_table_to_csv=(html, filename)=> {
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
    
    exportTable=fileName=>(e)=>{
        let file=fileName.replace(" ","");
        var html = document.querySelector("table").outerHTML;
        this.export_table_to_csv(html, file+".csv");
    }
       
    
    
    render() {

        let Q1='',Q2='',Q3='',Q4='';let isWinner=false;
        if(this.state.reportData && this.state.reportData.length > 0)
        {
            var len=this.state.reportData.length
            let item=this.state.reportData;
            for (let i = 0; i < item.length; i++) 
            {
                Q1=item[i].Q1;
                Q2=item[i].Q2;
                Q3=item[i].Q3;
                Q4=item[i].Q4; 
                if(item[i].Status==='W')           
                {
                    isWinner=true;
                    break;
                }
              
                
            }
        }

        let tableContest=this.state.reportData && this.state.reportData.map((item, i) => {
            return (  <>          
                    
                        <Tbody>
                       

                            <Tr style={{background:item.Status==='W'?'green':'white',color: item.Status==='W'?'white':'black'}}>
                                <Td>{item.submitDate}</Td>
                                <Td>{item.CM_Name}</Td>
                                <Td>{item.CM_Email}</Td>
                                <Td>{item.CM_A1}</Td>
                                <Td>{item.CM_A2}</Td>
                                <Td>{item.CM_A3}</Td>
                                <Td>{item.CM_A4}</Td>
                                <Td>
                              
                               {
                                        item.CM_File.length > 0 ?
                                        <a href={"/adm/uploads/"+item.CM_File} target="_blank" style={{cursor:'pointer'}}>View File</a>
                                        :
                                        <p>No File</p>
                                      
                               } 
                                </Td>
                                <Td>
                                    {
                                        item.Status==='C'? 
                                        <p></p>                                
                                        :
                                        item.Status==='W'?
                                        <p style={{background:'green',color:'white'}}>Won</p>   
                                        :
                                        <>
                                        <input type="checkbox" onChange={this.checkHandle(item)} />    Winner
                                        </>                             
                                    }
                                 
                                </Td>
                            </Tr>
                        </Tbody>
                    </>
                )
      })
        return (
            <>
            {
                this.props.from==='P'?
                 <Tooltip title="View Details" placement="top">                        
                        <button onClick={this.ModalOpen}><AssessmentIcon />
                    </button>                                 
                 </Tooltip>
                 : this.props.from==='C'?
                 <button className="contest-btn" onClick={this.ModalOpen}>{this.props.data.title}</button>
                 :
                 null
            }
        
                

                <Modal
                    show={this.state.show}
                    onHide={this.ModalClose}
                    backdrop="static"
                    keyboard={false}
                    size="xl"
                    contentClassName="modal-radius"
                    centered

                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3 className="addnew-title">{this.props.data.title}</h3>
                            <p className="addnew-title">{this.props.data.description}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="direct-access-pop">
                            <div className="row">
                                <div className="col-md-5">
                                   <input type="text"  className="form-control" style={{margin: '10px 0',height:'40px'}} id="inp_contest" onKeyUp={this.myFunction('tbl_contest','inp_contest')} placeholder="Search for names.." title="Type in a name"/>
                                </div>   
                                <div className="col-md-7 text-right">
                                     <button className="btun" style={{margin: '10px 0',height:'40px'}} onClick={this.exportTable(this.props.data.title)}>Export CSV</button>
                                </div>                       
                            </div>
                                                  
                            <div  className="table-responsive overflow-auto contestReport" style={{maxHeight: '450px'}}>
                                <Table  id="tbl_contest" className="table table-bordered">
                                  <Thead>
                                        <Tr>
                                            <Th>{"Date"}</Th>
                                            <Th>{"Name"}</Th>
                                            <Th>{"Email"}</Th>
                                            <Th>{Q1}</Th>
                                            <Th>{Q2}</Th>
                                            <Th>{Q3}</Th>
                                            <Th>{Q4}</Th>
                                            <Th>{"File"}</Th>
                                            <Th>{"Action"}</Th>
                                        </Tr>
                                    </Thead>
                                        {tableContest} 

                                </Table>
                            </div>

                         
                            <div className="btun-box text-center">   
                               {

                                isWinner===false?
                                <button className="btun" id="btn_contest" onClick={this.SubmitWinner}>Submit Winner</button>
                                :
                                 null
                               }                             
                             <p id="msg_contest" style={{color:'red'}}></p>
                            </div>
                        </div>
                    </Modal.Body>

                </Modal>



                
            </>
        );
    }
}

ContestReport.propTypes = {

};

export default ContestReport;