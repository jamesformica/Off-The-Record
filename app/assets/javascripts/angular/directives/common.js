angular.module("common.directive", [])

.directive('actionBar', function() {
	return {
		restrict: 'A',
		scope: {
			currentViewable: '=' 
		},
		link: function(scope, elem, attrs) {
			if (scope.currentViewable) {
				updateActionBar(scope.currentViewable);
			}
			scope.$watch('currentViewable', function(newValue, oldValue) {
				if (newValue)
					updateActionBar(scope.currentViewable);
			}, true);
			
			function updateActionBar(currentViewable) {
				$(elem).css("background-color", currentViewable.headingColour);
				$(elem).find("span#ui-action-bar-text").text(currentViewable.headingText);
			}
		}
	}
})

.directive('customColour', function() {
	return {
		restrict: 'A',
		scope: {
			colour: '=',
			css: '@'
		},
		link: function(scope, elem, attrs) {
			if (scope.colour) {
				$(elem).css(scope.css, scope.colour);
			} else {	
				scope.$watch('colour', function(newValue, oldValue) {
					if (newValue)
						$(elem).css(scope.css, newValue);
				}, true);
			}
		}
	}
})

.directive('otrHeader', function() {
	return {
		restrict: 'E',
		replace: 'true',
		template: '<div class="otr-home-banner" id="otr-nav"><div class="otr-home-logo"><h1 id="otr-heading-text" ng-model="heading_text"></h1></div></div>',
		link: function(scope, elem, attrs) {
			$(document).ready(function() {
				var heading_text_div = $(elem).find("#otr-heading-text");
				heading_text_div.text(attrs.title).arctext({radius: attrs.radius ? attrs.radius : 500 });
			});
		}
	};



})

.directive('yToBottom', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			$(window).resize(function() {
				setElementHeight();
			});

			$(document).ready(function(){
				var t = setTimeout( function() {
					setElementHeight();
					clearTimeout(t);
				}, 0);
			});

			function setElementHeight() {
				var pos = element.offset();
				var windowH = $(window).height();
				element.css("height", windowH - pos.top);
				element.css("overflow-y", "auto");
			}
		}
	}
}])

.directive('pageMinHeight', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			$(window).resize(function() {
				setElementHeight();
			});

			$(document).ready(function(){
				var t = setTimeout( function() {
					setElementHeight();
					clearTimeout(t);
				}, 0);
			});

			function setElementHeight() {
				var pos = element.offset();
				var windowH = $(window).height();
				element.css("min-height", windowH - pos.top);
				element.css("overflow-y", "auto");
			}
		}
	}
}])

.directive('placeHolder', [function() {
	return {
		restrict: 'A',
		scope: {
			placeHolderValue: '@'
		},
		link: function (scope, element, attrs) {
			$(document).ready(function() {
				var t = setTimeout( function() {
					$(element)[0].value = scope.placeHolderValue;
					$(element).addClass("italic");
					clearTimeout(t);
				}, 0);
				
				$(element).focusin(function() {
					if (this.value == scope.placeHolderValue) {
						this.value = '';
						$(this).removeClass("italic");
					}
				});
				$(element).focusout(function() {
					if (this.value == '') {
						this.value = scope.placeHolderValue;
						$(this).addClass("italic");
					}
				});
			});			
		}
	}
}])


.directive('backgroundColour', [function() {
	return {
		restrict: 'A',
		scope: {
			color: '@'
		},
		link: function (scope, element, attrs) {
			$(element).css('background-color', scope.color);
		}
	}
}])
;