const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
	let userIdx = req.body.userIdx;
	let fboardContent = req.body.fboardContent;
	let contentsIdx = req.body.contentsIdx; 
	console.log(fboardContent);
	if (!userIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let registerfeedbackQuery = 'INSERT INTO Feedback (contentsIdx, fboardContent, fboardDate, userIdx) VALUES (?,?,?,?)'
			let registerReview = await db.queryParam_Arr(registerfeedbackQuery, [contentsIdx, fboardContent, currentTime, userIdx]);

			if (!registerReview) {
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
