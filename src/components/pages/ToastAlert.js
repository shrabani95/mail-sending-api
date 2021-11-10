import React, { Component } from 'react';
import {Toast} from 'react-bootstrap';

class ToastAlert extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false
        }
    }

    
    render() {
        return (
            <div className="toast_custom" style={{zIndex:'99'}}>
                 
                    
                            <Toast  onClose={this.props.hideToast} show={this.props.show} delay={3000} autohide>
                            <Toast.Header>
                                <img
                                 src={this.props.image} 
                                className="rounded mr-2"
                                alt=""
                                />
                                <strong className="mr-auto">{this.props.title}</strong>
                                {/* <small>11 mins ago</small> */}
                            </Toast.Header>
                            <Toast.Body>{this.props.msg}</Toast.Body>
                            </Toast>
                      
            </div>
        );
    }
}



export default ToastAlert;
