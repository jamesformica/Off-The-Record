angular.module("common.service", [])

.factory('Model', function() {
	function Model() {
	}

	Model.prototype.wrapObject = function(wrap, object) {
		var wrapper = {};
		wrapper[wrap] = object;
		if (object.id)
			wrapper["id"] = object.id;
		return wrapper;
	}

	Model.prototype.new_question = function() {
		return {
			question: "",
			answer: "",
			to: []
		}
	}

	Model.prototype.update_answer = function(showAnswer) {
		var answer = {
			id: "",
			viewed: false,
			answer: ""
		}
		if (!showAnswer)
			delete answer["answer"];
		return answer;
	}

	Model.prototype.new_friend_request = function() {
		return {
			to_username: ""
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