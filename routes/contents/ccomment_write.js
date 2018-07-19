const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
   let ccmtDate = moment().format('YYYY-MM-DD HH:mm:ss');
   let userIdx = req.body.userIdx;
   let ccmtContent = req.body.ccmtContent;
   let contentsIdx = req.body.contentsIdx;

   if ((userIdx==null) || (contentsIdx==null)) {
      res.status(400).send({
         message : "Null Value"
      });
   } else {
         let registerReviewQuery = `INSERT INTO Ccomment (ccmtDate, ccmtContent, userIdx, contentsIdx) VALUES (?,?,?,?)`;
         let registerReview = await db.queryParam_Arr(registerReviewQuery, [ccmtDate, ccmtContent, userIdx, contentsIdx]);
        let numQuery = `SELECT ccmtIdx FROM Ccomment WHERE userIdx=? and ccmtContent = ? and contentsIdx=?`
         let numResult = await db.queryParam_Arr(numQuery, [userIdx, ccmtContent, contentsIdx]);   
console.log(registerReview);
console.log(numResult);         
         if (!registerReview||!numResult) {
            res.status(500).send({
               message : "Server Error"
            });
         } else {
            res.status(201).send({
               message : "ok",
               data : [{ccmtIdx:numResult[0].ccmtIdx}]
            });
         }
      }
});

module.exports = router;
