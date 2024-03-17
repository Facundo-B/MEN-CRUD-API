const express = require("express")
const router = express.Router()
require("../controllers/product.controller")

//GET

router.get('/', getProducts)

router.get('/:id', getProductById)

//POST

router.post('/', addProduct)

//PUT

router.put('/:id', updateProduct)

//DELETE

router.delete('/:id', deleteProduct)

module.exports = router;