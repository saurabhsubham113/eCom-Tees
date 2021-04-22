import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'
import Base from '../core/Base'

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, error, success } = values

    const handleChange = (e) => {
        setValues({ ...values, error: false, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        setValues({ ...values, error: false })

        signup({ name, email, password })
            .then(data => {
                console.log(data);
                if (data.errors) {
                    setValues({ ...values, error: data.errors, success: false })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }

            })
            .catch(err => console.log("error in signup"))
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="text-light">Name</label>
                            <input
                                className="form-control"
                                name="name"
                                type="text"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="text-light">Email</label>
                            <input
                                className="form-control"
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="text-light">Password</label>
                            <input
                                className="form-control"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => (

        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">

                <div className="alert alert-success"
                    style={{ display: success ? "" : "none" }}
                >
                    New account was created successfully
            please <Link to="/signin">Sign in</Link>
                </div>
            </div>
        </div>
    )

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
    return (
        <Base title="Sign up page" description="A page for user to sign up!" >
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    )
}

export default Signup
