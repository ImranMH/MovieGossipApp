(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('UserDetailsCtrl', UserDetailsCtrl)

			UserDetailsCtrl.$inject = ['UserService', 'MovieService','$routeParams'];

			function UserDetailsCtrl(UserService, MovieService, $routeParams) {

				var vm = this;
				var id = $routeParams.id;
				vm.follow = follow;
				vm.unFollow = unFollow;
				activate();

				function activate() {
					UserService.getUserProfileById(id).then(function(user) {
						vm.user = user.data.user;
						console.log(user);
					})

					UserService.getUserActionById(id).then(function(user) {
						vm.likesUser = user.data.like;
						vm.watchsUser = user.data.watch;
						vm.interestUser = user.data.interest;
						vm.addedMovieUser = user.data.addMovie;
						vm.followingUser = user.data.following;
						vm.followerUser = user.data.follower;
						console.log(user);
					})
					// 	UserService.showFollowing().then(function(user) {
					// 	vm.likesUser = user.data.like;
					// 	vm.watchsUser = user.data.watch;
					// 	console.log(user);
					// })
				}
				function follow(user) {
					//var id = id.toString()
					console.log(user);
					UserService.startFollowing(user).then(function(obj){
						console.log(obj);
					})
				}

				function unFollow(user) {
					//var id = id.toString()
					console.log(user);
					UserService.startUnFollowing(user).then(function(obj){
						console.log(obj);
					})
				}
			}
			
}())