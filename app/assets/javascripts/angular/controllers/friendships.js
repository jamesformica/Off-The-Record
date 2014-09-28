angular.module("friendship.controller", [])

.controller('FriendshipsController', ['$scope', 'Friendship',
	function ($scope, Friendship) {
		
		$scope.friend_request = {
			to_username: ""
		}

		$scope.send_friend_request = function(request) {
			Friendship.send_friend_request(request).then(function(data) {
				toastr.info("friend request sent");
				$scope.friend_request.to_username = "";
			}, function(response) {
				toastr.warning(response.data.errors);
				$scope.friend_request.to_username = "";
			});
		}

		$scope.decline_friend_request = function(request) {
			Friendship.destroy_friend_request(request).then(function(data) {
				toastr.info("friend request ignored");
				$scope.current_user.friendship_requests = _.without($scope.current_user.friendship_requests, request);
			}, function(response) {
				toastr.warning("error declining friend request");
			});
		}

		$scope.accept_friend_request = function(request) {
			Friendship.accept_friend_request(request).then(function(data) {
				toastr.info("friend request accepted");
				$scope.current_user.friendship_requests = _.without($scope.current_user.friendship_requests, request);
				$scope.current_user.friendships.push(data.friendship);
			}, function(response) {
				toastr.warning("error accepting friend request");
			});
		}

		$scope.destroy_friendship = function(friendship) {
			Friendship.destroy_friendship(friendship).then(function(data) {
				$scope.current_user.friendships = _.without($scope.current_user.friendships, friendship);
			}, function(response) {
			});
		}

	}])

;