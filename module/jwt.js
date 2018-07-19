const jwt = require('jsonwebtoken');

const secretKey = require('../config/secretKey.js').secret;

module.exports = {
	sign : function(userUuid) {
		const options = {
			algorithm : "HS256",
			expiresIn : 60 * 60 * 24 * 30
		};
		const payload = {
			userUuid : userUuid
		};
		let token = jwt.sign(payload, secretKey, options);
		return token;
	},
	verify : function(token) {
		let decoded;
		try {
			decoded = jwt.verify(token, secretKey);
		}
		catch(err) {
			if(err.message === 'jwt expired') console.log('expired token');
			else if(err.message === 'invalid token') console.log('invalid token');
		}
		if(!decoded) {
			return -1;
		}else {
			return decoded;
		}
	}
};