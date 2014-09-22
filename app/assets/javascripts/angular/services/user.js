angular.module("user.service", [ 'restangular' ])

.factory('User', ['Restangular', function(Restangular) {
	
	var entrypoint = "users";
	var current_user;

	function User() {
		this.service = Restangular.service(entrypoint);
	};
	
	User.prototype.new = function() {
		return Restangular.one(entrypoint + '/new').get();
	}

	User.prototype.current = function() {
		return this.service.one('current_user').get();
	}

	User.prototype.create = function(user) {
		return this.service.post(user);
	}

	User.prototype.update = function(user) {
		return this.service.one(user.id).patch(user);
	}

	return new User;
}])

;