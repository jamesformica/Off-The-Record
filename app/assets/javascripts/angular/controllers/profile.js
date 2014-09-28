angular.module("profile.controller", [])

.controller('ProfileSetupController', ['$rootScope', '$location' ,'$scope', 'User', 'Session', 'Redirect',
	function ($rootScope, $location, $scope, User, Session, Redirect) {

		$scope.action_menu_active = false;
		$scope.sections = viewable_sections;

		toastr.options = {
			"positionClass": "toast-bottom-left"
		};

		
		$scope.setCurrentUser = function() {
			User.current().then(function(data) {
				$scope.current_user = data.user;
			});
		}

		$scope.setCurrentViewable = function(name) {
			$scope.action_menu_active = false;
			$location.path("/" + name);
		}

		$scope.signOut = function() {
			Session.destroy().then(function(data) {
				Redirect.to_index();
			}, function(response) {
				$scope.errors = response.data.errors;
			});
		}

		$scope.setCurrentUser();

	}])


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