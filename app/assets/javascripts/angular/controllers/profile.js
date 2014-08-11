angular.module("profile.controller", [])

.controller('ProfileController', ['$scope', 'User', 'Redirect', 'Session', 'Friendship', function ($scope, User, Redirect, Session, Friendship) {

	$scope.action_menu_action = false;

	$scope.friend_request = {
		username: ""
	};

	toastr.options = {
		"positionClass": "toast-top-left"
	};

	User.current().then(function(data) {
		$scope.current_user = data.user;
	}, function(response) {
		//error
	});

	$scope.send_friend_request = function(request) {
		Friendship.send_friend_request(request).then(function(data) {
			toastr.info("friend request sent");
		}, function(response) {
			toastr.warning(response.data.errors);
			$scope.friend_request.username = "";
		});
	}

	$scope.decline_friend_request = function(request) {
		Friendship.destroy_friend_request(request).then(function(data) {
			toastr.info("friend request ignored");
		}, function(response) {
			toastr.warning("error declining friend request");
		});
	}


	$scope.accept_friend_request = function(request) {
		Friendship.accept_friend_request(request).then(function(data) {
			toastr.info("friend request accepted");
		}, function(response) {
			toastr.warning("error accepting friend request");
		});
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