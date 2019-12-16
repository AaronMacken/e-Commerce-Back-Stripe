// getProduct, createProduct, deleteProduct 

  
const db = require("../models");

exports.getAllProducts = async function(req, res, next) {
    try {
        let products = await db.Product.find();
        return res.status(200).json(products);
    } catch(error) {

    }
}

exports.createProduct = async function(req, res, next) {
    try {
        let product = await db.Product.create({
            title: req.body.title,
            price: req.body.price
        })

        product.save();
        console.log(product.title + ' saved to db!')
        return res.status(200).json(product);
    } catch(err) {
        return next(err)
    }
}