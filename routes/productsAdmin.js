const express = require('express');
const router = express.Router({mergeParams: true});

// CRUD functions
const { createProduct, updateProduct, deleteProduct } = require('../handlers/productsAdmin');

// routes prefixed with /products on the server.js file
router.route('/').post(createProduct);
// product_id will be used as a variable for mongoose functions for finding documents by id
router.route('/:product_id').put(updateProduct).delete(deleteProduct);

module.exports = router;