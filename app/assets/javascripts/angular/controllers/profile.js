angular.module("profile.controller", [])

.controller('ProfileController', ['$scope', 'User', 'Redirect', 'Session', 'Friendship', function ($scope, User, Redirect, Session, Friendship) {

	$scope.heading_text= "Acquaintances";
	$scope.friend_request = {
		username: ""
	};

	User.current().then(function(data) {
		$scope.current_user = data.user;
	}, function(response) {
		var a = 8;
	});

	$scope.send_friend_request = function(request) {
		Friendship.send_friend_request(request).then(function(data) {
			$scope.msg = "friend request sent";
		}, function(response) {
			$scope.msg = response.data.errors;
		});
	}

	$scope.decline_friend_request = function(request) {
		Friendship.destroy_friend_request(request).then(function(data) {
			$scope.msg = "friend request ignored";
		}, function(response) {
			$scope.msg = "error declining friend request";
		});
	}


	$scope.accept_friend_request = function(request) {
		Friendship.accept_friend_request(request).then(function(data) {
			$scope.msg = "friend request accepted";
		}, function(response) {
			$scope.msg = "error accepting friend request";
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