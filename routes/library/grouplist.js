const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.get('/:userIdx', async (req, res) => {
	
	let userIdx = req.params.userIdx;
	let selectLibQuery = `SELECT userIdx FROM User WHERE userIdx = ?`
	let selectLibResult = await db.queryParam_Arr(selectLibQuery, [userIdx]);

	if(!selectLibResult) {
		res.status(400).send({
			message : "Null Value"
		});
	}  else {
		let selectGroupQuery = `SELECT groupTitle, groupBgimage, groupIdx, groupColor from Bridge.group WHERE userIdx = ? ORDER BY groupIdx DESC `
		let selectGroupResult = await db.queryParam_Arr(selectGroupQuery,[selectLibResult[0].userIdx]);

		if(!selectGroupResult){
			res.status(500).send({
				message : "Server error"
			});
		} else {
			res.status(200).send({
				message : "ok",
				data : [{group_list : selectGroupResult}]
			});
		}
	}

});

module.exports = router;
