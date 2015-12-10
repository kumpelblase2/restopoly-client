angular.module('restopoly').controller('LoginController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
    $scope.name = "";

    $scope.login = function() {
        $rootScope.user = {
            name: $scope.name,
            id: $scope.name.toLowerCase().replace(' ', '_')
        };
        $state.go('gameselect');
    };
}]);
