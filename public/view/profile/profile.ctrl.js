(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('ProfileCtrl', ProfileCtrl)

			//ProfileCtrl.$inject = ['OmdbService','UserService','MovieService','$rootScope','$routeParams'];

			function ProfileCtrl(OmdbService,UserService, MovieService,$rootScope,$routeParams) {

				var vm = this;
				/*vm.GetMovie = GetMovie;
				vm.addMovie = addMovie;
				vm.imdbId = imdbId*/
				//vm._id = userId
				vm.updateUser = updateUser
				var userId = 
				activate();

				function activate() {
					 UserService.getUserPrfile().then(function(user){
						console.log(user);
						
						 $rootScope.current_user = user.data.sessionUser;
						 vm.user = user.data.user
						return vm.user;
					 })

					 UserService.getUserActionBySession().then(function(user){
						console.log(user);					 
						 vm.movieWatch = user.data.watch;
						 vm.movieInterest = user.data.interest;
						 vm.movieAdded = user.data.addMovie;
						 vm.movieLike = user.data.like;
						 vm.followingUser = user.data.following;
						 vm.followerUser = user.data.follower;
						
					 })
				}
			
				function updateUser(user) {
					console.log(user);
					UserService.UpdateUserPrfile(user).then(function(user) {
						console.log(user);
					})
					
				}



			}
			
}())