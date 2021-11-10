import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button';
import 'font-awesome/css/font-awesome.min.css';
class Preview extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false ,
            base_url: process.env.REACT_APP_API_URL,
            root_url: process.env.REACT_APP_ROOT_URL, 
       
        }
    
    }
    showModal = e =>{
        this.setState({show:true,linkMaster:this.props.linkMaster});  
        console.log(this.props.userDetails[0].JM_Profile_Pic);

        
    }
    closeModal = e =>{
        this.setState({show:false});
      
    }

    render() {
        return (
            <div>
                  <Button className="btun" onClick={this.showModal}>Preview</Button>
            
                    <Modal     
                    show={this.state.show} onHide={this.closeModal}               
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Live Preview
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="per-prop" style={{backgroundImage:'url('+this.props.bgImage+')'}}>
                        <div className={this.props.data.TM_Class_Name}>
                            <div className="container">
                            <div className="row">
                                <div className="col-md-10 offset-md-1">
                            
                                <div className="per-prop-body">
                                    <div className="dtail-part">
                                    <div className="prop-pic">
                                        <img src={this.state.base_url + this.props.userDetails[0].JM_Profile_Pic} alt="no image"/>
                                    </div>
                                    <div className="name">
                                        <h3>{this.props.userDetails[0].JM_Name}</h3>
                                        <p>{this.props.userDetails[0].JM_Email}</p>
                                    </div>
                                    <div className="button-part">

                                        {/* <div className="btun-box">
                                            <button className="big-btun">Follow me on Instagram </button>
                                            <div className="icon"><img src={"images/insta.png"} /></div>
                                        </div> */}

                                        {
                                        
                                        this.state.linkMaster &&  this.state.linkMaster.map((link,i) =>(                   
                                            link.LM_Url !== "" ?
                                            <div className="btun-box">
                                                <button className="big-btun">Follow me on  {link.LM_Title}</button>
                                                <div className="icon">
                                                    <img src={this.state.base_url + link.LM_Image} />
                                                </div>
                                            </div>
                                            :
                                            null
                                        ))
                                        }
                                        {/* <div className="btun-box">
                                            <button className="big-btun">I'll send you a video message</button>
                                            <div className="icon"><PlayCircleOutlineIcon style={{ fontSize: 35 }}/></div>
                                            <button className="buy">Buy</button>
                                        </div>

                                        <div className="btun-box">
                                            <button className="big-btun">Follow me on Youtube </button>
                                            <div className="icon"><img src={"images/youtube.png"} /></div>
                                        </div>                       */}
                                    </div>
                                    </div>
                                </div>
                                <div className="per-prop-footer">
                                    <ul className="Social-links">
                                        {/* <li><Link href="#"> <FontAwesomeIcon icon={faYoutube}/></Link></li>
                                        <li><Link href="#"><FontAwesomeIcon icon={faFacebook}/></Link></li>
                                        <li><Link href="#"> <FontAwesomeIcon icon={faInstagram}/></Link></li>   */}
                                    </ul>
                                </div>
                                </div>
                            </div>                        
                            </div>
                        </div>
                    </div> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                    </Modal>
           
}
            </div>
        );
    }
}

Preview.propTypes = {

};

export default Preview;