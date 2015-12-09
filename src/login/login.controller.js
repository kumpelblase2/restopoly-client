angular.module('restopoly').controller('LoginController', ['$scope', 'UserData', '$state', function($scope, UserData, $state) {
    $scope.user = "";

    $scope.login = function() {
        UserData.user = $scope.user;
        $state.go('gameselect');
    };
}]);
