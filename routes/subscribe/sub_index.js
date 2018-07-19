var express = require('express');
var router = express.Router();


router.use('/getsubhashlist',require('./getsubhashlist.js'));
router.use('/hashcontentlist',require('./hashcontentlist.js'));
router.use('/recommendedhashlist',require('./recommendedhashlist.js'));
router.use('/subscribemodify',require('./subscribemodify.js'));
module.exports = router;
