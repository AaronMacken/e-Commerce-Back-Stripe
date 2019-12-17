const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');


// admin account schema
const adminSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

// insert passport methods into the adminSchema
adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;