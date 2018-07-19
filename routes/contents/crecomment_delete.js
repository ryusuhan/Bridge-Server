const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let userIdx = req.body.userIdx;
	let crecmtIdx = req.body.crecmtIdx;

	if (!crecmtIdx || !userIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let deleteQuery = 'DELETE FROM Crecomment WHERE crecmtIdx=? and userIdx=?'
			let deleteResult = await db.queryParam_Arr(deleteQuery,[crecmtIdx, userIdx]);

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
