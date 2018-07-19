var express = require('express');
var router = express.Router();

router.use('/home', require('./home/h_index.js'));
router.use('/search', require('./search/s_index.js'));
router.use('/admin', require('./admin/admin_index.js'));
router.use('/contents', require('./contents/c_index.js'));
router.use('/feedback', require('./feedback/f_index.js'));
router.use('/trequest', require('./trequest/tre_index.js'));
router.use('/user', require('./user/u_index.js'));
router.use('/library', require('./library/lib_index.js'));
router.use('/subscribe', require('./subscribe/sub_index.js'));

module.exports = router;
