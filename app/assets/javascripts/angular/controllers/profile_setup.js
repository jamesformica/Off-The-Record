/* This controller acts as the $parent controller for:
- question.controller
- friendship.controller
- edit_profile.controller */

angular.module("profile.controller", [])

.controller('ProfileSetupController', ['$scope', '$location', 'User', 'Session', 'Redirect',
	function ($scope, $location, User, Session, Redirect) {

		$scope.action_menu_active = false;
		$scope.sections = viewable_sections;
		$scope.profileSettings = profile_settings;

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
;