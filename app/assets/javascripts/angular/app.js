var offTheRecordApp = angular.module('offTheRecordApp', []);

offTheRecordApp.config(['$routeProvider', function($routeProvider) {

	$routeProvider.
		otherwise({
			templateUrl: ''
		})

}]);