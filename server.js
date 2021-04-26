if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()

}
//calling the database configuration
require("./DB/dbConfig")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

//Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const stripeRoutes = require("./routes/stripePayment")

const app = express()

app.use(cors("*"))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if (process.env.NODE_ENV !== "production") {
    app.use(require("morgan")("dev"))

}
//routing

app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)
app.use("/api", stripeRoutes)


app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`)
})