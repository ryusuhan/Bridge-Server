const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {

   let userIdx = req.body.userIdx;
   let hashName = req.body.hashName;
   if(!userIdx||!hashName){
      res.status(400).send({
         message : "Null Value"
      });
   } else {
      let flag = 'SELECT subFlag FROM Subscribe WHERE userIdx=? and hashName=?';
      let flagResult = await db.queryParam_Arr(flag, [userIdx, hashName]);
       if(flagResult.length==0) {
            let selectQuery = 'INSERT INTO Subscribe (hashName, userIdx, subFlag) VALUES (?,?,1)';
            let selectResult = await db.queryParam_Arr(selectQuery, [hashName, userIdx]);

            let updateQuery = 'UPDATE Hashtag SET hashCnt=hashCnt+1 WHERE hashName=?';
            let updateResult = await db.queryParam_Arr(updateQuery, [hashName]);



            if(!updateResult||!selectResult){
               res.status(500).send({
                  message : "Server error!"
               });
            }else{
               res.status(201).send({
                  message : "ok",
                  flag : "1"
               });
            }

         } else {
            let deleteQuery = 'DELETE FROM Subscribe WHERE userIdx=? and hashName=?';
            let deleteResult = await db.queryParam_Arr(deleteQuery, [userIdx, hashName]);

            let updateQuery = 'UPDATE Hashtag SET hashCnt=hashCnt-1 WHERE hashName=?';
            let updateResult = await db.queryParam_Arr(updateQuery, [hashName]);

         
            if(!updateResult||!deleteResult){
               res.status(500).send({
                  message : "Server error"
               });
            }else{
               res.status(201).send({
                  message : "ok",
                  flag : "0"
               });
            }
         }
      }
});

module.exports = router;
