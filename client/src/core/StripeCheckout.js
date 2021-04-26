import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StripeCheckOutButton from 'react-stripe-checkout';
import { isAuthenticated } from '../auth/helper'
import { API } from '../backend';
import { cartEmpty, loadCart } from './helper/cartHelper'


const StripeCheckout = ({ products, setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });
    const { user, token } = isAuthenticated()

    const getFinalPrice = () => {
        let amount = 0
        products.map(p => {
            amount += p.price
        })
        return amount
    }

    const makePayment = token => {
        const body = {
            token,
            products
        }

        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(res => {
            const { status } = res
            console.log(status, "status");
            cartEmpty()
        })
            .catch(err => console.log(err))
    }
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">
                <StripeCheckOutButton
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
                    token={makePayment}
                    amount={getFinalPrice() * 100}
                    name="Buy T-shirts"
                    shippingAddress
                    billingAddress
                >
                    Pay with stripe
                </StripeCheckOutButton>
            </button>
        ) : (
            <Link to="/signin" >
                <button className="btn btn-warning">sign in</button>
            </Link>
        )
    }
    return (
        <div>
            <h2 className="text-white">stripe check out loaded {getFinalPrice()}</h2>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout
