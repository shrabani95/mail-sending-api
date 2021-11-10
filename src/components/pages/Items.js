import React, { Component } from 'react';

import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';


class Items extends Component {
    constructor(props) {
        super(props);

    }

    
    render() {
        return (
            <div>
               
              <div className="row">
                <div className="profile-box">
                  <div className="browseitem">
                    <div className="cards">
                      <img src={"images/prop.png"} />
                      <div className="top-part">
                        <div className="icon">
                          <img src={"images/prop.png"} />
                        </div>
                        <div className="name">
                          <h4>Prosant Banu</h4>
                          <p>Senior Developer</p>
                        </div>  
                      </div>
                      <div className="bottom-part">
                        <div className="left">
                          <button><ChatOutlinedIcon/></button>
                        </div>
                        <div className="middle">
                          <h4>Get a video message from me</h4>
                        </div>
                        <div className="right">
                          <button>Buy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="browseitem">
                    <div className="cards">
                      <img src={"images/prop_2.png"} />
                      <div className="top-part">
                        <div className="icon">
                          <img src={"images/prop_2.png"} />
                        </div>
                        <div className="name">
                          <h4>Prosant Banu</h4>
                          <p>Senior Developer</p>
                        </div>  
                      </div>
                      <div className="bottom-part">
                        <div className="left">
                          <button><ChatOutlinedIcon/></button>
                        </div>
                        <div className="middle">
                          <h4>Get a video message from me</h4>
                        </div>
                        <div className="right">
                          <button>Buy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="browseitem">
                    <div className="cards">
                      <img src={"images/prop.png"} />
                      <div className="top-part">
                        <div className="icon">
                          <img src={"images/prop.png"} />
                        </div>
                        <div className="name">
                          <h4>Prosant Banu</h4>
                          <p>Senior Developer</p>
                        </div>  
                      </div>
                      <div className="bottom-part">
                        <div className="left">
                          <button><ChatOutlinedIcon/></button>
                        </div>
                        <div className="middle">
                          <h4>Get a video message from me</h4>
                        </div>
                        <div className="right">
                          <button>Buy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}



export default Items;