var express = require('express');
var router = express.Router();


router.use('/search',require('./search.js'));
router.use('/getonehash', require('./getonehash.js'))

module.exports = router;