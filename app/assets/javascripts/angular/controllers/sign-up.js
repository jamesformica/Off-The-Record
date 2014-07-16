angular.module("sign-up.controller", [])

.controller('SignUpController', ['$scope', 'Agent', function ($scope, Agent) {

	$scope.newagent = {
		agent: {}
	};

	$scope.signUp = function(agent) {
		Agent.create(agent).then(function(data) {
			console.log("Object saved OK");
		}, function(response) {
			$scope.errors = response.data.errors;
		});
	};

}])
;