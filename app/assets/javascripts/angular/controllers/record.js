angular.module("record.controller", [])

.controller('RecordController', ['$scope', '$window', 'Session', function ($scope, $window, Session) {

	$scope.signOut = function() {
		Session.destroy().then(function(data) {
			$window.location.href = '/';
		}, function(response) {
			$scope.errors = response.data.errors;
		});
	};

}])
;