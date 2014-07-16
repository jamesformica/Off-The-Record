angular.module("agent.service", [ 'restangular' ])

.factory('Agent', ['Restangular', function(Restangular) {
	
	function Agent() {
		this.service = Restangular.all('agents');
	};

	Agent.prototype.create = function(agent) {
		return this.service.post(agent);
	}

	return new Agent;
}])

;