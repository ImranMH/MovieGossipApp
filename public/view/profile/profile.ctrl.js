(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('ProfileCtrl', ProfileCtrl)

			ProfileCtrl.$inject = ['OmdbService','UserService','MovieService','$rootScope','$routeParams'];

			function ProfileCtrl(OmdbService,UserService, MovieService,$rootScope,$routeParams) {

				var vm = this;
				/*vm.GetMovie = GetMovie;
				vm.addMovie = addMovie;
				vm.imdbId = imdbId*/
				//vm._id = userId
				var userId = $routeParams.id;
				activate();

				function activate() {
					 UserService.getUserPrfile().then(function(user){
						console.log(user);
						
						 $rootScope.current_user = user.data.user;
						 vm.user = user.data
						return vm.user;
					 })

					 UserService.movieWatched(userId).then(function(user){
						console.log(user);
						
						 /*$rootScope.current_user = user.data.user;
						 vm.user = user.data
						return vm.user;*/
					 })
				}
			

			}
			
}())