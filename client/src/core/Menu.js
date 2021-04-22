import React from 'react'
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper"

const Menu = ({ history }) => {
    const currentTab = (history, path) => {
        if (history.location.pathname === path)
            return { color: "#2ecc72" }

        return { color: "#fff" }
    }
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/" >Home </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart" >Cart </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard" >Dashboard </Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard" >A. Dashboard </Link>
                    </li>
                )}


                {!isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup" >Sign up </Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin" > sign in </Link>
                        </li>
                    </>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span onClick={() => signout(() => history.push("/"))}
                            className="nav-link text-warning">sign out</span>
                    </li>
                )}
            </ul>

        </div>
    )
}

export default withRouter(Menu)
