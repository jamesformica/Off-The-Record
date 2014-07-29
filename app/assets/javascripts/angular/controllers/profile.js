angular.module("profile.controller", [])

.controller('ProfileController', ['$scope', 'Redirect', 'Session', function ($scope, Redirect, Session) {

	$scope.heading_text= "Acquaintances";

	$scope.changeText = function() {

		$scope.heading_text = "boobs!";
	}


	$scope.signOut = function() {
		Session.destroy().then(function(data) {
			Redirect.to_index();
		}, function(response) {
			$scope.errors = response.data.errors;
		});
	}

}])
;