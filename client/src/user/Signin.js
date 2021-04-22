import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Base from '../core/Base'
import { authenticate, signin, isAuthenticated } from "../auth/helper"

const Signin = () => {

    const [values, setValues] = useState({
        email: "subham@gmail.com",
        password: "1234",
        error: "",
        loading: false,
        didRedirect: false
    })

    const { email, password, error, loading, didRedirect } = values
    const user = isAuthenticated()

    const handleChange = (e) => {
        setValues({ ...values, error: false, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setValues({ ...values, error: false, loading: true })

        signin({ email, password })
            .then(data => {
                if (data.errors || data.error) {
                    setValues({ ...values, error: data.errors || data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({ ...values, didRedirect: true })
                    })
                }
            })
            .catch(err => console.log("signin request failed"))
    }

    const LoadingMessage = () => (

        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    )

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            }

            return <Redirect to="/user/dashboard" />
        }

        if (isAuthenticated())
            return <Redirect to="/" />
    }
    const errorMessage = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
            </div>
        </div>
    )
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="text-light">Email</label>
                            <input value={email} onChange={handleChange} name="email" className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="text-light">Password</label>
                            <input value={password} onChange={handleChange} name="password" className="form-control" type="password" />
                        </div>
                        <button className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="Sign in page" description="A page for user to sign in!" >
            {LoadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin