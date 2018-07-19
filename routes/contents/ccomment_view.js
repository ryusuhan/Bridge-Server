const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:contentsIdx/:lastcontentsIdx', async (req, res) => {

   let lastcontentsIdx = req.params.lastcontentsIdx;
    let contentsIdx = req.params.contentsIdx;
   
    let maxindex = Number.MAX_VALUE;
    if (!contentsIdx||!lastcontentsIdx) {
      res.status(400).send({
         message : "Null Value"
      });
   }else{
    if(lastcontentsIdx == 0){
       lastcontentsIdx = maxindex+1;
    }
    // 대댓글 수 , 
   let getReviewListQuery = `SELECT C.ccmtDate, C.ccmtContent, C.ccmtIdx, C.userIdx, 
   (SELECT userName FROM User WHERE userIdx = C.userIdx) as userName,
   (SELECT count(crecmtIdx) FROM Crecomment WHERE ccmtIdx = C.ccmtIdx) as recommentCnt
    FROM Ccomment as C WHERE contentsIdx=? and contentsIdx < ? ORDER BY ccmtDate DESC limit 50 `;
   let getReviewList = await db.queryParam_Arr(getReviewListQuery, [contentsIdx, lastcontentsIdx]);
   if (!getReviewList) {
      res.status(500).send({
         message : "server error"
      });
   } else {
      res.status(201).send({
            message : "ok",
            data : [{comments_list:getReviewList}]
        });
   }
}
});

module.exports = router;
