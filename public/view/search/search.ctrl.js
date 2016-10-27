(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('searchCtrl', searchCtrl)

			//searchCtrl.$inject['OmdbService'];

			function searchCtrl(OmdbService) {

				var vm = this;
				vm.search = searchMovie;
				vm.addMovie = addMovie;

				activate()

				function activate() {

				}
				function searchMovie(movie) {
					console.log("clicked");
					return OmdbService.getMovieByTitle(movie.title).then(function(movie){
						console.log(movie);
						 vm.movie = movie.data;
						return vm.movie;
					})
				}

				function addMovie(movie) {
					console.log("clicked");
					return OmdbService.getMovieByTitle(movie.title).then(function(movie){
						console.log(movie);
						 vm.movie = movie.data;
						return vm.movie;
					})
				}

			}
			
}())