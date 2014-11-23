angular.module("user.service", [ 'restangular' ])

.factory('User', ['Restangular', function(Restangular) {
	
	var entrypoint = "users";
	var currentuserentrypoint = "current_user";

	function User() {
		this.user_service = Restangular.service(entrypoint);
		this.current_user_service = Restangular.service(currentuserentrypoint);
	};
	
	User.prototype.new = function() {
		return Restangular.one(entrypoint + '/new').get();
	}

	User.prototype.current = function() {
		return this.current_user_service.one().get();
	}

	User.prototype.create = function(user) {
		return this.user_service.post(user);
	}

	User.prototype.update = function(user) {
		return this.user_service.one(user.id).patch(user);
	}

	return new User;
}])

;