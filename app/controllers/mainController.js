(function(app) {
    app.controller("MainController", ["$scope", "SearchService", function($scope, SearchService) {

        $scope.searchForBusinesses = function() {
            var location = $scope.search.location;

            SearchService.businesses().get({location: location}, function(res) {

            });
        }

    }]);
})(app);