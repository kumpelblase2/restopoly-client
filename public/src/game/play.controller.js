angular.module('restopoly').controller('GamePlayController', ['$scope', 'GameService', '$rootScope', '$stateParams', '$state', 'wss', 'BoardService', function($scope, GameService, $rootScope, $stateParams, $state, wss, BoardService) {
    $scope.gameid = $stateParams.id;
    $scope.game = {};
    $scope.board = {};
    $scope.board_players = [];
    $scope.game_players = [];
    $scope.game_player = {};
    $scope.board_player = {};

    wss.on('turn', function() {
        $scope.$apply(function() {
            $scope.startTurn();
            $scope.refresh();
        });
    });

    wss.on('event', function(ev) {
        alert("Uh, something happened: " + ev);
        $scope.$apply(function() {
            $scope.refresh();
        });
    });

    $scope.refresh = function() {
        GameService.getGame().then(function(game) {
            $scope.game = game;

            return GameService.getPlayers().then(function(players) {
                $scope.game_players = players;
                $scope.game_players.forEach(function(player) {
                    if(player.id == $rootScope.user.id) {
                        $scope.game_player = player;
                    }
                });
            });
        });

        BoardService.getBoard().then(function(board) {
            $scope.board = board;
            return BoardService.getPlayers().then(function(players) {
                $scope.board_players = players;
                $scope.board_players.forEach(function(player) {
                    if(player.id == $rootScope.user.id) {
                        $scope.board_player = player;
                    }
                });
            }).then(function() {
                var allPlaces = [];
                $scope.board.fields.forEach(function(field) {
                    allPlaces.push(BoardService.getPlace(field.place).then(function(place) {
                        return place.players = field.players;
                    }));
                });
                return $q.all(allPlaces);
            }).then(function(places) {
                var allOwners = [];
                places.forEach(function(place) {
                    allOwners.push(BrokerService.getOwner(place).then(function(owner) {
                        place.owner = owner;
                        return place;
                    }));
                });

                return $q.all(allOwners);
            });
        });
    };

    $scope.startTurn = function() {
        GameService.acquireMutex().then(function() {
            alert("It's your turn!");
        });
    }

    $scope.roll = function() {
        BoardService.move($scope.board_player).then(function() {
            $scope.refresh();
        });
    };

    $scope.buy = function() {
        var field = $scope.getCurrentField($scope.player);
        BrokerService.buy(field, $scope.player).then(function() {
            $scope.refresh();
        });
    };

    $scope.end = function() {
        GameService.releaseMutex($scope.game_player);
    };

    $scope.getPlayersOnField = function(value) {
        var all = [];
        for(var name in $scope.board.positions) {
            if($scope.board.positions[name] == value) {
                all.push(name);
            }
        }

        return all;
    };

    $scope.getCurrentField = function(player) {
        var pos = $scope.board.positions[player.id];
        return $scope.board.fields[pos];
    };

    $scope.refresh();
}]);
