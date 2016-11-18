(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('ProfileCtrl', ProfileCtrl)

			//ProfileCtrl.$inject = ['OmdbService','UserService','MovieService','$rootScope','$routeParams'];

			function ProfileCtrl(OmdbService,UserService, MovieService,$rootScope,$routeParams,$location) {

				var vm = this;
				/*vm.GetMovie = GetMovie;
				vm.addMovie = addMovie;*/
				vm.deactivate = deactivate;
				vm.changePassword = changePassword;
				vm.updateUser = updateUser;
				 
				activate();

				function activate() {
					 UserService.getUserPrfile().then(function(user){
						console.log(user);
						
						// $rootScope.current_user = user.data.sessionUser;
						 //$rootScope.current_user = user.data.user;
						 vm.user = user.data.user
						return vm.user;
					 })

					 UserService.getUserActionBySession().then(function(user){
						//console.log(user);					 
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
						vm.updateStatus = " Profile successfully Updated"
					})
					
				}
				function changePassword(doc) {
					if(doc.newPassword === doc.confarm){
						UserService.changePass(doc).then(function(pass){
							console.log(pass);
							vm.status= "password successfully Changed "
						}, function(err) {
							vm.status= "error in change password"
						})
					} else{
						vm.status = "password don't match "
					}
				}
				function deactivate(id){
					UserService.deactivateAc(id).then(function(doc){
						 $location.url("user/login");
					})
				}

			}
			
}())