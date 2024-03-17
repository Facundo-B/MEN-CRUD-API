const Product = require("../models/product.model")


getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": error.message })
    }
}

getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": error.message })
    }
}

addProduct = async (req, res) => {
    try {
        const new_product = await Product.create(req.body);
        res.status(200)
        res.json(new_product)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": error.message })
    }
}

updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        if (!product) {
            return res.status(404).json({ "message": "Product not found. Please, check id." })
        }

        const upd_product = await Product.findById(req.params.id)
        res.status(200).json(upd_product)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": error.message })
    }
}

deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ "message": "Product not found. Please, check id." })
        }

        await Product.findById(req.params.id)
        res.status(200).json({ "message": `Product with id ${req.params.id} has been removed.` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": error.message })
    }
}

module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addProduct
}