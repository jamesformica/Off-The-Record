angular.module("sign-in.controller", [])

.controller('SignInController', ['$scope', '$window', 'Session', function ($scope, $window, Session) {

	Session.signedin().then(function(data) {
		$window.location.href = '/record';
	});

	$scope.signin = {
		email : "",
		password : ""
	};

	$scope.signIn = function(agent) {
		Session.create(agent).then(function(data) {
			toastr.success('Have fun storming the castle!', 'Miracle Max Says');
			$window.location.href = '/record';
		}, function(response) {
			$scope.errors = response.data.errors;
		});
	};

}])
;