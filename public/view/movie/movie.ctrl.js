(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('MovieCtrl', MovieCtrl)

			//MovieCtrl.$inject['OmdbService'];

			function MovieCtrl(OmdbService,MovieService, UserService, $rootScope) {

				var vm = this;
				//vm.GetMovie = GetMovie;
				//vm.addMovie = addMovie;
				vm.likes = Likes;
				vm.doWatch = doWatch;
				vm.detail = detail;
				vm.changeClass = false;

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
					
					console.log(id);
					return MovieService.movieLike(id).then(function(doc){
						if( doc.user) {
							vm.changeClass = true;
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
					console.log('ctrl');
					return MovieService.doWatchMovie(id).then(function(movie){
						console.log(movie);
						vm.added = true;
						// vm.movie = movie.data;
						//return vm.movie;
					})
				}

			}
			
}())