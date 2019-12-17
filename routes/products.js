const express = require('express');

const router = express.Router({mergeParams: true});

const { getProduct, getAllProducts, createProduct, deleteProduct } = require('../handlers/products');

// routes prefixed with /products on the server.js file
router.route('/').get(getAllProducts).post(createProduct);

// router.route('/:product_id').get(getProduct).delete(deleteProduct);
router.route('/:product_id').get(getProduct).delete(deleteProduct);

module.exports = router;