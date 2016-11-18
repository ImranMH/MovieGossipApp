
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
					movieUnLike: movieUnLike,
					movieWatched: movieWatched,
					getMovieById: getMovieById,
					getMovieWatcherById: getMovieWatcherById,
					MovieActionUserById: MovieActionUserById,
					getMovie: getMovie,
					doWatchMovie: doWatchMovie,
					unWatchMovie: unWatchMovie,
					addToInterestList: addToInterestList,
					addToUnInterestList: addToUnInterestList
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
				function movieUnLike(id) {

					return $http.put("/movie/"+id+"/likeUser")
				}

				function movieWatched(id) {

					return $http.get("/movie/"+id+"/user")
				}
				function getMovieWatcherById(id) {
					console.log('reach');
					return $http.get("/movie/"+id+"/watch")
				}
				function MovieActionUserById(id) {
					console.log('reach');
					return $http.get("/movie/"+id+"/user")
				}
				function doWatchMovie(id) {

					return $http.post("/movie/"+id+"/watch")
				}
				function unWatchMovie(id) {

					return $http.put("/movie/"+id+"/watch")
				}
				function addToInterestList(id) {

					return $http.post("/movie/"+id+"/interest")
				}
					function addToUnInterestList(id) {

					return $http.put("/movie/"+id+"/interest")
				}


			}
			
}())