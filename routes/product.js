const express = require("express")
const router = express.Router()

const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    delteProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product")

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

//params routes
router.param("userId", getUserById)
router.param("productId", getProductById)

//all routes

//creating product in DB
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

//getting single product
router.get("/product/:productId", getProduct)

//getting image of the product
router.get("/product/photo/:productId", photo)

//router to get all the product from DB
router.get("/products", getAllProducts)

router.get("/products/categories",getAllUniqueCategories)

//deleting the product from the DB
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, delteProduct)

//updating the product in the db
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)


module.exports = router