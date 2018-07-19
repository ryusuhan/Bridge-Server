var express = require('express');
var router = express.Router();

router.use('/login',require('./login.js'));
router.use('/quit',require('./quit.js'));
router.use('/getmytext', require('./getmytext.js'));

module.exports = router;