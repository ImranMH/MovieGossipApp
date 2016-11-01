(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('MovieCtrl', MovieCtrl)

			//MovieCtrl.$inject['OmdbService'];

			function MovieCtrl(OmdbService, MovieService) {

				var vm = this;
				vm.GetMovie = GetMovie;
				vm.addMovie = addMovie;
				

				activate();

				function activate() {
					return MovieService.getMovie().then(function(movie){
						console.log(movie.data);
						
						 vm.movie = movie.data;
						return vm.movie;
					})

				}
				function GetMovie() {
					
					console.log("ctrl");
					return MovieService.getMovie().then(function(movie){
						console.log(movie.data);
						
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