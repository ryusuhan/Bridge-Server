const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let userIdx = req.body.userIdx;
	let groupIdx = req.body.groupIdx;
	
	if ((groupIdx==null) || (userIdx==null)) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		 let deleteQuery = 'DELETE FROM Bridge.group WHERE groupIdx=? and userIdx = ?'
	     let deleteResult = await db.queryParam_Arr(deleteQuery,[groupIdx, userIdx]);

			if (!deleteResult) {
				res.status(500).send({
					message : "Fail at Server"
				});
			} else {
				res.status(201).send({
					message : "ok",
				});
			}
		}
});

module.exports = router;
