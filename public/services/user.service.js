(function(){
	'use strict'
	angular
			.module('expariment')
			.factory('UserService', UserService)

			//UserService.$inject['$http'];
			
			function UserService($http) {
				
				var service = {
					loginUser: loginUser,
					getMovie: getMovie,
					getUserPrfile: getUserPrfile,
					getUserProfileById: getUserProfileById,
					movieWatched: movieWatched
				}
				return service;

				function loginUser() {
					
					return $http.get("/user/profile")
				}
				function getMovie() {

					return $http.get("/movie")
				}
				function getUserPrfile() {

					return $http.get("/user/profile")
				}
				function getUserProfileById(id) {
					return $http.get("/user/"+id)
				}
				function movieWatched(id) {

					return $http.get("/user/"+id+"/movie/watch")
				}
			}
			
}())