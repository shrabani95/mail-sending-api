import React, { Component } from 'react';
import FooterClass from '../header_footer/FooterClass';
import ProfileHeader from '../header_footer/ProfileHeader';
import ProfileNav from './ProfileNav';
import LineChart from './LineChart';
import * as queryString from 'query-string';
import { Helmet } from "react-helmet";
import API from '../services/API'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Modal from 'react-bootstrap/Modal'
import GraphMonthly from './GraphMonthly';
class MyStatus extends Component {

  constructor(props) {
    super(props)

    this.state = {
      viewsDetails: [],
      clickDetails: [],
      graphDetails: [],
      graphViewDetails: [],
      graphType: 365,
      totalActivePeople: [],
      InAppPurchase: [],
      tranDetails:[],
      uniqueViews:[],
      monitization:[],
      statType: 'All Time Stat',
      allTimeStat:'active',
      Daily:'',
      Wallet:0,uniqueClicks:0,
      openModal:false,
      this_year:'',
      prev_year:'',
      which_year:'',
    }
  }

  componentDidMount() {
    //API.isActive();

    var d = new Date();
    var this_year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var fulldate = new Date(this_year - 1, month, day);
    var prev_year = fulldate.getFullYear();
    console.log(prev_year)
    this.setState({
      this_year,
      prev_year,
      which_year:this_year
    })

    this.validateSession();
    this.Get_Stats_Details();
  }
  validateSession() {

    const urlParams = queryString.parse(window.location.search);
    const code = urlParams.code;
    var JM_ID = parseInt(localStorage.getItem('JM_ID'));
    if (isNaN(JM_ID) || JM_ID === 0 || JM_ID === null) {
      if (typeof code === "undefined") {
        localStorage.setItem('JM_Email', "");
        localStorage.setItem('JM_ID', 0);
        window.location.href = '/';
      }
      else {
        let token = this.getAccessTokenFromCode(code);
        //this.getFacebookUserData(token);

      }

    }

  }
  async Get_Stats_Details() {
    var id = parseInt(localStorage.getItem('JM_ID'));
    var d = new Date();
    var year = d.getFullYear();
    var JSONdata = {
      JM_ID: id,
      param: 365,
      year:year
    };
    const API_url = process.env.REACT_APP_API_URL + "admin/statsDetails";
    const response = await fetch(API_url, {
      method: 'post',
      headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
      body: JSON.stringify(JSONdata)
    });
    const data1 = await response.json();
    if (data1.status > 0) 
    {
      const data=API.decryptJson(data1.flag);
      
      this.setState({
        graphDetails: data.graphDetails,
        viewsDetails: data.viewsDetails,
        clickDetails: data.clickDetails,
        graphViewDetails: data.graphViewDetails,
        totalActivePeople: data.totalActivePeople,
        InAppPurchase: data.InAppPurchase,
        uniqueViews:data.uniqueViews,
        monitization:data.monitization,
        Wallet:data.currentBalance,
        uniqueClicks:data.uniqueClicks && data.uniqueClicks.length > 0 ? data.uniqueClicks[0].uniqueClicks : 0,
        which_year:year,
        tranDetails:data.tranDetails,
      

      });
    }
    //console.log("stats-->");
    //console.log(data);

  }

