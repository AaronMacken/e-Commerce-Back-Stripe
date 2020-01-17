const db = require("../models");
<<<<<<< HEAD
const fs = require("fs");
=======
>>>>>>> 79587519a7a571d07b20744b6d891a8193ddb002

exports.createProduct = async function(req, res, next) {
  try {
    let product = await db.Product.create({
<<<<<<< HEAD
      title: req.body.title,
      price: req.body.price,
      productImage: req.file.path
    });
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
=======
      title: req.body.productData.title,
      price: req.body.productData.price
    });
    return res.status(200).json(product);
  } catch (err) {
>>>>>>> 79587519a7a571d07b20744b6d891a8193ddb002
    return next(err);
  }
};

exports.updateProduct = async function(req, res, next) {
  try {
    // find DB document by req.params.product_id, update JSON with req.body, return updated object via json
    console.log(req.body.payload);
    let foundProductUpdate = await db.Product.findOneAndUpdate(
      { _id: req.params.product_id },
      req.body.payload,
      { new: true }
    );
    return res.status(200).json(foundProductUpdate);
  } catch (err) {
    return next(err);
  }
};

exports.deleteProduct = async function(req, res, next) {
  try {
<<<<<<< HEAD
    // remove item from DB
    let foundProductDelete = await db.Product.findById(req.params.product_id);
    await foundProductDelete.remove();

    // remove item's picture from assets
    fs.unlink(foundProductDelete.productImage, err => {
      if (err) console.log(err);
      console.log(`${foundProductDelete.productImage} deleted`);
    });

=======
    let foundProductDelete = await db.Product.findById(req.params.product_id);
    await foundProductDelete.remove();
>>>>>>> 79587519a7a571d07b20744b6d891a8193ddb002
    return res.status(200).json(foundProductDelete);
  } catch (err) {
    return next(err);
  }
};
