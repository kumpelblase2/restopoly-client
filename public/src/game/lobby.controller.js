angular.module('restopoly').controller('GameLobbyController', ['$scope', 'GameService', '$rootScope', '$stateParams', '$state', 'wss', '$q', function($scope, GameService, $rootScope, $stateParams, $state, wss, $q) {
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
            }).then(function() {
                $scope.updatePlayersReady();
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

    $scope.updatePlayersReady = function() {
        var players = [];
        $scope.game.players.forEach(function(player) {
            var newPlayer = angular.copy(player);
            players.push(GameService.checkPlayerReady(player.ready).then(function(isReady) {
                newPlayer.is_ready = isReady;
                return newPlayer;
            }));
        });
        $q.all(players).then(function(players) {
            $scope.game.players = players;
        });
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
        alert("The game started and it's your turn, hurry up!");
        console.log("Turn in lobby");
        $scope.$apply(function() {
            $state.go('game', { id: $scope.gameid });
        });
    });

    $scope.refresh();
}]);
