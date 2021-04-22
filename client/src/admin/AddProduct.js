import React, { useEffect, useState } from 'react'
import Base from '../core/Base'

import { Link } from 'react-router-dom'

import { isAuthenticated } from '../auth/helper';
import { getAllCategories, createaProduct } from './helper/adminapicall';

const AddProduct = () => {

    const { user, token } = isAuthenticated()
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    });

    //destructuring state
    const { name, description, price, stock,
        photo, categories, category, loading, error,
        createdProduct, getaRedirect, formData } = values

    const preLoad = () => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, categories: data, formData: new FormData() })
                }
            })
    }

    useEffect(() => {
        preLoad()
    }, []);

    const handleChange = (e) => {
        const value = e.target.name === "photo" ? e.target.files[0] : e.target.value
        formData.set(e.target.name, value)
        setValues({ ...values, [e.target.name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        setValues({ ...values, error: "", loading: true })
        createaProduct(user.id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }

                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    photo: "",
                    stock: "",
                    loading: false,
                    createdProduct: data.name
                })
            }).catch(err => console.log(err))

    }

    const successMessage = () => (
        <div className="alert alert-success mt-3"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h4>{createdProduct} created successfully</h4>
        </div>
    )

    const errorMessage = () => {

    }
    const createProductForm = () => (
        <form onSubmit={handleSubmit}>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange}
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange}
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange}
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange}
                    name="category"
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories && categories.map((cate, index) => (
                        <option key={index} value={cate._id}>{cate.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange}
                    type="number"
                    name="stock"
                    className="form-control"
                    placeholder="stock"
                    value={stock}
                />
            </div>

            <button type="submit" className="btn btn-outline-success mb-3">
                Create Product
              </button>
        </form>
    );

    return (
        <Base title="Welcome to Add Product Section"
            description="Add a product Here"
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>

            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {createProductForm()}
                </div>

            </div>
        </Base>
    )
}

export default AddProduct