  // for getting ddl change
  onChange_Stat = (e) => {
    const API_url = process.env.REACT_APP_API_URL + "admin/statsDetails";
    let param = e.target.value;
    let statType = e.target.options[e.target.selectedIndex].text;
    //console.log(statType)
    this.setState({
      statType,
      //which_year:year
    })
    var JSONdata = {};
    var id = parseInt(localStorage.getItem('JM_ID'));
    var d = new Date();
    var year = d.getFullYear();
    var JSONdata = {
      JM_ID: id,
      param: param,
      year:year
    };

    fetch(API_url,
      {
        method: 'post',
        headers: { "Content-Type": "application/json" ,"authorization": API.getAuth(),"id":API.getId()},
        body: JSON.stringify(JSONdata)
      })
      .then((response) => response.json())
      .then(async data1 => {
        if (data1.status > 0) {
          const data=API.decryptJson(data1.flag);
          this.setState({
            graphDetails: data.graphDetails,
            viewsDetails: data.viewsDetails,
            clickDetails: data.clickDetails,
            graphViewDetails: data.graphViewDetails,
            totalActivePeople: data.totalActivePeople,
            InAppPurchase: data.InAppPurchase,
            graphType: param,
            uniqueViews:data.uniqueViews ,
            monitization:data.monitization, 
            Wallet:data.currentBalance,
            uniqueClicks:data.uniqueClicks && data.uniqueClicks.length > 0 ? data.uniqueClicks[0].uniqueClicks : 0,
          });
        }
      });
  }
  onClick_Stat = (days,year='')=> e => {
    const API_url = process.env.REACT_APP_API_URL + "admin/statsDetails";
    let param = days
    let statType = days===365? 'All time stats' : days===30? '30 days' : days===7? '7 days': 'Daily' ;
    //console.log(statType)
    this.setState({
      statType,
      which_year:year
    })
    var JSONdata = {};
    var id = parseInt(localStorage.getItem('JM_ID'));
    var JSONdata = {
      JM_ID: id,
      param: param,
      year:year
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
          const data=API.decryptJson(data1.flag);
          this.setState({

            graphDetails: data.graphDetails,
            viewsDetails: data.viewsDetails,
            clickDetails: data.clickDetails,
            graphViewDetails: data.graphViewDetails,
            totalActivePeople: data.totalActivePeople,
            InAppPurchase: data.InAppPurchase,
            graphType: param,   
            tranDetails:data.tranDetails,
            uniqueViews:data.uniqueViews,
            monitization:data.monitization,  
            Wallet:data.currentBalance,
            uniqueClicks:data.uniqueClicks && data.uniqueClicks.length > 0 ? data.uniqueClicks[0].uniqueClicks : 0,
         
          });

          if(param===365)
            this.setState({
              allTimeStat:'active',
              ThirtyStat:'',
              SevenStat:'',
              Daily:'',  
            })
          else if(param===30)
            this.setState({
              allTimeStat:'',
              ThirtyStat:'active',
              SevenStat:'',     
              Daily:'',        

            })
          else if(param===7)        
              this.setState({
                allTimeStat:'',
                ThirtyStat:'',
                SevenStat:'active',   
                Daily:'',   
              })      
          else // daily       
            this.setState({
              allTimeStat:'',
              ThirtyStat:'',
              SevenStat:'',           
              Daily:'active',    
            })
          }
      });
  }
  
  gotoPayout=bal=>(e)=>{
    this.props.history.push("/payout");
    this.props.history.push({
      state: {
        InAppPurchase: this.state.InAppPurchase,      
        bal:bal  
      }
    })
  }

  openGraph=(graphTitle,id)=>async e=>{

    var flagData={
      id:id,
      year:this.state.which_year
    }
      const flag=API.encryptData(flagData);
      var JSONdata = {
        flag: flag
      };

  
    const responseData=await API.postData(JSONdata,'graphMonthy');
    if(responseData.status===1)
    {
      const data=API.decryptJson(responseData.flag);

      if(id!==3)
      {
        this.setState({openModal:true,
          graphTitle:graphTitle,
          id:id,
          graphMonthy:data.graphMonthy,
          msg:''
        })
      }
      else
      {
        this.setState({openModal:true,
          graphTitle:graphTitle,
          id:id,
          graphMonthy:data.totalViews,
          graphMonthyView:data.totalViews,
          graphMonthyClick:data.totalClicks,
          msg:''
        })
      }
    }   
    else
    {
      this.setState({openModal:true,
        graphTitle:graphTitle,
        id:id,
        graphMonthy:[],
        msg:'No data found'
      })
    }


  }

  getPrevCurrGraph=(year)=>async e=>{

    var flagData={
      id:this.state.id,
      year:year
    }
      const flag=API.encryptData(flagData);
      var JSONdata = {
        flag: flag
      };

  
    const responseData=await API.postData(JSONdata,'graphMonthy');
    if(responseData.status===1)
    {
      const data=API.decryptJson(responseData.flag);

      if(this.state.id!==3)
      {
        this.setState({  
          graphMonthy:data.graphMonthy,
          msg:'',
          which_year:year
        })
      }
      else
      {
        this.setState({openModal:true,        
          graphMonthy:data.totalViews,
          graphMonthyView:data.totalViews,
          graphMonthyClick:data.totalClicks,
          msg:'',
          which_year:year
        })
      }
    }   
    else
    {
      this.setState({openModal:true,       
        graphMonthy:[],
        msg:'No data found',
        which_year:year
      })
    }

  }

  //25-sep-2021
  sortTable_Monitization=(tableName,n)=>e=> 
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

          if(tableName==='monitization')
          {
            if(n===1) //title
            {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                  }
            }
            else
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
          else if(tableName==='tbl_link')
          {

            if(n===0) //title
            {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                  }
            }
            else
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
          
        } 
        else if (dir === "desc")
        {
          if(tableName==='monitization')
          {
            if(n===1)
            {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                  }
            }
          else
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
          else if(tableName==='tbl_link')
          {
            if(n===0)
            {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                  }
            }
          else
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
  render() {

    const themePopOver = (
      <Popover id="popover-basic-themePopOver"  style={{zIndex:'99999',color:'black'}}>      
      <Popover.Title as="h6" style={{backgroundColor:'#fff'}}>
        View transactions
        </Popover.Title>
        {/* <Popover.Content>         
        </Popover.Content>     */}       
      </Popover>
    );
    const ViewWallet = (
      <Popover id="popover-basic-ViewWallet"  style={{zIndex:'99999',color:'black'}}>      
        <Popover.Title as="h6" style={{backgroundColor:'#fff'}}>
         View wallet
        </Popover.Title>
        {/* <Popover.Content>         
        </Popover.Content>     */}       
      </Popover>
    );
    const tool_totalView=(
      <Popover id="popover-basic-tool_totalView"  style={{zIndex:'99999',color:'black'}}>      
      <Popover.Title as="h6" style={{backgroundColor:'#fff'}}>
       View total views
      </Popover.Title>
      {/* <Popover.Content>         
      </Popover.Content>     */}       
    </Popover>
    )
    const tool_totalclicks=(
      <Popover id="popover-basic-tool_totalView"  style={{zIndex:'99999',color:'black'}}>      
      <Popover.Title as="h6" style={{backgroundColor:'#fff'}}>
       View total clicks
      </Popover.Title>
      {/* <Popover.Content>         
      </Popover.Content>     */}       
    </Popover>
    )
    const tool_Click_through_rate=(
      <Popover id="popover-basic-tool_totalView"  style={{zIndex:'99999',color:'black'}}>      
      <Popover.Title as="h6" style={{backgroundColor:'#fff'}}>
       View click through rate
      </Popover.Title>
      {/* <Popover.Content>         
      </Popover.Content>     */}       
    </Popover>
    )

    const tool_unqiueViews=(
      <Popover id="popover-basic-tool_totalView"  style={{zIndex:'99999',color:'black'}}>      
      <Popover.Title as="h6" style={{backgroundColor:'#fff'}}>
       View total unique views
      </Popover.Title>
      {/* <Popover.Content>         
      </Popover.Content>     */}       
    </Popover>
    )
    const tool_unqiueClicks=(
      <Popover id="popover-basic-tool_totalView"  style={{zIndex:'99999',color:'black'}}>      
      <Popover.Title as="h6" style={{backgroundColor:'#fff'}}>
       View total unique clicks
      </Popover.Title>
      {/* <Popover.Content>         
      </Popover.Content>     */}       
    </Popover>
    )
    const tool_totalSales=(
      <Popover id="popover-basic-tool_totalView"  style={{zIndex:'99999',color:'black'}}>      
      <Popover.Title as="h6" style={{backgroundColor:'#fff'}}>
       View total sales
      </Popover.Title>
      {/* <Popover.Content>         
      </Popover.Content>     */}       
    </Popover>
    )
    const tool_totalRevenue=(
      <Popover id="popover-basic-tool_totalView"  style={{zIndex:'99999',color:'black'}}>      
      <Popover.Title as="h6" style={{backgroundColor:'#fff'}}>
       View total  revenue
      </Popover.Title>
      {/* <Popover.Content>         
      </Popover.Content>     */}       
    </Popover>
    )
    const { viewsDetails, clickDetails, InAppPurchase,uniqueViews,  monitization  } = this.state;
    let totalViews = 0, totalClick = 0,UniqueViews=0;
    if (viewsDetails != null && viewsDetails.length > 0) 
    {
      totalViews = parseInt(viewsDetails[0].totViews);
    }
    if (clickDetails != null && clickDetails.length > 0) 
    {
      let len = clickDetails.length;
      for (let i = 0; i < len; i++)
       {
        totalClick += parseInt(clickDetails[i].TotClicks);
      }
    }
    if(uniqueViews!=null && uniqueViews.length > 0)
    {
      let len = uniqueViews.length;
      for (let i = 0; i < len; i++) {
        UniqueViews += parseInt(uniqueViews[i].uniqueViews);
      }
    }

    const CTR = (totalClick > 0 && totalViews) > 0 ? parseFloat(totalClick / totalViews * 100).toFixed(2) + "%" : '0%';
    const TopItems = clickDetails && clickDetails.map((click, i) => {
      return (        
        
          
            click.Stat_Type!=='P'?     
            <tr>
              <td>{click.Title}</td>
              <td>{click.TotClicks}</td>
              <td>{parseFloat(click.TotClicks / totalViews * 100).toFixed(2) + "%"}</td>
            </tr>           
            :
            null

          
    
       
      )
    })
    //MS2
    const TopMonitization = monitization && monitization.map((click, i) => {
      return (       
        click.TotClicks > 0 && click.Stat_Type==='P'? 
        <tr key={click.Stat_ID}>          
              <td data-value={click.DA_Allow_Cust_Pay > 0 ? click.DA_Min_Amount +"+": click.DA_Price}>
                {click.DA_Allow_Cust_Pay > 0 ? click.DA_Min_Amount +"+": click.DA_Price}
              
              </td>
              <td>{click.Title}</td>
              <td data-value={click.TotClicks}>{click.TotClicks}</td>
              <td  data-value={parseFloat(click.TotClicks / totalViews * 100).toFixed(2)}>{parseFloat(click.TotClicks / totalViews * 100).toFixed(2) + "%"}</td>
              <td data-value={click.totalPurchases}>{click.totalPurchases}</td>
              <td data-value={click.revenue}>
                {click.revenue}
                {/* {click.BM_Purchase_Amt} */}
              
              </td> 
        </tr>
        :
        null
      )
    })


    let Totpeople = 0;
    if (this.state.totalActivePeople !== null && this.state.totalActivePeople.length > 0) {
      Totpeople = this.state.totalActivePeople[0].totalPeopleVisited;
    }
    let TotSales = 0, TotRevenue = 0, TotTransaction = 0;
    if (InAppPurchase != null && InAppPurchase.length > 0) {
      let len = InAppPurchase.length;
      for (let i = 0; i < len; i++) {
        TotSales += parseFloat(InAppPurchase[i].Actual_Price);
        TotRevenue += parseFloat(InAppPurchase[i].BM_Purchase_Amt );//Revenue
        TotTransaction += parseFloat(InAppPurchase[i].purchases);
      }
    }
    let InAppPurchaseTable = InAppPurchase !== null && InAppPurchase.map((item, i) => {
      return (    
        <tr>
          <td>{item.DA_Price}</td>
          <td>{item.DA_Title}</td>      
          <td>{item.purchases}</td>
          <td>{"CTR"}</td>
          <td>{0}</td>
          <td>{item.Revenue}</td>     
        </tr>
      )

    })

    //console.log(InAppPurchase)
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'firstName', headerName: 'First name', width: 130 },
      { field: 'lastName', headerName: 'Last name', width: 130 },
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
      },
    ];
    let charges=.9;
   let TotRevenue2=TotRevenue;

   var Wallet=0;


   const styleButton={
     
    backgroundColor:this.state.id===1? 
                    '#7004fa'
                    : this.state.id===2 ?
                    '#fc347f'
                    : this.state.id===3 ?
                    '#1482cc'
                    : this.state.id===4 ?
                    '#4eb232'
                    : this.state.id===5 ?
                    '#e60dc4'
                    : this.state.id===6 ?
                    '#73300d'
                    : this.state.id===7 ?
                    '#fca542'
                    :
                    '#7004fa'
   }


    return (
      <>
          <Helmet>
            <title>Statistics | Expy </title>
            <meta name="description" content="Use Expy to SHARE all your important links, content and OFFER paid, personalized, premium features under one beautiful Bio-Link page. FREE and FAST to set up."></meta>
        </Helmet>
        <ProfileHeader />
        <div className="profile-tab">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                {/* <NavLink to="/myprofile" className="btun"><PersonOutlineIcon/>Profile</NavLink>
                    <NavLink to="/myappearance" className="btun"><ColorLensIcon/>Appearance</NavLink>
                    <NavLink to="/mystatus" className="btun active"><TrendingUpIcon/>Status</NavLink> */}
                <ProfileNav />
              </div>
            </div>
          </div>
        </div>
        <div>


          <div className="status-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <div className="status">
                    <div className="follow">
                      {/* <p>You have <span>0</span> followers</p> */}

                      <div className="Glowbutton"></div><span style={{ marginLeft: '10px', marginTop: '-5px' }}>{Totpeople} </span> User/Users on your profile right now

                  </div>
                     <div className="title">
                      {/* <label>View In Depth</label> */}
                   
                      
                                 <button className="float-left graphButton" 
                                 onClick={this.onClick_Stat(365,this.state.prev_year)}  
                                 >{"Prev"}</button> 
                                  <h3>{this.state.statType + " #"+this.state.which_year}</h3>
                                 <button className="float-right graphButton"                                   
                                   onClick={this.onClick_Stat(365,this.state.this_year)} 
                                 
                                 >{"Current"}</button>        
                          
                    </div>
                    <div className="graph">
                      <LineChart Chart={this.state.graphDetails} graphType={this.state.graphType} statType={this.state.statType}
                      graphViewDetails={this.state.graphViewDetails}  tranDetails={this.state.tranDetails}/>
                    </div>
                    <div className="slt-int">
                      <ul>
                        <li><button className={this.state.allTimeStat} onClick={this.onClick_Stat(365,this.state.this_year)}>All Time Stats</button></li>
                        <li><button className={this.state.ThirtyStat} onClick={this.onClick_Stat(30,this.state.this_year)}>30 days</button></li>
                        <li><button className={this.state.SevenStat} onClick={this.onClick_Stat(7,this.state.this_year)}>7 Days</button></li>
                        <li><button className={this.state.Daily} onClick={this.onClick_Stat(1,this.state.this_year)}>Daily</button></li>
                        {/* <li><button>6 Months</button></li>
                            <li><button>1 Year</button></li> */}
                      </ul>
                    
                  </div>
                   
                    <div className="sta-box">
                      <div className="part">
                         <OverlayTrigger  placement={"bottom"} overlay={tool_totalView} >
                            <div className="item setCursor" onClick={this.openGraph('Total views',1)}>
                                <p>Views</p>
                                <h4>{totalViews}</h4>
                              </div>
                          </OverlayTrigger>                     
                      </div>
                      <div className="part">
                      <OverlayTrigger  placement={"bottom"} overlay={tool_totalclicks} >
                        <div className="item back-view setCursor"  onClick={this.openGraph('Total clicks',2)}>
                          <p>Clicks</p>
                          <h4>{totalClick}</h4>
                        </div>
                        </OverlayTrigger>   
                      </div>
                      <div className="part">
                      <OverlayTrigger  placement={"bottom"} overlay={tool_Click_through_rate} >
                        <div className="item back-CTR setCursor" onClick={this.openGraph('Click through rate',3)}>
                          <p>Click through rate</p>
                          <h4>{CTR}</h4>
                        </div>
                        </OverlayTrigger>   
                      </div>
                      <div className="part">
                      <OverlayTrigger  placement={"bottom"} overlay={themePopOver} >
                            {/* <a href={process.env.REACT_APP_API_URL+"notify"} style={{textDecoration:'none'}}> */}
                                <div className="item back-transaction setCursor" onClick={this.openGraph('Total transactions',4)}>
                                  <p>Transactions</p>                         
                                        <h4>
                                          {TotTransaction}
                                        </h4>           
                                </div>
                              {/* </a> */}
                        </OverlayTrigger > 
                        
                      </div>
                      <div className="part mr0">
                      <OverlayTrigger  placement={"bottom"} overlay={tool_unqiueViews} >
                        <div className="item back-uniqueViews setCursor" onClick={this.openGraph('Unique views',5)}>
                          <p>Unique Views</p>
                          <h4>{UniqueViews}</h4>
                        </div>
                        </OverlayTrigger > 
                      </div>
                      <div className="part">
                      <OverlayTrigger  placement={"bottom"} overlay={tool_unqiueClicks} >
                        <div className="item back-uniqueClicks setCursor"  onClick={this.openGraph('Unique clicks',6)}>
                          <p>Unique Clicks</p>
                          <h4>{this.state.uniqueClicks}</h4>
                        </div>
                        </OverlayTrigger > 
                      </div>
                      <div className="part">
                      <OverlayTrigger  placement={"bottom"} overlay={tool_totalSales} >
                        <div className="item back-totalSales setCursor" onClick={this.openGraph('Total sales',7)}>
                          <p>Total Sales</p>
                          <h4><i class="fas fa-rupee-sign"></i> {TotSales.toFixed(2)}</h4>
                        </div>
                        </OverlayTrigger > 
                      </div>
                      <div className="part">
                        <OverlayTrigger  placement={"bottom"} overlay={tool_totalRevenue} > 
                          <div className="item back-revenue setCursor"  onClick={this.openGraph('Total Revenue',8)}>
                            <p>Total Revenue</p>
                            <h4><i class="fas fa-rupee-sign"></i> {TotRevenue2.toFixed(2)}</h4>
                          </div>
                         </OverlayTrigger >  
                      </div>
                     
                        <div className="part" style={{color:'green'}} onClick={this.gotoPayout(TotRevenue2.toFixed(2))}>
                          <OverlayTrigger  placement={"bottom"} overlay={ViewWallet} >
                            <div className="item back-wallet setCursor">
                              <p>Wallet Amount</p>
                              <h4><i class="fas fa-rupee-sign"></i> {this.state.Wallet.toFixed(2)}</h4>
                            </div>
                          </OverlayTrigger>
                        </div>
                       
                    </div>
                    <div className="slt-int">
               
                      {/* <select className="form-control" onChange={this.onChange_Stat}>
                        <option value="365">All Time Stats</option>                      
                        <option value="7">7 Days Stats</option>
                        <option value="30">30 Days Stats</option>
                      </select> */}
                    </div>
                    <div className="title">
                      <h3>Top links and widgets</h3>
                    </div>
                    <div className="table-box">
                      <table className="table table-striped table-bordered table-hover" id="tbl_link">
                        <tr>
                          <th onClick={this.sortTable_Monitization('tbl_link',0)}>Title</th>
                          <th onClick={this.sortTable_Monitization('tbl_link',1)}>Clicks</th>
                          <th onClick={this.sortTable_Monitization('tbl_link',2)}>CTR</th>
                        </tr>
                        {TopItems}
                      </table>
                    </div>
                    <br />
                    <div className="title">
                      <h3>Top monetization features</h3>
                    </div>
                    <div className="table-box">
                      <table className="table table-striped table-bordered table-hover" id="monitization">
                        <tr>
                          <th onClick={this.sortTable_Monitization('monitization',0)}>Price</th>
                          <th onClick={this.sortTable_Monitization('monitization',1)}>Title</th>
                          <th onClick={this.sortTable_Monitization('monitization',2)}>Clicks</th>
                          <th onClick={this.sortTable_Monitization('monitization',3)}>CTR</th>
                          <th onClick={this.sortTable_Monitization('monitization',4)}>Total Purchases</th>
                          <th onClick={this.sortTable_Monitization('monitization',5)}>Revenue</th>
                        </tr>
                        {TopMonitization}
                      </table>
                    </div>

                     
                  </div>
                  <graph />
                </div>
              </div>
            </div>
          </div>

        </div>

            {/* image crop modal */}
            <Modal         
                      show={this.state.openModal}
                      onHide={() => this.setState({ openModal: false })}
                      aria-labelledby="example-modal-sizes-title-sm"
                      backdrop="static"
                      size={"xl"}
                      keyboard={false}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm" style={{ fontSize: '15px' }}>
                            Monthly Chart  {this.state.id===4 ?      
                               <>
                               <br/>
                               <a href={process.env.REACT_APP_API_URL+"notify"} style={{textDecoration:'none',cursor:'pointer'}}>View Report </a>
                               </>
                               : ''}   
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>    
                         <div className="row">
                            <div className="col-md-12">
                                 <button className="float-left graphButton" 
                                 onClick={this.getPrevCurrGraph(this.state.prev_year,this.state.id)}
                                 style={styleButton}
                                 
                                 >{"Prev"}</button> 
                                 <button className="float-right graphButton" 
                                      style={styleButton}
                                 onClick={this.getPrevCurrGraph(this.state.this_year,this.state.id)}>{"Current"}</button>        
                            </div>
                        </div>
                      
                      
                        <GraphMonthly  
                            graphMonthyView={this.state.graphMonthyView}
                            graphMonthyClick={this.state.graphMonthyClick}
                            graphTitle={this.state.graphTitle} 
                            id={this.state.id} 
                            graphMonthy={this.state.graphMonthy}
                            which_year={this.state.which_year}                 
                        />                  
                      </Modal.Body>
                      <Modal.Footer>

                      </Modal.Footer>
                    </Modal>

                    <FooterClass />





      </>
    )
  }
}
export default MyStatus
