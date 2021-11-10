import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import VideocamIcon from '@material-ui/icons/Videocam';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';



class LiveVideoSessionLatest extends Component
{
  constructor(props) {
    super(props)
  
    this.state = {
       openModel:false,
       show:false,
       open:false
    }
  }
  ModalClose=()=>{
    this.setState({openModel:false,show:false});
  }
  ModalOpen=()=>{
    this.setState({openModel:true,show:true});
  }
  openCollapse = () => {
    !this.state.open ?
      this.setState({ open: true })
      :
      this.setState({ open: false })
      
  }
  startTime=(time, timeString)=> {
    console.log(time, timeString);
  }



 
  render(){
    //  onChange=(date, dateString)=>e=>{
    //   alert(date, dateString);
    // }
   
  return (
    <>
      {/* <button class="btun"  onClick={this.ModalOpen}><AddCircleOutlineIcon/> Add This</button> */}
      
      <div className="col-md-3">
                        <div className="item">
                          <div className="icon">
                            <VideocamIcon style={{fontSize: '50px'}}/>
                          </div>
                          <div className="text">
                            <h4>Add Live Video Session Latest</h4>                           
                            <button class="btun"  onClick={this.ModalOpen}><AddCircleOutlineIcon/> Add This</button>
                            {/* <button class="btun"  onClick={()=>alert('Work in progress')}><AddCircleOutlineIcon/> Add This</button> */}
                          </div>
                        </div>
                    </div>
      
      <Modal
        show={this.state.show}
        onHide={this.ModalClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"

      >
        <Modal.Header closeButton>
          <Modal.Title>
             <p className="addnew-title">Live 1-to-1 video session</p>
          </Modal.Title>
        </Modal.Header>
         <Modal.Body>
          <div className="direct-access-pop">
            <div className="row">
              <div className="col-md-6">
                <label className="lab">Title</label>
                <input type="text" className="form-control" placeholder="Set Title" />
              </div>
              
              <div className="col-md-6">
                <label className="lab">Caption</label>
                <input type="text" className="form-control" placeholder="Write a caption" />
              </div>

              <div className="col-md-12">
                <label className="lab">Mail Text</label>
                <textarea className="form-control area" placeholder="Write Invitation Content"/>
              </div>
              <div className="col-md-6">
                <label className="lab">Time duration</label>
                <select className="form-control">
                    <option value="15">15 mins</option>
                    <option value="30">30 mins</option>
                    <option value="45">45 mins</option>
                    <option value="60">60 mins</option>
                    <option value="90">90 mins</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="lab">Shedule for how many days</label>
                <select className="form-control">
                    <option value="7">7 Days</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                    <option value="90">90 Days</option>
                    <option value="180">180 Days</option>
                    <option value="365">365 Days</option>
                </select>
              </div>
           
            </div>
            <div className="row timebook">
              <div className="col-md-12">
                <label className="lab">Start & end time</label>
              </div>
              <div className="col-md-6">
                <TimePicker format="h:mm a" placeholder="Start Time" onChange={this.startTime}/>
              </div>
              <div className="col-md-6">
                <TimePicker format="h:mm a" placeholder="End Time"/>
              </div>
              <div className="col-md-12">
                <ul className="daycheck">
                  <li>
                  <input type="checkbox" id="mon" value="1"/>
                    <label for="mon">
                      <span></span><br/>
                      MON
                    </label>
                  </li>
                  <li>
                  <input type="checkbox" id="tue" value="2"/>
                    <label for="tue">
                      <span></span><br/>
                      TUE
                    </label>
                  </li>
                  <li>
                  <input type="checkbox" id="wed" value="3"/>
                    <label for="wed">
                      <span></span><br/>
                      WED
                    </label>
                  </li>
                  <li>
                  <input type="checkbox" id="thu" value="4"/>
                    <label for="thu">
                      <span></span><br/>
                      THU
                    </label>
                  </li>
                  <li>
                  <input type="checkbox" id="fri" value="5"/>
                    <label for="fri">
                      <span></span><br/>
                      FRI
                    </label>
                  </li>
                  <li>
                  <input type="checkbox" id="sat" value="6"/>
                    <label for="sat">
                      <span></span><br/>
                      SAT
                    </label>
                  </li>
                  <li>
                  <input type="checkbox" id="sun" value="7"/>
                    <label for="sun">
                      <span></span><br/>
                      SUN
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label className="lab">Price</label>
                <input type="text" className="form-control" placeholder="Set Price" />
              </div>
            </div>
            <div className="btun-box">
              <button className="btun">Add</button>

              <button className="btun" onClick={this.ModalClose}>Cancel</button>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}

}

export default LiveVideoSessionLatest;