angular.module("common.service", [])

// .factory('Common', ['Redirect', function(Redirect) {

// 	function Common() {
// 	};

// 	Common.prototype.Redirect = function() {
// 		return Redirect;
// 	}

// 	return new Common;
// }])

.factory('Model', function() {
	function Model() {
	}

	Model.prototype.wrapObject = function(object, value) {
		var wrapper = {};
		wrapper[object] = value;
		return wrapper;
	}

	Model.prototype.new_question = function() {
		return {
			question: "",
			answer: "",
			to: []
		}
	}

	return new Model;
})


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