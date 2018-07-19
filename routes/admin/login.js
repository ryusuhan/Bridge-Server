const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');

// POST 방식, ip:3000/signin
router.post('/', async (req, res) => {
   let admId = req.body.admId;
   let admpw = req.body.admpw;

   if (!admId || !admpw) {
      res.status(400).send({
         message : "Null Value"
      });
   } else {
      // user_id를 가지고 DB를 검색해 그에 해당하는 모든 정보를 가져옴(salt, hashedpw)
      let checkQuery = 'SELECT * FROM Administer WHERE admId = ?';
      let checkResult = await db.queryParam_Arr(checkQuery, [admId]);   

      if (!checkResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
            message : "server error"
         });
      } else if (checkResult.length === 1) {      // user_id 가 존재하는 경우
       if (admpw === checkResult[0].admPw) {   // hashedpw와 DB에 저장된 해싱된 pw 비교 => 같으면 제대로 된 비밀번호 입력
         res.status(201).send({
           message: "ok",
           data:[{admIdx : checkResult[0].admIdx}]   // user_idx를 클라이언트에게 보내줌
         });
       } else {
         res.status(500).send({
           message : "password error"                  // 클라이언트에게는 login에러라고만 보내줌
         });                    // 콘솔창에는 어떤 에러인지 표시
       }
      } else {
         res.status(400).send({
            message : "ID error"                     // 클라이언트에게는 login에러라고만 보내줌
         });
               }
   }
});

module.exports = router;
