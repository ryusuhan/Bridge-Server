var express = require('express');
var router = express.Router();

router.use('/trequest_write',require('./trequest_write.js'));
router.use('/trequest_contentview',require('./trequest_contentview.js'));
router.use('/trequest_listview',require('./trequest_listview.js'));
router.use('/trequest_delete',require('./trequest_delete.js'));
router.use('/trequest_search',require('./trequest_search.js'));
router.use('/trequestcomment_delete',require('./trequestcomment_delete.js'));
router.use('/trequestcomment_write',require('./trequestcomment_write.js'));
router.use('/trequestcomment_view',require('./trequestcomment_view.js'));
router.use('/trequestrecomment_delete',require('./trequestrecomment_delete.js'));
router.use('/trequestrecomment_write',require('./trequestrecomment_write.js'));
router.use('/trequestrecomment_view',require('./trequestrecomment_view.js'));
router.use('/trequest_listpagination',require('./trequest_listpagination.js'));
router.use('/weblist', require('./weblist.js'));
module.exports = router;
