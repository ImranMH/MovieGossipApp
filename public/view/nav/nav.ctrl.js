(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('navCtrl', navCtrl)

			//navCtrl.$inject['$location','$routeParams'];

			function navCtrl($location) {

				var vm = this;
				vm.name = "search";

				activate()

				function activate() {

				}
				
			}
			
}())