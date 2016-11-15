(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('MovieCtrl', MovieCtrl)

			//MovieCtrl.$inject['OmdbService'];

			function MovieCtrl(OmdbService,MovieService, UserService, $rootScope, $route) {

				var vm = this;
				//vm.GetMovie = GetMovie;
				//vm.addMovie = addMovie;
				vm.likes = Likes;
				vm.doWatch = doWatch;
				vm.addInterest = addInterest;
				vm.detail = detail;
				vm.changeClass = false;
				vm.interested = false;
				activate();

				function activate() {
					MovieService.getMovie().then(function(movie){
						console.log(movie.data);
						
						 vm.movie = movie.data;
						return vm.movie;
					})

					UserService.loginUser().then(function(user){
						
						$rootScope.current_user = user.data.user
						vm.user = user.data;
						console.log(vm.user);
						return user.data;
					})
				}

				function Likes(id) {
					return MovieService.movieLike(id).then(function(doc){
						if( doc.user) {
							vm.changeClass = true;
							$route.reload()
						}											
					})
				}

				function detail(id) {					
					return MovieService.getMovieById(id).then(function(doc){
						vm.mov = doc				
						console.log(doc);
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

				function doWatch(id) {
					//console.log(movie);
					vm.added = false;
					
					return MovieService.doWatchMovie(id).then(function(movie){
						//console.log(movie);
						vm.added = true;
						$route.reload()
						// vm.movie = movie.data;
						//return vm.movie;
					})
				}

				/* add to interest List*/
				function addInterest(id) {
					//console.log(movie);
					
					console.log('ctrl');
					return MovieService.addToInterestList(id).then(function(movie){
						console.log(movie);
						vm.interested = true;
						$route.reload()
						// vm.movie = movie.data;
						//return vm.movie;
					})
				}

			}
			
}())