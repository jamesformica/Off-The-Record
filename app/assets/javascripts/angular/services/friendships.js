angular.module("friendship.service", [ 'restangular' ])

.factory('Friendship', ['Restangular', function(Restangular) {
	
	var friends_entry = "frienships";
	var request_entry = "friendship_requests";

	function Friendship() {
		this.request_service = Restangular.all(request_entry);
	};

	Friendship.prototype.friend_requests = function() {
		return this.request_service.one('').get();
	}

	Friendship.prototype.send_friend_request = function(request) {
		return this.request_service.post(request);
	}

	return new Friendship;
}])

;