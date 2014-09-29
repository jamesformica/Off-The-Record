angular.module("layout.directive", [])

.directive('actionMenuWrapper', function() {
	return {
		scope: {
			actionmenuwidth: '@',
			contentmaxwidth: '@'
		},
		link: function (scope, element, attrs) {

			setActionMenu();

			$(window).resize(function() {
				setActionMenu();
			});

			function setActionMenu() {
				var window_width = $(window).width();
				var action_menu_width = parseInt(scope.actionmenuwidth);
				var content_max_width = parseInt(scope.contentmaxwidth);

				$(element).width(action_menu_width);
				if ((window_width - content_max_width - 60) / 2 >= action_menu_width) {
					$(element).css("left", 0);
					$("#action-bar-icon").hide();
				} else {
					$(element).css("left", (action_menu_width + 30) * -1);
					$("#action-bar-icon").show();
				}
			}
		}
	}
})

.directive('actionMenuItem', function() {
	return {

		restrict: 'E',
		replace: true,
		scope: {
			icon: '@',
			text: '@',
			color: '@',
			action: '&'
		},
		templateUrl: 'profile/rows/action_menu_item.html'
	}
})

.directive('friendshipRow', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			friend: '=',
			destroy: '&'
		},
		templateUrl: 'profile/rows/friendship_row.html'
	}
})

.directive('friendshipRequestRow', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			request: '=',
			accept: '&',
			decline: '&'
		},
		templateUrl: 'profile/rows/friendship_request_row.html'
	}
})

.directive('newQuestionAddFriendRow', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			friend: '=',
			toggle: '&'
		},
		templateUrl: 'profile/rows/new_question_add_friend_row.html'
	}
})

.directive('questionShowUserStatus', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			answer: '='
		},
		templateUrl: 'profile/rows/question_show_user_status.html'
	}
})

;