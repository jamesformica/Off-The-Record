angular.module("common.service", [])

// .factory('Common', ['Redirect', function(Redirect) {

// 	function Common() {
// 	};

// 	Common.prototype.Redirect = function() {
// 		return Redirect;
// 	}

// 	return new Common;
// }])


.factory('Redirect', ['$window', function($window) {

	function Redirect() {
	};

	Redirect.prototype.to_profile = function() {
		$window.location.href = '/profile';
	}

	Redirect.prototype.to_index = function() {
		$window.location.href = '/';
	}

	return new Redirect;

}])

;