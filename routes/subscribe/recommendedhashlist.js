const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/:pageIdx/:userIdx', async (req, res) => {
       let pageIdx = req.params.pageIdx;
          let userIdx = req.params.userIdx;
        
        if(!pageIdx||!userIdx){
            res.status(400).send({
                message:"Null Value"
            });
        }else{
            pageIdx = pageIdx*20;
          let viewQuery = `SELECT DISTINCT
        
        
    Hashtag.hashName,
    Hashtag.hashImg,
    Hashtag.hashCnt,
    CASE
        WHEN
            (SELECT 
                    T.subflag
                FROM
                    Subscribe as T
                WHERE
                    T.userIdx = ?
                        AND T.hashName = Hashtag.hashName) IS NULL
        THEN
            0
        ELSE 1
    END AS subflagresult
FROM
    Hashtag
ORDER BY Hashtag.hashCnt DESC Limit ?,20`;

         let viewResult = await db.queryParam_Arr(viewQuery,[userIdx, pageIdx]);

         if (!viewResult) {
            res.status(500).send({
               message : "Fail at Server"
            });
         } else {
            res.status(201).send({
               message : "ok",
               data : [{hashcontents_list : viewResult}]
            });
         }
        }
      
});

module.exports = router;