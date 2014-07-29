angular.module("offtherecord", [
	'restangular',
	'agent.service',
	'session.service',
	'sign-up.controller',
	'sign-in.controller',
	'profile.controller',
	'common.service',
	'common.directive'
	])

.config(['RestangularProvider', function (RestangularProvider) {
	RestangularProvider.setBaseUrl('/');
}])

;