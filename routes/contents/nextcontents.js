const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/:lastcontentsIdx/:contentsIdx', async (req, res) => {
       let lastcontentsIdx = req.params.lastcontentsIdx;
          let contentsIdx = req.params.contentsIdx;
         let maxindex = Number.MAX_VALUE;

         if(!lastcontentsIdx || !contentsIdx){
            res.status(400).send({
                message : "null Value"
            });
         } else {

         if(lastcontentsIdx == 0){
             lastcontentsIdx = maxindex+1;
         }
         let select1Query = 'SELECT Contents.hashName1 FROM Contents WHERE contentsIdx = ?';
         let select1Result = await db.queryParam_Arr(select1Query,[contentsIdx]);
         let select2Query = 'SELECT Contents.hashName2 FROM Contents WHERE contentsIdx = ?';
         let select2Result = await db.queryParam_Arr(select2Query,[contentsIdx]);
         let select3Query = 'SELECT Contents.hashName3 FROM Contents WHERE contentsIdx = ?';
         let select3Result = await db.queryParam_Arr(select3Query,[contentsIdx]);
         
       let viewQuery = `SELECT 
    Contents.contentsTitle,
    Contents.contentsRuntime,
    Contents.hashName1,
    Contents.hashName2,
    Contents.hashName3,
    Contents.contentsIdx,
    Contents.contentsInfo,
    Contents.contentsHit,
    Contents.contentsCategory,
    Contents.contentsDate,
    Contents.contentsLike,
    Contents.contentsUrl,
    Contents.contentsoriginUrl,
    Contents.thumbnailUrl,
    Contents.contentsType,
    (SELECT count(ccmtIdx) FROM Ccomment WHERE Contents.contentsIdx = ? and Ccomment.contentsIdx = Contents.contentsIdx) as commentCnt,
    (SELECT count(imIdx) FROM Imerge WHERE Imerge.contentsIdx = Contents.contentsIdx) as imgCnt
FROM
    Contents
WHERE
    (((Contents.hashName1 = ?
        AND Contents.hashName1 IS NOT NULL)
        OR (Contents.hashName2 = ?
        AND Contents.hashName2 IS NOT NULL)
        OR (Contents.hashName3 = ?
        AND Contents.hashName3 IS NOT NULL))
        OR ((Contents.hashName1 = ?
        AND Contents.hashName1 IS NOT NULL)
        OR (Contents.hashName2 = ?
        AND Contents.hashName2 IS NOT NULL)
        OR (Contents.hashName3 = ?
        AND Contents.hashName3 IS NOT NULL))
        OR ((Contents.hashName1 = ?
        AND Contents.hashName1 IS NOT NULL)
        OR (Contents.hashName2 = ?
        AND Contents.hashName2 IS NOT NULL)
        OR (Contents.hashName3 = ?
        AND Contents.hashName3 IS NOT NULL)))
        AND Contents.contentsType = 1 ORDER BY rand() limit 12`;
       let viewResult = await db.queryParam_Arr(viewQuery,[contentsIdx,select1Result[0].hashName1,select1Result[0].hashName1,select1Result[0].hashName1,
            select2Result[0].hashName2,select2Result[0].hashName2,
            select2Result[0].hashName2,select3Result[0].hashName3,select3Result[0].hashName3,select3Result[0].hashName3,contentsIdx]);

       if (!viewResult) {
         res.status(500).send({
         message : "Server error"
         });
      } else {
         res.status(201).send({
         message : "ok",
         data : [{contents_list : viewResult}]
         });
      }
      }
});

module.exports = router;
