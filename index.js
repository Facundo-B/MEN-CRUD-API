const express = require('express')
const mongoose = require('mongoose');
require("dotenv").config()
const mongo_pass = process.env.mongo_pass

const Product = require("./models/product.model.js")
const app = express()
const productRouter = require("./routes/product.router.js")
//database setup
mongoose.connect(`mongodb+srv://admin:${mongo_pass}@cluster0.l2sq6ch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Connected to database!')
        app.listen(3000, () => { console.log("Server running on port 3000") })
    })
    .catch(() => console.log('Connection to database has failed'))

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes

app.use("/api/products", productRouter)

app.get('/', function (req, res) {
    res.send('Hello World, I love you. The app is running, by the way')
})




