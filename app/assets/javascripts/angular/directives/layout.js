angular.module("layout.directive", [])

.directive('actionMenuItem', function() {
	return {

		restrict: 'E',
		replace: 'true',
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
		replace: 'true',
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
		replace: 'true',
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
		replace: 'true',
		scope: {
			friend: '=',
			toggle: '&'
		},
		templateUrl: 'profile/rows/new_question_add_friend_row.html'
	}
})

;