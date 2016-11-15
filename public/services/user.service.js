(function(){
	'use strict'
	angular
			.module('expariment')
			.factory('UserService', UserService)

			//UserService.$inject['$http'];
			
			function UserService($http) {
				
				var service = {
					loginUser: loginUser,
					getAllUsers: getAllUsers,
					getMovie: getMovie,
					getUserPrfile: getUserPrfile,
					UpdateUserPrfile: UpdateUserPrfile,
					getUserProfileById: getUserProfileById,
					getUserActionBySession: getUserActionBySession,
					//showFollowing: showFollowing,
					startFollowing: startFollowing,
					startUnFollowing: startUnFollowing,
					getUserActionById: getUserActionById,
					movieWatched: movieWatched
				}
				return service;

				function loginUser() {
					
					return $http.get("/user/profile")
				}
				function getAllUsers() {
					
					return $http.get("/user")
				}
				function getMovie() {

					return $http.get("/movie")
				}
				function getUserPrfile() {

					return $http.get("/user/profile")
				}
				function getUserActionBySession() {

					return $http.get("/user/profile/userAction")
				}
				function UpdateUserPrfile(user) {

					return $http.put("/user/profile/edit", user)
				}
				function getUserProfileById(id) {
					return $http.get("/user/"+id)
				}
				function getUserActionById(id) {
					return $http.get("/user/"+id+ "/movie")
				}
				function movieWatched(id) {

					return $http.get("/user/"+id+"/movie/watch")
				}
				// function showFollowing(id) {

				// 	return $http.get("/user/"+id+"/follow")
				// }
				function startFollowing(user) {

					return $http.post("/user/profile/follow", user)
				}
				function startUnFollowing(user) {
					console.log(user);
					return $http.put("/user/profile/follow", user)
				}
			}
			
}())