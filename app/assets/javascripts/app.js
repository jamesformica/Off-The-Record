angular.module("offtherecord", [
	'restangular',
	'agent.service',
	'sign-up.controller'
	])

.config(['RestangularProvider', function (RestangularProvider) {
	RestangularProvider.setBaseUrl('/api/v1');
}])

;