 const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {

	let iboardIdx = req.body.iboardIdx;

	if (!iboardIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let deleteQuery = 'DELETE FROM Interpretation WHERE iboardIdx=?'
			let deleteResult = await db.queryParam_Arr(deleteQuery,[iboardIdx]);

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