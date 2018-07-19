const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
 let contentsIdx = req.body.contentsIdx;
    if(!contentsIdx){
        res.status(400).send({
            message : "Null Value"
        });
    }else{
        let deleteQuery = 'DELETE FROM Contents WHERE contentsIdx = ?'
        let deleteResult = await db.queryParam_Arr(deleteQuery,[contentsIdx]);

        if(!deleteResult){
            res.status(500).send({
                message : "Fail at Server"
            });
        }else{
            res.status(201).send({
                message : "Ok",
            });
        }

    }
});

module.exports = router;