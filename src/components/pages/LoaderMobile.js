import React, { Component } from 'react';


class LoaderMobile extends Component {
    constructor(props) {
        super(props);

    }

    

    render() {
        return (
            <div className="card-spinner-mobile" id="mySpinner">
                    <div animation="border" role="status" className="spinner-border-custom">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    }
}

LoaderMobile.propTypes = {

};

export default LoaderMobile;