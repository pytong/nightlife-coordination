(function(app) {
    app.controller("UserController", ["$scope", "UserService", function($scope, UserService) {

        $scope.signin = function() {
            var username = $scope.user.email,
                password = $scope.user.password;
            UserService.signin(username, password)
                .get(
                    function(res) { //success
                        window.location.href = "#/account";
                    },
                    function(err) { //error
                        $scope.error = "Incorrect email or password";
                    }
                );
        }

        $scope.signup = function() {
            var name = $scope.user.name,
                username = $scope.user.email,
                password = $scope.user.password;

            UserService.signup(name, username, password)
                .save(
                    function(res) { //success
                        window.location.href = "#/account";
                    },
                    function(err) { //error
                        $scope.error = "Failed to register.";
                    }
                );
        }

    }]);
})(app);