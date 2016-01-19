angular.module('restopoly').factory('GameService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
    var emptyTransformer = [function (data) { return data; }];

    return {
        getGames: function() {
            var self = this;
            return $http({
                method: 'GET',
                url: $rootScope.ips.game + '/games'
            }).then(function(response) {
                var games = [];
                response.data.forEach(function(gameUrl) {
                    games.push(self.getGameByUrl(gameUrl));
                });
                return $q.all(games);
            });
        },
        createGame: function() {
            return $http({
                method: 'POST',
                url: $rootScope.ips.game + '/games',
                data: {
                    components: $rootScope.ips
                },
                transformResponse: emptyTransformer,
            }).then(function(response) { return response.data; });
        },
        joinGame: function(userid, username) {
            return $http({
                method: 'PUT',
                url: $rootScope.components.game + '/players/' + userid + '?name=' + username + '&uri=http://localhost:3000/event/' + userid.toLowerCase()
            }).then(function(response) { return response.data; });
        },
        joinGameByUrl: function(userid, username, url) {
            return $http({
                method: 'PUT',
                url: $rootScope.ips.game + url + '/' + userid + '?name=' + username + '&uri=http://localhost:3000/event/' + userid.toLowerCase()
            }).then(function(response) { return response.data });
        },
        getPlayersByUrl: function(playersUrl) {
            var self = this;
            return $http({
                method: 'GET',
                url: $rootScope.ips.game + playersUrl
            }).then(function(response) {
                var players = [];
                response.data.players.forEach(function(playerUrl) {
                    players.push(self.getPlayerByUrl(playerUrl));
                });
                return $q.all(players);
            });
        },
        getPlayerByUrl: function(playerUrl) {
            return $http({
                method: 'GET',
                url: $rootScope.ips.game + playerUrl
            }).then(function(response) { return response.data; });
        },
        setPlayerReady: function(url) {
            return $http({
                method: 'PUT',
                url: $rootScope.ips.game + url
            }).then(function(response) { return response.data; });
        },
        getGame: function() {
            return $http({
                method: 'GET',
                url: $rootScope.components.game
            }).then(function(response) {
                $rootScope.components = response.data.components;
                return response.data;
            });
        },
        getGameByUrl: function(url) {
            return $http({
                method: 'GET',
                url: $rootScope.ips.game + url
            }).then(function(response) { return response.data; });
        },
        checkPlayerReady: function(readyUrl) {
            return $http({
                method: 'GET',
                url: $rootScope.ips.game + readyUrl,
                responseTransformers: emptyTransformer
            }).then(function(response) { return response.data });
        },
        acquireMutex: function() {
            return $http({
                method: 'PUT',
                url: $rootScope.components.game + "/players/turn?player=" + $rootScope.user.id.toLowerCase(),
                data: $rootScope.user
            });
        },
        releaseMutex: function(player) {
            return $http({
                method: 'PUT',
                url: $rootScope.ips.game + player.ready
            });
        },
        getCurrentPlayer: function() {
            return $http({
                method: 'GET',
                url: $rootScope.components.game + "/players/current"
            }).then(function(response) { return response.data; });
        }
    };
}]);
