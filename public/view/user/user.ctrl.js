(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('UserCtrl', UserCtrl)

			UserCtrl.$inject = ['UserService', 'MovieService'];

			function UserCtrl(UserService, MovieService) {

				var vm = this;
				vm.follow = follow
				activate();

				function activate() {
					UserService.getAllUsers().then(function(users) {
						vm.users = users.data;
					})
				}
			
				function follow(user) {
					//var id = id.toString()
					console.log(user);
					UserService.startFollowing(user).then(function(obj){
						window.location.reload();
					})
				}

			}
			
}())