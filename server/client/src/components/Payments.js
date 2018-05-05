import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Payments extends Component {
    render() {

        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 email credits"
                //amount in cents, amount authorized for charge
                amount={500}
                //callback, auth token from stripe api, user had submitted cc info
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                {/*Use child component as a button*/}
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);
