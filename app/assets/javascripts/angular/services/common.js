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

	Model.prototype.new_user = function() {
		return {
			name: "",
			email: "",
			username: "",
			password: "",
			password_confirmation: ""
		}
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

	Redirect.prototype.to_signup = function() {
		$window.location.href = '/sign_up';
	}

	return new Redirect;

}])

.factory('ColourHelper', function() {
	
	function ColourHelper() {
	}

	ColourHelper.prototype.ContrastColour = function(colour) {
		if (colour.charAt(0) === "#") {
			var fullHex = colour.substring(1, 7);
			var r = parseInt(fullHex.substring(0, 2), 16);
			var g = parseInt(fullHex.substring(2, 4), 16);
			var b = parseInt(fullHex.substring(4, 6), 16);

			var d = "";

			var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;

			if (a < 0.35) {
				d = "#000000"; //bright colour - dark font
			} else {
				d = "#ffffff"; //dark colour - light font
			}

			return d;
		}
	}

	return new ColourHelper;
})

;