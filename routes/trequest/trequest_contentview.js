const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/:iboardIdx', async (req, res) => {
	
	let iboardIdx = req.params.iboardIdx; 

	if (!iboardIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let viewQuery = 'SELECT iboardUrl, iboardContent, iboardDate, iboardTitle, userIdx From Interpretation WHERE iboardIdx=?'
			let viewResult = await db.queryParam_Arr(viewQuery,[iboardIdx]);

			if (!viewResult) {
				res.status(500).send({
					message : "Server error"
				});
			} else {
				res.status(201).send({
					message : "ok",
					data : [{request_list : viewResult}]
				});
			}
		}
});

module.exports = router;