const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {

   let contentsIdx = req.body.contentsIdx;
   let userIdx = req.body.userIdx;
   if(!contentsIdx||!userIdx){
      res.status(400).send({
         message : "Null Value"
      });
   } else {
      let likenum = 'SELECT likeFlag FROM Bridge.Like WHERE contentsIdx=? and userIdx=?';
      let likeResult = await db.queryParam_Arr(likenum, [contentsIdx, userIdx]);
         if(!likeResult) {
            res.status(500).send({
               message : "Server error"
            });
         } else {
            if(likeResult==0){
               let insertQuery = 'INSERT INTO Bridge.Like (contentsIdx, userIdx, likeFlag) VALUES (?,?,1)';
               let insertResult = await db.queryParam_Arr(insertQuery, [contentsIdx, userIdx]);
             
               let mQuery = 'UPDATE Contents SET contentsLike=contentsLike+1 WHERE contentsIdx=?';
               let mResult = await db.queryParam_Arr(mQuery,[contentsIdx]);

               if(!insertResult||!mResult){
                  res.status(500).send({
                     message:"server error!!"
                  });
               }else{
               res.status(201).send({
                  message : "ok",
                  flag : "1"
                });
            }
            }
           else if(likeResult[0].likeFlag==1){
               let mQuery = 'UPDATE Contents SET contentsLike=contentsLike-1 WHERE contentsIdx=?';
               let mResult =  await db.queryParam_Arr(mQuery,[contentsIdx]);
                
               let lQuery = 'DELETE FROM Bridge.Like WHERE contentsIdx=? and userIdx=?';
               let lResult = await db.queryParam_Arr(lQuery, [contentsIdx, userIdx]);

               if(!mResult||!lResult){
                  res.status(500).send({
                     message:"server error!"
                  });
               }else{
                  res.status(201).send({
                     message : "ok",
                     flag : "0"
                   });
               }
            }
            
         }
      }
});

module.exports = router;
