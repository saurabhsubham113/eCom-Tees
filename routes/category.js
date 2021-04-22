const express = require("express")
const router = express.Router()
const { getCategoryById, createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')

//params
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

//routes
//creating category by admin only
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)

//getting a specific category
router.get("/category/:categoryId", getCategory)
//getting all category
router.get("/categories", getAllCategory)

//updating category
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory)

//delete category
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteCategory)


module.exports = router