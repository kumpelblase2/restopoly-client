angular.module('restopoly').factory('GameService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
    return {
        getGames: function() {
            var self = this;
            return $http({
                method: 'GET',
                url: $rootScope.ips.game + '/games'
            }).then(function(response) {
                console.log(response);
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
                }
            }).then(function(response) { return response.data; });
        },
        joinGame: function(userid, username) {
            return $http({
                method: 'PUT',
                url: $rootScope.components.game + '/players/' + userid + '?name=' + username + '&uri=http://localhost:3000/event/' + userid.toLowerCase()
            }).then(function(response) { return response.data; });
        },
        joinGameByUrl: function(userid, username, url) {
            console.log(url);
            console.log($rootScope.ips.game);
            return $http({
                method: 'PUT',
                url: $rootScope.ips.game + url + '/' + userid + '?name=' + username + '&uri=http://localhost:3000/event/' + userid.toLowerCase()
            }).then(function(response) { return response.data });
        },
        getPlayers: function() {
            var self = this;
            return $http({
                method: 'GET',
                url: $rootScope.components.players
            }).then(function(response) {
                var players = [];
                response.data.forEach(function(playerUrl) {
                    players.push(self.getPlayerByUrl(playerUrl));
                });
                return $q.all(players);
            });
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
        }
    };
}]);
