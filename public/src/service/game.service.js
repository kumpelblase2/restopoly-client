angular.module('restopoly').factory('GameService', ['$http', 'GAMES_IP', function($http, GAME_URL) {
    return {
        getGames: function() {
            return $http({
                method: 'GET',
                url: GAME_URL + '/games'
            });
        },
        createGame: function() {
            return $http({
                method: 'POST',
                url: GAME_URL + '/game'
            });
        },
        joinGame: function(id, userid, username) {
            return $http({
                method: 'PUT',
                url: GAME_URL + '/games/' + id + '/players/' + userid + '?name=' + username + '&uri=http://localhost:8080'
            });
        },
        getPlayersForGame: function(id) {
            return $http({
                method: 'GET',
                url: GAME_URL + '/games/' + id + '/players'
            });
        },
        setPlayerReady: function(id, userid) {
            return $http({
                method: 'PUT',
                url: GAME_URL + '/games/' + id + '/players/' + userid + '/ready'
            });
        },
        getGame: function(id) {
            return $http({
                method: 'GET',
                url: GAME_URL + '/games/' + id
            });
        }
    };
}]);
