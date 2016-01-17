angular.module('restopoly').controller('GameLobbyController', ['$scope', 'GameService', '$rootScope', '$stateParams', '$state', 'wss', function($scope, GameService, $rootScope, $stateParams, $state, wss) {
    $scope.gameid = $stateParams.id;
    $scope.game = {
    };

    $scope.refresh = function() {
        GameService.getGame().then(function(game) {
            var playersUrl = game.players;
            $scope.game = game;
            $scope.game.players = [];
            if($scope.game.started) {
                $state.go('game', { id: $scope.gameid });
            }

            return GameService.getPlayersByUrl(playersUrl).then(function(players) {
                $scope.game.players = players;
                return players;
            });
        });
    };

    $scope.ready = function() {
        var isReady = false;
        if($scope.game.players) {
            $scope.game.players.forEach(function(player) {
                if(player.id != 'undefined' && player.id == $rootScope.user.id) {
                    isReady = player.ready;
                }
            });
        }

        return isReady;
    };

    $scope.isInGame = function() {
        var contains = false;
        if($scope.game.players) {
            $scope.game.players.forEach(function(player) {
                if(player.id != 'undefined' && player.id == $rootScope.user.id) {
                    contains = true;
                }
            });
        }

        return contains;
    }

    $scope.setReady = function(player) {
        GameService.setPlayerReady(player.ready).then(function() {
            $scope.refresh();
        });
    };

    wss.on('turn', function() {
        console.log('My Turn!');
    });

    $scope.refresh();
}]);
