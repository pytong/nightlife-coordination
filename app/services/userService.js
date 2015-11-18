(function(app) {
    app.service("UserService", ["$resource", "$location", function($resource, $location) {
        var appUrl = $location.protocol() + "://" + $location.host();

        this.loginStatus = function() {
            return $resource(appUrl + "/api/users/login_status");
        }

        this.signin = function(username, password) {
            return $resource(appUrl + "/api/users/signin", {
                username: username,
                password : password
            });
        }

        this.signup = function(name, username, password) {
            return $resource(appUrl + "/api/users/signup-submit", {
                username: username,
                password: password
            });
        }

        this.logout = function() {
            return $resource(appUrl + "/api/users/logout");
        }

        this.profile = function() {
            return $resource(appUrl + "/api/users/profile");
        }

    }]);
})(app);