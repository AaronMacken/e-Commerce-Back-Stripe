const express = require('express');

const router = express.Router({mergeParams: true});

// CRUD functions
const { getProduct, getAllProducts, createProduct, updateProduct, deleteProduct } = require('../handlers/products');

// routes prefixed with /products on the server.js file
router.route('/').get(getAllProducts).post(createProduct);

// product_id will be used as a variable for mongoose functions for finding documents by id
router.route('/:product_id').get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;