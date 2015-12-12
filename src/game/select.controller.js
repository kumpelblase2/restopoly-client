angular.module('restopoly').controller('GameSelectController', ['$scope', 'GameService', '$rootScope', '$state', function($scope, GameService, $rootScope, $state) {
    $scope.games = [];
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.user = $rootScope.user;

    $scope.join = function(id) {
        var gamesWithId = $scope.games.filter(function(game) { return game.id == id; });
        if(gamesWithId.length > 0) {
            var game = gamesWithId[0];
            if(game.players.filter(function(player) { return player.id == $scope.user.id; }).length > 0) {
                $state.go('gamelobby', { id: id });
                return;
            }
        }

        GameService.joinGame(id, $scope.user.id, $scope.user.name).then(function() {
            $state.go('gamelobby', { id: id });
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
