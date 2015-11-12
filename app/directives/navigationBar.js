(function(app) {
    app.directive("navigationBar", function() {
        return {
            restrict: "E",
            scope: {
                loggedIn: "="
            },
            controller: "NavigationBarController",
            templateUrl: "views/navigationBar.html"
        };
    });
})(app);