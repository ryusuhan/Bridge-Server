const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let userIdx = req.body.userIdx; 
	let icmtIdx = req.body.icmtIdx;

	if (!icmtIdx || !userIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let deleteQuery = 'DELETE FROM Icomment WHERE icmtIdx=? and userIdx = ?'
			let deleteResult = await db.queryParam_Arr(deleteQuery,[icmtIdx, parseInt(userIdx, 10)]);

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