angular.module("edit_profile.controller", [])

.controller('EditProfileController', ['$scope', 'User', 'Loading', 'FavouriteColours',
	function ($scope, User, Loading, FavouriteColours) {

		$scope.edit_user = jQuery.extend(true, {}, $scope.current_user);

		FavouriteColours.index().then(function(data) {
			$scope.favourite_colours = data.favourite_colours;
			setUsersCurrentFavouriteColour();
		});

		function setUsersCurrentFavouriteColour() {
			var u_favouriteColour = $scope.current_user.favourite_colour;
			for (var i = 0; i < $scope.favourite_colours.length; i++) {
				if ($scope.favourite_colours[i] === u_favouriteColour) {
					$scope.updateChosenColour(i);
					return;
				}
			}
			$scope.updateChosenColour(0);
		}

		$scope.updateChosenColour = function(index) {
			$scope.chosenColour = index;
			$scope.edit_user.favourite_colour = $scope.favourite_colours[index];
		}

		$scope.update_information = function(current_user) {
			
			Loading.showLoading();
			
			User.update(current_user).then(function(data) {
				
				Loading.showLoading();
				toastr.info("successfully updated information");
				$scope.current_user = data.user;
				$scope.setCurrentViewable($scope.sections.questions);

			}, function(response) {
				
				Loading.showLoading();
				_.map(response.data.errors, function(error) { toastr.warning(error); });

			});
		}
	}])

;