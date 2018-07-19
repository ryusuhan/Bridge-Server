const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
   let groupIdx = req.body.groupIdx;
   let contentsIdx  = req.body.contentsIdx;

   if(!groupIdx||!contentsIdx){
      res.status(400).send({
            message : "Null Value"
         });
   }else{
   let insertGroupQuery = `INSERT INTO GroupContent (groupIdx, contentsIdx) VALUES (?, ?)`
   let insertGroupResult = await db.queryParam_Arr(insertGroupQuery, [groupIdx, contentsIdx]);

   let selectGroupQuery = `SELECT count(gcIdx) as gcIdx FROM GroupContent WHERE groupIdx=?`
   let selectGroupResult = await db.queryParam_Arr(selectGroupQuery,[groupIdx]);

   if(!insertGroupResult||!selectGroupResult){
      res.status(500).send({
      message : "Server Error"
         });
      }
    else {
      if(selectGroupResult[0].gcIdx==1){

         let selectQuery = `SELECT thumbnailUrl FROM Contents WHERE contentsIdx = ?`;
         let selectResult = await db.queryParam_Arr(selectQuery, [contentsIdx]);
         if(!selectResult){
          res.status(500).send({
             message : "Server Error"
         });     
         }else{
         let insertbg = 'UPDATE Bridge.group SET groupBgimage=? WHERE groupIdx=?';
         let insertbgResult = await db.queryParam_Arr(insertbg, [selectResult[0].thumbnailUrl, groupIdx]);
        
          if(!insertbgResult){
             res.status(500).send({
             message : "Server Error"
         });
          }else{
            res.status(201).send({
               message : "ok"
            });
          }
       }
    }
    else{
      res.status(201).send({
               message : "ok"
            });
    }
   }
   }
   
});

module.exports = router;