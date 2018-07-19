const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
   let userIdx = req.body.userIdx;
   let groupTitle = req.body.groupTitle;
   let groupColor = req.body.groupColor;

   if(!userIdx){
      res.status(400).send({
            message : "Null Value"
         });
   }else{
   let insertGroupQuery = `INSERT INTO Bridge.group (userIdx, groupTitle, groupColor) VALUES (?, ?, ?)`
   let insertGroupResult = await db.queryParam_Arr(insertGroupQuery, [userIdx, groupTitle, groupColor]);

   let selectIdxQuery = `SELECT groupIdx from Bridge.group WHERE userIdx = ? ORDER BY groupDate DESC`
   let selectIdxResult = await db.queryParam_Arr(selectIdxQuery, [userIdx]);

   if(!insertGroupResult || !selectIdxResult){
      res.status(500).send({
      message : "Server error"
         });
      }
    else {
         res.status(201).send({
            message : "ok",
            data : [{groupIdx : selectIdxResult[0].groupIdx }]
         });
      }
   }
   
});

module.exports = router;