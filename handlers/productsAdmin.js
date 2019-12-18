const db = require("../models");

exports.createProduct = async function(req, res, next) {
    try {
        let product = await db.Product.create({
            title: req.body.title,
            price: req.body.price
        })
        return res.status(200).json(product);
    } catch(err) {
        return next(err)
    }
}

exports.updateProduct = async function(req, res, next) {
    try {
        // find DB document by req.params.product_id, update JSON with req.body, return updated object via json
        let foundProductUpdate = await db.Product.findOneAndUpdate({_id: req.params.product_id}, req.body, {new: true});
        return res.status(200).json(foundProductUpdate);
    } catch(err) {
        return next(err);
    }
}

exports.deleteProduct = async function(req, res, next) {
    try {
        let foundProductDelete = await db.Product.findById(req.params.product_id);
        await foundProductDelete.remove();
        return res.status(200).json(foundProductDelete);
    }
    catch (err) {
        return next(err);
    }
}