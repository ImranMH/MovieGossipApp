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
				console.log(id);
				activate();

				function activate() {
					MovieService.getMovieById(id).then(function(movie){
						//console.log('render here');
						
						console.log(movie.data);
						 vm.movie = movie.data.movie;
						 vm.user = movie.data.user;
						//return vm.movie;
					})
					MovieService.getMovieWatcherById(id).then(function(movie){
						//console.log('render here');
						
						console.log(movie);
						 
						 vm.watchUser = movie.data;
						//return vm.movie;
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

				function getUserProfile(id, e) {
					console.log(e);
					return UserService.getUserProfileById(id).then(function(user){
						// console.log("get response");
						 console.log(user);
						// $location.url('/user/profile')
						vm.user = user.data
						return vm.user;
					})
				}	


			}
			
}())