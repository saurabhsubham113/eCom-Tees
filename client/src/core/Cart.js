import React, { useEffect, useState } from 'react'
import Base from "./Base"
import Card from './Card'
import { loadCart } from './helper/cartHelper';
import { getProducts } from './helper/coreapicalls';
import PaypalPayment from './PaypalPayment';
import StripeCheckout from './StripeCheckout';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart)
    }, [reload]);

    const loadAllProducts = () => (
        <div >
            <h2>This section is to load products</h2>
            {products.map(product => (
                <Card key={product._id} reload={reload} setReload={setReload} product={product} removeFromCart={true} addtoCart={false} />
            ))}
        </div>
    )

   
    return (
        <Base title="Cart Page" description="Ready to Checkout">
            <div className="row text-center">
                <div className="col-6">
                    {products.length > 0 ? loadAllProducts() : (
                        <h3>No Products in cart</h3>
                    )}
                </div>
                <div className="col-6">
                    {/* <StripeCheckout
                        products={products}
                        setReload={setReload}
                        reload={reload}
                    /> */}
                    <PaypalPayment products={products} reload={reload} setReload={setReload} />
                </div>
            </div>
        </Base>
    )
}

export default Cart

