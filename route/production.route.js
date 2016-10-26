var express = require('express');
var router= express.Router();
var mongoose = require('mongoose');
var q = require('q')
var Movie = require('../model/index.model').movie
//var User = require('../model/index.model').user
var Production = require('../model/index.model').production
//var Production = require('../model/production.model')(mongoose, q)


router.route('/')
	.get(showDirector)
	.post(addDirector);


function showDirector(req,res) {
	Production.getAll().then(function(data){
			res.json(data)
		}, function(err) {
			res.json('no data')
		})
	
}
function addDirector(req,res) {
	console.log('Director area post'+Production );
	var data = req.body;
	Production.gettest(data).then(function(dir) {
		console.log(dir);
		res.json(dir)
	}, function(err) {
		console.log("promise return error"+err);
	})
	res.json('no data')

}

/*router.route('/1')
	.get(testGet)
	.post(test)

function testGet(req,res){
	console.log("test get");
}
function test(req, res){
	var production = new Production({
		_id: req.body.id,
		name: req.body.name,
		age: req.body.age,
		city: req.body.city
	})
	production.save(function(err, dirc){
		if(err) {
			console.log(err);
		} else {
			res.json(dirc)
		}
	})
	}*/


module.exports = router;