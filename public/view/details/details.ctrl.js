(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('MovDetailsCtrl', MovDetailsCtrl)

			//MovDetailsCtrl.$inject = ['$location','OmdbService',' MovieService','UserService','$routeParams'];

			function MovDetailsCtrl( $location, OmdbService, MovieService, UserService, $routeParams,$route) {

				var vm = this;
				vm.GetMovie = GetMovie;
				//vm.getUserProfile = getUserProfile;
				//vm.imdbId = imdbId
				var id =$routeParams.id
				//var imdbId = vm.movie.imdbID
				vm.likes = Likes;
				vm.doWatch = doWatch;
				vm.addInterest = addInterest;
				vm.detail = detail;
				vm.unLike = unLike;
				vm.unWatch = unWatch;
				vm.unInterest = unInterest;
				vm.changeClass = false;
				vm.interested = false;
				activate();

				function activate() {
					MovieService.getMovieById(id).then(function(movie){
						//console.log('render here');
						
						console.log(movie.data);
						 vm.movie = movie.data.movie;
						 vm.likeUsers = movie.data.user;
						 vm.movieStats_like = vm.likeUsers.length || 0;
						//return vm.movie;
						console.log(vm.likeUsers.length);				 
					})
					MovieService.MovieActionUserById(id).then(function(response){
						console.log(response);											 
						 vm.watchUser = response.data.viewedUser;
						 vm.addedBy = response.data.addedBy;
						 vm.interestUser = response.data.interestUser;
						 vm.movieStats_watch =vm.watchUser.length || 0
						 vm.movieStats_interest =vm.interestUser.length
						//return vm.movie;
						//console.log(vm.watchUser.length);
					})
					// OmdbService.getMovieByImdbId(vm.movie.imdbID).then(function(movie){
					// 		console.log(movie);
					// 		vm.done = false;
					// 		 vm.movie = movie.data;
					// 		return vm.movie;
					// 	})

				 }

				function GetMovie() {
					
					//console.log("ctrl");
					return MovieService.getMovie(id).then(function(movie){
						//console.log(movie.data);
						
						 vm.movie = movie.data;
						return vm.movie;
					})
				}

				function Likes() {
				  MovieService.movieLike(id).then(function(doc){
						if( doc.user) {
							vm.changeClass = true;
							$route.reload()
						}											
					})
				}
				function unLike() {
					MovieService.movieUnLike(id).then(function(doc){						
							vm.changeClass = true;
							$route.reload()										
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

				function doWatch() {
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
				function unWatch() {			
					return MovieService.unWatchMovie(id).then(function(movie){
						$route.reload()
					})
				}

				/* add to interest List*/
				function addInterest() {
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
				function unInterest() {
					MovieService.addToUnInterestList(id).then(function(movie){
						console.log(movie);
						vm.interested = true;
						$route.reload()
						// vm.movie = movie.data;
						//return vm.movie;
					})
				}

			}
			
}())