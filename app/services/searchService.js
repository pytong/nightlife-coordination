(function(app) {
    app.service("SearchService", ["$resource", "$location", function($resource, $location) {
        var appUrl = $location.protocol() + "://" + $location.host();

        this.businesses = function() {
            return $resource(appUrl + "/api/search?location=:location", {location: "@location"});
        }

    }]);
})(app);