import React, { useEffect, useState } from 'react'
import Base from "./Base"
import Card from './Card'
import { getProducts } from './helper/coreapicalls';


const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false)

    const loadAllProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
    }, []);

    return (
        <Base title="Home page">
            <div className="row text-center">
                <h1 className="text-white">All of T Shirts</h1>
                <div className="row">
                    {products.map(product => (
                        <div key={product._id} className="col-4 mb-4">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Base>
    )
}

export default Home
