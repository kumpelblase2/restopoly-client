angular.module('restopoly').controller('GameSelectController', ['$scope', 'GameService', '$rootScope', '$state', '$q', function($scope, GameService, $rootScope, $state, $q) {
    $scope.games = [];
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.user = $rootScope.user;

    $scope.join = function() {
        GameService.joinGame($scope.user.id, $scope.user.name || $scope.user.id).then(function() {
            $state.go('gamelobby');
        });
    };

    $scope.joinGame = function(game) {
        $rootScope.components = angular.copy($rootScope.ips);
        $rootScope.components.game = $rootScope.components.game + '/games/' + game.gameid;
        var id = game.gameid;
        GameService.joinGameByUrl($scope.user.id, $scope.user.name || $scope.user.id, game.join_url).then(function() {
            $state.go('gamelobby', { id: id });
        });
    };

    $scope.create = function() {
        GameService.createGame().then(function(response) {
            console.log('created');
            var gameurl = response.data;
            console.log(gameurl);
            $rootScope.components = angular.copy($rootScope.ips);
            $rootScope.components.game = $rootScope.components.game + gameurl;
            return gameurl;
        }).then(function(url) {
            return GameService.getGame().then(function(response) {
                console.log(response);
                var game = response.data;
                $rootScope.components = game.components;
                $rootScope.components.players = $rootScope.ips.game + game.players;
                $scope.join();
            });
        });
    };

    $scope.refresh = function() {
        GameService.getGames().then(function(games) {
            var all = [];

            games.forEach(function(game) {
                (function() {
                    var joinUrl = game.players;
                    game.join_url = joinUrl;
                    game.players = [];
                    all.push(GameService.getPlayersByUrl(game.join_url).then(function(players) {
                        game.players = players;
                        return game;
                    }));
                })();
            });

            $q.all(all).then(function(games) {
                $scope.games = games;
                $scope.totalItems = games.length;
            });
        });
    };

    $scope.refresh();
}]);
