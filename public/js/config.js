(function() {
	'use strict';

	angular
		.module('expariment')
		.config(config);


		config.$inject = ['$routeProvider'];

		function config($routeProvider) {
			$routeProvider
				.when('/home', {
					templateUrl: 'view/home/home.html',
					controller: 'homeCtrl',
					controllerAs: 'vm'
				})
				.when('/home/search', {
					templateUrl: 'view/search',
					controller: 'searchCtrl',
					controllerAs: 'vm'
				})
				.otherwise({ redirectTo:'/home'})
		}
} ());