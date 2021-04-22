const User = require("../models/user")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

//signup
exports.signup = (req, res) => {
    //binding validation result to the Request 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json({
            errors: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            })
        }


        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}

//signed in
exports.signin = (req, res) => {
    //error handling part
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json({
            errors: errors.array()[0].msg
        })
    }

    //code part
    const { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User does not exits"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        //create a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        //put it in cookie
        res.cookie("token", token, { expire: new Date() + 9999 })

        //send response to front end
        const { _id, name, email, lastname, role } = user
        return res.json({
            token,
            user: {
                id: _id,
                name,
                email,
                lastname,
                role
            }
        })
    })

}

//signed out
exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({ message: "user signed out successfully" })
}



//protected route

exports.isSignedIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
})

//custom middlewares

exports.isAuthenticated = (req, res, next) => {
    // req.auth comes from the  expressJwt middleware
    let checker = req.profile && req.auth && req.profile.id == req.auth.id

    if (!checker) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }

    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not admin, Access denied"
        })
    }

    next()
}