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

	function createMovie(movie) {
		var deffered = q.defer();
		
		if (movie.name && movie.year) {
			/*var movie = new Movie({
				name: movie.name,
				year: movie.year,
				ganere: movie.ganere
			})
			console.log(movie);
			movie.save(function(err, movie){
				if (err) {
					deffered.reject(err)
				} else {
					deffered.resolve(movie)
				}
			})*/
			Movie.create(movie, function(err, movie){
			console.log(movie);	
			if(err) {
				deffered.reject(err)
			} else {
				console.log('resolved');
				deffered.resolve(movie)
			}
		})
		} else {
			console.log("movie field blank");
		}
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
		console.log('inside db before edit');
		var deffered = q.defer();
		Movie.findById(movieId, function(err, movie){
			if(err) {
				deffered.reject(err)
			} else {
				movie.update({
					name: mov.name,
					plot: mov.plot,
					genere: mov.genere
				},function(err, del) {
					if(err) {
						deffered.reject(err)
					} else {
						console.log('inside db after edit');
						deffered.resolve(del)
					}
				})
			}
		})
		return deffered.promise;
	}
	
	function deleteMovie(movieId) {
		console.log('i am model file');
		var deffered = q.defer();
		Movie.findById(movieId, function(err, movie){
			if(err) {
				deffered.reject(err)
			} else {
				movie.remove(function(err, del) {
					if(err) {
						deffered.reject(err)
					} else {
							console.log('i am model database');
						deffered.resolve(del)
					}
				})
			}
		})
		return deffered.promise;
	}



	function likeMovie(movieId, user) {
		var users = []
		console.log('inside db before edit');
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
						console.log('inside db save');
						deffered.resolve(mov)
					}
				})
			}
		})
		return deffered.promise;
	}
}