const mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/hippieHouse', {
    keepAlive: true,
    useNewUrlParser: true
});

module.exports.Admin = require('./admin');
module.exports.Product = require('./product');