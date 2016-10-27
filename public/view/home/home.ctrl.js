(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('homeCtrl', homeController)

			//homeController.$inject['$location','$routeParams'];

			function homeController($location, $routeParams) {
				var vm = this;
				vm.name = "imran"
			}
}())