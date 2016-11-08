(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('DetailsCtrl', DetailsCtrl)

			//DetailsCtrl.$inject['OmdbService'];

			function DetailsCtrl($location, OmdbService, MovieService, UserService, $routeParams) {

				var vm = this;
				vm.GetMovie = GetMovie;
				vm.getUserProfile = getUserProfile;
				//vm.imdbId = imdbId
				var id =$routeParams.id
				//console.log(id);
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
					MovieService.getMovieWatcherById(id).then(function(response){
						//console.log('render here');											 
						 vm.watchUser = response.data.viewedUser;
						 vm.interestUser = response.data.interestUser;
						 vm.movieStats_watch =vm.watchUser.length || 0
						 vm.movieStats_interest =vm.interestUser.length
						//return vm.movie;
						console.log(vm.watchUser.length);
					})
				}
				function GetMovie() {
					
					console.log("ctrl");
					return MovieService.getMovie().then(function(movie){
						//console.log(movie.data);
						
						 vm.movie = movie.data;
						return vm.movie;
					})
				}

				function getUserProfile(id, e) {
					//console.log(e);
					return UserService.getUserProfileById(id).then(function(user){
						// console.log("get response");
						 //console.log(user);
						// $location.url('/user/profile')
						vm.user = user.data
						return vm.user;
					})
				}	


			}
			
}())