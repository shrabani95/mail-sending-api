import React, { Component } from 'react'

class Loader extends Component {
  render() {
    return (
      <>
                   {/* <div class="card-spinner" id="mySpinner">
                         <div animation="border" role="status" className="spinner-border-custom">
                            <span className="sr-only"></span>
                        </div>
                    </div> */}

                  <div className="loading"></div>
      </>
    )
  }
}

export default Loader;
