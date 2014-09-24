angular.module("question.service", [ 'restangular' ])

.factory('Question', ['Restangular', function(Restangular) {
	
	var entrypoint = "questions";
	
	function Question() {
		this.service = Restangular.service(entrypoint);
	};

	Question.prototype.create = function(question) {
		return this.service.post(question);
	}

	return new Question;
}])

;