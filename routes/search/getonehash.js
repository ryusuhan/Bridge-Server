const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/:userIdx/:hashName', async (req, res) => {
      let hashName = req.params.hashName;
         let userIdx = req.params.userIdx;   
         let name =  ['#'+req.params.hashName];

         if(!hashName || !userIdx){
            res.status(400).send({
               message : "null Value"
            });
         } else {
          let viewQuery = `SELECT H.hashName, H.hashCnt, H.hashImg,
          CASE
        WHEN
            (SELECT 
                    T.subflag
                FROM
                    Subscribe as T
                WHERE
                    T.userIdx = ?
                        AND T.hashName = H.hashName) IS NULL
        THEN
            0
        ELSE 1
    END AS subflagresult
           From Hashtag as H WHERE  H.hashName = ?`
         let viewResult = await db.queryParam_Arr(viewQuery, [userIdx, name]);

         if (!viewResult) {
            res.status(500).send({
               message : "Server error"
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