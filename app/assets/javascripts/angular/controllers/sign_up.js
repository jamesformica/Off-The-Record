angular.module("sign_up.controller", [])

.controller('SignUpController', ['$scope', 'Redirect', 'User', 
	function ($scope, Redirect, User) {

	User.new().then(function(data){
		$scope.newuser = data;
	}, function(response) {
		//big problem
	});

	$scope.signUp = function(user) {
		User.create(user).then(function(data) {
			Redirect.to_index();
		}, function(response) {
			$scope.errors = response.data.errors;
		});
	};

	$scope.cancel = function() {
		Redirect.to_index();
	}

}])
;