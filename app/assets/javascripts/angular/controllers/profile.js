angular.module("profile.controller", [])

.controller('ProfileSetupController', ['$rootScope', '$location' ,'$scope', 'User', 'Session', 'Redirect',
	function ($rootScope, $location, $scope, User, Session, Redirect) {

		$scope.action_menu_active = false;
		$scope.sections = viewable_sections;

		toastr.options = {
			"positionClass": "toast-bottom-left"
		};

		User.current().then(function(data) {
			//data.user.friendships = _.sortBy(data.user.friendships, function(friend) { return friend.friend_username; })
			$scope.current_user = data.user;
		});

		$scope.setCurrentViewable = function(name) {
			$scope.action_menu_active = false;
			$location.path("/" + name);
		}

		$scope.signOut = function() {
			Session.destroy().then(function(data) {
				Redirect.to_index();
			}, function(response) {
				$scope.errors = response.data.errors;
			});
		}

	}])


.controller('QuestionsController', ['$scope', 'Question', '$location',
	function ($scope, Question, $location) {

		$scope.showQuestion = function(question) {
			$location.path("/question/" + question.id)
		}

	}])


.controller('QuestionsNewController', ['$scope', 'Question', 
	function ($scope, Question) {

		$scope.new_question = {
			question: "",
			answer: "",
			to: []
		};

		$scope.addFriendToQuestion = function(friend) {
			if (_.contains($scope.new_question.to, friend))
				$scope.new_question.to = _.without($scope.new_question.to, friend);
			else 
				$scope.new_question.to.push(friend);
		}

		$scope.createQuestion = function(question) {
			//need to create wrapper funciton
			var newQuestion = {
				question: question
			}
			Question.create(newQuestion).then(function(data) {
				$scope.current_user.questions.push(data.question);
				$scope.setCurrentViewable($scope.sections.questions.url);
			}, function(response) {
				_.map(response.data.errors, function(error) { toastr.warning(error); });
			});
		}
	}])

.controller('QuestionsShowController', ['$scope', 'Question', 'Answer', '$location', '$routeParams',
	function ($scope, Question, Answer, $location, $routeParams) {

		$scope.current_state = null;

		$scope.states = {
			answer: 0,
			waiting: 1,
			ready: 2,
			viewed: 3
		}

		var q_id = $routeParams.id;
		Question.show(q_id).then(function(data) {
			$scope.setCurrentQuestionAndState(data.question);
		});

		$scope.updateAnswer = function(answer) {
			var answer = {
				id: $scope.current_question.user_answer_id,
				answer: answer
			}
			Answer.update(answer).then(function(data) {
				$scope.setCurrentQuestionAndState(data.question);
			});
		}

		$scope.setCurrentQuestionAndState = function(question) {
			$scope.current_question = question;

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

.controller('FriendshipsController', ['$scope', 'Friendship',
	function ($scope, Friendship) {
		
		$scope.friend_request = {
			to_username: ""
		}

		$scope.send_friend_request = function(request) {
			Friendship.send_friend_request(request).then(function(data) {
				toastr.info("friend request sent");
				$scope.friend_request.username = "";
			}, function(response) {
				toastr.warning(response.data.errors);
				$scope.friend_request.username = "";
			});
		}

		$scope.decline_friend_request = function(request) {
			Friendship.destroy_friend_request(request).then(function(data) {
				toastr.info("friend request ignored");
				$scope.current_user.friendship_requests = _.without($scope.current_user.friendship_requests, request);
			}, function(response) {
				toastr.warning("error declining friend request");
			});
		}

		$scope.accept_friend_request = function(request) {
			Friendship.accept_friend_request(request).then(function(data) {
				toastr.info("friend request accepted");
				$scope.current_user.friendship_requests = _.without($scope.current_user.friendship_requests, request);
				$scope.current_user.friendships.push(data.friendship);
			}, function(response) {
				toastr.warning("error accepting friend request");
			});
		}

		$scope.destroy_friendship = function(friendship) {
			Friendship.destroy_friendship(friendship).then(function(data) {
				$scope.current_user.friendships = _.without($scope.current_user.friendships, friendship);
			}, function(response) {
			});
		}

	}])


.controller('EditProfileController', ['$scope', 'User', 
	function ($scope, User) {

		$scope.edit_user = jQuery.extend(true, {}, $scope.current_user);

		$scope.update_information = function(current_user) {
			User.update(current_user).then(function(data) {
				toastr.info("successfully updated information");
				$scope.current_user = data.user;
				$scope.setCurrentViewable($scope.sections.questions.url);
			}, function(response) {
				_.map(response.data.errors, function(error) { toastr.warning(error); });
			});
		}
	}])
;