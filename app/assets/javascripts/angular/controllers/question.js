angular.module("question.controller", [])

.controller('QuestionsController', ['$scope', '$location',
	function ($scope, $location) {

		$scope.setCurrentUser();

		var timer = setInterval( function() {
			$scope.setCurrentUser();
		}, 5000);

		$scope.showQuestion = function(question) {
			$scope.setCurrentViewableIndex($scope.sections.questions_show, question.id);
		}

		$scope.$on("$destroy", function() {
			clearInterval(timer);
		});

	}])


.controller('QuestionsNewController', ['$scope', 'Question', 'Model', 'Loading',
	function ($scope, Question, Model, Loading) {

		$scope.step = 0;
		$scope.new_question = Model.new_question();

		$scope.nextStep = function() {
			$scope.step += 1;
		}

		$scope.previousStep = function() {
			$scope.step -= 1;
		}

		$scope.randomQuestion = function() {
			Question.random().then(function(data) {
				$scope.new_question.question = data;
			});
		}

		$scope.addFriendToQuestion = function(friend) {
			if (_.contains($scope.new_question.to, friend))
				$scope.new_question.to = _.without($scope.new_question.to, friend);
			else 
				$scope.new_question.to.push(friend);
		}

		$scope.createQuestion = function(question) {
			var w_question = Model.wrapObject("question", question);

			Loading.showLoading();
			Question.create(w_question).then(function(data) {

				Loading.hideLoading();
				$scope.current_user.questions.push(data.question);
				$scope.setCurrentViewable($scope.sections.questions);

			}, function(response) {

				Loading.hideLoading();
				_.map(response.data.errors, function(error) { toastr.warning(error); });

			});
		}
	}])


.controller('QuestionsShowController', ['$scope', 'Question', 'Answer', 'Model', 'ColourHelper', '$routeParams',
	function ($scope, Question, Answer, Model, ColourHelper, $routeParams) {

		var q_id = $routeParams.id;

		$scope.contrastColour = "";
		$scope.current_state = null;
		$scope.states = {
			answer: 0,
			waiting: 1,
			ready: 2,
			viewed: 3
		}

		Question.show(q_id).then(function(data) {
			$scope.setCurrentQuestionAndState(data.question);
			$scope.contrastColour = ColourHelper.ContrastColour(data.question.asker_colour);
		});

		var timer = setInterval( function() {
			if ($scope.current_state === $scope.states.waiting) {
				Question.show(q_id).then(function(data) {
					$scope.setCurrentQuestionAndState(data.question);
				});
			}
		}, 7500);

		$scope.$on("$destroy", function() {
			clearInterval(timer);
		});
		
		$scope.updateAnswer = function(answer) {
			var update_answer = Model.update_answer(true);
			update_answer.id = $scope.current_question.user_answer_id;
			update_answer.answer = answer; 
			var w_update_answer = Model.wrapObject("answer", update_answer);

			Answer.update(w_update_answer).then(function(data) {
				$scope.setCurrentQuestionAndState(data.question);
			}, function(response) {
				_.map(response.data.errors, function(error) { toastr.warning(error); });
			});
		}

		$scope.setViewed = function() {

			var update_answer = Model.update_answer(false);
			update_answer.id = $scope.current_question.user_answer_id;
			update_answer.viewed = true;
			var w_update_answer = Model.wrapObject("answer", update_answer);

			Answer.update(w_update_answer).then(function(data) {
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