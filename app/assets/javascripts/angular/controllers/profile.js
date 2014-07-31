angular.module("profile.controller", [])

.controller('ProfileController', ['$scope', 'Redirect', 'Session', 'Friendship', function ($scope, Redirect, Session, Friendship) {

	$scope.heading_text= "Acquaintances";
	$scope.friend_request = {
		username: ""
	};

	Friendship.friend_requests().then(function(data) {
		var i = 3;
	}, function(response) {
		var e = 5;
	});

	$scope.send_friend_request = function(request) {
		Friendship.send_friend_request(request).then(function(data) {
			var a = 6;
		}, function(response) {
			var b = 7;
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