const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {

	let contentsIdx = req.body.contentsIdx;

	if(!contentsIdx){
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		let hitQuery = 'UPDATE Contents SET contentsHit = contentsHit+1 WHERE contentsIdx=?';
		let hitResult = await db.queryParam_Arr(hitQuery, [contentsIdx]);

			if(!hitResult) {
				res.status(500).send({
					message : "Server "
				});
			} else {
 				res.status(201).send({
					message : "ok"
				});
			}
		}
});

module.exports = router;