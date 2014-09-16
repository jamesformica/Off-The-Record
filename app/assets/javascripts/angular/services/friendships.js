angular.module("friendship.service", [ 'restangular' ])

.factory('Friendship', ['Restangular', function(Restangular) {
	
	var friends_entry = "friendships";
	var request_entry = "friendship_requests";

	function Friendship() {
		this.request_service = Restangular.service(request_entry);
		this.friend_service = Restangular.service(friends_entry);
	};

	Friendship.prototype.friend_requests = function() {
		return this.request_service.one('').get();
	}

	Friendship.prototype.send_friend_request = function(request) {
		return this.request_service.post(request);
	}

	Friendship.prototype.accept_friend_request = function(request) {
		return this.friend_service.post(request);
	}

	Friendship.prototype.destroy_friend_request = function(request) {
		return this.request_service.one(request.id).remove();
	}

	Friendship.prototype.destroy_friendship = function(friendship) {
		return this.friend_service.one(friendship.id).remove();
	}

	return new Friendship;
}])

;