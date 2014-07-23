angular.module("agent.service", [ 'restangular' ])

.factory('Agent', ['Restangular', function(Restangular) {
	
	var entrypoint = "agents";

	function Agent() {
		this.service = Restangular.all(entrypoint);
	};

	Agent.prototype.create = function(agent) {
		return this.service.post(agent);
	}

	Agent.prototype.new = function() {
		return Restangular.one(entrypoint + '/new').get();
	}

	return new Agent;
}])

;