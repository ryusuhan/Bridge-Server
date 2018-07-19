const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/:lastcontentsIdx', async (req, res) => {
       let lastcontentsIdx = req.params.lastcontentsIdx;
   
         let maxindex = Number.MAX_VALUE;
         if((lastcontentsIdx == null)){
            res.status(400).send({
               message:"null value"
            });
         }
         if(lastcontentsIdx == 0){
             lastcontentsIdx = maxindex+1;
         }
          let viewQuery = 'SELECT I.iboardIdx, I.iboardUrl, I.iboardContent,I.iboardTitle, I.iboardDate, I.userIdx, (SELECT userName FROM User WHERE userIdx = I.userIdx) as userName From Interpretation as I WHERE I.iboardIdx < ? ORDER BY I.iboardDate DESC limit 20'
         let viewResult = await db.queryParam_Arr(viewQuery, [lastcontentsIdx]);

         if (!viewResult) {
            res.status(500).send({
               message : "Server error"
            });
         } else {
            res.status(201).send({
               message : "ok",
               data : [{request_list : viewResult}]
            });
         }
      
});

module.exports = router;