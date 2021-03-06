var express = require('express');

var mongoose = require('mongoose');
var q = require('q')
var Movie = require('../model/index.model').movie
var User = require('../model/index.model').user
//var Movie = require('../model/movie.model')(mongoose,q)
//var Userss = require('../model/user.model')( mongoose);
var router= express.Router();

router.route('/')
	.get(getMovie)
	.post(postMovie)
/* Get all movie from DB*/
function getMovie(req, res){
	
	var user = req.session.user;
	//console.log(user);
	Movie.getMovie().then(function(movie){
		res.format({
			html: function () {
				res.render('movielist',{movie:movie, session_user:user })
			},
			json: function () {
				res.json(movie)
			}
		})
		
		
	})
	
}
//router.post('/special',postMovie)
/* post movie from external api to DB*/
function postMovie(req, res){
	//console.log("reach postMovie post request server route");
	var movie = req.body;

	//console.log(movie);
	var user =req.session.user;
	//console.log('request in route:'+movie.imdbID);
	Movie.createMovie(movie, user).then(function(movie){
		return User.movieAddedUser(user, movie).then(function(user){
			res.format({
			html: function () {
				res.render('movielist',{movie:movie, session_user:user })
			},
			json: function () {
				res.json({movie:movie, user: user})
			}
		})
			res.json(movie)
		}, function(err) {
			res.json({err:err})
		})	
	})
}
/* movie json DB for test purpose*/
router.route('/all')
		.get(getAllMovie)

function getAllMovie(req, res) {
		Movie.getMovie().then(function( movie){
			var loggdUser = req.session.user;
			//console.log("movie json");
			res.json(movie)
		}, function(err){
			res.json(err)
		})
	}

/* specific movie operation using id*/
router.route('/:id')
	.get(movieById)
	.post(postMovieById)
	.delete(deleteMovieById)

/* get Movie by id*/
function movieById(req, res) {
	//console.log("here i am");
	var user =[]
	//console.log("reach movieById get request");
	var id = req.params.id;
	//console.log("id is :"+id);
	var loggdUser = req.session.user;
	Movie.findMovieById(id).then(function(movie){
		if (movie) {
			var doc = movie.likeUsers;
			//console.log('here i am');
			return User.findUsersByIds(doc).then(function(users){
				
				res.format({
					html: function () {
						res.json(movie)
						res.render('movie', {movie:movie, user:users, session_user: loggdUser})
					},
					json: function () {
						res.json({movie:movie, user: users})
					}
				})
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
/* post request*/
function postMovieById(req, res) {
	var id = req.params.id;
	Movie.findMovieById(id).then(function(movie){

		res.format({
			html: function () {
				res.render('movie', {movie:movie})
			},
			json: function () {
				res.json(movie)
			}
		})
	})
}
/* delete movie using id*/
function deleteMovieById(req, res) {
	//console.log("reach deleteMovieById delete request");
	var id = req.params.id;
	Movie.deleteMovie(id).then(function(count){
		//console.log("i am in return promise");
		res.end()
	},function(err){
		//console.log("i am in return promise fail section");
		res.json(err);
	})
}
/* edit movie Outdated*/
router.route('/:id/edit')
	.get(getEdit)
	.put(doEdit)


	function getEdit(req, res) {
		//console.log("reach movieById edit get request");
		var id = req.params.id;
		Movie.findMovieById(id).then(function(movie){
				res.format({
					html: function () {
						res.render('movie-edit', {movie:movie})
					},
					json: function () {
						res.json(movie)
					}
				})
			
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
		.get(userActionMovie)

		function userActionMovie(req, res) {
		//console.log("watch module");
		var MovieId = req.params.id;
		Movie.userActionMovieDb(MovieId).then(function(user){
			res.json(user)
		})
	}
	/*liked user by id */
	router.route('/:id/likeUser')
		.post(addLikes)
		.put(unLikeUser)

	function addLikes(req, res) {
		//var movie = null
		var user= req.session.user
		var MovieId = req.params.id;
		//console.log(MovieId, user);

		Movie.likeMovie(MovieId, user)
			.then(function(movie){

					//console.log(user+": users" + movie+': movie return like');
					return User.movieLikedUser(user, movie)
					}, function(err) {
					res.json(err)
			})
			.then(function(user){

				res.format({
					html : function () {
						res.render('movieList',{movie:movie, logUser:user })
					},
					json : function () {
						res.json({movie:movie, likeUser:user })
					}
				});
				},function(err) {
					console.log(err+ 'u already do this operation');
				})
	}
	function unLikeUser(req, res) {
		//var movie = null
		var user= req.session.user
		var MovieId = req.params.id;
		//console.log(MovieId, user);

		Movie.unLikeMovie(MovieId, user)
			.then(function(movie){

					//console.log(user+": users" + movie+': movie return like');
					return User.movieUnLikedUser(user, movie)
					}, function(err) {
					res.json(err)
			})
			.then(function(user){
				res.json(user)
				},function(err) {
					console.log(err+ 'u already do this operation');
				})
	}
/*watched user request*/
		router.route('/:id/watch')
		.get(getWatchedUser)
		.post(watchedUser)
		.put(UnwatchedUser)

	function getWatchedUser(req, res) {
		//console.log("watch module");
		var MovieId = req.params.id;
		Movie.getWatchUserData(MovieId).then(function(user){
			res.json(user)
		})
	}
	function watchedUser(req, res) {
		var movie = null
		var user= req.session.user
		var MovieId = req.params.id;
		//console.log(MovieId, user);
		Movie.watchUser(MovieId, user)
			.then(function(movie){

					//console.log(user+": users" + movie+': movie return like');
					return User.movieWatchUser(user, movie)
					}, function(err) {
					res.status(400).send(err)
			})
			.then(function(user){

				res.format({
					html : function () {
						res.render('movieList',{wMovie:movie, logUser:user })
					},
					json : function () {
						res.json(user)
					}
				});
				},function(err) {
					console.log(err);
				})	
	}

	function UnwatchedUser(req, res) {
		var movie = null
		var user= req.session.user
		var MovieId = req.params.id;
		//console.log(MovieId, user);
			Movie.unWatchMovie(MovieId, user)
			.then(function(movie){

					//console.log(user+": users" + movie+': movie return like');
					return User.movieUnWatchUser(user, movie)
					}, function(err) {
					res.json(err)
			})
			.then(function(user){
				res.json(user)
				},function(err) {
					console.log(err+ 'u already do this operation');
			})
	}
/* user interest to movie*/
	router.route('/:id/interest')
		.post(addToInterestList)
		.put(addToUnInterestList)

		function addToInterestList(req,res) {
			var user= req.session.user
			var MovieId = req.params.id;
			//console.log('movie id is '+MovieId);
			Movie.addToInterestDb(MovieId, user).then(function(movie){
				return User.interestedMovieUser(user._id, movie).then(function(user){
					res.json({movie:movie, user: user})
				})
					
			})
		}

		function addToUnInterestList(req, res) {
		var movie = null
		var user= req.session.user
		var MovieId = req.params.id;
		//console.log(MovieId, user);
			Movie.unInterestMovie(MovieId, user)
			.then(function(movie){

					//console.log(user+": users" + movie+': movie return like');
					return User.UninterestedUser(user, movie)
					}, function(err) {
					res.json(err)
			})
			.then(function(user){
				res.json(user)
				},function(err) {
					console.log(err+ 'u already do this operation');
			})
	}

module.exports = router;