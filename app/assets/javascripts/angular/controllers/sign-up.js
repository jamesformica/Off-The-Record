angular.module("sign-up.controller", [])

.controller('SignUpController', ['$scope', '$window', 'Agent', function ($scope, $window, Agent) {

	$scope.newagent = {
		agent: {}
	};

	$scope.signUp = function(agent) {
		Agent.create(agent).then(function(data) {
			toastr.success('Have fun storming the castle!', 'Miracle Max Says');
			$window.location.href = '/';
		}, function(response) {
			$scope.errors = response.data.errors;
		});
	};

}])
;