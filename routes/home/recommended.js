const express = require('express');
const router = express.Router();    // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.get('/', async (req, res) => {

      let selectQuery = `SELECT  C.contentsIdx, C.contentsTitle, C.contentsInfo, C.contentsCategory, C.contentsDate, C.contentsType,
                                         C.contentsHit, C.contentsLike, C.contentsRuntime, C.contentsUrl, C.contentsoriginUrl, C.thumbnailUrl, hashName1, hashName2, hashName3,
                                CASE
                            WHEN
                                (SELECT 
                                     likeFlag
                                   FROM
                                     Bridge.Like
                                   WHERE
                                     likeIdx=0
                                    ) IS NULL
                             THEN
                                  NULL
                             ELSE 1
                      END AS likeFlag,
                                           CASE
                            WHEN
                                (SELECT 
                                     subFlag
                                   FROM
                                     Subscribe
                                   WHERE
                                     subIdx=0) IS NULL
                             THEN
                                  NULL
                             ELSE 1
                      END AS subFlag, 
                                         (SELECT count(imIdx) FROM Imerge WHERE Imerge.contentsIdx = C.contentsIdx) as imgCnt, 
                                          (SELECT count(ccmtIdx) FROM Ccomment WHERE Ccomment.contentsIdx = C.contentsIdx) as commentCnt
                                         FROM Contents as C, Recommend WHERE C.contentsIdx=Recommend.contentsIdx ORDER BY rand() limit 4`;   
      let selectResult = await db.queryParam_None(selectQuery);

      if (!selectResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
         message : "server error"
         });
      } else {     
         res.status(201).send(
              {
                  message : "ok",
                  data : [{contents_list : selectResult}]
              }
       );
      
      }
 
});

module.exports = router;