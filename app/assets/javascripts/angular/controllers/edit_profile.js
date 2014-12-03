angular.module("edit_profile.controller", [])

.controller('EditProfileController', ['$scope', 'User', 'Loading',
	function ($scope, User, Loading) {

		if (!$scope.current_user) {
			$scope.setCurrentViewable($scope.sections.questions.url);
		}

		$scope.edit_user = jQuery.extend(true, {}, $scope.current_user);

		$scope.update_information = function(current_user) {
			
			Loading.showLoading();
			
			User.update(current_user).then(function(data) {
				
				Loading.showLoading();
				toastr.info("successfully updated information");
				$scope.current_user = data.user;
				$scope.setCurrentViewable($scope.sections.questions.url);

			}, function(response) {
				
				Loading.showLoading();
				_.map(response.data.errors, function(error) { toastr.warning(error); });

			});
		}
	}])

;