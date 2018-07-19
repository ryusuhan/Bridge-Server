const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.get('/:searchname', async (req, res) => {
   let searchname = req.params.searchname;
   let searchParams = ['%'+req.params.searchname+'%'];
   if (!searchname) {
      res.status(400).send({
       message : "Null Value"
      });
   } else {
     
      let searchQuery = 'SELECT I.iboardUrl,I.iboardIdx, I.iboardContent,I.iboardTitle,I.iboardDate, I.userIdx ,(SELECT userName FROM User WHERE userIdx = I.userIdx) as userName FROM Interpretation as I WHERE I.iboardTitle LIKE ?';      // 입력받은 s_idx DB에 존재하는지 확인
      let searchResult = await db.queryParam_Arr(searchQuery,[searchParams]);
      let searchCnt = searchResult.length;
      console.log(searchCnt);
      
      if (!searchResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
            message : "Server error"
          });
      } else {     
          res.status(201).send(
          {
              message : "ok",
              data : [{request_list:searchResult}]
          }
       );
      
      }
   }
});

module.exports = router;