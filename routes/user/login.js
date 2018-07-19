const express = require('express');
const router = express.Router();
const moment = require('moment');
const async = require('async');

const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');

router.post('/', async(req, res) => {
   let userUuid = req.body.userUuid;
   let userName = req.body.userName;
   let userType = req.body.userType;
   let signupTime = moment().format('YYYY-MM-DD HH:mm:ss');
   let recentTime = moment().format('YYYY-MM-DD HH:mm:ss');

   	  if(!userUuid || !userName || (userType==null)){
   	  	res.status(400).send({
   	  		message : "Invalid Uuid"
   	  	});
   	  } else {
      let checkQuery = 'SELECT userUuid FROM User WHERE userUuid = ?';
      let checkResult = await db.queryParam_Arr(checkQuery,[userUuid]);

      let token = jwt.sign(userUuid);

      if(checkResult.length === 0){//첫 로그인
         let InsertUserQuery = 'INSERT INTO User (userUuid, userName, userType,recentTime, signupTime) Values (?, ?, ?, ?, ?)';
         let InsertUserResult = await db.queryParam_Arr(InsertUserQuery, [userUuid,userName,userType,recentTime,signupTime]);
         
         if(!InsertUserResult){
            res.status(500).send({
               message : "Failed Insert From Server"
            });
         } else {
         	let getUserIdxQuery = 'SELECT userIdx FROM User WHERE userUuid = ?';
         	let getUserIdxResult = await db.queryParam_Arr(getUserIdxQuery, [userUuid]);

         	if(!getUserIdxResult) {
         		res.status(500).send({
         			message : "error"
         		});
         	} else {
         		res.status(201).send({
         			message : "success",
         			data : [{userIdx : getUserIdxResult[0].userIdx, token : token}]
         		});
         	}
          
         }
      } 
      else if(checkResult.length ===1){// 이후 로그인
         let updateUserQuery = 'UPDATE User SET recentTime=? WHERE userUuid=?';
         let updateUserResult = await db.queryParam_Arr(updateUserQuery, [recentTime,userUuid]);
         
         if(!updateUserResult){
            res.status(500).send({
               message : "Failed Upated From Server"
            });
         } else {
         let selectUserIdxQuery = 'SELECT userIdx from User where userUuid = ?'
         let selectUserIdxResult = await db.queryParam_Arr(selectUserIdxQuery, [userUuid]);

         if(!selectUserIdxResult){
            res.status(500).send({
               message : "Failed Select userIdx From Server"
            });
         }else{
            res.status(201).send({
               message : "Updated",
               data : [{userIdx : selectUserIdxResult[0].userIdx, token : token}]
         });
         }
         }
      }else{
         res.status(500).send({
            message:"server error"
         });
      }
   }
});



module.exports = router;
