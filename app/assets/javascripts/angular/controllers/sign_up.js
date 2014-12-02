angular.module("sign_up.controller", [])

.controller('SignUpController', ['$scope', 'Redirect', 'Model', 'User', 'Loading',
	function ($scope, Redirect, Model, User, Loading) {

	$scope.newuser = Model.new_user();	

	$scope.signUp = function(user) {
		var w_user = Model.wrapObject("user", user);
		
		Loading.showLoading();
		User.create(w_user).then(function(data) {
			
			Loading.hideLoading();
			Redirect.to_index();

		}, function(response) {
			
			Loading.hideLoading();
			$scope.errors = response.data.errors;
			
		});
	};

	$scope.cancel = function() {
		Redirect.to_index();
	}

}])
;