
(function(){
	'use strict'
	angular
			.module('expariment')
			.factory('MovieService', movieService)

			//movieService.$inject['$http'];
			
			function movieService($http) {
				
				var service = {
					addMovie: addMovie
				}
				return service;

				function addMovie(movie) {
					console.log( movie)
					return $http.post("/movie", movie)
				}

			}
			
}())