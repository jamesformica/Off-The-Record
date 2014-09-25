angular.module("answer.service", [ 'restangular' ])

.factory('Answer', ['Restangular', function(Restangular) {
	
	var entrypoint = "answers";
	
	function Question() {
		this.service = Restangular.service(entrypoint);
	};

	Question.prototype.update = function(answer) {
		return this.service.one(answer.id).patch(answer);
	}

	return new Question;
}])

;