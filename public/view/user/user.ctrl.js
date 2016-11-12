(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('UserCtrl', UserCtrl)

			UserCtrl.$inject = ['UserService', 'MovieService'];

			function UserCtrl(UserService, MovieService) {

				var vm = this;
			
				activate();

				function activate() {
					UserService.getAllUsers().then(function(users) {
						vm.users = users.data;
					})
				}
			
			}
			
}())