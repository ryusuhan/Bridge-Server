const express = require('express');
const router = express.Router(); 
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
   let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
   let userIdx = req.body.userIdx;
   let ircmtContent = req.body.ircmtContent;
   let icmtIdx = req.body.icmtIdx;   
   console.log(userIdx+" "+icmtIdx);
   if (!userIdx||!icmtIdx) {
         res.status(400).send({
            message : "Null Value"
      });
   } else {
      let registerReviewQuery = 'INSERT INTO Irecomment (ircmtDate, ircmtContent, userIdx,icmtIdx) VALUES (?,?,?,?)'
      let registerReview = await db.queryParam_Arr(registerReviewQuery, [currentTime,ircmtContent, userIdx,icmtIdx]);

      let showrecmtQuery = 'SELECT ircmtIdx FROM Irecomment WHERE ircmtContent = ? AND userIdx = ? AND icmtIdx = ?'
      let showrecmtResult = await db.queryParam_Arr(showrecmtQuery,[ircmtContent,userIdx,icmtIdx]);

         if (!showrecmtResult || !registerReview) {
            res.status(500).send({
               message : "Server error"
            });
         } else {
            res.status(201).send({
               message : "ok",
               data : [{request_recomment_idx : showrecmtResult[0].ircmtIdx}]
            });
         }
      }
});

module.exports = router;
