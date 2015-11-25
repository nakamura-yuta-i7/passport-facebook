var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	
	// testDb.users.describe().then(function(result) {
	// 	res.json(result);
	// });
	
	// testDb.users.destroy({
	// 	where: {
	// 		email: "yuta.nakamura.i7@gmail.com",
	// 	}
	// }).then(function(result) {
	// 	console.log( "destroy result", result );
	// });
	
	// testDb.users.findOrCreate({
	// 	where: {
	// 		email: "yuta.nakamura.i7@gmail.com",
	// 	},
	// 	defaults: {
	// 		name: "中村祐太1",
	// 	}
	// }).then(function(result) {
	// 	console.log( "findOrCreate result", result );
	// 	
	// 	global.testDb.users.findAll().then(function(result) {
	// 		res.json(result);
	// 	}).catch(next);
	// 	
	// }).catch(next);
	
	// global.testDb.users.upsert({
	// 	email: "yuta.nakamura.i7@gmail.com",
	// 	name: "中村祐太4",
	// }).then(function(result) {
	// 	console.log( "upsert result", result );
	// 	global.testDb.users.findAll().then(function(result) {
	// 		res.json(result);
	// 	}).catch(next);
	// }).catch(next);
});

module.exports = router;
