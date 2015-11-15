(function(app) {
    app.controller("MainController", ["$scope", "UserService", "SearchService", "RsvpService", function($scope, UserService, SearchService, RsvpService) {

        $scope.searchForBusinesses = function() {
            var location = $scope.search.location;

            SearchService.businesses().get({location: location}, function(res) {
                if(res.success === true) {
                    $scope.businesses = res.result;
                } else {
                    $scope.errorMessage = res.result;
                }
            });
        };

        $scope.rsvp = function(business_id) {
            UserService.loginStatus().get(function(res) {
                if(res.status === false) {
                    window.location.href = "#/signin";
                } else {
                    RsvpService.rsvp().post({business_id: business_id}, function(res) {
                        if(res.success === true) {

                        } else {

                        }
                    });
                }
            });
        }

    }]);
})(app);