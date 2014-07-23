angular.module("record.controller", [])

.controller('RecordController', ['$scope', '$window', 'Session', function ($scope, $window, Session) {

	$scope.signOut = function() {
		Session.destroy().then(function(data) {
			toastr.success('Have fun storming the castle!', 'Miracle Max Says');
			$window.location.href = '/';
		}, function(response) {
			$scope.errors = response.data.errors;
		});
	};

}])
;