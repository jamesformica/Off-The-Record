angular.module("sign-in.controller", [])

.controller('SignInController', ['$scope', '$window', 'Session', function ($scope, $window, Session) {

	$scope.signin = {
		email : "",
		password : ""
	};

	$scope.signIn = function(signin) {
		Session.create(signin).then(function(data) {
			$window.location.href = '/record';
		}, function(response) {
			$scope.errors = response.data.errors;
			$scope.signin.password = '';
		});
	};

}])
;