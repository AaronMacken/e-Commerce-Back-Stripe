const express = require('express'),
    router = express.Router();

const { createAdminAccount } = require('../handlers/admin');

// create admin account -- prefixed with /admin
router.route('/').post(createAdminAccount);

module.exports = router;