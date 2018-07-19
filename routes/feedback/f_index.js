var express = require('express');
var router = express.Router();


router.use('/feedback_contentview',require('./feedback_contentview.js'));
router.use('/feedback_write',require('./feedback_write.js'));
router.use('/feedback_listview',require('./feedback_listview.js'));

module.exports = router;