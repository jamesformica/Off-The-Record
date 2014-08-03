angular.module("offtherecord", [
	'restangular',
	'user.service',
	'session.service',
	'friendship.service',
	'sign-up.controller',
	'sign-in.controller',
	'profile.controller',
	'common.service',
	'common.directive'
	])

.config(['RestangularProvider', function (RestangularProvider) {
	RestangularProvider.setBaseUrl('/api/v1');
}])

;