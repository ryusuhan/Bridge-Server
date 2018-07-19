var express = require('express');
var router = express.Router();

router.use('/addgroup',require('./addgroup.js'));
router.use('/getgroupcontents',require('./getgroupcontents.js'));
router.use('/groupdelete',require('./groupdelete.js'));
router.use('/contentsdelete',require('./contentsdelete.js'));
router.use('/grouplist', require('./grouplist.js'));
router.use('/groupmodify', require('./groupmodify.js'));
router.use('/recentvideo', require('./recentvideo.js'));
router.use('/addgroupcontents', require('./addgroupcontents.js'));
module.exports = router;