angular.module('restopoly').controller('GameLobbyController', ['$scope', 'GameService', '$rootScope', '$stateParams', '$state', function($scope, GameService, $rootScope, $stateParams, $state) {
    $scope.gameid = $stateParams.id;
    $scope.game = {
    };

    $scope.refresh = function() {
        GameService.getGame($scope.gameid).then(function(game) {
            $scope.game = game.data;
            if($scope.game.started) {
                $state.go('game', { id: $scope.gameid });
            }
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

    $scope.setReady = function() {
        GameService.setPlayerReady($scope.gameid, $rootScope.user.id).then(function() {
            $scope.refresh();
        });
    };

    $scope.refresh();
}]);
