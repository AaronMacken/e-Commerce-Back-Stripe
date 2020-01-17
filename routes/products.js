const express = require('express');
const router = express.Router({mergeParams: true});

<<<<<<< HEAD
const { getProduct, getAllProducts, getRecent } = require('../handlers/products');

router.route('/').get(getAllProducts);
router.route('/recent').get(getRecent);
=======
const { getProduct, getAllProducts } = require('../handlers/products');

router.route('/').get(getAllProducts);
>>>>>>> 79587519a7a571d07b20744b6d891a8193ddb002
router.route('/:product_id').get(getProduct);

module.exports = router;