const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');


router.get('/:lastcontentsIdx/:userIdx/:groupIdx', async (req, res) => {
       let lastcontentsIdx = req.params.lastcontentsIdx;
          let userIdx = req.params.userIdx;
          let groupIdx = req.params.groupIdx;
         let maxindex = Number.MAX_VALUE;
         if(!userIdx||!groupIdx||!lastcontentsIdx){
            res.status(400).send({
               message : "Null value"
            });
         }else{
         if(lastcontentsIdx == 0){
             lastcontentsIdx = maxindex+1;
         }// 컨탠츠제목, 컨탠츠길이, 해시태그 , 컨텐츠인덱스 
         let contentsQuery = `SELECT Contents.contentsTitle, Contents.contentsRuntime, Contents.contentsIdx, 
         Contents.hashName1, Contents.hashName2, Contents.hashName3,
           (SELECT count(I.imIdx) FROM Imerge as I WHERE I.contentsIdx = Contents.contentsIdx) as imgCnt, 
       (SELECT groupTitle FROM Bridge.group WHERE groupIdx = ? and userIdx=?) as groupTitle, Contents.contentsInfo, Contents.contentsHit, Contents.contentsCategory,
         Contents.contentsDate, Contents.contentsLike, Contents.contentsUrl, Contents.contentsoriginUrl, Contents.contentsType, 
         (SELECT count(ccmtIdx) FROM Ccomment WHERE Ccomment.contentsIdx = Contents.contentsIdx) as commentCnt
          FROM Contents, GroupContent 
         WHERE GroupContent.contentsIdx = Contents.contentsIdx and GroupContent.groupIdx=? and gcIdx<? limit 6`
         let contentResult = await db.queryParam_Arr(contentsQuery, [groupIdx, userIdx, groupIdx, lastcontentsIdx]);

         if (!contentResult) {
            res.status(500).send({
               message : "Server Error"
            });   
         } else {
            res.status(201).send({
               message : "ok",
               data : [{contents_list:contentResult}]
            });
         }
      }
      
});

module.exports = router;
