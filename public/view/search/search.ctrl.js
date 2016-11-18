(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('searchCtrl', searchCtrl)

			//searchCtrl.$inject['OmdbService'];

			function searchCtrl(OmdbService, MovieService) {

				var vm = this;
				vm.search = searchMovie;
				vm.searchImdb = searchImdbMovie;
				vm.addMovie = addMovie;
				

				activate();

				function activate() {

				}
				function searchMovie(movie) {
					vm.done = true;
					console.log("ctrl");
					return OmdbService.getMovieByTitle(movie.title).then(function(movie){
						console.log(movie);
						vm.done = false;
						 vm.movie = movie.data;
						return vm.movie;
					})
				}
				function searchImdbMovie(movie) {
					vm.done = true;
					console.log("ctrl");
					return OmdbService.getMovieByImdbTitle(movie.title).then(function(movie){
						console.log(movie);
						vm.done = false;
						 vm.movie = movie.data;
						return vm.movie;
					})
				}
			/*	function testfunc() {
					console.log(data);
					console.log('ctrl');
					return MovieService.addMovie(data).then(function(data){
						console.log(data);
						// vm.movie = movie.data;
						//return vm.movie;
					})
				}*/

				function addMovie(movie) {
					console.log(movie);
					vm.added = false;
					console.log('ctrl');
					return MovieService.addMovie(movie).then(function(movie){
						console.log(movie);
						vm.added = true;
						// vm.movie = movie.data;
						//return vm.movie;
					})
				}

			}
			
}())