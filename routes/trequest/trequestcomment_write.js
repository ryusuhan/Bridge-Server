const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
   let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
   let userIdx = req.body.userIdx;
   let icmtContent = req.body.icmtContent;
   let iboardIdx = req.body.iboardIdx;   

   if (!userIdx || !iboardIdx) {
      res.status(400).send({
         message : "Null Value"
      });
   } else {
      let registerReviewQuery = 'INSERT INTO Icomment (icmtDate, icmtContent, userIdx,iboardIdx) VALUES (?,?,?,?)'
      let registerReview = await db.queryParam_Arr(registerReviewQuery, [currentTime,icmtContent, userIdx,iboardIdx]);

      let showidxQuery = `SELECT icmtIdx FROM Icomment WHERE icmtContent =? AND userIdx = ?  AND iboardIdx = ?`
      let showidxResult = await db.queryParam_Arr(showidxQuery,[icmtContent,userIdx,iboardIdx]);
         if (!showidxResult || !registerReview) {
            res.status(500).send({
               message : "Server error"
            });
         } else {
            res.status(201).send({
               message : "ok",
               data : [{request_comment_idx : showidxResult[0].icmtIdx}]
            });
         }
      }
});

module.exports = router;