module.exports = function(mongoose,q){
	MovieSchema = require('./movie.schema')(mongoose)

	var Movie = mongoose.model('Movie', MovieSchema)

	var api = {
		getMovieSchema: getMovieSchema,
		getMovieModel : getMovieModel,
		createMovie : createMovie,
		getMovie: getMovie,
		findMovieById: findMovieById,
		findMovieByIds: findMovieByIds,
		likeMovie: likeMovie,
		watchUser: watchUser,
		userActionMovieDb: userActionMovieDb,
		addToInterestDb: addToInterestDb,
		getWatchUserData: getWatchUserData,
		editMovie: editMovie,
		deleteMovie: deleteMovie
	}
	return api;


	function getMovieSchema() {
		return MovieSchema;
	}
	function getMovieModel() {
		return Movie;
	}
	function getMovie() {
		var deffered = q.defer();
		Movie.find({}, function(err, movie){
			if(err) {
				deffered.reject(err)
			} else {
				deffered.resolve(movie)
			}
		})
		return deffered.promise;
	}

	function createMovie(movieIn, user) {
		var deffered = q.defer();
			Movie.findOne({imdbID: movieIn.imdbID}, function(err, mov){
				if(err){
					deffered.reject(err)
				} else {
					if (mov) {
						//console.log("inside else :"+mov);
						deffered.resolve("movie already added")
					} else {
						
						//console.log("inside save :"+movieIn);
						var movie = new Movie({
							title: movieIn.Title,
							year: movieIn.Year,
							genre: movieIn.Genre,
							imdbID: movieIn.imdbID,
							poster: movieIn.Poster,
							director: movieIn.Director,
							plot: movieIn.Plot,
							addedBy:user._id
						})
						
						movie.save(function(err, movie){
							if (err) {
								deffered.reject(err)
							} else {
								deffered.resolve(movie)
							}
						})
					}
				}
			})

			
		// 	Movie.create(movie, function(err, movie){
		// 	console.log(movie);	
		// 	if(err) {
		// 		deffered.reject(err)
		// 	} else {
		// 		console.log('resolved');
		// 		deffered.resolve(movie)
		// 	}
		// })
		
		return deffered.promise;
	}
	function findMovieById(movieId) {
		var deffered = q.defer();
		Movie.findById(movieId, function(err, movie){
			if(err) {
				deffered.reject(err)
			} else {
				deffered.resolve(movie)
			}
		})
		return deffered.promise;
	};
	function findMovieByIds(movieId) {
		var deffered = q.defer();
		Movie.find({_id:{$in: movieId}}, function(err, movie){
			if(err) {
				deffered.reject(err)
			} else {
				deffered.resolve(movie)
			}
		})
		return deffered.promise;
	};
	function editMovie(movieId, mov) {
		//console.log('inside db before edit');
		var deffered = q.defer();
		Movie.findById(movieId, function(err, movie){
			if(err) {
				deffered.reject(err)
			} else {
				movie.update({
					name: mov.name,
					plot: mov.plot,
					genere: mov.genere,
					year: mov.year
				},function(err, editMov) {
					if(err) {
						deffered.reject(err)
					} else {
						//console.log('inside db after edit');
						deffered.resolve(editMov)
					}
				})
			}
		})
		return deffered.promise;
	}
	
	function deleteMovie(movieId) {
		//console.log('i am model file');
		var deffered = q.defer();
		Movie.findById(movieId, function(err, movie){
			if(err) {
				deffered.reject(err)
			} else {
				movie.remove(function(err, del) {
					if(err) {
						deffered.reject(err)
					} else {
							//console.log('i am model database');
						deffered.resolve(del)
					}
				})
			}
		})
		return deffered.promise;
	}



	function likeMovie(movieId, user) {
		var users = []
		//console.log('inside db before edit');
		var deffered = q.defer();
		Movie.findById(movieId, function(err, movie){
			if(err) {
				deffered.reject(err)
			} if(movie) {
				movie.likeUsers.push(user._id)
				movie.save(function(err, mov) {
					if(err) {
						deffered.reject(err)
					} else {
						//console.log('inside db save');
						deffered.resolve(mov)
					}
				})
			}
		})
		return deffered.promise;
	}
	/* movie user relation*/
	function userActionMovieDb(movieId) {
		var deffered = q.defer();
		Movie.findById(movieId)
			.populate('likeUsers viewedUser intersetedUser')
			.exec(function(err, user) {
				if (err) throw (err)

				deffered.resolve({ likeusers:user.likeUsers, addedBy: user.addedBy, viewedUser: user.viewedUser, interestUser: user.intersetedUser})
			})
			return deffered.promise;
	}
	function getWatchUserData(movieId) {
		var deffered = q.defer();
		Movie.findById(movieId)
			.populate('viewedUser intersetedUser')
			.exec(function(err, user) {
				if (err) throw (err)

				deffered.resolve({viewedUser: user.viewedUser, interestUser: user.intersetedUser})
			})
			return deffered.promise;
	}
	function watchUser(movieId, user) {
		var users = []
		//console.log('inside db before edit');
		var deffered = q.defer();
		Movie.findById(movieId, function(err, movie){
			if(err) {
				deffered.reject(err)
			} if(movie) {
				movie.viewedUser.push(user._id)
				movie.save(function(err, mov) {
					if(err) {
						deffered.reject(err)
					} else {
						//console.log('inside db save');
						deffered.resolve(mov)
					}
				})
			}
		})
		return deffered.promise;
	}
	function addToInterestDb(movieId, user) {
		var users = []
		//console.log('inside db before edit');
		var deffered = q.defer();
		Movie.findById(movieId, function(err, movie){
			if(err) {
				deffered.reject(err)
			} if(movie) {
				movie.intersetedUser.push(user._id)
				movie.save(function(err, mov) {
					if(err) {
						deffered.reject(err)
					} else {
						//console.log('inside db save .....');
						deffered.resolve(mov)
					}
				})
			}
		})
		return deffered.promise;
	}
}