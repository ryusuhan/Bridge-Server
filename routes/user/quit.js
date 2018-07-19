const express = require('express');
const router = express.Router();

const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
	let token = req.body.token;

	if(!token){
		res.status(400).send({
			message : "null token"
		});
	} else {
		let userUuid = jwt.verify(token).userUuid;
		if(!userUuid) {
		res.status(400).send({
			message : "Invalied Value"
		});
	} else {
		let selectQuery = `SELECT userUuid FROM User WHERE userUuid = ?`
		let selectResult = await db.queryParam_Arr(selectQuery, [userUuid]);
		if(!selectResult){
			res.status(500).send({
				message : "Server error"
			});
		} else {
		let selectIdxQuery = `SELECT userIdx FROM User WHERE userUuid = ?`
		let selectIdxResult = await db.queryParam_Arr(selectIdxQuery, [userUuid]);

		if(!selectIdxResult){
			res.status(500),send({
				message : "Server error"
			});
		} else {
			let deleteUserQuery = `DELETE FROM User WHERE userIdx = ?`
			let deleteUserResult = await db.queryParam_Arr(deleteUserQuery, [selectIdxResult[0].userIdx]);

			if(!deleteUserResult) {
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
}
});


module.exports = router;