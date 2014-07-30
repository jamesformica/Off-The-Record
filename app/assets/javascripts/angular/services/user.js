angular.module("user.service", [ 'restangular' ])

.factory('User', ['Restangular', function(Restangular) {
	
	var entrypoint = "users";

	function User() {
		this.service = Restangular.all(entrypoint);
	};

	User.prototype.create = function(user) {
		return this.service.post(user);
	}

	User.prototype.new = function() {
		return Restangular.one(entrypoint + '/new').get();
	}

	return new User;
}])

;