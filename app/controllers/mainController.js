(function(app) {
    app.controller("MainController", ["$scope", "UserService", "SearchService", "RsvpService", function($scope, UserService, SearchService, RsvpService) {

        $scope.searchForBusinesses = function(location) {
            SearchService.businesses().get({location: location}, function(res) {
                if(res.success === true) {
                    $scope.businesses = res.result;
                } else {
                     $scope.businesses = [];
                    $scope.errorMessage = res.result;
                }
            });
        };

        $scope.rsvp = function(business_id, index) {
            UserService.loginStatus().get(function(res) {
                if(res.status === false) {
                    window.location.href = "#/signin";
                } else {
                    RsvpService.rsvp().save({business_id: business_id}, function(res) {
                        if(res.success === true) {
                            // get total rsvp
                            RsvpService.rsvp().get({business_id: business_id}, function(res) {
                                if(res.success === true) {
                                    $scope.businesses[index].rsvp_count = res.count;
                                } else {
                                    $scope.errorMessage = res.message;
                                }
                            });
                        } else {
                            $scope.errorMessage = res.message;
                        }
                    });
                }
            });
        }


        UserService.profile().get(function(res) {
            var searchTerms = res.profile.lastSearchTerms;

            $(".location").val(searchTerms);
            if(res.success === true && searchTerms !== null && typeof(searchTerms) !== "undefined" && searchTerms.length > 0) {
                $scope.searchForBusinesses(searchTerms);
            }
        });

    }]);
})(app);