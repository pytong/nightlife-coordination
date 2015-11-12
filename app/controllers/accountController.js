(function(app) {
    app.controller("AccountController", ["$scope", "UserService", function($scope, UserService) {

        UserService.loginStatus().get(function(res) {
            if(res.status === false) {
                window.location.href = "#/signin";
            }
        });

        // PollService.polls()
        //     .get({}, function(res) {
        //         $scope.polls = res.polls;
        //     });

        // $scope.newPoll = function() {
        //      window.location.href = "#/newpoll";
        // }

        // $scope.delete = function(pollId) {
        //     PollService.polls()
        //         .delete({id: pollId}, function(res) {
        //             if(res.success === true) { // success
        //                 $scope.polls = $.grep($scope.polls, function(item, index ) {
        //                     return item.id !== pollId;
        //                 });
        //             } else { // error
        //                 $scope.errorMessage = "Failed to delete poll. Please try again later."
        //             }
        //         });
        // }

    }]);
})(app);