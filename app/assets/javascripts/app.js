angular.module("publicapp", [
	'templates',
	'ngRoute',
	'restangular',
	'user.service',
	'session.service',
	'sign-up.controller',
	'sign-in.controller',
	'common.service',
	'common.directive',
	'layout.directive'
	])

.config(['RestangularProvider', '$routeProvider', function (RestangularProvider, $routeProvider) {
	RestangularProvider.setBaseUrl('/api/v1');
}])
;


angular.module("profileapp", [
	'templates',
	'ngRoute',
	'restangular',
	'user.service',
	'session.service',
	'friendship.service',
	'question.service',
	'profile.controller',
	'common.service',
	'common.directive',
	'layout.directive'
	])

.config(['RestangularProvider', '$routeProvider', function (RestangularProvider, $routeProvider) {
	RestangularProvider.setBaseUrl('/api/v1');

	$routeProvider.when('/', {
		templateUrl: 'profile/friendships_view.html',
		controller: 'FriendshipsController'
	})
	.when('/friendships', {
		templateUrl: 'profile/friendships_view.html',
		controller: 'FriendshipsController'
	})
	.when('/questions', {
		templateUrl: 'profile/questions_view.html',
		controller: 'QuestionsController'
	})
	.when('/editprofile', {
		templateUrl: 'profile/edit_profile_view.html',
		controller: 'EditProfileController'
	})
	.otherwise({ redirectTo: "/"});

}])


;