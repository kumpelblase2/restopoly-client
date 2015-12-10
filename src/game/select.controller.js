angular.module('restopoly').controller('GameSelectController', ['$scope', 'GameService', '$rootScope', function($scope, GameService, $rootScope) {
    $scope.games = [];
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.user = $rootScope.user;

    $scope.join = function(id) {
        GameService.joinGame(id, $scope.user.id, $scope.user.name).then(function() {
            console.log('joined');
        });
    };

    $scope.create = function() {
        GameService.createGame().then(function(response) {
            console.log('created');
            var id = response.data.gameid;
            $scope.refresh();
            $scope.join(id);
        });
    };

    $scope.refresh = function() {
        GameService.getGames().then(function(games) {
            $scope.games = games.data;
            $scope.totalItems = games.data.length;
        });
    };

    $scope.refresh();
}]);
