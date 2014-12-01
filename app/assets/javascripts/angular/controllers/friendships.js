angular.module("friendship.controller", [])

.controller('FriendshipsController', ['$scope', 'Friendship', 'Model',
	function ($scope, Friendship, Model) {
		
		$scope.friend_request = Model.new_friend_request();

		$scope.send_friend_request = function(request) {
			var w_request = Model.wrapObject("friendship_request", request);

			Friendship.create_request(w_request).then(function(data) {
				toastr.info("friend request sent");
			}, function(response) {
				toastr.warning(response.data.errors);
			});
		}

		$scope.decline_friend_request = function(request) {
			var w_request = Model.wrapObject("friendship_request", request);

			Friendship.destroy_request(w_request).then(function(data) {
				toastr.info("friend request ignored");
				$scope.current_user.friendship_requests = _.without($scope.current_user.friendship_requests, request);
			}, function(response) {
				toastr.warning("error declining friend request");
			});
		}

		$scope.accept_friend_request = function(request) {
			var w_request = Model.wrapObject("friendship", request);

			Friendship.create_friendship(w_request).then(function(data) {
				toastr.info("friend request accepted");
				$scope.current_user.friendship_requests = _.without($scope.current_user.friendship_requests, request);
				$scope.current_user.friendships.push(data.friendship);
			}, function(response) {
				toastr.warning("error accepting friend request");
			});
		}

		$scope.destroy_friendship = function(friendship) {
			var w_friendship = Model.wrapObject("friendship", friendship);

			Friendship.destroy_friendship(w_friendship).then(function(data) {
				$scope.current_user.friendships = _.without($scope.current_user.friendships, friendship);
			}, function(response) {
			});
		}

	}])

;