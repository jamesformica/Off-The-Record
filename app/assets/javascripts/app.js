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
		templateUrl: 'profile/pages/questions_view.html',
		controller: 'QuestionsController'
	})
	.when('/friendships', {
		templateUrl: 'profile/pages/friendships_view.html',
		controller: 'FriendshipsController'
	})
	.when('/questions', {
		templateUrl: 'profile/pages/questions_view.html',
		controller: 'QuestionsController'
	})
	.when('/questions/new', {
		templateUrl: 'profile/pages/questions_new_view.html',
		controller: 'QuestionsNewController'
	})
	.when('/question/:id', {
		templateUrl: 'profile/pages/questions_show_view.html',
		controller: 'QuestionsShowController'
	})
	.when('/editprofile', {
		templateUrl: 'profile/pages/edit_profile_view.html',
		controller: 'EditProfileController'
	})
	.otherwise({ redirectTo: "/"});

}])


	;