const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.staus(404).json({
                    error: "No product found "
                })
            }

            req.product = product
            next()
        })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with file"
            })
        }
        //checking user is giving correct input value
        const { name, description, price, category, stock } = fields

        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error: "Please include all fields"
            })
        }
        //getting fields from user
        let product = new Product(fields)

        //handling file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "file size too big"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to the DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Not able to save in DB"
                })
            }

            res.json(product)
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.getAllProducts = (req, res) => {
    let limit = parseInt(req.query.limit) || 8
    let sortBy = req.query.sortBy || "_id"
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "No product found"
                })
            }

            res.json(products)
        })
}

exports.delteProduct = (req, res) => {
    let product = req.product
    product.remove((err, deltedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete the product"
            })
        }

        res.json({
            message: "Successfully deleted",
            deltedProduct
        })
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with file"
            })
        }

        //updating the product with new fields
        //it is similar to {...product,field}
        let product = req.product
        product = _.extend(product, fields)

        //handling file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "file size too big"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to the DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "updation failed"
                })
            }

            res.json(product)
        })
    })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "No category found"
            })
        }

        res.json(category)
    })
}


//middlewares
exports.photo = (req, res, next) => {
    //checking if photo is available or not
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)

    }

    next()
}

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: {
                    $inc: {
                        stock: -prod.count,
                        sold: +prod.count
                    }
                }
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(408).json({
                error: "BUlk operation failed"
            })
        }

        next()
    })
}