angular.module("question.controller", [])

.controller('QuestionsController', ['$scope', '$location',
	function ($scope, $location) {

		$scope.setCurrentUser();

		var timer = setInterval( function() {
			$scope.setCurrentUser();
		}, 5000);

		$scope.showQuestion = function(question) {
			$location.path("/question/" + question.id)
		}

	}])


.controller('QuestionsNewController', ['$scope', 'Question', 'Model',
	function ($scope, Question, Model) {

		$scope.new_question = Model.new_question();

		$scope.addFriendToQuestion = function(friend) {
			if (_.contains($scope.new_question.to, friend))
				$scope.new_question.to = _.without($scope.new_question.to, friend);
			else 
				$scope.new_question.to.push(friend);
		}

		$scope.createQuestion = function(question) {
			//need to create wrapper funciton
			var newQuestion = Model.wrapObject("question", question);
			Question.create(newQuestion).then(function(data) {
				$scope.current_user.questions.push(data.question);
				$scope.setCurrentViewable($scope.sections.questions.url);
			}, function(response) {
				_.map(response.data.errors, function(error) { toastr.warning(error); });
			});
		}
	}])


.controller('QuestionsShowController', ['$scope', 'Question', 'Answer', 'Model', '$routeParams',
	function ($scope, Question, Answer, Model, $routeParams) {

		var q_id = $routeParams.id;

		$scope.current_state = null;
		$scope.states = {
			answer: 0,
			waiting: 1,
			ready: 2,
			viewed: 3
		}

		Question.show(q_id).then(function(data) {
			$scope.setCurrentQuestionAndState(data.question);
		});

		var timer = setInterval( function() {
			if ($scope.current_state === $scope.states.waiting) {
				Question.show(q_id).then(function(data) {
					$scope.setCurrentQuestionAndState(data.question);
				});
			}
		}, 7500);

		
		$scope.updateAnswer = function(answer) {
			var update_answer = Model.update_answer(true);
			update_answer.answer = answer; 
			update_answer = Model.wrapObject("answer", update_answer);
			update_answer.id = $scope.current_question.user_answer_id;

			Answer.update(update_answer).then(function(data) {
				$scope.setCurrentQuestionAndState(data.question);
			}, function(response) {
				_.map(response.data.errors, function(error) { toastr.warning(error); });
			});
		}

		$scope.setViewed = function() {

			var update_answer = Model.update_answer(false);
			update_answer.viewed = true;
			update_answer = Model.wrapObject("answer", update_answer);
			update_answer.id = $scope.current_question.user_answer_id;

			Answer.update(update_answer).then(function(data) {
				$scope.setCurrentQuestionAndState(data.question);
			});
		}

		$scope.setCurrentQuestionAndState = function(question) {
			$scope.current_question = question;
			$scope.randomised_answers = _.shuffle(question.answers);
			if (!question.answered) {
				$scope.current_state = $scope.states.answer;
			} else if (!question.completely_answered) {
				$scope.current_state = $scope.states.waiting;
			} else if (!question.viewed) {
				$scope.current_state = $scope.states.ready;
			} else {
				$scope.current_state = $scope.states.viewed;
			}
		}

	}])
;