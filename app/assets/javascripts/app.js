angular.module("offtherecord", [
	'restangular',
	'agent.service',
	'session.service',
	'sign-up.controller',
	'sign-in.controller',
	'record.controller'
	])

.config(['RestangularProvider', function (RestangularProvider) {
	RestangularProvider.setBaseUrl('/');
}])

;