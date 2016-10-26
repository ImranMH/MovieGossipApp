
var express = require('express');
var router= express.Router();
var user= [
    {name: "imran", id: 1},
    {name: "jewel", id: 2},
    {name: "sohel", id: 3},
    {name: "enayet", id: 4}
]
/*
router.route('/')
	.get(function (req, res) {
		req.app.locals.ul = user
		res.locals.ul = user
		res.render('index');
		console.log('/local');
	})*/


module.exports = router;