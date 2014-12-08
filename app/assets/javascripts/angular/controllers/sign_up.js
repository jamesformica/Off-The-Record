angular.module("sign_up.controller", [])

.controller('SignUpController', ['$scope', 'Redirect', 'Model', 'User', 'Loading', 'FavouriteColours',
	function ($scope, Redirect, Model, User, Loading, FavouriteColours) {

	$scope.sections = viewable_sections;
	$scope.newuser = Model.new_user();

	FavouriteColours.index().then(function(data) {
		$scope.favourite_colours = data.favourite_colours;
		$scope.updateChosenColour(0);
	});

	$scope.updateChosenColour = function(index) {
		$scope.chosenColour = index;
		$scope.newuser.favourite_colour = $scope.favourite_colours[index];
	}

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