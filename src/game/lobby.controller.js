angular.module('restopoly').controller('GameLobbyController', ['$scope', 'GameService', '$rootScope', '$stateParams', '$state', function($scope, GameService, $rootScope, $stateParams, $state) {
    $scope.game = $stateParams.id;
    $scope.players = [];

    $scope.refresh = function() {
        GameService.getPlayersForGame($scope.game).then(function(game) {
            $scope.players = game.data;
            var allReady = true;
            game.data.forEach(function(player) {
                if(!player.ready) {
                    allReady = false;
                }
            });

            if(allReady) {
                $state.go('/game/' + $scope.game + '/game');
            }
        });
    };

    $scope.ready = function() {
        var isReady = false;
        $scope.players.forEach(function(player) {
            if(player.id != 'undefined' && player.id == $rootScope.user.id) {
                isReady = player.ready;
            }
        });

        return isReady;
    };

    $scope.isInGame = function() {
        var contains = false;
        $scope.players.forEach(function(player) {
            if(player.id != 'undefined' && player.id == $rootScope.user.id) {
                contains = true;
            }
        });

        return contains;
    }

    $scope.setReady = function() {

    };

    $scope.refresh();
}]);
