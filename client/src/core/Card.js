import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router';
import { addItem, removeItem } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper'

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f, //function(f){return f}
    reload = undefined
}) => {

    const [redirect, setRedirect] = useState(false);

    const cartTitle = product ? product.name : "A Photo from pexels"
    const cartDescription = product ? product.decription : "Description loading ..."
    const cartPrice = product ? product.price : "price loading ..."

    const addToCart = () => {
        addItem(product, () => setRedirect(true))
    }

    const getaRedirect = (redirect) => {
        if (redirect)
            return <Redirect to="/cart" />
    }

    const showAddToCart = () => {
        return addtoCart && (
            <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
            >
                Add to Cart
            </button>
        )
    }
    const showRemoveFromCart = () => {
        return removeFromCart && (
            <button
                onClick={() => {
                    removeItem(product._id)
                    setReload(!reload)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
                Remove from cart
            </button>
        )
    }
    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                {getaRedirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cartDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addtoCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Card
