const db = require("../models");

exports.createProduct = async function(req, res, next) {
    console.log('route reached')
    console.log(req.body);
    try {
        let product = await db.Product.create({
            title: req.body.productData.title,
            price: req.body.productData.price
        })
        return res.status(200).json(product);
    } catch(err) {
        console.log('issue');
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