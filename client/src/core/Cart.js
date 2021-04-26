import React, { useEffect, useState } from 'react'
import Base from "./Base"
import Card from './Card'
import { loadCart } from './helper/cartHelper';
import { getProducts } from './helper/coreapicalls';
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

    // const loadCheckout = () => (
    //     <div >
    //         <h2>This is to load check out</h2>
    //     </div>
    // )
    return (
        <Base title="Cart Page" description="Ready to Checkout">
            <div className="row text-center">
                <div className="col-6">
                    {loadAllProducts()}
                </div>
                <div className="col-6">
                    <StripeCheckout
                        products={products}
                        setReload={setReload}
                        reload={reload}
                    />
                </div>
            </div>
        </Base>
    )
}

export default Cart

