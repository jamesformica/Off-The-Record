angular.module("profile.controller", [])

.controller('ProfileSetupController', ['$rootScope', '$location' ,'$scope', 'User', 'Session', 'Redirect',
	function ($rootScope, $location, $scope, User, Session, Redirect) {

		$scope.action_menu_active = false;
		$scope.sections = viewable_sections;

		toastr.options = {
			"positionClass": "toast-bottom-left"
		};

		//set up user and other empty templates
		User.current().then(function(data) {
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

.controller('QuestionsController', ['$scope', 'Question', 
	function ($scope, Question) {


	}])

.controller('QuestionsNewController', ['$scope', 'Question', 
	function ($scope, Question) {

		Question.new().then(function(data) {
			$scope.new_question = data;
		});

		$scope.addFriendToQuestion = function(friend) {
			if (_.contains($scope.new_question.question.to, friend))
				$scope.new_question.question.to = _.without($scope.new_question.question.to, friend);
			else 
				$scope.new_question.question.to.push(friend);
		}

		$scope.createQuestion = function(question) {
			Question.create(question).then(function(data) {
				var i = 3;
			}, function(response) {
				var i  = 4;
			});
		}

	}])

.controller('FriendshipsController', ['$scope', 'Friendship',
	function ($scope, Friendship) {
		
		Friendship.new_friend_request().then(function(data) {
			$scope.friend_request =data.friendship_request;
		});

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
				$scope.$parent.current_user = data.user;
			}, function(response) {
				_.map(response.data.errors, function(error) { toastr.warning(error); });
			});
		}
	}])
;