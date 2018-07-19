const mysql = require('promise-mysql');			// mysql 모듈의 promise 버전

// rds 정보 입력 : hostname, username, password, default DB
const dbConfig = {
	host : 'rsh.cpcceaqwm3sy.ap-northeast-2.rds.amazonaws.com',
	port : 3306,
	user : 'rsh',
	password : 'rsh4392264',
	database : 'Bridge',
	connectionLimit : 20
};

module.exports = mysql.createPool(dbConfig);