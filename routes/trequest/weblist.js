const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/', async (req, res) => {
          let viewQuery = 'SELECT I.iboardIdx, I.iboardUrl, I.iboardContent,I.iboardTitle, I.iboardDate, I.userIdx, (SELECT userName FROM User WHERE userIdx = I.userIdx) as userName From Interpretation as I ORDER BY I.iboardDate DESC'
         let viewResult = await db.queryParam_Arr(viewQuery);

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
