import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { loadCart, cartEmpty } from './helper/cartHelper'
import { getmeToken, processPayment } from './helper/paypalPaymentHelper'
import { createOrder } from './helper/orderHelper'

import DropIn from "braintree-web-drop-in-react"

const PaypalPayment = ({ products, setReload, reload = undefined }) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAuthenticated().user.id
    const token = isAuthenticated().token



    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            console.log("Information", info);
            if (info.error) {
                setInfo({ ...info, error: info.error })
            } else {

                const clientToken = info.clientToken
                setInfo({ clientToken })
            }

        })
        console.log(info)
    }

    const showBTdropIn = () => (
        <div >
            {info.clientToken !== null && products.length > 0 ?
                (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        <button
                            className="btn btn-block btn-success"
                            onClick={onPurchase}>
                            Buy
                        </button>
                    </div>
                ) : (
                    <h3>please login pr add in cart</h3>
                )
            }
        </div>
    )
    useEffect(() => {
        getToken(userId, token)
    }, [])

    const onPurchase = () => {
        setInfo({ loading: true })
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                }
                processPayment(userId, token, paymentData)
                    .then(res => {
                        setInfo({ ...info, success: res.success, loading: false })
                        console.log("payment success");
                        const orderData = {
                            products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount
                        }

                        createOrder(userId, token, orderData)
                        //empty the cart
                        cartEmpty(() => {
                            console.log("cart being empty")
                        })
                        //force reload
                        setReload(!reload)
                    })
                    .catch(err => {
                        setInfo({ loading: false, success: false })
                        console.log("payment falire", err);

                    })
            })
    }

    const getAmount = () => {
        let amount = 0

        products.map(product => {
            amount += product.price
        })

        return amount
    }
    return (
        <div>
            <h1>your bill is {getAmount()} $</h1>
            {showBTdropIn()}
        </div>
    )
}

export default PaypalPayment
