const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let userIdx = req.body.userIdx;
	let ircmtIdx = req.body.ircmtIdx;

	if (!ircmtIdx||!userIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let deleteQuery = 'DELETE FROM Irecomment WHERE ircmtIdx=? and userIdx = ?'
			let deleteResult = await db.queryParam_Arr(deleteQuery,[ircmtIdx, userIdx]);

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
