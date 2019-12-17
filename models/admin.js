const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');


// admin account schema

const adminSchema = new mongoose.Schema({
    email: String,
    password: String
});

// insert passport methods into the adminSchema
adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', adminSchema);