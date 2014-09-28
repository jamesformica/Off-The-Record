angular.module("edit_profile.controller", [])

.controller('EditProfileController', ['$scope', 'User', 
	function ($scope, User) {

		$scope.edit_user = jQuery.extend(true, {}, $scope.current_user);

		$scope.update_information = function(current_user) {
			User.update(current_user).then(function(data) {
				toastr.info("successfully updated information");
				$scope.current_user = data.user;
				$scope.setCurrentViewable($scope.sections.questions.url);
			}, function(response) {
				_.map(response.data.errors, function(error) { toastr.warning(error); });
			});
		}
	}])

;