angular.module("session.service", [ 'restangular' ])

.factory('Session', ['Restangular', function(Restangular) {
	
	function Session() {
		this.service = Restangular.all('sessions');
	};

	Session.prototype.create = function(session) {
		return this.service.post(session);
	}

	Session.prototype.destroy = function() {
		return Restangular.all('signout').remove();
	}

	Session.prototype.signedin = function() {
		return Restangular.one('signedin').get();
	}

	return new Session;
}])

;