(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('searchCtrl', searchCtrl)

			//searchCtrl.$inject['OmdbService'];

			function searchCtrl(OmdbService, MovieService) {

				var vm = this;
				vm.search = searchMovie;
				vm.addMovie = addMovie;
				//vm.test = testfunc;

				activate();
				var data= {
					name: 'adib',
					age:6 ,
					sex: 'male'
				}
				function activate() {

				}
				function searchMovie(movie) {
					console.log("ctrl");
					return OmdbService.getMovieByTitle(movie.title).then(function(movie){
						console.log(movie);
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
					console.log('ctrl');
					return MovieService.addMovie(movie).then(function(movie){
						console.log(movie);
						// vm.movie = movie.data;
						//return vm.movie;
					})
				}

			}
			
}())