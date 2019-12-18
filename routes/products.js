const express = require('express');
const router = express.Router({mergeParams: true});

const { getProduct, getAllProducts } = require('../handlers/products');

router.route('/').get(getAllProducts);
router.route('/:product_id').get(getProduct);

module.exports = router;