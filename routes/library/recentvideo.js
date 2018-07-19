const express = require('express');
const router = express.Router();
  
const db = require('../../module/pool.js');

router.get('/:userIdx', async (req, res) => {
	let userIdx = req.params.userIdx;

	if(!userIdx){
		res.status(400).send({
			message : "null Value"
		});
	} else {
		let selectRecentQuery = `SELECT Recentview.contentsIdx, Contents.contentsUrl, Contents.contentsoriginUrl, Contents.thumbnailUrl, Contents.contentsInfo, Contents.contentsHit, Contents.contentsCategory, Contents.contentsDate, Contents.contentsLike, Contents.contentsType, (SELECT count(ccmtIdx) FROM Ccomment WHERE Contents.contentsIdx = Recentview.contentsIdx and Ccomment.contentsIdx = Contents.contentsIdx) as commentCnt FROM Recentview, Contents WHERE Recentview.userIdx = ? and Recentview.contentsIdx = Contents.contentsIdx ORDER BY Recentview.rvIdx DESC`
		let selectRecentResult = await db.queryParam_Arr(selectRecentQuery,[userIdx]);

		if(!selectRecentResult){
			res.status(500).send({
				message : "Server error"
			});
		} else {
			res.status(200).send({
				message : "ok",
				data : [{contents_list : selectRecentResult}]
			});
		}
	}
});

module.exports = router;