angular.module('restopoly').factory('BoardService', ['$http', '$rootScope', '$q', 'DiceService', function($http, $rootScope, $q, DiceService) {
    var emptyTransformer = [function (data) { return data; }];

    return {
        move: function(player) {
            return DiceService.roll().then(function(rolls) {
                return $http({
                    method: 'POST',
                    url: $rootScope.ips.board + player.roll,
                    data: {
                        roll1: rolls[0],
                        roll2: rolls[1]
                    }
                }).then(function(response) { return response.data; });
            });
        },
        getPlayers: function() {
            var self = this;

            return $http({
                method: 'GET',
                url: $rootScope.components.board + '/players'
            }).then(function(response) {
                var players = response.data.players;
                var done = [];
                players.forEach(function(player) {
                    done.push(self.getPlayerByUrl(player));
                });

                return $q.all(done);
            });
        },
        getPlayerByUrl: function(url) {
            return $http({
                method: 'GET',
                url: $rootScope.ips.board + url
            }).then(function(response) { return response.data; });
        },
        getBoard: function() {
            return $http({
                method: 'GET',
                url: $rootScope.components.board
            }).then(function(response) { return response.data; });
        }
    };
}]);
