(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('UserDetailsCtrl', UserDetailsCtrl)

			UserDetailsCtrl.$inject = ['UserService', 'MovieService','$routeParams'];

			function UserDetailsCtrl(UserService, MovieService, $routeParams) {

				var vm = this;
				var id = $routeParams.id
				activate();

				function activate() {
					UserService.getUserProfileById(id).then(function(user) {
						vm.user = user.data.user;
						//console.log(vm.user);
					})

					UserService.getUserActionById(id).then(function(user) {
						vm.likesUser = user.data.like;
						vm.watchsUser = user.data.watch;
						vm.interestUser = user.data.interest;
						vm.addedMovieUser = user.data.addMovie;
						console.log(user);
					})
				}
			
			}
			
}())