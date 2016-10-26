var express = require('express');
var router= express.Router();
var mongoose = require('mongoose');
var q = require('q')
var Movie = require('../model/index.model').movie
var User = require('../model/index.model').user
//var Movie = require('../model/movie.model')(mongoose,q)
//var Userss = require('../model/user.model')( mongoose);


router.route('/')
	.get(getMovie)
	.post(postMovie)

function getMovie(req, res){
	//console.log("reach Movie get request");
	var user = req.session.user;
	Movie.getMovie().then(function(movie){
		//res.json(movie)
		res.render('movieList',{movie:movie,  logUser:user})
	})
	
}
function postMovie(req, res){
	console.log("reach postMovie post request");
	Movie.createMovie(req.body).then(function(movie){
		console.log(movie);
		res.redirect('/movie')
	})
}
router.route('/all')
		.get(getAllMovie)

function getAllMovie(req, res) {
		Movie.getMovie().then(function( movie){
			//console.log("movie json");
			res.json(movie)
		}, function(err){
			res.json(err)
		})
	}

router.route('/:id')
	.get(movieById)
	.post(postMovieById)
	.delete(deleteMovieById)

function movieById(req, res) {
	var user =[]
	//console.log("reach movieById get request");
	var id = req.params.id;
	var loggdUser = req.session.user;
	Movie.findMovieById(id).then(function(movie){
		if (movie) {
			var doc = movie.likeUsers;
			//console.log('here i am');
			return User.findUsersByIds(doc).then(function(users){
				res.render('movie', {movie:movie, user:users, logUser:loggdUser})
				//console.log('resolved return '+users);
				//user.push(users)

				//console.log('resolved return push array'+user);
				
			}, function(err) {
				console.log(err);
			})
		} else{
       res.json ({});         
		}

			
	
		
	}).then(function(users){
		movie.likeUsers = users
	})
}
function postMovieById(req, res) {
	var id = req.params.id;
	Movie.findMovieById(id).then(function(movie){
		res.json(movie)
	})
}
function deleteMovieById(req, res) {
	console.log("reach deleteMovieById delete request");
	var id = req.params.id;
	Movie.deleteMovie(id).then(function(count){
		console.log("i am in return promise");
		res.end()
	},function(err){
		console.log("i am in return promise fail section");
		console.log(err);
	})
}

router.route('/:id/edit')
	.get(getEdit)
	.put(doEdit)


	function getEdit(req, res) {
		console.log("reach movieById edit get request");
		var id = req.params.id;
		Movie.findMovieById(id).then(function(movie){
			res.render('movie-edit', {movie:movie})
		})
	};

	function doEdit(req, res) {
		var id = req.params.id;
		var reqmov = req.body;
		//console.log(req.body);
		
		Movie.editMovie(id, reqmov).then(function(movie){
			//res.redirect('/:id')
			res.end();
		})
	}
	

	
	router.route('/:id/user')
		.post(addLikes)

	function addLikes(req, res) {
		var movie = null
		var user= req.session.user
		var MovieId = req.params.id;
		console.log(MovieId, user);

		Movie.likeMovie(MovieId, user)
			.then(function(movie){

					//console.log(user+": users" + movie+': movie return like');
					return User.movieLikedUser(user, movie)
					}, function(err) {
					res.status(400).send(err)
			})
			.then(function(user){

				res.format({
					html : function () {
						res.render('movieList',{movie:movie, logUser:user })
					},
					json : function () {
						res.json(user)
					}
				});
				},function(err) {
					console.log(err);
				})
	}

module.exports = router;