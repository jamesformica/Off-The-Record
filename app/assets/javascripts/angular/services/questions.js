angular.module("question.service", [ 'restangular' ])

.factory('Question', ['Restangular', function(Restangular) {
	
	var entrypoint = "questions";
	
	function Question() {
		this.service = Restangular.service(entrypoint);
	};

	Question.prototype.create = function(question) {
		return this.service.post(question);
	}

	Question.prototype.show = function(id) {
		return this.service.one(id).get();
	}

	Question.prototype.random = function() {
		return Restangular.one("random_question").get();
	}

	return new Question;
}])

;