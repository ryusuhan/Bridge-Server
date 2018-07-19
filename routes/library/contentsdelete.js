const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {

	let userIdx = req.body.userIdx;
	let contentsIdx = req.body.contentsIdx;
	if ((userIdx==null)||(contentsIdx==null)) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		 let deleteQuery = 'DELETE FROM GroupContent WHERE contentsIdx = (SELECT contentsIdx FROM Bridge.group WHERE Bridge.group.userIdx=? and contentsIdx =? and GroupContent.groupIdx = Bridge.group.groupIdx)'
	     let deleteResult = await db.queryParam_Arr(deleteQuery,[userIdx, contentsIdx]);

			if (!deleteResult) {
				res.status(500).send({
					message : "Server error"
				});
			} else {
				res.status(201).send({
					message : "ok"
				});
			}
		}
});

module.exports = router;
