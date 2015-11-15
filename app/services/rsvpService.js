(function(app) {
    app.service("RsvpService", ["$resource", "$location", function($resource, $location) {
        var appUrl = $location.protocol() + "://" + $location.host();

        this.rsvp = function() {
            return $resource(appUrl + "/api/rsvp?business_id=:business_id", {business_id: "@business_id"});
        }

    }]);
})(app);