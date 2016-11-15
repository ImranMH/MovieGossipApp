(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('UserCtrl', UserCtrl)

			UserCtrl.$inject = ['UserService', 'MovieService','$window','$route'];

			function UserCtrl(UserService, MovieService, $window, $route) {

				var vm = this;
				vm.follow = follow;
				vm.unFollow = unFollow;
				activate()

				function activate() {
					UserService.getAllUsers().then(function(users) {
						vm.users = users.data;
						console.log(users);
					})
				}
			
				function follow(user) {
					//var id = id.toString()
					console.log(user);
					UserService.startFollowing(user).then(function(obj){
						//$window.location.reload();
						$route.reload();
					})
				}

				function unFollow(user) {
					//var id = id.toString()
					console.log(user);
					UserService.startUnFollowing(user).then(function(obj){
						$route.reload();
					})
				}

			}
			
}())