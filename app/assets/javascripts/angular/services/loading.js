angular.module("loading.service", [])

.factory('Loading', [ function() {

	function Loading() {

	}	

	Loading.prototype.showLoading = function() {
		$("#ui-loading").show();
	}

	Loading.prototype.hideLoading = function() {
		$("#ui-loading").hide();
	}

	return new Loading;
}])

;