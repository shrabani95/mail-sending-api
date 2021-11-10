import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cards extends Component {
    constructor(props) {
        super(props);

    }

    

    render() {
        return (
            <div class="container">
                <div class="row">
                     <div class="col-md-3">
                        <div class="stati bg-orange ">
                        <i class="icon-wrench icons"></i>
                        <div>
                            <b>62</b>
                            <span>bg-orange</span>
                        </div> 
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stati concrete ">
                        <i class="icon-book-open icons"></i>
                        <div>
                            <b>56</b>
                            <span>.concrete</span>
                        </div> 
                        </div>
                    </div> 
                    <div class="col-md-3">
                        <div class="stati concrete left">
                        <i class="icon-basket-loaded icons"></i>
                        <div>
                            <b>57</b>
                            <span>.concrete left</span>
                        </div> 
                        </div>
                    </div> 
                    <div class="col-md-3">
                            <div class="stati bg-concrete ">
                                <i class="icon-basket icons"></i>
                                <div>
                                    <b>58</b>
                                    <span>bg-concrete</span>
                                </div> 
                                </div>
                            </div> 
                    <div class="col-md-3">
                                    <div class="stati bg-concrete left">
                                    <i class="icon-bag icons"></i>
                                    <div>
                                        <b>59</b>
                                        <span>bg-concrete left</span>
                                    </div> 
                                    </div>
                                </div> 
                </div>
            </div>
        );
    }
}

Cards.propTypes = {

};

export default Cards;