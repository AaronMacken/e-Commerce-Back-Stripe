const db = require("../models");

exports.createProduct = async function(req, res, next) {
  try {
    let product = await db.Product.create({
      title: req.body.title,
      price: req.body.price,
      productImage: req.file.location
    });
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
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
    // remove item from DB
    let foundProductDelete = await db.Product.findById(req.params.product_id);
    // await foundProductDelete.remove();

    // // remove item's picture from assets
    // fs.unlink(foundProductDelete.productImage, err => {
    //   if (err) console.log(err);
    //   console.log(`${foundProductDelete.productImage} deleted`);
    // });
    console.log(foundProductDelete.productImage);
    return res.status(200).json(foundProductDelete);
  } catch (err) {
    return next(err);
  }
};
