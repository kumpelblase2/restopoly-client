angular.module('restopoly').controller('LoginController', ['$scope', '$rootScope', '$state', '$cookies', function($scope, $rootScope, $state, $cookies) {
    $scope.name = "";
    if($cookies.getObject('user')) {
        $rootScope.user = $cookies.getObject('user');
        $state.go('gameselect');
    }

    $scope.login = function() {
        $cookies.putObject('user', {
            name: $scope.name,
            id: $scope.name.toLowerCase().replace(' ', '_')
        });

        $rootScope.user = {
            name: $scope.name,
            id: $scope.name.toLowerCase().replace(' ', '_')
        };
        $state.go('gameselect');
    };
}]);
