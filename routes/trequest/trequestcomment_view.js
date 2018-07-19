const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:iboardIdx/:lastcontentsIdx', async (req, res) => {
	 let lastcontentsIdx = req.params.lastcontentsIdx;
   
    let iboardIdx = req.params.iboardIdx;
    let maxindex = Number.MAX_VALUE;

    if(lastcontentsIdx == 0){
        lastcontentsIdx = maxindex+1;
    }
    // 대댓글 수 , 유저, 내용 시간
	
	let getReviewListQuery = `SELECT I.icmtDate,I.icmtContent, I.userIdx, I.icmtIdx, (SELECT userName FROM User WHERE userIdx = I.userIdx) as userName,
	(SELECT count(Irecomment.ircmtIdx) FROM Irecomment WHERE Irecomment.icmtIdx =I.icmtIdx) as recommentcnt 
	FROM Icomment as I WHERE I.iboardIdx=? and I.icmtIdx < ? ORDER BY I.icmtDate DESC limit 50`;
	let getReviewList = await db.queryParam_Arr(getReviewListQuery, [iboardIdx, lastcontentsIdx]);
console.log(getReviewList);
	

	if (!getReviewList) {
		res.status(500).send({
			message : "Server error"
		});
	} else {
		res.status(201).send({
            message : "ok",
            data : [{request_comment_list:getReviewList}]
        });
	}
});

module.exports = router;
