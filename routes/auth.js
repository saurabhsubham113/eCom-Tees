const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const { signout, signup, signin } = require('../controllers/auth')

//signup route
router.post("/signup",
    //custom checks whether user is giving correct info or not
    [
        check("name", "Name should be min 3 charachter long").isLength({ min: 3 }),
        check("email", "Enter a valid email").isEmail(),
        check("password", "password should be min 3 charachter long").isLength({ min: 3 })
    ],
    signup
)

//signin route
router.post("/signin",
    //custom checks whether user is giving correct info or not
    [
        check("email", "Enter a valid email").isEmail(),
        check("password", "password is required").isLength({ min: 1 })
    ],
    signin
)

//signout route
router.get("/signout", signout)


module.exports = router