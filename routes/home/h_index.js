var express = require('express');
var router = express.Router();

//login시 화면 전환돼서 넘어와야 하는 인덱스 처리

router.use('/recent',require('./recent.js'));
router.use('/nowtrend',require('./nowtrend.js'));
router.use('/recommended',require('./recommended.js'));
router.use('/hitsort',require('./hitsort.js'));
router.use('/likesort', require('./likesort.js'));
module.exports = router;