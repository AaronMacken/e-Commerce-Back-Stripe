<<<<<<< HEAD
const express = require("express");
const router = express.Router({ mergeParams: true });

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname)
  }
});
const upload = multer({storage: storage});

// CRUD functions
const {
  createProduct,
  updateProduct,
  deleteProduct
} = require("../handlers/productsAdmin");

// routes prefixed with /products on the server.js file
router.post("/", upload.single("productImage"), createProduct);

// product_id will be used as a variable for mongoose functions for finding documents by id
router
  .route("/:product_id")
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
=======
const express = require('express');
const router = express.Router({mergeParams: true});

// CRUD functions
const { createProduct, updateProduct, deleteProduct } = require('../handlers/productsAdmin');

// routes prefixed with /products on the server.js file
router.route('/').post(createProduct);
// product_id will be used as a variable for mongoose functions for finding documents by id
router.route('/:product_id').put(updateProduct).delete(deleteProduct);

module.exports = router;
>>>>>>> 79587519a7a571d07b20744b6d891a8193ddb002
