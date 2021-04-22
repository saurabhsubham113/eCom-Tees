const User = require("../models/user")
const  Order  = require("../models/order")


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {

            return res.status(400).json({
                error: "No user was found"
            })
        }

        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    const { _id, role, purchases, name, lastname, email } = req.profile
    return res.json({ _id, role, purchases, name, lastname, email })
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Update Failed"
                })
            }
            const { _id, role, purchases, name, lastname, email } = user
            return res.json(
                { _id, role, purchases, name, lastname, email }
            )
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No order found with this account"
                })
            }

            return res.json({
                order
            })
        })
}

//middleware
exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction: req.body.order.transaction_id
        })
    })

    //store this in DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err)
                return res.status(400).json({
                    error: "unable to save purchase List"
                })

            next()
        }
    )

}