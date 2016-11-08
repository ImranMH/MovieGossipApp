
(function(){
	'use strict'
	angular
			.module('expariment')
			.factory('MovieService', movieService)

			//movieService.$inject['$http'];
			
			function movieService($http) {
				
				var service = {
					addMovie: addMovie,
					movieLike: movieLike,
					movieWatched: movieWatched,
					getMovieById: getMovieById,
					getMovieWatcherById: getMovieWatcherById,
					getMovie: getMovie,
					doWatchMovie: doWatchMovie,
					addToInterestList: addToInterestList,
				}
				return service;

				function addMovie(movie) {
					console.log( movie)
					return $http.post("/movie", movie)
				}

				function getMovie() {

					return $http.get("/movie")
				}

				function getMovieById(id) {

					return $http.get("/movie/"+id)
				}
				function movieLike(id) {

					return $http.post("/movie/"+id+"/likeUser")
				}
				function movieWatched(id) {

					return $http.get("/movie/"+id+"/user")
				}
				function getMovieWatcherById(id) {
					console.log('reach');
					return $http.get("/movie/"+id+"/watch")
				}
				function doWatchMovie(id) {

					return $http.post("/movie/"+id+"/watch")
				}
				function addToInterestList(id) {

					return $http.post("/movie/"+id+"/interest")
				}

			}
			
}())