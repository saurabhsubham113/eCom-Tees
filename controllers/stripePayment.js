const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const uuid = require("uuid")

exports.makePayment = (req, res) => {
    const { products, token } = req.body

    let amount = 0
    products.map(p => {
        amount += p.price
    })

    const idempotencyKey = uuid.v4()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: "A test account",

            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip,
                }
            }
        }, { idempotencyKey })
            .then(result => res.json(result))
            .catch(err => console.log(err))
    })
}