import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'config.json'
// import PaymentCashFree from './PaymentCashFree';
//
class Cashfree extends Component {
    constructor(props) {
        super(props);
        this.state={
             cashfreePayUrl: config.paths[config.enviornment].cashfreePayUrl,
            // appId: config.appIdSecretKey[config.enviornment].appId,
            // secretKey: config.appIdSecretKey[config.enviornment].secretKey,
        }
      //console.log(config.paths[config.enviornment].cashfreePayUrl)
    }

    

    render() {
        return (
            <div>
                <table class="mainForm">
                        <tr>
                            <td>order id</td>
                            <td><input type="text" name="orderId"/></td>
                        </tr>
                        <tr>
                            <td>order amount</td>
                            <td><input type="text" name="orderAmount" value="2" /></td>
                        </tr>
                        <tr>
                            <td>customer name</td>
                            <td><input type="text" name="customerName" value="a" /></td>
                        </tr>
                        <tr>
                            <td>customer email</td>
                            <td><input type="text" name="customerEmail" value="a@a.com" /></td>
                        </tr>
                        <tr>
                            <td>customer phone</td>
                            <td><input type="text" name="customerPhone" value="1234512345" /></td>
                            </tr>
                    </table>

                   

            </div>
        );
    }
}

Cashfree.propTypes = {

};

export default Cashfree;