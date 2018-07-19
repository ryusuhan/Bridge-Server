var express = require('express');
var router = express.Router();


router.use('/login',require('./login.js'));
router.use('/contentsdelete',require('./contentsdelete.js'));
router.use('/contentsmodify', require('./contentsmodify.js'));

module.exports = router;