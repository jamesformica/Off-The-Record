angular.module("favourite_colours.service", [ 'restangular' ])

.factory('FavouriteColours', ['Restangular', function(Restangular) {
	
	var entrypoint = "favourite_colours";
	
	function FavouriteColours() {
		this.service = Restangular.service(entrypoint);
	};

	FavouriteColours.prototype.index = function() {
		return Restangular.one(entrypoint).get();
	}

	return new FavouriteColours;
}])

;