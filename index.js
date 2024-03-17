const express = require('express')
const mongoose = require('mongoose');
require("dotenv").config()
const mongo_pass = process.env.mongo_pass

mongoose.connect(`mongodb+srv://admin:${mongo_pass}@cluster0.l2sq6ch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Connected to database!')
        app.listen(3000, () => { console.log("Server running on port 3000") })
    })
    .catch(() => console.log('Connection to database has failed'));

const Product = require("./models/product.model.js")
const app = express()

app.use(express.json())

//GET

app.get('/', function (req, res) {
    res.send('Hello World, I love you. The app is running, by the way')
});

app.get('/api/products', async (req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({"message": error.message})
    }
})

app.get('/api/product/:id', async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({"message": error.message})
    }
})

//POST

app.post('/api/products', async (req, res)=>{
    try {
        const new_product = await Product.create(req.body);
        res.status(200)
        res.json(new_product)
    } catch (error) {
        console.log(error);
        res.status(500).json({"message": error.message})
    }
})

//PUT

app.put('/api/product/:id', async (req, res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        if (!product){
            return res.status(404).json({"message": "Product not found. Please, check id."})
        }

        const upd_product = await Product.findById(req.params.id)
        res.status(200).json(upd_product)
    } catch (error) {
        console.log(error);
        res.status(500).json({"message": error.message})
    }
})

//DELETE

app.delete('/api/product/:id', async (req, res) =>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product){
            return res.status(404).json({"message": "Product not found. Please, check id."})
        }

        await Product.findById(req.params.id)
        res.status(200).json({"message": `Product with id ${req.params.id} has been removed.`})
    } catch (error) {
        console.log(error);
        res.status(500).json({"message": error.message})
    }
})


