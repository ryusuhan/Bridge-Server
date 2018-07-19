const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');



router.post('/',async(req, res)=>{
    let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    let contentsIdx = req.body.contentsIdx;
    let contentsTitle = req.body.contentsTitle;
    let contentsInfo = req.body.contentsInfo;

    if(!contentsIdx || !contentsInfo || !contentsInfo){
        res.status(400).send({
            message : "Null Value"
        });
    }else{
        let modifyQuery = 'UPDATE Contents SET contentsTitle = ?  WHERE contentsIdx = ?'
        let modifyResult = await db.queryParam_Arr(modifyQuery,[contentsTitle,contentsIdx]);

        let modifyQuery2 = 'UPDATE Contents SET contentsInfo = ? WHERE contentsIDx = ?'
        let modifyResult2 = await db.queryParam_Arr(modifyQuery2,[contentsInfo, contentsIdx]);


        if(!modifyResult || !modifyResult2){
            res.status(500).send({
                message : " Fail at Server"
            });
        }else{
            res.status(201).send({
                message : "OK"
            });
        }
    }
});


module.exports = router;