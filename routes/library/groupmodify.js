const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
	let userIdx = req.body.userIdx;
	let groupIdx = req.body.groupIdx;
	let selectLibQuery = `SELECT userIdx from Bridge.group WHERE userIdx = ?`
	let selectLibResult = await db.queryParam_Arr(selectLibQuery, [userIdx]);

	if(!selectLibResult) {
		res.status(500).send({
			message : "server error"
		});
	} else {
		let groupCheckQuery = 'SELECT groupIdx FROM Bridge.group WHERE groupIdx = ?'
		let groupCheckResult = await db.queryParam_Arr(groupCheckQuery,[groupIdx]);
		if(!groupCheckResult){
			res.status(400).send({
				message : "null Value"
			});
		} else {
			let groupTitle = req.body.groupTitle;
			let groupColor = req.body.groupColor;
			let updateQuery = `UPDATE Bridge.group SET groupTitle = ?, groupColor =? WHERE groupIdx = ?`
			let updateResult = await db.queryParam_Arr(updateQuery, [groupTitle, groupColor, groupIdx]);

			if(!groupTitle || !groupColor){
				res.status(400).send({
					message : "null Value"
				});
			} else {
			if(!updateResult){
				res.status(500).send({
					message : "Server error"
				});
			} else {
				res.status(201).send({
					message : "ok"
				});
			}
		}
	}
}
});

module.exports = router;
