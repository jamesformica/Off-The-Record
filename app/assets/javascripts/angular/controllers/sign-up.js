angular.module("sign-up.controller", [])

.controller('SignUpController', ['$scope', 'Redirect', 'Agent', function ($scope, Redirect, Agent) {

	Agent.new().then(function(data){
		$scope.newagent = {
			agent: data
		};
	}, function(response) {
		//big problem
	});

	$scope.signUp = function(agent) {
		Agent.create(agent).then(function(data) {
			Redirect.to_index();
		}, function(response) {
			$scope.errors = response.data.errors;
		});
	};

}])
;