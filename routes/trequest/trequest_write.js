const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
	let userIdx = req.body.userIdx;
	let iboardContent = req.body.iboardContent;
	let iboardTitle = req.body.iboardTitle; 
	let iboardUrl = req.body.iboardUrl; 

	if (!userIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let requestQuery = 'INSERT INTO Interpretation (userIdx, iboardContent, iboardDate, iboardUrl, iboardTitle) VALUES (?,?,?,?,?)'
			let requestResult = await db.queryParam_Arr(requestQuery, [userIdx, iboardContent, currentTime, iboardUrl, iboardTitle]);

			if (!requestResult) {
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
