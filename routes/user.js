const express = require("express")
const router = express.Router()
const { getUserById, getUser, updateUser,userPurchaseList } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")

//using params so that it is called once and we don't have to call 
// again and again to get user by id and saving a instance of user in "req.profile"
router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList)


module.exports = router