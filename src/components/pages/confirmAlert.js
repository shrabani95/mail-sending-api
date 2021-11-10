import React, { Component } from 'react'
import {Link,Route,BrowserRouter as Router,Switch,Redirect} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
class componentName extends Component {

    isConfirm()
    {
        // confirmAlert({
        //   title: 'Confirm !!!',
        //   message: 'Are you sure to Exit',
        //   buttons: [
        //     {
        //       label: 'Yes',
        //       onClick: () => this.setState({confirm:true})
        //     },
        //     {
        //       label: 'No',
        //       onClick: () => this.setState({confirm:false})
        //     }
        //   ]
        // });
        alert('getAlert from Child');
    }
  render() {
    return (
      <>
            <h1>Hello</h1>;
      </>
    )
  }
}

export default componentName
