const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:icmtIdx/:lastcontentsIdx', async (req, res) => {
	 let lastcontentsIdx = req.params.lastcontentsIdx;
   let icmtIdx = req.params.icmtIdx;
    let maxindex = Number.MAX_VALUE;

    if(lastcontentsIdx == 0||!icmtIdx){
        lastcontentsIdx = maxindex+1;
    }
	//20개
    // 대댓글 수 , 유저, 작성시간, 내용
	
	let getReviewListQuery = `SELECT ircmtDate,ircmtIdx ,ircmtContent, userIdx, (SELECT userName FROM User WHERE userIdx = Irecomment.userIdx) as userName,
	(SELECT count(IrcmtIdx) FROM Irecomment WHERE icmtIdx =?) as recommentCnt
	FROM Irecomment WHERE icmtIdx=? and ircmtIdx < ? limit 50` ;
	let getReviewList = await db.queryParam_Arr(getReviewListQuery, [ icmtIdx, icmtIdx, lastcontentsIdx]);

	if (!getReviewList) {
		res.status(500).send({
			message : "Server error"
		});
	} else {
		res.status(201).send({
            message : "ok",
            data : [{request_recomment_list:getReviewList}]
        });
	}
});

module.exports = router;
