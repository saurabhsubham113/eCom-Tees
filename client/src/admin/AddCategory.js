import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper'
import { createCategory } from "./helper/adminapicall"
import Base from '../core/Base'

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated()

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3">Admin Home</Link>
        </div>
    )
    const handleChange = (e) => {
        setError("")
        setName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        setError("")
        setSuccess(false)

        //calling api create category
        createCategory(user.id, token, { name })
            .then(data => {
                if (data.error)
                    setError(true)
                else {
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            })
    }

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Category created successFully</h4>
        }
    }
    const errorMessage = () => {
        if (error) {
            return <h4 className="text-error">Failed to create Category</h4>
        }
    }

    const mycategoryForm = () => (
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <p className="lead">Enter a category</p>
                <input type="text"
                    autoFocus
                    required
                    onChange={handleChange}
                    value={name}
                    placeholder="For e.g Summer"
                    className="form-control my-3" />
            </div>
            <button className="btn btn-outline-info my-3">Create Category</button>
        </form>
    )
    return (
        <Base title="Create a category"
            description="Add a new Category for T-shirt"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {mycategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
