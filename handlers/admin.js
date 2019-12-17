const db = require('../models');

// create admin account
exports.createAdminAccount = async function (req, res, next) {
    if (req.body.adminCode === 'sampleAdminCode123') {
        try {
            // object for new admin account
            let newAdmin = new db.Admin({
                username: req.body.email
            });

            // use Admin's injected passport functionality to create a new admin object
            // uses the created object listed above, and hashes the password sent to the server
            db.Admin.register(newAdmin, req.body.password, (err, admin) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json(admin);
            })

        } catch (err) {
            return next(err);
        }
    } else {
        let err = new Error("Invalid credentials");
        err.status = 401;
        return next(err);
    }
}