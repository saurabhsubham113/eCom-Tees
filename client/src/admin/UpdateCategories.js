import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper'
import { getaCategory, updateCategory } from "./helper/adminapicall"
import Base from '../core/Base'

const UpdateCategories = ({ match }) => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated()

    const preLoad = () => {
        getaCategory(match.params.id)
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError("")
                    setName(data.name)
                }
            })
    }
    useEffect(() => {

        preLoad()
    }, []);
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

        //calling api update category
        updateCategory(match.params.id, user.id, token, { name })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setError(true)
                } else {
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            }).catch(err => console.log(err))

    }

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Category updated successFully</h4>
        }
    }
    const errorMessage = () => {
        if (error) {
            return <h4 className="text-error">Failed to update Category</h4>
        }
    }

    const mycategoryForm = () => (
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <p className="lead">Update your category</p>
                <input type="text"
                    autoFocus
                    required
                    onChange={handleChange}
                    value={name}
                    placeholder="For e.g Summer"
                    className="form-control my-3" />
            </div>
            <button className="btn btn-outline-info my-3">Update Category</button>
        </form>
    )
    return (
        <Base title="Update category"
            description="Updating Category for T-shirt"
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

export default UpdateCategories

