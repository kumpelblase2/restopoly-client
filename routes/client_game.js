var rp = require('request-promise');

var methods = {
    'get_games': function(host, player, data) {
        return rp(host + '/games');
    },
    'post_games': function(host, player, data) {
        return rp.post(host + '/games');
    },
    'get_game': function(host, player, data) {
        return rp(host + '/games/' + data.id);
    },
    'get_players': function(host, player ,data) {
        return rp(host + '/games/' + data.id + '/players');
    }
};

module.exports = function(playerStore, host, socket) {
    socket.on('game', function(data) {
        var action = data.action;
        var player = playerStore.getBySocketId(socket.id);
        methods[action](host, player, data).then(function(response) {
            socket.emit(action, response);
        });
    });
};
