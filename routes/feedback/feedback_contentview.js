const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:fboardIdx', async (req, res) => {

	let fboardIdx = req.params.fboardIdx;
	
	let getfeedbackQuery = 'SELECT Feedback.userIdx, Feedback.fboardContent, Feedback.fboardDate , Contents.contentsTitle, Contents.contentsIdx FROM Feedback, Contents WHERE Feedback.fboardIdx=? and Feedback.contentsIdx=Contents.contentsIdx';
	let getfeedbackResult = await db.queryParam_Arr(getfeedbackQuery, [fboardIdx]);

	if (!getfeedbackResult) {
		res.status(500).send({
			message : "Server error"
		});
	} else {
		res.status(201).send({
            message : "ok",
            data : [{contents_list:getfeedbackResult}]
        });
	}
});

module.exports = router;