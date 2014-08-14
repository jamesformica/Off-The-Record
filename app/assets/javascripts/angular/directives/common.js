angular.module("common.directive", [])

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
			$timeout(function(){
				var pos = element.offset();
				var windowH = $(window).height();
				element.css("height", windowH - pos.top);
				element.css("overflow-y", "auto");
			}, 0);
		}
	}
}])


;