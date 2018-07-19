const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');


router.get('/:pageIdx/:searchname/:searchType/:sortType', async (req, res) => {
   let pageIdx = req.params.pageIdx;
 
   let searchname = req.params.searchname;
   let searchType = req.params.searchType;
   let searchParams = ['%'+req.params.searchname+'%'];
   let sortType = req.params.sortType;//0이면 날짜순 1이면 좋아요 순 2면 조회순 
   if (!searchname||!pageIdx||!searchType||!sortType) {
      res.status(400).send({
         message : "Null searchname Value"
      });
   } else {
    pageIdx = pageIdx*12;
      let searchResult;
      let searchCnt;
      if(searchType==0){// 해시 검색 

        if(sortType==0){
          let hashQuery = `SELECT Contents.contentsType, Contents.contentsIdx, Contents.contentsUrl, Contents.contentsTitle, Contents.contentsInfo, Contents.contentsDate, Contents.contentsCategory, 
      Contents.thumbnailUrl , (SELECT count(I.imIdx) FROM Imerge as I WHERE I.contentsIdx = Contents.contentsIdx) as imgCnt,  Contents.contentsLike, Contents.contentsHit, Contents.contentsRuntime, Contents.hashName1, Contents.hashName2, Contents.hashName3 
          FROM Contents,Hashtag WHERE ((Contents.hashName1=Hashtag.hashName) or (Contents.hashName2=Hashtag.hashName) or (Contents.hashName3=Hashtag.hashName) )and
           Hashtag.hashName = ? ORDER BY Contents.contentsDate DESC limit ?,12`     // 입력받은 s_idx DB에 존재하는지 확인
          let name =  ['#'+req.params.searchname];
          searchResult = await db.queryParam_Arr(hashQuery, [name,parseInt(pageIdx, 10) ]);
          searchCnt = searchResult.length;
        }else if(sortType==1){
          let hashQuery = `SELECT Contents.contentsType, Contents.contentsIdx, Contents.contentsUrl, Contents.contentsTitle, Contents.contentsInfo, Contents.contentsDate, Contents.contentsCategory, 
        Contents.thumbnailUrl ,(SELECT count(I.imIdx) FROM Imerge as I WHERE I.contentsIdx = Contents.contentsIdx) as imgCnt, Contents.contentsLike, Contents.contentsHit, Contents.contentsRuntime, Contents.hashName1, Contents.hashName2, Contents.hashName3 
          FROM Contents,Hashtag WHERE ((Contents.hashName1=Hashtag.hashName) or (Contents.hashName2=Hashtag.hashName) or (Contents.hashName3=Hashtag.hashName) )and
           Hashtag.hashName = ? ORDER BY Contents.contentsLike DESC limit ?,12`     // 입력받은 s_idx DB에 존재하는지 확인
         let name =  ['#'+req.params.searchname];
          searchResult = await db.queryParam_Arr(hashQuery, [name,parseInt(pageIdx, 10) ]);
          searchCnt = searchResult.length;
        }else if(sortType==2){
          let hashQuery = `SELECT Contents.contentsType, Contents.contentsIdx, Contents.contentsUrl, Contents.contentsTitle, Contents.contentsInfo, Contents.contentsDate, Contents.contentsCategory, 
       Contents.thumbnailUrl ,(SELECT count(I.imIdx) FROM Imerge as I WHERE I.contentsIdx = Contents.contentsIdx) as imgCnt,  Contents.contentsLike, Contents.contentsHit, Contents.contentsRuntime, Contents.hashName1, Contents.hashName2, Contents.hashName3 
          FROM Contents,Hashtag WHERE ((Contents.hashName1=Hashtag.hashName) or (Contents.hashName2=Hashtag.hashName) or (Contents.hashName3=Hashtag.hashName) )and
           Hashtag.hashName = ? ORDER BY Contents.contentsHit DESC limit ?,12`     // 입력받은 s_idx DB에 존재하는지 확인
         let name =  ['#'+req.params.searchname];
          searchResult = await db.queryParam_Arr(hashQuery, [name,parseInt(pageIdx, 10) ]);
          searchCnt = searchResult.length;
        }else{
          res.status(400).send({
            message: "wrong sortType"
          });
        }
          
      }else{
        if(sortType==0){
          let searchQuery = "SELECT * FROM Contents WHERE contentsTitle LIKE ? ORDER BY Contents.contentsDate DESC limit ?,12";      // 입력받은 s_idx DB에 존재하는지 확인
          searchResult = await db.queryParam_Arr(searchQuery,[searchParams,parseInt(pageIdx, 10)]);
          searchCnt = searchResult.length;
        }else if(sortType==1){
          let searchQuery = "SELECT * FROM Contents WHERE contentsTitle LIKE ? ORDER BY Contents.contentsLike DESC limit ?,12";      // 입력받은 s_idx DB에 존재하는지 확인
          searchResult = await db.queryParam_Arr(searchQuery,[searchParams,parseInt(pageIdx, 10)]);
          searchCnt = searchResult.length;
        }else if(sortType==2){
          let searchQuery = "SELECT * FROM Contents WHERE contentsTitle LIKE ? ORDER BY Contents.contentsHit DESC limit ?,12";      // 입력받은 s_idx DB에 존재하는지 확인
          searchResult = await db.queryParam_Arr(searchQuery,[searchParams,parseInt(pageIdx, 10)]);
          searchCnt = searchResult.length;
        }else{
           res.status(400).send({
           message: "wrong sortType"
          });
        }
      }
      
      if (!searchResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
            message : "server error"
          });
      } else {      // 배열의 길이 === 1 => DB에 s_idx가 존재
          res.status(201).send(
          {
              message : "ok",
              data : [{contents_list:searchResult},{searchCnt : searchCnt}]
          }
       );
      
      }
   }
});

module.exports = router;
