(function() {
	'use strict';

	angular
		.module('expariment')
		.config(config);


		config.$inject = ['$routeProvider'];

		function config($routeProvider) {
			$routeProvider
				.when('/home', {
					templateUrl: '/view/home/home.html',
					controller: 'homeCtrl',
					controllerAs: 'vm'
				})
				.when('/movie/:id', {
					templateUrl: '/view/details/details.html',
					controller: 'DetailsCtrl',
					controllerAs: 'vm'
				})
				.when('/home/profile', {
					templateUrl: '/view/profile/profile.html',
					controller: 'ProfileCtrl',
					controllerAs: 'vm'
				})
				/*.when('/home/:id', {
					templateUrl: '/view/profile/profile.html',
					//controller: 'ProfileCtrl',
					controllerAs: 'vm'
				})*/
				.when('/home/movie', {
					templateUrl: '/view/movie/movie.html',
					controller: 'MovieCtrl',
					controllerAs: 'vm'
				})
				.when('/home/search', {
					templateUrl: '/view/search/search.html',
					controller: 'searchCtrl',
					controllerAs: 'vm'
				})
				//.otherwise({ redirectTo:'/home'})
		}
} ());