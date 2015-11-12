var app = angular.module("NightlifeCoordinationApp", ["ngResource", "ngRoute"]);

app.config(function($locationProvider, $routeProvider) {

    $routeProvider
    .when("/", {
        controller: "MainController",
        templateUrl: "/views/main.html"
    })
    .when("/signin", {
        controller: "UserController",
        templateUrl: "/views/signin.html"
    })
    .when("/signup", {
        controller: "UserController",
        templateUrl: "/views/signup.html"
    })
    .otherwise({
       redirectTo: "/"
    });
});