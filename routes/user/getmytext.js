const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const moment = require('moment');


router.get('/:userIdx' , async (req , res) => {

    let userIdx = req.params.userIdx;

    if(!userIdx){
        req.status(400).send({
            message : "NULL Value"
        });
    }else{
            let viewQuery = `SELECT DISTINCT Interpretation.iboardTitle, Interpretation.iboardIdx, Interpretation.iboardUrl, Interpretation.iboardContent, User.userName, User.userIdx,
            Interpretation.iboardDate FROM Interpretation,User WHERE User.userIdx = ? and User.userIdx=Interpretation.userIdx ORDER BY Interpretation.iboardIdx DESC`;
            let viewResult = await db.queryParam_Arr(viewQuery, [userIdx]);

            if(!viewResult){
                res.status(500).send({
                    message : "Server error"
                });
            } else {
                res.status(201).send({
                    message : "ok",
                    data : [{request_list : viewResult}]
                });
            }
    }

});

module.exports = router;
