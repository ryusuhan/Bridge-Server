const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let userIdx = req.body.userIdx;
	let ccmtIdx = req.body.ccmtIdx;

	if (!ccmtIdx || !userIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		let deleteQuery = 'DELETE FROM Ccomment WHERE ccmtIdx=? and userIdx = ?'
	    let deleteResult = await db.queryParam_Arr(deleteQuery,[ccmtIdx, userIdx]);

		if (!deleteResult) {
			res.status(500).send({
			message : "Server error"
			});
		} else {
			res.status(201).send({
			message : "ok",
		});
		}
	}
});

module.exports = router;