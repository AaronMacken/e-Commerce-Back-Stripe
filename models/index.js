const mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.Promise = Promise;

<<<<<<< HEAD
mongoose.connect(process.env.DATABASEURI || 'mongodb://localhost/hippieHouse', {
=======
mongoose.connect('mongodb://localhost/hippieHouse', {
>>>>>>> 79587519a7a571d07b20744b6d891a8193ddb002
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

module.exports.Admin = require('./admin');
module.exports.Product = require('./product');