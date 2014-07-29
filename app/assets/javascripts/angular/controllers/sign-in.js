angular.module("sign-in.controller", [])

.controller('SignInController', ['$scope', 'Redirect', 'Session', function ($scope, Redirect, Session) {

	$scope.signin = {
		email : "",
		password : ""
	};

	$scope.signIn = function(signin) {
		Session.create(signin).then(function(data) {
			Redirect.to_profile();
		}, function(response) {
			$scope.errors = response.data.errors;
			$scope.signin.password = '';
		});
	};

}])
;